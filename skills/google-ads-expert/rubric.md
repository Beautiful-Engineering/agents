# Google Ads — Performance Scoring Rubric

Scoring thresholds for campaign-level and keyword-level metrics. These are defaults based on Google Ads benchmarks and the Demand Curve paid ads curriculum. Each project overrides these via `google-ads/config.md`.

Source: Demand Curve Google Search Ads curriculum (`google-search-ads/06-quality-score-bids-and-bid-strategies.md`, `google-search-ads/14-project-prepare-to-optimize-google-ads.md`, `google-search-ads/15-project-optimize-google-ads.md`)

---

## CPA Threshold Formula

**Always use the project's CPA target from `google-ads/config.md`.**

Default formula if not set in config:
```
Target CPA = target CAC for the channel
```
Example: If the business target CAC is $50, the Google Ads CPA target might be $50 (or lower if other channels are more expensive).

| CPA vs Target | Score |
|---------------|-------|
| <= 1x target | Green |
| 1-2x target | Yellow |
| > 2x target | Red |
| > 3x target after 5+ conversions | Red — pause candidate |

---

## ROAS Threshold Formula

**Only applicable when conversion value tracking is configured.**

| ROAS vs Target | Score |
|----------------|-------|
| >= target | Green |
| 50-100% of target | Yellow |
| < 50% of target | Red |

Default ROAS targets if not set in config:
- Ecommerce: 400% (4:1 return)
- Lead gen: 300% (3:1 return)
- SaaS: 500% (5:1 return, accounting for LTV)

---

## CTR (Click-Through Rate) Thresholds

CTR varies by keyword intent. High-intent branded keywords should have much higher CTR than generic informational queries.

### Search Campaigns

| Intent Tier | Green | Yellow | Red |
|-------------|-------|--------|-----|
| Brand (own brand name) | >= 15% | 8-15% | < 8% |
| High Intent (buy, pricing, demo, trial) | >= 5% | 2-5% | < 2% |
| Medium Intent (comparison, review, best) | >= 3% | 1.5-3% | < 1.5% |
| Low Intent (what is, how to, guide) | >= 2% | 1-2% | < 1% |

### Performance Max Campaigns

PMax CTR is blended across surfaces (Search, Display, YouTube, Discover). Thresholds are lower than pure Search.

| Metric | Green | Yellow | Red |
|--------|-------|--------|-----|
| CTR (blended) | >= 2% | 1-2% | < 1% |

### Shopping Campaigns

| Metric | Green | Yellow | Red |
|--------|-------|--------|-----|
| CTR | >= 1.5% | 0.8-1.5% | < 0.8% |

---

## Quality Score Thresholds

Quality Score (1-10) is Google's rating of keyword + ad + landing page relevance. Directly impacts CPC and ad position.

| Quality Score | Score | Implication |
|---------------|-------|------------|
| 7-10 | Green | Good — ads are relevant and competitive |
| 5-6 | Yellow | Needs attention — review ad relevance and landing page |
| 1-4 | Red | Critical — high CPCs, poor placement. Fix immediately |

Quality Score sub-components to diagnose:
- **Expected CTR**: Ad copy relevance to query
- **Ad Relevance**: Keyword-to-ad alignment
- **Landing Page Experience**: Page speed, relevance, mobile-friendliness

| Sub-component | Green | Yellow | Red |
|---------------|-------|--------|-----|
| Expected CTR | Above Average | Average | Below Average |
| Ad Relevance | Above Average | Average | Below Average |
| Landing Page Experience | Above Average | Average | Below Average |

---

## Conversion Rate Thresholds

Conversion rate = conversions / clicks. Varies significantly by industry and offer.

| Business Type | Green | Yellow | Red |
|---------------|-------|--------|-----|
| Ecommerce (purchase) | >= 3% | 1-3% | < 1% |
| SaaS (trial/signup) | >= 5% | 2-5% | < 2% |
| Lead Gen (form fill) | >= 8% | 3-8% | < 3% |
| B2B (demo request) | >= 3% | 1-3% | < 1% |

> Note: These are defaults. Always override with the project's actual historical conversion rate when available.

---

## Impression Share Thresholds

Impression share = your impressions / total eligible impressions. Indicates headroom for growth.

| Campaign Type | Green | Yellow | Red |
|---------------|-------|--------|-----|
| Brand | >= 90% | 70-90% | < 70% |
| High Intent Generic | >= 60% | 30-60% | < 30% |
| Broad Generic | >= 30% | 15-30% | < 15% |

Lost impression share breakdown:
- **Lost to budget**: Campaign is running out of daily budget — increase budget
- **Lost to rank**: Bids or Quality Score too low — improve ad relevance or raise bids

---

## Search Terms Report Thresholds

For search term mining from broad match and PMax:

| Condition | Action |
|-----------|--------|
| 3+ conversions at acceptable CPA | Add as exact match keyword |
| 20+ clicks with 0 conversions | Add as negative keyword |
| High spend (> 2x CPA target) with 0 conversions | Add as negative keyword immediately |
| Irrelevant query pattern | Add as negative keyword (phrase or exact match) |

---

## Overall Campaign Rating

| Rating | Criteria |
|--------|---------|
| Green | CPA green AND conversion rate green AND QS 7+ on majority of keywords |
| Yellow | CPA yellow OR conversion rate yellow, no metric in red |
| Red | CPA red OR conversion rate red OR QS < 5 on majority of keywords |

---

## Bid Strategy Assessment

| Strategy | When to Use | Warning Signs |
|----------|-------------|---------------|
| Manual CPC | New campaigns, small budgets, learning phase | Spending time micromanaging bids |
| Target CPA | 30+ conversions/month, stable CPA target | CPA fluctuating wildly, conversion volume dropping |
| Target ROAS | Revenue tracking active, 50+ conversions/month | ROAS target too aggressive (volume drops to near zero) |
| Maximize Conversions | Budget-constrained, want max volume | CPA creeping up without budget cap |
| Maximize Clicks | Discovery phase, building keyword data | High spend with no conversions |

> Per Demand Curve: Start with Manual CPC or Maximize Clicks to gather data. Switch to Target CPA after 30+ conversions/month. Only use Target ROAS when revenue tracking is solid.

---

## Default Benchmarks (Starting Reference)

These are cross-industry medians. Always override with actual project data.

| Metric | Default |
|--------|---------|
| Target CPA | $50 (adjust per business) |
| ROAS Target | 400% |
| CTR (Search, blended) | 3.5% |
| Conversion Rate | 4% |
| Quality Score | 7 |
| Impression Share (Brand) | 90% |

These numbers should be validated against the project's actual unit economics before use.
