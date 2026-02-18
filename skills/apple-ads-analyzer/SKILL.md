---
name: Apple Ads Analyzer
description: >
  Performance analysis frameworks for Apple Search Ads campaigns — scoring rubric,
  API integration patterns, and analysis logic for weekly keyword-level reporting.
  Covers bid adjustment decision trees, keyword classification rules, and search term
  mining. Draws on Demand Curve's ASA curriculum and the user's own project config.
---

# Apple Ads Analyzer — Skill Reference

Quick reference for Apple Search Ads performance analysis frameworks. These files distill the scoring rubrics, API patterns, and recommendation logic used by the Apple Ads Analyzer agent.

## When to Use

Use these frameworks when:
- Running weekly Apple Search Ads performance analysis
- Scoring campaign/keyword metrics against targets
- Deciding whether to raise, lower, or pause a keyword bid
- Mining the Discovery campaign for new exact-match keywords
- Adding negative keywords to block wasted spend
- Building or updating the per-project tracking CSV

## Skill Files

| File | What It Covers |
|------|----------------|
| `rubric.md` | Metric thresholds by campaign type (Impressions, TTR, CR, CPI, ROAS), bid adjustment decision tree, troubleshooting priority framework, default benchmarks from the Demand Curve curriculum |
| `api-integration.md` | Python JWT auth script (ES256), Apple Search Ads API endpoint patterns (campaigns, ad groups, keywords, search terms), RevenueCat MCP join logic, response field mapping, error handling, env var setup checklist |
| `analysis-framework.md` | Keyword classification rules (Scale/Pause/Raise Bid/Lower Bid/Investigate), search term mining rules (Add Keyword/Add Negative), recommendation prioritization, CSV row formatting template, weekly-log.csv column definitions |

## Per-Project Files (created by agent in user's project)

| File | Purpose |
|------|---------|
| `apple-ads/config.md` | Non-secret config: app name, orgId, campaign names/IDs, CPI target, CAC target, currency |
| `apple-ads/weekly-log.csv` | Running history of weekly campaign performance |
| `apple-ads/.progress.md` | Session continuity: last run date, current phase |
| `apple-ads/raw/YYYY-MM-DD.json` | Raw API response (debug only, should be gitignored) |

## Curriculum Source

| Lesson | Path | What It Provides |
|--------|------|-----------------|
| ASA Overview | `content/demand-curve/apple-search-ads-and-app-store-optimization/01-apple-search-ads-and-app-store-optimization.md` | 4-campaign structure, KPI benchmarks, bid adjustment decision tree, ASO requirements, keyword selection rules, troubleshooting priority framework |
| Account Structure | `content/demand-curve/apple-search-ads-and-app-store-optimization/02-account-structure-and-optimization.md` | Campaign-level setup, negative keyword strategy, Discovery → keyword mining workflow, scaling/quitting decision criteria |
| Project Checklist | `content/demand-curve/apple-search-ads-and-app-store-optimization/03-project-apple-search-ads.md` | Project-based implementation checklist — used for setup verification |

## Related Agents

- The `growth-fundamentals` agent defines CAC targets and LTV expectations that feed into CPI/ROAS thresholds
- The `seo-expert` agent handles App Store Optimization signals that affect TTR (low TTR often = ASO issue, not keyword issue)
- The `landing-page-expert` agent builds the post-click experience; ASA is the paid pre-click channel

## Rubric Override

Projects can override default thresholds in `apple-ads/config.md`:
```markdown
## Rubric Overrides
- Max CPI: $1.56          (overrides default formula)
- ROAS Target: 300%       (overrides default 200%)
- Min TTR (Brand): 8%     (overrides default 5%)
```

Agent always reads project config first; falls back to `rubric.md` defaults if not set.
