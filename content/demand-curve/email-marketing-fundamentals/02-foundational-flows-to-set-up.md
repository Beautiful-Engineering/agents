# Foundational Flows to Set Up

You need three types of emails working. Here's the priority order:

## 1. Transactional emails (must have now)

These emails are sent automatically when users take actions in your app.

**Transactional emails by priority:**

### **Tier 1: Critical (must have working)**

#### 1. Welcome/signup confirmation

**‍**Confirms account creation and guides users to first actions.

Subject: Welcome to [Company Name]! Your account is ready

Hi [First Name],

Welcome to [Company]! Your account has been created and you're ready to get started.

Here's what happens next:

- Log in to your dashboard: [Login Link]
- Complete your profile setup
- [Key first action for your product]
Questions? Just reply to this email.

Welcome aboard,

[Your Name]

[Company Name]

#### 2. Email verification/confirmation

**‍**Verifies user's email address is valid and they own it.

Subject: Please verify your [Company] email address

Hi [First Name],

Thanks for signing up for [Company]! To complete your account setup, please verify your email address.

Verify your email: [Verification Link]

This link expires in 24 hours. If you didn't create this account, you can safely ignore this email.

Thanks,

The [Company] Team

#### 3. Password reset

**‍**Allows users to securely reset forgotten passwords.

Subject: Reset your [Company] password

Hi [First Name],

Someone (hopefully you) requested a password reset for your [Company] account.

Reset your password: [Reset Link]

This link expires in 24 hours. If you didn't request this, you can safely ignore this email.

Thanks,

The [Company] Team

#### 4. Payment confirmations

**‍**Receipt for successful payments - builds trust and provides records.

Subject: Payment received - Thank you!

Hi [First Name],

Your payment of $[Amount] for [Company] [Plan Name] has been processed successfully.

Payment details:

- Amount: $[Amount]
- Plan: [Plan Name]
- Next billing date: [Date]
- Invoice: [Download Link]
Questions about billing? Just reply to this email.

Thanks,

The [Company] Team

#### 5. Payment failed

**‍**Alerts users when payments don't go through so they can fix issues.

Subject: Payment issue with your [Company] account

Hi [First Name],

We had trouble processing your payment of $[Amount] for your [Company] subscription.

This usually happens when:

- Your card has expired
- Your billing information has changed
- Your bank declined the charge
Update your payment method: [Update Link]

We'll try again in 3 days. Your account remains active until then.

Need help? Just reply to this email.

Thanks,

The [Company] Team

#### 6. Trial ending soon

**‍**Warns users their trial expires soon, encouraging conversion.

Subject: Your [Company] trial ends in 3 days

Hi [First Name],

Just a heads up—your free trial of [Company] expires on [Date].

So far you've:

- [Achievement 1]
- [Achievement 2]
- [Achievement 3]
To keep your data and continue using [Company], upgrade to a paid plan:

Choose your plan: [Upgrade Link]

Questions? Just reply to this email.

Thanks,

[Your Name]

### Tier 2: Important (set up soon)

#### 7. Trial expired

**‍**Notifies users their trial has ended and what happens next.

Subject: Your [Company] trial has expired

Hi [First Name],

Your free trial of [Company] ended on [Date]. Your account is now in read-only mode, but your data is safe.

Ready to continue? Upgrade to keep full access:

Upgrade now: [Upgrade Link]

Your data will be automatically restored when you upgrade.

Questions? Just reply to this email.

Thanks,

[Your Name]

#### 8. Login notifications

**‍**Security alert when account is accessed from new device or location.

Subject: New login to your [Company] account

Hi [First Name],

We noticed a new login to your [Company] account:

- Time: [Timestamp]
- Location: [City, Country]
- Device: [Browser/OS]
If this was you, no action needed. If not, please secure your account immediately:

Reset password: [Reset Link]

Thanks,

The [Company] Security Team

#### 9. Usage limit warnings

**‍**Alerts users when approaching plan limits before overage charges. (These should be timely but not spammy. One reminder at 80% and another at 95% usage is usually enough.)

Subject: You're approaching your [Company] usage limit

Hi [First Name],

You've used 80% of your monthly [feature] limit on the [Plan Name] plan:

- Used: [X] of [Y] [units]
- Resets on: [Date]
To avoid service interruption, consider upgrading:

View plans: [Upgrade Link]

Questions? Just reply to this email.

Thanks,

The [Company] Team

### Tier 3: Nice to have (add later)

#### 10. Support ticket created

**‍**Auto-reply confirming support request was received.

