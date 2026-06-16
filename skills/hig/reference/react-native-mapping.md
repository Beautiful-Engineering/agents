# React Native + Expo ↔ Apple HIG Mapping

Use this file when the target codebase is React Native / Expo and the HIG references show Swift/SwiftUI code. The HIG principles transfer; the API surface differs.

**Rule of thumb:** Read the *principle* from the HIG reference. Translate the *implementation* through this file.

## Color & Dark Mode

### What HIG says
- Use semantic colors (`UIColor.label`, `Color.primary`, `systemBackground`) — they auto-adapt to light/dark/high-contrast.
- Never hardcode hex for system UI.
- Test in Light, Dark, Increase Contrast, Reduce Transparency.

### React Native equivalents

```tsx
import { useColorScheme, Platform, PlatformColor, DynamicColorIOS } from 'react-native';

// Option 1: useColorScheme + theme object (most portable)
const scheme = useColorScheme(); // 'light' | 'dark' | null
const colors = scheme === 'dark' ? darkTheme : lightTheme;

// Option 2: PlatformColor (iOS 13+) — uses Apple's actual semantic colors
const styles = StyleSheet.create({
  text: { color: PlatformColor('label') },             // primary text
  secondary: { color: PlatformColor('secondaryLabel') },
  bg: { backgroundColor: PlatformColor('systemBackground') },
  grouped: { backgroundColor: PlatformColor('systemGroupedBackground') },
});

// Option 3: DynamicColorIOS for one-off custom semantic colors
const accent = DynamicColorIOS({ light: '#FF6861', dark: '#FF8983' });
```

**Recommended:** Use `PlatformColor` for system surfaces (text, backgrounds, separators) and `DynamicColorIOS` for brand colors that need light/dark variants. Avoid raw hex in production code without a wrapping theme.

### Semantic color name reference

| HIG name (Swift) | RN `PlatformColor` | Use for |
|---|---|---|
| `label` | `PlatformColor('label')` | Primary text |
| `secondaryLabel` | `PlatformColor('secondaryLabel')` | Captions, metadata |
| `tertiaryLabel` | `PlatformColor('tertiaryLabel')` | Disabled text |
| `quaternaryLabel` | `PlatformColor('quaternaryLabel')` | Watermarks |
| `systemBackground` | `PlatformColor('systemBackground')` | App background |
| `secondarySystemBackground` | `PlatformColor('secondarySystemBackground')` | Card/grouped sub-bg |
| `tertiarySystemBackground` | `PlatformColor('tertiarySystemBackground')` | Inset content |
| `systemGroupedBackground` | `PlatformColor('systemGroupedBackground')` | Settings-style list bg |
| `separator` | `PlatformColor('separator')` | Hairline dividers |
| `link` | `PlatformColor('link')` | Hyperlinks |
| `systemRed/Blue/Green/...` | `PlatformColor('systemBlue')` | Accent tints |

### Status bar

```tsx
import { StatusBar } from 'expo-status-bar';

// Adapts to colorScheme automatically
<StatusBar style="auto" />

// Or explicit if you have a permanently dark/light screen
<StatusBar style="light" />
```

## Typography & Dynamic Type

### What HIG says
- Use SF Pro / SF Compact / New York via text styles, not literal sizes.
- Support Dynamic Type — text must scale to ≥200%.
- Avoid Ultralight/Thin/Light weights for body text.

### React Native equivalents

```tsx
import { Text, PixelRatio } from 'react-native';

// Dynamic Type — RN respects iOS text size settings via allowFontScaling (default: true)
<Text style={{ fontSize: 17 }} maxFontSizeMultiplier={2}>Body</Text>

// Get current accessibility scale
const fontScale = PixelRatio.getFontScale(); // 1.0 = default, up to ~3.0 at AX5
```

**Text style mapping** (use these base sizes; let `allowFontScaling` handle the rest):

| HIG style | iOS pt (default) | RN base `fontSize` | Use for |
|---|---|---|---|
| Large Title | 34 | 34 | Top-of-screen titles |
| Title 1 | 28 | 28 | Section titles |
| Title 2 | 22 | 22 | Sub-sections |
| Title 3 | 20 | 20 | Card titles |
| Headline | 17 (semibold) | 17, weight 600 | Emphasized body |
| Body | 17 | 17 | Default body |
| Callout | 16 | 16 | Slightly less prominent than body |
| Subheadline | 15 | 15 | Sub-text below body |
| Footnote | 13 | 13 | Below-text notes |
| Caption 1 | 12 | 12 | Image captions |
| Caption 2 | 11 | 11 | Smallest legible |

**Pitfalls:**
- `allowFontScaling={false}` defeats Dynamic Type. Use only on logos/timers where scaling breaks layout.
- Custom fonts: load via `expo-font` and verify Dynamic Type scales them (test on device with AX text size).

### Font loading (Expo)

