# SEO Content Optimization

Keyword embedding rules, title tag formulas, meta descriptions, heading hierarchy, internal links, and schema markup for blog posts.

Source: `content-marketing-fundamentals/09-content-writing-guidelines.md`, `seo-fundamentals/04-on-page-seo.md`, `seo-fundamentals/12-project-optimize-blog-content.md`, `content-marketing-fundamentals/04-editorial-seo.md`

---

## SEO Optimization Checklist

Run this after the draft is complete. Each item should be checked and adjusted.

### 1. Title Tag
- **Max 60 characters** (truncated beyond this)
- **Primary keyword early** — letter-for-letter, fully intact, ideally in the first 3 words
- **Include a hook** — make it compelling enough to click over competitors
- **Must represent the content** — no bait and switch. If the title promises something, the post must deliver.
- **Stand out from SERP** — Google the keyword, look at what competitors use, differentiate

**Title formulas**:
- Simple description: "Eczema Examples with Pictures and Explanations"
- Short hook: "Is My Eczema Linked to My Diet? How to Find Out"
- Colon divider: "Eczema and Diet: How They're Connected"
- Number + benefit: "7 Ways to Reduce Eczema Symptoms (Backed by Research)"

**Capitalization**: Use title case — capitalize principal words. Articles, conjunctions, prepositions lowercase unless they start the title.

### 2. Meta Description
- **150-160 characters** (truncated beyond this)
- **Include primary keyword** naturally
- **Include a CTA or benefit** — why should they click?
- **Match search intent** — the description should promise what the searcher is looking for
- **Don't duplicate** the title — add complementary information

### 3. URL Structure
- Short and descriptive
- Include primary keyword
- Use hyphens, not underscores
- No unnecessary words (a, the, and, of)
- No dates in URL (makes content feel dated during refreshes)

### 4. Heading Hierarchy
- **One H1 per page** — usually the post title
- **H2s for major sections** — each should target a secondary keyword or address a sub-question
- **H3s for subsections** within H2s
- **Never skip levels** (no H1 → H3)
- **Include keywords naturally** in headings — don't force it

### 5. Keyword Embedding
- **Primary keyword**: Appears in title, H1, first 100 words, meta description, URL, and naturally 2-5 more times throughout
- **Secondary keywords**: Appear in H2 headings and body text where relevant
- **Tertiary keywords**: Sprinkled naturally throughout — these cover the topic's full theme
- **DO NOT keyword stuff** — Google penalizes unnatural repetition. Write for humans first.
- **Target the theme, not just the keyword** — Google rewards posts that fully respond to searcher intent. Cover the topic comprehensively.

**Finding secondary/tertiary keywords**:
1. Google your target keyword
2. Review top 6-10 results — note common words, phrases, and subheader topics
3. Check "People also ask" for question-based keywords
4. Use Ahrefs matching/related terms if available

### 6. First 100 Words
- **Must include primary keyword** naturally
- **Should hook the reader** (use one of the 10 hook types)
- **Should establish what the post will cover**
- **Consider a brief answer** to the query immediately — don't bury the lead

### 7. Internal Links
- **2-3 internal links per 500 words** as a baseline
- **Link to relevant existing content** — helps readers discover more and distributes link equity
- **Use descriptive anchor text** — not "click here" but "our guide to meal planning"
- **Link from existing high-traffic pages** to the new post — this is the most overlooked opportunity
- **No orphan pages** — every post should be reachable from at least 2-3 other pages

### 8. External Links
- **Minimize external links in body text** — each is a place readers bounce and don't come back
- **Put reference links in footnotes/bibliography** — preserves finality while maintaining credibility
- **Exception**: Linking to authoritative sources that strengthen your argument (research studies, official documentation)

### 9. Images
- **Every image needs descriptive alt text** — include the keyword where it's naturally relevant
- **Images on their own line** — never wrapped around text
- **Compress images** — large images slow page load (Core Web Vitals)
- **Use descriptive file names** — `meal-planning-weekly-template.jpg` not `IMG_4392.jpg`
- **Include at least one image per major section** — breaks up text, improves engagement

### 10. Schema Markup
Recommend schema types based on content:

| Content Type | Schema | Benefit |
|-------------|--------|---------|
| How-to guide | `HowTo` | Step-by-step rich results |
| FAQ section | `FAQPage` | Expandable Q&A in search results |
| Listicle/review | `Article` + `ItemList` | Enhanced snippets |
| Product comparison | `Article` + `Product` | Product details in search |

### 11. Featured Snippet Optimization
To win the featured snippet (position 0):
- **Use bulleted/numbered lists** for process-based queries
- **Answer the query in a concise paragraph** (40-60 words) right after the H2
- **Use tables** for comparison queries
- **Match the format** of the current featured snippet for your keyword

---

## Post-Optimization Quality Checks

### Finality Check
Ask: "If someone searched for [keyword] and landed on this post, would they need to go back to Google?"

If yes → the post needs more depth, better answers, or missing subtopics.

### Readability Check
- No paragraph longer than 4-5 lines
- Mix of short and medium sentences
- Bold on key points (2-3 per section max)
- Lists where appropriate
- Subheadings every 200-300 words

### Conversion Check
- Is there a natural product mention in the body?
- Is there a CTA at the end?
- Does the post logically lead to the product/action?
- Are there internal links to product/conversion pages?

---

## Refresh-Specific Optimization

When refreshing existing content, additionally check:

1. **Update the publication date** — Google favors fresh content
2. **Refresh outdated statistics and examples** — check if cited data has newer versions
3. **Check for broken links** — fix or remove dead URLs
4. **Compare against current top-ranking competitors** — add any topics they now cover that you don't
5. **Strengthen the title** — if CTR is low, the title needs work
6. **Add new internal links** — link to any content published since the original post
7. **Re-check keyword targets** — search behavior evolves. The primary keyword may need updating.

---

## Blog Post Frontmatter Template

Output each blog post with this frontmatter:

```markdown
---
title: "[SEO-optimized title — max 60 chars]"
meta_description: "[Compelling description — max 160 chars]"
primary_keyword: "[keyword]"
secondary_keywords: ["keyword1", "keyword2", "keyword3"]
author: "[author name]"
date: "[YYYY-MM-DD]"
last_updated: "[YYYY-MM-DD]"
status: "[draft / review / published]"
schema_type: "[Article / HowTo / FAQPage]"
---
```
