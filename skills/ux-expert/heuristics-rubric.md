# Heuristics Rubric

Quality gate for Audit mode (A3). Score every dimension 0 to 3, quote the element behind each score below 3, and name the heuristic or law it violates. This file owns all thresholds; other files point here.

---

## Scale

| Score | Meaning |
|-------|---------|
| **3** | Strong. Meets the standard; nothing to fix. |
| **2** | Works, with clear room to improve. |
| **1** | Hurts the job. Users will hesitate, make mistakes, or drop off. |
| **0** | Blocks the job, or fails an accessibility minimum. |

**Verdict** from the total (10 dimensions, max 30):
- **25 to 30, Ship:** polish items only.
- **18 to 24, Revise:** fix every 0 and 1 before shipping.
- **Under 18, or any 0 on dimension 1 or 9, Rethink:** the flow needs redesign, not tweaks. Go to Design mode.

---

## 1. Action clarity

Can a first-time user tell what to do here within about 5 seconds?

| 3 | 2 | 1 | 0 |
|---|---|---|---|
| One primary action, visually dominant, verb label, in thumb reach | Primary exists but competes with one other element | Two or more elements tie for attention; vague label ("Continue") | No identifiable primary action, or it's below the fold / hidden in a menu |

*Laws: Von Restorff (the different thing gets noticed), Fitts (big and close is faster).*

## 2. Choice load

| 3 | 2 | 1 | 0 |
|---|---|---|---|
| 4 or fewer options at each decision, sensible default chosen | 5 to 7 options, or no default | 8+ undifferentiated options | Choice blocks progress with no guidance |

*Laws: Hick (more options, slower decisions), Miller (small working memory).*

## 3. Visibility of system status (Nielsen 1)

| 3 | 2 | 1 | 0 |
|---|---|---|---|
| Every action gets feedback within about 400 ms; loading, progress, and success are visible | Feedback exists but is slow or subtle | Some actions give no feedback | Users can't tell if anything happened |

*Law: Doherty threshold (under about 400 ms keeps people in flow).*

## 4. Match with the real world and conventions (Nielsen 2, 4)

| 3 | 2 | 1 | 0 |
|---|---|---|---|
| Users' own words; platform conventions followed | One or two internal terms or odd placements | Jargon or a broken convention on a key element | Users can't map labels or navigation to their goal |

*Law: Jakob (people expect your app to work like the others they use).*

## 5. User control and error handling (Nielsen 3, 5, 9)

| 3 | 2 | 1 | 0 |
|---|---|---|---|
| Undo for reversible actions; errors prevented by design; error messages say how to fix | Confirm dialogs where undo would do; errors are clear but generic | Errors blame the user or don't say what to do | Destructive action with no undo or warning; dead-end errors |

## 6. Recognition over recall and consistency (Nielsen 4, 6)

| 3 | 2 | 1 | 0 |
|---|---|---|---|
| Options and context visible; same thing looks and acts the same everywhere | Minor inconsistencies | Users must remember info from a previous screen; one element behaves two ways | Core navigation or terms change between screens |

## 7. Hierarchy and minimalism (Nielsen 8)

| 3 | 2 | 1 | 0 |
|---|---|---|---|
| Clear visual levels (title, key info, details); nothing competes with the job | Slightly busy; one section could go | Many elements at the same weight; important info buried | Wall of equal-weight content; see `anti-patterns.md` |

## 8. Flow friction and momentum

Count steps from arrival to the job done.

| 3 | 2 | 1 | 0 |
|---|---|---|---|
| Minimum steps; progress visible on multi-step flows; success chains to a next action | One avoidable step or field; success is a dead end | Several avoidable steps, a surprise cost, or a forced sign-up before value | Users can't finish without outside help |

*Laws: goal-gradient (people speed up near the finish), Zeigarnik (unfinished tasks pull people back), peak-end (the end shapes the memory), Tesler (move complexity to the system).*

## 9. Accessibility basics

| 3 | 2 | 1 | 0 |
|---|---|---|---|
| All checks below pass | One minor miss (for example, one 40 pt target) | Several misses, or one on the primary action | Primary action or key text fails contrast or can't be reached by screen reader or keyboard |

Checks:
- **Contrast (WCAG 2.2 AA):** body text 4.5:1, large text (18 pt+, or 14 pt bold) and UI components 3:1.
- **Targets:** 44 x 44 pt iOS, 48 x 48 dp Android, at least 24 x 24 CSS px on web (aim for 44 on touch).
- **Text scaling:** layout survives the largest Dynamic Type / 200% browser zoom.
- **Focus:** visible focus ring on web; logical order; no keyboard traps.
- **Labels:** every icon-only button has an accessible label; images that carry meaning have alt text.
- **Not color alone:** status (safe, caution, error) uses icon or text as well as color.
- **Motion:** respects reduce-motion settings.

## 10. Measurability

| 3 | 2 | 1 | 0 |
|---|---|---|---|
| Success metric defined; every funnel step has an event with source and version | Metric defined, one step missing an event | Events exist but don't map to the job | No events; impact of any change is unknowable |

See `jobs-and-metrics.md` for naming and the plan template.

---

## Summary table (present with every audit)

| # | Dimension | Score | Key evidence |
|---|-----------|-------|--------------|
| 1 | Action clarity | /3 | |
| 2 | Choice load | /3 | |
| 3 | System status | /3 | |
| 4 | Real-world match | /3 | |
| 5 | Control and errors | /3 | |
| 6 | Recognition and consistency | /3 | |
| 7 | Hierarchy | /3 | |
| 8 | Flow friction | /3 | |
| 9 | Accessibility | /3 | |
| 10 | Measurability | /3 | |
| | **Total / Verdict** | /30 | Ship / Revise / Rethink |

Nielsen heuristics 7 (flexibility and efficiency) and 10 (help and documentation) are folded in: score shortcuts for repeat users under dimension 8, and help content under dimension 6. If the target is an Apple-platform app and the user wants a full platform review, also run the `hig` skill's rubric; don't duplicate it here.
