# On-Page SEO Checklist

Per-page audit framework (12 items) plus site architecture review and quick wins detection.

Source: `seo-fundamentals/04-on-page-seo.md`, `seo-fundamentals/03-how-to-structure-your-website.md`, `seo-fundamentals/12-project-optimize-blog-content.md`

---

## Site Architecture Review

### Foundational Pages (must-have)

- [ ] Homepage — clear headline (≤10 words), subheadline (who + benefit), problem/solution, social proof, CTA
- [ ] About — founder story, mission, team, values, contact
- [ ] Contact
- [ ] Products/Services overview + individual pages
- [ ] Privacy Policy
- [ ] Terms of Service

### Growth Pages (add as you scale)

- [ ] Individual product/feature pages
- [ ] Use case pages ("For marketing teams," "For small businesses")
- [ ] Industry pages ("For healthcare," "For real estate")
- [ ] FAQ (with FAQ schema markup)
- [ ] Case studies / testimonials
- [ ] Blog (if pursuing content/SEO strategy)

### Architecture Rules

- Logical hierarchy: `example.com/category/subcategory/page`
- Maximum 3 clicks from homepage to any page
- Every page reachable via internal links (no orphans)
- Flat URL structure preferred over deep nesting

---

## Per-Page Audit Checklist (12 Items)

Run this for the top 10-20 pages by traffic or business importance.

### 1. URL Structure

**Rules**:
- Include primary keyword
- Separate words with hyphens (not underscores)
- Lowercase letters only
- Minimize stop words (the, and, or, of, a)
- Keep under 60 characters
- No dates, version numbers, or temporary identifiers

**Good**: `example.com/meal-planning-app-families/`
**Bad**: `example.com/en_US/products/meal/planning/app/26010000003.html`

### 2. Title Tag

**Formula**: `[Primary Keyword] — [Benefit or Modifier] | [Brand]`

**Specifications**:
- 50-60 characters (including spaces) to prevent SERP cut-off
- Include primary keyword, preferably near the beginning
- Compelling and specific (not clickbait)
- Include brand name, usually at end

**Good examples**:
- "How to Learn SEO (and Stay Sane)" (41 chars)
- "Meal Planning App for Busy Families | MealMaster" (49 chars)
- "8 Best Speed Reading Courses to 4x Your WPM" (45 chars)

**Bad examples**:
- "Welcome to Our App | MealMaster" (no keyword)
- "Best Amazing Incredible Meal Planning Recipe App" (keyword stuffing)

### 3. Meta Description

**Formula**: `[Problem/benefit hook]. [What page delivers]. [CTA].`

**Specifications**:
- 150-160 characters (including spaces)
- Include primary keyword naturally
- Acts as an "organic ad" — compelling and action-oriented
- Include CTA: "Learn more," "Get started," "Discover," etc.
- Unique per page (never duplicate across pages)

**Good**: "Plan healthy meals for your family with our easy-to-use app. Generate grocery lists, discover recipes, and save time. Free 7-day trial." (137 chars)
**Bad**: "We are the best meal planning app with amazing features." (vague, no CTA)

### 4. H1 Tag

- One H1 per page (no more, no less)
- Includes primary keyword
- Matches page topic / user intent
- Different from title tag (can be longer/more descriptive)

### 5. Heading Hierarchy

- H1 → H2 → H3 (never skip levels, e.g., H1 → H3)
- Use related keywords naturally in H2s and H3s
- Keep headings descriptive and scannable
- Add every 200-300 words of body content

**Example structure**:
```
H1: Complete Guide to Meal Planning for Busy Families
  H2: What is Meal Planning?
  H2: Benefits of Using a Meal Planning App
    H3: Save Time on Grocery Shopping
    H3: Reduce Food Waste
  H2: How to Start Meal Planning
    H3: Plan Your Weekly Menu
    H3: Create Your Grocery List
```

### 6. Body Content

