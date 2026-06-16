# Google Ads — Ad Copy Frameworks

RSA (Responsive Search Ad) copy guidelines, ad asset creation, PMax creative strategy, and testing methodology.

Source: `google-search-ads/07-search-ads-copy.md`, `google-search-ads/08-project-ad-assets.md`, `google-search-ads/10-project-search-ads-copy.md`, `google-performance-max-ads/03-how-to-create-quality-display-ads.md`, `google-performance-max-ads/04-how-to-create-great-video-ads.md`

---

## Responsive Search Ads (RSA)

### RSA Structure

Each RSA allows:
- **Up to 15 headlines** (30 chars each) — Google tests combinations
- **Up to 4 descriptions** (90 chars each) — Google tests combinations
- Google's AI selects the best combo for each auction

### Headline Framework (15 Headlines)

Write headlines in these categories to ensure good coverage:

| Category | Count | Purpose | Examples |
|----------|-------|---------|---------|
| **Keyword-matching** | 3-4 | Include the exact keyword/phrase | "CRM Software for Startups", "Best CRM Platform" |
| **Benefit-driven** | 3-4 | What the user gets | "Close Deals 2x Faster", "Never Lose a Lead Again" |
| **Social proof** | 2-3 | Trust signals | "Trusted by 10,000+ Teams", "4.8 Stars on G2" |
| **CTA** | 2-3 | Drive action | "Start Free Trial Today", "Get a Demo in 5 Min" |
| **Brand** | 1-2 | Brand recognition | "Acme CRM", "Acme - Sales Platform" |
| **Differentiator** | 1-2 | What makes you unique | "No Credit Card Required", "AI-Powered Pipeline" |

### Headline Writing Rules

1. **Include the keyword** in at least 2-3 headlines (improves Quality Score)
2. **Front-load the benefit** — most important word first
3. **Use numbers** when possible ("2x Faster", "10,000+ Teams", "5-Min Setup")
4. **Avoid repetition** — each headline should say something different
5. **Pin sparingly** — only pin headlines 1 and 2 if you need brand/keyword to always show. Let Google test the rest.
6. **Capitalize properly** — Title Case for headlines

### Description Framework (4 Descriptions)

| Description | Focus | Example (90 chars) |
|-------------|-------|---------------------|
| Description 1 | Core value prop + CTA | "Manage your entire sales pipeline in one place. Start your free trial today." |
| Description 2 | Feature highlight | "Built-in email, phone, and chat. Automate follow-ups and never miss a deal." |
| Description 3 | Social proof + urgency | "Join 10,000+ sales teams already using Acme. Plans start at $29/month." |
| Description 4 | Objection handling | "No credit card required. Set up in 5 minutes. Cancel anytime." |

### Description Writing Rules

1. **End with a CTA** — "Try it free", "Get started today", "Book a demo"
2. **Include the keyword** in at least 1 description
3. **Use specific numbers** — "$29/month" not "affordable pricing"
4. **Address the #1 objection** — whatever holds people back from clicking
5. **Don't repeat headlines** — descriptions should ADD information

---

## Ad Assets (Extensions)

### Must-Have Assets

| Asset Type | What It Is | Impact |
|------------|-----------|--------|
| **Sitelinks** | Extra links below your ad (4-6 recommended) | +10-15% CTR improvement |
| **Callout extensions** | Short benefit phrases (25 chars each, 4+ recommended) | Highlights key differentiators |
| **Structured snippets** | Category: values (e.g., "Types: CRM, Sales, Pipeline") | Adds context about your offering |
| **Call extension** | Phone number | Essential for local/service businesses |

### Sitelink Strategy

Create sitelinks that match different user intents:

| Sitelink | URL | Why |
|----------|-----|-----|
| "Pricing & Plans" | /pricing | High-intent users want to see cost |
| "Free Trial" / "Demo" | /trial or /demo | Low-friction conversion action |
| "Features" | /features | Feature-shoppers comparing options |
| "Case Studies" | /customers | Social proof seekers |
| "About Us" / "Why [Brand]" | /about | Trust-building |
| "Contact Sales" | /contact | Ready-to-buy users |

### Callout Extension Examples

```
Free Setup
24/7 Support
No Long-Term Contract
SOC 2 Compliant
AI-Powered
30-Day Money Back
Used by 10,000+ Teams
5-Star Rated
```

---

## Ad Copy by Campaign Type

### Brand Campaign Copy

- Use the brand name prominently in headlines
- Focus on CTAs and offers (users already know you)
- Highlight current promotions or new features
- Defensive positioning: ensure competitors don't win your brand traffic

**Example Headlines:**
```
Acme CRM - Official Site
Try Acme CRM Free Today
Acme CRM Plans from $29/mo
The CRM Built for Sales Teams
```

### High Intent Campaign Copy

- Mirror the exact keyword in headline 1
- Lead with the strongest benefit
- Include pricing or offer details (qualifies clicks)
- Strong CTA matching the intent (demo, trial, buy)

**Example for "CRM software pricing":**
```
Headlines:
- CRM Software Plans & Pricing
- Acme CRM Starting at $29/Mo
- Compare Our CRM Plans
- Start Free - No Credit Card

Descriptions:
- See transparent pricing for all Acme CRM plans. Start free, upgrade anytime. No contracts.
- From solo users to enterprise teams. Every plan includes email, phone, and pipeline management.
```

