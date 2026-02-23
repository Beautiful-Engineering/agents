# Google Ads — Analysis Framework

Keyword classification decision tree, search term mining rules, recommendation prioritization logic, and CSV formatting templates.

---

## Keyword Classification Decision Tree

Apply these rules in priority order. A keyword gets the first rule that matches.

### Classification Table

| Priority | Pattern | Classification | Action |
|----------|---------|----------------|--------|
| 1 | CPA > 3x target after 5+ conversions | PAUSE | Pause immediately — enough data to decide |
| 2 | 50+ clicks with 0 conversions | PAUSE | Enough traffic to conclude — not converting |
| 3 | Spending > 2x CPA target but < 30 clicks | WATCH | Needs more data before deciding |
| 4 | CPA 1.5-2x target after 5+ conversions | LOWER BID | Tighten Target CPA or reduce max CPC 20-30% |
| 5 | CPA <= 1x target AND impression share < 30% | SCALE | Increase budget or raise bids — being throttled |
| 6 | Quality Score < 5 after 1000+ impressions | QS ISSUE | Fix landing page and/or ad relevance |
| 7 | CTR below threshold after 1000+ impressions | AD COPY ISSUE | Test new headlines and descriptions |
| 8 | CPA <= 1x target AND impression share adequate | MAINTAIN | All metrics within acceptable range |

### Classification Scoring Function (pseudocode)

```python
def classify_keyword(kw, config):
    cpa          = kw["cost_per_conversion"]
    target_cpa   = config["target_cpa"]
    conversions  = kw["conversions"]
    clicks       = kw["clicks"]
    impressions  = kw["impressions"]
    ctr          = kw["ctr"]
    quality_score = kw.get("quality_score")
    impression_share = kw.get("search_impression_share")
    campaign_type = kw["campaign_type"]  # SEARCH, PMAX, SHOPPING

    cpa_ratio = cpa / target_cpa if target_cpa > 0 and conversions > 0 else None

    # Priority 1: Expensive with enough data
    if cpa_ratio and cpa_ratio > 3 and conversions >= 5:
        return "PAUSE", f"CPA ${cpa:.2f} ({cpa_ratio:.1f}x target) after {conversions} conversions"

    # Priority 2: High traffic, zero conversions
    if clicks >= 50 and conversions == 0:
        return "PAUSE", f"{clicks} clicks with 0 conversions — not converting"

    # Priority 3: Spending but insufficient data
    cost = kw["cost"]
    if cost > target_cpa * 2 and clicks < 30:
        return "WATCH", f"Spent ${cost:.2f} (2x+ CPA target) but only {clicks} clicks — needs data"

    # Priority 4: Moderately expensive
    if cpa_ratio and 1.5 <= cpa_ratio <= 2 and conversions >= 5:
        return "LOWER_BID", f"CPA ${cpa:.2f} ({cpa_ratio:.1f}x target) — reduce bid 20-30%"

    # Priority 5: Good CPA but throttled
    if cpa_ratio and cpa_ratio <= 1 and impression_share and impression_share < 0.30:
        return "SCALE", f"CPA ${cpa:.2f} (good) but only {impression_share:.0%} impression share"

    # Priority 6: Quality Score issue
    if quality_score and quality_score < 5 and impressions >= 1000:
        return "QS_ISSUE", f"Quality Score {quality_score}/10 after {impressions} impressions"

    # Priority 7: CTR issue
    ctr_threshold = get_ctr_threshold(campaign_type, kw.get("intent_tier"))
    if ctr and ctr < ctr_threshold and impressions >= 1000:
        return "AD_COPY_ISSUE", f"CTR {ctr:.1%} below {ctr_threshold:.1%} threshold"

    # Priority 8: Everything looks good
    return "MAINTAIN", "Metrics within acceptable range"
```

---

## Search Term Mining Rules

Applied to the search terms report from broad match keywords and PMax campaigns.

### Add as Keyword (Exact Match)

Conditions (ALL must be true):
- `conversions >= 3`
- CPA at or below target
- Term is not already in the active keyword list
- Term is relevant to the business (not a brand misspelling or tangential query)

Action: Add to the most relevant ad group as EXACT match. Set initial bid to match the campaign's median keyword CPC.

### Add as Negative Keyword

Conditions (ANY triggers this):
- `clicks >= 20 AND conversions == 0`
- `cost > (target_cpa * 2) AND conversions == 0`
- Term is clearly irrelevant (competitor brand, wrong product category, unrelated service)

Action: Add as negative keyword. Use EXACT match for specific terms, PHRASE match for patterns.

Negative keyword match type guidance:
- **Exact**: Block one specific query (e.g., `[free crm]`)
- **Phrase**: Block a pattern (e.g., `"free"` blocks any query containing "free")
- **Broad** (negative only): Block queries containing all words in any order

### Flag for Review

Conditions:
- `conversions >= 1 AND conversions < 3` — promising but insufficient data
- High volume term with borderline CPA — user decision needed
- Competitor brand term with good metrics — discuss strategy implications

---

## Recommendation Prioritization

### Priority Tiers

**IMMEDIATE** (present first, action required this week):
1. Pause keywords with CPA > 3x target after 5+ conversions
2. Pause keywords with 50+ clicks and 0 conversions
3. Add high-converting search terms as exact match keywords
4. Add zero-conversion search terms as negative keywords (wasted spend)
5. Fix any campaign errors (disapproved ads, billing issues, $0 spend when expected)

**THIS WEEK** (important but not emergency):
6. Increase budget on campaigns with CPA <= target AND lost impression share to budget > 20%
7. Lower bids on keywords with CPA 1.5-2x target
8. Scale keywords with good CPA but low impression share
9. Fix Quality Score issues (QS < 5) on high-volume keywords
10. Test new ad copy on keywords with low CTR

