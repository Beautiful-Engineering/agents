# Warmup Bot

AI-powered TikTok account warmup using Claude Vision. Browses TikTok on a connected phone, watches videos, likes, comments, follows, and saves — training the algorithm to surface content in your niche.

---

## Architecture

- **Main loop** (`bot.py`): capture screenshot → Claude Vision analyzes → decide action → execute → wait
- **State machine** (`state/machine.py`): tracks FYP vs comments/profile/modal, auto-recovers
- **Platform abstraction**: Android (ADB screenshots + taps/swipes) or iOS (pymobiledevice3 + Voice Control)
- **AI** (`ai/analyzer.py`): sends screenshots to Claude, gets back action + relevance score

## Prerequisites

### One-time tool setup

```bash
# Clone the repo (if not already)
git clone https://github.com/Beautiful-Engineering/tiktok-tools.git

# Set up the warmup bot
cd tiktok-tools/warmup
python3 -m venv .venv
source .venv/bin/activate
pip install -e .
```

After `pip install -e .`, the `tiktok-warmup` command is available (in the venv).

### Environment variables

Create `.env` in the warmup directory (`tiktok-tools/warmup/.env`):

```
ANTHROPIC_API_KEY=sk-ant-...
```

### Device setup

Walk the user through the relevant platform setup below. These are one-time steps.

#### Android

**On the Mac:**
1. Install ADB (Android Debug Bridge):
   ```bash
   brew install android-platform-tools
   ```
2. Verify it's installed: `adb version`

**On the phone:**
1. **Enable Developer Options**: Go to Settings → About Phone → tap "Build Number" 7 times. A toast will say "You are now a developer."
2. **Enable USB Debugging**: Go to Settings → Developer Options → toggle on "USB Debugging"
3. **Connect the phone** via USB cable to the Mac
4. **Trust the Mac**: A prompt will appear on the phone asking "Allow USB debugging?" — tap "Allow" (check "Always allow from this computer" for convenience)

**Verify:**
```bash
adb devices
# Should show something like:
# XXXXXXXXX    device
```

If it shows `unauthorized`, unlock the phone and accept the USB debugging prompt.

#### iOS

**On the iPhone:**
1. **Enable Developer Mode**: Go to Settings → Privacy & Security → Developer Mode → toggle ON. The phone will restart.
2. **Trust the Mac**: Connect the iPhone via USB. Tap "Trust" on the "Trust This Computer?" prompt on the iPhone.
3. **Enable Voice Control**: Go to Settings → Accessibility → Voice Control → toggle ON. This is how the bot types and taps on iOS — it speaks commands that Voice Control executes.

**On the Mac:**
1. The warmup bot uses `pymobiledevice3` (installed with `pip install -e .`). iOS 17+ requires a running tunnel daemon for USB communication:
   ```bash
   sudo python3 -m pymobiledevice3 remote tunneld
   ```
   Keep this running in a separate terminal for the entire session.

2. Mount the Developer Disk Image (needed for screenshots):
   ```bash
   # From the warmup directory:
   ./setup_device.sh
   ```
   This script auto-mounts the DDI and verifies screenshot capability.

**Verify:**
```bash
# Check the tunnel sees the device
python3 -m pymobiledevice3 usbmux list

# Test a screenshot
pymobiledevice3 developer screenshot /tmp/test.png && open /tmp/test.png
```

**iOS gotchas:**
- Voice Control must stay ON during the entire warmup session — the bot speaks commands like "swipe up", "tap like video" that Voice Control translates to actions
- If Voice Control stops responding, toggle it off/on in Settings → Accessibility → Voice Control
- The `tunneld` process must stay running — if it dies, the bot loses connection

## CLI Reference

Run from the `tiktok-tools/warmup` directory with the venv activated:

```bash
source .venv/bin/activate
python -m src.main [OPTIONS]
```

### Required options

| Flag | Description |
|------|-------------|
| `--topic TEXT` | Niche topic for the warmup session (e.g., "running", "cooking", "startups") |

### Optional flags

| Flag | Default | Description |
|------|---------|-------------|
| `--platform [ios\|android]` | `ios` | Device platform |
| `--duration INTEGER` | `30` | Session duration in minutes |
| `--engagement-rate [low\|medium\|high]` | `medium` | Controls like/save/follow/comment frequency |
| `--max-follows INTEGER` | `5` | Max profiles to follow per session |
| `--device TEXT` | (auto) | ADB device serial (for multiple Android devices) |
| `--model TEXT` | `claude-haiku-4-5-20251001` | Claude model for vision analysis |
| `--voice TEXT` | `Samantha` | macOS voice for TTS (iOS only) |
| `--dry-run` | off | AI analysis only, no actions executed |
| `--save-screenshots` | off | Save screenshots to disk |
| `--force-comment` | off | Force a comment on the first relevant video |
| `--log-level TEXT` | `info` | Logging level |

