# Theme Catalog

Current visual themes available in the carousel-generator system. Each theme has a JSON config file (`themes/*.json`) and a React renderer component (`src/components/renderers/*Renderer.tsx`).

---

## Pinterest Theme

**File**: `themes/pinterest.json` | **Renderer**: `PinterestRenderer.tsx`
**Type**: `pinterest`

Full-screen background image with dark overlay and large white text. Classic Pinterest-style "aesthetic" look. Clean and minimal.

### Config
```json
{
  "layout": { "type": "fullscreen", "overlay": "dark", "overlayOpacity": 0.6 },
  "colors": { "background": "#10100E", "text": "#FFFFFF", "accent": "#FF6861" },
  "typography": { "hookSize": 64, "contentTitleSize": 48, "contentBodySize": 32, "fontFamily": "system-ui, -apple-system, sans-serif" },
  "backgroundImage": { "enabled": true, "source": "database" }
}
```

### Behavior
- **Hook slide**: Full background image with dark overlay, large centered text
- **Content slides**: Solid dark background with title + body text
- **CTA slide**: Accent color highlights
- Background images come from the image library (database)

---

## Card Theme

**File**: `themes/card.json` | **Renderer**: `CardRenderer.tsx`
**Type**: `card`

Background image (hook only) with a floating card container. Header bar with AI-generated category text. Decorative emojis.

### Config
```json
{
  "layout": { "type": "card", "cardMargin": 60, "cardPadding": 40, "borderRadius": 16, "borderWidth": 2, "overlayOpacity": 0.7 },
  "colors": { "background": "#10100E", "cardBackground": "#2A2A28", "border": "#606055", "headerBackground": "#FF6861", "headerText": "#FFFFFF", "bodyText": "#FFFFFF" },
  "typography": { "headerSize": 24, "headerLetterSpacing": 2, "hookSize": 56, "contentTitleSize": 44, "contentBodySize": 30, "fontFamily": "system-ui, -apple-system, sans-serif" },
  "header": { "enabled": true, "height": 80, "textTransform": "uppercase", "aiGenerated": true },
  "decorations": { "emojis": ["...", "..."], "emojiCount": 2, "emojiSize": 56, "positions": ["topRight", "bottomLeft"] },
  "shadows": { "card": "0 8px 24px rgba(0, 0, 0, 0.4)" },
  "backgroundImage": { "enabled": true, "source": "database", "hookOnly": true }
}
```

### Behavior
- **Hook slide**: Background image with floating card, accent header bar, large hook text
- **Content slides**: Dark solid background, card container with header + title/body, decorative emojis
- **CTA slide**: Card with accent highlights and CTA
- `headerText` is AI-generated (from slide's `headerText` field)
- Background image only on hook slide (`hookOnly: true`)

---

## Editorial Theme

**File**: `themes/editorial.json` | **Renderer**: `EditorialRenderer.tsx`
**Type**: `editorial`

Brutalist editorial style. Cream backgrounds, bold condensed typography, geometric accent blocks in neon green, print-inspired crop marks, monospace detail text. Designed to stand out against typical dark content on TikTok.

### Config
```json
{
  "layout": { "type": "editorial", "contentPadding": 60, "dividerWeight": 6, "accentBorderWeight": 8, "accentBlockHeight": 0.42, "cropMarkSize": 44, "cropMarkWeight": 4 },
  "colors": { "background": "#F5F0E8", "text": "#0A0A0A", "accent": "#CCFF00", "muted": "#9A9590", "surface": "#E8E3DB" },
  "typography": { "fontFamily": "'Helvetica Neue', Arial, sans-serif", "monoFamily": "'SF Mono', Menlo, Consolas, monospace", "hookSize": 86, "contentTitleSize": 54, "contentBodySize": 32, "footerSize": 21, "ghostNumberSize": 240 },
  "branding": { "handle": "@yourbrand", "showSlideNumbers": true },
  "backgroundImage": { "enabled": true, "source": "database" }
}
```

### Behavior
- **Hook slide**: Background image with cream overlay, large bold title, neon accent block, crop marks in all 4 corners
- **Content slides**: Cream background, large ghost slide number (240px, faded), bold title, body text, accent divider line, footer with branding handle and slide counter
- **CTA slide**: Similar to content but with accent-colored call to action elements
- Crop marks on all slide types give a print/editorial feel
- Slide numbering in footer: "02/05" format
- Ghost numbers are decorative large faded numbers behind content

---

## Additional Themes

The system also includes these themes (Sunset, Raw, Retro, Neon, Comic) with their own JSON configs and renderers. Use `theme list -v` to see all available themes and their configurations.

---

## Theme Router

The `ThemeRenderer.tsx` component routes to the correct renderer based on `theme.type`:

```typescript
const rendererMap: Record<string, React.FC<ThemeRendererProps>> = {
  pinterest: PinterestRenderer,
  card: CardRenderer,
  editorial: EditorialRenderer,
  // ... additional themes
  custom: FallbackRenderer,
};
```

Unknown types get a `FallbackRenderer` that shows an error message.

---

## SlideData Types

Each slide has these fields (from `src/types/theme.ts`):

```typescript
interface SlideData {
  type: 'hook' | 'content' | 'cta';
  text?: string;           // Hook slide main text
  title?: string;          // Content/CTA slide title
  body?: string;           // Content/CTA slide body
  backgroundImage?: string; // Path to background image
  headerText?: string;     // Card theme header bar text
  decorativeEmojis?: string[];
  slideNumber: number;     // Added by sync script
  totalSlides: number;     // Added by sync script
}
```

## Theme Config Structure

```typescript
interface ThemeConfig {
  layout: { type: string; [key: string]: any };
  colors: { [key: string]: string };
  typography: { [key: string]: number | string };
  backgroundImage?: { enabled: boolean; source: string };
  header?: { enabled: boolean; height: number; textTransform: string; aiGenerated: boolean };
  decorations?: { emojis: string[]; emojiCount: number; emojiSize: number; positions: string[] };
  shadows?: { [key: string]: string };
}
```
