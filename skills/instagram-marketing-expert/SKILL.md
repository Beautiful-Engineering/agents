---
name: Instagram Marketing Expert
description: Reference data for the Instagram marketing toolkit — warmup bot for account training (Reels/Explore engagement via Claude Vision), carousel content production, PostBridge posting/scheduling, and performance analytics. Instagram-specific; shares the carousel CLI and PostBridge pipeline with the TikTok agent.
---

# Instagram Marketing Expert

Two-capability Instagram growth system: (1) **Warmup Bot** — AI-powered account training via Claude Vision that browses Reels/Explore on a connected phone and engages with niche content, and (2) **Posting Pipeline** — carousel content production (AI generation + Remotion rendering via the shared `carousel` CLI) and PostBridge publishing/scheduling to Instagram feed, Reels, and Stories.

## When to Use

Use these references when:
- Warming up a new or established Instagram account (training the algorithm)
- Cold-starting a brand-new account with directed search-seed engagement
- Setting up a new Instagram account in the carousel system
- Generating or batch-generating carousel posts with AI
- Rendering and exporting carousel images
- Posting and scheduling to Instagram via PostBridge
- Reviewing Instagram post performance and optimizing content
- Troubleshooting warmup, generation, rendering, or posting issues

## File Reference

| File | What It Covers |
|------|----------------|
| `warmup-bot.md` | Instagram warmup bot — device setup (Android/iOS), CLI reference, engagement presets, Reels-feed warmup loop, search-seed cold-start, account detection/switching, background-process launching, gotchas |
| `content-production.md` | Carousel CLI reference — account setup, single + batch post generation, image assignment, sync, render & export |
| `posting-scheduling.md` | PostBridge integration for Instagram — media uploads, placement (feed/reels/stories), captions, scheduling, bulk scheduling, gotchas |
| `analytics.md` | PostBridge analytics for Instagram — syncing data, the metrics that matter (reach, saves, shares), benchmarks, optimization loop |

## Tooling

Two tool repos back this agent:

| Repo | Provides | Setup |
|------|----------|-------|
| `instagram-tools` | The Instagram warmup bot (`warmup/`) | `cd instagram-tools/warmup && python3 -m venv .venv && source .venv/bin/activate && pip install -e .` |
| `tiktok-tools` | The shared `carousel` CLI (content generation + rendering) | `cd tiktok-tools/carousel && npm install && npm link` |

The `carousel` CLI is platform-agnostic — the same generated carousels can be published to Instagram or TikTok via PostBridge. Only the warmup bot is Instagram-specific.

## Key File Locations

### Warmup tool directory (`instagram-tools/warmup`)
| What | Path |
|------|------|
| Entry point | `instagram-tools/warmup/src/main.py` |
| Env vars | `instagram-tools/warmup/.env` (needs `ANTHROPIC_API_KEY`) |
| Search-seed query presets | `instagram-tools/warmup/src/search_seed/queries.py` |
| Per-session logs | project-local `logs/warmup-<handle>.log` |

### Carousel tool directory (`tiktok-tools/carousel`, installed via `npm link`)
| What | Path |
|------|------|
| CLI entry point | `<tool>/src/cli/index.ts` |
| Theme configs (JSON) | `<tool>/themes/*.json` |
| Renderers (TSX) | `<tool>/src/components/renderers/*.tsx` |

### Project directory (per-brand, cwd)
| What | Path |
|------|------|
| Database | `carousel.db` |
| Brand config | `brand.json` |
| Environment vars | `.env` (needs `OPENAI_API_KEY`; `POSTBRIDGE_API_KEY` for batch scheduling) |
| Rendered output | `output/<username>/post-<id>/` |

## Working Directory

- **`carousel` commands** run from the **project directory** (where `carousel.db`, `brand.json`, `.env` live).
- **Warmup commands** run from `instagram-tools/warmup` (where the warmup `.env` lives).