```tsx
import { useFonts } from 'expo-font';

const [loaded] = useFonts({
  'Satoshi-Regular': require('./assets/fonts/Satoshi-Regular.otf'),
  'Satoshi-Bold': require('./assets/fonts/Satoshi-Bold.otf'),
});
```

## Materials & Liquid Glass

### What HIG says (post iOS 26)
- Liquid Glass is the new standard material — lensing, tinting, adaptive.
- Avoid raw `.blur()`.
- Variants: Regular (most surfaces), Clear (over rich content).

### React Native equivalents

```tsx
import { BlurView } from 'expo-blur';

// Recommended: use system materials (iOS only)
<BlurView intensity={50} tint="systemThinMaterial" />
// Available tints (iOS 13+):
//   systemUltraThinMaterial, systemThinMaterial, systemMaterial,
//   systemThickMaterial, systemChromeMaterial
// Plus light/dark variants of each (e.g., systemThinMaterialLight)

// Liquid Glass (iOS 26+): not yet directly exposed via expo-blur.
// Use a Glass component from a third-party library or write a Swift view via Expo Modules.
```

**Liquid Glass status (as of 2026-05):** Native React Native support is limited. Options:
1. Use `expo-blur` with `systemThinMaterial` (graceful fallback on all iOS versions)
2. Use [`expo-glass-effect`](https://www.npmjs.com/package/expo-glass-effect) or similar community module for true Liquid Glass on iOS 26+
3. Write a tiny Expo Module wrapping `UIVisualEffectView` with `.glassEffect()`

**Always layer materials over a content background** — never use a material as the sole background of a screen.

## SF Symbols

### What HIG says
- Prefer SF Symbols over custom icons for system UI.
- Choose rendering mode (monochrome, hierarchical, palette, multicolor) to match context.
- Animate with built-in symbol effects (bounce, pulse, scale, etc.) for interactivity feedback.

### React Native equivalents

```tsx
// Option 1: react-native-sf-symbols (iOS only — uses real SF Symbols)
import { SFSymbol } from 'react-native-sf-symbols';
<SFSymbol name="heart.fill" weight="medium" scale="large" colors={['#FF6861']} />

// Option 2: @expo/vector-icons → Ionicons (Material-style, NOT real SF Symbols — looks off on iOS)
// Use only when you need cross-platform parity and can accept non-Apple look

// Option 3: expo-symbols (Expo SDK 51+) — official Expo wrapper for SF Symbols
import { SymbolView } from 'expo-symbols';
<SymbolView name="heart.fill" type="hierarchical" tintColor="#FF6861" />
```

**Recommendation:** Use `expo-symbols` if on Expo SDK 51+. Provide an Ionicons fallback for Android via a thin wrapper component.

### Symbol effects (animations)

`expo-symbols` supports built-in effects on iOS 17+:

```tsx
<SymbolView
  name="heart.fill"
  animationSpec={{
    effect: { type: 'bounce' },
    repeating: false,
  }}
/>
```

Effect types: `bounce`, `pulse`, `scale`, `wiggle`, `rotate`, `breathe`, `appear`, `disappear`, `replace`.

## Touch Targets & Hit Slop

### What HIG says
- 44pt minimum on iOS, 48pt on watchOS.

### React Native equivalents

```tsx
// Visible size can be smaller if hitSlop expands the touch area to 44pt
<Pressable
  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
  style={{ width: 24, height: 24 }}
/>
// 24 + 10*2 = 44pt minimum on each axis — passes HIG
```

**Audit rule:** Any `Pressable` / `TouchableOpacity` / `Button` whose combined `width + hitSlop.left + hitSlop.right` < 44 (or height) is a violation.

## Motion & Reduce Motion

### What HIG says
- Animations < 300ms for UI feedback. Use `ease-out` for entering, `ease-in-out` for transitions.
- Respect "Reduce Motion" accessibility setting.

### React Native equivalents

```tsx
import { AccessibilityInfo, useReduceMotion } from 'react-native';

// Reanimated 3+ exposes useReducedMotion()
import { useReducedMotion } from 'react-native-reanimated';
const reduceMotion = useReducedMotion();

// Skip transforms if reduce motion is on
useEffect(() => {
  AccessibilityInfo.isReduceMotionEnabled().then(setReduceMotion);
}, []);
```

**Audit rule:** Any non-trivial transform/scale/rotate animation must check `useReducedMotion()` and degrade to opacity-only or instant.

## Navigation Patterns

### What HIG says
- Tab bars for peer sections (3–5 tabs ideal).
- Navigation bars for hierarchical drill-down.
- Sheets for self-contained tasks ("modal" presentations) — half-sheet for partial focus, full sheet for dedicated tasks.

### React Native equivalents

| HIG pattern | RN library | Notes |
|---|---|---|
| Tab bar | `expo-router` Tabs / `@react-navigation/bottom-tabs` | Use `expo-router/native-tabs` for true UITabBarController on iOS 26 (Liquid Glass-aware) |
| Navigation bar | `expo-router` Stack / `@react-navigation/native-stack` | `native-stack` uses real `UINavigationController` — preferred |
| Sheet (modal) | `expo-router` modal preset / `@gorhom/bottom-sheet` | For half-sheets use bottom-sheet; for full sheets use Stack with `presentation: 'modal'` |
| Action sheet | `@expo/react-native-action-sheet` | Uses real `UIAlertController` action sheet on iOS |
| Alert | `Alert.alert()` (built-in) | Native iOS alert dialog |
| Popover | `react-native-popover-view` or `@gorhom/bottom-sheet` | iPad popovers — use native module if available |

**Prefer `native-stack` over `stack`** — the JS-based stack feels wrong; the native one matches `UINavigationController` exactly.

## Spacing & Layout

### What HIG says
- Use safe areas. Respect notch, home indicator, status bar.
- Standard padding: 16pt edges, 8pt between elements, 20pt between sections.
- Tap targets 44pt.

### React Native equivalents

```tsx
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Recommended: SafeAreaView from react-native-safe-area-context (not built-in RN)
<SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right']}>
  <YourScreen />
</SafeAreaView>

// Or use insets directly
const insets = useSafeAreaInsets();
<View style={{ paddingTop: insets.top, paddingBottom: insets.bottom }} />
```

**Spacing token recommendations** (translate HIG to RN constants):

```ts
export const spacing = {
  xs: 4,    // hairline
  sm: 8,    // between related elements
  md: 16,   // edge insets, standard
  lg: 20,   // between sections
  xl: 32,   // major separation
};
```

## Haptics

### What HIG says
- Use haptics sparingly for feedback on key actions. Match intensity to action significance.

### React Native equivalents

```tsx
import * as Haptics from 'expo-haptics';

// Light touch feedback (toggle, tap)
Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

// Confirmation / success
Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

// Selection change (picker, segmented control)
Haptics.selectionAsync();
```

**Mapping:**
| Action | Haptic |
|---|---|
| Button tap | `ImpactFeedbackStyle.Light` |
| Toggle on | `ImpactFeedbackStyle.Medium` |
| Success (payment, sync) | `NotificationFeedbackType.Success` |
| Error / blocked action | `NotificationFeedbackType.Error` |
| Warning prompt | `NotificationFeedbackType.Warning` |
| Picker / segmented control change | `selectionAsync()` |

## Accessibility (VoiceOver, etc.)

### What HIG says
- Every interactive element has an accessibility label.
- Decorative images are hidden from VoiceOver.
- Grouped content has a group label.

### React Native equivalents

```tsx
<Pressable
  accessibilityRole="button"
  accessibilityLabel="Start workout"
  accessibilityHint="Begins a new running session"
>
  <Text>Start</Text>
</Pressable>

<Image accessibilityElementsHidden importantForAccessibility="no" />

<View accessible accessibilityLabel="Workout summary">
  {/* grouped */}
</View>
```

**Roles to know:** `button`, `link`, `header`, `image`, `text`, `adjustable` (sliders), `switch`, `tab`, `tablist`, `none` (decorative).

## Common React Native ↔ HIG anti-patterns

| Anti-pattern in RN code | HIG issue | Fix |
|---|---|---|
| Hardcoded `color: '#fff'` for text | Breaks dark mode | Use `PlatformColor('label')` or theme |
| `fontSize: 12` with no scaling override | Fails Dynamic Type | Don't override `allowFontScaling` default; use `maxFontSizeMultiplier` cap if needed |
| Custom `TouchableOpacity` with `padding: 4` | Sub-44pt touch target | Add `hitSlop` to reach 44pt |
| `BlurView` with `tint="light"` | Non-adaptive | Use `tint="systemThinMaterial"` or similar |
| `Ionicons name="heart"` on iOS | Wrong icon style | Use `expo-symbols` for SF Symbols |
| `<View>` for screens skipping safe area | Content under notch/home indicator | Wrap in `SafeAreaView` |
| Animation `withTiming({ duration: 800 })` for UI feedback | Too slow per HIG | Cap at 300ms; check `useReducedMotion()` |
| Custom modal slide-up | Doesn't match iOS sheet feel | Use Stack `presentation: 'modal'` or `@gorhom/bottom-sheet` |
| `<Image>` with no `accessibilityLabel` for meaningful images | Inaccessible | Add label, or `accessibilityElementsHidden` if decorative |

## Cross-references in this skill

- For *which* color to pick → `reference/hig.md` (decision trees), `reference/hig-ref.md` (full reference)
- For *how* to wire it up in RN → this file
- For SF Symbols selection → `reference/sf-symbols.md`
- For SF Symbols API in RN → this file's "SF Symbols" section
- For typography rationale → `reference/typography-ref.md`
- For typography in RN → this file's "Typography & Dynamic Type" section
