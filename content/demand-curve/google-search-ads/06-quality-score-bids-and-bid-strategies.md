# Quality Score, Bids, and Bid Strategies

## What you’ll learn

- What Quality Score is and why it’s important
- The concept of bidding in Google Ads
- The different bidding strategies Google has
- Which bid strategies to use and when to use them

## Introduction

When and where your ad gets shown, and how much you pay for a click is more complicated than you'd think.

Google determines that using three factors: 

- Your ad/keywords **Quality Score** (we dive into what this is below) and 
- Your **bid** on the keyword that triggered the ad.
- How those compare to everyone else bidding on that same keyword
Say, for example, you’re targeting the keyword **women's hats,** and Google decides you can spend a max of $2 for that click (because you're on Maximize Conversions with a Target CPA of $40). 

Google will calculate your and all your competitor’s Quality Scores for that term and use them along with your bids to determine whether and where to display your ads and how much you’ll each pay for a click.

**What's even more confusing?**

The confusing part is that just because Google set your bid to $2 doesn’t mean you’ll pay $2 for the click. You could only pay $0.76.

Why? Because your next highest competitor could have a lower bid, and their Quality Score could be lower. So Google would only make you pay as much as you absolutely needed to in order to win (and not a cent more).

That’s why Quality Score is so important.

## Quality Score

**Quality Score (QS)** is Google's internal rating of the quality and relevance of your keywords, ads, and landing pages, as well as their similarity to each other.

Put neatly: it’s how well your ad and your website answer the search term.

Having a high Quality Score means you get rewarded with:

- ***Higher ad positions***: Your ads get shown on the first page and near the top more often
- ***More impressions and clicks****:* Your ads get shown more often relative to competitors
- ***Lower costs:*** You pay less per click even if someone else with a lower Quality Score was willing to pay more for it
Your Quality Score depends on multiple factors, including:

- **Expected Click-Through Rate (CTR)** for that keyword, based on historical performance and competitor benchmarks
- Google aims to show the most relevant result for a search query as efficiently as possible.
- If more people click on your ad compared to others in the same auction, Google interprets this as a sign that your ad better matches user intent.

- **The relevance of each keyword to its ad group**
- Are the keywords in an ad group closely related to each other, like *buy organic supplements* and *buy natural supplements*?
- Or are they too different, like *women’s hats* and *Bayesian optimization*?
- Google evaluates **semantic relevance**, meaning the keywords should share a common theme and intent rather than just exact matches.

- **Landing page experience and relevance to the search query**
- Does the page clearly answer the searcher's query?
- Is the page **fast-loading** and mobile-friendly?
- Is the site **secure (HTTPS)**?
- Does it provide a **good user experience**, free from intrusive pop-ups or misleading content?
- Is the content **relevant** to the ad and keyword?

- **Ad relevance to the search query**
- The more relevant your ad text is to the search query, the better.
- Google understands **search intent** beyond just exact keyword matching, but including keywords in the ad **can improve performance**.

- **Ad assets (formerly called ad extensions)**
- Using **sitelinks, callouts, structured snippets, and other assets** improves ad engagement, leading to better CTR and a higher Quality Score.
- More on this later

- **Historical Google Ads account performance**
- Does your account have a history of **high CTRs, strong ad relevance, and good landing page experiences**?
- A strong track record with Google Ads policies and **consistent ad performance over time** can positively impact your Quality Score.

## How is Quality Score recorded?

You are ranked on three metrics:

- Landing Page Experience
- Ad Relevance
- Click Through Rate
Each with either be Below Average, Average, or Above Average to give you a score of 10.

