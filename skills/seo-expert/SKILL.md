---
name: SEO Expert (Demand Curve)
description: >
  Distilled SEO frameworks from the Demand Curve curriculum — technical audits,
  on-page optimization, keyword strategy, off-page link building, and ongoing
  optimization checklists. Two modes: Baseline Audit (4-phase setup) and
  Ongoing Optimization (periodic health checks).
---

# SEO Expert — Demand Curve Trained

Quick reference for SEO strategy frameworks. These files distill the checklists, formulas, scoring rubrics, and templates from the Demand Curve SEO curriculum (17 SEO modules + content marketing + B2B/B2C foundations).

## When to Use

Use these frameworks when:
- Setting up SEO for a new site from scratch (Baseline Audit)
- Running periodic SEO health checks (Ongoing Optimization)
- Conducting keyword research and content planning
- Auditing technical SEO issues
- Building a backlink strategy
- Optimizing on-page elements (titles, metas, headings, images)

## Two Operating Modes

| Mode | When | Phases | Output |
|------|------|--------|--------|
| **Baseline Audit** | New site, no SEO | 4 phases | `seo/01-*.md` through `seo/04-*.md` |
| **Ongoing Optimization** | Foundations exist | Per-session | `seo/audits/YYYY-MM-DD-audit.md` |

## Skill Reference

| Phase | File | What It Covers |
|-------|------|----------------|
| 1 | `technical-seo-checklist.md` | HTTPS, mobile, speed/CWV, robots.txt, sitemap, indexability, Ahrefs audit — 8-point checklist with scoring |
| 2 | `on-page-seo.md` | Per-page audit (12 items): URLs, titles, metas, headings, images, links, schema — plus title/meta formulas and site architecture |
| 3 | `keyword-strategy.md` | 4-phase research workflow, clustering, gap analysis, topical authority map, content calendar — viability filters and Story System integration |
| 4a | `off-page-seo.md` | Backlink audit, DR baseline, 3 link categories (owned/acquired/organic), pitch trackers, monthly action plan |
| 4b | `ongoing-optimization.md` | Monthly 8-step audit, GSC data templates, content freshness protocol, competitor tracking, quarterly deep dives |

## Tool Integration

| Tool | Purpose |
|------|---------|
| `mcp__ahrefs__doc` | Domain overview, keyword data, backlink profiles |
| `mcp__ahrefs__site-audit-page-explorer` | Site audit — crawl errors, technical issues |
| `WebFetch` | Robots.txt, sitemap, HTTPS verification, page source inspection |
| `Bash` (curl) | PageSpeed Insights API for Core Web Vitals |

If Ahrefs MCP is not available, the agent degrades gracefully using WebFetch and manual inspection.

## Curriculum Source

The complete SEO curriculum lives at: `${CLAUDE_PLUGIN_ROOT}/content/demand-curve/`

| Course | Directory |
|--------|-----------|
| SEO Fundamentals (17 modules) | `content/demand-curve/seo-fundamentals/` |
| B2C SEO Foundation | `content/demand-curve/seo-build-your-foundation/` |
| B2B SEO Foundation | `content/demand-curve/b2b-seo-build-your-foundation/` |
| Content Marketing | `content/demand-curve/content-marketing-fundamentals/` |

## Growth System Integration

When growth system deliverables exist (`growth/*.md`), the SEO agent pulls context:
- **Foundational Five** (`growth/01-foundational-five.md`) → market segment, target audience
- **Story System** (`growth/03-story-system.md`) → value props as seed keywords, hooks for title tags
- **Acquisition Strategy** (`growth/06-acquisition-strategy.md`) → competitors, channel priorities

## Related Agent

The `seo-expert` agent (`${CLAUDE_PLUGIN_ROOT}/agents/seo-expert.md`) orchestrates these frameworks into a structured audit workflow, executing checks and fixes across each phase.
