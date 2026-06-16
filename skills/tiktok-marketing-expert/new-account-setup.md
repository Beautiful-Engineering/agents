# New Account Setup

Full walkthrough for setting up a new TikTok account in the carousel-generator system.

---

## Prerequisites

- `carousel.db` exists in the project directory (run `carousel db:seed` if not)
- Working directory: your project directory (where `carousel.db` and `brand.json` live)
- `carousel` CLI installed (`npm link` from the tool directory, one-time setup)

## Step 1: Create the Account

```bash
carousel account create <username> <email>
```

Note the account ID from the output.

## Step 2: Choose or Create a Theme

### Option A: Use an existing theme

List available themes:
```bash
carousel theme list -v
```

### Option B: Create a new theme

See `new-theme-creation.md` for the full process. Quick version:

1. Create a JSON config in `themes/<name>.json`
2. Create a renderer component in `src/components/renderers/<Name>Renderer.tsx`
3. Register in `src/components/ThemeRenderer.tsx`
4. Create in DB:
```bash
carousel theme create "<Theme Name>" <type> -c themes/<name>.json
```

## Step 3: Assign Theme to Account

```bash
carousel theme assign <account-id> <theme-id>
```

Verify:
```bash
carousel theme show-account <account-id>
```

## Step 4: Create a Format Template

```bash
carousel format create <account-id> "<format-name>"
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
carousel image scan public/images
```

## Step 6: Generate First Post

```bash
carousel post generate <account-id> <format-id> "<topic>" --no-check-duplicates
```

## Step 7: Preview and Render

```bash
# Sync compositions
carousel sync

# Render to JPEG
carousel render --account=<account-id>
```

## Step 8: Verify

```bash
carousel account show <account-id>
carousel post list <account-id>
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
7. [ ] Compositions synced (`carousel sync`)
8. [ ] Post rendered (`carousel render`)
