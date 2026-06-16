# Google Ads — Keyword Strategy

Keyword research methodology, match type strategy, negative keyword management, and keyword organization frameworks for Google Search Ads.

Source: `google-search-ads/04-keywords.md`, `google-search-ads/05-project-keywords.md`, `google-search-ads/06-quality-score-bids-and-bid-strategies.md`

---

## Keyword Research Process

### Step 1: Seed Keyword Generation

Start from the business's value propositions and customer language:

| Source | What to Extract |
|--------|----------------|
| Growth Story System (`growth/03-story-system.md`) | Value props -> keyword phrases |
| Customer interviews | Exact phrases customers use to describe their problem |
| Competitor websites | Terms competitors rank for and bid on |
| Google Search Console | Queries already driving organic traffic |
| SEO keyword data (`seo/keywords.md`) | Validated keyword clusters |
| Support tickets / FAQ | Questions prospects ask before buying |

### Step 2: Keyword Intent Classification

Classify every keyword by purchase intent. This determines campaign structure and bid levels.

| Intent Tier | Signal Words | Example | Bid Priority |
|-------------|-------------|---------|-------------|
| **Tier 1: Buy Now** | buy, pricing, demo, trial, signup, hire, get, order | "crm software pricing" | Highest — these convert |
| **Tier 2: Comparison** | best, vs, compare, review, alternative, top | "best crm for startups" | High — close to purchase |
| **Tier 3: Solution Aware** | software, tool, platform, service, app | "project management software" | Medium — know the category |
| **Tier 4: Problem Aware** | how to, what is, guide, tips, ways to | "how to manage remote team" | Low — early funnel, use for content/PMax |

> Per Demand Curve: Start with Tier 1 and Tier 2 keywords only. Add Tier 3 after proving profitability. Tier 4 is usually better for SEO/content than paid search.

### Step 3: Keyword Volume and Competition Check

For each seed keyword, gather:
- **Monthly search volume** — minimum 50/month for targeted keywords
- **Top-of-page bid estimate** — CPC you'll likely pay
- **Competition level** — HIGH / MEDIUM / LOW
- **Keyword Difficulty** (from SEO tools if available)

Use Google Keyword Planner (free in Google Ads), or pull from SEO Expert's keyword data if available.

### Step 4: Keyword Selection Criteria

Include a keyword if:
- [ ] Monthly volume >= 50 (unless very high-intent niche term)
- [ ] Estimated CPC is within budget tolerance (CPC < 50% of target CPA as rough guide)
- [ ] Intent tier is 1, 2, or 3 (skip tier 4 for Search campaigns)
- [ ] Relevant to the actual product/service (not tangential)
- [ ] Not already covered by a higher-priority keyword in same ad group

Exclude a keyword if:
- [ ] Clearly informational with no purchase intent
- [ ] Estimated CPC would make CPA target impossible
- [ ] Too broad (e.g., single generic words like "software")
- [ ] Already a strong organic position (rank 1-3) and budget is limited

---

## Match Type Strategy

### Modern Match Types (Post-2024)

Per Demand Curve curriculum: Google has simplified match types. The old 4-type system (broad, broad match modifier, phrase, exact) has been consolidated.

| Match Type | How It Works | When to Use |
|------------|-------------|-------------|
| **Exact** | Matches the exact query or very close variants (plurals, misspellings) | High-intent keywords you're confident about. Brand terms. Proven converters from search terms report. |
| **Phrase** | Matches queries that include the meaning of the keyword | Mid-range — captures relevant variations while maintaining intent |
| **Broad** | Matches queries related to the keyword meaning. AI-powered. | Use ONLY with Smart Bidding (Target CPA/ROAS). Broad + manual CPC = wasted spend. |

### Match Type Decision Framework

```
Is the keyword a brand term or proven high-converter?
├─ YES → Use EXACT match
└─ NO  → Are you using Smart Bidding (Target CPA or Target ROAS)?
          ├─ YES → Use BROAD match (let Google's AI find converting queries)
          └─ NO  → Use PHRASE match (safer without Smart Bidding guardrails)
```

> Per Demand Curve: The modern approach is Broad match + Smart Bidding. Google's algorithms are good at finding converting queries when given a CPA or ROAS target. But this requires 30+ conversions/month for the algorithm to learn effectively.

### Match Type by Campaign Maturity

