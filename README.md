# Agents

A [Claude Code](https://claude.ai/claude-code) plugin that bundles AI agents trained on specialized curricula. Install the plugin and get access to expert agents for growth strategy, SEO, and content writing — all powered by real frameworks, not generic AI output.

## Agents

| Agent | What It Does |
|-------|-------------|
| **Growth Consultant** | Walks you through building a complete growth strategy using the Demand Curve curriculum. Socratic-style — asks questions, teaches concepts, produces structured deliverables across 7 phases (Foundational Five, Catalysts, Story System, Engine Design, Acquisition, Monetization, Execution). |
| **SEO Expert** | Runs technical SEO audits, keyword research, on-page optimization, and link building. Two modes: Baseline Audit (4-phase setup from scratch) and Ongoing Optimization (periodic health checks). Integrates with Ahrefs MCP when available. |
| **Blog Writer** | Researches, writes, optimizes, and creates distribution plans for blog posts. Two modes: New Post (5 phases from brief to distribution) and Refresh (audit and update existing content). Produces publication-ready content, not outlines. |
| **Landing Page Expert** | Builds and reviews high-converting landing pages using proven frameworks. Two modes: Build (5 phases from value props to final copy) and Review (audit existing pages with section-by-section scoring). Writes actual copy, not just recommendations. |

The agents integrate with each other — the Blog Writer reads SEO keyword data and the Growth Story System for brand voice, the SEO Expert pulls competitors from the Acquisition Strategy, the Landing Page Expert uses Story System value props as the foundation for all page copy, and so on.

## Installation

```bash
# Step 1: Register the marketplace
/plugin marketplace add Beautiful-Engineering/agents

# Step 2: Install the plugin
/plugin install agents@beautiful-engineering
```

This makes all 4 agents and their skills available in any Claude Code session. Requires git access to the repo (private).

Then use any agent:
```bash
claude --agent growth-fundamentals
claude --agent seo-expert
claude --agent blog-writer
claude --agent landing-page-expert
```

## What's Inside

```
agents/
├── .claude-plugin/plugin.json        # Plugin manifest
├── agents/                           # 4 agent definitions
├── skills/                           # 26 distilled skill files
│   ├── growth-fundamentals/          # Foundational Five, catalysts, story system, etc.
│   ├── seo-expert/                   # Technical SEO, on-page, keywords, off-page, ongoing
│   ├── blog-writer/                  # Content briefs, writing craft, copywriting, SEO, distribution
│   └── landing-page-expert/          # Page anatomy, conversion optimization, review checklist
└── content/
    └── demand-curve/                 # 404 lessons across 53 courses
        ├── INDEX.md                  # Full curriculum index
        └── ...                       # Course directories + images
```

**Agents** are the orchestrators — they define the persona, interaction protocol, and multi-phase workflows.

**Skills** are distilled frameworks — checklists, scoring rubrics, templates, and question sequences extracted from the curriculum. Agents read the relevant skill file at each phase.

**Content** is the knowledge base — the full curriculum that agents reference when they need to teach a concept or validate a recommendation.

## Adding New Agents

**1. Develop locally**
```bash
# Create agent and skills in your local Claude Code directories
~/.claude/agents/my-agent.md
~/.claude/skills/my-agent/SKILL.md
~/.claude/skills/my-agent/some-framework.md
```
Test until the agent works as expected.

**2. Copy to the plugin repo**
```bash
cp ~/.claude/agents/my-agent.md ~/Code/agents/agents/
cp -r ~/.claude/skills/my-agent ~/Code/agents/skills/
```

**3. Fix paths** — replace any hardcoded paths with `${CLAUDE_PLUGIN_ROOT}` so the plugin works on anyone's machine:
- `~/.claude/skills/my-agent/` → `${CLAUDE_PLUGIN_ROOT}/skills/my-agent/`
- `/Users/you/Code/.../content/` → `${CLAUDE_PLUGIN_ROOT}/content/...`

**4. Commit and push**
```bash
cd ~/Code/agents
git add agents/my-agent.md skills/my-agent/
git commit -m "Add my-agent"
git push
```

**5. Users update** — in their Claude Code session:
```
/plugin
# Navigate to agents plugin → "Update now"
```

## Optional Integrations

| Tool | What It Enables |
|------|----------------|
| [Ahrefs MCP](https://ahrefs.com/api/mcp) | Keyword data, site audits, backlink profiles, competitor analysis |

Agents work without these — they degrade gracefully to web search and manual inspection.

## License

MIT
