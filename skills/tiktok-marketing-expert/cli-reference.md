# CLI Reference

Complete command reference for the carousel-generator CLI. All commands run from `growth/carousel-generator/` via:

```bash
npx tsx src/cli/index.ts <command> <subcommand> [args] [options]
```

**Important**: Use `npx tsx src/cli/index.ts` (NOT `npm run cli`) for reliable non-interactive execution with proper argument passing.

---

## 1. Account Commands

Manage TikTok accounts.

### `account create <username> <email>`
Create a new account.
- `-p, --platform <platform>` — Platform name (default: `tiktok`)

```bash
npx tsx src/cli/index.ts account create formfirst.run hello@formfirst.run
npx tsx src/cli/index.ts account create runo.run hello@runo.run -p tiktok
```

### `account list`
List all accounts.
- `-s, --status <status>` — Filter by status (active, inactive, archived)

```bash
npx tsx src/cli/index.ts account list
npx tsx src/cli/index.ts account list -s active
```

### `account show <account-id>`
Show account details and statistics (total posts, draft/rendered/published counts).

```bash
npx tsx src/cli/index.ts account show 1
```

### `account set-status <account-id> <status>`
Update account status. Valid statuses: `active`, `inactive`, `archived`.

```bash
npx tsx src/cli/index.ts account set-status 1 inactive
```

### `account delete <account-id>`
Delete an account and all its posts. **Cascading delete!**
- `-f, --force` — Skip confirmation prompt

```bash
npx tsx src/cli/index.ts account delete 3 -f
```

---

## 2. Format Commands

Manage carousel format templates (slide structure definitions).

### `format create <account-id> <name>`
Create a new format template with default 5-slide structure (hook → content ×3 → cta).
- `-d, --description <description>` — Format description

```bash
npx tsx src/cli/index.ts format create 1 "5-slide educational"
npx tsx src/cli/index.ts format create 1 "Tips carousel" -d "Quick tips format"
```

### `format list <account-id>`
List all formats for an account.

```bash
npx tsx src/cli/index.ts format list 1
```

### `format show <format-id>`
Show format details including slide structure.

```bash
npx tsx src/cli/index.ts format show 1
```

### `format delete <format-id>`
Delete a format.
- `-f, --force` — Skip confirmation

```bash
npx tsx src/cli/index.ts format delete 2 -f
```

---

## 3. Post Commands

Manage carousel posts.

### `post create <account-id> <format-id> <title>`
Create a post manually with placeholder content. Interactive — prompts for caption and hashtags.

```bash
npx tsx src/cli/index.ts post create 1 1 "My first post"
```

### `post generate <account-id> <format-id> <topic>`
Generate a post using OpenAI. **This is the primary content creation command.**
- `-v, --variations <count>` — Generate 1-3 variations (default: 1)
- `-t, --temperature <temp>` — Creativity level 0.0-1.0 (default: 0.7)
- `--no-check-duplicates` — **ALWAYS USE THIS** to skip interactive duplicate prompt

```bash
npx tsx src/cli/index.ts post generate 1 1 "why cadence matters for runners" --no-check-duplicates
npx tsx src/cli/index.ts post generate 8 2 "the 180 SPM myth" --no-check-duplicates -t 0.8
```

### `post list <account-id>`
List all posts for an account.
- `-s, --status <status>` — Filter by status (draft, rendered, published, render_failed, archived)

```bash
npx tsx src/cli/index.ts post list 1
npx tsx src/cli/index.ts post list 1 -s draft
```

### `post show <post-id>`
Show full post details — title, caption, hashtags, all slides with content.

```bash
npx tsx src/cli/index.ts post show 42
```

### `post set-status <post-id> <status>`
Update post status. Valid: `draft`, `rendered`, `published`, `render_failed`, `archived`.

```bash
npx tsx src/cli/index.ts post set-status 42 draft
```

### `post publish <post-id>`
Shorthand for setting status to `published` with timestamp.

```bash
npx tsx src/cli/index.ts post publish 42
```

