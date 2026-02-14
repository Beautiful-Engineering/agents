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

**Important notes:** 

- ARPU is our metric of choice for B2B startups selling to SMBs and other startups. While it’s common to use life-time-value (LTV) when calculating growth economics, that’s risky for startups largely because they have no idea what their LTV is. 
- B2B startups selling into enterprises, however, may be better off using LTV if their model is driven by multi-year contracts (where LTV can be more reliably predicted) or high retention/expansion revenue, where ARPU grossly underrepresents the long-term account value.
- An ad-driven model (e.g. B2B media companies) will need to use a metric like **ARPMAU** (annual revenue per monthly active user).
‍

### **Step 1: Calculate ARPU (Annual Revenue per User)**

ARPU = total annual revenue ÷ number of paying customers (for that year)

- Use *revenue*, not profit, here. We’ll apply gross margin in the next step.
- Ensure revenue is not counting sales tax or refunds.
- If you’re very early stage (no stable 12-month data set yet), estimate ARPU directionally from your current pricing and average behavior (e.g., average orders/year × average order value; or plan price × expected paid months).
**Example (subscription):**

$300/month × 12 months = **$3,600 ARPU**

**Example (transactional):**

Average transaction value of $100; avg. of 50 transactions/year  → **$5,000 ARPU**

### **Step 2: Adjust for Gross Margin**

Revenue isn’t cash you can deploy. Subtract COGS (cost of goods sold) via your gross margin to see what’s actually available to fund acquisition.

Gross Margin = (Revenue – COGS) ÷ Revenue

Margin-adjusted ARPU = ARPU × Gross Margin

**Example:**

ARPU $9,000 × 80% = **$7,200 margin-adjusted ARPU**

This is the pool you’re drawing from to pay back CAC over time.

### **Step 3: Map Your Revenue Timing**

Not all revenue arrives evenly. Your ability to hit a 3-, 6-, or 12-month payback depends on *when* margin-adjusted revenue shows up.

Create a simple 12-row table for a typical customer’s first year:

  .revenue-table {
    width: 100%;
    max-width: 600px;
    border-collapse: collapse;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    font-size: 14px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  }
  
  .revenue-table th {
    background-color: #2c3e50;
    color: white;
    padding: 12px;
    text-align: left;
    font-weight: 600;
  }
  
  .revenue-table td {
    padding: 10px 12px;
    border-bottom: 1px solid #e0e0e0;
  }
  
  .revenue-table tr:last-child td {
    border-bottom: none;
  }
  
  .revenue-table tr:nth-child(even) {
    background-color: #f8f9fa;
  }
  
  .revenue-table tr:hover {
    background-color: #e9ecef;
  }
  
  .revenue-table td:nth-child(2),
  .revenue-table td:nth-child(4) {
    font-weight: 600;
  }

  
    
      Period
      Revenue
      Margin
      Profit
    
  
  
    
      Month 1 (lead acquired)
      $0
      80%
      $0
    
    
      Month 2 (sales process)
      $0
      80%
      $0
    
    
      Month 3
      $2,000
      80%
      $1,600
    
    
      Month 4
      $2,000
      80%
      $1,600
    
    
      ...
    
    
      Month 11
      $3,500
      80%
      $2,800
    
    
      Month 12
      $3,500
      80%
      $2,800
    
  

**Front-loaded** revenue (e.g., one-time purchase) can support shorter payback (e.g., 3 months).

**Back-loaded** revenue (e.g., freemium → slow conversion, long sales process, etc.) cannot. Choose payback accordingly.

Account for delays like:

- Free trials (30 days)
- Freemium to paid lag
- Usage-based ramp over first months
- Sales velocity

### **Step 4: Choose a Realistic Payback Period**

Your **payback period** is how long it takes margin-adjusted revenue to recover CAC. Shorter payback = faster reinvestment and lower cash risk.

**Common options (guidance):**

