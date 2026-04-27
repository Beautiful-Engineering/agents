# Warmup Bot

AI-powered TikTok account warmup using Claude Vision. Browses TikTok on a connected phone, watches videos, likes, comments, follows, and saves — training the algorithm to surface content in your niche.

The bot has two modes:

- **`--mode warmup`** (default) — Classic FYP-grinding loop. Sits on the For You Page, analyzes each video, and engages with topic-relevant content. Best for accounts that already have a signal and just need to sharpen it.
- **`--mode search-seed`** — Cold-start loop for brand-new accounts. Runs a curated list of search queries (picked by `--topic` from a preset), watches a handful of videos per query, and engages with the top ones. See "The cold-start problem" below.

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
| `--mode [warmup\|search-seed]` | `warmup` | Loop to run. `search-seed` cold-starts a fresh account by running curated search queries instead of FYP grinding (see "The cold-start problem" below) |
| `--platform [ios\|android]` | `ios` | Device platform. **`search-seed` requires `android`** — iOS Voice Control lacks the raw input primitives the search nav needs |
| `--duration INTEGER` | `30` | Session duration in minutes (warmup mode only) |
| `--engagement-rate [low\|medium\|high]` | `medium` | Controls like/save/follow/comment frequency |
| `--max-follows INTEGER` | `5` | Max profiles to follow per session |
| `--device TEXT` | (auto) | ADB device serial (for multiple Android devices) |
| `--model TEXT` | `claude-haiku-4-5-20251001` | Claude model for vision analysis |
| `--voice TEXT` | `Samantha` | macOS voice for TTS (iOS only) |
| `--dry-run` | off | AI analysis only, no actions executed |
| `--save-screenshots` | off | Save screenshots to disk |
| `--force-comment` | off | Force a comment on the first relevant video (warmup mode only) |
| `--log-level TEXT` | `info` | Logging level |
| `--videos-per-query INTEGER` | `8` | (`search-seed` only) Videos to watch per query before moving on |
| `--likes-per-query INTEGER` | `4` | (`search-seed` only) Soft cap on likes attributed to each query |
| `--follows-per-query INTEGER` | `1` | (`search-seed` only) Soft cap on follows attributed to each query |

### Engagement presets

| Preset | Like % | Save % | Max Follows | Comment Interval | Profile Interval |
|--------|--------|--------|-------------|-----------------|-----------------|
| `low` | 10% | 5% | 3 | every 12-18 videos | every 15-20 videos |
| `medium` | 25% | 10% | 5 | every 8-12 videos | every 10-15 videos |
| `high` | 40% | 20% | 8 | every 5-8 videos | every 7-10 videos |

## The cold-start problem

A brand-new TikTok account has no signal. Its For You Page is pure random cold-start content — the algorithm hasn't seen any engagement yet, so it doesn't know what to serve. If you run the classic `--mode warmup` loop on this account, the bot dutifully analyzes each video, finds most of them irrelevant (relevance < 30), swipes past them, and the few engagements it does make are diluted across whatever random topics happen to appear. After 30 minutes you've spent API budget and taught the algorithm almost nothing, because the denominator of "videos shown" was never in your niche to begin with.

**`--mode search-seed` solves this.** Instead of waiting for the algorithm to surface relevant content, you drive directed attention through TikTok's search. Every video the bot sees came from a query YOU chose, so every like/follow is a strong topical signal with no noise. This is the first thing you should run on any fresh account before any other warmup.

### How it works

The search-seed runner iterates over a curated query list for the topic. For each query, it:

1. Navigates from the FYP to the Search icon (top-right of the FYP — not a bottom-nav tab)
2. Types the query into the focused search input and submits via KEYCODE_ENTER
3. Switches to the **Videos** tab on the results screen (critical — see "Always switch to Videos tab" below)
4. Taps the first video thumbnail to enter the fullscreen swipeable feed
5. Runs the normal capture/analyze/act loop for `--videos-per-query` videos, enforcing soft budgets (`--likes-per-query`, `--follows-per-query`)
6. Returns to the FYP via the Home bottom-nav tab (**never** KEYCODE_BACK — see "Never KEYCODE_BACK on the FYP")
7. Moves to the next query

