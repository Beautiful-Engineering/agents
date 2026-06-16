# Content Production (Carousel CLI)

How to produce Instagram carousel content using the shared `carousel` CLI (from `tiktok-tools`). The CLI is platform-agnostic — it generates and renders image carousels that you then publish to Instagram via PostBridge (see `posting-scheduling.md`).

> The `carousel` CLI is the same tool the TikTok agent uses. It produces multi-slide JPEG carousels, which map directly to Instagram **feed carousels**. For Instagram **Reels** (video), you supply the video asset and publish via PostBridge; carousel generation is for image posts.

---

## Working Directory

**All `carousel` commands run from the project directory** — the directory containing `carousel.db`, `brand.json`, and `.env`. The CLI is installed globally via `npm link` from `tiktok-tools/carousel` (one-time setup).

Project prerequisites:
- `carousel.db` exists (`carousel db:seed` to create)
- `.env` has `OPENAI_API_KEY`
- `brand.json` exists (drives copy voice, topics, CTA, hashtags)

## Command Groups

```
carousel account   create | list | show | set-status | delete
carousel format    create | list | show | delete
carousel post      create | generate | batch-generate | list | show | set-status | publish | delete
carousel image     scan | list | show | add | delete
carousel theme     create | list | show | update | delete | assign | show-account
carousel db:seed   initialize carousel.db in the current directory
carousel sync      generate Remotion compositions from DB
carousel render    render posts to JPEG (--account=<id>, --post=<id>)
```

## Account Setup

```bash
carousel account create <username> <email>     # create the account
carousel theme list                            # see available themes
carousel theme assign <account-id> <theme-id>  # assign a visual theme
carousel format create <account-id> "<format-name>"   # create a slide format template
carousel image scan public/images              # index background images
carousel account show <account-id>             # verify
```

**Theme assignment is required** — accounts without a theme have their posts skipped during sync/render.

## Single Post

```bash
carousel post generate <account-id> <format-id> "<topic>" --no-check-duplicates
carousel post show <post-id>
```

Always pass `--no-check-duplicates` to avoid hanging on an interactive prompt. After generation, optionally assign a background image to the hook slide.

## Batch Production

The fast path — generate many posts in parallel. **NEVER loop `post generate`.**

```bash
carousel post batch-generate <account-id> <format-id> "topic 1" "topic 2" "topic 3" ... -c 50
```

`-c 50` runs 50 concurrent OpenAI calls with automatic retry on rate limits. Pass ALL topics as separate quoted arguments in a single command.

Workflow:
1. Inventory available vs already-used background images.
2. Propose topics to the user (from `brand.json` topics or the growth story system). Get approval before spending OpenAI credits.
3. `batch-generate` all approved topics.
4. Assign background images to each post's hook slide.
5. `carousel sync`.

## Render & Export

```bash
carousel sync                      # ALWAYS sync before rendering
carousel render --account=<id>     # render all of an account's synced posts
carousel render --post=<id>        # render a single post
```

Output: `output/<username>/post-<id>/` (one JPEG per slide).

**Re-render gotcha**: posts with status `rendered` won't re-render. Reset first:
```bash
carousel post set-status <post-id> draft
carousel sync
carousel render --post=<id>
```

## Instagram-specific notes

- **Slide count**: Instagram feed carousels support up to 20 slides; 3-10 is the practical sweet spot. The hook slide is slide 1.
- **Aspect ratio**: Instagram favors 4:5 portrait (1080×1350) for feed reach. Confirm the assigned theme/renderer outputs a portrait-friendly size; adjust the renderer if it defaults to TikTok's 9:16.
- **First slide is the hook**: it's what shows in feed and Explore. Treat it like a thumbnail — high contrast, legible text, a strong promise.
- **Caption + hashtags** live in the DB and are assembled at posting time (see `posting-scheduling.md`).

## Gotchas

1. Run all commands from the **project directory**, not the tool directory.
2. Always `--no-check-duplicates` on `post generate`.
3. Always `batch-generate` for multiple posts — never loop.
4. Always `carousel sync` before `render`.
5. Reset status to `draft` to re-render an already-rendered post.
6. Accounts without an assigned theme are skipped during sync/render.
