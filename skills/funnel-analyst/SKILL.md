---
name: Funnel Analyst
description: >
  Product-funnel analysis frameworks for any PostHog-instrumented app — default
  scoring thresholds, validated PostHog MCP query recipes (trends/funnel/SQL),
  the four standard funnel views, and the RevenueCat↔PostHog identity-gap test.
  Brand-agnostic; the agent reads per-project event names and targets from
  funnel/config.md and falls back to these defaults.
---

# Funnel Analyst — Skill Reference

Quick reference for weekly product-funnel analysis on top of PostHog. These files
distill the scoring rubric, query patterns, and analysis logic the Funnel Analyst
agent uses.

## When to Use

- Running the weekly funnel report (acquisition, onboarding, monetization, churn).
- Scoring funnel metrics against project targets.
- Testing whether RevenueCat purchases link to the right PostHog person.
- Building or updating the per-project funnel tracker.

## Skill Files

| File | What It Covers |
|------|----------------|
| `rubric.md` | Default 🟢/🟡/🔴 thresholds for each view + the four standard view definitions. Fallback when `funnel/config.md` doesn't set a project-specific target. |
| `query-recipes.md` | Validated PostHog MCP query patterns (`query-trends`, `query-funnel`, `execute-sql`) for each view, plus the identity-gap diagnostic queries. |
| `analysis-framework.md` | Scoring method, RevenueCat↔PostHog identity-gap handling, `funnel/config.md` template, and `weekly-funnel.csv` column definitions. |

## Per-Project Files (created by the agent)

| File | Purpose |
|------|---------|
| `funnel/config.md` | Validated event/property names, targets, the four view definitions, and known caveats (e.g. identity-gap status). |
| `funnel/weekly-funnel.csv` | Running weekly history. |
| `funnel/.progress.md` | Session continuity: last run, weeks logged, headline numbers, linkage state. |

## Related Agents

- `growth-fundamentals` — defines CAC/LTV/conversion targets feeding the thresholds.
- `pricing-expert` — trial length & paywall structure (Views C/D).
- `apple-ads-analyzer`, `google-ads-expert` — paid acquisition (View A).
