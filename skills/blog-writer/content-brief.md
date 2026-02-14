# Content Brief & Research

Research workflow, brief template, outline structure, and idea sourcing frameworks.

Source: `content-marketing-fundamentals/11-sourcing-article-ideas.md`, `content-marketing-fundamentals/04-editorial-seo.md`, `content-marketing-fundamentals/10-how-to-convert-with-content.md`, `seo-fundamentals/10-project-keyword-research.md`

---

## Sourcing Article Ideas

When the user doesn't have a specific topic, use these sources:

1. **SEO keyword data** — Check `seo/keywords.md` for the next priority topic from the content calendar. This is the primary source.
2. **Value props mining** — Extract from `growth/03-story-system.md`. Each value prop can become a blog post angle.
3. **Customer questions** — Ask: "What questions do your customers ask before buying? What objections come up in sales calls?"
4. **Google autocomplete** — Type seed phrases, document suggestions + "People also ask" + "Related searches"
5. **Competitor piggybacking** — Analyze top competitors' most-shared/linked content. Write about the same topics with a unique angle.
6. **Community mining** — Reddit, Quora, forums. Find questions with many upvotes but unsatisfying answers.
7. **Google Trends** — Check trending keywords in the industry for timely content.
8. **Repackage content** — Find content from aggregators (Reddit, Product Hunt, Hacker News) that went under the radar due to poor title/writing. Rewrite better.

---

## Search Intent Classification

Before writing, classify the target keyword's intent:

| Intent | Example | Content Approach |
|--------|---------|-----------------|
| **Informational** | "What is meal planning" | Educational guide, how-to, explainer |
| **Commercial investigation** | "Best meal planning apps" | Comparison, review, listicle |
| **Transactional** | "Buy meal planning app" | NOT a blog post — this is a landing/product page |
| **Navigational** | "MealMaster app login" | NOT a blog post — this is brand search |

**Blog posts should target Informational and Commercial Investigation intent.** If the keyword is transactional or navigational, suggest a different content type.

---

## Content Brief Template

Create this brief before writing. Present to the user for approval.

```markdown
# Content Brief

## Topic
[One-sentence description]

## Target Keyword
- Primary: [keyword] (Volume: X, KD: X)
- Secondary: [keyword 1], [keyword 2], [keyword 3]
- Tertiary: [keyword 1], [keyword 2]

## Search Intent
[Informational / Commercial Investigation]

## Target Audience
[From Story System personas — who specifically is searching this?]

## Goal
[Traffic / Conversion / Authority / Brand awareness]

## Competitive Analysis
- Top 3 ranking articles: [URLs]
- What they cover well: [summary]
- What's missing/weak: [gaps we'll fill]
- Our unique angle: [what makes ours different — unique data, deeper depth, better examples, contrarian take]

## Outline
### H1: [Title — draft, will finalize in optimization]
### H2: [Section 1]
- Key points to cover
- [H3 subsections if needed]
### H2: [Section 2]
- Key points to cover
### H2: [Section 3]
...
### H2: [CTA / Conclusion]
- Natural product mention angle
- CTA type (newsletter signup, free trial, demo, related post)

## Internal Links
- Link TO these existing pages: [list]
- Link FROM these existing pages back to this post: [list]

## Target Word Count
[Based on competitive analysis — match or exceed top-ranking content depth]

## Hook Type
[Recommended from the 10 hook types — see writing-craft.md]

## Conversion Strategy
[How this post moves readers down the funnel — see "Convert with Content" below]
```

---

## Convert with Content (Demand Curve Framework)

Every blog post must accomplish two things:

### 1. Solve the reader's problem (Finality)
The post should be the **final search result** the reader clicks. They shouldn't need to go back to Google. Google boosts pages that complete a user's search.

### 2. Move the reader further down the funnel
Content should drive readers toward something: subscribe, share, read more, learn about the product, purchase.

**Conversion tactics** (embed naturally, don't force):
- **Minimize external links in body text** — every external link is a place readers bounce. Put references in footnotes/bibliography.
- **Structure articles toward one conclusion**: the reader realizes your product solves their problem. Frame as genuine education, not a sales pitch.
- **Embed product demonstrations naturally** — GIFs, screenshots, videos of the product in use, placed where they're contextually relevant.
- **Include natural product mentions** — link to your product where you're discussing the problem it solves. Don't drop links randomly.
- **End with a CTA that follows logically** from the content. If the post taught them about a problem, the CTA offers the solution.

**Example pattern** (from Demand Curve):
> HubSpot wrote a guide on "how to get a HubSpot experience using WordPress." The crux: it's possible but painful, insecure, and more expensive. But it's framed as a genuine guide, not a sales pitch. The reader arrives at the conclusion naturally.

---

## Outline Construction Rules

1. **Answer the query immediately** — don't bury the answer under context paragraphs. If someone searches "Does X work?" start with the answer.
2. **Use H2s for major sections** — each H2 should be a standalone answer to a related sub-question.
3. **Use H3s for subsections** — break complex H2 sections into scannable parts.
4. **Include a table of contents** — links to each H2. Increases time-on-page and can generate "jump to section" in Google results.
5. **Plan for visual breaks** — note where images, examples, code blocks, or callout boxes should go.
6. **End strong** — conclusion should recap the key takeaway and include the CTA.

---

## Refresh Mode: Content Audit Brief

When refreshing existing content, create this audit brief instead:

```markdown
# Content Refresh Brief

## Existing Post
- URL/path: [location]
- Published: [date]
- Last updated: [date]
- Current word count: [X]

## Performance (if available)
- Monthly clicks: [X]
- Current position for primary keyword: [X]
- CTR: [X]
- Trend: [improving / declining / flat]

## Issues Identified
- [ ] Stale information (outdated stats, dead links, old examples)
- [ ] Thin content (not competitive with current top-ranking pages)
- [ ] Keyword drift (topic has evolved, new related terms exist)
- [ ] Missing sections (competitors cover topics we don't)
- [ ] Weak hook/intro (high bounce rate signal)
- [ ] Poor conversion (no CTAs, no product mention)
- [ ] SEO gaps (missing meta, poor title, heading issues)

## Competitive Re-analysis
- Current top 3 ranking articles: [URLs]
- New topics they cover that we don't: [list]
- Our post's unique advantage to preserve: [what to keep]

## Refresh Plan
- Sections to rewrite: [list]
- Sections to add: [list]
- Sections to remove/consolidate: [list]
- Updated keyword targets: [if changed]
- New internal link opportunities: [list]
```
