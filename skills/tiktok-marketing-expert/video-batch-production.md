# Batch Video Production Pattern

Step-by-step pattern for producing multiple TikTok videos across accounts.

---

## Prerequisites

- Character prompts seeded: `cd content/tiktok/video-generator && node db/seed.js`
- `.env` has `REPLICATE_API_TOKEN`, `SUPABASE_URL`, `SUPABASE_ANON_KEY`
- PostBridge API key set (for publishing)

## Strategy: Theme × Account Matrix

Each video should have a coherent story: **hook → products → results**. Use the `video auto` command which handles product discovery, hook selection, and tone matching automatically.

### Example: 20 Videos for 5 Accounts

Assign each account a mix of themes and tones:

| Account | Video 1 | Video 2 | Video 3 | Video 4 |
|---------|---------|---------|---------|---------|
| oli.pregnancy (1) | snacks/negative | drinks/negative | breakfast/positive | dairy/negative |
| safefoodmama (2) | breakfast/negative | sauces/negative | snacks/positive | drinks/negative |
| oli.fragments (3) | drinks/negative | snacks/negative | dairy/positive | skincare/negative |
| bumpcheck.app (4) | dairy/negative | skincare/negative | snacks/negative | breakfast/positive |
| label.mama6 (5) | skincare/negative | breakfast/negative | drinks/negative | snacks/positive |

### Execution Script

```bash
cd /Users/felipeabello/Code/oli/content/tiktok/video-generator

# Account 1: oli.pregnancy
npx tsx src/cli/index.ts video auto 1 snacks --tone negative --count 3
npx tsx src/cli/index.ts video auto 1 drinks --tone negative --count 3
npx tsx src/cli/index.ts video auto 1 breakfast --tone positive --count 3
npx tsx src/cli/index.ts video auto 1 dairy --tone negative --count 2

# Account 2: safefoodmama
npx tsx src/cli/index.ts video auto 2 breakfast --tone negative --count 3
npx tsx src/cli/index.ts video auto 2 sauces --tone negative --count 2
npx tsx src/cli/index.ts video auto 2 snacks --tone positive --count 3
npx tsx src/cli/index.ts video auto 2 drinks --tone negative --count 3

# ... repeat for accounts 3-5
```

Each `video auto` command:
1. Searches Open Food Facts for products in the theme's categories
2. Scans them through Oli's safety engine
3. Picks products matching the tone (negative = needs caution/avoid products)
4. Auto-selects a pregnancy-focused hook
5. Generates AI videos via Replicate (1 hook + N product flips)
6. Renders final video with Remotion

### Cost Estimates

Per video (3 products):
- **Replicate**: 4 Seedance 2.0 predictions (~$0.40-0.80 each) = ~$2.00
- **Supabase**: ~50 classify-ingredient calls (free tier)
- **Render**: ~2 min local CPU

For 20 videos: ~$40 Replicate cost, ~40 min render time.

## Publishing Flow

After videos are rendered:

```bash
# List all rendered videos
npx tsx src/cli/index.ts video list --status rendered

# Publish via PostBridge (see posting-scheduling.md)
```

## Monitoring

```bash
# Check status of all videos
npx tsx src/cli/index.ts video list

# Check a specific video
npx tsx src/cli/index.ts video show <id>
```

## Content Variety Tips

- **Mix tones**: Don't make all videos negative/scary — alternate with positive "safe foods" content
- **Mix product counts**: Some videos with 1 product (deep dive), others with 3 (haul style)
- **Mix settings**: kitchen, fridge, pantry, grocery, bathroom (for skincare)
- **Rotate themes**: Don't repeat the same theme on the same account consecutively
- **Leverage account angles**: `whattoavoid.bump` should lean negative, `safefoodmama` can be more educational

## Gotchas

- **Product availability**: Open Food Facts may not have enough products with caution/avoid in some categories. If `video auto` can't find enough, try a different theme or switch to positive tone.
- **Replicate rate limits**: Running too many `video auto` commands in parallel may hit rate limits. Run sequentially or with short gaps between accounts.
- **Duplicate products**: The same popular product (e.g., Red Bull) may appear across different theme searches. The system de-duplicates in the DB but the same product could end up in videos for different accounts.
- **Hook variety**: The hook templates are finite. For high-volume production, consider writing custom hooks with `video batch --hook "..."` for variety.