After all queries are exhausted the session ends.

### Query presets

Query presets live in `warmup/src/search_seed/queries.py`. Each topic maps to an ordered list of 8-15 natural-language queries. The order matters — broad queries establish the macro-niche, narrower queries refine it. Do NOT randomize.

| Topic | Notes |
|-------|-------|
| `pregnancy` | Primary shipping preset. 12 queries covering trimesters, food/skincare safety, symptoms, hospital bag, registry |
| `fitness` | Example preset |
| `cooking` | Example preset |

**Adding a new topic**: append to `QUERY_PRESETS` in `queries.py` with an ordered list of natural-language search phrases. No other code changes needed. Real user phrases beat hashtags — TikTok's search grades them higher.

### Choosing per-query budgets

The defaults (`--videos-per-query 8`, `--likes-per-query 4`, `--follows-per-query 1`) are the sweet spot for a typical cold-start. Rationale:

- **8 videos per query** is enough to get past the 1-2 "featured/top" slots (which are often off-topic for broad queries) and reach the algorithmic long-tail, without over-engaging on any single query.
- **4 likes per query** is a 50% like rate relative to videos watched — aggressive enough to build signal fast, not so aggressive that it looks bot-like.
- **1 follow per query** keeps total follows across a ~12-query session at ~12, under TikTok's "new account following spike" rate-limit threshold.

Budgets are **soft caps, not hard gates** — if you hit the like budget early, the bot keeps watching to `--videos-per-query` but stops counting new engagements against the budget. This prevents "like every video in one query, none in the next" lopsidedness without forcing the bot to swipe past obviously-great content.

### Example sessions

```bash
# Fresh pregnancy account — cold start with defaults
.venv/bin/python -m src.main --mode search-seed --platform android --topic pregnancy

# Same but dry-run first to verify ADB connection and nav flow
.venv/bin/python -m src.main --mode search-seed --platform android --topic pregnancy --videos-per-query 2 --dry-run

# Aggressive cold start — more videos per query, more follows
.venv/bin/python -m src.main --mode search-seed --platform android --topic pregnancy \
  --videos-per-query 10 --likes-per-query 5 --follows-per-query 2
```

**After search-seed completes**, switch to classic warmup mode for ongoing maintenance:

```bash
.venv/bin/python -m src.main --platform android --topic "pregnancy" --duration 20
```

The FYP should now be almost entirely pregnancy content thanks to the seed signal, so warmup mode's like/save/follow ratios will compound on a signal you already built instead of trying to build one from scratch.

### Always switch to Videos tab before tapping the first thumbnail

On the default "Top" search results tab, the first card is frequently a featured user, a hashtag page, or a sponsored result — tapping it drops out of the fullscreen swipeable feed, landing on a profile or a hashtag page and stalling the per-query loop on recovery nav. The **Videos** tab is the only results tab where tapping the first thumbnail reliably enters the fullscreen feed. The bot's navigator does this switch automatically before every `tap_first_video`; if you're scripting search nav outside the bot, replicate the behavior.

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

5. **BSD awk compatibility**: macOS ships BSD awk, which does NOT support `match($0, /regex/, capture_array)` — a gawk-specific extension. If `detect-account.sh` uses `match()` with a third argument for capture groups, it will silently fail on macOS. Replace with a `sed | awk` pipeline: use `sed -nE` to extract coordinate fields and pipe to plain `awk` for arithmetic. Always test scripts on macOS's default awk, not gawk.

6. **Cross-reference against your account database**. Once you have the handle, look it up in your project's accounts table to (a) confirm it matches the expected account for this warmup session and (b) resolve the local `account_id` so the new `warmup_sessions` row gets associated correctly without operator input.

