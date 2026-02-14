# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Repository Is

This is a Claude Code plugin that bundles AI agents, skills, and curriculum content. It includes:

- **3 agents**: Growth Consultant, SEO Expert, Blog Writer — all trained on the Demand Curve curriculum
- **22 skill files**: Distilled frameworks, checklists, templates, and scoring rubrics
- **Curriculum content**: 404 lessons across 53 courses with 982 locally-stored images (the knowledge base the agents draw from)

There are no build steps, tests, or runtime dependencies. Everything is static markdown.

## Repository Structure

```
agents/                         # (repo root)
├── .claude-plugin/
│   └── plugin.json             # Plugin manifest for distribution
├── agents/
│   ├── growth-fundamentals.md  # Growth strategy consultant (Socratic, 7 phases)
│   ├── seo-expert.md           # SEO auditor (Baseline + Ongoing modes)
│   └── blog-writer.md          # Blog writer (New Post + Refresh modes)
├── skills/
│   ├── growth-fundamentals/    # 10 skill files (F5, catalysts, story system, etc.)
│   ├── seo-expert/             # 6 skill files (technical, on-page, keywords, etc.)
│   └── blog-writer/            # 6 skill files (brief, craft, copy, SEO, distribution)
├── content/
│   └── demand-curve/           # Demand Curve growth curriculum
│       ├── INDEX.md            # Master curriculum index
│       ├── images/             # 982 local .avif/.png images
│       └── <course-slug>/      # 53 course directories
│           ├── 01-lesson.md
│           └── ...
└── CLAUDE.md                   # This file
```

## Plugin Installation

```bash
# Add the marketplace
/plugin marketplace add Beautiful-Engineering/agents

# Install the plugin
/plugin install agents@Beautiful-Engineering
```

This makes all 3 agents and their skills available in any Claude Code session.

## Agents Overview

| Agent | What It Does | Modes |
|-------|-------------|-------|
| **Growth Consultant** | Socratic walkthrough of the Demand Curve growth curriculum to build a complete growth strategy | 7 phases: F5 → Catalysts → Story System → Engine → Acquisition → Monetization → Execution |
| **SEO Expert** | Technical SEO audits, keyword research, on-page optimization, link building | Baseline Audit (4 phases) or Ongoing Optimization (periodic health checks) |
| **Blog Writer** | Research, write, optimize, and distribute blog posts | New Post (5 phases) or Refresh existing content (3 phases) |

All agents integrate with each other's deliverables (e.g., the Blog Writer reads the SEO keyword data and Growth Story System for brand voice).

## Curriculum Content

The `content/` directory is the top-level container for curriculum content. Each subdirectory holds a different curriculum:

- `content/demand-curve/` — The Demand Curve growth curriculum (404 lessons, 53 courses). See `content/demand-curve/INDEX.md` for the full course index organized by learning path (Core Growth, B2C Tech, B2B Tech).

Future curricula for other agents can be added as sibling directories (e.g., `content/some-other-curriculum/`).

### Content Format

Each lesson `.md` file follows this pattern:
- `# Title` as the first line
- Body content with markdown formatting (headings, bold, italics, lists, blockquotes)
- Images referenced as relative paths: `![alt](../images/<hash>_<name>.avif)`
- Courses end with a feedback lesson (e.g., `10-dc-growth-system-feedback.md`)

Lessons are numbered with zero-padded prefixes (`01-`, `02-`, ...) reflecting their order within the course syllabus.

### Curriculum Architecture

The curriculum follows a layered system:

1. **Growth System & Principles** — foundational mental models (dc-growth-system, guiding-principles)
2. **Foundational Five** — market, product, model, brand, channel alignment (foundational-five-overview, fit-mechanics-pairings)
3. **Growth Catalysts** — structural advantages like network effects (growth-catalysts)
4. **Engine Design** — guardrails, story system, motions for acquisition/monetization/retention
5. **Execution Layer** — channel-specific tactics (paid ads, SEO, content, sales, outreach)
6. **Conversion & Messaging** — landing pages, copywriting, ad creatives, onboarding, email
7. **Research & Measurement** — competitor research, user surveys, heatmaps, A/B testing

B2B and B2C variants exist for several courses (e.g., `growth-guardrails` vs `growth-guardrails-b2c`, `cold-outreach-partnerships-pr` vs `b2b-cold-outreach-partnerships-pr`).