### Engagement presets

| Preset | Like % | Save % | Max Follows | Comment Interval | Profile Interval |
|--------|--------|--------|-------------|-----------------|-----------------|
| `low` | 10% | 5% | 3 | every 12-18 videos | every 15-20 videos |
| `medium` | 25% | 10% | 5 | every 8-12 videos | every 10-15 videos |
| `high` | 40% | 20% | 8 | every 5-8 videos | every 7-10 videos |

## Example sessions

```bash
# Quick dry run to test connection
python -m src.main --platform android --topic "running" --duration 5 --dry-run

# 30-minute warmup for a fitness account
python -m src.main --platform android --topic "fitness tips" --duration 30 --engagement-rate medium

# Aggressive warmup with forced commenting
python -m src.main --platform android --topic "cooking recipes" --duration 45 --engagement-rate high --force-comment

# iOS warmup
python -m src.main --platform ios --topic "tech startups" --duration 30

# Watch debug logs (Rich Live swallows terminal output)
tail -f bot.log
```

## Detecting the logged-in account (Android)

On multi-phone setups it's easy to accidentally warm up the wrong account because phone↔account assignments drift. **Always verify which account is actually logged in before launching a warmup session** — don't trust the operator's "yes it's the right account" answer.

There's no way to read TikTok's app data directly on a non-rooted device (`run-as` fails because `com.zhiliaoapp.musically` is not debuggable, and `/data/data/com.zhiliaoapp.musically/` returns Permission denied). The reliable method is UI scraping via UIAutomator:

1. **Confirm TikTok is the foreground app**:
   ```bash
   adb -s <serial> shell dumpsys window | grep mCurrentFocus
   ```
   Should contain `com.zhiliaoapp.musically`. If not, fail loudly — don't try to launch TikTok.

2. **Tap the Profile bottom-tab**. Don't hardcode coordinates (they vary by screen size). Instead, dump the current UI and parse the bounds of the node whose `content-desc="Profile"`:
   ```bash
   adb -s <serial> shell uiautomator dump /sdcard/p.xml
   adb -s <serial> pull /sdcard/p.xml /tmp/p.xml
   # Parse bounds="[x1,y1][x2,y2]" → tap centerpoint
   adb -s <serial> shell input tap <cx> <cy>
   ```

3. **Sleep ~2s, then re-dump the UI** and grep for `text="@..."`. TikTok displays the handle prefixed with `@` near the top of the profile screen:
   ```bash
   grep -oE 'text="@[A-Za-z0-9._]+"' /tmp/p.xml | head -1
   ```

4. **Onboarding overlay gotcha**: TikTok occasionally shows a full-screen *"Your avatar, your style — Get started"* overlay over the Profile tab. Symptom: the dump is suspiciously small (~9KB) and contains no `@handle`. To handle it: query `wm size` for screen dimensions, scan ImageView nodes whose `y1` is in the top 15% of the screen, tap the rightmost one (the close button), then re-dump.

5. **Cross-reference against your account database**. Once you have the handle, look it up in your project's accounts table to (a) confirm it matches the expected account for this warmup session and (b) resolve the local `account_id` so the new `warmup_sessions` row gets associated correctly without operator input.

Wrap this into a `detect-account.sh <serial>` script in your project (prints handle to stdout, distinct exit codes for foreground/dump/handle failures) and call it at the top of any launch-warmup script.

## Switching accounts (Android)

Since you have full ADB control, **never ask the user to manually swap accounts between warmup sessions** — drive the TikTok account-switcher via ADB. This only works for accounts that are already in the multi-account login list (i.e., previously logged in on that device). If an account isn't in the list, it requires a fresh login which this flow does not handle.

TikTok Android (`com.zhiliaoapp.musically`) account-switcher flow:

