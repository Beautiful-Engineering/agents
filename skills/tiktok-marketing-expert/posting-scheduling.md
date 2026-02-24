# Posting & Scheduling via PostBridge API

How to publish and schedule rendered carousel posts to TikTok using the PostBridge API.

---

## Overview

PostBridge is a social media publishing API that handles multi-platform posting. We use it to publish rendered carousel images to TikTok accounts. The API supports instant posting and scheduled publishing.

**Base URL**: `https://api.post-bridge.com/v1`
**Auth**: Bearer token in `Authorization` header. API key from PostBridge account.
**Key stored in**: `.env` as `POSTBRIDGE_API_KEY`

## Prerequisites

- Post is rendered (status: `rendered`) with JPEG files in `output/<username>/post-<id>/`
- PostBridge API key is set in `.env`
- TikTok account is connected in PostBridge dashboard (one-time setup)
- Know the PostBridge social account ID for the TikTok account

## Complete Publishing Workflow

### Step 1: Get Social Account IDs

Retrieve connected TikTok accounts from PostBridge:

```bash
curl -s -X GET "https://api.post-bridge.com/v1/social-accounts?platform[]=tiktok" \
  -H "Authorization: Bearer $POSTBRIDGE_API_KEY" | jq .
```

Response includes `id`, `platform`, and `username` for each connected account. Save the `id` — you'll need it for posting.

### Step 2: Upload Media (Each Slide Image)

For each slide JPEG, create an upload URL and upload the file.

**2a. Create upload URL:**

```bash
curl -s -X POST "https://api.post-bridge.com/v1/media/create-upload-url" \
  -H "Authorization: Bearer $POSTBRIDGE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "slide-1.jpg",
    "mime_type": "image/jpeg",
    "size_bytes": SIZE_IN_BYTES
  }' | jq .
```

**2b. Upload file to signed URL:**

```bash
curl -s -X PUT "UPLOAD_URL_FROM_RESPONSE" \
  -H "Content-Type: image/jpeg" \
  --data-binary @output/username/post-ID/slide-1.jpg
```

**2c. Repeat for all slides** (typically 5 slides per carousel).

Collect all `media_id` values — you'll pass them as an array when creating the post.

### Step 3: Create Post

**Instant post** (publishes immediately):

```bash
curl -s -X POST "https://api.post-bridge.com/v1/posts" \
  -H "Authorization: Bearer $POSTBRIDGE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "caption": "CAPTION_TEXT_WITH_HASHTAGS",
    "social_accounts": [SOCIAL_ACCOUNT_ID],
    "media": ["media_id_1", "media_id_2", "media_id_3", "media_id_4", "media_id_5"],
    "platform_configurations": {
      "tiktok": {
        "title": "POST_TITLE_FROM_DB",
        "is_aigc": true
      }
    }
  }' | jq .
```

**Scheduled post** (publishes at a future time):

Add `"scheduled_at": "2026-03-15T14:00:00.000Z"` to the body.

### Step 4: Monitor Results

```bash
curl -s -X GET "https://api.post-bridge.com/v1/post-results?post_id[]=POST_ID" \
  -H "Authorization: Bearer $POSTBRIDGE_API_KEY" | jq .
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

## API Reference

### Endpoints Used

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/v1/social-accounts?platform[]=tiktok` | List connected TikTok accounts |
| POST | `/v1/media/create-upload-url` | Get signed upload URL for a slide image |
| PUT | `{upload_url}` | Upload the actual image file |
| POST | `/v1/posts` | Create and publish/schedule the post |
| GET | `/v1/posts?platform[]=tiktok&status[]=scheduled` | List scheduled posts |
| GET | `/v1/post-results?post_id[]=ID` | Check publish result |
| PATCH | `/v1/posts/{id}` | Update a scheduled post |
| DELETE | `/v1/posts/{id}` | Cancel/delete a post |

### Create Post Body Schema

```typescript
{
  caption: string;
  social_accounts: number[];
  media?: string[];
  media_urls?: string[];
  scheduled_at?: string;       // ISO 8601. null = post immediately
  is_draft?: boolean;
  platform_configurations?: {
    tiktok?: {
      caption?: string;
      media?: string[];
      title?: string;          // Post title (always set this)
      is_aigc?: boolean;       // AI-generated content label (always true)
    }
  };
}
```

---

## TikTok Carousel Notes

- TikTok carousels are created by passing **multiple image media IDs** in the `media` array
- Order matters — slide 1 should be the first media_id in the array
- Set `is_aigc: true` in TikTok platform config since content is AI-generated
- **Always set `title`** in TikTok platform config using the post's title from the carousel DB
- Media assets auto-delete after 24 hours if not attached to a post

## Scheduling Strategy

- 1-2 posts per day maximum for TikTok
- Best times vary, but common slots: 7-9 AM, 12-1 PM, 5-7 PM (target audience timezone)
- Use ISO 8601 format for `scheduled_at`
- Always confirm schedule with the user before creating scheduled posts

## Gotchas

- **Always include `scheduled_at`** when PATCHing a scheduled post — omitting it triggers immediate processing
- **Media auto-deletes** after 24 hours if unattached, so upload close to posting time
- **Upload URLs are short-lived** — upload immediately after creating the URL
- **File size needed upfront** — you must know the JPEG file size before requesting the upload URL
- **`is_aigc: true`** — Always set this since carousels are AI-generated content
