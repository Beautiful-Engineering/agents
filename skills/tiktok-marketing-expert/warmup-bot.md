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

## Key gotchas

1. **Working directory**: Run from `tiktok-tools/warmup/` (where `.env` lives)
2. **Venv**: Must activate the venv before running (`source .venv/bin/activate`)
3. **TikTok must be open**: Open TikTok on the For You Page before starting the bot
4. **Logs**: The Rich Live display swallows terminal output. Use `tail -f bot.log` in a separate terminal for debug logs
5. **Android ADB**: `uiautomator dump` freezes TikTok's UI briefly — the bot handles this with caching and timing
6. **iOS Voice Control**: Must be enabled in Accessibility settings for iOS input to work
7. **Multiple devices**: Use `--device SERIAL` when multiple Android phones are connected
