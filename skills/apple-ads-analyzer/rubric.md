# Apple Search Ads — Performance Scoring Rubric

Scoring thresholds for campaign-level and keyword-level metrics. These are defaults based on the Demand Curve ASA curriculum and the Runo app setup. Each project overrides these via `apple-ads/config.md`.

Source: Demand Curve ASA curriculum (`01-apple-search-ads-and-app-store-optimization.md`)

---

## CPI Threshold Formula

**Always use the project's CPI target from `apple-ads/config.md`.**

Default formula if not set in config:
```
Max CPI = CAC_target ÷ 3
```
Example: CAC target $4.70 → Max CPI $1.57

| CPI vs Target | Score |
|---------------|-------|
| ≤ 1× target | 🟢 Green |
| 1–2× target | 🟡 Yellow |
| > 2× target | 🔴 Red |
| > 3× target after 10+ installs | 🔴 Red — pause candidate |

---

## Impressions Thresholds (by Campaign Type)

Per Demand Curve: impression volume expectations differ by campaign type due to keyword pool size.

| Campaign Type | 🟢 Green | 🟡 Yellow | 🔴 Red |
|---------------|----------|-----------|--------|
| Brand | ≥ 10,000/week | 3,000–10,000 | < 3,000 |
| Generic | ≥ 50,000/week | 15,000–50,000 | < 15,000 |
| Competitor | ≥ 5,000/week | 1,500–5,000 | < 1,500 |
| Discovery | ≥ 100,000/week | 30,000–100,000 | < 30,000 |

> Note: Low impressions on a good keyword = bid is too low. Low impressions on Discovery = budget cap or poor keyword match types.

---

## TTR (Tap-Through Rate) Thresholds

TTR is a signal of creative relevance and App Store asset quality (screenshots, icon, preview). Low TTR usually indicates an ASO issue, not a keyword issue.

| Campaign Type | 🟢 Green | 🟡 Yellow | 🔴 Red |
|---------------|----------|-----------|--------|
| Brand | ≥ 8% | 4–8% | < 4% |
| Generic | ≥ 4% | 2–4% | < 2% |
| Competitor | ≥ 3% | 1.5–3% | < 1.5% |
| Discovery | ≥ 2% | 1–2% | < 1% |

> Per Demand Curve: if TTR is red across multiple campaign types, prioritize ASO (screenshots, icon) before adjusting keyword bids.

---

## CR (Conversion Rate = Installs ÷ Taps) Thresholds

Universal across all campaign types. CR < 40% usually means the product page needs work (screenshots, description, ratings).

| CR | Score |
|----|-------|
| ≥ 60% | 🟢 Green |
| 40–60% | 🟡 Yellow |
| < 40% | 🔴 Red |
| < 20% | 🔴 Red — likely ASO issue |

---

## ROAS (Revenue ÷ Spend) Thresholds

Only available when RevenueCat (or equivalent) is connected and ASA attribution is flowing.

| ROAS | Score |
|------|-------|
| > 300% | 🟢 Green — profitable, scale |
| 100–300% | 🟡 Yellow — breaking even or marginal |
| < 100% | 🔴 Red — spending more than earning |

> Note: ROAS below 100% can still be acceptable early in a keyword's lifecycle (LTV accrues over time). Flag but don't auto-pause.

---

## Revenue per Install vs. CAC Target

When revenue data is available, compare Revenue/Install to the project's CAC target.

| Revenue/Install | Score |
|-----------------|-------|
| ≥ CAC target | 🟢 Green — keyword is paying back |
| 50–100% of CAC target | 🟡 Yellow — marginal |
| < 50% of CAC target | 🔴 Red — keyword may not pay back |

---

## Overall Campaign Rating

| Rating | Criteria |
|--------|---------|
| 🟢 Green | CPI green AND CR green AND TTR yellow or better |
| 🟡 Yellow | CPI yellow OR CR yellow, no metric in red |
| 🔴 Red | CPI red OR CR red OR TTR red on 2+ campaign types |

---

## Bid Adjustment Decision Tree

Adapted from Demand Curve's bid adjustment framework:

```
Is CPI 🔴 Red (> 2× target) after 10+ installs?
├─ YES → Pause keyword immediately
└─ NO  → Is CPI 🟡 Yellow (1–2× target)?
          ├─ YES → Decrease bid by 20–30%
          └─ NO  → Is CPI 🟢 Green?
                    ├─ Are impressions low?
                    │   ├─ YES (< 30% of expected) → Increase bid by 50%
                    │   └─ NO → Maintain bid, monitor
                    └─ Does keyword have 🟢 ROAS + low impressions?
                        └─ YES → Scale: increase bid 50%, increase budget
```

**Impression share rule** (per Demand Curve): If a keyword has good CPI and impression share is under 30% of the campaign's total, increase bid by 50%.

**Budget rule**: Do not raise bids if campaign is already hitting its daily budget cap — raise the budget cap first.

---

## Troubleshooting Priority Framework

Per Demand Curve's troubleshooting sequence — fix in this order:

1. **Account-level issues first** (budget caps, billing, campaign status)
2. **Campaign-level issues** (broad budget splits, campaign type mix)
3. **Ad group-level issues** (keyword match types, CPT bids)
4. **Keyword-level issues** (individual bid/pause decisions)
5. **ASO issues last** (screenshots, description, ratings — fix these if TTR is red)

---

## Search Term Mining Rules

From the Discovery campaign search term report:

| Condition | Action |
|-----------|--------|
| ≥ 5 installs, term not in keyword list | Add as exact match keyword (Brand or Generic campaign) |
| ≥ 10 taps + 0 installs | Add as negative keyword (Discovery campaign) |
| High spend + 🔴 CPI + no installs | Add as negative keyword immediately |
| Strong performer matching brand name | Move to Brand campaign as exact match |

---

## Default Benchmarks (Runo App — Starting Reference)

These are the Runo-specific defaults used when no project config exists. Always override with actual config values.

| Metric | Runo Default |
|--------|-------------|
| CAC Target | $4.70 |
| Max CPI | $1.57 (= $4.70 ÷ 3) |
| Currency | USD |
| ROAS Target | 300% |

These numbers should be validated against the project's actual unit economics before use.