- **3 months:** Best for boostrapped B2B companies that prioritize efficiency over scale. Generally requires front-loaded revenue profiles and product-led monetization motions (note: you’re about to learn more about monetization motions in the next module).
- **6 months:** A healthy target for most B2B tech startups selling to SMBs and other startups. Provides enough room to invest in customer acquisition without straining cash flow.
- **12+ months:** For B2B startups selling to enterprises, a payback period with 18 months is generally considered healthy.  
**Cash reality check:** If your revenue timing table doesn’t deliver enough margin within your chosen window, extend payback or revisit pricing/plan design.

### **Step 5: Convert Payback into a Numeric Target CAC**

This turns your guardrails into an actionable ceiling for channel testing using a simple formula:

Target CAC = ARPU × Gross Margin × (Payback Months ÷ 12)

**Example:**

ARPU $12,000, Gross Margin 80%, Payback 6 months →

Target CAC = $12,000 × 0.8 × (6/12) = **$4,800**

Use this as the **target** CAC when you evaluate channels.

### **Equivalents (helpful mental math)**

- 3-month payback ≈ **4:1 ARPU:CAC**
- 6-month payback ≈ **2:1 ARPU:CAC**
- 12-month payback ≈ **1:1 ARPU:CAC**
- 18-month payback ≈ **.67:1 ARPU:CAC**
*These bands are a reflection of your chosen payback period.*

**Important reminder:** Use your month-by-month timing table as the **source of truth**. The formula above is a quick proxy when revenue is distributed evenly; if revenue is back-loaded (freemium, long ramps), ensure **cumulative margin-adjusted revenue hits your payback and CAC targets.**

### **Step 6: Set a Growth Budget**

Your **budget** is the final guardrail. It tells you how much fuel you can put into your growth engine over the next few months.

There’s no single “right” number, but you need a **clear band** to make strategic choices. A team with $5k to spend will design a very different engine than one with $50k or $500k.

### **Three simple frameworks**

- **Target-Based Budget (top-down)** 

- If you have a **clear milestone** (e.g., land 5 accounts in 3 months):
- Budget = Target Customers × Target CAC
- *Example:* 5 customers × $10,000 CAC = **$50,000 budget**.
- If this math is impossible with your resources, you now know: your **goal, CAC, or funding** must change.

- **Runway-Constrained Budget (bottom-up)** 

- If you’re **bootstrapped or pre-revenue**, survival is your constraint.
- Look at: 

- Current burn rate
- Cash runway (months left before 0)

- Decide what % of operating expenses you can reallocate to growth without shortening runway below safe levels (e.g., 10–20%).
- *Example:* $500k runway for 12 months → allocate 15% (~$75k) for growth.

- **Revenue % Budget (steady-state)** 

- If you already have stable revenue, peg growth spend to revenue.
- Rule of thumb: **5–20% of annual revenue** in early-stage companies.
- *Example:* $1M projected revenue → $50k–$200k growth budget.

👉 **Takeaway:** Whether you use a target, runway math, or % of revenue, the goal is to lock in an actual number. It doesn’t need to be precise for our purposes right now. Your budget band provides the final guardrail, or filter, we’ll use when evaluating viable growth engines and tactics.

‍

## **Record These Guardrails in Your **[**Master Strategy Doc**](https://demandcurve.notion.site/Master-Strategy-Project-256f852211328013897fc2aa816684c6?source=copy_link)

Capture the fields you’ll reuse across Part 4:

- **ARPU (revenue)**
- **Gross Margin (%)**
- **Payback Target (months)**
- **Target CAC ($)**
- **Budget**

## **Bonus: Why We Use ARPU:CAC (Not LTV:CAC) at This Stage**

Early-stage companies rarely know true LTV (it can take years to observe). Using **ARPU** (one-year revenue) avoids guessing and keeps cash discipline front-and-center. If you *do* have reliable LTV, convert the logic accordingly (e.g., 3–4:1 LTV:CAC for short payback, 4–5:1 for longer payback).