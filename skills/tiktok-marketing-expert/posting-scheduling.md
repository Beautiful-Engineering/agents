# Posting & Scheduling via PostBridge

How to publish and schedule rendered carousel posts to TikTok using PostBridge.

---

## Overview

PostBridge is a social media publishing API that handles multi-platform posting. We use it to publish rendered carousel images to TikTok accounts. The API supports instant posting and scheduled publishing.

**Two interfaces available:**
- **PostBridge MCP** (preferred for interactive use) — tools available in any Claude Code session via `mcp__post-bridge__*`
- **REST API** (for batch scripts) — used by `scripts/schedule-all.js` for bulk scheduling

**Key stored in**: `.env` as `POSTBRIDGE_API_KEY` (for batch scripts). MCP auth is configured globally in `~/.claude/settings.json`.

## Prerequisites

- Post is rendered (status: `rendered`) with JPEG files in `output/<username>/post-<id>/`
- TikTok account is connected in PostBridge dashboard (one-time setup)
- For MCP: PostBridge MCP server is configured in `~/.claude/settings.json`
- For batch scripts: `POSTBRIDGE_API_KEY` is set in `.env`

## Interactive Publishing (MCP Tools)

Use MCP tools for single posts, checking status, and managing scheduled posts.

### Step 1: Get Social Account IDs

```
mcp__post-bridge__list_social_accounts
```

Returns `id`, `platform`, and `username` for each connected account. Save the `id`.

### Step 2: Upload Media (Local Files)

The MCP's `create_post` supports `media_urls` (public URLs) but NOT local file uploads. For local carousel images, upload via the REST API first:

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

Collect all `media_id` values. Repeat for all 5 slides.

### Step 3: Create Post

```
mcp__post-bridge__create_post
  caption: "CAPTION_TEXT_WITH_HASHTAGS"
  social_accounts: [SOCIAL_ACCOUNT_ID]
  media_urls: ["media_id_1", "media_id_2", ...]  # if using uploaded media IDs
  scheduled_at: "2026-03-15T14:00:00.000Z"       # omit for immediate posting
  platform_configurations: {
    "tiktok": {
      "title": "POST_TITLE_FROM_DB",
      "is_aigc": true
    }
  }
```

### Step 4: Monitor Results

```
mcp__post-bridge__list_post_results
  post_id: [POST_ID]
```

### Managing Scheduled Posts

```
# List scheduled posts
mcp__post-bridge__list_posts
  platform: ["tiktok"]
  status: ["scheduled"]

# Get single post details
mcp__post-bridge__get_post
  id: POST_ID

# Update a scheduled post (ALWAYS include scheduled_at)
mcp__post-bridge__update_post
  id: POST_ID
  caption: "Updated caption"
  scheduled_at: "2026-03-15T14:00:00.000Z"

# Delete/cancel a post
mcp__post-bridge__delete_post
  id: POST_ID
```

---

## Building the Caption

The caption for PostBridge should combine the post's caption and hashtags from the carousel DB:

```bash
node -e "
const Database = require('better-sqlite3');
const db = new Database('db/carousel.db');
const post = db.prepare('SELECT caption, hashtags FROM posts WHERE id = ?').get(POST_ID);
const hashtags = JSON.parse(post.hashtags).map(t => '#' + t).join(' ');
console.log(post.caption + '\n\n' + hashtags);
db.close();
"
```

---

## TikTok Carousel Notes

- TikTok carousels are created by passing **multiple image media IDs** in the `media` array
- Order matters — slide 1 should be the first media_id in the array
- Set `is_aigc: true` in TikTok platform config since content is AI-generated
- **Always set `title`** in TikTok platform config using the post's title from the carousel DB
- Media assets auto-delete after 24 hours if not attached to a post

## Scheduling Strategy

- 3 posts per day per account at 7 AM, 2 PM, 5 PM EST (12:00, 19:00, 22:00 UTC)
- **Random jitter ±30 minutes** on each scheduled time to avoid bot-like exact scheduling patterns
- Use ISO 8601 format for `scheduled_at`
- Always confirm schedule with the user before creating scheduled posts

## Bulk Scheduling Script

For scheduling many posts at once, use `scripts/schedule-all.js` (NOT the MCP — it's not designed for batch ops):

```bash
cd /path/to/project

# Dry run (shows what would be scheduled)
node scripts/schedule-all.js --dry-run

# Schedule all rendered posts across all accounts
node scripts/schedule-all.js --concurrency=1

# Schedule for a specific account
node scripts/schedule-all.js --concurrency=1 --account=<id>
```

Features:
- **Resumable** — skips already-published posts, offsets schedule dates accordingly
- **Parallel slide uploads** — uploads all 5 slides concurrently within each post
- **Retry with backoff** — handles 429/500 errors with exponential backoff
- **Network error retry** — catches "fetch failed", ECONNRESET, and network drops with 10s/20s/40s backoff
- **Shared backoff** — when one request hits rate limit, all workers pause
- **Jittered times** — ±30 min random offset on each time slot to avoid bot detection

## PostBridge API Limits

- **Max concurrency: 1 post at a time** — higher concurrency causes 500/401 errors
- **No batch/bulk API** — each post requires 6 API calls (5 media uploads + 1 post create)
- **Throughput: ~0.15-0.2 posts/sec** — limited by PostBridge server, not client
- **Media auto-deletes after 24h** if not attached to a post

## Gotchas

- **Always include `scheduled_at`** when updating a scheduled post — omitting it triggers immediate processing
- **Media auto-deletes** after 24 hours if unattached, so upload close to posting time
- **Upload URLs are short-lived** — upload immediately after creating the URL
- **File size needed upfront** — you must know the JPEG file size before requesting the upload URL
- **`is_aigc: true`** — Always set this since carousels are AI-generated content
- **Keep concurrency at 1** — PostBridge cannot handle concurrent post creation reliably
- **Use jittered times** — Always add random ±30min offset to schedule times to avoid bot detection by TikTok
- **Network errors are common** — PostBridge server drops connections under sustained load; the scheduler retries automatically