### `post check-duplicates <post-id>`
Check a post's slides for duplicate content against all other posts.
- `-t, --threshold <threshold>` — Similarity threshold 0-100 (default: 85)

```bash
npx tsx src/cli/index.ts post check-duplicates 42
npx tsx src/cli/index.ts post check-duplicates 42 -t 70
```

### `post delete <post-id>`
Delete a post.
- `-f, --force` — Skip confirmation

```bash
npx tsx src/cli/index.ts post delete 42 -f
```

---

## 4. Image Commands

Manage the background image library.

### `image scan [directory]`
Scan a directory and add images to the library. Default directory: `public/images`.

```bash
npx tsx src/cli/index.ts image scan
npx tsx src/cli/index.ts image scan public/pinterest-board
```

### `image list`
List all images in the library.
- `-c, --category <category>` — Filter by category

```bash
npx tsx src/cli/index.ts image list
npx tsx src/cli/index.ts image list -c running
```

### `image show <image-id>`
Show image details (filename, path, dimensions, tags).

```bash
npx tsx src/cli/index.ts image show 5
```

### `image add <filepath>`
Add a single image to the library.
- `-c, --category <category>` — Image category
- `-t, --tags <tags>` — Comma-separated tags

```bash
npx tsx src/cli/index.ts image add /images/runner.jpg -c running -t "outdoor,trail"
```

### `image delete <image-id>`
Delete an image from the library (not the file itself).
- `-f, --force` — Skip confirmation

```bash
npx tsx src/cli/index.ts image delete 5 -f
```

---

## 5. Theme Commands

Manage visual themes for accounts.

### `theme create <name> <type>`
Create a new theme. Types: `pinterest`, `card`, `editorial`, `custom`.
- `-c, --config <path>` — **Required.** Path to theme config JSON file

```bash
npx tsx src/cli/index.ts theme create "Form First Editorial" editorial -c themes/editorial.json
npx tsx src/cli/index.ts theme create "Runo Pinterest" pinterest -c themes/pinterest.json
```

### `theme list`
List all themes with account usage counts.
- `-v, --verbose` — Show config preview and account names

```bash
npx tsx src/cli/index.ts theme list
npx tsx src/cli/index.ts theme list -v
```

### `theme show <id>`
Show full theme details including complete JSON config and which accounts use it.

```bash
npx tsx src/cli/index.ts theme show 1
```

### `theme update <id>`
Update a theme's name, type, or config.
- `-n, --name <name>` — New name
- `-t, --type <type>` — New type
- `-c, --config <path>` — New config JSON file

```bash
npx tsx src/cli/index.ts theme update 1 -n "Updated Theme Name"
npx tsx src/cli/index.ts theme update 1 -c themes/pinterest-v2.json
```

### `theme delete <id>`
Delete a theme. Cannot delete if accounts are using it.
- `-f, --force` — Confirm deletion

```bash
npx tsx src/cli/index.ts theme delete 3 -f
```

### `theme assign <account-id> <theme-id>`
Assign a theme to an account. Existing theme assignment is replaced.

```bash
npx tsx src/cli/index.ts theme assign 1 2
```

### `theme show-account <account-id>`
Show which theme is assigned to an account, including full config.

```bash
npx tsx src/cli/index.ts theme show-account 1
```

---

## Scripts (not CLI)

These are standalone scripts run directly with `node`:

### Sync Compositions
Reads all posts from DB and generates `src/generated-compositions.json` for Remotion.
```bash
node scripts/generate-compositions.js
```

### Render Posts
Renders carousel slides to JPEG files.
```bash
node scripts/render-posts.js                      # All draft posts
node scripts/render-posts.js --account=1           # All drafts for account 1
node scripts/render-posts.js --post=42             # Specific post
node scripts/render-posts.js --status=rendered     # Re-render rendered posts
```

Output goes to `output/<username>/post-<id>/slide-N.jpg` plus `caption.txt`.

### Remotion Studio
Preview compositions in browser.
```bash
npm run start    # Runs sync + remotion studio
```
