# Audit Workflow

Read-only HIG assessment. Produces a scored report + prioritized fix list. Never mutates code.

## When to run this

User says: "audit", "review", "does this feel right", "is this HIG-compliant", "check this screen".

## Inputs

- Target: a file path, directory, screenshot, or description of a screen/flow
- Stack: detected from file extensions and surrounding context (RN, SwiftUI, UIKit)
- Brand overrides: read `.claude/hig-overrides.md` (and `apps/mobile/.claude/hig-overrides.md` for monorepo) if present

## Procedure

### Step 1 — Establish context (skip if obvious)

Read enough to answer:
- What platform(s) does this screen target? (iOS / iPadOS / watchOS / macOS / visionOS / tvOS)
- What stack? (Swift/SwiftUI vs React Native vs other)
- What is the purpose of the screen? (onboarding, settings, content, modal task, etc.)
- Is there a `hig-overrides.md`? Load it into memory.

If the target is a screenshot only, ask the user to also point you at the source file — fixes require seeing the code.

### Step 2 — Load relevant references

Don't load everything. Load on demand based on what's on the screen:

| If the screen has... | Load |
|---|---|
| Any visible color or text → always | `reference/hig.md` |
| Custom colors or materials | `reference/hig-ref.md` |
| Typography concerns | `reference/typography-ref.md` |
| SF Symbols / icons | `reference/sf-symbols.md` |
| Liquid Glass / blur / material | `reference/liquid-glass.md` |
| Tab bar, navigation, sheet, alert | `reference/components/<name>.md` (if available) |
| watchOS target | `reference/design-for-watchos.md` |
| RN stack | `reference/react-native-mapping.md` |

### Step 3 — Score against the rubric

For each of the 8 dimensions in `rubrics/audit-rubric.md`, assign 0–10:

1. **Color & Dark Mode** — semantic vs literal, light/dark/contrast support
2. **Typography & Dynamic Type** — text styles, weights, scaling support
3. **Layout & Spacing** — safe areas, edge insets, hierarchy
4. **Components** — correct iOS components used (sheets, alerts, tabs, nav)
5. **Motion** — animation durations, easing, Reduce Motion handling
6. **Touch Targets & Haptics** — 44pt minimums, haptic feedback placement
7. **Accessibility (visual)** — contrast, labels, VoiceOver structure, scaling
8. **Materials & Visual Effects** — Liquid Glass vs blur, adaptive behavior

For each dimension, note:
- Score
- 1–2 sentence rationale
- Specific findings (file:line where possible)

### Step 4 — Apply brand overrides

For each finding, check `hig-overrides.md`:
- If the divergence is declared as intentional → reclassify as **"intentional divergence"** (not a violation)
- If the divergence is declared but would fail accessibility (contrast, hit targets, Dynamic Type scaling) → still a violation. Note that the override is in tension with accessibility and recommend the user revisit.

### Step 5 — Prioritize findings

Bucket every finding into:

- **🔴 Critical** — fails accessibility (hit targets, contrast, Dynamic Type), breaks dark mode entirely, blocks core flow
- **🟠 High** — wrong component pattern (e.g., custom modal instead of sheet), missing safe area, hardcoded system colors
- **🟡 Medium** — sub-optimal typography weight, custom icon where SF Symbol exists, animation too long
- **🟢 Low** — polish items (spacing inconsistencies within tolerance, opportunity to use Liquid Glass on iOS 26+)

### Step 6 — Produce the report

Output a markdown report with this structure:

```markdown
# HIG Audit — <target name>

## Summary
- **Composite score:** X.X / 10
- **Stack:** React Native + Expo (or Swift/SwiftUI)
- **Platform:** iOS
- **Brand overrides loaded:** yes/no (path)
- **Findings:** N critical, M high, K medium, L low

## Scores by dimension
| Dimension | Score | One-line rationale |
|---|---|---|
| Color & Dark Mode | 7/10 | Uses semantic on text, hardcodes background |
| Typography & Dynamic Type | 5/10 | allowFontScaling disabled on 3 elements |
| ...

## Findings (prioritized)

### 🔴 Critical
1. **Touch target on `apps/mobile/src/screens/Home.tsx:142`** — IconButton is 32×32 with no hitSlop → fails 44pt minimum
   - **Why it matters:** Users with motor accessibility needs cannot reliably tap. App Store review may flag.
   - **Suggested fix:** Add `hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}`

### 🟠 High
... (continue)

## Intentional divergences (per brand overrides)
- Monochromatic palette (CLAUDE.md): no semantic accent tints used → not a violation per `hig-overrides.md`

## Recommended next steps
1. Address all 🔴 Critical findings before next ship (estimated: N minutes)
2. Top 3 🟠 High findings to schedule
3. Low items optional — defer to a polish pass
```

### Step 7 — Offer next steps

After presenting the report, ask:

> Want me to fix the Critical and High findings? I'll patch them one at a time and commit atomically.

If yes → switch to `workflows/fix.md`. If no → done.

## Output guidelines

- Prefer specific `file:line` references over vague descriptions
- Keep rationales to 1–2 sentences each
- Don't pad with congratulations — be direct about what's broken
- If you can't determine something (e.g., couldn't see screenshot in dark mode), say so explicitly

## What NOT to do in audit mode

- Do NOT edit files
- Do NOT install packages
- Do NOT run builds
- Do NOT commit anything
- Do NOT delete or rename files

If you find yourself reaching for an edit tool, stop. You're in audit mode.
