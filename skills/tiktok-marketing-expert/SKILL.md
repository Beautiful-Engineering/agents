---
name: TikTok Marketing Expert
description: Reference data for the TikTok marketing toolkit — warmup bot for account training and carousel-generator for content production
---

# TikTok Marketing Expert

Two tools for TikTok growth: (1) **Warmup Bot** — AI-powered account training via Claude Vision, and (2) **Carousel Generator** — content production pipeline with AI generation, Remotion rendering, and PostBridge scheduling.

## When to Use

Use these references when:
- Warming up a new TikTok account (training the algorithm)
- Running CLI commands for the carousel-generator
- Setting up a new TikTok account in the carousel system
- Batch generating posts with AI
- Creating new visual themes or renderers
- Rendering and exporting carousel images
- Posting and scheduling via PostBridge API
- Troubleshooting rendering, generation, or warmup issues

## File Reference

| File | What It Covers |
|------|----------------|
| `warmup-bot.md` | Warmup bot setup, CLI reference, engagement presets, platform setup (Android/iOS), and session examples |
| `cli-reference.md` | Complete carousel CLI command reference — all 5 groups (account, format, post, image, theme), every subcommand, flags, and examples |
| `themes.md` | Theme catalog — pinterest, card, editorial descriptions, JSON configs, renderer behavior |
| `batch-production.md` | Step-by-step batch production pattern — image inventory, topic generation, generation loop, image assignment, sync, render |
| `new-account-setup.md` | Full walkthrough: create account, create/assign theme, create format, first post |
| `new-theme-creation.md` | How to create a new renderer + theme JSON + register + DB setup. Includes instructions for invoking `frontend-design` and `remotion-best-practices` skills |
| `posting-scheduling.md` | PostBridge API integration — uploading media, publishing instantly, scheduling posts, monitoring results, TikTok carousel notes |

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