Here's how it's weighted (thanks to [Adalysis for this chart](https://adalysis.com/quality-score/))

![](../images/38cff9d0_683718bd92bc801defe11863_Screenshot_2025-05-28_at_10.07.49_PM.avif)

Therefore, increasing CTR (by making the ad more enticing and relevant to the user’s search query) and improving your landing page have the largest impact on Quality Score.

## Checking your Quality Score

Your Quality Score is shown at a keyword level and is shown in the custom columns. To turn it on, click on the columns icon in the top right, then select **Modify columns. **Then, under Quality Score, toggle the following columns on (you can hover over them to learn more):

- Quality Score
- Landing page exp.
- Exp. CTR
- Ad relevance
- Click **Apply.**

![](../images/bae78ce3_6837185339594fa8b6c5eac5_1740527868528.avif)

Now when you check your keywords, you should see information such as this:

![](../images/0fa01448_68371853e146c8667e0a9b4f_1740527889363.avif)

This gives us a ton of information:

- Our Quality Score for the first keyword is 7/10
- This is perfect and means that there's some definite room for improvement.

- Our expected click-through rate is lower than competitors
- This means our ad copy, our historical performance, or our brand, must be lacking

- Our ad relevance is above that of competitors, this may mean:
- Our ad copy relates very closely to this keyword
- The keywords in our ad group are tightly grouped in the same semantic meaning

- Our landing page experience is better than competitors, potentially because it:
- Relates to the search query and ad copy
- Explains our product before asking visitors to fill out forms (don’t put a form at the very top of the landing page)
- Is optimized for both desktop and mobile users
- Loads quickly
- Has good performance metrics for bounce rate, time on site, conversions, and people completing their search on our site

You’ll want to check the Quality Score of all your keywords on a periodic basis and strive to improve all those with low scores. The goal is to get them all as high as possible.

**Because the higher it is, the more often you'll be shown and the cheaper it'll cost per click.**

### You’ll never hit 10/10 for all the keywords. 

Your competitors have valid products too, and they probably market themselves towards specific keywords that are different than your own. You can’t win ‘em all. But you can steal a lot of traffic from them.

The specific changes you need to make depend on what you’re ranking “Below average” on, and even still, you’re left guessing a little bit because they’re a mix of factors that aren’t explained. The key is to make fixes and check in later to see if your ads have improved.

## Bids

A "bid" in Google is the maximum amount you’re willing to pay for a click for a particular keyword.

**Luckily, we don't recommend manually setting bids for keywords anymore. You should let Google figure out how much you're willing to pay per click based on your goal.**

You set your goal using **bid strategies.** These strategies are set on the campaign, and it dictates how Google will bid on keywords.

One of the strategies is completely manual (you set the maximum bids yourself), and the rest are varying degrees of automatic bidding (Google sets and/or changes the bids for you), each with different goals.

We of course recommend automatic bidding, but let's dive into what they all mean.

## Bid strategies

There are a handful of different bid strategies with different goals and use cases. It can be a bit confusing at first, especially since Google kinda breaks them into two different views, so let’s go over each one and why you might want to use it.

We’ll cover each type, and then go through our step-by-step process for how we pick a bid strategy.

Here is the default view for Google Ads and it's all about optimizing towards a goal, and this is what we recommend focusing on to let Google do its thing:

![](../images/428d1ed9_683718536284cc95d8f48a77_1740529911508.avif)

Here's a quick overview of what that means:

- **Conversions**: You optimize for the most amount of conversions (sign ups, sales, etc) for your budget. 
- This is generally what we recommend in most cases, particularly if you're optimizing towards a non-paid event (sign up, download, etc)
- For this you can set a **Target CPA** meaning if you want to acquire customers for $50 each or less, you can give Google that information 

- **Conversion value: **You optimize for more conversion VALUE (basically, more dollars) instead of optimizing for as many conversions as possible. 
- If you're an ecomm store where each purchase can range wildly in price, this is probably a great idea since it'll optimize for generating more revenue rather than raw sales.
- For this you can set a **Target ROAS (Return on Ad Spend)**, so for example if you are profitable at a 50% margin, you can set a target ROAS of greater than 200%.

- **Clicks: **You optimize for as many clicks as possible. 
- We do not recommend this as it's a great way to spend money on low quality clicks.
- You can set a maximum cost per click. 
- Again we don't recommend this.

- **Impression share: **You optimize for being VISIBLE for as many searches as possible. 
- This is a rare case and might be useful for branded search terms (ones with your brand name in it) so that competitors don't steal your traffic away.
- You can set a target impression share (so if you want to be seen at 90% of the time you can set that).
- We generally don't advise these unless you're really big.

## A note on conversions

When we talk about bidding strategies and goals, we end up talking about conversions.

We should take a moment to talk about them in more detail.

As a reminder, a conversion is a user doing a desired action after clicking on your ad. That can be a newsletter sign up, free trial, app install, purchase, add to cart, or some other nuanced event.

### How do I pick a primary conversion?

In Google there are two types of conversions, Primary and Secondary.

Primary is what a campaign is optimized towards. Secondary are just for informational purposes.

For example you could have a purchase be Primary and Secondary could be View Product Page, Add to Cart, and Initiate Checkout. With that you could see if your leads are falling off at a specific part of the funnel.

### Should I always have a purchase event as primary?

Your primary conversion should almost always be a paid event (like purchase or upgrade) except in these two situations:

**1. You don’t have a paid event because you’re a free product.**

- In that case, take the most important metric, like sign up.
**2. Paid events occur rarely or after a very long delay. **

- If you only have a few sales per month or quarter, or if you have a long sales cycle of weeks to months (possibly due to a free trial), then you’re better off choosing an intermediary metric that occurs more often. This could be a sign up or a sales lead.
**3. Your product is expensive but your budget is low**

- If you make thousands per customer and you can technically afford thousands per customer, but you don't want to invest many many thousands or tens of thousands of dollars to see if this is going to work, then you should maybe test an event that is earlier in the funnel (like submitting the lead form).

### Each campaign can have different conversion goals

You can also have different conversion goals for different campaigns.

If for example you wanted to use one Campaign to push for sales and another for newsletter sign ups, you can do that, but you'd need to put them in different campaigns.

Then in the campaign you can adjust it in the campaign settings here:

![](../images/10221490_6837185385dd1ba56dbf7ff7_1740530454107.avif)

OK. On to our bid strategies.

## Maximize conversions

- Google will bid whatever it feels necessary to maximize the number of conversions within the campaign’s budget. This can occasionally lead to extremely high CPC’s (but that's because they think it's super hot lead).
- **When to use:** This is the default!
**With a Target CPA**

- Instead of giving Google free reign you set a “target CPA” (a.k.a. target cost per action) across the campaign.
- Google will bid to get as many conversions as it can at or below your target CPA. It won’t always get there, but it will try.
- Google will need at least 10-20 conversions in the campaign before it can do this properly
- You can set max and min bids, but this isn’t recommended. Let Google do its thing.
- **When to use:** Use this as soon as you can since it's better than leaving Google blind!

## Maximize clicks

- Google will bid and spend whatever it feels necessary to maximize the number of clicks on your ads without worrying about conversions
- **When to use:** Pure brand exposure and eyeballs to your site
**With max CPC**

- If you want as many clicks as possible but don't want to spend more than a certain amount, you can set that here.

## Maximize conversion value

- Google will bid whatever it feels necessary to maximize the amount of money you get back from the ads. This can occasionally lead to extremely high CPC’s (but that's because they think it's super hot lead).
- **When to use:** If your purchases range in value significantly.
**With a Target ROAS**

- Similar to Target CPA. Instead, you set your target **return on ad spend** as a percentage. For example, if you want your revenue to be four times higher (e.x $100) than the cost of running an ad (e.x. $25), then you would set it to 400%.
- This uses the conversion value instead of the cost per conversion, which makes it ideal if the money you make changes per purchase (due to different cart sizes or prices).
- Google will need > 15 conversions in a 30 day period on the campaign to calculate ROAS. Having at least 50 conversions is better.
- **When to use:** Once you have some decent conversion volume. This is the ideal bidding strategy if you want to maximize conversions and want to ensure they’re profitable.

## Impression share

- This is to maximize how often your ads show when someone searches related keywords.
- This is a rare case and might be useful for branded search terms (ones with your brand name in it) so that competitors don't steal your traffic away.
- You can set a target impression share (so if you want to be seen 90% of the time you can set that).
- **When to use:** If you want to beat out one or more of your competitors and don’t care about conversions or profitability in the process—such as brand or competitor campaigns
This is rare so I won't go deeper.

## Our Strategy

Now that you know the different strategies, let’s dive into what we recommend.

### Step 1: Start with Maximize conversions (with Target CPA)

Start campaigns with Maximize Conversions. 

Let Google's AI do the work and figure things out.

This means Google will automatically handle bids.

To start, set the Target CPA at your breakeven point so it gives Google a bit more wiggle room to learn.

### Step 2: Optimize performance

We’ll go through this a few lessons from now.

### Step 3: Switch to Maximize Conversion Value with Target ROAS

**If you are using a paid conversion event then the next step is Target ROAS—which requires at least 15 conversions in the last 30 days**

Why? Because it will try to get bigger spenders and will be willing to spend more money to acquire them.

**If you are not using a paid conversion event, stick to Target CPA.**

### Now to adjust the copy!

We're all done with Bidding strategies, time to revamp your ad copy :)