1. **Navigate to Profile**: Tap the `Profile` bottom-tab (same technique as `detect-account.sh` — parse bounds from UIAutomator dump, don't hardcode coordinates).

2. **Tap the header username button**. Dump the UI, find the node with `resource-id="com.zhiliaoapp.musically:id/rfm"`, parse its bounds, tap the centerpoint.
   ```bash
   adb -s <serial> shell input tap <cx> <cy>
   ```
   **Critical gotcha**: Do NOT tap the larger `@username` line below the header button — that's `resource-id="com.zhiliaoapp.musically:id/rhk"` and on at least some builds it's a no-op or goes to edit-profile instead of opening the switcher. Always use `id/rfm`.

3. **Wait ~1.5s for the bottom sheet**, then dump the UI. The "Switch account" bottom sheet is identifiable by `content-desc="Bottom sheet"`. Each logged-in account appears as a row with:
   - `resource-id="com.zhiliaoapp.musically:id/kqe"`
   - `content-desc="<handle>"` (the bare handle — **without** the `@` prefix)

4. **Tap the row** whose `content-desc` matches your target handle. Parse its bounds, tap the centerpoint.

5. **Wait ~6s** for TikTok to switch accounts and reload. The switch is not instant — the feed has to re-initialize.

6. **Verify with `detect-account.sh`**. If the verified handle doesn't match the target, fail — don't retry blindly, because a mismatch usually means a UI layout change broke the tap coordinates.

### Recommended: wrap it in `switch-account.sh`

Project-local script: `./switch-account.sh <serial> <handle>`
- Idempotent: if `detect-account.sh` already returns the target, exit 0 with no action.
- If the target isn't in the bottom-sheet account list, exit with a distinct code (e.g. `6`) and log the available handles — this signals "needs manual login first", which a caller can surface to the operator without retrying.
- Verify post-switch via `detect-account.sh`; exit with a different distinct code (e.g. `7`) on mismatch.
- After a successful switch, update the `accounts.phone_serial` column in the project DB so the new binding is recorded.

## Launching warmups as true background processes

The warmup bot runs for 25+ minutes, so it has to survive the calling shell/agent exiting. **Do not spawn the warmup from within a sub-agent** — when the sub-agent terminates, its child processes get killed and you end up with 30-second "completed" sessions.

Launch it with `nohup` + `disown` so the process detaches from the shell:

```bash
cd /path/to/tiktok-tools/warmup
nohup .venv/bin/python -m src.main \
  --platform android \
  --device <serial> \
  --topic "<topic>" \
  --duration 25 \
  --engagement-rate medium \
  > /path/to/logs/warmup-<handle>-session<id>.log 2>&1 &
disown
```

Key points:
- Redirect BOTH stdout and stderr to a per-session log file (`> file 2>&1`) — otherwise the Rich Live display's output gets lost and you can't debug.
- `disown` removes the process from the shell's job table so it survives parent exit.
- Use `.venv/bin/python` directly instead of `source .venv/bin/activate && python` — more reliable in non-interactive shells.
- One log file per session (not the shared `bot.log`) so parallel phones don't collide.
- After launch, verify with `ps aux | grep src.main` that both processes are actually running before moving on.

## Key gotchas

1. **Working directory**: Run from `tiktok-tools/warmup/` (where `.env` lives)
2. **Venv**: Must activate the venv before running (`source .venv/bin/activate`) — or call `.venv/bin/python` directly
3. **TikTok must be open**: Open TikTok on the For You Page before starting the bot
4. **Logs**: The Rich Live display swallows terminal output. Use `tail -f bot.log` in a separate terminal for debug logs
5. **Android ADB**: `uiautomator dump` freezes TikTok's UI briefly — the bot handles this with caching and timing
6. **iOS Voice Control**: Must be enabled in Accessibility settings for iOS input to work
7. **Multiple devices**: Use `--device SERIAL` when multiple Android phones are connected
8. **Verify logged-in account on multi-phone setups**: Never trust phone↔account assumptions. Run `detect-account.sh <serial>` (see "Detecting the logged-in account" above) before every warmup session and fail loudly if the handle doesn't match the expected account. Phone-pinning in the DB drifts; the actual logged-in TikTok session is the only source of truth.
9. **Switch accounts programmatically, not manually**: When rotating accounts between warmup sessions on the same phone, use `switch-account.sh <serial> <handle>` (see "Switching accounts" above) — do not ask the operator to log out/in by hand. The account must already be in the multi-account login list; fresh logins are out of scope for this flow.
10. **Never launch warmup from a sub-agent**: Sub-agent child processes are killed when the sub-agent exits, giving you broken 30-second sessions marked `running` forever. Spawn warmups with `nohup ... &; disown` from the top-level session (see "Launching warmups as true background processes" above).