Wrap this into a `detect-account.sh <serial>` script in your project (prints handle to stdout, distinct exit codes for foreground/dump/handle failures) and call it at the top of any launch-warmup script.

## Switching accounts (Android)

Since you have full ADB control, **never ask the user to manually swap accounts between warmup sessions** — drive the TikTok account-switcher via ADB. This only works for accounts that are already in the multi-account login list (i.e., previously logged in on that device). If an account isn't in the list, it requires a fresh login which this flow does not handle.

TikTok Android (`com.zhiliaoapp.musically`) account-switcher flow:

1. **Navigate to Profile**: Tap the `Profile` bottom-tab (same technique as `detect-account.sh` — parse bounds from UIAutomator dump, don't hardcode coordinates).

2. **Tap the header username button**. Dump the UI, find the node whose `resource-id` matches the build's clickable username button:
   - Pre-2026-04: `com.zhiliaoapp.musically:id/rfm` (Button, self-closing tag)
   - 2026-04 early: `com.zhiliaoapp.musically:id/oen` (LinearLayout wrapping TextView, open tag with children)
   - 2026-04 late (verified 2026-04-24): `com.zhiliaoapp.musically:id/rf6` (Button with `text="<username>"` — no `@` prefix). On this build `rfm` still exists but is now a non-clickable LinearLayout container spanning the upper half of the profile screen — tapping its center hits `rh4` (the @username line below) which is the new `rhk`-trap equivalent and does NOT open the switcher.

   Parse the matched node's bounds and tap the centerpoint.
   ```bash
   adb -s <serial> shell input tap <cx> <cy>
   ```
   **Critical gotcha 1 — match `rf6` first**: When alternation-matching `rf6|rfm|oen`, **prefer `rf6`** since on the current build `rfm` is a non-clickable container and matching it first will tap dead space. Match in priority order or filter `rfm`/`oen` matches by `clickable="true"`.

   **Critical gotcha 2 — self-closing vs open tags**: On older builds `rfm` was a `Button` with no children (dump ends with `/>` self-closing). On 2026-04 early `oen` is a `LinearLayout` that *wraps* the username TextView, so its opening tag ends with plain `>` and has nested `<node>` children. On 2026-04 late `rf6` is a `Button` again. A regex pinned to `[^>]*/>` will silently miss the open-tag form. Use `[^>]*>` so it matches either shape, OR use `[^>]*` followed by `/?>` to accept both.

   **Critical gotcha 3 — the `rhk`/`rh4` trap**: Do NOT tap the larger `@username` line below the header button — that's `resource-id="com.zhiliaoapp.musically:id/rhk"` (older) or `id/rh4` (2026-04 late) and either no-ops or goes to edit-profile instead of opening the switcher. Always use the actual header button (`rf6`/`oen`/`rfm`), never `rhk`/`rh4`.

3. **Wait ~1.5s for the bottom sheet**, then dump the UI. The "Switch account" bottom sheet is identifiable by `content-desc="Bottom sheet"`. Each logged-in account appears as a row with:
   - `resource-id="com.zhiliaoapp.musically:id/kqe"` (pre-2026-04-24) **or `com.zhiliaoapp.musically:id/kpe`** (2026-04-24+ — yet another silent rename, alongside `rfm→rf6`). Match `(kqe|kpe)` for cross-build safety.
   - `content-desc="<handle>"` (the bare handle — **without** the `@` prefix). Some accounts render with a numeric `user<id>` content-desc instead of the handle (typically when TikTok hasn't synced the handle on that device yet); maintain a project-local alias map (e.g. `oli.fragments → user5026110800762`) and fall back to it when the primary handle lookup misses.

4. **Tap the row** whose `content-desc` matches your target handle. Parse its bounds, tap the centerpoint.

5. **Wait ~6s** for TikTok to switch accounts and reload. The switch is not instant — the feed has to re-initialize.

6. **Verify with `detect-account.sh`**. If the verified handle doesn't match the target, fail — don't retry blindly, because a mismatch usually means a UI layout change broke the tap coordinates.

### Recommended: wrap it in `switch-account.sh`

Project-local script: `./switch-account.sh <serial> <handle>`
- Idempotent: if `detect-account.sh` already returns the target, exit 0 with no action.
- If the target isn't in the bottom-sheet account list, exit with a distinct code (e.g. `6`) and log the available handles — this signals "needs manual login first", which a caller can surface to the operator without retrying.
- Verify post-switch via `detect-account.sh`; exit with a different distinct code (e.g. `7`) on mismatch.
- After a successful switch, update the `accounts.phone_serial` column in the project DB so the new binding is recorded.

## The `uiautomator dump` stale-file trap

`adb shell uiautomator dump <path>` has two failure modes that will silently burn you if you trust the naive path:

1. **Exit code lies**. When the dump fails with `ERROR: could not get idle state` (triggered by an animating FYP video or a blinking comment-input cursor), uiautomator writes that to stderr but **exits with return code 0**. Any script that checks `$?` or Python code that checks `returncode != 0` will think the dump succeeded.

2. **Stale file fallback**. The previous successful dump's XML is still sitting at `/sdcard/p.xml` (or wherever you wrote it). A naive follow-up `adb pull` or `adb shell cat` returns that old XML, and you end up parsing a snapshot from a *different screen state* than the one currently visible. This is exactly how the warmup bot's `write_comment` flow was silently failing to send typed comments: `_find_send_button` was looking at a pre-comments dump that had no EditText, so it never found the send button — but the log still said "Comment posted."

The reliable pattern:

```bash
# 1. Delete the remote file first — no stale fallback possible.
adb -s "$SERIAL" shell rm -f /sdcard/p.xml

# 2. Run the dump and capture stdout (not exit code).
out=$(adb -s "$SERIAL" shell uiautomator dump /sdcard/p.xml 2>&1)

# 3. Verify uiautomator ACTUALLY wrote the file. The success message is
#    "UI hierchary dumped to: ..." (yes, "hierchary" is misspelled in the
#    upstream tool — do not "fix" the grep).
if echo "$out" | grep -q "UI hierchary dumped to"; then
  adb -s "$SERIAL" pull /sdcard/p.xml /tmp/p.xml
fi
```

**Retry strategy on "could not get idle state"**: tap the center of the screen to pause any animating video (TikTok's tap-to-pause behavior on the FYP — the comment panel's blinking cursor still animates, but less aggressively), wait ~0.5s, and retry up to 3 times. Use `wm size` to compute the center dynamically — don't hardcode.

This gotcha applies to both your project-local shell scripts AND the warmup bot's internal Python. If you're patching the warmup bot, the fix goes in `src/input/adb.py::_dump_ui()`.

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

## Never KEYCODE_BACK on the FYP

**The single most dangerous input you can send to TikTok Android is `KEYCODE_BACK` while the FYP is focused.** TikTok's FYP uses the "Tap again to exit" pattern: one back-press shows an exit toast, a second one quits the app entirely. A warmup bot that quits TikTok is a dead warmup bot — the orchestrator sees the process hang on a dead screen, uiautomator dumps return an Android home screen XML, and the bot enters an unrecoverable "stuck in modal" loop.

Routes where BACK has historically killed TikTok mid-session:

- **Fallback in `dismiss_modal`**: a promo popup like "Free Gifts" has an unlabeled close X (ImageView with no `content-desc="Close"`). If the naive `_tap_element("^Close$")` path falls back to `input keyevent KEYCODE_BACK`, you quit TikTok.
- **Fallback in `go_back`**: any action that presses BACK as a fallback when it can't find a Close element has the same risk. It's only safe to use BACK from a state where BACK is guaranteed to have an app-local destination (a profile page deep-link, an open comments panel). Never from the FYP itself.
- **State-machine overrides** (see next section): a platform-specific override can silently rewire `dismiss_modal` → `go_back`, turning a safe path into an unsafe one without anyone noticing.

**Rules:**

1. Never put `input keyevent KEYCODE_BACK` inside a modal-dismissal code path. Ever.
2. If your close-button search fails, **do nothing** and let the next AI-analysis iteration re-plan. A stuck bot loop is infinitely better than a quit bot.
3. Build a heuristic close-button finder as a fallback to label-based search: look for a small, roughly-square, clickable `ImageView`/`ImageButton`/`Button` in the top 60% of the screen, prefer the rightmost candidate (close X is conventionally top-right of popups). Filter by area (~0.05%–1.25% of screen) and aspect ratio (reject elongated shapes).
4. When dismissing bottom-sheet overlays that are *known* to sit on top of the FYP — the comments panel, the share sheet — BACK is actually safer than tapping, because those panels reliably dismiss on BACK without leaving the app. Keep the overlay-specific BACK paths, but scope them to *bottom-sheet overlays only*, never to generic "modal" state.

## The Android state-machine override trap

The warmup bot has a state machine that maps each detected screen state to a recovery action, with platform-specific overrides:

```python
RECOVERY_ACTIONS = {
    "modal": "dismiss_modal",    # default: call the heuristic close-finder
    ...
}

ANDROID_OVERRIDES = {
    "comments": "go_back",
    "share_sheet": "go_back",
    # "modal": "go_back",  <-- do NOT add this
}
```

**The trap**: if you add `"modal": "go_back"` to `ANDROID_OVERRIDES` thinking "BACK is more reliable on Android," you've just silently bypassed the entire `_action_dismiss_modal` code path including its heuristic close-button finder. The state machine routes around it, straight into `_action_go_back` → KEYCODE_BACK → quit TikTok.

This is particularly insidious because:

- The `dismiss_modal` action handler still *exists* and looks safe when you read it.
- You can't reproduce the bug by calling `dismiss_modal` manually — it only fires via the state machine on real modal events.
- When it fires, the failure looks like "the modal dismiss heuristic must have a bug" — when in fact the heuristic was never invoked.

**Rules:**

1. Keep `ANDROID_OVERRIDES` scoped to bottom-sheet overlays where BACK is *guaranteed* safe (comments, share sheet). Everything else uses the default.
2. When you add or modify a platform override, grep for the action name to confirm what handler actually gets called. `dismiss_modal` and `go_back` look similar in logs but have completely different blast radii.
3. When debugging an "it quits TikTok on modal" issue, trace backwards from the action actually executed (in the `Action: <name>` log line) to the state-machine recovery decision — don't trust that the handler you patched is the one being called.

## Self-healing overlay dismissal

TikTok regularly shows unexpected popups, modals, update prompts, and onboarding overlays that block the bottom navigation bar. When this happens, `switch-account.sh` and `detect-account.sh` can't find the Profile or Home tab and fail. Rather than failing immediately, these scripts now call `dismiss-overlays.sh` as a self-healing step before giving up.

### `dismiss-overlays.sh <serial>`

Project-local script that detects and clears overlays using 6 escalating strategies (least disruptive first):

1. **Tap known dismiss buttons by text** — cycles through common button labels: "Not now", "Maybe later", "Skip", "Close", "Got it", "OK", "Cancel", "No thanks", "Dismiss", "Save", "Not interested", "Done", "Later", "Allow", "Continue", "Remind me later"
2. **Tap known dismiss buttons by content-desc** — "Close", "Dismiss", "Back", "Navigate up", "Cancel"
3. **Heuristic close-X finder** — finds small, roughly-square, clickable `ImageView`/`ImageButton` nodes in the top 60% of the screen, prefers the rightmost candidate (close X is conventionally top-right). Filters by area (0.05%–1.25% of screen) and aspect ratio (≤ 3.0).
4. **KEYCODE_BACK** — only used when the bottom nav is hidden (confirming we're NOT on the bare FYP where BACK would quit TikTok). Tries up to 2 presses for nested pages.
5. **Tap center of screen** — dismisses tap-to-dismiss tooltips and coach marks.
6. **Swipe down** — dismisses bottom sheets.

**Final fallback**: if TikTok is no longer the foreground app after all strategies, relaunches TikTok via `am start`.

After each strategy, re-dumps the UI and checks if the bottom nav (Home + Profile tabs) is now visible. Exits `0` as soon as the nav appears. Exit `2` if all strategies fail.

### Integration with other scripts

- **`switch-account.sh`**: calls `dismiss-overlays.sh` at two points — when Profile tab isn't found (before step 1), and when the header username (`rfm` or `oen`) node isn't found on the profile page (before step 2).
- **`detect-account.sh`**: calls `dismiss-overlays.sh` when Profile tab isn't found.
- **Warmup orchestrator**: calls `dismiss-overlays.sh` proactively inside `navigate_to_fyp()` before any navigation attempt, and as a recovery step when switch fails before retrying the round.

### Adding new dismiss targets

When a new overlay pattern appears that the current strategies don't handle:
1. Take a `uiautomator dump` while the overlay is visible
2. Identify the dismiss button's `text`, `content-desc`, or `class`/position
3. Add the text to the `DISMISS_TEXTS` array (Strategy 1) or `DISMISS_DESCS` array (Strategy 2) in `dismiss-overlays.sh`
4. If it's a pattern without labeled buttons, extend the heuristic finder logic

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
11. **Never trust `uiautomator dump`'s exit code**: It returns 0 even when it fails with "could not get idle state." Always delete the remote file first and grep stdout for `"UI hierchary dumped to"` instead (see "The `uiautomator dump` stale-file trap" above). Applies to both your shell scripts and the warmup bot's Python `_dump_ui()`.
12. **Never `KEYCODE_BACK` in a modal-dismissal path**: On the FYP, BACK quits TikTok via the "Tap again to exit" flow, killing the warmup session. If you can't find a close X, do nothing and let the next AI iteration retry — a stuck loop is infinitely better than a quit bot. BACK is only safe inside explicitly bottom-sheet overlays (comments, share sheet), never for generic "modal" state (see "Never KEYCODE_BACK on the FYP" above).
13. **Don't add `"modal": "go_back"` to `ANDROID_OVERRIDES`**: This silently bypasses `_action_dismiss_modal` and its heuristic close-button finder, routing modal-dismissal straight to `_action_go_back` → KEYCODE_BACK → TikTok quits. When debugging "modal kills session" bugs, trace the actual `Action:` log line back to the state-machine decision, not the handler you think is being called (see "The Android state-machine override trap" above).
14. **Self-heal before failing**: When `switch-account.sh` or `detect-account.sh` can't find the Profile tab or header username, they now call `dismiss-overlays.sh` automatically before failing. Orchestrator scripts should also call `dismiss-overlays.sh` proactively in `navigate_to_fyp()` and as a recovery step when a round fails — this handles the common case where TikTok shows a popup after a warmup session ends that blocks the next account switch.
15. **On brand-new accounts, always start with `--mode search-seed` before classic warmup**: A fresh account's FYP is pure random content, so the warmup bot's engagement signals get diluted against irrelevant videos and you burn API budget for almost no directional signal. `search-seed` drives curated search queries instead (`--topic pregnancy` picks the preset), watches 8 videos per query, and engages with the best ones — every like is a clean topical signal because YOU chose the query. Only after search-seed has built a baseline should you switch to classic warmup mode for ongoing maintenance. Requires `--platform android` — iOS Voice Control lacks the raw text/tap primitives the nav flow needs. See "The cold-start problem" above.
