# Google Ads — Campaign Setup

Campaign structure checklists for Search, Performance Max, and Shopping campaigns. Covers account structure, bid strategy selection, budget allocation, targeting settings, and conversion tracking.

Source: `google-search-ads/02-introduction-search-ads.md`, `google-search-ads/11-google-ads-targeting-and-structuring.md`, `google-search-ads/12-google-ads-audiences.md`, `google-search-ads/13-project-launch.md`, `google-search-ads/17-search-ads-advanced-campaign-structure-examples.md`, `google-performance-max-ads/01-introduction-performance-max.md`, `google-performance-max-ads/02-performance-max-account-structure.md`, `google-shopping-ads/01-introduction-shopping-ads.md`, `google-shopping-ads/02-shopping-ads-campaign-structure.md`

---

## Campaign Launch Order

Per Demand Curve: Follow this progression. Do NOT skip to PMax or Shopping without proving Search viability first.

```
1. Search Ads (Brand + High Intent)
   └─ Prove profitability. Get 30+ conversions/month.

2. Search Ads (Generic + Competitor)
   └─ Expand keyword coverage. Scale winning intent tiers.

3. Performance Max (optional — only after proven Search)
   └─ Requires: >$5k/mo budget AND substantial conversion data
   └─ AI needs data to optimize. A fresh account with $100/day isn't enough.

4. Shopping Ads (ecommerce only)
   └─ Requires: Google Merchant Center product feed
   └─ Can launch alongside Search for ecommerce businesses.
```

---

## Search Campaign Setup Checklist

### Account-Level Settings

- [ ] **Conversion tracking**: Google Ads conversion tag OR Google Analytics 4 import. Verify conversions are firing correctly before spending.
- [ ] **Auto-tagging**: Enabled (links Google Ads clicks to GA4 sessions)
- [ ] **IP exclusions**: Add your office IP(s) to prevent self-clicking
- [ ] **Link Google Ads to GA4**: Settings > Linked accounts > Google Analytics

### Campaign-Level Settings

For each Search campaign:

- [ ] **Campaign name**: Descriptive format: `[Business] - [Type] - [Intent]`
  - Example: `Acme CRM - Search - Brand`, `Acme CRM - Search - High Intent`
- [ ] **Network**: Search Network ONLY. Uncheck "Include Google search partners" and "Display Network" (these waste budget for Search campaigns)
- [ ] **Locations**: Target specific countries/regions. Use "Presence" not "Presence or Interest" (avoids targeting people just searching about a location)
- [ ] **Languages**: Match your target audience language(s)
- [ ] **Bid strategy**: See Bid Strategy Selection below
- [ ] **Daily budget**: See Budget Allocation below
- [ ] **Ad schedule**: Start 24/7. After 2 weeks of data, consider dayparting based on conversion patterns
- [ ] **Ad rotation**: "Optimize" (let Google show best-performing ads more)
- [ ] **Audience segments**: Add audiences as OBSERVATION (not targeting) to collect data without restricting reach

### Bid Strategy Selection

| Situation | Recommended Strategy | Why |
|-----------|---------------------|-----|
| New campaign, < 30 conv/mo | Manual CPC or Maximize Clicks (with cap) | Not enough data for Smart Bidding |
| 30+ conv/mo, have CPA target | Target CPA | Algorithm has enough data to optimize |
| 50+ conv/mo, revenue tracking | Target ROAS | Most sophisticated optimization |
| Budget-constrained, want max volume | Maximize Conversions (with CPA cap) | Gets most conversions within budget |
| Discovery phase | Maximize Clicks ($X max CPC cap) | Gather click/keyword data quickly |

> Per Demand Curve: Start conservative. Manual CPC or Maximize Clicks for the first 2-4 weeks to gather data. Then switch to Target CPA once you have 30+ conversions in a 30-day period.

**Smart Bidding ramp-up rule**: When switching to Target CPA, set the initial target 20% above your actual CPA. Let the algorithm learn, then gradually tighten the target by 5-10% per week.

### Budget Allocation

| Campaign Type | Budget Priority | Typical Split |
|---------------|----------------|--------------|
| Brand | Must-fund | 10-15% of budget (low CPC, high conversion) |
| High Intent | Primary | 40-50% of budget |
| Generic | Secondary | 20-30% of budget |
| Competitor | Test | 10-15% of budget (often expensive, test ROI) |

**Minimum viable daily budget**: $20-30/day per campaign for Search. Below this, data accrues too slowly for optimization.

