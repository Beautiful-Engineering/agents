# Campaign Optimization

Performance benchmarks, A/B testing methodology, funnel math, troubleshooting guide, and scaling playbook.

Source: `cold-email/07-measure-and-optimize-results.md`, `cold-outreach-partnerships-pr/07-bonus-measure-success-and-building-momentum.md`, `b2b-cold-outreach-partnerships-pr/07-bonus-measure-success-and-building-momentum-b2b.md`, `sales-strategy-fundamentals/04-outreach-math-setting-your-north-star.md`, `email-marketing-fundamentals/03-measuring-email-success.md`

---

## Performance Benchmarks

### Campaign Metrics (Conservative Estimates from 50+ Startups)

| Metric | Red Flag | Average | Good | Outstanding |
|--------|----------|---------|------|-------------|
| Open Rate | <20% | 20-30% | 30-50% | 50%+ |
| Reply Rate | <5% | 5-10% | 10-20% | 20%+ |
| Positive Reply Rate | <2% | 2-5% | 5-10% | 10%+ |
| Bounce Rate | >5% | 3-5% | 1-3% | <1% |
| Spam Complaint Rate | >0.3% | 0.1-0.3% | <0.1% | 0% |
| Meeting Booking Rate | <1% | 1-3% | 3-5% | 5%+ |

**Important**: These are percentages of initial emails SENT, not of opens or replies.

### Account Health Metrics

| Metric | Healthy | Warning | Critical |
|--------|---------|---------|----------|
| Sender Score | 80+ | 60-80 | <60 |
| Inbox Placement | 95%+ | 85-95% | <85% |
| Warmup Engagement | Positive trend | Flat | Declining |
| Blacklist Status | Clean | 1 minor list | Major list (Spamhaus, Barracuda) |

---

## The Diagnostic Framework

When metrics are below target, diagnose the problem layer. Issues cascade — always fix from the top down.

### Layer 1: Deliverability (Fix First)
**Symptoms**: Open rate <20%, declining over time
**Root causes**:
- DNS misconfiguration (SPF/DKIM/DMARC)
- Sending from un-warmed or burned domain
- Too-aggressive send volume
- Content triggering spam filters
- Poor list hygiene (high bounce rate)

