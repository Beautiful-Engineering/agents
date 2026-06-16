# Agents

A [Claude Code](https://claude.ai/claude-code) plugin that bundles AI agents trained on specialized curricula. Install the plugin and get access to expert agents for growth strategy, SEO, content writing, paid ads, pricing, and more — all powered by real frameworks, not generic AI output.

## Agents

| Agent | What It Does |
|-------|-------------|
| **Growth Consultant** | Walks you through building a complete growth strategy using the Demand Curve curriculum. Socratic-style — asks questions, teaches concepts, produces structured deliverables across 7 phases (Foundational Five, Catalysts, Story System, Engine Design, Acquisition, Monetization, Execution). |
| **SEO Expert** | Runs technical SEO audits, keyword research, on-page optimization, and link building. Two modes: Baseline Audit (4-phase setup from scratch) and Ongoing Optimization (periodic health checks). Integrates with Ahrefs MCP when available. |
| **Blog Writer** | Researches, writes, optimizes, and creates distribution plans for blog posts. Two modes: New Post (5 phases from brief to distribution) and Refresh (audit and update existing content). Produces publication-ready content, not outlines. |
| **Landing Page Expert** | Builds and reviews high-converting landing pages using proven frameworks. Two modes: Build (5 phases from value props to final copy) and Review (audit existing pages with section-by-section scoring). Writes actual copy, not just recommendations. |
| **Cold Email Outreach Expert** | Builds and optimizes cold email campaigns with Instantly MCP integration. Two modes: New Campaign (5 phases from targeting to live campaign) and Optimize (audit existing campaigns and improve performance). |
| **Google Ads Expert** | Builds and optimizes Google Ads campaigns (Search, Performance Max, Shopping) with API-connected analysis. Two modes: New Campaign (6 phases) and Optimize (5-phase rubric-scored performance analysis with CSV tracking). |
| **Apple Ads Analyzer** | Apple Search Ads performance analysis — connects to the ASA API, scores campaigns/keywords against a rubric, generates prioritized recommendations (bid changes, keyword additions, negatives, pauses), and tracks performance week-over-week in CSV files. |
| **ASO & Keyword Expert** | App Store Optimization and keyword research — optimizes App Store listings (title, subtitle, keywords field, screenshots, reviews) and builds categorized keyword lists for Apple Search Ads. Two modes: Build (5 phases from scratch) and Audit (4-phase scoring against a 10-dimension rubric). |
| **TikTok Marketing Expert** | TikTok organic growth and content production — AI-powered carousel generation, Remotion rendering, PostBridge scheduling, and performance analytics. Six modes: Account Setup, Single Post, Batch Production, Render & Export, Post & Schedule, Theme Design. |
| **Pricing Expert** | Designs and audits monetization/pricing strategies with economic validation. Two modes: Build (7 phases from value metric to pricing page copy) and Audit (5-phase review with experiment design). |
| **Copywriting Expert** | Writes and reviews persuasive copy trained on Sam Parr's Copy That curriculum — sales pages, email sequences, founder letters, ads, advertorials, product descriptions. Two modes: Write (6 phases) and Review (4-phase audit with scoring rubric). |

The agents integrate with each other — the Blog Writer reads SEO keyword data and the Growth Story System for brand voice, the ASO & Keyword Expert produces keyword lists that feed into the Apple Ads Analyzer, the Landing Page Expert uses Story System value props for messaging, the Pricing Expert validates against growth guardrails, and so on.

## Installation

```bash
# Step 1: Register the marketplace
/plugin marketplace add Beautiful-Engineering/agents

# Step 2: Install the plugin
/plugin install agents@beautiful-engineering
```

This makes all 11 agents and their skills available in any Claude Code session. Requires git access to the repo (private).

Then use any agent:
```bash
claude --agent growth-fundamentals
claude --agent seo-expert
claude --agent blog-writer
claude --agent landing-page-expert
claude --agent cold-email-outreach
claude --agent google-ads-expert
claude --agent apple-ads-analyzer
claude --agent aso-keyword-expert
claude --agent tiktok-marketing-expert
claude --agent pricing-expert
claude --agent copywriting-expert
```

## What's Inside

```
agents/
├── .claude-plugin/plugin.json        # Plugin manifest
├── agents/                           # 11 agent definitions
├── skills/                           # 61 distilled skill files
│   ├── growth-fundamentals/          # Foundational Five, catalysts, story system, etc.
│   ├── seo-expert/                   # Technical SEO, on-page, keywords, off-page, ongoing
│   ├── blog-writer/                  # Content briefs, writing craft, copywriting, SEO, distribution
│   ├── landing-page-expert/          # Page anatomy, conversion optimization, review checklist
│   ├── cold-email-outreach/          # Targeting, infrastructure, copy, Instantly, optimization
│   ├── google-ads-expert/            # Rubric, API, analysis, keywords, campaigns, ad copy
│   ├── apple-ads-analyzer/           # Rubric, API integration, analysis framework
│   ├── aso-keyword-expert/           # Listing optimization, keyword research, competitor analysis, audit rubric
│   ├── tiktok-marketing-expert/      # CLI, themes, batch, account setup, theme creation, posting
│   ├── pricing-expert/               # Value metric, structures, research, tiers, economics, page copy, audit
│   └── copywriting-expert/           # Persuasion frameworks, writing mechanics, copy types, swipe file, scoring
└── content/
    └── demand-curve/                 # 404 lessons across 53 courses
        ├── INDEX.md                  # Full curriculum index
        └── ...                       # Course directories + 982 images
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
| [Ahrefs MCP](https://ahrefs.com/api/mcp) | Keyword data, site audits, backlink profiles, competitor analysis (SEO Expert, Blog Writer) |
| [Google Ads MCP](https://github.com/google/ads-mcp) | Campaign data, keyword performance, ad group metrics (Google Ads Expert) |
| [Instantly MCP](https://instantly.ai) | Email campaign management, lead operations, analytics (Cold Email Outreach Expert) |
| Apple Search Ads API | Campaign performance data, keyword reports, search term mining (Apple Ads Analyzer) |

Agents work without these — they degrade gracefully to web search, manual inspection, and curriculum-based recommendations.

## License

MIT
