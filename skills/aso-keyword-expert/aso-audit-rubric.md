# ASO Audit Rubric

Scoring rubric for auditing App Store listings and keyword strategies. 10 dimensions scored Red/Yellow/Green, plus anti-patterns checklist and fix prioritization.

---

## 10-Dimension ASO Scorecard

### 1. Title Quality
| Score | Criteria |
|-------|---------|
| 🟢 Green | App name + primary keyword, under 30 chars, natural and memorable |
| 🟡 Yellow | Has a keyword but awkward phrasing, or slightly over 30 chars |
| 🔴 Red | No keyword in title, keyword-stuffed, or generic/meaningless title |

### 2. Subtitle Quality
| Score | Criteria |
|-------|---------|
| 🟢 Green | Clear value prop, includes secondary keyword, under 30 chars |
| 🟡 Yellow | Decent value prop but missing keyword, or too generic |
| 🔴 Red | Empty, slogany ("The best app!"), or wastes the 30 chars |

### 3. Keywords Field Optimization
| Score | Criteria |
|-------|---------|
| 🟢 Green | 90%+ of 100 chars used, no words repeated from title/subtitle, no plurals, no spaces after commas |
| 🟡 Yellow | 70-90% of chars used, some redundancy with title/subtitle |
| 🔴 Red | Under 70% used, major redundancy, includes app name or "app", or field is empty |

### 4. Screenshot Strategy
| Score | Criteria |
|-------|---------|
| 🟢 Green | 5+ screenshots, clear headlines on each, follows the 5-screenshot framework (Hero → Problem/Solution → Key Feature → Social Proof → CTA), real data shown |
| 🟡 Yellow | Has screenshots but missing headlines, inconsistent style, or uses placeholder data |
| 🔴 Red | Under 3 screenshots, no headlines, just raw app UI without context, or blurry/outdated |

### 5. Description Effectiveness
| Score | Criteria |
|-------|---------|
| 🟢 Green | Strong first 3 lines (visible hook), benefit-focused feature list, social proof included, clear formatting |
| 🟡 Yellow | Decent content but weak first 3 lines, or walls of text without formatting |
| 🔴 Red | Empty, copied from another source, only technical specs, or starts with "Welcome to..." |

### 6. Reviews & Ratings
| Score | Criteria |
|-------|---------|
| 🟢 Green | 4.5+ stars, 100+ reviews, recent reviews (last 30 days), review request strategy in place |
| 🟡 Yellow | 4.0-4.4 stars or 50-100 reviews, some recent activity |
| 🔴 Red | Under 4.0 stars, under 50 reviews, no recent reviews, or major unaddressed complaints |

### 7. App Preview Video
| Score | Criteria |
|-------|---------|
| 🟢 Green | 15-30 sec video, shows core value prop, professional quality, auto-plays in search |
| 🟡 Yellow | Has video but too long, poor quality, or doesn't show the main value prop |
| 🔴 Red | No video (not a blocker, but a missed opportunity) |
| ⬜ N/A | Video not worth the effort yet (listing fundamentals not solid) |

### 8. Localization
| Score | Criteria |
|-------|---------|
| 🟢 Green | Listing localized for top 3+ markets, locale-specific keywords, translated screenshots |
| 🟡 Yellow | Title/subtitle translated but screenshots and keywords not localized |
| 🔴 Red | English-only despite international users, or machine-translated without review |
| ⬜ N/A | Single-market app |

### 9. Competitive Positioning
| Score | Criteria |
|-------|---------|
| 🟢 Green | Clear differentiation in title/screenshots vs top competitors, unique positioning angle, stronger listing quality |
| 🟡 Yellow | Some differentiation but listing is weaker than competitors in key areas |
| 🔴 Red | Indistinguishable from competitors, weaker listing quality, no clear positioning |

### 10. Keyword Coverage
| Score | Criteria |
|-------|---------|
| 🟢 Green | 50+ keywords identified, categorized into Brand/Generic/Competitor/Discovery, covers core use cases and adjacent terms |
| 🟡 Yellow | 25-50 keywords, partial categorization, missing some obvious keyword themes |
| 🔴 Red | Under 25 keywords, not categorized, missing major keyword themes, or no keyword research done |

---

## Overall Rating

