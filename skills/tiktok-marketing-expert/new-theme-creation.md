# New Theme Creation

How to create a new visual theme for the carousel-generator: renderer component, theme JSON config, registration, and DB setup.

---

## Overview

A theme consists of:
1. **Theme JSON config** (`themes/<name>.json`) — Colors, typography, layout settings
2. **Renderer TSX component** (`src/components/renderers/<Name>Renderer.tsx`) — React component that renders slides
3. **Registration** in `ThemeRenderer.tsx` — Maps theme type to renderer
4. **DB entry** — Created via CLI, links config to accounts

## Step 1: Visual Design Direction

**Invoke the `frontend-design` skill** for visual design direction before writing code.

Ask it for:
- Color palette (background, text, accent, muted colors)
- Typography choices (font families, sizes for hook/content/CTA, weights)
- Layout concept (fullscreen, card, split, editorial, etc.)
- Decorative elements (borders, shadows, patterns, geometric shapes)
- How it should differ from existing themes (pinterest = dark minimal, card = structured with header, editorial = cream brutalist)

## Step 2: Create Theme JSON Config

Create `themes/<name>.json` following this structure:

```json
{
  "layout": {
    "type": "<theme-type>"
  },
  "colors": {
    "background": "#hex",
    "text": "#hex",
    "accent": "#hex"
  },
  "typography": {
    "fontFamily": "font stack",
    "hookSize": 64,
    "contentTitleSize": 48,
    "contentBodySize": 32
  },
  "backgroundImage": {
    "enabled": true,
    "source": "database"
  }
}
```

Reference existing configs in `themes/` for full-featured examples.

## Step 3: Create Renderer Component

**Invoke the `remotion-best-practices` skill** for Remotion patterns.

Create `src/components/renderers/<Name>Renderer.tsx`:

```tsx
import React from 'react';
import { AbsoluteFill, Img, staticFile } from 'remotion';
import { RendererProps } from '../../types/theme';

export const NameRenderer: React.FC<RendererProps> = ({ theme, slideData }) => {
  const { config } = theme;
  const { type, text, title, body, backgroundImage, slideNumber, totalSlides } = slideData;

  if (type === 'hook') {
    return (
      <AbsoluteFill style={{ backgroundColor: config.colors.background }}>
        {backgroundImage && (
          <Img src={staticFile(backgroundImage)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        )}
        {/* Hook content */}
      </AbsoluteFill>
    );
  }

  if (type === 'cta') {
    return (
      <AbsoluteFill style={{ backgroundColor: config.colors.background }}>
        {/* CTA content */}
      </AbsoluteFill>
    );
  }

  return (
    <AbsoluteFill style={{ backgroundColor: config.colors.background }}>
      {/* Content layout */}
    </AbsoluteFill>
  );
};
```

### Key Remotion Patterns

- **Always use `AbsoluteFill`** as root — fills the composition area (1080x1350)
- **Use `staticFile(path)`** for background images — resolves from `public/`
- **Use `Img` from remotion** (not HTML `<img>`) — handles loading states
- **Compositions are still images** — `durationInFrames: 1`, `fps: 30`. No animation needed.
- **All dimensions in pixels** — Canvas is 1080x1350 (TikTok carousel 4:5)

### Slide Type Handling

Every renderer must handle 3 slide types:
- **`hook`** — First slide. Background image + large text.
- **`content`** — Middle slides (2-4). Title + body.
- **`cta`** — Last slide. Call to action.

## Step 4: Register in ThemeRenderer

Edit `src/components/ThemeRenderer.tsx`:

1. Add import:
```tsx
import { NameRenderer } from './renderers/NameRenderer';
```

2. Add to renderer map:
```tsx
const rendererMap = {
  // ... existing entries
  name: NameRenderer,
};
```

## Step 5: Create Theme in Database

```bash
npx tsx src/cli/index.ts theme create "<Theme Name>" <type> -c themes/<name>.json
```

The `<type>` must match the key used in the `rendererMap`.

## Step 6: Assign to Account

```bash
npx tsx src/cli/index.ts theme assign <account-id> <theme-id>
```

## Step 7: Test

1. Generate a test post
2. Sync and preview: `node scripts/generate-compositions.js && npm run start`
3. Render: `node scripts/render-posts.js --post=<post-id>`
4. Check output in `output/<username>/post-<id>/`
