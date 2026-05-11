# HIG Audit Scoring Rubric

8 dimensions, each scored 0–10. Composite = mean.

The reference column points to the right HIG reference file when you need to verify a finding.

---

## 1. Color & Dark Mode

| Score | Description |
|---|---|
| 10 | All colors are semantic. Light/dark/high-contrast all look right. Brand colors use `DynamicColorIOS` or theme tokens with light+dark variants. |
| 7–9 | Mostly semantic. 1–2 hardcoded values for non-critical surfaces. Dark mode usable but slightly off. |
| 4–6 | Mix of semantic and literal. Dark mode partially broken (e.g., text barely readable in one mode). |
| 1–3 | Mostly hardcoded hex. Dark mode visibly broken. |
| 0 | No dark mode support; hardcoded throughout. |

**Reference:** `reference/hig.md`, `reference/hig-ref.md`, `reference/react-native-mapping.md` (Color section)

**Auto-flags:**
- Any hardcoded `#hex` in style for text/background unless declared in `hig-overrides.md`
- Missing `useColorScheme` / `PlatformColor` / `DynamicColorIOS` in code that renders dark-mode-sensitive surfaces
- Backgrounds that don't adapt (e.g., `backgroundColor: 'white'`)

---

## 2. Typography & Dynamic Type

| Score | Description |
|---|---|
| 10 | All text uses HIG text styles or correct base sizes. Dynamic Type works (tested at AX5). No Ultralight/Thin/Light weights. Hierarchy clear at all sizes. |
| 7–9 | Sizes correct. One or two `allowFontScaling={false}` usages where justified. Weights appropriate. |
| 4–6 | Hardcoded sizes throughout but readable. Some scaling issues at large Dynamic Type. |
| 1–3 | Light weights used for body. Layout breaks at increased Dynamic Type. |
| 0 | All text disables scaling or uses inappropriate sizes/weights. |

**Reference:** `reference/typography-ref.md`, `reference/react-native-mapping.md` (Typography section)

**Auto-flags:**
- `allowFontScaling={false}` without comment justifying it
- `fontSize < 11` (below smallest HIG legibility threshold)
- Font weights "100", "200", "300" used on `<Text>` containing body content
- Truncation visible at default Dynamic Type sizes

---

## 3. Layout & Spacing

| Score | Description |
|---|---|
| 10 | Safe areas respected. Standard spacing tokens. Hierarchy clear via spacing. No layout shift at different sizes. |
| 7–9 | Mostly clean. Inconsistent spacing in 1–2 places. |
| 4–6 | Safe area handled but inconsistent. Visible spacing drift between sections. |
| 1–3 | Content under notch/home indicator. Cramped or arbitrary spacing. |
| 0 | No safe area handling; chaos. |

**Reference:** `reference/hig.md`, `reference/react-native-mapping.md` (Spacing & Layout section)

**Auto-flags:**
- Screen-level `<View>` without `SafeAreaView` or `useSafeAreaInsets`
- Edge insets < 16pt on phone-sized screens
- Mixed spacing values (e.g., 13, 15, 17 instead of token-based 8/16/24)

---

## 4. Components

| Score | Description |
|---|---|
| 10 | Right iOS component for every job. Native stack for navigation, native sheet for modal, native action sheet for option lists, system alert for confirmation. |
| 7–9 | Mostly native. One or two custom implementations where native would do. |
| 4–6 | Several custom implementations of patterns iOS provides natively (e.g., custom dropdown instead of action sheet). |
| 1–3 | Most patterns are custom JS imitations of iOS patterns. Feels "almost native but off." |
| 0 | Completely non-native feel. Custom modals slide wrong, navigation feels wrong, action sheets are dialogs. |

**Reference:** `reference/react-native-mapping.md` (Navigation Patterns section), `reference/components/*` (where available)

**Auto-flags:**
- `Modal` (RN built-in) used where Stack `presentation: 'modal'` would fit
- Custom toggle component instead of `Switch`
- Custom dropdown instead of `ActionSheet` / `Picker`
- JS-based stack navigator instead of `native-stack`
- Custom alert dialogs instead of `Alert.alert`

---

## 5. Motion

