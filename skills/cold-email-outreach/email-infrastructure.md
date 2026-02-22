# Email Infrastructure & Deliverability

Subdomain strategy, DNS configuration, domain warming, volume planning, deliverability monitoring, and CAN-SPAM compliance.

Source: `cold-email/06-sending-cold-emails.md`, `cold-outreach-partnerships-pr/05-cold-email-specific-infrastructure.md`, `b2b-cold-outreach-partnerships-pr/05-cold-email-specific-infrastructure-b2b.md`, `email-marketing-fundamentals/03-measuring-email-success.md`

---

## The Infrastructure Rule

Deliverability is 80% of cold email success. A perfect email in the spam folder is worth nothing. Set up infrastructure BEFORE writing a single word of copy.

---

## Subdomain Strategy (CRITICAL)

**NEVER send cold email from your main domain.** If cold email goes wrong, it can tank your main domain reputation — affecting all business email (support, invoices, team communication).

### Setup

| Purpose | Domain | Example |
|---------|--------|---------|
| Main business email | `company.com` | hello@company.com |
| Cold outreach | `outreach.company.com` | founder@outreach.company.com |
| Partnerships | `partnerships.company.com` | team@partnerships.company.com |
| High-volume alternative | `company.co` or `company.io` | founder@company.co |

### Configuration Steps
1. **Create subdomain** in DNS settings (e.g., `outreach.company.com`)
2. **Set up separate email hosting** for the subdomain (Google Workspace, Microsoft 365, or custom SMTP)
3. **Configure authentication records** for the subdomain specifically:
   - **SPF record**: Specifies which mail servers can send email for this domain
   - **DKIM record**: Adds a digital signature to emails for verification
   - **DMARC record**: Policy for handling emails that fail SPF/DKIM checks
4. **Use different IP addresses** from your main domain if possible

### Why Subdomains Protect You
- If cold emails trigger spam complaints, only the subdomain reputation suffers
- Your main domain continues to deliver normally
- You can spin up new subdomains if one gets burned
- Each subdomain builds its own reputation independently

---

## DNS Authentication (Non-Negotiable)

### SPF (Sender Policy Framework)
- **What it does**: Tells receiving servers which IPs are allowed to send email for your domain
- **DNS record type**: TXT
- **Example**: `v=spf1 include:_spf.google.com ~all`
- **Common mistake**: Having multiple SPF records (only one allowed per domain)

### DKIM (DomainKeys Identified Mail)
- **What it does**: Adds a cryptographic signature to every email you send
- **DNS record type**: TXT (usually under a `selector._domainkey` subdomain)
- **Setup**: Generate via your email provider (Google Workspace, Microsoft 365, or Instantly)
- **Verify**: Use MXToolbox or mail-tester.com to confirm DKIM is passing

### DMARC (Domain-based Message Authentication, Reporting & Conformance)
- **What it does**: Tells receiving servers what to do when SPF/DKIM fail
- **DNS record type**: TXT
- **Start with**: `v=DMARC1; p=none; rua=mailto:dmarc@company.com` (monitoring only)
- **Graduation path**: `p=none` → `p=quarantine` → `p=reject` (increase strictness as confidence grows)

### Verification Checklist
- [ ] SPF record configured and passing
- [ ] DKIM record configured and passing
- [ ] DMARC record configured (start with `p=none`)
- [ ] Test with mail-tester.com (aim for 9+/10 score)
- [ ] Test with MXToolbox DMARC lookup
- [ ] Send test email to Gmail and check "Show Original" for auth results

---

## Domain Warming (3-Week Process)

New domains and email accounts have NO reputation. Sending cold emails from a brand-new account will almost certainly land in spam. Warming builds reputation gradually.

### Week 1: Personal Emails (5-8/day)
- Send to friends, family, colleagues who WILL reply
- Have real back-and-forth conversations (not one-way sends)
- Open, click, and reply to emails sent TO this account
- Goal: Build positive engagement signals with email providers

### Week 2: Business Emails to Warm Contacts (10-15/day)
- Send to existing customers, partners, past colleagues
- Share genuinely useful content or follow up on real conversations
- Continue the reply threads from Week 1
- Mix of Gmail, Outlook, Yahoo recipients (inbox provider diversity)

### Week 3: Begin Cold Outreach (5-10/day)
- Start with highly targeted, well-researched prospects (best chance of replies)
- Monitor response rates closely (aim for 15%+ in this first batch)
- If reply rate drops below 10%, return to warming
- Gradually increase volume: 5 → 10 → 15 → 20 per day over the next 2 weeks

### Automated Warming Tools
- **Instantly's built-in warmup**: Included with Instantly subscription — sends emails between real accounts in their warming network
- **Mailwarm**: $15/month standalone warming
- **Lemwarm**: $25/month with Lemlist integration

### Warming Red Flags (Go Back to Lower Volume)
- Emails landing in spam folder (check by sending to your own Gmail)
- Reply rate dropping below 10%
- Bounce rate above 3%
- Spam complaint notifications

---

## Volume Planning

### Per-Account Limits

| Account Age | Max Daily Sends | Notes |
|------------|----------------|-------|
| Week 1-2 (new) | 5-10 | Warming phase only |
| Week 3-4 | 15-20 | First cold emails |
| Month 2+ | 30-50 | Steady state — do not exceed |
| Absolute maximum | 50/day | Higher volume = higher spam risk |