**Budget scaling rule**: Only increase budget on campaigns where CPA is at or below target. Increase by 20-30% increments, not 2x overnight (Smart Bidding needs time to adjust).

---

## Ad Group Setup

### Structure Rules

1. **5-15 keywords per ad group** — tightly themed
2. **One clear intent per ad group** — all keywords should match the same ad copy
3. **One primary landing page per ad group** — the page that best matches the keyword intent
4. **2-3 responsive search ads per ad group** — Google needs variants to test

### Ad Group Naming Convention

```
[Keyword Theme] - [Match Type]
```
Examples:
- `CRM Pricing - Exact`
- `Best CRM Software - Phrase`
- `CRM Tools - Broad`

---

## Performance Max Campaign Setup

**Prerequisites** (do NOT launch PMax without these):
- [ ] At least $5,000/month budget (or $166/day)
- [ ] 30+ conversions/month on Search campaigns already
- [ ] Conversion tracking verified and stable
- [ ] Strong creative assets ready (images, videos, headlines, descriptions)

### PMax Settings Checklist

- [ ] **Campaign name**: `[Business] - PMax - [Goal]`
- [ ] **Bidding**: Maximize Conversions (with Target CPA) or Maximize Conversion Value (with Target ROAS)
- [ ] **Budget**: At least $50-100/day (PMax needs budget to test across surfaces)
- [ ] **Final URL expansion**: DISABLE for most businesses (prevents Google from sending traffic to random pages). Enable only if you have many product pages with consistent conversion paths.
- [ ] **Location & Language**: Same as Search campaigns
- [ ] **Brand exclusions**: Add competitor brands you don't want to appear for

### Asset Group Setup

Each PMax campaign needs at least one Asset Group with:

| Asset Type | Minimum | Recommended | Specs |
|------------|---------|-------------|-------|
| Headlines | 3 | 5-8 | Max 30 chars each. Include brand, benefit, CTA. |
| Long headlines | 1 | 3-5 | Max 90 chars. More descriptive. |
| Descriptions | 2 | 4-5 | Max 90 chars. Complement headlines. |
| Images (landscape) | 1 | 3-5 | 1200x628px (1.91:1 ratio) |
| Images (square) | 1 | 3-5 | 1200x1200px (1:1 ratio) |
| Images (portrait) | 0 | 2-3 | 960x1200px (4:5 ratio) |
| Logo (landscape) | 1 | 1 | 1200x300px (4:1 ratio) |
| Logo (square) | 1 | 1 | 1200x1200px (1:1 ratio) |
| Videos | 0 | 1-3 | YouTube URLs. At least 10 seconds. |
| Business name | 1 | 1 | Your brand name |
| Final URL | 1 | 1 | Main conversion landing page |
| Call to action | 1 | 1 | LEARN_MORE, SIGN_UP, GET_QUOTE, SHOP_NOW, etc. |

> Per Demand Curve: Google grades each asset as BEST, GOOD, LOW, or LEARNING. Replace LOW-performing assets with new variants. Aim for all assets at GOOD or BEST.

### PMax Audience Signals

Audience signals are SUGGESTIONS, not hard targeting. PMax will expand beyond them, but they help the algorithm start in the right direction.

Types of audience signals to add:
1. **Custom segments**: Keywords your ideal customer searches for
2. **Your data**: Customer lists, website visitors, converters
3. **Interests & demographics**: In-market audiences, affinity audiences

---

## Shopping Campaign Setup (Ecommerce Only)

### Prerequisites

- [ ] **Google Merchant Center account** set up and verified
- [ ] **Product feed** uploaded and approved (all products active, no disapprovals)
- [ ] **Product data quality**: Titles optimized with keywords, high-quality images, accurate pricing
- [ ] Google Ads linked to Merchant Center

### Shopping Campaign Structure

| Campaign | Products | Priority | Bid Level |
|----------|---------|----------|-----------|
| Brand Shopping | Products that match brand-name queries | High | Medium (brand queries are cheaper) |
| Generic Shopping | All products (catch-all) | Low | Low-Medium |
| Top Performers | Best-selling / highest-margin products | High | Highest |

### Shopping Settings Checklist

