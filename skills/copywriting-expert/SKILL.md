---
name: Copywriting Expert (Copy That)
description: >
  Distilled copywriting frameworks from Sam Parr's Copy That curriculum — persuasion frameworks
  (AIDA, Slippery Slope, Story-Sell, Yes Ladder, Hero's Journey), writing mechanics (rhythm,
  readability, conversational voice, copy length), swipe file method, copy types, and scoring
  rubrics. Two modes: Write (create from scratch) and Review (audit and improve).
---

# Copywriting Expert — Copy That Trained

Quick reference for persuasive copywriting frameworks. These files distill the persuasion structures, writing mechanics, swipe file method, copy type selection, and scoring rubrics from Sam Parr's Copy That curriculum (10 daily lessons covering AIDA, slippery slope, storytelling, conversational voice, readability, copy length, forgotten copy, the yes ladder, and emotional advertorials).

## When to Use

Use these frameworks when:
- Writing persuasive copy from scratch (sales pages, email sequences, founder letters, ads)
- Reviewing and improving existing copy
- Choosing the right copy type and framework for a project
- Researching and analyzing swipe file examples before writing
- Scoring copy quality against objective criteria
- Writing about pages, welcome emails, or other "forgotten copy"
- Creating advertorials or editorial-style ads

## Two Operating Modes

| Mode | When | Phases | Output |
|------|------|--------|--------|
| **Write** | New copy needed | 6 phases | `copy/{asset-name}.md` + `copy/swipe-notes.md` |
| **Review** | Existing copy needs improvement | 4 phases | `copy/reviews/{asset-name}-review.md` |

## Skill Reference

| File | What It Covers | When to Read |
|------|----------------|-------------|
| `persuasion-frameworks.md` | AIDA, Slippery Slope, Story-Sell, Yes Ladder, Hero's Journey, framework selection matrix, combining frameworks | Phase 3 (Framework Selection), Phase 4 (Draft), Phase R1 (Audit) |
| `writing-mechanics.md` | Rhythm & flow, Hemingway score, conversational voice, copy length principle, readability checklist | Phase 4 (Draft), Phase R2 (Diagnose) |
| `copy-types.md` | 11 copy types with frameworks, lengths, deliverables, agent boundary guide, type selection guide | Phase 1 (Copy Type & Audience) |
| `swipe-file-method.md` | Copywork method, swipe analysis template, 10 canonical examples, building a swipe file | Phase 2 (Research & Swipe) |
| `copy-scoring-rubric.md` | 7-dimension scoring (readability, slippery slope, emotion, specificity, voice, length, framework), Ship/Revise/Rewrite verdicts | Phase 5 (Score & Polish), Phase R1 (Audit) |

## Curriculum Source

This agent is trained on Sam Parr's Copy That curriculum (copythat.com), not the Demand Curve curriculum. The course teaches persuasive copywriting through 10 daily lessons using the "copywork" method — learning to write by studying and copying great examples.

| Day | Topic | Key Concept |
|-----|-------|-------------|
| 0 | Introduction | Copywork method — study the masters |
| 1 | Rhythm & Flow | Sentence variation, pacing |
| 2 | AIDA | Attention, Interest, Desire, Action — Gary Halbert |
| 3 | Slippery Slope | Each sentence sells the next — Joe Sugarman |
| 4 | Hemingway Score | Grade 4-8 readability — Stephen King, Scott Adams |
| 5 | Story-Sell | WSJ "Two Young Men" letter ($2B) — parallel story structure |
| 6 | Conversational Voice | Write like you speak — read-aloud test |
| 7 | Copy Length | As long as it takes to achieve the action |
| 8 | Forgotten Copy | About pages, welcome emails, error pages, unsubscribe |
| 9 | Yes Ladder | Small agreements before the big ask — Notion Mastery |
| 10 | Advertorial | Hero's Journey editorial ads — Hint Water |

## Growth System Integration

When growth system deliverables exist (`growth/*.md`), the copywriting agent pulls context:
- **Story System** (`growth/03-story-system.md`) — Value props, hooks, personas, brand personality. **Primary input for voice, messaging, and audience understanding.**
- **Foundational Five** (`growth/01-foundational-five.md`) — Market segment, core problem, target audience
- **Acquisition Strategy** (`growth/06-acquisition-strategy.md`) — Competitors, channel strategy, demand type

## Related Agents

- The `blog-writer` agent handles informational content optimized for SEO — use the Copywriting Expert when the primary goal is persuasion over ranking
- The `landing-page-expert` agent handles section-based landing page structure — use the Copywriting Expert when the page needs narrative flow over modular sections
- The `cold-email-outreach` agent handles outbound email to strangers — use the Copywriting Expert for opt-in email sequences
- The `pricing-expert` agent owns pricing page copy — the Copywriting Expert defers to it for pricing sections
- The `growth-fundamentals` agent builds the story system that feeds the Copywriting Expert's voice and messaging
