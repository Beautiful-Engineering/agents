---
name: Google Ads Expert
description: >
  Performance analysis frameworks and campaign management for Google Ads — scoring rubric,
  API integration patterns, keyword strategy, campaign structure, ad copy frameworks, and
  analysis logic for weekly performance reporting. Covers Search, Performance Max, and
  Shopping campaigns. Draws on Demand Curve's Google Ads curriculum and the user's project config.
---

# Google Ads Expert — Skill Reference

Quick reference for Google Ads performance analysis and campaign management frameworks. These files distill the scoring rubrics, API patterns, keyword strategy, campaign setup, and ad copy frameworks used by the Google Ads Expert agent.

## When to Use

Use these frameworks when:
- Building new Google Ads campaigns (Search, PMax, Shopping)
- Running weekly Google Ads performance analysis and optimization
- Scoring campaign/keyword metrics against targets
- Deciding whether to scale, pause, or adjust keyword bids
- Mining search terms for new keywords and negatives
- Writing RSA headlines, descriptions, and PMax creative
- Building or updating the per-project tracking CSVs

## Skill Files

| File | What It Covers |
|------|----------------|
| `rubric.md` | Metric thresholds (CPA, ROAS, CTR, Quality Score, Conversion Rate, Impression Share), bid strategy assessment, default benchmarks |
| `api-integration.md` | Google Ads REST API v18 setup, OAuth 2.0 auth flow, GAQL query templates (campaigns, ad groups, keywords, search terms, ads, assets), env var checklist, error handling |
| `analysis-framework.md` | Keyword classification decision tree (Scale/Pause/Watch/Lower Bid/QS Issue/Ad Copy Issue), search term mining rules (Add Keyword/Add Negative), recommendation prioritization, CSV templates |
| `keyword-strategy.md` | Keyword research process, intent classification (4 tiers), match type strategy (modern approach), negative keyword management, keyword organization and expansion |
| `campaign-setup.md` | Campaign structure checklists for Search, PMax, and Shopping. Launch order, bid strategy selection, budget allocation, audience targeting, conversion tracking, UTM tagging |
| `ad-copy-frameworks.md` | RSA headline/description frameworks (15 headlines in 6 categories), ad asset strategy (sitelinks, callouts), PMax creative guidelines, testing methodology, landing page alignment |

## Per-Project Files (created by agent in user's project)

| File | Purpose |
|------|---------|
| `google-ads/config.md` | Non-secret config: business name, customer ID, targets, campaign list, conversion actions, rubric overrides |
| `google-ads/weekly-performance.csv` | Running history of weekly campaign performance with color-coded metrics |
| `google-ads/change-tracker.csv` | Audit log of all changes (bid adjustments, paused keywords, negatives, budget changes) |
| `google-ads/weekly-log.csv` | Legacy format for historical analysis |
| `google-ads/.progress.md` | Session continuity: current mode/phase, last run date |
| `google-ads/raw/YYYY-MM-DD.json` | Raw API response (debug only, should be gitignored) |

## Curriculum Source

| Lesson | Path | What It Provides |
|--------|------|-----------------|
| Introduction to Google Ads | `content/demand-curve/google-search-ads/01-introduction-google-ads.md` | Overview: Search, PMax, Display, Shopping. When to use each. |
| Introduction to Search Ads | `content/demand-curve/google-search-ads/02-introduction-search-ads.md` | Search campaign setup fundamentals |
| Keywords | `content/demand-curve/google-search-ads/04-keywords.md` | Match types (modern), keyword selection, negative keywords |
| Quality Score & Bids | `content/demand-curve/google-search-ads/06-quality-score-bids-and-bid-strategies.md` | QS components, bid strategy selection, smart bidding rules |
| Search Ads Copy | `content/demand-curve/google-search-ads/07-search-ads-copy.md` | RSA writing, headline frameworks, description best practices |
| Ad Assets | `content/demand-curve/google-search-ads/08-project-ad-assets.md` | Sitelinks, callouts, structured snippets |
| UTM Tags | `content/demand-curve/google-search-ads/09-project-utm-tags.md` | Tracking parameter setup |
| Targeting & Structure | `content/demand-curve/google-search-ads/11-google-ads-targeting-and-structuring.md` | Campaign structure, ad group organization |
| Audiences | `content/demand-curve/google-search-ads/12-google-ads-audiences.md` | Audience layers, RLSA, observation vs targeting |
| Launch | `content/demand-curve/google-search-ads/13-project-launch.md` | Pre-flight checklist |
| Optimization | `content/demand-curve/google-search-ads/14-project-prepare-to-optimize-google-ads.md` | Optimization preparation |
| Ongoing Optimization | `content/demand-curve/google-search-ads/15-project-optimize-google-ads.md` | Weekly optimization workflow |
| Advanced Structure | `content/demand-curve/google-search-ads/17-search-ads-advanced-campaign-structure-examples.md` | Advanced campaign organization patterns |
| PMax Introduction | `content/demand-curve/google-performance-max-ads/01-introduction-performance-max.md` | PMax overview, when to use, prerequisites |
| PMax Account Structure | `content/demand-curve/google-performance-max-ads/02-performance-max-account-structure.md` | Asset groups, audience signals, budget |
| Display Ads | `content/demand-curve/google-performance-max-ads/03-how-to-create-quality-display-ads.md` | Display creative guidelines |
| Video Ads | `content/demand-curve/google-performance-max-ads/04-how-to-create-great-video-ads.md` | Video ad creation frameworks |
| PMax Build | `content/demand-curve/google-performance-max-ads/05-project-build-your-pmax-campaign.md` | PMax campaign setup project |
| PMax Optimize | `content/demand-curve/google-performance-max-ads/06-project-optimize-scale-your-pmax-campaign.md` | PMax optimization and scaling |
| Shopping Introduction | `content/demand-curve/google-shopping-ads/01-introduction-shopping-ads.md` | Shopping ads overview, Merchant Center |
| Shopping Structure | `content/demand-curve/google-shopping-ads/02-shopping-ads-campaign-structure.md` | Shopping campaign organization |
| Merchant Center | `content/demand-curve/google-shopping-ads/03-project-google-merchant-center.md` | Product feed setup |
| Shopping Campaigns | `content/demand-curve/google-shopping-ads/04-project-shopping-ads.md` | Shopping campaign setup project |

## Related Agents

- The `growth-fundamentals` agent defines CAC targets and value propositions that feed into CPA targets and ad copy
- The `seo-expert` agent provides keyword data that informs Google Ads keyword strategy
- The `landing-page-expert` agent builds landing pages used as Final URLs — QS landing page experience depends on page quality
- The `blog-writer` agent creates content assets that can be used in PMax creative
- The `apple-ads-analyzer` agent uses the same performance analysis pattern for Apple Search Ads

## Rubric Override

Projects can override default thresholds in `google-ads/config.md`:
```markdown
## Rubric Overrides
- Target CPA: $35          (overrides default $50)
- Target ROAS: 500%        (overrides default 400%)
- Min CTR (Brand): 12%     (overrides default 15%)
- Min Quality Score: 6     (overrides default 7)
```

Agent always reads project config first; falls back to `rubric.md` defaults if not set.
