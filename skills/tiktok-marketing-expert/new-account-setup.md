# New Account Setup

Full walkthrough for setting up a new TikTok account in the carousel-generator system.

---

## Prerequisites

- `db/carousel.db` exists (run `npm run db:seed` if not)
- Working directory: carousel-generator root

## Step 1: Create the Account

```bash
npx tsx src/cli/index.ts account create <username> <email>
```

Note the account ID from the output.

## Step 2: Choose or Create a Theme

### Option A: Use an existing theme

List available themes:
```bash
npx tsx src/cli/index.ts theme list -v
```

### Option B: Create a new theme

See `new-theme-creation.md` for the full process. Quick version:

1. Create a JSON config in `themes/<name>.json`
2. Create a renderer component in `src/components/renderers/<Name>Renderer.tsx`
3. Register in `src/components/ThemeRenderer.tsx`
4. Create in DB:
```bash
npx tsx src/cli/index.ts theme create "<Theme Name>" <type> -c themes/<name>.json
```

## Step 3: Assign Theme to Account

```bash
npx tsx src/cli/index.ts theme assign <account-id> <theme-id>
```

Verify:
```bash
npx tsx src/cli/index.ts theme show-account <account-id>
```

## Step 4: Create a Format Template

```bash
npx tsx src/cli/index.ts format create <account-id> "<format-name>"
```

This creates a default 5-slide format:
1. **Hook** — Attention-grabbing POV text with background image
2. **Content** — Educational point 1
3. **Content** — Educational point 2
4. **Content** — Educational point 3
5. **CTA** — Call to action

Note the format ID from the output.

## Step 5: Add Background Images

If not already done, scan images into the library:

```bash
npx tsx src/cli/index.ts image scan public/images
```

## Step 6: Generate First Post

```bash
npx tsx src/cli/index.ts post generate <account-id> <format-id> "<topic>" --no-check-duplicates
```

## Step 7: Preview and Render

```bash
# Sync compositions
node scripts/generate-compositions.js

# Preview in browser (optional)
npm run start

# Render to JPEG
node scripts/render-posts.js --account=<account-id>
```

## Step 8: Verify

```bash
npx tsx src/cli/index.ts account show <account-id>
npx tsx src/cli/index.ts post list <account-id>
```

Check rendered files in `output/<username>/post-<id>/`.

---

## Quick Setup Checklist

1. [ ] Account created (`account create`)
2. [ ] Theme assigned (`theme assign`)
3. [ ] Format created (`format create`)
4. [ ] Images scanned (`image scan`)
5. [ ] Brand config created (`brand.json`)
6. [ ] First post generated (`post generate`)
7. [ ] Compositions synced (`node scripts/generate-compositions.js`)
8. [ ] Post rendered (`node scripts/render-posts.js`)
