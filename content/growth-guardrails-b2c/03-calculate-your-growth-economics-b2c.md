# Calculate your growth economics

Alright, now onto the third and final component of your Growth Guardrails: your growth economics.

Think of it as the financial “physics” of your growth engine—the math that determines what is and isn’t viable.

You’ve already brushed up against these concepts in the Foundational Five and in your Fit Mechanics & Pairings work, especially when exploring model–channel fit. Now we’re taking that groundwork and turning it into hard guardrails that will shape every acquisition decision you make.

This section walks you through:

- Calculating **annual revenue per user/customer (ARPU),**
- Adjusting for **gross margin**,
- Mapping **revenue timing**,
- Choosing a **payback period**, and
- Converting that into a **Target Customer Acquisition Costs (CAC)**
- And determining your **growth budget**

## **Calculate Your ARPU and Target CAC (Guardrails)**

Before you pick motions or channels, you need financial guardrails. Two of the most important are **ARPU** (annual revenue per user) and your **Target CAC** (the most you can spend to acquire a paying customer while staying within your cash and payback constraints).

**Important:** ARPU is our metric of choice for consumer SaaS/subscription and transactional models. However, an ad-driven model (social media platforms, media companies, etc.) will need to use a metric like **ARPMAU** (average annual revenue per monthly active user).

### **Step 1: Calculate ARPU (Annual Revenue per User)**

ARPU = total annual revenue ÷ number of paying customers (for that year)

- Use *revenue*, not profit, here. We’ll apply gross margin in the next step.
- Ensure revenue is not counting sales tax or refunds.
- If you’re very early stage (no stable 12-month data set yet), estimate ARPU directionally from your current pricing and average behavior (e.g., average orders/year × average order value; or plan price × expected paid months).
**Example (subscription):**

$20/month × 12 months = **$240 ARPU**

**Example (transactional):**

Average order value $150; avg. of 3 transactions per year  → **$450 ARPU**

### **Step 2: Adjust for Gross Margin**

Revenue isn’t cash you can deploy. Subtract COGS (cost of goods sold) via your gross margin to see what’s actually available to fund acquisition.

Gross Margin = (Revenue – COGS) ÷ Revenue

Margin-adjusted ARPU = ARPU × Gross Margin

**Example:**

ARPU $240 × 80% = **$192 margin-adjusted ARPU**

This is the pool you’re drawing from to pay back CAC over time.

### **Step 3: Map Your Revenue Timing**

Not all revenue arrives evenly. Your ability to hit a 3-, 6-, or 12-month payback depends on *when* margin-adjusted revenue shows up.

Create a simple 12-row table for a typical customer’s first year:

.tg  {border-collapse:collapse;border-spacing:0;}
.tg td{border-color:black;border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:14px;
  overflow:hidden;padding:10px 5px;word-break:normal;}
.tg th{border-color:black;border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:14px;
  font-weight:normal;overflow:hidden;padding:10px 5px;word-break:normal;}
.tg .tg-cly1{text-align:left;vertical-align:middle}
.tg .tg-amwm{font-weight:bold;text-align:center;vertical-align:top}

  
    Month
    Revenue
    Gross Margin
    Margin-Adjusted Revenue
  

  
    1 (free trial)
    $0
    80%
    $0
  
  
    2
    $20
    80%
    $16
  
  
    3
    $20
    80%
    $16
  
  
    …
    …
    …
    …
  
  
    12
    $20
    80%
    $16
  

**Front-loaded** revenue (e.g., one-time purchase) can support shorter payback (e.g., 3 months).

**Back-loaded** revenue (e.g., freemium → slow conversion, or usage ramp-up) cannot. Choose payback accordingly.

Account for delays like:

- Free trials (30 days)
- Freemium to paid lag
- Usage-based ramp over first months

### **Step 4: Choose a Realistic Payback Period**

Your **payback period** is how long it takes margin-adjusted revenue to recover CAC. Shorter payback = faster reinvestment and lower cash risk.

**Common options (guidance):**

- **3 months:** Best for boostrapped consumer startups that are prioritizing efficiency over scale.
- **6 months:** For consumer tech startups, we generally want to be under a 6-month payback in order to keep enough cash coming back to fund high-velocity acquisition motions.
- **12+ months:** Generally not advised for consumer products unless the strategy is rooted in grabbing market share as quickly as possible and they’re heavily funded.
**Cash reality check:** If your revenue timing table doesn’t deliver enough margin within your chosen window, extend payback or revisit pricing/plan design.

