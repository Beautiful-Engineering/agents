# Off-Page SEO & Link Building

Backlink audit, DR baseline, 3 link categories (owned/acquired/organic), pitch tracking templates, and monthly link building action plan.

Source: `seo-fundamentals/06-off-page-seo.md`, `07-owned-link-building-activities.md`, `08-acquired-link-building-activities.md`, `15-project-guest-post-haro-pitch-tracker.md`

---

## Backlink Profile Baseline

### Metrics to capture (via Ahrefs `mcp__ahrefs__doc`)

| Metric | Value | Benchmark |
|--------|-------|-----------|
| Domain Rating (DR) | | |
| Total backlinks | | |
| Referring domains | | |
| Dofollow links | | |
| Nofollow links | | |
| Referring IPs | | |
| Toxic/spammy links | | |

### Competitor comparison

| Site | DR | Referring Domains | Top Link Source |
|------|----|-----------------|--------------------|
| Your site | | | |
| Competitor 1 | | | |
| Competitor 2 | | | |
| Competitor 3 | | | |

---

## Link Quality Assessment

**What matters most** (in order):
1. Topical relevance (relevant site > high-DR unrelated site)
2. Domain authority (DR/DA score)
3. Link placement (body content > footer/sidebar)
4. Dofollow vs nofollow (dofollow passes more equity)
5. Anchor text relevance

**Low-quality links**: Google generally recognizes and discounts spammy links automatically. Only use Google Disavow tool if you have a significant negative SEO attack (masses of spammy links outnumbering quality ones).

**Note**: 20-40% of top-ranking content's backlinks are nofollow — they still have value for traffic and brand visibility.

---

## Link Building Strategy: 3 Categories

### Category 1: Owned Links (Easy — Do First)

Links from channels/accounts you control. Limited equity (often nofollow) but valuable for legitimacy and referral traffic.

**Directory & review site checklist**:
- [ ] Capterra
- [ ] Clutch
- [ ] Crunchbase
- [ ] G2
- [ ] Glassdoor
- [ ] SaaSHub
- [ ] StackShare
- [ ] Trustpilot
- [ ] TrustRadius

**Process**: Create company profile → complete all details → add link to site
**Find more**: Google `[product name] "reviews"` to discover additional relevant directories

**Forum presence checklist**:
- [ ] Reddit (relevant subreddits — engage genuinely, link contextually)
- [ ] Quora (answer relevant questions with expertise)
- [ ] Hacker News (share valuable content, not promotional)
- [ ] Indie Hackers (build relationships, share journey)

**Forum rules**: Read guidelines first. Engage meaningfully. Don't over-promote. Be upfront about affiliation. Link contextually, not in every post.

---

### Category 2: Acquired Links (Moderate-Hard — Strategic Investment)

Links built through deliberate effort. Better equity than owned links.

#### Guest Posting

**Finding opportunities**:
- Google: `[industry] "guest post"`
- Google: `[industry] "write for us"`
- Google: `[industry] "contributor guidelines"`
- Google: `[industry] "writing guidelines"`

**Qualification**: Check DR with Ahrefs — aim for DR > 50

