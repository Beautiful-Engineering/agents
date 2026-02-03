# Measuring Email Success

You don't need fancy analytics. Focus on four metrics that actually matter:

### How to find these metrics in your ESP

**In MailerLite:**

- Go to Campaigns → [Your Campaign]
- Click "View report"
- Look for: Delivered, Opened, Clicked, Bounced
**In Mailchimp:**

- Go to Campaigns → [Your Campaign]
- Click "View report"
- Check the overview dashboard

### 1. Deliverability (most important)

**What it means:** Percentage of emails that reach inboxes (not spam folders)

**Good benchmarks:**

- 95%+ = Excellent
- 90-94% = Good
- Under 90% = Problem
**How to check:** Your ESP shows "delivery rate" in campaign reports.

**If deliverability is low:**

- Check if you're using a verified domain
- Avoid spam trigger words: "free," "urgent," "limited time," "act now"
- Clean your list—remove bounced emails immediately
- Don't buy email lists (ever)
**Domain and IP reputation matters:** New domains should be warmed gradually to build trust with email providers. Send to small, engaged batches first, then scale up based on performance.

**Simple domain/IP warming schedule:**

- **Day 1–3:** Send ~50 emails/day to your most engaged contacts (friends, team, active users)
- **Day 4–7:** Increase to ~200/day, still prioritizing people likely to open/click
- **Week 2:** Ramp up to ~500/day
- **Week 3+:** Gradually scale into the thousands if engagement remains healthy (20%+ opens, low bounces/complaints)
**Why this works:** Email providers track your sender reputation based on engagement rates, bounce rates, and spam complaints. Starting with your most engaged audience helps establish positive sending patterns before scaling to larger, less engaged segments.

### 2. Open rate

**What it means:** Percentage of delivered emails that were opened. (You should know that Apple Mail Privacy Protection (MPP) inflates opens. Benchmarks are useful, but clicks and conversions are more reliable metrics.)

**Good benchmarks:**

- Transactional emails: 40-80%
- Onboarding emails: 25-45%
- Win-back emails: 15-25%
- Promotional emails: 20-30%
**If open rates are low:**

- Test different subject lines (more on this in Lesson 4)
- Use a person's name as sender, not company name
- Send at different times (Tuesday-Thursday, 10am-2pm work well)
- Check your sender reputation

### 3. Click rate

**What it means:** Percentage of opened emails where someone clicked a link

**Good benchmarks:**

- Onboarding emails: 10-20%
- Win-back emails: 5-15%
- Promotional emails: 3-10%
**If click rates are low:**

- Use one clear call-to-action (not 5 different links)
- Make your CTA button stand out with contrasting colors
- Put your main CTA above the fold
- Improve your email copy (see Lesson 4)
- Ensure inline text links and images are clickable (all pointing to the main CTA URL). Many users click logos or graphics instinctively, so linking everything boosts CTR.

### 4. Conversion rate

**What it means:** Percentage of email clicks that turn into desired actions (signups, purchases, feature usage)

**How to track:** Set up UTM parameters on your email links:

- ?utm_source=email&utm_medium=campaign&utm_campaign=winback
- Then check Google Analytics → Acquisition → Campaigns
**Example UTM setup:**

- Win-back email: ?utm_campaign=winback_day7
- Onboarding email: ?utm_campaign=onboarding_welcome
- Product announcement: ?utm_campaign=feature_launch_nov2024

### Simple monthly review process

**First Monday of each month (15 minutes):**

- Check last month's email performance in your ESP
- Note any emails with unusually low open/click rates
- Look for patterns (certain subject lines, send times, content types)
- Plan 1-2 small tests for the upcoming month. As a helpful tip, keep a simple running doc of what was tested and how it performed. That way you can look back later and actually apply the learnings to future emails.
**Red flags to watch for:**

- Deliverability drops below 90%
- Open rates decline month-over-month
- Unsubscribe rate above 2% for any campaign
- Lots of replies saying emails went to spam

### When to clean your list

**Monthly:** Remove hard bounces (invalid email addresses) immediately

‍**Quarterly:** Move all subscribers who haven't opened an email in 6 months to a dormant list for less frequent but important updates. This way you protect deliverability without fully losing touch, especially for users still active with the product but not engaging with emails.

**How to clean in MailerLite:**

- Go to Subscribers → Segments
- Create segment: "Hasn't opened email in 180 days"
- Select all → Delete
This protects your sender reputation and improves deliverability.

**Goal:** Set up basic tracking and review your metrics monthly. Don't obsess over small changes—look for major problems or wins.