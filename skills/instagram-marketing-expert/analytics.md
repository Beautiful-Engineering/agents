# Analytics & Performance Review (Instagram)

Review Instagram post performance via PostBridge analytics to find what's working and steer future content.

---

## Workflow

1. **Sync analytics**: `mcp__post-bridge__sync_analytics` (platform=instagram). Wait a few seconds for the sync to complete.
2. **Fetch analytics**: `mcp__post-bridge__list_analytics` (platform=instagram, timeframe=30d). Adjust timeframe as needed — 7d, 30d, 90d, all.
3. **Cross-reference with the carousel DB**: match analytics records to local posts via `mcp__post-bridge__list_post_results` and `carousel post list`.
4. **Present a summary table** (sort by date descending):

   | Post / hook | Published | Reach | Likes | Comments | Saves | Shares | Eng. rate % |
   |-------------|-----------|-------|-------|----------|-------|--------|-------------|

5. **Identify patterns** — top and bottom performers; which hooks, topics, formats, and posting times drive reach and saves.
6. **Suggest next steps** — topics to double down on, hooks to retire, times to shift, formats to test.

## The metrics that matter on Instagram

Instagram's ranking signals are weighted differently from TikTok's. Prioritize in this order:

1. **Saves** — the strongest "valuable content" signal. High saves → Explore distribution. Track saves-per-reach as your north star for carousels.
2. **Shares / sends** — sending a post to a friend or to a Story signals real value and drives non-follower reach.
3. **Reach (and % from non-followers)** — non-follower reach means the algorithm is pushing the post to Explore/feed recommendations. This is the growth lever.
4. **Watch time / completion** (Reels) — for video, average watch time and completion rate gate distribution.
5. **Comments** — engagement depth; replying to comments quickly extends the post's active window.
6. **Likes** — weakest signal; useful only relative to reach (a high like-rate with low saves is shallow).

> Engagement rate alone is misleading on Instagram. A post can have a high like-rate but die because nobody saved or shared it. Lead with **saves + non-follower reach**.

## Rough benchmarks

These vary widely by niche and account size — use them as a starting reference, not a target.

| Metric | Weak | OK | Strong |
|--------|------|----|--------|
| Saves / reach | < 0.5% | 1-2% | > 3% |
| Shares / reach | < 0.3% | 0.5-1% | > 1.5% |
| Non-follower reach % | < 20% | 30-50% | > 60% |
| Reels avg watch | < 30% | 40-60% | > 70% |
| Engagement rate (likes+comments / reach) | < 1% | 2-4% | > 5% |

## Optimization loop

- **Double down on save-drivers**: the topics/hooks with the highest saves-per-reach are your proven format. Generate more of those (feed them back into `batch-generate` topics).
- **Retire low-reach hooks**: if slide 1 isn't earning non-follower reach, the hook is the problem — the cover slide is the thumbnail in feed and Explore.
- **Watch the posting-time signal**: cross-reference reach against publish time; shift `scheduled_at` slots toward the windows that consistently over-perform.
- **Reels vs carousels**: compare non-follower reach between formats for your account. Many niches get more discovery from Reels but more saves from carousels — use each for its strength.

## Gotchas

- **No data returned?** Check the post was published **via PostBridge** (not manually) and that enough time has passed — Instagram's API typically reports 1-2 hours after publishing, and some metrics (reach breakdown) lag longer.
- **Insights require a Business/Creator account** — personal accounts return little or nothing through the API.
- **Saves can be under-reported** early — give a post 24-48h before judging its save performance.
- **Match on post ID, not title** when cross-referencing — titles can collide across accounts.
