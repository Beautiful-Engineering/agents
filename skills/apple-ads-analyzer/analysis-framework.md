# Apple Search Ads — Analysis Framework

Keyword classification rules, recommendation prioritization logic, search term mining rules, and CSV formatting templates.

---

## Keyword Classification Rules

Apply these rules in order. A keyword gets the first rule that matches.

### Classification Table

| Priority | Pattern | Classification | Action |
|----------|---------|----------------|--------|
| 1 | CPI > 3× target AND installs ≥ 10 | 🔴 Pause | Pause immediately — enough data to decide |
| 2 | CPI > 3× target AND installs < 10 | 🟡 Watch | Too early to pause — needs more data |
| 3 | CPI > 2× target AND installs ≥ 10 | 🟡 Lower Bid | Decrease bid 20–30% |
| 4 | CPI ≤ 1× target AND impressions < 30% expected | 🟢 Scale | Increase bid 50% — good keyword being throttled |
| 5 | CPI ≤ 1× target AND ROAS ≥ 300% | 🟢 Scale | Increase bid + budget |
| 6 | CPI ≤ 1× target AND impressions adequate | 🟢 Maintain | No action needed |
| 7 | High impressions + TTR < threshold | 📸 ASO Issue | Fix screenshots/icon, not keyword bid |
| 8 | ROAS < 100% AND Revenue/Install < CAC AND installs ≥ 10 | 🔴 Pause | Not paying back even with LTV |
| 9 | High spend + 🔴 CPI + 🟢 Revenue/Install | 🟡 Optimize | Keep keyword — high LTV users; lower bid 10-15% |
| 10 | Impressions = 0 AND status = ACTIVE | 🔴 Investigate | Keyword rejected or below min bid |

### Classification Scoring Function (pseudocode)

```python
def classify_keyword(kw, config):
    cpi         = kw["avg_cpa"]
    target_cpi  = config["max_cpi"]
    installs    = kw["installs"]
    impressions = kw["impressions"]
    ttr         = kw["ttr"]
    roas        = kw.get("roas")           # None if no revenue data
    rev_install = kw.get("revenue_per_install")
    campaign_type = kw["campaign_type"]

    cpi_ratio = cpi / target_cpi if target_cpi > 0 else None

    if cpi_ratio and cpi_ratio > 3 and installs >= 10:
        return "PAUSE", "CPI {:.0%}× target after {} installs".format(cpi_ratio, installs)

    if cpi_ratio and cpi_ratio > 3 and installs < 10:
        return "WATCH", "CPI {:.0%}× target, only {} installs — needs data".format(cpi_ratio, installs)

    if cpi_ratio and cpi_ratio > 2 and installs >= 10:
        return "LOWER_BID", "CPI {:.0%}× target — lower bid 20-30%".format(cpi_ratio)

    expected_impressions = get_expected_impressions(campaign_type)
    if cpi_ratio and cpi_ratio <= 1 and impressions < expected_impressions * 0.3:
        return "SCALE", "Good CPI, only {}% impression share — raise bid 50%".format(
            int(impressions / expected_impressions * 100))

    if roas and roas >= 300 and cpi_ratio and cpi_ratio <= 1:
        return "SCALE", "ROAS {}% with good CPI — scale budget and bid".format(int(roas))

    if impressions > 1000 and ttr < get_ttr_threshold(campaign_type):
        return "ASO_ISSUE", "Low TTR {:.1%} — fix screenshots, not bid".format(ttr)

    return "MAINTAIN", "Metrics within acceptable range"
```

---

## Search Term Mining Rules

Applied to the Discovery campaign's search term report.

### Add as Exact Match Keyword

Conditions (ALL must be true):
- `installs >= 5`
- Term is not already in any active keyword list (across all campaigns)
- Term is not a competitor brand name (check against config competitor list if available)

Action: Add to the most relevant campaign (Brand if matches app/brand name, Generic otherwise) as EXACT match. Suggested initial bid: match the campaign's median keyword bid.

### Add as Negative Keyword (Discovery Campaign)

Conditions (ANY triggers this):
- `taps >= 10 AND installs == 0`
- `spend > (target_cpi * 2) AND installs == 0`
- Term is clearly irrelevant to the product (junk traffic)

Action: Add as exact match negative to the Discovery campaign's ad group.

### Flag for Review (Neither Add nor Block)

Conditions:
- `installs >= 2 AND installs < 5` — promising but not enough data yet
- Competitor brand name with good CPI — user decision: add to Competitor campaign?

---

## Recommendation Prioritization

### Priority Tiers

**🔴 IMMEDIATE** (present first, action required this week):
1. Pause keywords with CPI > 3× target after 10+ installs
2. Add high-performing search terms as exact match keywords
3. Add zero-install search terms as negative keywords (wasted spend)
4. Fix any campaign that is completely off (status error, $0 spend when expected)

**🟡 THIS WEEK** (important but not emergency):
5. Increase bids on Scale candidates (good CPI, low impressions)
6. Decrease bids on keywords with CPI 1.5–2× target
7. Investigate keywords with 0 impressions (likely below min bid or rejected)

**📊 MONITOR** (note and track, no immediate action):
8. Campaigns with red TTR (ASO issue — flag for product team)
9. Keywords with borderline CPI that need more installs before deciding
10. ROAS trends week-over-week

### Recommendation Format

