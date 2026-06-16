# Accounts & Character Prompts

The 10 Oli TikTok accounts, their content angles, and AI character prompts for Seedance 2.0 video generation.

---

## Accounts

| ID | Username | Angle | Character |
|----|----------|-------|-----------|
| 1 | `oli.pregnancy` | Main brand — app demos, product reveals | Black woman, 30s, 8mo, short hair, olive dress, modern apartment |
| 2 | `safefoodmama` | Food safety education | Asian woman, 20s, 6mo, messy bun, cream tee, minimalist bedroom |
| 3 | `oli.fragments` | Quick tips — 60-second bites | Hispanic woman, 30s, 7mo, dark curls, cream cardigan, sunny bathroom |
| 4 | `bumpcheck.app` | Product scanning reveals | White woman, 20s, 5mo, blonde bob, denim overalls, bright kitchen |
| 5 | `label.mama6` | Ingredient label deep dives | South Asian woman, 30s, 8mo, long braid, floral blouse, airy living room |
| 6 | `trimester.tips` | Trimester-specific safety | Middle Eastern woman, 20s, 6mo, wavy hair, striped shirt, sunlit hallway |
| 7 | `momtobe.hacks` | Pregnancy hacks & safe swaps | East Asian woman, 30s, 7mo, straight hair, gray hoodie, tidy bedroom |
| 8 | `whattoavoid.bump` | "Don't use this" reveals | Scandinavian woman, 20s, 8mo, platinum hair, black turtleneck, white bathroom |
| 9 | `pregnancymyths` | Myth busting — research-backed | Afro-Latina woman, 30s, 6mo, curly updo, lavender top, plant-filled sunroom |
| 10 | `oli.scans` | Live product scanning reactions | Redhead woman, 20s, 7mo, wavy auburn hair, white blouse, wooden bathroom |

## Account ↔ Theme Recommendations

Best theme matches per account angle:

| Account | Best Themes | Preferred Tone |
|---------|-------------|----------------|
| `oli.pregnancy` | Any (main brand) | Mix |
| `safefoodmama` | breakfast, dairy, snacks | Mix (educational) |
| `oli.fragments` | snacks, drinks | Mix (quick reveals) |
| `bumpcheck.app` | snacks, drinks, sauces | Negative (scanning reveals) |
| `label.mama6` | sauces, baby_food, skincare | Negative (deep dives) |
| `trimester.tips` | breakfast, dairy, drinks | Mix (trimester-specific) |
| `momtobe.hacks` | snacks, breakfast | Positive (safe swaps) |
| `whattoavoid.bump` | drinks, snacks, skincare | Negative (avoid lists) |
| `pregnancymyths` | dairy, breakfast, sauces | Mix (myth busting) |
| `oli.scans` | Any | Negative (reaction videos) |

## Updating Character Prompts

```bash
cd /Users/felipeabello/Code/oli/content/tiktok/video-generator

# View current prompts
npx tsx src/cli/index.ts account list

# Update a character
npx tsx src/cli/index.ts account set-character 1 "A confident Black woman in her early 30s, 8 months pregnant, natural short hair, wearing a fitted olive green dress..."
```

Character prompts are stored in `db/videos.db` → `character_prompts` table. They're seeded from `db/seed.js`.
