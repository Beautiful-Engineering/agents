# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Repository Is

This is a complete export of the Demand Curve growth curriculum — 404 lessons across 53 courses, with 982 locally-stored images. It is static markdown content, not an application. There are no build steps, tests, or dependencies.

## Repository Structure

```
demand-curve/
├── INDEX.md              # Master index — start here
└── content/
    ├── images/           # 982 local .avif/.png images
    └── <course-slug>/    # 53 course directories
        ├── 01-lesson.md
        ├── 02-lesson.md
        └── ...
```

## INDEX.md

The single entry point that organizes all content. It contains:

- **Quick nav** at the top linking to the 3 learning paths
- **3 learning paths** (Core Growth, B2C Tech, B2B Tech), each broken into sections (Parts, Execution Layers, Hubs)
- Every course and lesson is hyperlinked with relative paths to `./content/`

Many courses appear in multiple paths since the paths share a common strategic foundation but diverge at the execution layer (e.g., B2C gets "Organic Instagram" while B2B gets "B2B Influencer Marketing").

## Content Format

Each lesson `.md` file follows this pattern:
- `# Title` as the first line
- Body content with markdown formatting (headings, bold, italics, lists, blockquotes)
- Images referenced as relative paths: `![alt](../images/<hash>_<name>.avif)`
- Courses end with a feedback lesson (e.g., `10-dc-growth-system-feedback.md`)

Lessons are numbered with zero-padded prefixes (`01-`, `02-`, ...) reflecting their order within the course syllabus.

## Curriculum Architecture

The curriculum follows a layered system:

1. **Growth System & Principles** — foundational mental models (dc-growth-system, guiding-principles)
2. **Foundational Five** — market, product, model, brand, channel alignment (foundational-five-overview, fit-mechanics-pairings)
3. **Growth Catalysts** — structural advantages like network effects (growth-catalysts)
4. **Engine Design** — guardrails, story system, motions for acquisition/monetization/retention
5. **Execution Layer** — channel-specific tactics (paid ads, SEO, content, sales, outreach)
6. **Conversion & Messaging** — landing pages, copywriting, ad creatives, onboarding, email
7. **Research & Measurement** — competitor research, user surveys, heatmaps, A/B testing

B2B and B2C variants exist for several courses (e.g., `growth-guardrails` vs `growth-guardrails-b2c`, `cold-outreach-partnerships-pr` vs `b2b-cold-outreach-partnerships-pr`).
