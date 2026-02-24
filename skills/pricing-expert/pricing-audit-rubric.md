# Pricing Audit Rubric

10-dimension scorecard, anti-patterns checklist, and experiment design template for auditing existing pricing.

Source: Synthesized from all monetization and pricing curriculum

---

## 10-Dimension Pricing Scorecard

Score each dimension Red / Yellow / Green:

- **Green**: Strong — well-aligned, evidence-based, no major issues
- **Yellow**: Functional but has improvement opportunities
- **Red**: Misaligned, evidence-free, or actively hurting growth

---

### 1. Value Metric Alignment

| Criteria | Green | Yellow | Red |
|----------|-------|--------|-----|
| Clear value metric identified | Customers understand exactly what they pay for | Metric exists but not intuitive to customers | No clear metric; pricing feels arbitrary |
| Revenue scales with value | More usage/outcomes = more revenue naturally | Some correlation but imperfect | Price disconnected from value delivery |
| Passes 5-point pressure test | All 5 questions pass | 3-4 pass | <3 pass or untested |

### 2. Structure Fit

| Criteria | Green | Yellow | Red |
|----------|-------|--------|-----|
| Structure matches value metric | Usage-based for usage value; tiered for feature value | Reasonable but not optimal match | Structure contradicts how customers get value |
| Industry alignment | Follows industry norms or strategically differentiates | Slightly unusual but functional | Introduces unnecessary friction by being unfamiliar |
| Simplicity | Buyer understands pricing in <30 seconds | Requires some explanation | Confusing or requires calculator |

### 3. Timing Alignment

| Criteria | Green | Yellow | Red |
|----------|-------|--------|-----|
| Matches monetization motion | PLG → low-friction timing; SL → annual/contract | Partially aligned | Timing contradicts motion (e.g., annual for PLG consumer) |
| Supports payback target | Revenue timing allows CAC recovery within target | Marginal — close to target | Revenue timing makes payback impossible |
| Cash flow healthy | Timing supports growth investment | Adequate but tight | Cash flow negative with no path to recovery |

### 4. Price Point

| Criteria | Green | Yellow | Red |
|----------|-------|--------|-----|
| Customer-informed | Based on WTP data (Van Westendorp, interviews) | Based on competitor benchmarking only | Guessed or set arbitrarily |
| 10x value test | Customers perceive ~10x value for price | 5-8x perceived value | <5x perceived value or untested |
| Margin-healthy | Supports target CAC and payback | Tight margins but viable | Below cost-plus floor or unsustainable |

### 5. Tier Design

| Criteria | Green | Yellow | Red |
|----------|-------|--------|-----|
| Clear personas per tier | Each tier maps to a distinct buyer segment | Some overlap between tiers | Tiers feel arbitrary or redundant |
| Upgrade triggers | Natural limits that drive tier progression | Upgrade path exists but not compelling | No clear reason to upgrade; or gates core value |
| Recommended tier highlighted | One tier is visually prominent and clearly best for most | Tiers are equal visually | No guidance; decision paralysis |
| 3-4 tiers max | Within range | 5 tiers (borderline) | 6+ tiers or single option in complex market |

### 6. Growth Economics

| Criteria | Green | Yellow | Red |
|----------|-------|--------|-----|
| ARPU known and tracked | Calculated from real data; tracked monthly | Estimated directionally | Unknown or never calculated |
| Target CAC defined | Derived from ARPU x Margin x Payback | Rough estimate exists | No target CAC |
| Model-market fit | Janz framework check passes; market share feasible | Stretch but possible | Required market share >10% or ARPU 50%+ below target |
| Model-channel fit | Channels consistently deliver below target CAC | Some channels work, some don't | No viable channel within CAC target |

### 7. Competitive Positioning

| Criteria | Green | Yellow | Red |
|----------|-------|--------|-----|
| Competitor landscape mapped | 3-5 competitors documented with pricing models | Some awareness but not systematic | No competitor pricing research |
| Differentiation clear | Pricing reflects unique value; not just matching competitors | Similar to competitors with minor differences | Copy-pasted competitor pricing without differentiation |
| Strategic position chosen | Deliberate premium/parity/discount with rationale | Position unclear or unintentional | Accidentally positioned (too cheap or too expensive) |

### 8. Packaging & Presentation

| Criteria | Green | Yellow | Red |
|----------|-------|--------|-----|
| Offer is repeatable | Buyer can explain what they get in one sentence | Mostly clear but some ambiguity | Confusing; requires a demo to explain pricing |
| Pricing page quality | Clean tier table, FAQ, trust elements, recommended tier | Basic but functional | Missing, confusing, or hidden |
| Path to live defined | Clear trial/pilot/subscription path that matches product | Path exists but not optimal | No clear next step after pricing page |

### 9. Monetization Motion Fit

