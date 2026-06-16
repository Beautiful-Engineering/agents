# Brand Overrides — <Project Name>

Place this file at `.claude/hig-overrides.md` in your project root (or `apps/<name>/.claude/hig-overrides.md` for monorepo apps).

The `hig` skill loads this before audits and reclassifies declared divergences as **intentional** rather than violations.

## Format rules

- **Each override is a single bullet** under the relevant category.
- **Each override states what** diverges from HIG and **why**.
- **If the divergence would harm accessibility** (contrast, hit targets, Dynamic Type), the override does NOT apply — accessibility wins.
- Keep this file ≤ 1 screen. If it grows beyond that, your design is probably fighting iOS too much.

## Categories

### Color

- _Example:_ Brand uses monochromatic palette only — no system accent tints. Background is `#10100E`, text is `#FFFFFF`, accent is `#FF6861`. Semantic colors (`PlatformColor('label')` etc.) are NOT used in shared components.
  - **Reason:** Intentional design language; aligns with brand strategy.
  - **Accessibility note:** Verified 4.5:1 contrast for all text combinations.

### Typography

- _Example:_ Brand font is Satoshi (not San Francisco). Weights used: Light, Regular, Bold.
  - **Reason:** Brand identity.
  - **Note:** "Avoid Light weights" HIG guidance is partially overridden — Light is used only at 17pt+ for headlines, never body.

### Components

- _Example:_ Use custom `<RunoButton>` instead of native `Button` for primary CTAs.
  - **Reason:** Brand-specific styling.
  - **Constraint:** Must still pass 44pt hit-target and be keyboard/VoiceOver accessible.

### Materials

- _Example:_ Do not use Liquid Glass — app is permanently dark, hard-color surfaces match aesthetic.
  - **Reason:** Brand monochrome direction conflicts with adaptive materials.

### Iconography

- _Example:_ Use custom icon set (Phosphor / brand-specific) rather than SF Symbols.
  - **Reason:** Brand consistency across iOS/Android/web.
  - **Constraint:** Icons must have `accessibilityLabel` since they're not system-recognized.

### Motion

- _Example:_ Workout timer animations exceed 300ms intentionally — they represent passage of time, not UI feedback.
  - **Reason:** Animation purpose differs from UI-state feedback.

## What an override is NOT

You cannot use overrides to skip:
- Touch targets < 44pt (iOS) / < 48pt (watchOS)
- Contrast ratios < 4.5:1 for body text / < 3:1 for large text
- Dynamic Type breakage (text must scale to at least 150%)
- Safe area violations (content under notch / home indicator)
- VoiceOver accessibility labels on interactive elements

Listing these in this file does not exempt them from the audit. They will still be flagged as Critical.

## Review cadence

Revisit this file:
- When changing the design system
- When iOS releases a major version (HIG often shifts)
- Quarterly, regardless

## Last reviewed

<YYYY-MM-DD by whom>
