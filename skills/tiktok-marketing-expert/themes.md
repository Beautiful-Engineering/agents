# Theme System Architecture

How themes work in the carousel-generator. Themes are created per-brand by the agent — nothing is pre-built.

---

## What a Theme Is

A theme is a visual design system for carousel slides. It consists of:

1. **Theme JSON config** (`themes/<name>.json`) — Colors, typography, layout settings
2. **Renderer TSX component** (`src/components/renderers/<Name>Renderer.tsx`) — React component that renders slides using Remotion
3. **Registration** in `ThemeRenderer.tsx` — Maps theme type string to renderer component
4. **DB entry** — Created via CLI, links config JSON to accounts

## Creating a Theme

Use the **Theme Design** workflow mode. The agent:
1. Invokes `frontend-design` skill for visual direction (colors, typography, layout concept)
2. Invokes `remotion-best-practices` skill for Remotion component patterns
3. Creates the renderer TSX + theme JSON + registers + creates in DB

See `new-theme-creation.md` for the step-by-step process.

---

## Theme Config Schema

Every theme JSON config follows this structure:

```json
{
  "layout": {
    "type": "<theme-type-key>",
    // Layout-specific settings (padding, margins, border radius, etc.)
  },
  "colors": {
    "background": "#hex",
    "text": "#hex",
    "accent": "#hex"
    // Additional colors: muted, surface, cardBackground, border, etc.
  },
  "typography": {
    "fontFamily": "font stack",
    "hookSize": 64,
    "contentTitleSize": 48,
    "contentBodySize": 32
    // Additional: monoFamily, footerSize, headerSize, letterSpacing, etc.
  },
  "backgroundImage": {
    "enabled": true,
    "source": "database",
    "hookOnly": false      // true = only hook slide gets background image
  }
}
```

### Optional Config Sections

```json
{
  "header": {
    "enabled": true,
    "height": 80,
    "textTransform": "uppercase",
    "aiGenerated": true    // true = header text comes from AI-generated slide field
  },
  "decorations": {
    "emojis": ["🏃", "⚡"],
    "emojiCount": 2,
    "emojiSize": 56,
    "positions": ["topRight", "bottomLeft"]
  },
  "shadows": {
    "card": "0 8px 24px rgba(0, 0, 0, 0.4)"
  },
  "branding": {
    "handle": "@yourbrand",
    "showSlideNumbers": true
  }
}
```

---

## Renderer Component Pattern

Every renderer is a React component that handles 3 slide types:

```tsx
import React from 'react';
import { AbsoluteFill, Img, staticFile } from 'remotion';
import { RendererProps } from '../../types/theme';

export const MyRenderer: React.FC<RendererProps> = ({ theme, slideData }) => {
  const { config } = theme;
  const { type, text, title, body, backgroundImage, slideNumber, totalSlides } = slideData;

  if (type === 'hook') {
    return (
      <AbsoluteFill style={{ backgroundColor: config.colors.background }}>
        {backgroundImage && (
          <Img src={staticFile(backgroundImage)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        )}
        {/* Large hook text overlay */}
      </AbsoluteFill>
    );
  }

  if (type === 'cta') {
    return (
      <AbsoluteFill style={{ backgroundColor: config.colors.background }}>
        {/* CTA with accent color, brand mention */}
      </AbsoluteFill>
    );
  }

  // Content slides (2-4)
  return (
    <AbsoluteFill style={{ backgroundColor: config.colors.background }}>
      {/* Title + body layout */}
    </AbsoluteFill>
  );
};
```

### Key Remotion Rules

- **Always use `AbsoluteFill`** as root — fills the 1080x1350 composition
- **Use `staticFile(path)`** for images — resolves from `public/` directory
- **Use `Img` from remotion** (not HTML `<img>`) — handles loading states
- **Still images only** — `durationInFrames: 1`, `fps: 30`. No animation.
- **All dimensions in pixels** — Canvas is 1080x1350 (TikTok 4:5 aspect ratio)

---

## SlideData Fields

Available to every renderer:

```typescript
interface SlideData {
  type: 'hook' | 'content' | 'cta';
  text?: string;           // Hook slide main text
  title?: string;          // Content/CTA slide title
  body?: string;           // Content/CTA slide body
  backgroundImage?: string; // Path to background image
  headerText?: string;     // Header bar text (AI-generated)
  decorativeEmojis?: string[];
  slideNumber: number;     // 1-based index
  totalSlides: number;     // Total slide count
}
```

---

## Theme Design Patterns

When creating themes for a brand, consider these layout patterns:

### Fullscreen Image + Overlay
- Background image fills entire slide with dark overlay
- Large white text on top
- Simple, minimal — good for lifestyle/aesthetic brands
- Hook uses image, content slides use solid color

### Card Layout
- Floating card container with rounded corners
- Background image behind card (hook only)
- Header bar with category/label text
- Structured, professional feel

### Editorial / Magazine
- Light backgrounds (cream, white)
- Bold condensed typography
- Geometric accent blocks (neon colors)
- Print-inspired details (crop marks, monospace footnotes)
- Stands out against dark TikTok content

### Split Layout
- Image on one half, text on the other
- Works well for product-focused brands
- Can alternate image side between slides

### Gradient / Neon
- Dark backgrounds with gradient accents
- Glowing text effects
- Modern tech/gaming aesthetic

---

## Registration

After creating a renderer, register it in `src/components/ThemeRenderer.tsx`:

```tsx
import { MyRenderer } from './renderers/MyRenderer';

const rendererMap: Record<string, React.FC<ThemeRendererProps>> = {
  mytheme: MyRenderer,
  // ... other registered renderers
};
```

The `type` key must match what's used in `theme create` CLI command.

---

## Theme CLI Commands

```bash
# Create theme in DB from JSON config
carousel theme create "<name>" <type> -c themes/<name>.json

# List all themes
carousel theme list -v

# Assign theme to account
carousel theme assign <account-id> <theme-id>

# Show account's theme
carousel theme show-account <account-id>
```