### Generic / Comparison Campaign Copy

- Address the category, not just your brand
- Position against alternatives without naming them
- Use social proof heavily
- Softer CTA (learn more, compare)

**Example for "best CRM for startups":**
```
Headlines:
- #1 Rated CRM for Startups
- The CRM Startups Love
- Built for Fast-Moving Teams
- Trusted by 10,000+ Startups

Descriptions:
- Rated #1 CRM for startups on G2. Set up in 5 minutes, not 5 months. Start your free trial.
- Most CRMs are built for enterprises. Acme is built for teams that move fast. Try it free.
```

### Competitor Campaign Copy

- Don't name the competitor in ad copy (policy violation risk)
- Focus on your differentiators
- Address common complaints about the competitor category
- Use "Compare" and "Alternative" language

**Example for competitor targeting:**
```
Headlines:
- Looking for a Better CRM?
- The Modern CRM Alternative
- Switch in Under 5 Minutes
- Free Migration Assistance

Descriptions:
- Tired of clunky CRM software? Acme is simpler, faster, and half the price. Free migration included.
```

---

## Performance Max Creative

### Display Ad Creative Guidelines

Source: `google-performance-max-ads/03-how-to-create-quality-display-ads.md`

| Principle | Guideline |
|-----------|----------|
| **Simplicity** | One message per creative. Don't cram features. |
| **Brand consistency** | Logo visible, brand colors, consistent visual style |
| **Clear CTA** | Button-style CTA visible in the creative |
| **Mobile-first** | Design for small screens first, then adapt to large |
| **Text overlay** | Minimal text on images (Google penalizes text-heavy images) |
| **High contrast** | CTA and key text should pop against the background |

### Image Asset Best Practices

| Size | Use | Tips |
|------|-----|------|
| 1200x628 (landscape) | Display, Discover, Gmail | Hero image + logo + CTA overlay |
| 1200x1200 (square) | Social placements, Display | Product shot or lifestyle image |
| 960x1200 (portrait) | Mobile placements | Vertical layout, benefit + CTA |

### Video Ad Guidelines

Source: `google-performance-max-ads/04-how-to-create-great-video-ads.md`

| Element | Guideline |
|---------|----------|
| **Hook** | First 5 seconds must grab attention (the "skip" threshold) |
| **Length** | 15-30 seconds for PMax. 6-15 seconds for bumper ads. |
| **Structure** | Hook -> Problem -> Solution -> CTA |
| **Audio** | Assume sound-off for Display. Design for sound-on for YouTube. |
| **CTA** | Verbal + visual CTA. Repeat at the end. |
| **Branding** | Show brand within first 5 seconds and at the end. |

---

## Ad Copy Testing Methodology

### What to Test

Test in this priority order (highest impact first):

1. **Headlines** — biggest CTR driver. Test benefit-driven vs. feature-driven vs. social proof
2. **CTA** — "Free Trial" vs. "Get Demo" vs. "Learn More" vs. "Get Started"
3. **Descriptions** — test different value props and objection handling
4. **Landing page** — same ad, different landing pages (biggest conversion rate impact)
5. **Ad assets** — different sitelinks, callouts

### Testing Rules

- **One variable at a time** — don't change headlines AND descriptions simultaneously
- **Minimum 100 clicks per variant** before drawing conclusions
- **Minimum 2 weeks** — account for day-of-week patterns
- **Use Ad Strength as a guide, not a goal** — "Excellent" ad strength doesn't guarantee performance. Test beats theory.
- **Keep winners running** — when adding a new variant, pause the worst performer, not the best

### Ad Strength Ratings

Google rates RSA quality as:
- **Excellent**: All best practices met
- **Good**: Most best practices met
- **Average**: Room for improvement
- **Poor**: Missing critical elements (unique headlines, keyword inclusion, etc.)

> Target: All ads at "Good" or "Excellent". But always validate with actual performance data — a "Good" ad that converts is better than an "Excellent" ad that doesn't.

---

## Copy-to-Landing Page Alignment

### The Promise Match Rule

The ad headline's promise MUST be answered on the landing page above the fold.

| Ad Promise | Landing Page Must Show |
|------------|----------------------|
| "Start Free Trial" | Free trial signup form visible immediately |
| "Plans from $29/mo" | Pricing table or plan comparison visible |
| "Book a Demo" | Demo scheduling form or calendar widget |
| "Get 50% Off" | Discount reflected in pricing / promo banner |

> Per Demand Curve: Mismatched promises kill conversion rates and Quality Score. If the ad says "free trial" but the landing page leads with a demo request, expect a low conversion rate and red Quality Score on landing page experience.

### Landing Page Checklist for Google Ads

- [ ] Headline matches ad promise (above the fold)
- [ ] Primary CTA matches ad CTA (if ad says "Free Trial", page CTA says "Start Free Trial")
- [ ] Page loads in < 3 seconds (Google penalizes slow pages)
- [ ] Mobile-responsive (Google uses mobile-first indexing)
- [ ] No interstitials or popups that block content
- [ ] Trust signals present (reviews, logos, security badges)
- [ ] Form is simple (minimal fields — name, email, done)
