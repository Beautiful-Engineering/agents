# Batch Production Pattern

Step-by-step pattern for generating a batch of carousel posts for an account, assigning unique background images, and rendering to JPEG.

---

## Prerequisites

- Account exists with a theme assigned
- Format template exists for the account
- Background images are in the image library (run `image scan` if needed)
- `.env` has `OPENAI_API_KEY`

## Step 1: Image Inventory

Find which background images are available and which are already used.

```bash
# List all images in library
carousel image list

# List existing posts for the account to see which images are used
carousel post list <account-id>
```

To find unused images programmatically, query the database directly:

```bash
node -e "
const Database = require('better-sqlite3');
const db = new Database('carousel.db');

// Get all images used by this account's posts (hook slide backgroundImage)
const posts = db.prepare('SELECT slide_data FROM posts WHERE account_id = ?').all(ACCOUNT_ID);
const usedImages = new Set();
for (const p of posts) {
  const slides = JSON.parse(p.slide_data);
  if (slides[0]?.backgroundImage) usedImages.add(slides[0].backgroundImage);
}

// Get all images in library
const allImages = db.prepare('SELECT filepath FROM images').all();
const unused = allImages.filter(i => !usedImages.has(i.filepath));
console.log('Used:', usedImages.size);
console.log('Available:', unused.length);
unused.forEach(i => console.log(' ', i.filepath));
db.close();
"
```

## Step 2: Topic Generation

Propose topics to the user based on their brand and niche. Draw topics from the `brand.json` topics array or the growth system's story system.

**IMPORTANT**: Present topics to the user and get approval before generating. Topics cost API credits.

## Step 3: Generate Posts

Loop through topics, one per unused image. Always use `--no-check-duplicates`.

```bash
# For each topic:
carousel post generate <account-id> <format-id> "<topic>" --no-check-duplicates
```

Capture the post ID from the output (`ID: <number>`).

**Rate limiting**: Add a 1-2 second delay between generations to avoid OpenAI rate limits.

## Step 4: Assign Background Images

After generating, assign a unique background image to each post's hook slide (slide 1).

```bash
node -e "
const Database = require('better-sqlite3');
const db = new Database('carousel.db');

const postId = POST_ID;
const imagePath = '/images/IMAGE_FILENAME';

const row = db.prepare('SELECT slide_data FROM posts WHERE id = ?').get(postId);
const slides = JSON.parse(row.slide_data);
slides[0].backgroundImage = imagePath;
db.prepare('UPDATE posts SET slide_data = ? WHERE id = ?').run(JSON.stringify(slides), postId);
console.log('Updated post', postId, 'with image', imagePath);
db.close();
"
```

## Step 5: Sync Compositions

Generate the Remotion compositions JSON from the database:

```bash
carousel sync
```

This generates the Remotion compositions JSON from the database.

## Step 6: Render

Render all draft posts for the account:

```bash
carousel render --account=<account-id>
```

Or render a specific post:

```bash
carousel render --post=<post-id>
```

Output: `output/<username>/post-<id>/slide-1.jpg` through `slide-5.jpg` plus `caption.txt`.

Successfully rendered posts are automatically marked as `rendered`.

## Step 7: Verify

```bash
carousel post list <account-id> -s rendered
```

Check the output directory for the rendered files.

---

## Complete Batch Script Pattern

1. Query DB for existing posts to find used images
2. Filter `allImages` to get `unusedImages`
3. Loop: for each unused image + topic pair:
   a. Run `carousel post generate` to create post
   b. Extract post ID from stdout
   c. Update slide_data in DB to assign the image
4. After all generated: run `carousel sync`
5. Then: `carousel render --account=<id>`

## Gotchas

- **Always use `--no-check-duplicates`** — Without it, the CLI shows an interactive prompt that hangs when run non-interactively
- **Image paths must match exactly** — Use the path as stored in the images table (e.g., `/images/filename.jpg`)
- **Re-rendering requires status reset** — If a post was already rendered, reset to draft first: `carousel post set-status <id> draft`
- **Sync before render** — Always run `carousel sync` before rendering to pick up new/changed posts
- **Rate limits** — Add 1-2 second delays between OpenAI API calls in batch loops