| Stage | Recommended Approach |
|-------|---------------------|
| New campaign (0-30 days) | Exact + Phrase match with Manual CPC. Gather data. |
| Learning (30-60 days) | Switch to Maximize Conversions or Target CPA. Keep Exact + Phrase. |
| Optimized (60+ days, 30+ conv/mo) | Add Broad match keywords with Target CPA. Monitor search terms closely. |
| Scaled | Broad match + Target CPA/ROAS. Exact match for brand protection. |

---

## Negative Keyword Strategy

### Negative Keyword Categories

Build these negative keyword lists before launching:

**1. Universal Negatives** (apply to all non-brand campaigns):
```
free
cheap
free trial (if no free trial exists)
download
torrent
reddit
quora
salary
jobs
career
intern
internship
certification
course (unless selling courses)
tutorial (unless selling education)
DIY
```

**2. Competitor Brand Negatives** (apply to generic campaigns):
```
[competitor name 1]
[competitor name 2]
[competitor name 3]
```
> Only exclude competitors from generic campaigns. You may want a separate competitor campaign that deliberately targets these.

**3. Industry-Specific Negatives**:
Build based on the business. Examples:
- SaaS CRM: "open source", "self hosted", "excel template"
- Ecommerce fashion: "pattern", "sewing", "diy"
- B2B services: "freelance", "fiverr", "upwork"

**4. Search Term Mining Negatives** (added weekly):
From the search terms report, add terms with 20+ clicks and 0 conversions.

### Negative Keyword Match Types

| Negative Match Type | What It Blocks | Example |
|--------------------|---------------|---------|
| Exact `[free crm]` | Only that exact query | Blocks "free crm" but NOT "free crm software" |
| Phrase `"free"` | Any query containing that phrase | Blocks "free crm", "free crm software", "best free crm" |
| Broad `free crm` | Any query containing ALL words (any order) | Blocks "crm free trial", "free crm tools" |

> Best practice: Use PHRASE match for most negatives. Use EXACT only when the phrase is too broad. Use BROAD negatives sparingly — they can accidentally block relevant queries.

---

## Keyword Organization

### Campaign Structure by Intent

| Campaign | Keywords | Bid Level | Budget Priority |
|----------|---------|-----------|----------------|
| Brand | Own brand name + variations | Low (brand CPC is cheap) | Must-have — protect your brand |
| High Intent | Tier 1 keywords (buy, pricing, demo) | Highest | Primary budget allocation |
| Generic | Tier 2-3 keywords (comparison, category) | Medium | Secondary budget |
| Competitor | Competitor brand names | Medium-High | Optional — test ROI first |

### Ad Group Organization

Each ad group should contain:
- 5-15 tightly themed keywords
- Keywords that could all be answered by the same ad copy
- One clear landing page that matches the keyword intent

**Good ad group**: "CRM pricing", "CRM cost", "CRM plans", "how much does CRM cost"
**Bad ad group**: "CRM pricing", "project management tool", "best software for sales"

### Single Keyword Ad Groups (SKAGs)

For your top 5-10 highest-volume, highest-intent keywords, consider creating single keyword ad groups:
- One keyword per ad group (exact match)
- Highly tailored ad copy mentioning the exact keyword
- Dedicated landing page matching the keyword
- Maximizes Quality Score and relevance

> Per Demand Curve: SKAGs are less necessary with modern Google Ads (responsive search ads + AI bidding), but still valuable for your absolute top keywords.

---

## Keyword Expansion Process (Ongoing)

### Weekly: Search Terms Mining
1. Pull the search terms report (last 14 days)
2. Identify terms with 3+ conversions at acceptable CPA -> add as exact match keyword
3. Identify terms with 20+ clicks and 0 conversions -> add as negative
4. Log all changes to `google-ads/change-tracker.csv`

### Monthly: Keyword Research Refresh
1. Check Google Keyword Planner for new keyword suggestions
2. Review SEO Expert's updated keyword data (`seo/keywords.md`)
3. Check competitor keyword changes (new landing pages, new ad copy)
4. Evaluate adding Tier 3 keywords if Tier 1-2 are performing well

### Quarterly: Strategy Review
1. Review keyword intent distribution — are you over-invested in low-intent keywords?
2. Assess negative keyword list — are you blocking too aggressively?
3. Consider match type upgrades (phrase -> broad) if Smart Bidding is performing
4. Evaluate new keyword categories from product changes or market shifts