**Diagnostic questions**:
- Are warmup metrics healthy?
- Is the domain on any blacklists?
- Have you checked inbox placement (GlockApps)?
- What's the bounce rate?
- Are you using the main domain (you shouldn't be)?

**Fixes**:
- Verify DNS records (SPF, DKIM, DMARC)
- Reduce send volume to 5-10/day temporarily
- Extend warmup period
- Remove HTML, images, and excess links from email
- Clean lead list (re-verify all emails)
- Check for spam trigger words in subject/body

### Layer 2: Subject Line
**Symptoms**: Open rate 20-30% (emails arriving but not being opened)
**Root causes**:
- Subject line too generic or spammy
- Subject line too long (truncated on mobile)
- "From" name not trustworthy
- Sending at wrong times

**Diagnostic questions**:
- Which subject line variants have the highest open rate?
- Are subjects under 50 characters?
- Is the "From" name a real person (not "Sales Team")?
- Are you sending Tuesday-Thursday, 10AM-2PM?

**Fixes**:
- A/B test 3 new subject lines (see copy-frameworks.md)
- Shorten to under 50 characters
- Use founder/CEO name as "From"
- Adjust sending schedule to optimal windows
- Try opaque subjects for curiosity (e.g., just "[Topic]")

### Layer 3: Body Copy
**Symptoms**: Good opens (30%+), low replies (<5%)
**Root causes**:
- Email too long (requires scrolling)
- Hook isn't compelling (first line fails to grab attention)
- No clear value proposition for the reader
- CTA too high-friction
- Feels like a mass email (no personalization)
- Wrong objection being handled (or none)

**Diagnostic questions**:
- Is the email under 5 sentences?
- Does the first line reference something specific about THEM?
- Is the CTA a low-friction ask?
- Are you addressing their #1 objection?
- Would YOU reply to this email?

**Fixes**:
- Cut email to 5 sentences max
- Rewrite first line to be specifically about the prospect
- Lower CTA friction ("Worth a 10-min chat?" not "Schedule a demo")
- Add or improve personalization
- A/B test a completely different archetype (not just tweaks)
- Handle the most common objection from customer interviews

### Layer 4: Targeting
**Symptoms**: Low opens AND low replies across all copy variants
**Root causes**:
- Wrong ICP (these people don't have the problem)
- Right ICP, wrong timing (no trigger event)
- Too broad (emailing anyone with a pulse)
- Wrong person at the right company (champion vs. decision-maker)

**Diagnostic questions**:
- Are replies including "not relevant to me" or "wrong person"?
- Are there NO replies at all (even negative)?
- Did you validate the ICP against actual customer data?
- Are you targeting based on trigger events?

**Fixes**:
- Re-interview best customers to validate ICP
- Narrow the list to a tighter segment
- Focus on trigger events (funding, hiring, tech changes)
- Test decision-makers vs. champions
- Try a completely different vertical/segment

### Layer 5: Offer & Qualification
**Symptoms**: Good replies, but conversations don't convert to meetings/deals
**Root causes**:
- CTA leads to wrong next step
- Discovery call isn't structured well
- Product-market fit issue (bigger problem than email can fix)
- Price/value misalignment
- Prospect is interested but not qualified

**Diagnostic questions**:
- What are people saying when they reply positively?
- What happens on the first call? Where do they drop off?
- Is the objection about price, timing, or fit?

**Fixes**:
- Change CTA to a lower-commitment first step
- Add a calendar link to reduce friction
- Improve discovery call structure (see below)
- Add qualification question in email ("If X is a priority...")
- Consider if the offer itself needs to change

---

## A/B Testing Methodology

### Phase 1: Small-Batch Archetype Test (100-150 emails)

1. Create 2-3 distinctly different email archetypes
2. Split ~100-150 emails evenly across archetypes (33-50 each)
3. Send over 1-2 weeks (maintain consistent daily volume)
4. Measure after 7-10 days (allow time for follow-ups)
5. Compare: reply rate, positive reply rate, meetings booked
6. **Winner = highest positive reply rate** (not just opens)

### Phase 2: Scale Winner (500-1,000 emails)

1. Take the winning archetype
2. Send to the rest of the list (500-1,000 emails)
3. Validate that metrics hold at larger scale
4. If metrics drop >30% at scale, the small batch may have been a fluke — retest

### Phase 3: Iterate on Winner

1. Now A/B test within the winning archetype:
   - Subject line variants (biggest impact on opens)
   - First line variants (biggest impact on replies)
   - CTA variants (biggest impact on meeting bookings)
2. Test ONE variable at a time
3. Sample size: minimum 50 emails per variant
4. Statistical significance: need at least 2 weeks of data

### What NOT to A/B Test
- Small word changes ("Hi" vs "Hey" — noise, not signal)
- Colors or formatting (plain text wins for cold email)
- Send time within optimal window (10AM vs 11AM — negligible)
- Multiple variables simultaneously (can't attribute the change)

---

## Funnel Math

### Working Backward from Revenue Goal

Use this template to calculate required email volume:

```
Revenue target: $_________ / month

Average deal value: $________

Required closes: Revenue ÷ Deal value = _____ closes/month

Close rate (meeting → deal): _____%
Required meetings: Closes ÷ Close rate = _____ meetings/month

Reply-to-meeting rate: _____%
Required positive replies: Meetings ÷ Reply-to-meeting rate = _____ replies/month

Reply rate (email → positive reply): _____%
Required emails sent: Replies ÷ Reply rate = _____ emails/month

Working days per month: 22
Required daily sends: Emails ÷ 22 = _____ emails/day

Accounts needed (at 30/day max each): Daily sends ÷ 30 = _____ accounts
```

### Example Calculations

**Scenario A: Early-Stage SaaS ($5K ACV)**
- Goal: $50K/month = 10 deals
- Close rate: 25% → need 40 meetings
- Reply-to-meeting: 50% → need 80 positive replies
- Reply rate: 8% → need 1,000 emails/month
- Daily: 45 emails/day → 2 accounts

**Scenario B: SMB SaaS ($1K ACV)**
- Goal: $20K/month = 20 deals
- Close rate: 30% → need 67 meetings
- Reply-to-meeting: 50% → need 134 positive replies
- Reply rate: 10% → need 1,340 emails/month
- Daily: 61 emails/day → 3 accounts

**Scenario C: Enterprise ($50K ACV)**
- Goal: $200K/month = 4 deals
- Close rate: 20% → need 20 meetings
- Reply-to-meeting: 40% → need 50 positive replies
- Reply rate: 5% → need 1,000 emails/month
- Daily: 45 emails/day → 2 accounts

---

## Cost Analysis

### Is Cold Email Profitable?

Calculate cost per acquisition:

```
Time per purchase (hours):
- Lead sourcing: ____ hours/week
- Email writing/personalization: ____ hours/week
- Sending + monitoring: ____ hours/week
- Reply handling + calls: ____ hours/week
- Total weekly hours: ____

Weekly costs:
- Labor: Total hours × $____/hour = $____/week
- Tools (Instantly, Apollo, etc.): $____/week
- Total weekly cost: $____

Weekly revenue from cold email:
- Deals closed per week: ____
- Revenue per deal: $____
- Total weekly revenue: $____

ROI: (Revenue - Cost) ÷ Cost × 100 = ____%
```

**Rule**: If cost per acquisition < customer lifetime value, scale. If not, improve conversion or try a different channel.

---

## Reply Handling Framework

### Reply Categories & Response Strategy

| Category | Signal | Response |
|----------|--------|----------|
| **Interested** | "Tell me more", "Let's chat", asks questions | Book meeting within 24 hours. Send calendar link. Be specific: "How's Thursday at 2pm?" |
| **Soft interest** | "Not right now", "Maybe later", "Send more info" | Add value (case study, resource). Follow up in 30 days. Don't push. |
| **Objection** | "Too expensive", "We use [competitor]", "Not a priority" | Handle the specific objection. If price: show ROI. If competitor: differentiate. If timing: respect it, follow up in 60 days. |
| **Wrong person** | "I'm not the right person", "Try [name]" | Thank them. Ask for intro. If they give a name, reach out referencing the introduction. |
| **Negative** | "Not interested", "Stop emailing", "Remove me" | Remove immediately. Thank them. Never email again. |
| **Out of office** | Auto-reply with return date | Note the return date. Follow up 2 days after they're back. |

### Discovery Call Structure (Post-Reply)

When a positive reply converts to a meeting (20-30 minutes):

**Opening (5 min)**
- Thank them for their time
- Set the agenda: "I'd love to learn about [their situation], share how we might help, and see if there's a fit."

**Discovery (10-15 min)**
- What's working with your current approach to [problem]?
- What's the biggest challenge you're facing with [area]?
- What have you tried so far?
- What does success look like for you in [timeframe]?
- What would make you say no to a solution?

**Your pitch (5-10 min)**
- Brief overview tailored to their answers
- Specific examples of similar companies you've helped
- Address any concerns that came up in discovery

**Next steps (2 min)**
- Propose a specific next step (trial, detailed proposal, technical demo)
- Get commitment on timeline

---

## Scaling Playbook

### When to Scale (All Must Be True)
- [ ] Reply rate consistently >5% (ideally >10%)
- [ ] Positive reply rate consistently >2%
- [ ] Bounce rate consistently <3%
- [ ] Spam complaint rate <0.1%
- [ ] At least 200 emails sent with current copy
- [ ] At least 2 weeks of stable performance data
- [ ] Conversion from reply → meeting is working
- [ ] Unit economics are positive (cost per deal < LTV)

### How to Scale

**Step 1: Add accounts (not per-account volume)**
- Never exceed 50/day per account
- Add 1-2 accounts at a time
- Warm each new account for 2-3 weeks before cold sending
- Rotate accounts across campaigns

**Step 2: Expand lead sourcing**
- Adjacent ICP segments (same problem, different vertical)
- Lower on the awareness ladder (move from dissatisfied users → competitor users → problem-aware)
- New lead sourcing channels (add community mining, event lists, competitor customers)

**Step 3: Clone winning campaigns for new segments**
- Don't modify the winning campaign
- Create new campaigns with the same archetype adapted for the new segment
- Test on 100-150 emails before scaling

**Step 4: Build a lead pipeline (not batches)**
- Set up ongoing sourcing (LinkedIn Sales Nav saved searches, Apollo alerts)
- Weekly lead batch upload
- Monthly list cleaning and re-verification
- Quarterly ICP review and expansion

### Scaling Red Flags (Pause and Investigate)
- Reply rate drops >30% from baseline → Copy fatigue or list quality decline
- Open rate drops below 20% → Deliverability issue from increased volume
- Bounce rate spikes above 3% → List quality problem
- Multiple replies saying "not relevant" → Targeting expanded too broadly
- Meeting-to-deal rate drops → Qualification issue, leads are less qualified at scale

---

## Monthly Campaign Review Template

```markdown
# Cold Email Campaign Review — [Month YYYY]

## Overall Metrics
| Metric | This Month | Last Month | Target | Status |
|--------|-----------|------------|--------|--------|
| Emails sent | | | | |
| Open rate | | | 30%+ | |
| Reply rate | | | 10%+ | |
| Positive replies | | | | |
| Meetings booked | | | | |
| Deals closed | | | | |
| Revenue attributed | | | | |
| Bounce rate | | | <3% | |
| Spam complaints | | | <0.1% | |
| Cost per meeting | | | | |
| Cost per deal | | | | |

## Campaign Breakdown
| Campaign | Sends | Opens | Replies | Meetings | Notes |
|----------|-------|-------|---------|----------|-------|
| | | | | | |

## What Worked
- [Key wins and learnings]

## What Didn't Work
- [Issues and their root causes]

## Next Month Plan
- [ ] [Action items for improvement]
- [ ] [New segments to test]
- [ ] [Infrastructure changes needed]
```