Subject: We received your support request [#12345]

Hi [First Name],

Thanks for contacting [Company] support. We received your message and will respond within 24 hours.

Your ticket: #12345 

Subject: [Ticket Subject]

For faster help, check our help center: [Help Link]

Thanks,

The [Company] Support Team

#### 11. Account deletion confirmation

**‍**Confirms account closure (required by GDPR in many regions).

Subject: Your [Company] account has been deleted

Hi [First Name],

Your [Company] account has been permanently deleted as requested.

- All your data has been removed
- Your subscription has been canceled
- No further charges will occur
If you change your mind, you'll need to create a new account.

Thanks for trying [Company].

The [Company] Team

### **How to set these up:**

**‍**If you're technical, these are usually handled by your backend using:

- SendGrid (most popular)
- AWS SES (if you're on AWS)
- Postmark (great deliverability)
If you're non-technical, ask your developer to:

- Make sure these emails exist and work
- Brand them with your company colors/logo
- Use your verified domain as the sender
- Test each one to confirm delivery

## 2. Onboarding emails (should have soon)

These emails help new users succeed with your product after they sign up.

**We won't build these here**—they're covered in depth in the Onboarding module. But understand their purpose:

- Introduce your product's core value
- Guide users through key setup steps
- Provide quick wins and "aha moments"

#### **Quick onboarding sequence example:**

- Email 1 (immediately): Welcome + first action to take
- Email 2 (day 2): Key feature explanation + tutorial
- Email 3 (day 5): Success story + advanced tips
**Event-triggered vs. time-based emails:** Onboarding emails should be event-triggered when possible (based on product/user actions), not just time-based. Simple triggers like "user hasn't completed setup in 24 hours" or "user uploaded first file but hasn't shared it" improve activation rates and keep emails more relevant than generic day-based sequences.

If you haven't built your onboarding sequence yet, complete that module first. Email is just the delivery mechanism.

## 3. Win-back flow (build when you have 100+ users/month)

A simple 2-3 email sequence for users who've gone cold.

#### When to trigger:

- Trial users who haven't logged in for 7 days
- Free users who haven't used key features in 14 days
- Paid users who haven't logged in for 30 days

#### How to set up triggers in MailerLite:

- Go to Automations → Create automation
- Choose "Custom" trigger
- Set trigger to "Subscriber field equals [inactive status]"
- Add time delay (7 days, 14 days, etc.)
- Add your email sequence

### Win-back email templates:

For trial users, it’s important not to wait until onboarding ends to re-engage. Instead, build activation nudges into the onboarding sequence (e.g. “Try this key feature before your trial ends”).

True win-backs should start after trial expiry or for free/paid users who’ve gone cold.

#### Email 1 (Day 7): Gentle check-in

Subject: Miss us yet?

Hi [First Name],

I noticed you haven't been back to [Product] in a week. Everything okay?

Maybe you got busy (happens to all of us) or maybe something wasn't working the way you expected.

If it's the latter, hit reply and let me know what went wrong. I read every email and I'm here to help.

If you're just busy, here's a quick reminder of what you can do in [Product]:

- [Key benefit 1]
- [Key benefit 2]
- [Key benefit 3]
Back to [Product]: [Login Link]

Cheers,

[Your Name]

#### Email 2 (Day 14): Show value

Subject: Here's what you're missing in [Product]

Hi [First Name],

Still haven't seen you back in [Product]. Let me show you what other users have been up to:

→ [Customer Name] used [Feature] to [specific result]

→ [Another Customer] saved [time/money] by [specific action]

→ Users who [specific action] are 3x more likely to [desired outcome]

Want to see what you could accomplish?

Jump back in: [Login Link]

Or if [Product] isn't right for you, no worries. You can unsubscribe at the bottom of this email.

Best,

[Your Name]

#### Email 3 (Day 21): Last chance (optional)

Subject: One last thing before you go

Hi [First Name],

This is my last email before I stop bugging you about [Product].

I get it—not every tool is right for everyone. But before you go, I wanted to offer something special.

[Special offer/bonus/extended trial] - just for taking another look.

Claim your [offer]: [Link]

If not, no hard feelings. I'll stop sending these emails and you can always come back when you're ready.

Thanks for giving us a shot,

[Your Name]

P.S. Seriously, hit reply if there's something specific that didn't work. Your feedback helps us build a better product.

## **4. Promotional emails (only if actively running campaigns)**

Most traction-stage founders should skip this. Overusing them too early risks high unsubscribes and spam complaints. But if you're launching on Product Hunt, announcing a new feature, or running a sale, here's a simple template:

#### Product announcement email

Subject: [New Feature] is live (and it's pretty cool)

Hi [First Name],

We just shipped something I'm excited to tell you about: [Feature Name].

Here's what it does:[One sentence explanation]

Why you'll love it:

- [Benefit 1]
- [Benefit 2]
- [Benefit 3]
Try [Feature]: [Link]

This took our team [time period] to build, and early testers are saying [social proof quote].

Questions? Just reply.

Cheers,

[Your Name]

P.S. [Additional detail or bonus]

**Goal:** Set up transactional emails first. Add onboarding if you haven't already. Build win-back only if you have meaningful volume (100+ users/month).