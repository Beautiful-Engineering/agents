# Posting & Scheduling via PostBridge (Instagram)

How to publish and schedule rendered carousels to Instagram using PostBridge — the same publishing API the TikTok agent uses, targeting Instagram instead.

---

## Overview

PostBridge is a multi-platform social publishing API. We use it to publish rendered carousel images (and Reels videos) to Instagram. It supports instant posting and scheduled publishing.

**Two interfaces:**
- **PostBridge MCP** (preferred for interactive use) — `mcp__post-bridge__*` tools, available in any Claude Code session
- **REST API** (for batch scripts) — used by `scripts/schedule-all.js` for bulk scheduling

**Key stored in**: `.env` as `POSTBRIDGE_API_KEY` (for batch scripts). MCP auth is configured globally in `~/.claude/settings.json`.

## Prerequisites

- Post is rendered (status: `rendered`) with JPEG files in `output/<username>/post-<id>/`
- **Instagram Business or Creator account** connected in the PostBridge dashboard (one-time setup). Personal accounts cannot publish via the API.
- For MCP: PostBridge MCP server configured in `~/.claude/settings.json`
- For batch scripts: `POSTBRIDGE_API_KEY` set in `.env`

## Interactive Publishing (MCP Tools)

### Step 1: Get Social Account IDs

```
mcp__post-bridge__list_social_accounts
```

Returns `id`, `platform`, and `username` for each connected account. **Pick the row where `platform` is `instagram`** and save its `id`.

### Step 2: Upload Media (Local Files)

The MCP's `create_post` supports public `media_urls` but NOT local file uploads. For local carousel images, upload via the REST API first:

```bash
# For each slide JPEG:

# 2a. Create upload URL
curl -s -X POST "https://api.post-bridge.com/v1/media/create-upload-url" \
  -H "Authorization: Bearer $POSTBRIDGE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "slide-1.jpg",
    "mime_type": "image/jpeg",
    "size_bytes": SIZE_IN_BYTES
  }'

# 2b. Upload file to signed URL
curl -s -X PUT "UPLOAD_URL_FROM_RESPONSE" \
  -H "Content-Type: image/jpeg" \
  --data-binary @output/username/post-ID/slide-1.jpg
```

Collect all `media_id` values, in slide order.

### Step 3: Create Post

```
mcp__post-bridge__create_post
  caption: "CAPTION_TEXT_WITH_HASHTAGS"
  social_accounts: [INSTAGRAM_SOCIAL_ACCOUNT_ID]
  media_urls: ["media_id_1", "media_id_2", ...]   # slide order matters
  scheduled_at: "2026-03-15T14:00:00.000Z"        # omit for immediate posting
  platform_configurations: {
    "instagram": {
      "placement": "feed"        # "feed" (carousel/image), "reels" (video), or "stories"
    }
  }
```

> **Verify the exact `platform_configurations.instagram` keys against the current PostBridge docs / MCP schema** before relying on them. PostBridge's Instagram config commonly supports a `placement` field (`feed` / `reels` / `stories`) and, for Reels, options like `share_to_feed`. Keys evolve — confirm rather than assume. There is no `is_aigc` requirement on Instagram the way there is on TikTok.

### Step 4: Monitor Results

```
mcp__post-bridge__list_post_results
  post_id: [POST_ID]
```

### Managing Scheduled Posts

```
mcp__post-bridge__list_posts        platform: ["instagram"]  status: ["scheduled"]
mcp__post-bridge__get_post          id: POST_ID
mcp__post-bridge__update_post       id: POST_ID  caption: "..."  scheduled_at: "..."   # ALWAYS include scheduled_at
mcp__post-bridge__delete_post       id: POST_ID
```

---

## Placement guide

| Content | `placement` | Notes |
|---------|-------------|-------|
| Multi-slide carousel | `feed` | Pass all slide `media_id`s in order; slide 1 is the cover |
| Single image | `feed` | One `media_id` |
| Video Reel | `reels` | One video `media_id`; consider `share_to_feed` to also surface in the feed grid |
| Story | `stories` | Single image or short video; ephemeral |

Carousels are produced by the `carousel` CLI (see `content-production.md`). Reels/Stories require you to supply the video/image asset — the carousel pipeline doesn't generate video.

## Building the Caption

Combine the post's caption and hashtags from the carousel DB:

```bash
node -e "
const Database = require('better-sqlite3');
const db = new Database('carousel.db');
const post = db.prepare('SELECT caption, hashtags FROM posts WHERE id = ?').get(POST_ID);
const hashtags = JSON.parse(post.hashtags).map(t => '#' + t).join(' ');
console.log(post.caption + '\n\n' + hashtags);
db.close();
"
```

**Instagram caption notes:**
- Caption limit is 2,200 characters; only the first ~125 show before "more" — front-load the hook.
- Hashtags: 3-5 well-targeted tags outperform 30 generic ones on current Instagram. Mix one broad, a few niche, one branded.
- The first comment is no longer needed for hashtags — put them in the caption.

## Scheduling Strategy

- 1-2 feed posts per day per account is plenty for Instagram (over-posting suppresses reach more than on TikTok). Reels can be more frequent.
- Good time slots (EST): ~11 AM, ~7 PM. Adjust to the account's audience analytics.
- **Random jitter ±30 minutes** on each scheduled time to avoid bot-like exact patterns.
- Use ISO 8601 for `scheduled_at`.
- Always confirm the schedule with the user before creating scheduled posts.

## Bulk Scheduling Script

For many posts at once, use `scripts/schedule-all.js` (NOT the MCP — it's not built for batch ops):

```bash
cd /path/to/project
node scripts/schedule-all.js --dry-run                       # preview
node scripts/schedule-all.js --concurrency=1                 # schedule all rendered posts
node scripts/schedule-all.js --concurrency=1 --account=<id>  # one account
```

Features: resumable (skips published posts), parallel slide uploads within a post, retry with backoff on 429/500 and network errors, shared backoff across workers, jittered times. **Set `platform`/`placement` to Instagram in the script config.**

## PostBridge API Limits

- **Max concurrency: 1 post at a time** — higher causes 500/401 errors.
- **No batch/bulk API** — each carousel post is N media uploads + 1 post create.
- **Throughput ~0.15-0.2 posts/sec** — limited by the PostBridge server.
- **Media auto-deletes after 24h** if not attached to a post.

## Gotchas

- **Instagram needs a Business/Creator account** connected in PostBridge — personal accounts can't publish via the API.
- **Always include `scheduled_at`** when updating a scheduled post — omitting it triggers immediate processing.
- **Set the right `placement`** — a video sent with `feed` or a carousel sent with `reels` will fail or post wrong.
- **Media auto-deletes after 24h** if unattached — upload close to posting time.
- **Upload URLs are short-lived** — upload immediately after creating the URL.
- **File size needed upfront** — you must know the JPEG size before requesting the upload URL.
- **Keep concurrency at 1** — PostBridge can't handle concurrent post creation reliably.
- **Use jittered times** — add random ±30min offset to schedule times.
- **Network errors are common** — PostBridge drops connections under load; the scheduler retries automatically.
- **Verify `platform_configurations.instagram` keys** against current PostBridge docs — they evolve.
