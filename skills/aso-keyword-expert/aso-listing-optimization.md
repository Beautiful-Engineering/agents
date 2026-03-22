# App Store Listing Optimization

Frameworks for optimizing every element of an App Store listing. Source: Demand Curve ASA curriculum, Lesson 01 (Step 1: Fix Your App Store Listing First).

---

## Core Principle

ASA performance is tied directly to app store page quality. Even perfect targeting won't work if the listing converts poorly. **Fix the listing before spending on ads.**

Per Demand Curve: Conversion Rate (taps → installs) is entirely controlled by the app store page quality, not keyword targeting.

---

## Title Optimization

**Format**: `[App Name]: [Primary Value Prop]`

**Rules**:
- Keep under 30 characters
- Include the most important keyword naturally
- The keyword in the title is the strongest signal for App Store search ranking
- Don't keyword-stuff — Apple penalizes unnatural titles

**Examples**:
- Good: "Mint: Budget & Expense Tracker"
- Good: "Headspace: Meditation & Sleep"
- Bad: "Best Budget App Free Money Tracker Finance"

**How to update**: App Store Connect → My Apps → Select app → iOS App → App Information → Name

---

## Subtitle Optimization

**Format**: Concise value prop in 30 characters

**Rules**:
- Focus on the outcome users get
- Skip generic phrases ("world's best", "download now", "#1 app")
- Include a secondary keyword if it fits naturally
- The subtitle is the second strongest search ranking signal

**Examples**:
- Good: "Save money. Reach your goals."
- Good: "Run with the beat"
- Bad: "The best app ever made"

**How to update**: App Store Connect → App Information → Subtitle field

---

## Keywords Field (100 Characters)

The hidden keywords field in App Store Connect is crucial for discoverability. Users never see it, but Apple indexes it for search.

**Rules**:
- 100 characters maximum
- Separate keywords with commas, no spaces after commas
- Do NOT repeat words already in your title or subtitle (Apple indexes those separately)
- Do NOT include your app name or company name
- Do NOT include the word "app"
- Use singular forms only (Apple matches plurals automatically)
- Do NOT include competitor names (Apple may reject)
- Prioritize: high-volume keywords > long-tail keywords

**Strategy**:
1. List all candidate keywords from research
2. Remove any already in title or subtitle
3. Remove duplicates and plurals
4. Prioritize by search volume
5. Pack as many high-value keywords as possible into 100 chars
6. Use commas without spaces to maximize character usage

**Example** (for a budget tracking app):
```
expense,tracker,spending,money,finance,personal,saving,bill,payment,debt,income,wallet
```

**How to update**: App Store Connect → iOS App → version → Keywords field

---

## Description

The description does NOT affect App Store search ranking (Apple confirmed this). But it affects conversion rate for users who scroll down.

**Structure**:
1. **First 3 lines** (visible before "more" tap) — Hook + primary value prop
2. **Feature list** — Top 5 features with outcomes, not just functionality
3. **Social proof** — User count, press mentions, awards
4. **CTA** — Clear call to download

**Rules**:
- Lead with benefits, not features
- Use short paragraphs and line breaks
- Include relevant keywords naturally (for Google Play, not Apple — but good practice)
- Update with each version release

---

## The 5-Screenshot Framework

Screenshots are mini-advertisements. Most users decide within 3 seconds whether to download.

### Screenshot 1: Hero Value Prop
- Show the app's #1 benefit in action
- Headline: outcome-focused (e.g., "Track spending in seconds")
- Use contrasting text (white on dark overlay)

### Screenshot 2: Problem/Solution
- Show the problem the app solves
- Headline: pain-point focused (e.g., "Never overspend again")
- Include before/after if possible

### Screenshot 3: Key Feature
- Most important feature in use
- Headline: specific benefit (e.g., "See exactly where your money goes")
- Show real data, not placeholder text

### Screenshot 4: Social Proof
- Reviews, user count, or testimonials
- Headline: credibility (e.g., "Join 50,000+ happy users")
- Include star ratings if above 4.5

### Screenshot 5: Call to Action
- Final push to download
- Headline: outcome-focused (e.g., "Start saving money today")
- Show the result users get

### Screenshot Quality Checklist
- [ ] Each screenshot has a clear headline (4-6 words max)
- [ ] Real data shown, not placeholder text
- [ ] Text is readable on actual device
- [ ] Contrasting colors for key elements
- [ ] Consistent visual style across all 5
- [ ] Tells a story from first to last

### Device Requirements
- iPhone 6.7": 1290 × 2796 pixels
- iPhone 6.5": 1242 × 2688 pixels
- iPhone 5.5": 1242 × 2208 pixels
- iPad Pro: 2048 × 2732 pixels

---

## App Preview Video

15-30 second video that auto-plays in search results. Typically boosts conversion 10-15%.

**Requirements**:
- 15-30 seconds maximum
- MP4 format
- Specific resolutions per device type
- No external branding or calls-to-action
- Must represent actual app functionality

**Simple creation process**:
1. Screen record using iPhone's built-in recorder
2. Edit in iMovie (free) or similar
3. Add simple transitions between key features
4. Export as MP4

**When to prioritize**: After screenshots are optimized and conversion rate is stable. Video is an amplifier, not a fix for bad fundamentals.

---

## Reviews & Ratings Strategy

Target: 4.5+ star rating with 100+ reviews before spending heavily on ASA.

### In-App Prompts
- Use Apple's built-in `SKStoreReviewController`
- Trigger after positive actions (completed workout, saved money, achieved goal)
- Never prompt immediately after download — wait for value delivery
- Apple limits prompts to 3 per year per user
- Prompt after: 5+ app opens, completion of core action, positive outcome

### Email Review Requests
Send to users who've opened the app 5+ times in 30 days.

**Template**:
```
Subject: Quick favor?

Hi [Name],

You've been using [App Name] for [time period] and I wanted to personally thank you.
Users like you are the reason we can keep building.

Would you mind leaving a quick review on the App Store? It takes 30 seconds
and helps other people discover us.

[Direct App Store review link]

Thanks!
[Your name], [Your title]
```

### Direct Review Links
Format: `https://apps.apple.com/us/app/your-app/id123456789?action=write-review`

### Rating Recovery
If rating is below 4.0:
1. Fix the most-mentioned bug in negative reviews
2. Respond to negative reviews professionally
3. Push an update with fix + release notes mentioning the fix
4. Re-trigger review prompts after the fix

---

## Localization Checklist

When expanding to new markets:
- [ ] Translate title and subtitle (don't just transliterate)
- [ ] Research keywords in each locale separately (search behavior differs)
- [ ] Create locale-specific screenshots with translated headlines
- [ ] Adapt the description for cultural context
- [ ] Use the 100-character keywords field per locale
- [ ] Adjust pricing for local purchasing power