- [ ] **Campaign name**: `[Business] - Shopping - [Segment]`
- [ ] **Bidding**: Start with Manual CPC or Maximize Clicks, switch to Target ROAS after 50+ conversions/month
- [ ] **Product groups**: Subdivide by category, brand, product type, or custom labels
- [ ] **Negative keywords**: Add non-commercial queries (how to, diy, free, review)
- [ ] **Merchant Center feed**: Update daily (price, availability)
- [ ] **Product titles**: Include primary keyword (e.g., "Men's Running Shoes - Nike Air Max 90 - Black/White")

### Product Feed Optimization

| Field | Optimization |
|-------|-------------|
| Title | Include keyword + brand + key attribute (color, size, material). Max 150 chars. |
| Description | Natural language with keywords. First 160 chars most important. |
| Images | White background, high resolution, no watermarks. Multiple angles. |
| Price | Keep competitive. Google shows price in the ad. |
| GTIN/MPN | Required for branded products. Improves matching. |
| Product type | Use Google's taxonomy for accurate categorization. |
| Custom labels | Use for margin tiers, seasonality, promotion status. |

---

## Conversion Tracking Setup

### Must-Have Before Any Campaign Launch

- [ ] **Primary conversion action**: Define what counts as a conversion (purchase, lead, trial signup)
- [ ] **Google Ads conversion tag**: Install on thank-you/confirmation page
- [ ] **Test the conversion**: Complete a test conversion and verify it shows in Google Ads (may take 1-3 hours)
- [ ] **Conversion value**: Set if tracking revenue (ecommerce: dynamic value from purchase; lead gen: estimated value per lead)
- [ ] **Conversion window**: 30 days for most businesses (90 days for B2B with long sales cycles)
- [ ] **Attribution model**: Data-driven (default) or Last-click for simple setups

### Enhanced Conversions

- [ ] Enable Enhanced Conversions in Google Ads settings
- [ ] Sends hashed first-party data (email, phone) to improve conversion tracking accuracy
- [ ] Especially important as cookies phase out

### GA4 Integration

- [ ] Link Google Ads to GA4
- [ ] Import GA4 conversions into Google Ads (alternative to Google Ads conversion tag)
- [ ] Verify data matches between platforms (some discrepancy is normal)

---

## UTM Tagging

Source: `google-search-ads/09-project-utm-tags.md`

### Required UTM Parameters

```
?utm_source=google
&utm_medium=cpc
&utm_campaign={campaign_name}
&utm_content={ad_group_name}
&utm_term={keyword}
```

Google auto-tags with `gclid` when auto-tagging is enabled. UTMs provide backup tracking and cross-platform attribution.

### URL Encoding

Source: `google-search-ads/16-search-ads-url-encoding.md`

Ensure Final URLs are properly encoded:
- Spaces: `%20` or `+`
- Special characters: URL-encode per RFC 3986
- Test all Final URLs in Google's URL checker before launch

---

## Audience Targeting

Source: `google-search-ads/12-google-ads-audiences.md`

### Audience Layers for Search

Add audiences as **OBSERVATION** (not targeting) to collect performance data by audience segment without restricting who sees your ads.

| Audience Type | What It Is | How to Use |
|---------------|-----------|-----------|
| In-market | People actively researching your category | Add as observation. Bid higher on converting segments. |
| Custom intent | People who searched for specific keywords | Add as observation. Test bid adjustments. |
| Remarketing | People who visited your site | Add as targeting in separate campaign. Higher bids (they already know you). |
| Customer match | Your existing customer emails | Exclude from acquisition campaigns. Use for upsell campaigns. |
| Similar audiences | Lookalikes of your converters | Add as observation to Search. Use as signals in PMax. |

### Remarketing Lists for Search Ads (RLSA)

Create a separate campaign or ad group for remarketing:
- Target: Website visitors (last 30-90 days) who didn't convert
- Bid adjustment: +50-100% (they're warmer, worth paying more)
- Ad copy: Different messaging that acknowledges they've visited before
- Landing page: Can be more aggressive (skip intro, go straight to offer)

---

## Launch Checklist (Final Pre-Flight)

Before activating any campaign:

- [ ] Conversion tracking verified (test conversion recorded)
- [ ] All ads approved (no disapprovals)
- [ ] Landing pages load fast (< 3s), are mobile-friendly, and match ad promise
- [ ] Negative keyword lists applied
- [ ] Budget set and billing active
- [ ] Ad schedule set (or 24/7 if starting fresh)
- [ ] Audiences added as observation
- [ ] UTM parameters tested
- [ ] IP exclusions set (office IPs)
- [ ] Brand campaign live (always protect your brand name)
- [ ] Change tracker CSV created
- [ ] Weekly performance CSV created
