# Performance Analytics via PostBridge API

How to track and analyze TikTok post performance using PostBridge's analytics endpoints.

---

## Overview

PostBridge exposes analytics endpoints that pull engagement data (views, likes, comments, shares, watch time) from TikTok. Use these to measure post performance, identify top performers, and inform content strategy — all without leaving the agent workflow.

**Base URL**: `https://api.post-bridge.com/v1`
**Auth**: Bearer token in `Authorization` header. API key from PostBridge account.
**Key stored in**: `.env` as `POSTBRIDGE_API_KEY`

## Prerequisites

- PostBridge API key is set in `.env`
- TikTok account is connected in PostBridge dashboard
- Posts have been published via PostBridge (so post-results exist to link analytics back to)

## Complete Analytics Workflow

### Step 1: Sync Analytics

Trigger a fresh data pull from TikTok before reading analytics. This ensures you have the latest numbers.

```bash
curl -s -X POST "https://api.post-bridge.com/v1/analytics/sync" \
  -H "Authorization: Bearer $POSTBRIDGE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "platform": "tiktok"
  }' | jq .
```

The sync runs asynchronously. It usually completes within a few seconds for accounts with < 100 posts. Wait a moment before fetching.

### Step 2: Fetch Analytics

Retrieve analytics for all TikTok posts within a timeframe:

```bash
curl -s -X GET "https://api.post-bridge.com/v1/analytics?platform[]=tiktok&timeframe=30d" \
  -H "Authorization: Bearer $POSTBRIDGE_API_KEY" | jq .
```

**Timeframe options**: `7d`, `30d`, `90d`, `all`

**Filter by specific posts** (using post-result IDs):

```bash
curl -s -X GET "https://api.post-bridge.com/v1/analytics?post_result_id[]=123&post_result_id[]=456" \
  -H "Authorization: Bearer $POSTBRIDGE_API_KEY" | jq .
```

### Step 3: Get Single Record Detail

For a deep dive on one post:

```bash
curl -s -X GET "https://api.post-bridge.com/v1/analytics/ANALYTICS_ID" \
  -H "Authorization: Bearer $POSTBRIDGE_API_KEY" | jq .
```

### Step 4: Cross-Reference with Carousel DB

Link PostBridge analytics back to local carousel posts:

1. Fetch post-results for your published posts: `GET /v1/post-results?post_id[]=POST_ID`
2. Each post-result has a `post_result_id` that appears in analytics records
3. Match analytics records to carousel DB posts via the PostBridge post ID chain: carousel post → PostBridge post → post-result → analytics

```bash
# Get post-results to find the link between PostBridge posts and analytics
curl -s -X GET "https://api.post-bridge.com/v1/post-results?post_id[]=POST_ID" \
  -H "Authorization: Bearer $POSTBRIDGE_API_KEY" | jq .
```

### Step 5: Calculate Engagement Rate

Engagement rate = (likes + comments + shares) / views × 100

For TikTok carousels, benchmark engagement rates:
- **< 2%**: Below average — review hooks and topics
- **2–5%**: Average — performing as expected
- **5–10%**: Above average — double down on this format/topic
- **> 10%**: Viral potential — replicate the pattern

---

## API Reference

### Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/v1/analytics/sync` | Trigger fresh data sync from TikTok |
| GET | `/v1/analytics` | List analytics with filters |
| GET | `/v1/analytics/{id}` | Single analytics record detail |

### Query Parameters for `GET /v1/analytics`

| Parameter | Type | Description |
|-----------|------|-------------|
| `platform[]` | string | Filter by platform (e.g., `tiktok`) |
| `timeframe` | string | Time window: `7d`, `30d`, `90d`, `all` |
| `post_result_id[]` | number | Filter by specific post-result IDs |

### Analytics Record Schema

```typescript
{
  id: number;
  post_result_id: number;
  platform: string;
  view_count: number;
  like_count: number;
  comment_count: number;
  share_count: number;
  duration: number;              // video/carousel view duration in seconds
  cover_image_url: string;       // thumbnail URL from TikTok
  share_url: string;             // direct link to the TikTok post
  video_description: string;     // caption as it appears on TikTok
  platform_created_at: string;   // when TikTok registered the post (ISO 8601)
  last_synced_at: string;        // when analytics were last pulled (ISO 8601)
  match_confidence: number;      // 0-1 confidence score for post matching
}
```

### Sync Request Body

```typescript
{
  platform: string;  // "tiktok"
}
```

---

## Gotchas

- **Sync before read**: Always call `/v1/analytics/sync` before fetching analytics, otherwise you may get stale data
- **Sync is async**: The sync endpoint returns immediately but data may take a few seconds to update. Add a short delay before fetching.
- **Match confidence**: PostBridge matches TikTok posts to PostBridge records heuristically. A `match_confidence` below 0.8 means the match may be wrong — verify by comparing `video_description` to your caption.
- **Rate limits**: Don't sync more than once per minute. TikTok's API has its own rate limits that PostBridge respects.
- **New posts**: Analytics for freshly published posts may not appear until TikTok's API updates (can take 1-2 hours after publishing).
- **Duration field**: For carousels, `duration` reflects average view time across all slides, not total time.
