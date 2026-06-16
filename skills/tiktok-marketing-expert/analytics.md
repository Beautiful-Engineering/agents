# Performance Analytics via PostBridge

How to track and analyze TikTok post performance using PostBridge's analytics.

---

## Overview

PostBridge exposes analytics that pull engagement data (views, likes, comments, shares, watch time) from TikTok. Use these to measure post performance, identify top performers, and inform content strategy — all without leaving the agent workflow.

**Primary interface: PostBridge MCP** — use `mcp__post-bridge__*` tools for all analytics operations.

## Prerequisites

- PostBridge MCP server is configured in `~/.claude/settings.json`
- TikTok account is connected in PostBridge dashboard
- Posts have been published via PostBridge (so post-results exist to link analytics back to)

## Complete Analytics Workflow

### Step 1: Sync Analytics

Trigger a fresh data pull from TikTok before reading analytics. This ensures you have the latest numbers.

```
mcp__post-bridge__sync_analytics
  platform: "tiktok"
```

The sync runs asynchronously. It usually completes within a few seconds for accounts with < 100 posts. Wait a moment before fetching.

### Step 2: Fetch Analytics

Retrieve analytics for all TikTok posts within a timeframe:

```
mcp__post-bridge__list_analytics
  platform: ["tiktok"]
  timeframe: "30d"
```

**Timeframe options**: `7d`, `30d`, `90d`, `all`

### Step 3: Get Post Results

Link analytics back to specific PostBridge posts:

```
mcp__post-bridge__list_post_results
  post_id: [POST_ID]
```

Each post-result has a `post_result_id` that appears in analytics records.

### Step 4: Cross-Reference with Carousel DB

Link PostBridge analytics back to local carousel posts:

1. Fetch post-results using `list_post_results`
2. Each post-result has a `post_result_id` that appears in analytics records
3. Match analytics records to carousel DB posts via the PostBridge post ID chain: carousel post → PostBridge post → post-result → analytics

### Step 5: Calculate Engagement Rate

Engagement rate = (likes + comments + shares) / views × 100

For TikTok carousels, benchmark engagement rates:
- **< 2%**: Below average — review hooks and topics
- **2–5%**: Average — performing as expected
- **5–10%**: Above average — double down on this format/topic
- **> 10%**: Viral potential — replicate the pattern

---

## Analytics Record Schema

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

---

## Gotchas

- **Sync before read**: Always call `sync_analytics` before fetching analytics, otherwise you may get stale data
- **Sync is async**: The sync returns immediately but data may take a few seconds to update. Add a short delay before fetching.
- **Match confidence**: PostBridge matches TikTok posts to PostBridge records heuristically. A `match_confidence` below 0.8 means the match may be wrong — verify by comparing `video_description` to your caption.
- **Rate limits**: Don't sync more than once per minute. TikTok's API has its own rate limits that PostBridge respects.
- **New posts**: Analytics for freshly published posts may not appear until TikTok's API updates (can take 1-2 hours after publishing).
- **Duration field**: For carousels, `duration` reflects average view time across all slides, not total time.