- Short paragraphs (3-4 sentences max)
- Bullet/numbered lists for scanability
- Specific examples and details (answer "how," not just "what")
- More educational than promotional
- Original contributions (not just paraphrasing competitors)
- E-E-A-T signals: experience, expertise, authoritativeness, trustworthiness

### 7. Images

**File naming** (before upload):
- Good: `meal-planning-app-interface.jpg`
- Bad: `IMG_001.jpg`, `Screenshot 2024-01-15.png`

**Alt text**:
- Concise, descriptive, grammatically correct
- Good: "Meal planning app interface showing weekly menu with healthy recipes"
- Bad: "image" or "photo" or empty

**Optimization**:
- Resize to actual display size (don't upload 4000px for 400px display)
- Compress (TinyPNG or build-tool optimization)
- Use WebP for photos, SVG for logos/graphics
- Lazy load below-fold images

### 8. Internal Links

- 2-3 internal links per 500 words of content
- Descriptive anchor text (not "click here" or generic text)
- Link to both product pages AND helpful content
- Natural placement within content flow
- Find orphan pages (zero incoming internal links) and link to them

### 9. External Links

- Link to authoritative, relevant sources
- Opens in new tab (optional but common UX pattern)
- Don't link to direct competitors
- Enhances content credibility

### 10. Anchor Text

**Good practices**: Accurately describes destination, concise (few words), natural language
**Bad practices**: "Click here," keyword-stuffed, whole sentences, misleading text

### 11. Schema Markup (Structured Data)

**Highest-value schemas to implement**:
- **FAQ**: On FAQ pages AND product/service pages with common questions
- **Product/Offer**: Shows price and availability in SERPs
- **Rating/Review**: Social proof stars in search results
- **Video**: Enables video thumbnail in SERPs
- **Article**: For blog posts (author, date, publisher)

**Tools**: Google Structured Data Markup Helper, TechnicalSEO.com Schema Markup Generator

### 12. Content CTAs

- One CTA in first 200 words
- Repeat throughout longer content
- End with clear next step
- Be specific (not "Learn more" → "Start your free meal plan")

---

## Quick Wins Detection

Use GSC data to find pages ranking positions 5-20 with high impressions but low CTR:

1. Pull GSC data: pages sorted by impressions (descending)
2. Filter: average position between 4-20
3. Sort by: impressions high → CTR low
4. These pages are "almost there" — small title/meta improvements can bump CTR significantly

**Actions for quick wins**:
- Rewrite title tag to be more compelling (add numbers, brackets, power words)
- Rewrite meta description with stronger CTA
- Add FAQ schema (may trigger featured snippet)
- Improve H1 for better relevance signal

---

## Deliverable Template

```markdown
# On-Page SEO Audit — [Site URL]
Date: [YYYY-MM-DD]

## Site Architecture Assessment
- Total pages: [X]
- Orphan pages found: [X]
- Missing foundational pages: [list]
- Architecture score: [R/Y/G]

## Page-by-Page Audit

### [Page URL]
Primary keyword: [keyword]

| Element | Score | Current | Recommendation |
|---------|-------|---------|----------------|
| URL | [R/Y/G] | [current] | [fix] |
| Title Tag | [R/Y/G] | [current] ([X] chars) | [fix] |
| Meta Description | [R/Y/G] | [current] ([X] chars) | [fix] |
| H1 | [R/Y/G] | [current] | [fix] |
| Heading Hierarchy | [R/Y/G] | [structure] | [fix] |
| Images | [R/Y/G] | [X] images, [X] missing alt | [fix] |
| Internal Links | [R/Y/G] | [X] links | [fix] |
| Schema | [R/Y/G] | [type or none] | [fix] |

[Repeat for each page audited]

## Quick Wins (High-Impact, Low-Effort)
1. [Page] — [action] (est. impact: [X] additional clicks/month)
2. ...

## Internal Link Opportunities
- [Source page] → [Target page] (anchor: "[text]")
- ...

## What's Next
Phase 3: Content & Keywords — we'll research keywords, build topic clusters, and create a content calendar.
```
