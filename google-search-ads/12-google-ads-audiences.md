# Google Ads Audiences

## What You’ll Do

- Learn what remarketing lists (now called “audience lists” in Google Ads) are and the types available.
- Understand how to use them effectively across Search, Display, and Performance Max campaigns.
- Create audience lists and add them to your campaigns.

## Introduction

In Google Ads, the **Audiences** tab allows you to create and manage audience lists (formerly remarketing lists) to target or exclude specific groups of people based on their interactions with your website, app, YouTube channel, or search behavior. These interactions include actions like signing up for your mailing list, making a purchase, or visiting key pages, as well as how recently they performed those actions (e.g., 30, 60, or 365 days).

Audience lists enable you to:

- Exclude current or past customers to avoid wasting ad spend on people who already know you.
- Retarget unconverted visitors or past customers with tailored ads across Search, Display, or YouTube.
- Prospect for new customers similar to your best audiences using “Similar Audiences” or “Custom Audiences.”
- Optimize bids and targeting for high-value users, leveraging Google’s automation.
While audience lists are powerful for Display and YouTube campaigns, they’re also valuable for Search and Performance Max campaigns, especially for exclusions and bid optimization. Before launching ads, set up audience lists to target the right people efficiently. 

Note: You can’t access personally identifiable information about users on these lists—they’re used solely for targeting purposes.

Let’s explore the types of audience lists and how to use them effectively.

## Types of lists

Google Ads offers several ways to create audience lists, most of which are automatically generated. You can set how long a user remains on a list (e.g., 30 days, 90 days, or unlimited). Here are the main types:

#### 1. Website Visitors (Based on URL or Pages)

- **How It Works**: Automatically create lists of users who visit specific pages on your website (e.g., /cart, /checkout, /confirmation, /pricing).
- **Best Use**: Target or exclude users based on their website behavior, such as visitors who viewed your pricing page but didn’t convert.
- **Tip**: Use Google Tag Manager or the Google Ads tag to track page visits. Avoid relying solely on URLs, as they can change—use events or conversions for reliability (see “Conversion Events” below).
- **Membership Duration**: Set a duration (e.g., 30–365 days) based on how long users remain relevant (e.g., 30 days for cart abandoners, 100+ days for purchasers—depending on product).

#### 2. Conversion Events (Preferred for Automation)

- **How It Works**: Automatically generate lists of users who complete specific conversion actions you’ve defined (e.g., purchases, sign-ups, form submissions).
- **Best Use**: This is the easiest and most reliable method for creating retargeting lists, especially for future customers. It integrates seamlessly with Google Analytics 4 (GA4) or Google Ads conversion tracking.
- **Tip**: Use GA4 events or Google Ads conversion goals to track actions like “Purchase” or “Add to Cart,” then create audience lists based on these events. This is more accurate than manual tags and scales easily.
- **Membership Duration**: Set based on your product and customer lifecycle (e.g., 30 days for cart abandoners, 100+ days for purchasers—depending on product).

#### 3. App Users

- **How It Works**: Automatically create lists of users who have downloaded or interacted with your mobile app (e.g., installed, made an in-app purchase).
- **Best Use**: Target or exclude app users for app install campaigns, retargeting, or cross-channel promotions (e.g., pushing app users to your website).
- **Tip**: Use Firebase or Google Ads app tracking to set up these lists, ensuring accurate attribution across devices.

#### 4. YouTube Users

- **How It Works**: Automatically generate lists of users who watched videos on your YouTube channel (e.g., viewed 25% or more of a video, subscribed).
- **Best Use**: Retarget YouTube viewers with Display, YouTube, or Search ads, or exclude converted viewers.
- **Tip**: Combine with Performance Max or Video campaigns for broader reach.

#### 5. Customer Lists (For Current/Past Users)

- **How It Works**: Upload a list of customer data (e.g., email addresses) to match with Google accounts. You can set a membership duration (e.g., 30 days, 60 days, or unlimited).
- **Best Use**: Exclude current or past customers from campaigns to avoid redundant ad spend, or retarget lapsed customers (e.g., those who haven’t purchased in 90+ days).
- **Limitations**: This list doesn’t update automatically—you must manually refresh it with new data or rely on conversion-based lists for ongoing tracking.
- **Tip**: Use Google Ads’ Customer Match feature, which supports email, phone numbers, or mailing addresses, and integrates with GA4 for better automation.

#### 6. Similar Audiences (Lookalike Audiences)

- **How It Works**: Google automatically creates lists of users with behaviors and interests similar to your existing audience lists (e.g., customers, converters, or website visitors).
- **Best Use**: Prospect for new customers in Display, Search, or Performance Max campaigns, as these audiences often convert well due to Google’s extensive data.
- **Tip**: Combine with in-market or affinity audiences for even better results, and use Smart Bidding to optimize bids for these segments.

## How to use Audience Lists effectively

Audience lists are versatile and can enhance performance across Search, Display, YouTube, and Performance Max campaigns. 

Here’s how to use them strategically, with a focus on automation and modern practices:

### Search

