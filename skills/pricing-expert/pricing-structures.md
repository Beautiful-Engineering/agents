# Pricing Structures & Timing

The five common monetization structures, six timing options, three monetization motions, and how to select the right combination.

Source: `monetization-pricing-strategy/04-how-when-to-charge.md`, `identify-your-monetization-motion/01-monetization-motions-intro.md`

---

## Two Rules of Thumb

1. **Keep your structure simple** — Max four tiers. "Don't make me think" applies to pricing too.
2. **Don't innovate for the sake of being different** — If your industry has a standard structure, deviating introduces friction. Unless model innovation is core to your thesis.

---

## Five Monetization Structures

| Structure | What It Is | Pros | Cons |
|-----------|-----------|------|------|
| **Usage-based** | Charge for customers' use of or transactions with your product | Double growth rate vs. flat-fee; aligns with value props; low initial friction | Requires significant data; risky if wrong; taxi-meter effect; less predictable revenue |
| **Tiered** | Multiple pricing tiers — pricier = more value | Simpler to start than pure usage-based; encourages upgrades; highlights feature set | Less revenue potential than usage-based; decision friction at purchase; tiers compete against each other |
| **Flat-rate** | One price for all buyers | Simple; transparent; avoids subscription fatigue | Doesn't factor in personas; high initial friction if sizable upfront cost |
| **Per-user** | Charge per user or seat | Simple; transparent; predictable revenue | Misaligned if seats don't add unique value; doesn't factor personas; seats get shared |
| **Variable** | Pricing varies (e.g. negotiated enterprise deals) | Flexibility for variable costs | Lacks transparency; adds sales complexity; risk of inefficiency |

### Usage-Based (Gold Standard)

- 45% of SaaS companies use usage-based pricing (up from 34% in 2020)
- Most direct connection between product value and price
- **Best when**: Built-in stickiness and repeatable, consistent usage
- **Caution**: Don't jump in without sufficient data and data analytics. Need to know what metric is worth, what it's worth by segment, and how to forecast it

### Per-User Combinations

Per-user works best when individual seats offer unique value. Recommended to pair with another structure:
- **Per-user + tiered** — Reduces taxi-meter salience
- **Per-user + usage-based** — Charge for active users (not all users), or use add-ons

---

## Six Timing Options

| Timing | What It Is | Pros | Cons | Best When |
|--------|-----------|------|------|-----------|
| **Up-front** | Pay before use (one-time or first term) | Front-loaded cash flow; filters unserious buyers | High friction | Strong brand trust; immediate value realization |
| **Monthly recurring** | Charge every month | Low friction; fast learnings | More churn exposure; billing ops | PLG with frequent value moments; shorter payback targets |
| **Annual recurring** | Charge every year | Better cash; higher commitment | Higher friction; longer sales | Strong retention; budget cycles; enterprise |
| **Per-transaction** | Pay each use/event | Price maps to value; easy to start | Volatile revenue; taxi-meter risk | Clear transactions (orders, tickets, API calls) |
| **Free trial** | Free for 14-30 days | Reduces friction to activation | Pushes payback out; attracts tourists | Short time-to-value; easy onboarding |
| **Freemium** | Free tier with limits; pay later | Huge top-funnel; compounding | Attracts non-buyers; support burden | Clear upgrade path; usage correlates with value |

**Trial vs. Freemium**: A trial is temporary time-limited access to the full product. Freemium is permanent but limited access. They feel similar up front but behave very differently for retention and monetization.

---

## Three Monetization Motions

| Motion | Best When | Weak Fit When | Alignment Notes |
|--------|----------|---------------|-----------------|
| **Product-led (PL)** | ARPU <$1k, simple onboarding, PL/viral/content acquisition | Enterprise ARPU or complex products | Matches fast acquisition + low-friction entry |
| **Sales-led (SL)** | ARPU >$5k, complex product, enterprise buyers | Consumer/SMB with short payback needs | Pairs with slower, high-context acquisition |
| **Hybrid** | Mixed customer base (SMB + Enterprise) | Early stage (too heavy to run both) | Flexible but costly — needs resourcing |

### Motion Selection Questions

- **ARPU / Guardrails**: Can your ARPU support sales reps? Or does it require fast self-serve conversions?
- **Product Complexity**: Can customers adopt without help? (PL) Or do they need education/onboarding? (SL)
- **Acquisition Motion Alignment**: Fast, low-context acquisition (Paid, Virality) → PL monetization. Slower, high-context (Sales) → SL monetization.

---

## Structure-Timing Selection Matrix

Start from three anchors:

### 1. Value Metric ("What")
- Value scales with usage → **Usage-based** (or tiered bands of the metric)
- Value scales with scope/features → **Tiered** (feature + limits)
- Value realized at a moment in time → **Per-transaction** (or up-front)

### 2. Guardrails ("Can we afford it?")
- Tight cash → **Monthly** (or up-front discounts for annual prepay)
- Long runway / enterprise budgets → **Annual**

### 3. Monetization Motion ("How we sell")
- Product-led → Low-friction timing (freemium or trial), simple bands or usage tiers
- Sales-led → Annual or multi-year, tiered + variable for enterprise
- Hybrid → PLG-friendly core (freemium/trial + tiered) with enterprise contracts layered in

---

## Deliverable Template

```markdown
## Structure & Timing Decision

### Selected Structure: [usage-based / tiered / flat-rate / per-user / variable / hybrid]
- Rationale: [why this fits the value metric]

### Selected Timing: [up-front / monthly / annual / per-transaction / trial / freemium]
- Rationale: [why this fits guardrails and motion]

### Monetization Motion: [product-led / sales-led / hybrid]
- Rationale: [ARPU range, product complexity, acquisition motion alignment]

### Alignment Check
- Value metric → structure: [aligned / misaligned — explain]
- Guardrails → timing: [aligned / misaligned — explain]
- Motion → structure+timing: [aligned / misaligned — explain]
```