| Criteria | Green | Yellow | Red |
|----------|-------|--------|-----|
| Motion matches ARPU | PL for <$1k; SL for >$5k; Hybrid for mixed | Mostly aligned | Motion contradicts ARPU (e.g., sales-led for $50 ARPU) |
| Motion matches product | Simple product → PL; Complex → SL | Functional but not optimal | Product requires hand-holding but using PL only |
| Motion matches acquisition | Fast acq → PL; Slow acq → SL | Partially aligned | Acquisition and monetization motions conflict |

### 10. Customer Research Foundation

| Criteria | Green | Yellow | Red |
|----------|-------|--------|-----|
| WTP data collected | Van Westendorp or equivalent with 10+ responses | Informal conversations only | No customer pricing research |
| Feature priorities validated | Max-diff or interview data on feature importance | Anecdotal understanding | Assumed without customer input |
| Iteration history | Pricing has been tested and refined based on data | One revision based on feedback | Set once and never revisited |

---

## Anti-Patterns Checklist

Instant red flags that suggest pricing needs attention:

| # | Anti-Pattern | Symptom |
|---|-------------|---------|
| 1 | **Priced by founder intuition** | No customer WTP data; price was "what felt right" |
| 2 | **Copy-pasted competitor pricing** | Identical to competitor without differentiation analysis |
| 3 | **Single price for all segments** | SMB and enterprise pay the same; leaving money on table |
| 4 | **Feature gating kills the JTBD** | Free tier is so limited users can't experience core value |
| 5 | **Taxi-meter anxiety** | Usage-based pricing but customers can't predict their bill |
| 6 | **Annual-only with no trial** | High friction for new customers; conversion rate suffering |
| 7 | **Price anchored to costs, not value** | Cost-plus only; likely significantly underpriced |
| 8 | **No upgrade path** | Single tier with no expansion revenue mechanism |
| 9 | **Discount-dependent sales** | Reps routinely discount 30%+; list price lacks credibility |
| 10 | **Pricing page is "Contact Us"** | Hides pricing unnecessarily for non-enterprise products |
| 11 | **ARPU unknown** | Can't calculate target CAC or evaluate channel viability |
| 12 | **Payback period undefined** | No framework for evaluating if acquisition spend is sustainable |

---

## Experiment Design Template

For each pricing change recommendation, design a test:

```markdown
## Pricing Experiment: [Name]

### Hypothesis
If we [change], then [metric] will [improve/decrease] because [reasoning].

### Change Description
- Current: [what exists today]
- Proposed: [what we're testing]
- Scope: [which segments/tiers/pages affected]

### Success Metrics
- Primary: [the metric that determines success/failure]
- Secondary: [supporting metrics to watch]
- Guardrail: [metric that must NOT degrade]

### Test Design
- Type: [A/B test / cohort test / staged rollout / price change with monitoring]
- Duration: [minimum time to statistical significance or meaningful data]
- Sample size: [target number of customers/trials/signups]
- Segment: [who sees the change]

### Rollback Plan
- Trigger: [when to stop the experiment]
- Rollback steps: [how to revert]

### Decision Framework
- If primary metric improves by [X]% with no guardrail degradation → ship
- If primary metric is flat → extend test or iterate
- If guardrail metric degrades → rollback immediately
```

---

## Audit Deliverable Template

```markdown
# Pricing Audit: [Company/Product Name]
Date: [YYYY-MM-DD]

## Overall Score: [Red / Yellow / Green]

## Scorecard Summary
| # | Dimension | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Value Metric Alignment | [R/Y/G] | [one-line] |
| 2 | Structure Fit | [R/Y/G] | [one-line] |
| 3 | Timing Alignment | [R/Y/G] | [one-line] |
| 4 | Price Point | [R/Y/G] | [one-line] |
| 5 | Tier Design | [R/Y/G] | [one-line] |
| 6 | Growth Economics | [R/Y/G] | [one-line] |
| 7 | Competitive Positioning | [R/Y/G] | [one-line] |
| 8 | Packaging & Presentation | [R/Y/G] | [one-line] |
| 9 | Monetization Motion Fit | [R/Y/G] | [one-line] |
| 10 | Customer Research Foundation | [R/Y/G] | [one-line] |

## Anti-Patterns Found
- [list any that apply]

## Priority Fixes (Ranked by Impact)

### Critical (Red dimensions)
1. [Fix + rationale + expected impact]

### High (Yellow dimensions with biggest revenue impact)
1. [Fix + rationale + expected impact]

### Medium (Yellow dimensions, nice-to-have)
1. [Fix + rationale + expected impact]

## Recommended Experiments
1. [Experiment name + brief hypothesis]
2. [Experiment name + brief hypothesis]

## What's Working Well
[Celebrate what's strong]
```
