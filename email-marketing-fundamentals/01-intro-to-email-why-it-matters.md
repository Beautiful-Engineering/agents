# Intro to Email & Why It Matters

Most founders avoid email because they think it's complicated.

Email isn't your main acquisition channel at this stage. It's supporting infrastructure, like having a working website or functional payment processing. You don't need fancy automations based on email segments yet. You need the basics to work so you can focus on getting traction.

Here's what you'll build: the minimum viable email system that supports your onboarding, handles your transactional needs, and gives you one simple way to re-engage users who go cold.

These are just the emails that matter before you hit meaningful scale. We can work on lifecycle emails later.

Think of it like this: You wouldn't launch without a working checkout flow. Same logic applies to email. You need three things working:

![](https://cdn.prod.website-files.com/5ca4f46f1600f04b73b1ccfe/68d1e628a6a64831d8b86c8d_image%20(92).avif)

- **Transactional emails** that don't break (password resets, confirmations)
- **Onboarding emails** that help users succeed with your product
- **One simple way** to win back users who've gone cold
That's it. Everything else can wait.

#### Why email matters now:

- Users expect immediate confirmation when they sign up
- Transactional emails get much higher engagement than promotional ones
- A simple win-back sequence can recover a meaningful percentage of inactive users

#### What email won't do:

- Replace your main acquisition channels
- Solve fundamental product-market fit issues
- Generate significant revenue on its own (yet)
Your goal: Set up the basics so they work. Then get back to finding traction.

## Email setup basics

You need an email service provider (ESP) that can send both transactional and marketing emails. Most founders overthink this choice.

Here are your two best options:

### Mailchimp vs. MailerLite

.tg  {border-collapse:collapse;border-spacing:0;}
.tg td{border-color:black;border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:14px;
  overflow:hidden;padding:10px 5px;word-break:normal;}
.tg th{border-color:black;border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:14px;
  font-weight:normal;overflow:hidden;padding:10px 5px;word-break:normal;}
.tg .tg-cly1{text-align:left;vertical-align:middle}
.tg .tg-1wig{font-weight:bold;text-align:left;vertical-align:top}
.tg .tg-z6br{background-color:#f3f3b6;font-weight:bold;text-align:center;vertical-align:middle}

  
    Feature
    Mailchimp
    MailerLite
  

  
    Free contacts
    500
    1,000
  
  
    Free monthly emails
    1,000
    12,000
  
  
    Automation
    Very limited (no multi-step)
    Full automation included
  
  
    Ease of use
    Beginner-friendly
    Clean, intuitive
  
  
    Deliverability
    Good
    Excellent
  
  
    Recommendation
    Best for complete beginners
    Best if you want room to grow
  

Pick one. Don't spend more than 20 minutes deciding.

### Step-by-step setup (MailerLite example)

#### Step 1: Create your account

- Go to [MailerLite.com](http://MailerLite.com)
- Click "Start free trial"
- Enter your email and create a password
- Skip the onboarding wizard for now

#### Step 2: Verify your domain

**‍**This prevents your emails from going to spam. Here's exactly how:

- In MailerLite, go to Settings → Domains
- Click "Add domain"
- Enter your domain (yourcompany.com)
- Copy the DNS records MailerLite provides
- Log into your domain provider (GoDaddy, Namecheap, etc.)
- Add the DNS records to your domain settings
- Wait 24-48 hours for verification
*Can't find your domain settings? Search "[your domain provider] add DNS records" in Google.*

**What you're actually configuring:**

**‍**MailerLite will provide you with SPF and DKIM records to add:

- SPF (Sender Policy Framework): Tells email providers which servers are authorized to send emails from your domain
- DKIM (DomainKeys Identified Mail): Adds a digital signature to verify your emails haven't been tampered with
- DMARC setup (recommended): While SPF and DKIM handle the heavy lifting, setting up DMARC provides an extra layer of protection. Gmail and Yahoo now require it for bulk senders, so it's worth configuring even if you're just starting out.
- MailerLite may not automatically provide DMARC records, so you might need to add this manually:
- Record Type: TXT
- Name: _dmarc
- Value: v=DMARC1; p=none; rua=mailto:dmarc@yourdomain.com
This basic DMARC policy tells email providers to monitor but not reject emails that fail authentication, while sending you reports about authentication attempts.

#### Step 3: Set up your sender details

- **From name:** Your name or company name (not "noreply")
- **From email:** hello@yourcompany.com (use your verified domain)
- **Reply-to email:** Same as from email
- **Company address:** Required by law—use your real address

#### Step 4: Create your first email list

- Go to Subscribers → Groups
- Click "Create group"
- Name it "Main List" or "Newsletter Subscribers"
- Add a description for your reference

> **Note:** Never upload purchased lists as these can damage deliverability and sender reputation.

### Understanding email types

#### Transactional emails

Triggered by user actions:

- Account creation confirmations
- Password reset emails
- Purchase receipts
- Login notifications

#### Marketing emails

Sent to promote or educate:

- Welcome sequences
- Product updates
- Promotional offers
- Win-back campaigns

> **Note:** Never include marketing content in transactional emails (like upsells in password resets). Mixing them can violate CAN-SPAM/GDPR and hurt deliverability.

> **Important:** Some transactional emails (like password resets) are often handled by your app's backend using services like SendGrid or AWS SES. Marketing emails go through your ESP. Make sure both are working. It’s also important to use a separate domain or subdomain for transactional vs. marketing emails. This helps prevent marketing complaints or bounces from hurting the deliverability of critical transactional emails.

### Compliance essentials

Every marketing email must include:

- Your physical business address
- Clear unsubscribe link
- Your company name
**Opt-in recommendation:** Use single opt-in (user subscribes with one click). Double opt-in creates friction you don't need at this stage. (In the EU, double opt-in is often legally required. Be sure to double check the law based on where you live.)

**Goal:** Complete your ESP setup and send yourself a test email to confirm everything works.