### **Step 5: Convert Payback into a Numeric Target CAC**

This turns your guardrails into an actionable ceiling for channel testing using a simple formula:

Target CAC = ARPU × Gross Margin × (Payback Months ÷ 12)

**Example:**

ARPU $1,000, Gross Margin 80%, Payback 6 months →

Target CAC = 1,000 × 0.8 × (6/12) = **$400**

Use this as the **maximum** blended CAC when you evaluate motions/channels. If a tactic persistently exceeds your Target CAC, you either need to improve funnel economics or pick another tactic.

### **Equivalents (helpful mental math)**

- 3-month payback ≈ **4:1 ARPU:CAC**
- 6-month payback ≈ **2:1 ARPU:CAC**
- 12-month payback ≈ **1:1 ARPU:CAC**
*These bands are a reflection of your chosen payback period.*

**Important reminder:** Use your month-by-month timing table as the **source of truth**. The formula above is a quick proxy when revenue is roughly even; if revenue is back-loaded (freemium, long ramps), ensure **cumulative margin-adjusted revenue hits your payback and CAC targets.**

### **Step 6: Set a Growth Budget**

Your **budget** is the final guardrail. It tells you how much fuel you can put into your growth engine over the next few months.

There’s no single “right” number, but you need a **clear band** to make strategic choices. A team with $5k to spend will design a very different engine than one with $50k or $500k.

### **Three simple frameworks**

- **Target-Based Budget (top-down)** 

- If you have a **clear milestone** (e.g., acquire 500 customers in 3 months):
- Budget = Target Customers × Target CAC
- *Example:* 500 customers × $100 CAC = **$50,000 budget**.
- If this math is impossible with your resources, you now know: your **goal, CAC, or funding** must change.

- **Runway-Constrained Budget (bottom-up)** 

- If you’re **bootstrapped or pre-revenue**, survival is your constraint.
- Look at: 

- Current burn rate
- Cash runway (months left before 0)

- Decide what % of OPEX you can reallocate to growth without shortening runway below safe levels (e.g., 10–20%).
- *Example:* $250k runway for 12 months → allocate 15% (~$40k) for growth.

- **Revenue % Budget (steady-state)** 

- If you already have stable revenue, peg growth spend to revenue.
- Rule of thumb: **5–20% of annual revenue** in early-stage companies.
- *Example:* $1M projected revenue → $50k–$200k growth budget.

**Takeaway:** Whether you use a target, runway math, or % of revenue, the goal is to lock in an actual number. It doesn’t need to be precise for our purposes right now. Your budget band provides the final guardrail, or filter, we’ll use when evaluating viable growth engines and tactics.

## **Record These Guardrails in Your **[**Master Strategy Project**](https://demandcurve.notion.site/Master-Strategy-Project-256f852211328013897fc2aa816684c6?source=copy_link)

Capture the fields you’ll reuse across Part 3:

- **ARPU (revenue)**
- **Gross Margin (%)**
- **Payback Target (months)**
- **Target CAC ($)**
- **Budget**

## **Bonus Lesson: How to Calculate Your *Actual* CAC**

Once you start running growth efforts, you’ll need to track whether your CAC is **on target**.

Here’s how to calculate it properly:

### **Define Who Counts**

Only include **net new paying customers** in the denominator. Not trials, leads, or free users.

### **Define Timeframe**

Make sure your acquisition costs **align with when users converted**. If your trial takes 30 days, don’t count marketing spend and conversions in the same week.

### **Fully Load Your Costs**

Include:

- Channel spend (ads, sponsorships)
- Team costs (salaries, % allocations)
- Tools + platforms
- Creative, production, landing pages
- Support or engineering for pre-conversion users (if applicable)

### **Consider Cohort-Based CAC**

Track CAC at the cohort level (e.g. Jan customers, Feb customers). This lets you:

- Account for delays
- Spot changes in CAC over time
- Compare channel efficiency
If you’re consistently exceeding your Target CAC, you need to adjust either your funnel or your payback expectations.

## **What You Now Have**

- A clear growth goal
- A realistic understanding of your constraints
- A margin-adjusted revenue forecast
- A CAC payback window that fits your cash flow and revenue profile
- A target CAC that will guide your channel and motion selection
You now have the qualitative and quantitative guardrails for your growth engine.

Up next, you’ll choose the **core motions** that define how your growth system actually works: acquisition, conversion, and retention/monetization.