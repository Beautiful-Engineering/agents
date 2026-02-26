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

#### Android
1. Enable USB Debugging on the phone (Settings → Developer Options → USB Debugging)
2. Connect phone via USB
3. Verify: `adb devices` should show the device

#### iOS
1. Enable Developer Mode (Settings → Privacy & Security → Developer Mode)
2. Connect phone via USB, trust the Mac
3. Run the setup script: `./setup_device.sh`
4. Enable Voice Control (Settings → Accessibility → Voice Control)

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
