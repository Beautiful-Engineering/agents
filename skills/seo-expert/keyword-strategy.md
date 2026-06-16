# Keyword Strategy

4-phase keyword research workflow, topic clustering, gap analysis, topical authority mapping, and content calendar planning.

Source: `seo-fundamentals/10-project-keyword-research.md`, `seo-fundamentals/11-project-editorial-seo-research.md`, `content-marketing-fundamentals/04-editorial-seo.md`

---

## SEO Viability Filters (Pre-Check)

Before investing in content/SEO, confirm the business fits:

1. Can you afford to wait 6+ months for results?
2. Do you have access to unique data, insights, research, or expertise?
3. Do you have a broader content marketing strategy?
4. Do you solve defined problems people search for?
5. Do you solve the same problem for many groups/categories? (programmatic SEO opportunity)

**High viability**: Fintech, real estate, SaaS with clear use cases, e-commerce, education, health/wellness
**Low viability**: Highly innovative products solving unknown needs, niche hobbies with tiny search volumes

---

## Phase 1: Generate Keywords (Brainstorm)

Three methods to generate seed keywords:

### Method 1: Off-the-dome
List words and phrases your target audience would type when searching for solutions to their problem. Think like the customer, not the marketer.

### Method 2: Value props (Story System integration)
If `growth/03-story-system.md` exists, extract:
- Value propositions → keyword seeds
- Customer problems → question-based keywords ("how to...", "best way to...")
- Hooks → long-tail keyword ideas

### Method 3: Autocomplete mining
1. Type seed phrases into Google
2. Document all autocomplete suggestions
3. Check "People also ask" boxes
4. Check "Related searches" at bottom of SERP

**Target**: 30-50 seed keywords from this phase.

---

## Phase 2: Collect Keyword Data

**MUST call `mcp__ahrefs__doc`** for each seed keyword to pull real data. Do NOT guess or use general knowledge for volumes/difficulty.

