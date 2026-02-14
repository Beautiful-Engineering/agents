# Ongoing Optimization

Monthly 8-step audit checklist, GSC data templates, content freshness protocol, competitor tracking, and quarterly deep dive additions.

Source: `seo-fundamentals/09-seo-roadmap.md`, `seo-build-your-foundation/01-seo-basics.md`, `seo-fundamentals/13-project-conduct-a-basic-seo-audit.md`

---

## Monthly Audit — 8-Step Checklist

Run this each month after the Baseline Audit is complete.

### Step 1: Traffic Overview (GSC / GA)

Pull 30-day data and compare to prior 30 days:

| Metric | This Period | Prior Period | Change |
|--------|------------|-------------|--------|
| Total clicks | | | |
| Total impressions | | | |
| Average CTR | | | |
| Average position | | | |

**Interpret trends**:
- Upward slope → SEO efforts working
- Steady decrease → competitors ranking higher, content aging
- Sudden decrease → possible Google algorithm update (check Google news for core updates)

### Step 2: Top Queries & Pages

| Top 10 Queries | Clicks | Impressions | CTR | Position |
|---------------|--------|-------------|-----|----------|

| Top 10 Pages | Clicks | Impressions | CTR | Position |
|-------------|--------|-------------|-----|----------|

Flag any pages or queries that dropped significantly from prior period.

### Step 3: Quick Wins Refresh

Find pages ranking positions 4-20 with high impressions but low CTR:

1. Filter GSC: position 4-20, sort by impressions descending
2. Identify pages with CTR below average
3. Rewrite title tags to be more compelling (add numbers, brackets, power words)
4. Rewrite meta descriptions with stronger CTA
5. Add FAQ schema if missing

**Additional quick wins**:
- Pages with high impressions but position 11-20 → improve content depth + add internal links
- Pages with high pages/session → add more CTAs (they're engaging but not converting)
- Pages with >50% exit rate → add strategic CTAs and internal links

### Step 4: Technical Health Check

Run Ahrefs site audit (`mcp__ahrefs__site-audit-page-explorer`) and check:

| Issue Type | Count | Change from Last |
|-----------|-------|-----------------|
| Critical errors (4xx/5xx) | | |
| Broken redirects | | |
| Missing title tags | | |
| Duplicate titles/metas | | |
| Missing alt text | | |
| Slow pages (>3s) | | |
| Redirect chains | | |

Also check:
- New 404 pages (via GSC Coverage report)
- Core Web Vitals changes (PageSpeed Insights API)
- New mobile usability issues

### Step 5: Content Review

**Declining pages** (dropping in clicks/impressions):
- Identify pages with >20% click decline month-over-month
- Check if competitors published better content
- Refresh: add new information, update stats, improve examples

**Stale content** (>12 months without update):
- Flag all pages not updated in 12+ months
- Prioritize by traffic (high-traffic stale pages first)
- Actions: update information, add new links/images/video, rewrite outdated sections

**Thin content** (<300 words, low engagement):
- Consolidate into better existing pages, or
- Expand to comprehensive coverage, or
- Consider removing (301 redirect to related page)

### Step 6: Keyword Performance

Update `seo/keywords.md`:

| Action | Details |
|--------|---------|
| Position improvements | Keywords that moved up — what's working |
| Position drops | Keywords that moved down — investigate why |
| New opportunities | Keywords appearing in GSC that weren't targeted |
| Content gaps filled | Keywords with new content published — track progress |

### Step 7: Competitor Movement

Check via Ahrefs:
- Competitor DR changes (up/down?)
- New competing content for your target keywords
- Competitor backlink acquisitions (new referring domains)
- New competitors appearing in your SERPs

### Step 8: Action Items

Categorize and prioritize all findings:

| Priority | Action | Page/Keyword | Expected Impact |
|----------|--------|-------------|----------------|
| **Critical** | [fix immediately] | | |
| **High** | [fix this week] | | |
| **Medium** | [fix this month] | | |
| **Low** | [backlog] | | |

---

## Quarterly Deep Dive Additions

Every 3 months, add these to the monthly audit:

### Full backlink audit
- Check for new toxic/spammy links
- Update DR and referring domain count
- Compare to competitor DR trajectory
- Review link building campaign effectiveness

### Content audit
- Review ALL content pages (not just top performers)
- Identify consolidation opportunities (similar/overlapping content)
- Refresh content calendar based on new keyword data
- Evaluate content types performing best (guides vs listicles vs comparisons)

### Site architecture review
- Check for new orphan pages
- Verify internal link structure is healthy
- Review URL hierarchy for new sections/pages
- Ensure new pages follow established patterns

### Conversion analysis
- SEO traffic → conversion rate by page
- Which keywords drive converting traffic vs. bouncing traffic
- Landing page optimization opportunities
- Funnel drop-off points for organic visitors

---

## User Behavior Audit (GA Data)

When GA data is available, add these checks:

**Pages/Session**:
- Sort pages by pages/session
- Low performers: improve content, add CTAs, add internal links, add "Recommended" section

**Average Time on Page**:
- Filter: pages with >300 unique pageviews only
- Low time-on-page: rewrite intro/title/meta, embed video/audio, add interactive elements

**Exit Percentage**:
- Flag pages with >50% exit rate
- Add strategic CTAs and internal links to reduce exits

---

## Ongoing Content Freshness Protocol

| Content Age | Action |
|------------|--------|
| 0-6 months | No action needed unless declining |
| 6-12 months | Light review — check stats are current, links work |
| 12-18 months | Moderate refresh — update examples, add new insights, refresh intro |
| 18+ months | Full rewrite consideration — may need complete overhaul |

**Update priority**: High traffic × old content = highest priority refresh

---

## Deliverable Template

```markdown
# SEO Audit — [Site URL]
Date: [YYYY-MM-DD]
Period: [start date] to [end date]
Previous audit: [date]

## Executive Summary
- [1-2 sentence overall health assessment]
- Key wins: [list]
- Key concerns: [list]

## Traffic Performance (30d vs prior 30d)
| Metric | This Period | Prior Period | Change |
|--------|------------|-------------|--------|
| Clicks | | | |
| Impressions | | | |
| CTR | | | |
| Avg Position | | | |

## Top 10 Queries
[Table]

## Top 10 Pages
[Table]

## Quick Wins Identified
1. [Page] — [action] — est. [X] additional clicks/month
2. ...

## Technical Health
| Issue | Count | Change | Status |
|-------|-------|--------|--------|
[Ahrefs audit results]

## Content Health
- Declining pages: [list]
- Stale content (>12mo): [list]
- Thin content: [list]

## Keyword Movement
- Improved: [list with position changes]
- Declined: [list with position changes]
- New opportunities: [list]

## Competitor Check
[Summary of competitor movements]

## Action Items
### Critical
1. ...
### High
1. ...
### Medium
1. ...

## Keywords Updated
[Note what was updated in seo/keywords.md]

## Next Audit: [date — 30 days out]
```
