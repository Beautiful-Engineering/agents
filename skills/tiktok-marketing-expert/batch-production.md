# Batch Production Pattern

Step-by-step pattern for generating a batch of carousel posts, rendering, and scheduling to TikTok via PostBridge.

---

## Prerequisites

- Account exists with a theme assigned
- Format template exists for the account
- Background images are in the image library (run `image scan` if needed)
- `.env` has `OPENAI_API_KEY` and `POSTBRIDGE_API_KEY`

## Step 1: Image Inventory

Find which background images are available and which are already used.

```bash
cd /Users/felipeabello/Code/runo/growth/carousel-generator

# List all images in library
npx tsx src/cli/index.ts image list

# List existing posts for the account to see which images are used
npx tsx src/cli/index.ts post list <account-id>
```

## Step 2: Topic Generation

Propose topics to the user. Good running/cadence topics include:
- Form & technique (cadence, foot strike, overstriding, vertical oscillation)
- Science & physiology (180 SPM myth, running economy, VO2 max)
- Training tips (easy runs, recovery, drills, warmup)
- Gear & shoes (minimalist shoes, shoe rotation)
- Mental game (maintaining form when tired, race-day focus)
- Common mistakes (shin splints, knee pain, overtraining)
- Beginner content (how to start, finding natural cadence)

**IMPORTANT**: Present topics to the user and get approval before generating. Topics cost API credits.

## Step 3: Generate Posts

**Preferred: Batch generation** — generates all topics in parallel with automatic rate-limit retry:

```bash
cd /Users/felipeabello/Code/runo/growth/carousel-generator
npx tsx src/cli/index.ts post batch-generate <account-id> <format-id> "topic 1" "topic 2" "topic 3" -c 50
```

Background images are automatically assigned from the DB image library during generation. The AI never generates image filenames — they are always overridden with a random valid image from the `images` table.

**Alternative: One at a time** (slower, for small batches):

```bash
npx tsx src/cli/index.ts post generate <account-id> <format-id> "<topic>" --no-check-duplicates
```

## Step 4: Sync Compositions

Generate the Remotion compositions JSON from the database:

```bash
cd /Users/felipeabello/Code/runo/growth/carousel-generator && node scripts/generate-compositions.js
```

## Step 5: Render

**Preferred: Fast parallel renderer** — bundles once, renders all slides concurrently (~5 slides/s):

```bash
cd /Users/felipeabello/Code/runo/growth/carousel-generator
node scripts/render-fast.js --concurrency=30
node scripts/render-fast.js --concurrency=30 --account=<account-id>
```

**Alternative: CLI renderer** (slower, for small batches):

```bash
node scripts/render-posts.js --account=<account-id>
node scripts/render-posts.js --post=<post-id>
```

Output: `output/<username>/post-<id>/slide-1.jpg` through `slide-5.jpg` plus `caption.txt`.

Successfully rendered posts are automatically marked as `rendered`.

## Step 6: Schedule via PostBridge

Schedule all rendered posts to TikTok at 3 posts/day (7 AM, 2 PM, 5 PM EST):

```bash
cd /Users/felipeabello/Code/runo/growth/carousel-generator

# Dry run first to verify schedule
node scripts/schedule-all.js --dry-run

# Schedule all rendered posts (resumable — skips already-published)
node scripts/schedule-all.js --concurrency=1

# Schedule for a specific account
node scripts/schedule-all.js --concurrency=1 --account=<account-id>
```

**PostBridge concurrency limits**: Their API can handle ~1 post at a time. Each post requires 5 parallel image uploads + 1 post creation = 6 API calls. Concurrency > 1 causes 500/401 errors. The script has retry logic with exponential backoff and is fully resumable.

## Step 7: Verify

```bash
npx tsx src/cli/index.ts post list <account-id> -s published
```

---

## Complete Batch Script Pattern

1. Generate topics for each unused image
2. Run `npx tsx src/cli/index.ts post batch-generate <account-id> <format-id> "topic 1" "topic 2" ... -c 50`
3. Run `node scripts/generate-compositions.js`
4. Run `node scripts/render-fast.js --concurrency=30 --account=<id>`
5. Run `node scripts/schedule-all.js --concurrency=1 --account=<id>`

## Gotchas

- **Always use `--no-check-duplicates`** for single generation — `batch-generate` skips this automatically
- **Image paths must match exactly** — Use the path as stored in the images table (e.g., `/images/filename.jpg`)
- **Re-rendering requires status reset** — Reset to draft first: `npx tsx src/cli/index.ts post set-status <id> draft`
- **Sync before render** — Always run `generate-compositions.js` before rendering
- **AI never generates image filenames** — Background images are always assigned from the DB image library. The `backgroundImage` field is removed from the AI response schema.
- **Use render-fast.js for large batches** — Bundles once and renders all slides in parallel (~200x faster than CLI)
- **PostBridge concurrency** — Keep at 1 post at a time. Their API returns 500s at higher concurrency. The scheduler has retry + shared backoff and is resumable.
- **Scheduler is resumable** — Re-run `schedule-all.js` and it picks up where it left off (skips published posts, offsets dates)