Each recommendation must include:
- **Keyword or campaign name** (exact string, not "the keyword")
- **Metric that triggered it** (e.g., "CPI $2.34, 1.5× your $1.57 target")
- **Specific action** (pause / raise bid to $X / add as exact match / add as negative)
- **Curriculum principle cited** (e.g., "Per Demand Curve: pause after 10 installs at 3× CPI")

Example:
```
🔴 Pause keyword "running training plan" in Runo - Generic
   CPI $4.82 (3.1× your $1.57 target) after 14 installs.
   Per Demand Curve: once a keyword has 10+ installs at 3× CPI, there's enough data to call it uneconomic.
```

---

## CSV Row Formatting

### weekly-log.csv Headers

```
Date,Week,Campaign,Spend,Impressions,Taps,Installs,TTR,CR,CPI,Revenue,ROAS,Rev_per_Install,Rating,Actions,Notes
```

### Row Format

```python
def format_csv_row(campaign_data, date_str, week_str, rating, actions, notes=""):
    spend   = campaign_data.get("spend", 0)
    impr    = campaign_data.get("impressions", 0)
    taps    = campaign_data.get("taps", 0)
    inst    = campaign_data.get("installs", 0)
    ttr     = campaign_data.get("ttr", 0)      # float e.g. 0.032 = 3.2%
    cr      = campaign_data.get("cr", 0)        # float e.g. 0.52 = 52%
    cpi     = campaign_data.get("avg_cpa", 0)
    revenue = campaign_data.get("rc_revenue", "")
    roas    = campaign_data.get("roas", "")     # percent e.g. 310.5
    rpi     = campaign_data.get("revenue_per_install", "")

    return {
        "Date": date_str,                                   # e.g. "2024-01-15"
        "Week": week_str,                                   # e.g. "2024-W03"
        "Campaign": campaign_data["campaign_name"],
        "Spend": f"${spend:.2f}",
        "Impressions": impr,
        "Taps": taps,
        "Installs": inst,
        "TTR": f"{ttr:.2%}",                               # e.g. "3.20%"
        "CR": f"{cr:.2%}",                                  # e.g. "52.00%"
        "CPI": f"${cpi:.2f}",
        "Revenue": f"${revenue:.2f}" if revenue != "" else "",
        "ROAS": f"{roas:.0f}%" if roas != "" else "",
        "Rev_per_Install": f"${rpi:.2f}" if rpi != "" else "",
        "Rating": rating,                                    # 🟢 / 🟡 / 🔴
        "Actions": actions,                                  # semicolon-separated
        "Notes": notes,
    }
```

### TOTAL Row

Append a summary row after all campaign rows:
```
{date},{week},TOTAL,{total_spend},{total_impressions},{total_taps},{total_installs},
{blended_ttr},{blended_cr},{blended_cpi},{total_revenue},{overall_roas},{avg_rpi},
{overall_rating},,{summary_note}
```

Blended metrics:
- TTR = total taps ÷ total impressions
- CR = total installs ÷ total taps
- CPI = total spend ÷ total installs
- ROAS = total revenue ÷ total spend × 100

---

## .progress.md Template

```markdown
# Apple Ads Progress

- App: [App Name]
- Last Run: YYYY-MM-DD
- Weeks Logged: N
- Phase: [0-Orientation | 1-DataPull | 2-Scoring | 3-Recommendations | 4-Logged | 5-Complete]

## Recent Performance (last run)

- Blended CPI: $X.XX
- Blended ROAS: X%
- Top action taken: [description]
- Campaigns analyzed: N

## History Summary

| Week | Spend | Installs | Blended CPI | ROAS |
|------|-------|----------|-------------|------|
| [auto-filled from weekly-log.csv] |
```

---

## Week Number Helper

```python
from datetime import date

def get_week_string(d=None):
    if d is None:
        d = date.today()
    return d.strftime("%Y-W%V")   # ISO week number e.g. "2024-W03"
```

---

## Minimum Data Thresholds

Do not make bid recommendations on keywords with insufficient data:

| Decision | Minimum Installs Required |
|----------|--------------------------|
| Pause keyword | 10 installs |
| Lower bid | 10 installs |
| Raise bid | 5 installs (or 7 days of data) |
| Scale (increase budget) | 20 installs |
| Revenue/Install assessment | 5 installs with RC attribution |

Keyword with fewer installs than threshold → classify as "Watch" and note data requirement.

---

## Formatting the Action List for Output

The final action list must be:
1. **Numbered** (not bulleted) — user can tick them off in order
2. **Specific** — exact keyword text, exact campaign name, exact amount to change
3. **Justified** — one-line reason citing the metric
4. **Copy-paste ready** — nothing vague like "consider adjusting"

Example output format:
```markdown
### Priority Action List — Week of 2024-01-15

🔴 IMMEDIATE
1. Pause "interval running training" in Runo - Generic — CPI $4.82 (3.1× target) after 14 installs
2. Add "running cadence app" as exact match in Runo - Generic — 8 installs at $0.89 CPI from Discovery
3. Add "free metronome" as negative keyword in Runo - Discovery — 23 taps, 0 installs

🟡 THIS WEEK
4. Raise bid on "cadence training" in Runo - Brand from $0.50 → $0.75 — 🟢 CPI but only 4,200 impressions (expected 10,000+)
5. Lower bid on "run training plan" in Runo - Generic from $1.20 → $0.90 — CPI $2.15 (1.4× target) after 22 installs

📊 MONITOR
6. Runo - Generic TTR is 1.8% (target ≥ 4%) — likely App Store screenshot issue, not keyword. Flag for ASO review.
```