**Tool call**: `mcp__ahrefs__doc` — query each seed keyword or batch of keywords to get:
- **Search volume** (monthly)
- **Keyword difficulty** (KD score)
- **CPC** (indicates commercial intent — higher CPC = more valuable)
- **Current ranking** (if the user's site already ranks for it)

Present results as a table to the user before proceeding.

**Selection filters** (apply to Ahrefs data):
- Volume: 50-5,000 (sweet spot for non-massive sites)
- Difficulty: < 80 KD (lower = easier to rank)
- Relevance: High (directly related to product/service)
- Intent: Could reasonably direct users to the business

---

## Phase 3: Keyword Expansion

**All expansion requires actual Ahrefs MCP calls. Do not skip.**

### Matching terms
**Call `mcp__ahrefs__doc`** with top seed keywords to pull matching terms — shorter, more curated list.

### Related terms
**Call `mcp__ahrefs__doc`** with top seed keywords to pull related terms — larger list, less curated.

### Competitor URL mining
**Call `mcp__ahrefs__doc`** for each competitor domain (from `growth/06-acquisition-strategy.md`):
1. Pull their organic keywords
2. Filter by volume 50-5000 and KD <80
3. Identify keywords they rank for that the user doesn't
4. Present to user for relevance check

### Community mining
- Enter Reddit/Quora URLs into keyword tools
- Use "Subfolder" filter to narrow to relevant subreddits/topics
- Extract question-based keywords from discussions

### Search suggestions
- Google autocomplete expanded suggestions
- "People also ask" questions
- "Related searches" at bottom of SERPs

**Target**: 100-250 keywords after expansion.

---

## Phase 4: Group Keywords (Clustering)

Organize keywords into topic clusters for content planning.

### Cluster Classification

| Type | Definition | Per Cluster |
|------|-----------|-------------|
| **Primary** | Highest search volume phrasing for a topic | ONE per cluster |
| **Secondary** | Same intent, lower volume phrasing | Multiple |
| **Tertiary** | Same overarching intent, more specific/nuanced | Multiple |
| **Needs research** | One-off topics requiring validation | Flag for later |

### Example Cluster

**Topic: Photo editing on iPhone**
- Primary: "how to edit photos on iphone" (4,600/mo)
- Secondary: "how to edit photos on iphone to look professional" (400/mo)
- Tertiary: "how to make photos look vintage in photoshop" (specific)

One piece of content can address all keywords in a cluster.

### Spreadsheet Columns

| Keyword | Volume | KD | Type | Page/Slug | Assigned URL | Current Position | Notes |
|---------|--------|----|------|-----------|-------------|-----------------|-------|

---

## Content Gap Analysis

**MUST use Ahrefs MCP for this section. Do not skip.**

### Process
1. Get top 3 competitors from `growth/06-acquisition-strategy.md`
2. **Call `mcp__ahrefs__doc`** for each competitor domain to pull their organic keywords
3. Compare against user's current keyword rankings (also from `mcp__ahrefs__doc`)
4. Identify keywords competitors rank for that the user doesn't
5. Filter by viability criteria (volume 50-5000, KD <80, high relevance)
6. Present gaps to user as a ranked table
7. Add user-approved gaps to keyword spreadsheet

### Prioritization
Rank gaps by: `(Volume × Relevance) / Difficulty`

---

## Topical Authority Map

Build 3-5 core topic clusters to establish authority depth.

### Structure per cluster
```
Pillar Topic: [Broad topic you want to own]
├── Pillar Page: [Comprehensive guide — targets primary keyword]
├── Supporting Article 1: [Specific subtopic — targets secondary keyword]
├── Supporting Article 2: [Related question — targets long-tail]
├── Supporting Article 3: [How-to guide — targets informational query]
└── Supporting Article 4: [Comparison/review — targets commercial query]
```

### Rules
- Start narrow — cover one topic deeply before expanding
- Every supporting article links back to the pillar page
- Pillar page links to all supporting articles
- Cover all angles: what, why, how, who, when, comparison, mistakes, tools
- Demonstrate expertise through depth, not breadth

---

## Search Intent Framework

Classify each keyword by intent before assigning content type:

| Intent | Example | Content Type |
|--------|---------|-------------|
| **Informational** | "What is meal planning" | Blog post, guide |
| **Commercial investigation** | "Best meal planning apps" | Comparison, review |
| **Transactional** | "Buy meal planning app" | Product/landing page |
| **Navigational** | "MealMaster app" | Homepage/brand page |

**Prioritize**: Informational + Commercial Investigation for new sites.

---

## Content Calendar Template

After clustering and gap analysis, prioritize first 8 topics:

| Priority | Topic Cluster | Primary Keyword | Volume | KD | Content Type | Target URL | Deadline | Status |
|----------|--------------|----------------|--------|----|-------------|-----------|----------|--------|
| 1 | | | | | | | | |
| 2 | | | | | | | | |
| ... | | | | | | | | |

### Prioritization criteria
1. **Low difficulty + high volume** = quick wins (do first)
2. **High relevance + medium difficulty** = strategic investments
3. **High volume + high difficulty** = long-term plays (need topical authority first)

---

## Seven Tactics for Editorial SEO Success

1. Use keyword research to guide content creation (not gut feeling)
2. Choose keywords based on relevance and intent (not just volume)
3. Categorize keyword data into topic clusters
4. Target a mix: high + low volume, high + low difficulty
5. Establish editorial consistency (brand voice, quality, publishing schedule)
6. Optimize content for user experience (scanability, examples, specificity)
7. Focus on content depth first — narrow scope, become authority before expanding

**Publishing rule**: Never sacrifice quality for frequency. Excellent content published monthly > mediocre content published weekly.

---

## `seo/keywords.md` — Living Keyword Document

Create and maintain this file across all SEO sessions:

```markdown
# Keywords — [Site Name]
Last updated: [YYYY-MM-DD]

## Topic Clusters

### Cluster 1: [Topic Name]
| Keyword | Volume | KD | Type | Assigned Page | Position | Status |
|---------|--------|----|------|--------------|----------|--------|
| [keyword] | [vol] | [kd] | Primary | [url/slug] | [pos] | [published/planned/writing] |

### Cluster 2: [Topic Name]
...

## Content Gap Priorities
| Keyword | Volume | KD | Competitor Ranking | Priority |
|---------|--------|----|-------------------|----------|

## Performance Tracking
| Keyword | Position (start) | Position (current) | Change | Clicks (30d) |
|---------|-----------------|-------------------|--------|-------------|

## New Opportunities (discovered in audits)
| Keyword | Volume | KD | Source | Date Found |
|---------|--------|----|--------|-----------|
```

---

## Deliverable Template

```markdown
# Content & Keyword Strategy — [Site URL]
Date: [YYYY-MM-DD]

## Existing Content Performance
- Total indexed pages: [X]
- Top performing pages: [list with clicks]
- Declining pages: [list]
- Thin content pages (<300 words): [list]

## Keyword Research Summary
- Total keywords researched: [X]
- Keywords by type: [X] Primary, [X] Secondary, [X] Tertiary
- Average difficulty: [X]
- Volume range: [X] - [X]

## Topic Clusters
[3-5 clusters with pillar + supporting articles mapped]

## Content Gap Analysis
- Competitors analyzed: [list]
- High-priority gaps found: [X]
- Top 5 gap opportunities: [list]

## Content Calendar (Next 8 Topics)
[Table with priorities, deadlines, content types]

## What's Next
Phase 4: Measurement & Off-Page — we'll set up tracking, audit your backlink profile, and build a link strategy.
```
