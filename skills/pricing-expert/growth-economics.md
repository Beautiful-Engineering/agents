# Growth Economics

ARPU-to-Target-CAC formula, payback periods, the Janz framework, and model-market/model-channel fit checks.

Source: `growth-guardrails/03-calculate-your-growth-economics.md`, `growth-guardrails-b2c/03-calculate-your-growth-economics-b2c.md`, `fit-mechanics-pairings/03-model-market-fit.md`, `fit-mechanics-pairings/04-model-channel-fit.md`

---

## The ARPU → Target CAC Formula

### Step 1: Calculate ARPU (Annual Revenue per User)

```
ARPU = Total Annual Revenue / Number of Paying Customers
```

- Use revenue, not profit (margin comes next)
- Exclude sales tax and refunds
- Early stage: estimate from current pricing and average behavior

**B2B examples**: $300/month x 12 = $3,600 ARPU | Transaction: $100 avg x 50/year = $5,000 ARPU

**B2C examples**: $20/month x 12 = $240 ARPU | Transaction: $150 avg x 3/year = $450 ARPU

### Step 2: Adjust for Gross Margin

```
Margin-adjusted ARPU = ARPU x Gross Margin
```

Example: $9,000 ARPU x 80% = $7,200 margin-adjusted ARPU

This is the pool available to pay back CAC over time.

### Step 3: Map Revenue Timing

Create a 12-month revenue timing table. Not all revenue arrives evenly.

Account for delays:
- Free trials (30 days)
- Freemium-to-paid lag
- Usage-based ramp over first months
- Sales velocity (lead acquisition → close)

**Front-loaded** revenue → supports shorter payback (3 months)
**Back-loaded** revenue → requires longer payback (6-12+ months)

### Step 4: Choose Payback Period

| Payback | B2B Guidance | B2C Guidance |
|---------|-------------|-------------|
| **3 months** | Bootstrapped B2B prioritizing efficiency | Bootstrapped consumer prioritizing efficiency |
| **6 months** | Healthy target for most B2B selling to SMBs/startups | Target ceiling for consumer tech |
| **12+ months** | Enterprise B2B with multi-year contracts (18 months = healthy) | Generally not advised unless heavily funded for market grab |

### Step 5: Convert to Target CAC

```
Target CAC = ARPU x Gross Margin x (Payback Months / 12)
```

**B2B Example**: $12,000 ARPU x 80% x (6/12) = **$4,800 Target CAC**

**B2C Example**: $1,000 ARPU x 80% x (6/12) = **$400 Target CAC**

### Quick Mental Math

| Payback | ARPU:CAC Ratio |
|---------|---------------|
| 3 months | 4:1 |
| 6 months | 2:1 |
| 12 months | 1:1 |
| 18 months | 0.67:1 |

### Step 6: Set Growth Budget

Three frameworks:
- **Target-based (top-down)**: Budget = Target Customers x Target CAC
- **Runway-constrained (bottom-up)**: 10-20% of operating expenses allocated to growth
- **Revenue % (steady-state)**: 5-20% of annual revenue

---

## The Janz Framework (Model-Market Fit)

Christoph Janz's framework for $100M ARR businesses:

| Animal | Customers Needed | ARPU |
|--------|-----------------|------|
| **Elephants** | 1,000 | $100K+/year |
| **Moose** | 10,000 | $10K+/year |
| **Rabbits** | 100,000 | $1K/year |
| **Mice** | 1,000,000 | $100/year |
| **Flies** | 10,000,000 | $10/year |

### Goal Feasibility Check

```
Required Market Share % = ARR Goal / (ARPU x Total Potential Customer Base)
```

Any predicted market share >5-10% in the first few years raises eyebrows. Context-dependent but a flag worth investigating.

### Fit Assessment

- Are you commanding the price point you need in real testing?
- If ARPU is 50%+ below target, investigate: could point to Product-Market Fit issues
- Order-of-magnitude alignment matters more than precision

---

## Model-Channel Fit

Your model determines ARPU; channels have inherent cost bands. You must design your model to align with default channel costs.

### Channel CAC Bands by Acquisition Motion

| Motion | CAC Level | Description |
|--------|----------|-------------|
| **Virality** | Lowest | Pull/push/incentivized virality, word-of-mouth. Requires free or very low-value models. |
| **Content** | Low-Medium | Wide "model tolerance" — supports both low-ARPU (UGC SEO) and high-ARPU (content marketing for complex products). |
| **Paid Media** | Medium | Requires sufficient ARPU to support ad costs. Not so high that it creates too much consideration friction. |
| **Sales** | Highest | Requires high ARPU to support sales teams and longer cycles. |

### Model-Channel Fit Assessment

Three tests:
1. **ARPU > CAC**: Can you acquire customers through chosen channels at or below target CAC?
2. **Scalability Test**: Does CAC hold as you increase spend? Many channels work small but break at scale.
3. **Payback Period**: Do customers from specific channels pay back within target timeframe?

---

## B2B vs B2C Differences

| Factor | B2B | B2C |
|--------|-----|-----|
| **ARPU metric** | ARPU (or LTV for enterprise with multi-year contracts) | ARPU (or ARPMAU for ad-driven) |
| **Typical ARPU** | $3,600-$100K+ | $100-$1,000 |
| **Payback norms** | 6-18 months | 3-6 months |
| **CAC tolerance** | Higher (supports sales motion) | Lower (needs efficient self-serve) |
| **Budget frameworks** | Target-based or revenue % | Runway-constrained or revenue % |

---

## Deliverable Template

```markdown
## Growth Economics

### ARPU Calculation
- Annual revenue per customer: $[X]
- Gross margin: [X]%
- Margin-adjusted ARPU: $[X]

### Revenue Timing
- Revenue profile: [front-loaded / even / back-loaded]
- Key delays: [trials, ramp, sales cycle]

### Payback & Target CAC
- Payback period: [X] months
- Target CAC: $[X]
- ARPU:CAC ratio: [X]:1

### Janz Framework Position
- Animal category: [elephant / moose / rabbit / mouse / fly]
- Required market share for goal: [X]%
- Feasibility: [feasible / stretch / red flag]

### Model-Channel Fit
| Channel | Estimated CAC | vs. Target CAC | Viable? |
|---------|--------------|----------------|---------|
| [channel] | $[X] | [above/below/at] | [yes/no] |

### Growth Budget
- Framework used: [target-based / runway-constrained / revenue %]
- Budget: $[X] over [period]
```
