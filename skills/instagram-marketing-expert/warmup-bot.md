# Warmup Bot (Instagram)

AI-powered Instagram account warmup using Claude Vision. Browses Instagram on a connected phone, watches Reels, likes, comments, follows, and saves — training the algorithm to surface content in your niche on the Reels feed and Explore page.

This is the Instagram sibling of the TikTok warmup bot. The architecture, device-control stack, and run model are identical; the app-specific navigation and surfaces differ. It lives in `instagram-tools/warmup` and mirrors `tiktok-tools/warmup`.

The bot has two modes:

- **`--mode warmup`** (default) — Classic Reels-feed loop. Sits on the Reels tab, analyzes each reel, and engages with topic-relevant content. Best for accounts that already have a signal and just need to sharpen it.
- **`--mode search-seed`** — Cold-start loop for brand-new accounts. Runs a curated list of hashtag/keyword searches (picked by `--topic` from a preset), watches a handful of reels per query, and engages with the top ones. See "The cold-start problem" below.

> **Implementation note (writing to spec).** This skill describes the bot's design and the Instagram-specific behavior it must implement. Instagram's Android app (`com.instagram.android`) ships obfuscated, frequently-renamed `resource-id`s — exactly like TikTok's. **Do NOT hardcode resource-ids copied from the TikTok bot or guessed here.** Capture the real ones with `uiautomator dump` against the installed build during implementation, and prefer `content-desc` / visible `text` / Claude Vision targeting over brittle ids wherever possible. Where this doc names an id, treat it as "the node that does X — go find its current id," not a literal constant.

---

## Architecture

Identical to the TikTok warmup bot:

- **Main loop** (`bot.py`): capture screenshot → Claude Vision analyzes → decide action → execute → wait
- **State machine** (`state/machine.py`): tracks Reels-feed vs comments/profile/Explore/modal, auto-recovers
- **Platform abstraction**: Android (ADB screenshots + taps/swipes) or iOS (pymobiledevice3 + Voice Control)
- **AI** (`ai/analyzer.py`): sends screenshots to Claude, gets back action + relevance score

## Instagram surfaces (vs TikTok)

