---
name: Landing Page Expert (Demand Curve)
description: >
  Distilled landing page frameworks from the Demand Curve curriculum — page anatomy,
  section-by-section copywriting, conversion optimization, A/B testing, and review
  checklists. Two modes: Build (create from scratch) and Review (audit and improve).
---

# Landing Page Expert — Demand Curve Trained

Quick reference for landing page strategy frameworks. These files distill the structure templates, copywriting formulas, conversion principles, and scoring rubrics from the Demand Curve landing page curriculum (17 LP lessons + 12 copywriting lessons + 11 story system lessons + 9 A/B testing lessons + 3 value prop lessons).

## When to Use

Use these frameworks when:
- Building a new landing page from scratch (copy + structure)
- Reviewing/auditing an existing landing page for conversion issues
- Rewriting landing page copy to improve conversion rates
- Planning A/B tests for landing pages
- Writing hero sections, CTAs, social proof, feature blocks, FAQs
- Turning value propositions into landing page messaging

## Two Operating Modes

| Mode | When | Phases | Output |
|------|------|--------|--------|
| **Build** | New landing page needed | 5 phases | `landing-pages/{page-name}.md` |
| **Review** | Existing page needs improvement | 3 phases | `landing-pages/reviews/{page-name}-review.md` |

## Skill Reference

| File | What It Covers |
|------|----------------|
| `landing-page-anatomy.md` | 80/20 page structure, section-by-section guide (hero, social proof, features/benefits/objections, FAQ, CTA, footer), copy formulas for each section, 7 questions every LP must answer, alternative page types |
| `conversion-optimization.md` | Purchase Rate formula, rapid-fire conversion tactics, A/B testing strategy (macro vs micro), feedback criteria (6-point assessment), device optimization |
| `review-checklist.md` | Section-by-section scoring rubric (Red/Yellow/Green), 7-question completeness check, copy quality gate (3 rules), common mistakes, prioritized fix recommendations |

## Curriculum Source

The complete curriculum lives at: `${CLAUDE_PLUGIN_ROOT}/content/demand-curve/`

| Course | Directory | Lessons |
|--------|-----------|---------|
| Make High-Converting Landing Pages | `make-high-converting-landing-pages/` | 17 |
| Copywriting Fundamentals | `copywriting-fundamentals/` | 12 |
| Create Your Story System | `create-your-story-system/` | 11 |
| Make High-Converting Ad Creatives | `make-high-converting-ad-creatives/` | 9 |
| Landing Page A/B Tests | `landing-page-ab-tests-getting-started/` | 9 |
| Develop Your Value Props | `develop-your-value-props/` | 3 |

## Growth System Integration

When growth system deliverables exist (`growth/*.md`), the landing page agent pulls context:
- **Story System** (`growth/03-story-system.md`) — value props, hooks, personas, brand personality, funnel copy
- **Foundational Five** (`growth/01-foundational-five.md`) — market segment, core problem, target audience
- **Acquisition Strategy** (`growth/05-acquisition-strategy.md`) — competitors, channel strategy, demand type

## Related Agents

- The `growth-fundamentals` agent builds the story system and value props that feed into landing page copy
- The `seo-expert` agent handles on-page SEO for landing pages (title tags, meta descriptions, schema)
- The `blog-writer` agent shares copywriting frameworks (PAS, BAB, AIDA) used in LP sections