**Gmail hard limit**: 2,000 emails/day per account (but you should NEVER approach this for cold email)

### Multi-Account Strategy
To send more volume, add more accounts — don't increase per-account volume.

| Daily Target | Accounts Needed | Per-Account Volume |
|-------------|----------------|-------------------|
| 30/day | 1-2 | 15-30 each |
| 50/day | 2-3 | 20-25 each |
| 100/day | 3-5 | 20-30 each |
| 200/day | 5-8 | 25-30 each |

### Sending Schedule
- **Best days**: Tuesday, Wednesday, Thursday
- **Best times**: 10 AM - 2 PM in recipient's timezone
- **Spread sends**: Don't batch. Space emails 5-15 minutes apart.
- **Never send all at once** — looks automated to email providers

### Ramp-Up Schedule for New Campaigns
| Week | Daily Volume | Notes |
|------|-------------|-------|
| 1 | 10-15 | Monitor deliverability closely |
| 2 | 15-25 | Check open rates, adjust if low |
| 3 | 25-35 | Should be at steady state if metrics are healthy |
| 4+ | 35-50 | Maximum per account — add accounts to scale further |

---

## Deliverability Monitoring

### Key Metrics to Watch

| Metric | Healthy | Warning | Critical |
|--------|---------|---------|----------|
| Bounce rate | <1% | 1-3% | >3% (stop sending) |
| Spam complaint rate | <0.1% | 0.1-0.3% | >0.3% (stop sending) |
| Open rate | 30%+ | 20-30% | <20% (deliverability issue) |
| Inbox placement | 95%+ | 85-95% | <85% (investigate) |

### Monitoring Tools
- **Instantly warmup analytics**: Account-level health metrics
- **Gmail Postmaster Tools**: Gmail-specific delivery metrics (free)
- **GlockApps (Glock)**: Inbox vs. spam folder placement testing
- **mail-tester.com**: Pre-campaign spam score (free, 3 tests/day)
- **Sender Score** (by Validity): Domain reputation score (aim for 80+)
- **MXToolbox**: DNS record validation and blacklist checking

### When to Pause and Investigate
1. Open rates drop below 20% suddenly → Check inbox placement
2. Bounce rates spike above 3% → Clean your list immediately
3. Spam complaints above 0.3% → Pause campaign, review copy and targeting
4. Account shows up on blacklists → Remove from blacklist, investigate cause
5. Warmup metrics declining → Reduce volume, increase warming activity

---

## CAN-SPAM Compliance (Mandatory)

### Requirements
1. **No misleading headers**: "From" name and email must be accurate
2. **No deceptive subject lines**: Must relate to email content
3. **Identify as an ad**: If the email is promotional (most cold emails are)
4. **Include physical address**: Your company's physical mailing address
5. **Include opt-out mechanism**: Clear way to unsubscribe
6. **Honor opt-outs within 10 business days**: Remove unsubscribers promptly
7. **Monitor third parties**: If someone sends on your behalf, you're still responsible

### 2024-2026 Updates (Google/Yahoo/Microsoft Bulk Sender Rules)
- **One-click unsubscribe**: Required for all marketing/bulk email (RFC 8058 header)
- **SPF + DKIM + DMARC**: All three required (not optional)
- **Spam complaint rate**: Must stay under 0.3% (Google will block you above this)
- **Bounce rate**: Must stay under 2%

### Practical Implementation
- Add unsubscribe link in email footer (or use Instantly's built-in unsubscribe)
- Include company address in email signature
- Use real "From" name (actual person, not "Sales Team")
- Track and honor all opt-out requests immediately
- Maintain a suppression list of people who've opted out

---

## Infrastructure Checklist

Use this checklist before launching any campaign:

```markdown
## Pre-Launch Infrastructure Checklist

### Domain & DNS
- [ ] Dedicated sending subdomain created (not main domain)
- [ ] SPF record configured and verified
- [ ] DKIM record configured and verified
- [ ] DMARC record configured (at minimum p=none)
- [ ] mail-tester.com score of 9+/10

### Email Accounts
- [ ] Dedicated sending accounts created on subdomain
- [ ] Profile photo uploaded (boosts response 30-50%)
- [ ] Professional signature configured
- [ ] Accounts connected to Instantly

### Warming
- [ ] Warmup enabled on all sending accounts
- [ ] Minimum 2 weeks of warming completed
- [ ] Warmup metrics showing healthy engagement
- [ ] Test emails landing in inbox (not spam)

### List Quality
- [ ] All emails verified (Bouncer, NeverBounce, or Hunter)
- [ ] Invalid/risky emails removed
- [ ] Expected bounce rate <3%
- [ ] Existing customer/partner emails excluded
- [ ] Previous opt-outs excluded (suppression list)

### Compliance
- [ ] Unsubscribe mechanism included
- [ ] Physical address in signature
- [ ] "From" name is a real person
- [ ] Subject line is not misleading
- [ ] Content matches subject line promise

### Sending Configuration
- [ ] Daily volume set conservatively (10-15/day for new campaigns)
- [ ] Sending schedule configured (Tue-Thu, 10AM-2PM)
- [ ] Sends spaced out (not batched)
- [ ] Follow-up delays configured (3 days, then 7 days)
```
