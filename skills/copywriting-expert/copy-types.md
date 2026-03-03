# Copy Types

The copy types this agent handles, how they differ from each other, and how they differ from the Blog Writer and Landing Page Expert.

---

## Copy Type Reference

### Sales Pages

Narrative-driven, framework-based pages designed to convert a reader into a buyer. Unlike a landing page (which follows a fixed section structure), a sales page flows like a story.

- **Framework**: Slippery Slope + AIDA or Yes Ladder
- **Length**: 1000-5000+ words depending on price/complexity
- **Key difference from LP Expert**: Sales pages are narrative-driven (story flows top to bottom). Landing pages are section-driven (modular blocks). Use the Copywriting Expert when the page reads more like a letter than a brochure.
- **Deliverable**: `copy/{product-name}-sales-page.md`

### Email Sequences

Multi-email campaigns that build relationship and drive action over time. Covers welcome sequences, nurture sequences, launch sequences, and onboarding flows.

- **Framework**: Each email uses mini-AIDA or Story-Sell; sequence-level uses Yes Ladder (escalating commitment across emails)
- **Length**: 200-500 words per email, 3-7 emails per sequence
- **Key difference from Cold Email Outreach**: Cold email is outbound to strangers (different rules, different laws, different platform). Email sequences go to people who opted in.
- **Deliverable**: `copy/{sequence-name}-emails.md`

### Founder Letters

Personal, story-driven messages from the founder to customers, investors, or the public. Authenticity is everything.

- **Framework**: Story-Sell or Hero's Journey
- **Length**: 500-1500 words
- **Key traits**: First person, vulnerable, specific stories, no corporate speak
- **Deliverable**: `copy/{topic}-founder-letter.md`

### About Pages

The most underestimated page on any website. This is "forgotten copy" — most companies phone it in, but it's one of the most-visited pages.

- **Framework**: Hero's Journey (company origin story)
- **Length**: 300-800 words
- **Key traits**: Story-driven, human, specific. NOT a timeline of funding rounds.
- **Source**: Day 8 — "forgotten copy" principle
- **Deliverable**: `copy/about-page.md`

### Product Descriptions

Short-form persuasive copy that makes someone want to buy/try a specific product or feature.

- **Framework**: AIDA (compressed) or PAS
- **Length**: 50-200 words
- **Key traits**: Benefit-first, specific, visual. Every word earns its place.
- **Deliverable**: `copy/{product-name}-description.md`

### Welcome Emails

The first email someone receives after signing up. Sets the tone for the entire relationship. Most companies waste this with a generic "Welcome aboard!"

- **Framework**: Mini Story-Sell or direct value delivery
- **Length**: 100-300 words
- **Key traits**: Warm, useful, sets expectations, single CTA
- **Source**: Day 8 — "forgotten copy" principle
- **Deliverable**: `copy/welcome-email.md`

### Forgotten Copy

Unsubscribe pages, error pages, 404s, confirmation emails, cancellation flows, empty states. The copy nobody thinks about — which is exactly why good copy here stands out.

- **Framework**: Varies (usually conversational + brand personality)
- **Length**: 10-100 words
- **Key traits**: Surprisingly delightful, on-brand, human
- **Source**: Day 8 — these are high-impression, low-effort wins
- **Deliverable**: `copy/forgotten-copy/{page-type}.md`

### Advertorials

Editorial-style ads that read like articles. The reader should be three paragraphs in before they realize it's selling something.

- **Framework**: Hero's Journey / Advertorial format
- **Length**: 1000-3000 words
- **Key traits**: Third-person or interview style, editorial voice, organic product integration
- **Source**: Day 10 — Hint Water case study
- **Deliverable**: `copy/{product-name}-advertorial.md`

### Ad Copy (Short-Form)

Social media ads, search ads, display ads. Maximum impact in minimum space.

- **Framework**: AIDA (compressed) — often just Attention + Action
- **Length**: 1-3 sentences (primary text), plus headline and description
- **Key traits**: Hook-first, specific, curiosity-driven, clear CTA
- **Deliverable**: `copy/ads/{platform}-{campaign}.md`

### Persuasive Blog Posts

Blog posts where the primary goal is conversion, not SEO ranking. Overlap with Blog Writer — use the Copywriting Expert when the post is more sales letter than informational article.

- **Framework**: Story-Sell + AIDA or Slippery Slope
- **Length**: 1000-3000 words
- **Key difference from Blog Writer**: Blog Writer optimizes for SEO (keywords, structure, meta). Copywriting Expert optimizes for conversion (persuasion, emotion, action). When in doubt: if you need it to rank, use Blog Writer. If you need it to sell, use Copywriting Expert.
- **Deliverable**: `copy/{topic}-post.md`

### Sales-Oriented Landing Pages

Landing pages where the narrative matters more than the modular structure. Overlap with Landing Page Expert — use the Copywriting Expert when the page is more story than sections.

- **Framework**: Slippery Slope + AIDA or Yes Ladder
- **Key difference from LP Expert**: LP Expert follows section-by-section structure (Hero → Social Proof → Features → FAQ → CTA). Copywriting Expert treats the page as a continuous narrative. When in doubt: if the page needs modular sections, use LP Expert. If it needs to flow like a letter, use Copywriting Expert.
- **Deliverable**: `copy/{page-name}-landing-page.md`

---

## Type Selection Guide

Ask these questions to choose the right copy type:

### 1. What's the goal?

| Goal | Copy Types |
|------|-----------|
| Get someone to buy | Sales page, product description, ad copy |
| Build a relationship over time | Email sequence, welcome email |
| Tell the company story | Founder letter, about page |
| Drive traffic to a page | Ad copy, advertorial, persuasive blog post |
| Convert warm traffic | Sales-oriented landing page, sales page |
| Surprise and delight | Forgotten copy |

### 2. How aware is the audience?

| Awareness Level | Best Copy Types |
|----------------|-----------------|
| **Unaware** (don't know they have a problem) | Advertorial, persuasive blog post |
| **Problem-aware** (know the problem, not solutions) | Sales page (long), email sequence, founder letter |
| **Solution-aware** (know solutions exist, evaluating) | Sales page, product description, landing page |
| **Product-aware** (know your product, haven't bought) | Email sequence, sales page (short), ad copy |
| **Most aware** (ready to buy, need a push) | Ad copy, product description, welcome email |

### 3. What's the format constraint?

| Constraint | Copy Types |
|-----------|-----------|
| < 50 words | Ad copy, product description |
| 100-500 words | Welcome email, forgotten copy, single email |
| 500-1500 words | Founder letter, about page, short sales page |
| 1500+ words | Long sales page, advertorial, email sequence (total) |
| Multiple touchpoints | Email sequence |
| Single page | Sales page, landing page, about page |

---

## Agent Boundary Guide

| Task | Use This Agent | Not This Agent |
|------|---------------|----------------|
| SEO blog post | Blog Writer | Copywriting Expert |
| Persuasive blog post (conversion goal) | Copywriting Expert | Blog Writer |
| Modular landing page (Hero/Features/FAQ/CTA) | Landing Page Expert | Copywriting Expert |
| Narrative sales page | Copywriting Expert | Landing Page Expert |
| Cold outbound email | Cold Email Outreach Expert | Copywriting Expert |
| Opt-in email sequence | Copywriting Expert | Cold Email Outreach Expert |
| Pricing page copy | Pricing Expert | Copywriting Expert |
| Ad creative strategy | Google Ads Expert | Copywriting Expert |
| Ad copy text | Copywriting Expert | Google Ads Expert |