- **Exclude converted users**
- Avoid paying for clicks from current or past customers who already know your brand. Use a combination of customer lists (uploaded emails) and conversion-based lists (e.g., “Purchased in the last 30 days”) to exclude these users.
- Focus on key conversion events like purchases or sign-ups. For unconverted users (e.g., cart abandoners), keep showing ads to drive them back—don’t exclude them yet.
- **Tip**: Use “Observation” mode initially to track performance, then switch to “Targeting” (exclude) if data shows savings without losing conversions.

- **Optimize bids for high-value audiences**
- Use audience lists to bid higher on users more likely to convert, such as website visitors who didn’t convert or users deep in your funnel (e.g., “Added to Cart”).
- With Smart Bidding (e.g., Target CPA, Maximize Conversions), Google automatically adjusts bids for these audiences based on performance—no manual bid increases (e.g., 25–50%) needed.
- Set membership durations (e.g., 30 days for recent visitors, 90 days for cart abandoners) to keep lists relevant.

### Display/YouTube

- **Exclude converted users**
- Same as Search—exclude current customers or recent converters to save budget. Use customer lists or conversion-based lists (e.g., “Purchased > 30 days ago”).
- **Tip**: Combine with frequency capping to limit ad exposure to these users.

- **Run retargeting campaigns for unconverted visitors**
- Target website visitors, YouTube viewers, or app users who didn’t convert with tailored Display or YouTube ads. Offer incentives like discounts or reminders (e.g., “Complete Your Purchase Today”).
- Break into segments for precision, such as:
- <30-day website visitors who didn’t sign up or purchase.
- 31–60-day visitors who abandoned carts.

- Use Smart Bidding to optimize bids, and test ad formats (e.g., responsive display ads, video ads) for engagement.

- **Retarget lapsed customers**
- Create lists of customers who haven’t engaged or purchased recently (e.g., >45 days for a product bought monthly). Retarget with Display or YouTube ads to re-engage them.
- **Example**: For a landscaping service, retarget customers who haven’t booked maintenance in 60+ days with seasonal offers.

- **Prospect with "Similar Audiences"**
- Use “Similar Audiences” to reach new users with behaviors like your best customers. Combine with in-market or affinity audiences for broader reach.
- **Tip**: Test in Performance Max campaigns for cross-channel optimization (Search, Display, YouTube, Discover).

### For Performance Max Campaigns

- **Leverage All Audience Types**:
- Use website visitors, conversion events, customer lists, and similar audiences to refine targeting within Performance Max campaigns, which span Search, Display, YouTube, and more.
- Exclude converted users and bid higher on high-value segments (e.g., cart abandoners, past visitors) using Smart Bidding.
- **Tip**: Performance Max automatically optimizes across audiences, so use “Observation” mode initially, then refine based on performance data.

## How to Create and Add Audience Lists to Campaigns

Follow these steps to set up and apply audience lists in Google Ads:

#### 1. Create Audience Lists

- **Go to Audiences**:

- In Google Ads, click **Tools & Settings** > **Shared Library** > **Audience Manager**‍
- Click the blue + button to create new audience.

![](https://cdn.prod.website-files.com/5ca4f46f1600f04b73b1ccfe/68371ce948225dd21c2eecbc_1741048099319.avif)

‍
- **Choose a Type**:
- **Website Visitors**: Select “Website visitors” and specify URLs or use Google Analytics events (e.g., “Visited /cart”).
- **Conversion Events**: Use tracked conversions (e.g., “Purchase,” “Sign-Up”) to auto-generate lists.
- **Customer Lists**: Upload a CSV or use Customer Match with emails, phone numbers, or addresses.
- **App Users/YouTube Users**: Select the relevant platform and define actions (e.g., “Watched 25% of video”).
- **Similar Audiences**: Let Google create lists based on existing audiences.

- **Set Membership Duration**:
- Choose how long users stay on the list (e.g., 30 days for recent visitors, 180 days for customers).

- **Save the Audience**:
- Name the list (e.g., “Cart Abandoners – 30 Days”) and save it.

#### 2. Add Audiences to Campaigns

- **Campaign or Ad Group Level**:
- Go to the campaign or ad group > **Audiences** tab.
- Click the blue **+** button to add audiences.
- Select your created lists (e.g., “Cart Abandoners,” “Past Customers”).
- Choose “Targeting” (show ads only to these audiences) or “Observation” (track performance but show ads to everyone).
- Save changes.

#### 3. Monitor and Optimize

- Use the **Audiences** report in Google Ads to analyze performance (e.g., conversions, cost, CTR) by audience segment.
- Adjust targeting or bidding after 30–60 days based on data, or let Smart Bidding optimize automatically.

## Tips

- **Start simple**: For a budget under $10K/month, create 2–3 key audience lists (e.g., “Website Visitors – 30 Days,” “Purchased – Exclude,” “Similar to Customers”) and use “Observation” mode to track performance without restricting traffic.
- **Leverage automation**: Use Smart Bidding (e.g., Target CPA, Maximize Conversions) to optimize bids for audiences dynamically, reducing manual adjustments.
- **Focus on high-value segments**: Prioritize lists like cart abandoners, pricing page visitors, or lapsed customers, as they’re more likely to convert with retargeting.
- **Integrate with GA4**: Use Google Analytics 4 to track events and create audience lists automatically, syncing with Google Ads for better accuracy.
Now get to implementing!