**MONITOR** (note and track, no immediate action):
11. Keywords in WATCH status (need more data)
12. PMax asset performance labels (swap LOW performers with new creative)
13. Week-over-week CPA and ROAS trends
14. Impression share trends (improving or declining?)

### Recommendation Format

Each recommendation must include:
- **Keyword or campaign name** (exact string)
- **Metric that triggered it** (e.g., "CPA $85.40, 1.7x your $50 target")
- **Specific action** (pause / lower Target CPA to $X / add as negative / add as exact match)
- **Curriculum principle cited** (e.g., "Per Demand Curve: after 50+ clicks with zero conversions, the keyword has proven it doesn't convert for your offer")

Example:
```
IMMEDIATE: Pause keyword "project management software free" in [Campaign]
  CPA: N/A (47 clicks, 0 conversions, $156 spent)
  Per Demand Curve: 50+ clicks with zero conversions is sufficient data to conclude
  this keyword doesn't convert. Add "free" as a phrase-match negative.
```

---

## CSV Tracking Templates

### weekly-performance.csv

Primary tracking file. One row per campaign per week, with color-coded metrics.

**Headers:**
```csv
Week,Campaign,Type,Spend,Impressions,Clicks,Conversions,Conv Value,CTR,CPC,CPA,ROAS,Conv Rate,Impr Share,QS Avg,Rating
```

**Color coding rules** (read benchmarks from config.md):
- Apply emoji indicators based on project-specific thresholds
- For CTR: Add emoji after percentage (e.g., "3.5% Green")
- For CPA: Add emoji after dollar (e.g., "$45.20 Green")
- For QS: Add emoji after number (e.g., "7.2 Green")
- For Impr Share: Add emoji (e.g., "65% Yellow")

**Example row:**
```csv
Feb 10-23,Brand - Search,SEARCH,$234.50,12500,875,42,$4200,7.0% Green,$0.27,Green,$5.58 Green,1791% Green,4.8% Green,92% Green,8.5 Green,Green
```

### change-tracker.csv

Audit log of all changes made during optimization sessions.

**Headers:**
```csv
Date,Campaign,Action,Item,Old Value,New Value,Reason,Curriculum Ref
```

**Example rows:**
```csv
2024-02-15,Generic - Search,Pause Keyword,project management free,ACTIVE,PAUSED,47 clicks 0 conv — non-converting,DC: 50+ clicks 0 conv = pause
2024-02-15,Generic - Search,Add Negative,free,—,PHRASE,Pattern: free queries never convert,DC: negative keyword hygiene
2024-02-15,Brand - Search,Increase Budget,$50/day,$75/day,Lost 28% impr share to budget with Green CPA,DC: scale when CPA is good
```

### weekly-log.csv

Legacy format for historical analysis and backward compatibility.

**Headers:**
```csv
Date,Week,Campaign,Type,Spend,Impressions,Clicks,Conversions,CTR,Conv Rate,CPA,ROAS,Impr Share,Rating,Actions,Notes
```

---

## .progress.md Template

```markdown
# Google Ads Progress

- Business: [Business Name]
- Mode: [New Campaign / Optimize]
- Last Run: YYYY-MM-DD
- Weeks Logged: N

## Current Status
- Phase: [0-Orientation | 1-Strategy | 2-Structure | 3-Copy | 4-Launch | 5-PMax]
- Blended CPA: $X.XX
- Blended ROAS: X%
- Campaigns analyzed: N

## Completed Phases
- [x] Phase 0 — Orientation (completed YYYY-MM-DD)
- [ ] Phase 1 — Account Strategy & Keywords (in progress)

## Key Context
- Business type: [Ecommerce / SaaS / Lead Gen]
- Target CPA: $X
- Monthly budget: $X,XXX
- Active campaigns: N

## History Summary

| Week | Spend | Conversions | Blended CPA | ROAS |
|------|-------|-------------|-------------|------|
| [auto-filled from weekly-performance.csv] |
```

---

## Minimum Data Thresholds

Do not make optimization recommendations on keywords with insufficient data:

| Decision | Minimum Required |
|----------|-----------------|
| Pause keyword | 5 conversions at bad CPA, OR 50 clicks with 0 conversions |
| Lower bid | 5 conversions |
| Raise bid | 3 conversions (or 14 days of data) |
| Scale (increase budget) | 10 conversions |
| Quality Score optimization | 1000 impressions |

Keywords with less data than threshold -> classify as "Watch" and note the data requirement.

---

## Formatting the Action List for Output

The final action list must be:
1. **Numbered** — user can tick them off in order
2. **Specific** — exact keyword text, exact campaign name, exact amounts
3. **Justified** — one-line reason citing the metric
4. **Copy-paste ready** — nothing vague like "consider adjusting"

Example output format:
```markdown
### Priority Action List — Week of 2024-02-15

IMMEDIATE
1. Pause "project management software free" in Generic Search — 47 clicks, 0 conversions, $156 spent
2. Add "best crm for startups" as exact match in Generic Search — 5 conversions at $32 CPA from search terms
3. Add "free" as phrase-match negative in Generic Search — pattern: 0 conversions across 8 "free" queries

THIS WEEK
4. Increase daily budget on Brand Search from $50 to $75 — CPA $5.58 (Green), losing 28% impression share to budget
5. Lower Target CPA on Generic Search from $55 to $45 — current CPA $82 (1.6x target) after 12 conversions

MONITOR
6. PMax campaign "All Products" has 3 LOW-performing image assets — replace with new creative
7. "crm software comparison" keyword in Generic Search — 2 conversions at $48 CPA, needs more data
```
