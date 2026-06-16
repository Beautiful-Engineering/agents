---
name: TikTok Marketing Expert
description: Reference data for the TikTok marketing toolkit — organic growth playbook, content strategy, warmup bot for account training, carousel-generator for image carousels, and video-generator for AI-generated product scanning videos
---

# TikTok Marketing Expert

Full-stack TikTok growth system: (1) **Organic Growth Playbook** — 6-phase strategic roadmap from account creation to scaled multi-account operation, (2) **Content Strategy** — hook formulas, CTA types, proven formats, and performance tracking, (3) **Warmup Bot** — AI-powered account training via Claude Vision, (4) **Carousel Generator** — image carousel production pipeline with AI generation, Remotion rendering, and PostBridge scheduling, and (5) **Video Generator** — AI-generated pregnancy product scanning videos with Replicate Seedance 2.0, Remotion compositing, automated product discovery via Open Food Facts, and PostBridge publishing.

## When to Use

Use these references when:
- Coaching a user through organic growth strategy (what phase they're in, what to do next)
- Building content strategy (hooks, CTAs, formats, performance tracking)
- Deciding when to scale, add accounts, or start automating
- Warming up a new TikTok account (training the algorithm)
- Running CLI commands for the carousel-generator
- Setting up a new TikTok account in the carousel system
- Batch generating posts with AI
- Creating new visual themes or renderers
- Rendering and exporting carousel images
- Posting and scheduling via PostBridge API
- Generating AI videos for product scanning content
- Finding products by category for video content
- Troubleshooting rendering, generation, or warmup issues

## File Reference

### Strategy & Growth
| File | What It Covers |
|------|----------------|
| `organic-growth-playbook.md` | 6-phase organic growth roadmap — account creation, community building, content-market fit, trend riding, conversion optimization, scaling |
| `content-strategy.md` | Hook formulas, 4 CTA types, proven formats, image gen tips, text overlay rules, performance tracking |
| `scaling-strategy.md` | Scaling prerequisites, the scaling math, automation thresholds, cross-platform expansion |
| `warmup-bot.md` | Warmup bot setup, CLI reference, engagement presets, search-seed cold-start flow |
| `analytics.md` | PostBridge analytics — syncing TikTok data, engagement metrics, benchmarks |
| `posting-scheduling.md` | PostBridge integration — media uploads, batch scheduling, TikTok notes |

### Carousel Generator (Image Posts)
| File | What It Covers |
|------|----------------|
| `cli-reference.md` | Carousel CLI command reference — account, format, post, image, theme commands |
| `themes.md` | Theme catalog — pinterest, card, editorial descriptions, JSON configs |
| `batch-production.md` | Carousel batch production pattern — image inventory, topic generation, render |
| `new-account-setup.md` | Carousel account setup: create account, assign theme, create format, first post |
| `new-theme-creation.md` | How to create a new carousel renderer + theme JSON |

### Video Generator (AI Product Scanning Videos)
| File | What It Covers |
|------|----------------|
| `video-cli-reference.md` | Video CLI command reference — `video auto`, `video batch`, product commands, all flags |
| `video-batch-production.md` | Video batch production pattern — theme × account matrix, cost estimates, content variety |
| `video-themes-hooks.md` | Hook themes (snacks, drinks, breakfast, dairy, sauces, skincare), OFF category mappings, settings, hook templates |
| `video-accounts-characters.md` | 10 Oli accounts, AI character prompts for Seedance 2.0, account ↔ theme recommendations |

## Key File Locations

The carousel system splits files between the **tool directory** (shared code) and the **project directory** (per-brand data).

### Tool directory (installed once, shared)

| What | Path |
|------|------|
| CLI entry point | `<tool>/src/cli/index.ts` |
| Theme configs (JSON) | `<tool>/themes/*.json` |
| Renderers (TSX) | `<tool>/src/components/renderers/*.tsx` |
| Theme router | `<tool>/src/components/ThemeRenderer.tsx` |
| Type definitions | `<tool>/src/types/theme.ts` |
| DB schema | `<tool>/db/schema.sql` |

### Project directory (per-brand, cwd)

| What | Path |
|------|------|
| Database | `carousel.db` |
| Brand config | `brand.json` |
| Environment vars | `.env` (needs `OPENAI_API_KEY`) |
| Rendered output | `output/<username>/post-<id>/` |

## Working Directory

**All `carousel` commands run from the project directory** — the directory containing `carousel.db`, `brand.json`, and `.env`. The `carousel` CLI is installed globally via `npm link` from the tool directory (one-time setup).
