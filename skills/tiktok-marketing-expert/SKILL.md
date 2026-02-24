---
name: TikTok Carousel Production System
description: Reference data for the carousel-generator content pipeline — CLI commands, themes, batch patterns, account setup, and theme creation
---

# TikTok Carousel Production System

Quick reference for the carousel-generator content pipeline. These files document the CLI, themes, workflows, and patterns for producing TikTok carousel content.

## When to Use

Use these references when:
- Running CLI commands for the carousel-generator
- Setting up a new TikTok account
- Batch generating posts with AI
- Creating new visual themes or renderers
- Rendering and exporting carousel images
- Posting and scheduling via PostBridge API
- Troubleshooting rendering or generation issues

## File Reference

| File | What It Covers |
|------|----------------|
| `cli-reference.md` | Complete CLI command reference — all 5 groups (account, format, post, image, theme), every subcommand, flags, and examples |
| `themes.md` | Theme catalog — pinterest, card, editorial descriptions, JSON configs, renderer behavior |
| `batch-production.md` | Step-by-step batch production pattern — image inventory, topic generation, generation loop, image assignment, sync, render |
| `new-account-setup.md` | Full walkthrough: create account, create/assign theme, create format, first post |
| `new-theme-creation.md` | How to create a new renderer + theme JSON + register + DB setup. Includes instructions for invoking `frontend-design` and `remotion-best-practices` skills |
| `posting-scheduling.md` | PostBridge API integration — uploading media, publishing instantly, scheduling posts, monitoring results, TikTok carousel notes |

## Key File Locations

| What | Path |
|------|------|
| CLI entry point | `carousel-generator/src/cli/index.ts` |
| Database | `carousel-generator/db/carousel.db` |
| Theme configs (JSON) | `carousel-generator/themes/*.json` |
| Renderers (TSX) | `carousel-generator/src/components/renderers/*.tsx` |
| Theme router | `carousel-generator/src/components/ThemeRenderer.tsx` |
| Type definitions | `carousel-generator/src/types/theme.ts` |
| Compositions sync | `carousel-generator/scripts/generate-compositions.js` |
| Render script | `carousel-generator/scripts/render-posts.js` |
| Brand config | `carousel-generator/brand.json` |
| Background images | `carousel-generator/public/images/` |
| Rendered output | `carousel-generator/output/<username>/post-<id>/` |
| Environment vars | `carousel-generator/.env` (needs `OPENAI_API_KEY`) |

## Working Directory

**All CLI and script commands must run from `carousel-generator/`.** The carousel-generator may be located at `carousel-generator/` or `carousel/` depending on the project setup. Check which exists.
