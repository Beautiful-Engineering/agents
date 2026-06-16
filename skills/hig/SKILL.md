---
name: HIG Auditor (Apple)
description: >
  Apple Human Interface Guidelines auditor and fixer. Two modes: Audit
  (read-only scoring against an 8-dimension rubric, prioritized findings)
  and Fix (iterative code patches, atomic commits). Covers iOS, iPadOS,
  macOS, watchOS, tvOS, visionOS. Stack-aware — adapts HIG principles to
  React Native + Expo, Swift/SwiftUI, and UIKit. Respects project-level
  brand overrides at .claude/hig-overrides.md. Distilled from Apple HIG
  and Axiom (MIT).
license: MIT
attribution: >
  Foundations / components / typography / SF Symbols / Liquid Glass
  reference files forked from Axiom by Charles Wiltgen
  (https://github.com/CharlesWiltgen/Axiom, MIT). HIG reference pages
  distilled from developer.apple.com/design/human-interface-guidelines.
  React Native mapping, audit/fix workflows, scoring rubric, and
  brand-override system are original.
---

# Apple Human Interface Guidelines (HIG)

You MUST use this skill for ANY question or task about Apple platform design — visual consistency, dark mode, typography, accessibility, motion, layout, components, Liquid Glass, SF Symbols, navigation, or "make this feel like Apple designed it."

## When to invoke

Trigger when the user says or implies:
- "Audit this screen for HIG compliance"
- "Make this look more like an Apple app"
- "Review the design / does this feel right?"
- "Fix the spacing / typography / dark mode handling"
- "Is this accessible?" (for visual/structural concerns — defer pure a11y testing to gstack /design-review)
- Any UI work on iOS, iPadOS, watchOS, macOS, visionOS, or tvOS

Also invoke proactively when the user shows a screenshot of a UI and asks for feedback, or when reviewing a PR that touches UI code.

## Two modes

### Mode 1 — Audit (read-only, default)

Score the target against the rubric, list prioritized findings, recommend fixes. Do not touch code.

Invoke: `/hig audit <path-or-description>`

Workflow: `workflows/audit.md`
Rubric: `rubrics/audit-rubric.md`

### Mode 2 — Fix (audit + iterative code patches)

Run an audit, then patch source files one finding at a time, committing atomically.

Invoke: `/hig fix <path-or-description>`

Workflow: `workflows/fix.md`

Always run Audit first and confirm priorities with the user before mutating code, unless the user explicitly says "fix it" with a specific scope.

## Brand overrides

Before flagging any divergence as a violation, check for `.claude/hig-overrides.md` in the project root (or `apps/mobile/.claude/hig-overrides.md` for monorepo apps). This file declares intentional HIG divergences the team has decided to keep.

**Audit behavior with overrides:**
- Skip findings that match a declared override
- Reduce severity from "violation" to "intentional divergence" in the report
- Still flag if the override would harm UX (e.g., contrast too low for accessibility — accessibility ALWAYS wins over brand)

Template: `templates/brand-overrides.template.md`

## Stack-aware behavior

The HIG describes *what* good Apple design looks like. The code that achieves it depends on the stack. Before fixing code, determine the stack from the file extension and surrounding files:

| Files | Stack | Reference |
|---|---|---|
| `.swift`, `.swiftui` | SwiftUI / UIKit | Reference files use Swift examples directly |
| `.tsx`, `.ts` under `apps/mobile/` or with `expo` in `package.json` | React Native + Expo | Read `reference/react-native-mapping.md` to translate APIs |
| `.kt`, `.kotlin` | Native Android | HIG mostly doesn't apply — use Material instead |
| `.html`, `.tsx` on web | Web | HIG inspires but is not authoritative — use web standards |

## Decision tree — which reference do I need?

```
Task or question
├── Color choice / dark mode / semantic colors / materials
│   ├── Quick decision → reference/hig.md
│   └── Full reference + code → reference/hig-ref.md
├── Liquid Glass (iOS 26+ material system)
│   ├── What/when/how → reference/liquid-glass.md
│   └── App-wide adoption + platform diffs → reference/liquid-glass-ref.md
├── SF Symbols
│   ├── Rendering modes / effects / animations → reference/sf-symbols.md
│   └── API + UIKit/SwiftUI equivalents → reference/sf-symbols-ref.md
├── Typography / Dynamic Type / font weights → reference/typography-ref.md
├── watchOS-specific design → reference/design-for-watchos.md
├── React Native / Expo — how do I implement this? → reference/react-native-mapping.md
├── Foundations not above (accessibility, motion, layout, inclusion, etc.)
│   └── reference/foundations/*.md
├── Components (buttons, lists, tabs, sheets, alerts, etc.)
│   └── reference/components/*.md
├── Patterns (onboarding, loading, feedback, settings, modality, etc.)
│   └── reference/patterns/*.md
└── Audit a screen → workflows/audit.md
    Fix a screen → workflows/fix.md
```

Load only the chunks you need. Loading everything blows the context window.

## Critical principles (memorize these)

1. **Semantic over literal.** Use semantic color names (`label`, `systemBackground`) that adapt to light/dark/high-contrast. Never hardcode hex unless you've declared it as an intentional brand override.
2. **Dynamic Type is non-negotiable.** Text must scale. Hardcoded font sizes break accessibility and HIG compliance.
3. **Materials, not blurs.** On iOS 26+, prefer Liquid Glass via `.glassEffect()`. On older OSes, use `Material` (`.regularMaterial`, etc.) — not `.blur()`. RN equivalent: `expo-blur` with `tint="systemThinMaterial"`.
4. **44pt minimum touch target** on iOS, 48pt on watchOS. Smaller is a hard violation.
5. **SF Symbols >> custom icons** for system UI. Animate them with built-in effects rather than custom animations.
6. **Test in both modes always** — Light, Dark, Increase Contrast, Reduce Transparency, Reduce Motion, max Dynamic Type.
7. **Accessibility wins over brand.** A brand override that fails 4.5:1 contrast is still a violation.
8. **Apple's apps are quiet.** Restraint > decoration. If a section feels busy, the answer is usually "remove something."

## Anti-rationalization

When the user (or you) argues against a HIG finding, check these traps before yielding:

| Thought | Reality |
|---|---|
| "Our brand is different, the rules don't apply" | Brand applies to color/voice. HIG applies to motion, hit targets, accessibility, modality, materials — these are not brand choices. |
| "Users won't notice" | Apple reviewers do. App Store rejections cite "doesn't feel right" patterns even when functional. |
| "We'll fix it later" | Visual debt compounds. Each new screen built on the wrong foundation needs to be redone too. |
| "Designers said it should look this way" | Designers may not have read HIG. Ask: "Is this intentional brand divergence or oversight?" Document in `hig-overrides.md` if intentional. |
| "It looks fine to me" | Sample of one. Audit against the rubric, not vibes. |

## Example invocations

User: "Review this onboarding screen"
→ Read `workflows/audit.md`, then load relevant references based on what's on the screen.

User: "Make our dark mode feel native"
→ Read `reference/hig.md` (decision trees) + `reference/hig-ref.md` (semantic color details) + `reference/react-native-mapping.md` if RN.

User: "Audit and fix the settings screen"
→ Two-phase: Audit (read-only output), confirm with user, then Fix (mutate code).

User: "Should we use a custom icon or SF Symbol here?"
→ Read `reference/sf-symbols.md` (always: prefer SF Symbols for system UI; custom only for brand-distinct concepts).

User: "Why does this feel off?"
→ Run an Audit. The rubric will tell you which dimension is failing.

## Conflict resolution

**hig vs gstack design-review**: gstack's `/design-review` does live visual QA on a running app (browser-based, looks for spacing/hierarchy issues). `hig` is HIG-specific and platform-aware (Apple semantic colors, Dynamic Type, materials). Use both — they're complementary.

**hig vs project design system**: When a project has its own design system documented (e.g., Runo's monochromatic CLAUDE.md guidelines), the project design system wins on aesthetic choices (color palette, typography). HIG still wins on accessibility, hit targets, motion, modality, dark mode handling. Capture aesthetic divergences in `hig-overrides.md`.

**hig vs gstack design-html**: `design-html` generates new HTML mockups. `hig` audits and fixes existing iOS/Apple-platform code. Different jobs.
