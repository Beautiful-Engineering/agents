# Agents

A [Claude Code](https://claude.ai/claude-code) plugin that bundles AI agents trained on specialized curricula. Install the plugin and get access to expert agents for growth strategy, SEO, and content writing — all powered by real frameworks, not generic AI output.

## Agents

| Agent | What It Does |
|-------|-------------|
| **Growth Consultant** | Walks you through building a complete growth strategy using the Demand Curve curriculum. Socratic-style — asks questions, teaches concepts, produces structured deliverables across 7 phases (Foundational Five, Catalysts, Story System, Engine Design, Acquisition, Monetization, Execution). |
| **SEO Expert** | Runs technical SEO audits, keyword research, on-page optimization, and link building. Two modes: Baseline Audit (4-phase setup from scratch) and Ongoing Optimization (periodic health checks). Integrates with Ahrefs MCP when available. |
| **Blog Writer** | Researches, writes, optimizes, and creates distribution plans for blog posts. Two modes: New Post (5 phases from brief to distribution) and Refresh (audit and update existing content). Produces publication-ready content, not outlines. |

The agents integrate with each other — the Blog Writer reads SEO keyword data and the Growth Story System for brand voice, the SEO Expert pulls competitors from the Acquisition Strategy, and so on.

## Installation

```
/plugin add Beautiful-Engineering/agents
```

This makes all 3 agents and their skills available in any Claude Code session. Requires access to the repo (private).

## What's Inside

```
agents/
├── .claude-plugin/plugin.json        # Plugin manifest
├── agents/                           # 3 agent definitions
├── skills/                           # 22 distilled skill files
│   ├── growth-fundamentals/          # Foundational Five, catalysts, story system, etc.
│   ├── seo-expert/                   # Technical SEO, on-page, keywords, off-page, ongoing
│   └── blog-writer/                  # Content briefs, writing craft, copywriting, SEO, distribution
└── content/
    └── demand-curve/                 # 404 lessons across 53 courses
        ├── INDEX.md                  # Full curriculum index
        └── ...                       # Course directories + images
```

**Agents** are the orchestrators — they define the persona, interaction protocol, and multi-phase workflows.

**Skills** are distilled frameworks — checklists, scoring rubrics, templates, and question sequences extracted from the curriculum. Agents read the relevant skill file at each phase.

**Content** is the knowledge base — the full curriculum that agents reference when they need to teach a concept or validate a recommendation.

## Optional Integrations

| Tool | What It Enables |
|------|----------------|
| [Ahrefs MCP](https://ahrefs.com/api/mcp) | Keyword data, site audits, backlink profiles, competitor analysis |

Agents work without these — they degrade gracefully to web search and manual inspection.

## License

MIT
