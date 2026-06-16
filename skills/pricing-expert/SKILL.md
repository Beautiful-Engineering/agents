---
name: Pricing Expert (Demand Curve)
description: >
  Distilled pricing and monetization frameworks from the Demand Curve curriculum — value metric
  selection, pricing structures, price point research, tier design, growth economics, pricing page
  copy, and audit rubrics. Two modes: Build (design pricing from scratch) and Audit (review and
  optimize existing pricing).
---

# Pricing Expert — Demand Curve Trained

Quick reference for pricing strategy frameworks. These files distill the value metric selection process, pricing structures, research methods, tier design, growth economics validation, pricing page copywriting, and audit rubrics from the Demand Curve monetization curriculum (8 monetization/pricing lessons + 3 sales strategy lessons + 3 monetization motion lessons + 2 growth guardrails lessons + 2 fit mechanics lessons).

## When to Use

Use these frameworks when:
- Designing a monetization and pricing strategy from scratch
- Choosing what to charge for (value metric / proxy selection)
- Selecting a pricing structure and timing model
- Researching price points with customers (Van Westendorp, max-diff)
- Designing tiers and packaging offers
- Validating pricing against growth economics (ARPU, CAC, payback)
- Writing pricing page copy (tier table, FAQ, trust elements)
- Auditing existing pricing for misalignment and improvement opportunities
- Designing pricing experiments

## Two Operating Modes

| Mode | When | Phases | Output |
|------|------|--------|--------|
| **Build** | New pricing strategy needed | 7 phases | `pricing/01-value-metric.md` through `pricing/06-pricing-page.md` + `pricing/pricing-strategy.md` |
| **Audit** | Existing pricing needs review | 5 phases | `pricing/audits/{product-name}-audit.md` |

## Skill Reference

| File | What It Covers |
|------|----------------|
| `value-metric-selection.md` | 4 mistakes, 4 principles, 3 value metric categories, JTBD translation, 5-point pressure test |
| `pricing-structures.md` | 5 structures with pros/cons, 6 timing options, 3 monetization motions, structure-timing selection matrix |
| `price-point-research.md` | Van Westendorp 4Q, max-diff method, 3 universal anchors, Hormozi value levers, 10x test, price band triangulation |
| `tier-design-packaging.md` | Good/Better/Best design, feature gating, 7 SaaS models, 6 paths to live, offer script, objection handling |
| `growth-economics.md` | ARPU→Target CAC formula, payback periods, Janz framework, model-market/model-channel fit checks |
| `pricing-page-copy.md` | Pricing page structure, tier comparison template, FAQ template, 7 questions, common mistakes |
| `pricing-audit-rubric.md` | 10-dimension scorecard (Red/Yellow/Green), anti-patterns checklist, experiment design template |

## Curriculum Source

The complete curriculum lives at: `${CLAUDE_PLUGIN_ROOT}/content/demand-curve/`

| Course | Directory | Key Lessons |
|--------|-----------|-------------|
| Monetization & Pricing Strategy | `monetization-pricing-strategy/` | 02 (design), 03 (what to charge), 04 (how/when), 05 (how much), 06 (project), 07 (research) |
| Identify Your Monetization Motion | `identify-your-monetization-motion/` | 01 (3 motions) |
| Sales Strategy Fundamentals | `sales-strategy-fundamentals/` | 11 (pricing model), 12 (set price & defend), 13 (packaging) |
| Growth Guardrails | `growth-guardrails/` | 03 (growth economics) |
| Growth Guardrails B2C | `growth-guardrails-b2c/` | 03 (growth economics B2C) |
| Fit Mechanics & Pairings | `fit-mechanics-pairings/` | 03 (model-market fit), 04 (model-channel fit) |

## Growth System Integration

When growth system deliverables exist (`growth/*.md`), the pricing agent pulls context:
- **Guardrails** (`growth/02-catalysts-guardrails.md`) — ARPU, target CAC, payback period, growth budget. **Primary input — constrains all pricing decisions.**
- **Foundational Five** (`growth/01-foundational-five.md`) — Market segment, business model, core product value
- **Story System** (`growth/03-story-system.md`) — Value props, personas, brand personality (for pricing page copy)
- **Acquisition Strategy** (`growth/06-acquisition-strategy.md`) — Acquisition motion, channel strategy (for model-channel fit)

## Related Agents

- The `growth-fundamentals` agent builds the guardrails and foundational five that feed directly into pricing decisions
- The `landing-page-expert` agent owns the full landing page; the pricing expert owns the pricing section within it
- The `cold-email-outreach` agent may reference pricing as part of offer positioning
- The `google-ads-expert` agent uses ARPU and CAC targets for campaign optimization
