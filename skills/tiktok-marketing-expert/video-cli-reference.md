# CLI Reference

All commands run from `content/tiktok/video-generator/`.

```bash
cd /Users/felipeabello/Code/oli/content/tiktok/video-generator
```

---

## Account Commands

```bash
# List all 10 accounts with character prompts
npx tsx src/cli/index.ts account list

# Set/update character prompt for an account
npx tsx src/cli/index.ts account set-character <account-id> "<character description>"
```

## Product Commands

```bash
# Add a product by barcode (lookup + classify + save)
npx tsx src/cli/index.ts product add <barcode>
npx tsx src/cli/index.ts product add <barcode> --trimester 1

# List all saved products
npx tsx src/cli/index.ts product list

# Show product details + safety assessment
npx tsx src/cli/index.ts product show <id>
```

## Video Commands

### `video auto` — Fully Automated (Recommended)

Picks products from Open Food Facts by category, finds ones matching the hook tone, generates AI videos, and renders.

```bash
npx tsx src/cli/index.ts video auto <account-id> <theme> [options]

# Themes: snacks, drinks, breakfast, dairy, sauces, baby_food, skincare

# Options:
#   --tone <positive|negative>  Hook tone (default: negative)
#   --count <n>                 Products to find (default: 3)
#   --trimester <n>             Safety trimester 1/2/3 (default: 2)
```

**Examples:**
```bash
# Find snacks with caution/avoid ingredients
npx tsx src/cli/index.ts video auto 3 snacks --tone negative --count 3

# Find pregnancy-safe dairy products
npx tsx src/cli/index.ts video auto 1 dairy --tone positive --count 2

# Skincare with avoid ingredients
npx tsx src/cli/index.ts video auto 5 skincare --tone negative
```

### `video batch` — Manual Product Selection

You pick the hook, setting, and specific barcodes.

```bash
npx tsx src/cli/index.ts video batch <account-id> <barcode1> [barcode2...] [options]

# Options:
#   --hook <text>       Hook text overlay (use \n for line breaks)
#   --setting <place>   Background: grocery, kitchen, pantry, fridge, bathroom, drugstore, table
#   --trimester <n>     Safety trimester (default: 2)
```

**Examples:**
```bash
# Custom hook + kitchen setting
npx tsx src/cli/index.ts video batch 3 0611269991000 0049000042566 \
  --hook "drinks I stopped having\nonce I scanned them\nduring pregnancy 😳" \
  --setting fridge

# Auto-generated hook based on results
npx tsx src/cli/index.ts video batch 1 0898999000015 5000159484695 --setting grocery
```

**Hook validation**: If the hook implies danger (contains "aren't", "stop", "avoid", etc.) but all products scan as safe, the command will error and show you the mismatch.

### `video create` + `video generate` + `video render` — Step by Step

```bash
# 1. Create draft video
npx tsx src/cli/index.ts video create <account-id> <product-id1> [product-id2...] --trimester 2

# 2. Generate AI videos (Replicate)
npx tsx src/cli/index.ts video generate <video-id>

# 3. Render with Remotion
npx tsx src/cli/index.ts video render <video-id>
```

### `video list`

```bash
npx tsx src/cli/index.ts video list
npx tsx src/cli/index.ts video list --account 3
npx tsx src/cli/index.ts video list --status rendered
```

### `video batch-all`

Run the batch command for ALL 10 accounts with the same barcodes:

```bash
npx tsx src/cli/index.ts video batch-all <barcode1> [barcode2...] --trimester 2
```

## Preview in Remotion Studio

```bash
npx remotion studio src/remotion/index.ts
```

Opens browser preview at http://localhost:3000 with:
- **TikTokVideo** — full composition with sample data
- **ResultsScreenshot** — static results screen preview

## Database Management

```bash
# Reset database (deletes all videos + products, keeps character prompts)
rm db/videos.db db/videos.db-wal db/videos.db-shm 2>/dev/null; node db/seed.js

# Re-seed character prompts only
node db/seed.js
```
