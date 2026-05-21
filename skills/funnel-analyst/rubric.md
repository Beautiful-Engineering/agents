# Funnel Analyst — Rubric & Standard Views

Default thresholds. The agent ALWAYS prefers project-specific targets in `funnel/config.md`;
these are fallbacks for setup and for any metric the project hasn't set.

## The four standard views

### View A — Acquisition sources
Where users come from. For self-reported attribution (a "How did you hear about us?" onboarding
step), break the attribution event down by its source property. Also compute **coverage** =
attribution-completed ÷ installs (how representative the sample is). Watch the WoW shift in the
top sources — a channel doubling week-over-week is the signal, not the absolute rank.

### View B — Onboarding / activation funnel
The ordered sequence from install to the activation moment (first core action) and/or paywall.
Report per-step conversion and the single biggest drop-off step.

### View C — Install → Trial → Paid
The monetization funnel. **Mind the identity gap** (see `analysis-framework.md`): if RevenueCat
events aren't linked to the device's PostHog person, report this BLENDED (totals + computed rates)
rather than by-source.

### View D — Paywall & churn
Paywall presented → result (purchase) conversion, plus trial cancellations, expirations,
renewals, and billing issues.

## Default thresholds

| Metric | 🟢 Good | 🟡 OK | 🔴 Poor |
|--------|---------|-------|---------|
| Attribution coverage (completed ÷ installs) | 70%+ | 50–70% | <50% |
| Onboarding completion (install → activation/paywall) | 60%+ | 40–60% | <40% |
| Trial start rate (trials ÷ installs) | 15%+ | 8–15% | <8% |
| Trial → Paid conversion | 25%+ | 15–25% | <15% |
| Paywall conversion (presented → purchase) | 8%+ | 4–8% | <4% |
| Weekly trial cancel rate (cancels ÷ trials) | <20% | 20–40% | >40% |

These are reasonable consumer-subscription defaults. B2B, one-time-purchase, or hard-paywall apps
will differ — capture the real targets in `funnel/config.md`. Trial→Paid in particular is highly
dependent on trial length and whether a card is required up front.

## Rubric override

`funnel/config.md` can override any default:
```markdown
## Rubric Overrides
- Trial → Paid target: 30%
- Onboarding completion: 70%
- Paywall conversion: 10%
```
The agent reads project config first; falls back to the table above.

## Sample-size guardrail

Below ~30 events in a step, treat percentages as directional only and say so. A 1-of-3 vs 2-of-4
swing is noise. Report counts alongside rates so the reader can judge.