**Pitch tips**:
- Include writing samples and SEO data from past posts
- Research target site (mention topics they haven't covered)
- Be personalized (not generic template)
- Include 2-3 proposed article titles

**Efficiency**: Leverage existing relationships first. Write guest posts on topics from your existing guides (reuse research). Outsource writing to skilled freelancers if needed.

#### HARO (Help a Reporter Out)

**Setup**:
1. Sign up at helpareporter.com (or helpaB2Bwriter.com for B2B)
2. Set topic preferences (relevant industries)
3. Receive regular emails with journalist queries

**Response best practices**:
- Choose queries you're truly qualified to answer
- Write detailed, novel responses (not obvious answers)
- Format clearly (bullet points, bold emphasis)
- Include brief bio/credibility statement (keep short)
- Bulk of response answers the query (not salesy)
- Set Google Alert for name + company to track mentions

#### Cold Outreach Strategies

**Skyscraper technique**:
1. Find popular content on target topic
2. Create a significantly better version
3. Reach out to sites linking to the inferior version
4. Suggest your content as a better resource

**Broken link building**:
1. Enter competitor URLs in Ahrefs → Best by Links
2. Filter HTTP code for "404 not found"
3. Find pages linking to those broken URLs
4. Reach out offering your content as replacement

**Value-based outreach**:
- Offer resources to webmasters (templates, data, tools)
- No explicit link request (no strings attached)
- Include multiple reasons why linking makes sense

#### Search Ads for Link Building (Advanced)

1. Target keywords with LOW purchase intent (cheaper)
2. Direct ads to non-salesy content (roundups, statistics, guides)
3. Run campaign 1-3 months
4. Check backlinks with Ahrefs after campaign ends
5. If $500 spend = 4 links earned → $125/link (cheaper than many link builders)

---

### Category 3: Organic Links (Earned Naturally)

Out of your direct control. Focus on creating link-worthy content:
- Original research and data
- Comprehensive guides
- Unique tools or calculators
- Industry reports
- Infographics and visual content

---

## Pitch Tracking Templates

### Guest Post Tracker

| Website | URL | DR | Contact Email | Guidelines URL | Date | Status | Published URL | Notes |
|---------|-----|----|--------------|--------------------|------|--------|-------------|-------|

**Status options**: Pitched → Follow-up #1 → Follow-up #2 → Pitch Approved → Submitted → Changes Needed → Published → Rejected → No Response

### HARO Tracker

| Outlet | Subject | Reporter | Date Sent | Date Published | Published URL |
|--------|---------|----------|-----------|---------------|-------------|

---

## Monthly Link Building Action Plan

### Week 1: Owned links
- Create/update 3 directory profiles
- Write 2 meaningful forum contributions

### Week 2: Guest posting
- Research 5 guest post opportunities (DR > 50)
- Send 3 pitches
- Follow up on previous pitches

### Week 3: HARO + outreach
- Respond to 3 HARO queries
- Run broken link building for 2 competitor URLs
- Send 2 value-based outreach emails

### Week 4: Measurement + planning
- Check Ahrefs for new backlinks acquired
- Update DR and referring domain count
- Review pitch tracker statuses
- Plan next month's priorities

---

## Deliverable Template (Phase 4 — Measurement & Off-Page section)

```markdown
# Measurement & Off-Page Strategy — [Site URL]
Date: [YYYY-MM-DD]

## Analytics Setup
- Google Analytics: [configured/not configured]
- Google Search Console: [configured/not configured]
- GA ↔ GSC linked: [yes/no]
- Conversion goals: [list]

## Baseline Metrics
| Metric | Value | Date |
|--------|-------|------|
| Total clicks (30d) | | |
| Total impressions (30d) | | |
| Average position | | |
| Indexed pages | | |
| Top 5 queries | | |

## Backlink Profile
| Metric | Value |
|--------|-------|
| Domain Rating | |
| Referring domains | |
| Total backlinks | |
| Dofollow / Nofollow | / |

## Competitor Backlink Comparison
[Table comparing DR, referring domains, top sources]

## Link Building Strategy
### Owned (Week 1-2)
- Directories to create profiles on: [list]
- Forums to engage in: [list]

### Acquired (Ongoing)
- Guest post targets: [list with DR]
- HARO topics to monitor: [list]
- Outreach angles: [list]

## Final Scorecard

| Category | Score | Key Issues |
|----------|-------|-----------|
| Technical Foundation | [R/Y/G] | |
| On-Page SEO | [R/Y/G] | |
| Content & Keywords | [R/Y/G] | |
| Measurement & Off-Page | [R/Y/G] | |

## Next Review: [date — 30 days out]
```
