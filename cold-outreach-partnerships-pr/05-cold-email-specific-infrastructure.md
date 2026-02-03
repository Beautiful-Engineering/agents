# Cold Email-Specific Infrastructure

The full email infrastructure set up can be found in the [Email Foundations](/courses/email-marketing-fundamentals) module. The following is specific to cold email only.

### Subdomain Strategy for Cold Outreach

**Why you need separate domains for cold email:**

- Protects your main domain reputation if deliverability issues arise
- Allows testing different messaging without risking primary email
- Enables higher volume without affecting business communications
**Setup approach:**

- **Main domain:** yourcompany.com (for business operations)
- **Cold email subdomain:** outreach.yourcompany.com or partnerships.yourcompany.com
- **High-volume option:** Buy yourcompany.co or yourcompany.io for aggressive outreach
**Actual subdomain examples:**

- Main: hello@yourcompany.com
- Cold email: team@outreach.yourcompany.com
- Alternative: founders@partnerships.yourcompany.com
**Technical setup:**

- Create subdomain in your DNS settings (outreach.yourcompany.com)
- Set up separate email hosting for the subdomain
- Configure SPF, DKIM, and DMARC records specifically for the subdomain
- Use different IP addresses if possible (different email hosting provider)

### Cold Email Volume Guidelines

**Daily sending limits (gradual ramp-up):**

- **Week 1:** 5-10 emails/day maximum
- **Week 2-3:** 15-25 emails/day
- **Week 4+:** 30-50 emails/day absolute maximum
**Why these limits matter:**

- Gmail flags domains sending 100+ cold emails daily as spam
- Higher volume requires multiple domains and complex infrastructure
- Strategic partnerships work better with lower, personalized volume
**Sending schedule:**

- **Tuesday-Thursday:** Best response rates
- **10 AM - 2 PM:** Peak engagement times
- **Spread sends:** 3 emails at 9 AM, 3 at 1 PM, 3 at 4 PM
- **Never batch send:** Looks automated and hurts deliverability

### Email Warming for Cold Outreach

**Why warming is critical for cold email:**

**‍**Unlike business emails to existing contacts, cold emails go to people who don't recognize your domain. Email providers default to spam folder unless you've built positive sending patterns.

**3-week warm-up process:**

**Week 1: Personal emails (5-8/day)**

- Email friends, family, colleagues who will reply
- Mix of questions, updates, article shares
- Goal: Build positive engagement patterns
**Week 2: Business emails to warm contacts (10-15/day)**

- Email existing customers, partners, past colleagues
- Share relevant content, follow up on conversations
- Continue some personal emails
**Week 3: Begin cold outreach (5-10/day)**

- Start with highly targeted, well-researched prospects
- Monitor response rates closely (aim for 15%+)
- If responses drop below 10%, return to warming
**Automated warming tools:**

- **Mailwarm ($15/month):** Creates artificial engagement patterns
- **Lemwarm ($25/month):** Integrated with Lemlist platform
- **Manual warming:** Free but requires sending real emails to real people

### Cold Email Tool Stack

**For strategic partnership outreach (5-15 emails/week):**

**Gmail + Mixmax ($12/month)**

- **Best for:** High-touch, personalized outreach
- **Pros:** Full Gmail integration, templates, tracking
- **Cons:** Manual process, not scalable beyond 20 emails/week
**For scaled cold email (25+ emails/day):**

**Instantly.ai ($37/month)**

- **Best for:** Growing from 0 to 1000+ cold emails/month
- **Pros:** Unlimited email accounts, built-in AI personalization, strong deliverability
- **Why choose this:** Best balance of features and price for early-stage scaling
**Salesforge ($94/month)**

- **Best for:** Teams wanting maximum automation
- **Pros:** Advanced AI sequences, automatic inbox rotation, sophisticated analytics
- **Why choose this:** Most advanced features but expensive for solo founders
**Lemlist ($59/month)**

- **Best for:** Creative campaigns with video/image personalization
- **Pros:** Multimedia personalization, CRM integration, creative templates
- **Why choose this:** Stand out with personalized videos and images

### Cold Email Deliverability Monitoring

**Weekly health checks:**

- Send test emails to Gmail, Outlook, Yahoo accounts
- Check inbox vs. spam folder placement
- Monitor bounce rates (keep under 3%)
- Track response rates (15%+ for good deliverability)
**Tools for monitoring:**

- **Sender Score (senderscore.org):** Domain reputation score (aim for 80+)
- **Google Postmaster Tools:** Gmail-specific delivery data
- **Mail-tester.com:** Test email spam score before campaigns
**Red flags to watch:**

- Emails consistently landing in spam
- Response rates dropping below 10%
- Bounce rates above 5%
- Automated "spam detected" responses

### Cold Email-Specific Best Practices

**List hygiene:**

- Verify emails with Hunter.io or NeverBounce before sending
- Remove bounced addresses immediately
- Use double opt-in for any lead magnets
**Personalization at scale:**

- Research prospects on LinkedIn, company website, recent news
- Reference specific company details, not just first name
- Use AI tools for research but write personal opening lines manually
**Follow-up sequences:**

- 3-5 follow-ups spaced 3-7 days apart
- Each follow-up should add new value or angle
- Stop after 5 touches to avoid spam complaints
**Unsubscribe compliance:**

- Include unsubscribe link in every cold email
- Honor unsubscribes within 24 hours
- Use simple text like "Reply STOP to unsubscribe"

### What Makes This Different from Regular Email

The key difference is that cold email requires building trust with people who don't know you exist, while managing reputation with email providers who assume you might be spam. This requires:

- **Gradual volume increases** (vs. sending normal volume immediately)
- **Separate domains** (vs. using your main business email)
- **Warming periods** (vs. starting outreach right away)
- **Higher personalization** (vs. standard business communication)
- **Strict monitoring** (vs. assuming emails are delivered)
Skip any of these cold email-specific steps and your emails will land in spam folders, wasting weeks of outreach effort.