| Concept | TikTok | Instagram |
|---------|--------|-----------|
| Swipeable warmup feed | For You Page (FYP) | **Reels tab** (vertical swipe) |
| Discovery grid | (n/a) | **Explore** (magnifying-glass tab) — a grid of recommended posts/reels |
| Search entry | Search icon top-right of FYP | Search bar at top of the **Explore** page |
| Search result tabs | Top / Videos / Users… | Top / Accounts / Audio / Tags / Reels — **switch to Reels** for the swipeable feed |
| Like | heart icon / double-tap | heart icon / **double-tap** |
| Save | bookmark | **bookmark** (save to collection — Instagram's strongest positive signal) |
| Follow | Follow button | Follow button (rate-limited harder on IG for new accounts) |
| App package | `com.zhiliaoapp.musically` | **`com.instagram.android`** |

**Key behavioral differences to encode:**
- **Saves matter more on Instagram.** Saving a reel to a collection is the single strongest "more like this" signal. The engagement presets weight saves higher than on TikTok.
- **Follows are riskier.** Instagram aggressively rate-limits and action-blocks new accounts that follow too fast. Keep per-session follow caps low and spread them out.
- **Explore is a second signal surface.** Beyond the Reels feed, opening Explore and tapping into on-topic reels reinforces the niche. The warmup loop can interleave short Explore detours.

## Prerequisites

### One-time tool setup

```bash
git clone https://github.com/Beautiful-Engineering/instagram-tools.git
cd instagram-tools/warmup
python3 -m venv .venv
source .venv/bin/activate
pip install -e .
```

After `pip install -e .`, the `instagram-warmup` command is available (in the venv).

### Environment variables

Create `.env` in the warmup directory (`instagram-tools/warmup/.env`):

```
ANTHROPIC_API_KEY=sk-ant-...
```

### Device setup

Walk the user through the relevant platform setup below. These are one-time steps and identical to the TikTok bot's device setup.

#### Android

**On the Mac:**
1. Install ADB: `brew install android-platform-tools`
2. Verify: `adb version`

**On the phone:**
1. **Enable Developer Options**: Settings → About Phone → tap "Build Number" 7 times.
2. **Enable USB Debugging**: Settings → Developer Options → toggle on "USB Debugging"
3. **Connect** via USB cable
4. **Trust the Mac**: tap "Allow" on the "Allow USB debugging?" prompt (check "Always allow")

**Verify:**
```bash
adb devices
# XXXXXXXXX    device
```
If it shows `unauthorized`, unlock the phone and accept the prompt.

#### iOS

**On the iPhone:**
1. **Enable Developer Mode**: Settings → Privacy & Security → Developer Mode → ON (phone restarts).
2. **Trust the Mac**: connect via USB, tap "Trust".
3. **Enable Voice Control**: Settings → Accessibility → Voice Control → ON. This is how the bot taps/types on iOS.

**On the Mac:**
1. iOS 17+ needs a tunnel daemon:
   ```bash
   sudo python3 -m pymobiledevice3 remote tunneld
   ```
   Keep it running in a separate terminal for the whole session.
2. Mount the Developer Disk Image: `./setup_device.sh` (from the warmup directory).

**Verify:**
```bash
python3 -m pymobiledevice3 usbmux list
pymobiledevice3 developer screenshot /tmp/test.png && open /tmp/test.png
```

**iOS gotchas:**
- Voice Control must stay ON the entire session.
- `tunneld` must stay running — if it dies, the bot loses connection.
- iOS does NOT support `search-seed` mode (Voice Control lacks the raw text/tap primitives the search nav needs). Use Android for cold starts.

## CLI Reference

Run from `instagram-tools/warmup` with the venv activated:

```bash
source .venv/bin/activate
python -m src.main [OPTIONS]
```

### Required options

| Flag | Description |
|------|-------------|
| `--topic TEXT` | Niche topic for the warmup session (e.g., "running", "cooking", "skincare") |

### Optional flags

| Flag | Default | Description |
|------|---------|-------------|
| `--mode [warmup\|search-seed]` | `warmup` | `search-seed` cold-starts a fresh account via curated searches instead of grinding the Reels feed |
| `--platform [ios\|android]` | `android` | Device platform. **`search-seed` requires `android`** |
| `--duration INTEGER` | `30` | Session duration in minutes (warmup mode only) |
| `--engagement-rate [low\|medium\|high]` | `low` | Like/save/follow/comment frequency. **Default `low`** — Instagram rate-limits new accounts hard |
| `--max-follows INTEGER` | `3` | Max profiles to follow per session (keep conservative on IG) |
| `--explore-detours` | on | Interleave short Explore-page detours into the warmup loop for extra niche signal |
| `--device TEXT` | (auto) | ADB device serial (for multiple Android devices) |
| `--model TEXT` | `claude-haiku-4-5-20251001` | Claude model for vision analysis |
| `--voice TEXT` | `Samantha` | macOS voice for TTS (iOS only) |
| `--dry-run` | off | AI analysis only, no actions executed |
| `--save-screenshots` | off | Save screenshots to disk |
| `--log-level TEXT` | `info` | Logging level |
| `--videos-per-query INTEGER` | `8` | (`search-seed` only) Reels to watch per query |
| `--likes-per-query INTEGER` | `4` | (`search-seed` only) Soft cap on likes per query |
| `--saves-per-query INTEGER` | `2` | (`search-seed` only) Soft cap on saves per query |
| `--follows-per-query INTEGER` | `1` | (`search-seed` only) Soft cap on follows per query |

### Engagement presets

Instagram presets are more conservative than TikTok's and weight **saves** higher. Tune against real account-block thresholds during implementation.

| Preset | Like % | Save % | Max Follows | Comment Interval | Explore Detour |
|--------|--------|--------|-------------|-----------------|----------------|
| `low` | 12% | 8% | 3 | every 15-20 reels | every 20-25 reels |
| `medium` | 25% | 15% | 5 | every 10-14 reels | every 12-16 reels |
| `high` | 40% | 25% | 8 | every 6-9 reels | every 8-10 reels |

> **Use `low` for accounts younger than ~2 weeks.** Instagram action-blocks fresh accounts that like/follow too fast. A warmup session that triggers an action block is worse than no warmup — it flags the account.

## The cold-start problem

A brand-new Instagram account has no signal. Its Reels feed and Explore page are generic cold-start content — the algorithm hasn't seen any engagement, so it serves broad popular reels. Running the classic `--mode warmup` loop on this account means the bot analyzes mostly-irrelevant reels, swipes past them, and the few engagements it makes are diluted across random topics. You spend API budget and teach the algorithm almost nothing.

**`--mode search-seed` solves this.** Instead of waiting for the algorithm to surface relevant content, you drive directed attention through Instagram's search. Every reel the bot sees came from a query YOU chose, so every like/save/follow is a strong topical signal with no noise. Run this first on any fresh account.

### How it works

The search-seed runner iterates over a curated query list for the topic. For each query, it:

1. Opens the **Explore** tab (magnifying-glass in the bottom nav) and taps the search bar at the top
2. Types the query into the focused search input and submits
3. Switches to the **Reels** results tab (critical — see "Always switch to the Reels tab" below)
4. Taps the first reel thumbnail to enter the fullscreen swipeable feed
5. Runs the normal capture/analyze/act loop for `--videos-per-query` reels, enforcing soft budgets (likes/saves/follows per query)
6. Returns to Explore via the bottom-nav tab (do **not** rely on repeated BACK — see "Back-button safety" below)
7. Moves to the next query

After all queries are exhausted the session ends.

### Query presets

Query presets live in `instagram-tools/warmup/src/search_seed/queries.py`. Each topic maps to an ordered list of 8-15 natural-language queries and hashtags. The order matters — broad queries establish the macro-niche, narrower queries refine it. Do NOT randomize.

**Instagram search nuance:** Instagram's search ranks **hashtags** (`#pregnancyworkout`) and natural phrases differently. A good preset mixes both — a few high-volume hashtags to land on the niche, then natural phrases to refine. The Tags results tab is hashtag-only; the Reels tab is where the swipeable engagement happens, so the runner always lands queries on the Reels tab.

**Adding a new topic**: append to `QUERY_PRESETS` in `queries.py` with an ordered list. No other code changes needed.

### Choosing per-query budgets

Defaults (`--videos-per-query 8`, `--likes-per-query 4`, `--saves-per-query 2`, `--follows-per-query 1`):

- **8 reels per query** gets past the 1-2 featured/top slots and into the algorithmic long-tail without over-engaging on one query.
- **4 likes + 2 saves per query** builds signal fast. Saves are weighted heavily by Explore, so even a couple per query move the needle.
- **1 follow per query** keeps total follows across a ~12-query session at ~12 — under Instagram's new-account follow-spike threshold. **Do not raise this for accounts under ~2 weeks old.**

Budgets are **soft caps** — if the bot hits the like budget early, it keeps watching to `--videos-per-query` but stops counting new engagements against the budget.

### Example sessions

```bash
# Fresh skincare account — cold start with defaults
.venv/bin/python -m src.main --mode search-seed --platform android --topic skincare

# Dry-run first to verify ADB connection and nav flow
.venv/bin/python -m src.main --mode search-seed --platform android --topic skincare --videos-per-query 2 --dry-run
```

**After search-seed completes**, switch to classic warmup for maintenance:

```bash
.venv/bin/python -m src.main --platform android --topic "skincare" --duration 20 --engagement-rate low
```

The Reels feed should now be largely on-topic, so warmup's like/save/follow ratios compound on the signal you already built.

### Always switch to the Reels tab before tapping the first thumbnail

On the default "Top" search results tab, the first card is often a featured account, an audio page, or a hashtag page — tapping it drops out of the swipeable feed onto a profile or hashtag page and stalls the per-query loop. The **Reels** results tab is the only one where tapping the first thumbnail reliably enters the fullscreen swipeable feed. The navigator must switch to Reels before every `tap_first_video`.

## Detecting the logged-in account (Android)

On multi-phone setups it's easy to warm up the wrong account because phone↔account assignments drift. **Always verify which account is actually logged in before launching** — don't trust the operator's answer.

The reliable method is UI scraping via UIAutomator (Instagram app data isn't readable on a non-rooted device):

1. **Confirm Instagram is foreground**:
   ```bash
   adb -s <serial> shell dumpsys window | grep mCurrentFocus
   ```
   Should contain `com.instagram.android`. If not, fail loudly.

2. **Tap the Profile bottom-tab** (rightmost, the avatar). Don't hardcode coordinates — dump the UI and parse the bounds of the node whose `content-desc` indicates Profile:
   ```bash
   adb -s <serial> shell uiautomator dump /sdcard/p.xml
   adb -s <serial> pull /sdcard/p.xml /tmp/p.xml
   # Parse bounds="[x1,y1][x2,y2]" → tap centerpoint
   ```

3. **Sleep ~2s, re-dump, and read the handle.** On the profile screen Instagram shows the handle in the top action bar. Capture the actual node id/`content-desc` via a live dump — do not assume a specific id. As a Vision fallback, screenshot and read the handle from the top of the profile screen.

4. **Onboarding/overlay gotcha**: Instagram frequently shows full-screen prompts ("Turn on notifications", "Add to your story", "Save your login info") over the profile tab. Symptom: a tiny dump with no handle. Handle it the same way as the TikTok bot — scan top-of-screen close/dismiss buttons and tap, then re-dump. See `dismiss-overlays.sh` below.

5. **BSD awk compatibility**: macOS ships BSD awk, which does NOT support `match($0, /regex/, arr)` (a gawk extension). Use a `sed -nE | awk` pipeline for coordinate extraction. Test on macOS's default awk.

6. **Cross-reference against your account database** to confirm the handle matches the expected account and resolve the local `account_id` for the `warmup_sessions` row.

Wrap this into `detect-account.sh <serial>` (prints handle to stdout, distinct exit codes for foreground/dump/handle failures) and call it at the top of any launch script.

## Switching accounts (Android)

With full ADB control, **never ask the user to manually swap accounts between sessions** — drive Instagram's account switcher via ADB. This only works for accounts already in the multi-account login list (previously logged in on that device); fresh logins are out of scope.

Instagram Android account-switcher flow:

1. **Navigate to Profile** (bottom-tab; parse bounds from a dump, don't hardcode).
2. **Tap the header username/handle button** at the top of the profile screen to open the account switcher bottom sheet. **Capture the real `resource-id` from a live dump** — Instagram renames these between builds just like TikTok. Prefer matching by visible `text` equal to the current handle, or by Vision, over a hardcoded id.
3. **Wait ~1.5s** for the bottom sheet, then dump. Each logged-in account appears as a row labeled with its handle (`content-desc` or `text`). Some accounts may render a numeric `user<id>` instead of the handle — maintain a project-local alias map and fall back to it.
4. **Tap the row** whose label matches the target handle (parse bounds, tap centerpoint).
5. **Wait ~6s** for Instagram to switch and reload the feed (not instant).
6. **Verify with `detect-account.sh`.** On mismatch, fail — don't retry blindly (a mismatch usually means a layout change broke the tap targets).

### Recommended: wrap it in `switch-account.sh`

Project-local `./switch-account.sh <serial> <handle>`:
- Idempotent: if `detect-account.sh` already returns the target, exit 0.
- If the target isn't in the switcher list, exit with a distinct code (e.g. `6`) and log available handles — signals "needs manual login first".
- Verify post-switch via `detect-account.sh`; exit with a different code (e.g. `7`) on mismatch.
- After a successful switch, update `accounts.phone_serial` in the project DB.

## Back-button safety

**Be deliberate with `KEYCODE_BACK`.** Instagram's behavior differs from TikTok's "tap again to exit" FYP, but BACK is still the easiest way to send the bot somewhere unrecoverable mid-session (out of the Reels feed, into the previous tab, or — from the home feed — toward backgrounding the app). The TikTok bot's hard-won rule generalizes:

1. **Never put `KEYCODE_BACK` inside a modal-dismissal code path.** If a close-button search fails, **do nothing** and let the next AI iteration re-plan. A stuck loop is infinitely better than a bot that navigates itself off the warmup surface.
2. **Prefer bottom-nav taps over BACK** to return to a known surface (tap the Reels or Explore tab), rather than pressing BACK an unknown number of times.
3. **Build a heuristic close-button finder** as the fallback to label-based search: a small, roughly-square, clickable `ImageView`/`ImageButton`/`Button` in the top 60% of the screen, prefer the rightmost candidate. Filter by area (~0.05%–1.25% of screen) and aspect ratio.
4. BACK is acceptable only to dismiss **bottom-sheet overlays known to sit on top of a feed** (comments panel, share sheet) where it reliably dismisses without leaving the app. Scope BACK to those overlays only, never to generic "modal" state. Verify the exact behavior per build during implementation.

## The `uiautomator dump` stale-file trap

`adb shell uiautomator dump <path>` has two failure modes that silently burn you (identical to the TikTok bot):

1. **Exit code lies.** When the dump fails with `ERROR: could not get idle state` (triggered by an animating reel or a blinking comment cursor), it writes to stderr but **exits 0**. Scripts checking `$?` think it succeeded.
2. **Stale file fallback.** The previous successful dump's XML is still at `/sdcard/p.xml`. A naive follow-up pull returns that old XML — you parse a snapshot from a different screen state.

Reliable pattern:

```bash
# 1. Delete the remote file first — no stale fallback possible.
adb -s "$SERIAL" shell rm -f /sdcard/p.xml

# 2. Run the dump and capture stdout (not exit code).
out=$(adb -s "$SERIAL" shell uiautomator dump /sdcard/p.xml 2>&1)

# 3. Verify uiautomator ACTUALLY wrote the file. The success message is
#    "UI hierchary dumped to: ..." (yes, "hierchary" is misspelled upstream —
#    do not "fix" the grep).
if echo "$out" | grep -q "UI hierchary dumped to"; then
  adb -s "$SERIAL" pull /sdcard/p.xml /tmp/p.xml
fi
```

**Retry on "could not get idle state"**: tap the center of the screen to pause the animating reel, wait ~0.5s, retry up to 3 times. Compute center from `wm size` — don't hardcode. The fix goes in `src/input/adb.py::_dump_ui()`.

## Launching warmups as true background processes

The warmup bot runs for 20+ minutes, so it must survive the calling shell/agent exiting. **Do not spawn the warmup from within a sub-agent** — when the sub-agent terminates, its child processes get killed and you end up with 30-second "completed" sessions marked `running` forever.

Launch with `nohup` + `disown`:

```bash
cd /path/to/instagram-tools/warmup
nohup .venv/bin/python -m src.main \
  --platform android \
  --device <serial> \
  --topic "<topic>" \
  --duration 25 \
  --engagement-rate low \
  > /path/to/logs/warmup-<handle>-session<id>.log 2>&1 &
disown
```

Key points:
- Redirect BOTH stdout and stderr to a per-session log file.
- `disown` removes the process from the shell's job table so it survives parent exit.
- Use `.venv/bin/python` directly instead of `source .venv/bin/activate && python` — more reliable in non-interactive shells.
- One log file per session so parallel phones don't collide.
- After launch, verify with `ps aux | grep src.main` that the process is actually running.

## Self-healing overlay dismissal

Instagram regularly shows popups, update prompts, "Turn on notifications", and onboarding overlays that block the bottom navigation. When this happens, `switch-account.sh` and `detect-account.sh` can't find the Profile/Reels/Explore tab and fail. Rather than failing immediately, call `dismiss-overlays.sh` as a self-healing step first.

### `dismiss-overlays.sh <serial>`

Detects and clears overlays using escalating strategies (least disruptive first):

1. **Tap known dismiss buttons by text** — "Not now", "Maybe later", "Skip", "Close", "Got it", "OK", "Cancel", "No thanks", "Dismiss", "Not Now", "Turn on later", "Allow", "Continue", "Remind me later" (Instagram leans on "Not Now" heavily).
2. **Tap known dismiss buttons by content-desc** — "Close", "Dismiss", "Back", "Cancel".
3. **Heuristic close-X finder** — small, roughly-square, clickable node in the top 60% of the screen, prefer rightmost. Filter by area (0.05%–1.25%) and aspect ratio (≤ 3.0).
4. **KEYCODE_BACK** — only when the bottom nav is hidden (confirming we're NOT on a bare feed). Try up to 2 presses for nested pages.
5. **Tap center of screen** — dismisses tap-to-dismiss tooltips/coach marks.
6. **Swipe down** — dismisses bottom sheets.

**Final fallback**: if Instagram is no longer foreground after all strategies, relaunch via `am start -n com.instagram.android/.activity.MainTabActivity` (verify the launch activity for the installed build).

After each strategy, re-dump and check if the bottom nav (Reels + Profile tabs) is visible. Exit `0` as soon as the nav appears; exit `2` if all strategies fail.

### Adding new dismiss targets

When a new overlay appears: dump the UI while it's visible, identify the dismiss button's `text`/`content-desc`/position, and add it to `DISMISS_TEXTS`, `DISMISS_DESCS`, or extend the heuristic finder.

## Key gotchas

1. **Working directory**: Run from `instagram-tools/warmup/` (where `.env` lives).
2. **Venv**: Activate it (`source .venv/bin/activate`) or call `.venv/bin/python` directly.
3. **Instagram must be open on the Reels tab** before starting the bot (both modes).
4. **Logs**: The Rich Live display swallows terminal output. `tail -f` the per-session log in a separate terminal.
5. **Default to `low` engagement** for accounts under ~2 weeks old — Instagram action-blocks fresh accounts that like/follow too fast.
6. **Keep follows conservative**: per-session follow caps are lower than TikTok's. A follow action-block flags the account.
7. **Saves are the strongest signal**: weight saves heavily in cold-start and warmup engagement.
8. **Verify the logged-in account on multi-phone setups**: run `detect-account.sh <serial>` before every session; fail loudly on mismatch.
9. **Switch accounts programmatically, not manually**: use `switch-account.sh <serial> <handle>`; the account must already be in the multi-account login list.
10. **Never launch warmup from a sub-agent**: child processes die when the sub-agent exits. Spawn with `nohup ... & disown` from the top-level session.
11. **Never trust `uiautomator dump`'s exit code**: it returns 0 even on failure. Delete the remote file first and grep stdout for `"UI hierchary dumped to"`.
12. **Be deliberate with `KEYCODE_BACK`**: never in a modal-dismissal path; prefer bottom-nav taps to return to a known surface; scope BACK to known bottom-sheet overlays only.
13. **Capture real resource-ids live**: Instagram (`com.instagram.android`) obfuscates and renames ids between builds. Never hardcode ids copied from the TikTok bot or guessed — dump the installed build and prefer `content-desc`/`text`/Vision targeting.
14. **iOS can't do `search-seed`**: use Android for cold starts. On brand-new accounts, always run `--mode search-seed` before classic warmup.