| Rating | Criteria |
|--------|---------|
| 🟢 Green | 7+ dimensions Green, no Red on Title/Screenshots/Keywords |
| 🟡 Yellow | 4-6 dimensions Green, no more than 2 Red |
| 🔴 Red | Under 4 dimensions Green, or Red on Title + Screenshots + Keywords |

---

## Common Anti-Patterns

### Listing Anti-Patterns
- [ ] **Keyword stuffing** — Title/subtitle crammed with keywords at the expense of readability
- [ ] **Generic screenshots** — Raw app UI with no context or headlines
- [ ] **Placeholder data** — Screenshots showing $0.00, empty states, or "John Doe"
- [ ] **"Welcome to..." opener** — Description starts with a greeting instead of a hook
- [ ] **Feature-only description** — Lists features without explaining benefits
- [ ] **Stale listing** — Screenshots show an old UI that doesn't match the current app
- [ ] **Missing review strategy** — No in-app review prompts, no email requests
- [ ] **Brand name waste** — App name in the keywords field (already indexed from title)

### Keyword Anti-Patterns
- [ ] **Single-word keywords** — "money", "fitness" (too broad, too expensive)
- [ ] **Educational intent** — "how to budget" (users looking for info, not apps)
- [ ] **No categorization** — All keywords dumped into one campaign
- [ ] **Missing negatives** — Discovery campaign competing with exact match campaigns
- [ ] **Ignoring Discovery mining** — Not reviewing search terms for new keyword opportunities
- [ ] **Over-reliance on broad match** — Using broad match everywhere instead of exact match

---

## Fix Prioritization

Fix in this order (highest impact first):

### Tier 1: Fix First (Conversion Blockers)
1. **Screenshots** — If Red, fix before anything else. This is the #1 conversion driver.
2. **Title** — If Red, fix immediately. Affects both ranking and conversion.
3. **Rating** — If under 4.0, focus on fixing bugs and generating new reviews.

### Tier 2: Fix Next (Discoverability Issues)
4. **Keywords field** — Maximize the 100-character field.
5. **Subtitle** — Include a secondary keyword.
6. **Keyword coverage** — Research and categorize at least 50 keywords.

### Tier 3: Optimize (Incremental Improvements)
7. **Description** — Improve the first 3 lines.
8. **App Preview video** — Create if screenshots are already optimized.
9. **Competitive positioning** — Differentiate from top competitors.
10. **Localization** — Expand to new markets.

---

## Audit Deliverable Template

```markdown
# ASO Audit — [App Name]
Date: YYYY-MM-DD
Auditor: ASO & Keyword Expert (Demand Curve)

## Overall Rating: [🟢 / 🟡 / 🔴]

## Scorecard

| # | Dimension | Score | Summary |
|---|-----------|-------|---------|
| 1 | Title Quality | 🟢/🟡/🔴 | [one-line assessment] |
| 2 | Subtitle Quality | 🟢/🟡/🔴 | [one-line assessment] |
| 3 | Keywords Field | 🟢/🟡/🔴 | [one-line assessment] |
| 4 | Screenshot Strategy | 🟢/🟡/🔴 | [one-line assessment] |
| 5 | Description | 🟢/🟡/🔴 | [one-line assessment] |
| 6 | Reviews & Ratings | 🟢/🟡/🔴 | [one-line assessment] |
| 7 | App Preview Video | 🟢/🟡/🔴/⬜ | [one-line assessment] |
| 8 | Localization | 🟢/🟡/🔴/⬜ | [one-line assessment] |
| 9 | Competitive Positioning | 🟢/🟡/🔴 | [one-line assessment] |
| 10 | Keyword Coverage | 🟢/🟡/🔴 | [one-line assessment] |

## Anti-Patterns Detected
[List any that apply]

## Priority Fixes

### Tier 1: Fix First
[Specific, actionable fixes with exact copy recommendations]

### Tier 2: Fix Next
[Specific fixes with keyword suggestions]

### Tier 3: Optimize
[Incremental improvements]

## Recommended Keywords to Add
| Keyword | Campaign Type | Priority | Source |
|---------|--------------|----------|--------|
| [keyword] | Generic | High | Competitor gap |

## Next Steps
[What to do after implementing fixes]
```
