# CLI Reference

Complete command reference for the carousel CLI. All commands run from your **project directory** (where `carousel.db` and `brand.json` live) via:

```bash
carousel <command> <subcommand> [args] [options]
```

**Prerequisites**: One-time setup: `cd <tiktok-tools>/carousel && npm install && npm link`. Then `carousel` is available globally.

---

## 1. Account Commands

Manage TikTok accounts.

### `account create <username> <email>`
Create a new account.
- `-p, --platform <platform>` — Platform name (default: `tiktok`)

```bash
carousel account create myaccount hello@example.com
```

### `account list`
List all accounts.
- `-s, --status <status>` — Filter by status (active, inactive, archived)

### `account show <account-id>`
Show account details and statistics (total posts, draft/rendered/published counts).

### `account set-status <account-id> <status>`
Update account status. Valid statuses: `active`, `inactive`, `archived`.

### `account delete <account-id>`
Delete an account and all its posts. **Cascading delete!**
- `-f, --force` — Skip confirmation prompt

---

## 2. Format Commands

Manage carousel format templates (slide structure definitions).

### `format create <account-id> <name>`
Create a new format template with default 5-slide structure (hook → content ×3 → cta).
- `-d, --description <description>` — Format description

### `format list <account-id>`
List all formats for an account.

### `format show <format-id>`
Show format details including slide structure.

### `format delete <format-id>`
Delete a format.
- `-f, --force` — Skip confirmation

---

## 3. Post Commands

Manage carousel posts.

### `post create <account-id> <format-id> <title>`
Create a post manually with placeholder content.

### `post generate <account-id> <format-id> <topic>`
Generate a post using OpenAI. **This is the primary content creation command.**
- `-v, --variations <count>` — Generate 1-3 variations (default: 1)
- `-t, --temperature <temp>` — Creativity level 0.0-1.0 (default: 0.7)
- `--no-check-duplicates` — **ALWAYS USE THIS** to skip interactive duplicate prompt

```bash
carousel post generate 1 1 "your topic here" --no-check-duplicates
```

### `post list <account-id>`
List all posts for an account.
- `-s, --status <status>` — Filter by status (draft, rendered, published, render_failed, archived)

### `post show <post-id>`
Show full post details — title, caption, hashtags, all slides with content.

### `post set-status <post-id> <status>`
Update post status. Valid: `draft`, `rendered`, `published`, `render_failed`, `archived`.

### `post publish <post-id>`
Shorthand for setting status to `published` with timestamp.

### `post check-duplicates <post-id>`
Check a post's slides for duplicate content against all other posts.
- `-t, --threshold <threshold>` — Similarity threshold 0-100 (default: 85)

### `post delete <post-id>`
Delete a post.
- `-f, --force` — Skip confirmation

---

## 4. Image Commands

Manage the background image library.

### `image scan [directory]`
Scan a directory and add images to the library. Default directory: `public/images`.

### `image list`
List all images in the library.
- `-c, --category <category>` — Filter by category

### `image show <image-id>`
Show image details (filename, path, dimensions, tags).

### `image add <filepath>`
Add a single image to the library.
- `-c, --category <category>` — Image category
- `-t, --tags <tags>` — Comma-separated tags

### `image delete <image-id>`
Delete an image from the library (not the file itself).
- `-f, --force` — Skip confirmation

---

## 5. Theme Commands

Manage visual themes for accounts.

### `theme create <name> <type>`
Create a new theme. Types: `pinterest`, `card`, `editorial`, `custom`.
- `-c, --config <path>` — **Required.** Path to theme config JSON file

### `theme list`
List all themes with account usage counts.
- `-v, --verbose` — Show config preview and account names

### `theme show <id>`
Show full theme details including complete JSON config and which accounts use it.

### `theme update <id>`
Update a theme's name, type, or config.
- `-n, --name <name>` — New name
- `-t, --type <type>` — New type
- `-c, --config <path>` — New config JSON file

### `theme delete <id>`
Delete a theme. Cannot delete if accounts are using it.
- `-f, --force` — Confirm deletion

### `theme assign <account-id> <theme-id>`
Assign a theme to an account. Existing theme assignment is replaced.

### `theme show-account <account-id>`
Show which theme is assigned to an account, including full config.

---

## Utility Commands

### Seed Database
Initialize `carousel.db` in the current project directory.
```bash
carousel db:seed
```

### Sync Compositions
Reads all posts from DB and generates compositions JSON for Remotion.
```bash
carousel sync
```

### Render Posts
Renders carousel slides to JPEG files. Output goes to `output/<username>/post-<id>/`.
```bash
carousel render                      # All draft posts
carousel render --account=1          # All drafts for account 1
carousel render --post=42            # Specific post
carousel render --status=rendered    # Re-render rendered posts
```
