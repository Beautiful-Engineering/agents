---
name: ASO & Keyword Expert (Demand Curve)
description: >
  Distilled App Store Optimization and keyword research frameworks from the Demand Curve
  ASA curriculum — listing optimization, keyword sourcing, competitor analysis, screenshot
  strategy, review generation, and audit rubrics. Two modes: Build (optimize from scratch)
  and Audit (score and improve existing listing).
---

# ASO & Keyword Expert — Demand Curve Trained

Quick reference for App Store Optimization and keyword research frameworks. These files distill the listing optimization techniques, keyword research methods, competitor analysis patterns, and scoring rubrics from the Demand Curve ASA curriculum (3 ASA/ASO lessons + supporting growth system content).

## When to Use

Use these frameworks when:
- Optimizing an App Store listing from scratch (title, subtitle, keywords field, screenshots, description)
- Researching and selecting keywords for Apple Search Ads campaigns
- Auditing an existing App Store listing for conversion and discoverability issues
- Analyzing competitor apps for keyword and positioning gaps
- Building keyword lists categorized by campaign type (Brand/Generic/Competitor/Discovery)
- Improving screenshot strategy and review generation
- Mapping keyword research output into the 4-campaign ASA structure

## Two Operating Modes

| Mode | When | Phases | Output |
|------|------|--------|--------|
| **Build** | New app or listing not yet optimized | 5 phases | `aso/` directory with per-phase deliverables |
| **Audit** | Existing listing needs improvement | 4 phases | `aso/audits/{app-name}-audit.md` |

## Skill Files

| File | What It Covers |
|------|----------------|
| `aso-listing-optimization.md` | Title/subtitle formulas, App Store Connect keywords field (100 chars), description best practices, app preview video requirements, review/rating generation strategy, localization checklist |
| `keyword-research.md` | 4 keyword sourcing methods (Google Keyword Planner, Apple Suggestions, competitor research, existing ads), keyword selection rules (good vs bad), keyword categorization into Brand/Generic/Competitor/Discovery, keyword list building template, target counts per campaign type |
| `competitor-analysis.md` | Competitor identification, keyword gap analysis, listing comparison framework, positioning opportunities, creative benchmarking |
| `aso-audit-rubric.md` | 10-dimension scoring rubric (title, subtitle, keywords, screenshots, description, reviews, video, localization, competitor positioning, keyword coverage), common anti-patterns, prioritized fix recommendations |

## Curriculum Source

The complete curriculum lives at: `${CLAUDE_PLUGIN_ROOT}/content/demand-curve/`

| Lesson | Path | What It Provides |
|--------|------|-----------------|
| ASA & ASO Overview | `apple-search-ads-and-app-store-optimization/01-apple-search-ads-and-app-store-optimization.md` | Title/subtitle optimization, 5-screenshot framework, review strategy, keyword research methods, keyword selection rules, bid strategy, 4-campaign structure |
| Account Structure | `apple-search-ads-and-app-store-optimization/02-account-structure-and-optimization.md` | Campaign-level keyword organization, negative keyword strategy, Discovery keyword mining workflow |
| Project Checklist | `apple-search-ads-and-app-store-optimization/03-project-apple-search-ads.md` | Pre-launch ASO checklist, keyword research checklist, success benchmarks |

## Growth System Integration

When growth system deliverables exist (`growth/*.md`), the ASO agent pulls context:
- **Story System** (`growth/03-story-system.md`) — Value props, hooks, personas, brand personality for listing copy
- **Foundational Five** (`growth/01-foundational-five.md`) — Market segment, core problem, target audience for keyword intent
- **Acquisition Strategy** (`growth/06-acquisition-strategy.md`) — Competitors, channel strategy for competitive keyword research

## Related Agents

- The `apple-ads-analyzer` agent handles ongoing campaign performance analysis — this agent provides the keyword lists and optimized listing that feed into it
- The `growth-fundamentals` agent defines value props and target audience that shape listing copy and keyword selection
- The `landing-page-expert` agent shares conversion optimization principles applicable to App Store product pages
- The `copywriting-expert` agent shares persuasion frameworks useful for screenshot headlines and descriptions