| Score | Description |
|---|---|
| 10 | All animations <300ms for UI feedback. Correct easing (ease-out for entry, ease-in-out for transitions). `useReducedMotion` respected. Spring used for interactive gestures. |
| 7–9 | Durations mostly correct. Reduce Motion partially handled. |
| 4–6 | Animations too slow (>500ms) or wrong easing. No Reduce Motion handling. |
| 1–3 | Distracting/long animations everywhere. Janky. |
| 0 | Animations break the feel — too long, bouncy on non-gestures, ignore accessibility. |

**Reference:** `reference/react-native-mapping.md` (Motion section)

**Auto-flags:**
- `withTiming({ duration: 500+ })` or longer on UI feedback animations
- Springs with high `damping`/low `stiffness` on non-gesture transitions
- No `useReducedMotion()` check before transforms
- `easing: Easing.linear` on user-visible motion

---

## 6. Touch Targets & Haptics

| Score | Description |
|---|---|
| 10 | All touch targets ≥44pt (including hitSlop). Haptics used appropriately: light for taps, medium for state changes, success/error for outcomes, selection for pickers. |
| 7–9 | Most targets hit 44pt. One or two miss but are non-critical. Haptics present on key actions. |
| 4–6 | Several small touch targets. Haptics inconsistent (only some key actions). |
| 1–3 | Many tap targets < 44pt. No haptics. |
| 0 | All controls fail 44pt; no haptic feedback anywhere. |

**Reference:** `reference/react-native-mapping.md` (Touch Targets, Haptics sections)

**Auto-flags:**
- Pressable / TouchableOpacity / Button with combined width+hitSlop < 44pt
- Confirmation / success flow with no `Haptics.notificationAsync`
- Picker change with no `Haptics.selectionAsync`

---

## 7. Accessibility (visual)

| Score | Description |
|---|---|
| 10 | All interactive elements have `accessibilityRole` and `accessibilityLabel`. Decorative images hidden from VoiceOver. Contrast ≥4.5:1 (or 3:1 for large text). Layout works at AX5 Dynamic Type. Increase Contrast tested. |
| 7–9 | Labels mostly present. Contrast passes for primary content but borderline elsewhere. |
| 4–6 | Some labels missing. Contrast fails for secondary text. |
| 1–3 | Most elements lack accessibility labels. Contrast widely fails. |
| 0 | No accessibility consideration. |

**Reference:** `reference/react-native-mapping.md` (Accessibility section)

**Auto-flags:**
- `Pressable` without `accessibilityRole` or `accessibilityLabel`
- `Image` with meaningful content but no `accessibilityLabel`
- Text color/background combinations failing 4.5:1 contrast
- Custom interactive components with no accessibility traits

**Note:** Accessibility findings override brand overrides. A monochromatic palette is fine; a 2:1 contrast ratio is not.

---

## 8. Materials & Visual Effects

| Score | Description |
|---|---|
| 10 | On iOS 26+: Liquid Glass used appropriately (Regular for most, Clear for over rich content). On pre-26: `UIVisualEffectView` materials. No raw `.blur()`. Adaptive tinting. |
| 7–9 | Correct material choice in most places. One or two raw blurs. |
| 4–6 | Mix of raw blurs and materials. Tint not adaptive. |
| 1–3 | Raw `.blur()` everywhere; non-adaptive. |
| 0 | No material usage where it would help (e.g., navigation bar with hard color). |

**Reference:** `reference/liquid-glass.md`, `reference/liquid-glass-ref.md`, `reference/react-native-mapping.md` (Materials section)

**Auto-flags:**
- `BlurView tint="light"` or `tint="dark"` instead of `tint="systemThinMaterial"` (non-adaptive)
- Raw `filter: blur()` on web targets that should look iOS-native
- Navigation bar with hard background color on iOS 15+ (should use material)

---

## Composite scoring

- **9.0–10.0** — Ships. Apple-level polish.
- **7.0–8.9** — Good. Address Medium findings in a polish pass.
- **5.0–6.9** — Needs work. Address High findings before shipping new screens built on this foundation.
- **3.0–4.9** — Significant rework needed. Critical findings block ship.
- **<3.0** — Rewrite. Don't ship; this needs a design pass first.

## How to weight

Default: equal weights (composite = simple mean).

Override weights via brand-overrides:
- If accessibility is contractually required (gov, healthcare), weight Accessibility 2x.
- For consumer entertainment apps, weight Motion + Materials slightly higher.

Brand overrides cannot reduce the weight of Accessibility, Touch Targets, or Dynamic Type below 1x — these are non-negotiable for App Store and basic UX.
