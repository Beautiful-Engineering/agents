# Project: Conduct a Basic SEO Audit

If your company already has a blog, one of the highest-leverage places to start with an editorial/SEO content strategy is reoptimizing your existing blog content. Doing so makes the most of what you already have, as opposed to starting from square one. But before you can reoptimize this content, you’ll need to do an SEO audit—an evaluation of your site to see what (if any) content is currently driving organic traffic.

Paid tools like Semrush can give a more comprehensive overview of your content’s search performance. However, this project focuses on doing a basic SEO audit using two free tools: Google Analytics and Google Search Console.

This project is for websites that:

- Are connected to Google Analytics. 
- Have linked their Google Analytics and Google Search Console accounts to share data. (To do this, [follow these instructions from Google](https://support.google.com/analytics/answer/1308621?hl=en). Note that after linking your accounts, it can take as long as 24 hours before your Search Console data appears in Google Analytics.)
- Have existing blog content that’s **at least six months old**. (If you’re just getting started with an editorial/SEO content strategy, check out our [keyword research project](/lessons/project-keyword-research).)

## Phase 1: Setup

To get started, open and save a copy of our [SEO Audit Worksheet](https://demandcurve.notion.site/SEO-Audit-Worksheet-279f8522113280de813bf30eed30df09?source=copy_link). 

Then navigate to [Google Analytics](https://analytics.google.com/analytics/web/provision/#/provision). Follow the instructions below and answer the questions in the SEO Audit worksheet. 

It can be tempting to immediately address any issues you identify during the audit. But we advise making a list of these problems in the SEO Audit Worksheet rather than trying to solve each in real time.

## Phase 2: Traffic Overview

Under Acquisition in the sidebar, click **All Traffic** and then **Channels**. 

Set your date range to the last six months; Google Analytics’ data will adjust accordingly. You’ll see a data table organized according to Default Channel Grouping. This gives you a high-level look at the different ways visitors are discovering your content.

Answer the following questions in your worksheet.

- Which channel drove the highest number of users?
- What percentage of your total traffic comes from organic search?
While the goal of SEO is to drive more visitors through Organic Search, this high-level view can be insightful because it shows where your traffic is coming from. You can get an idea of how your SEO strategy performs compared to other campaigns, e.g., influencer marketing (social media) and press releases (referral). 

It’s also worth looking at the other traffic sources here to find out whether your content distribution efforts are working, e.g., whether people are coming to your site through guest posts (referral), social media, or another source.

## Phase 2: Organic Traffic 

### Phase 2.1: Weekly Performance

Now click **Organic Search** in the list of Default Channel Groupings.

By default, the graph of traffic data at the top of the page looks at the number of users that visit by day. Click **Week** in the upper right corner to change this view. This makes it easier to detect any big week-to-week traffic changes. 

Then answer the following questions in your worksheet.

- What general trend does your organic traffic follow? E.g., it slopes upward.
- Are there any sudden dips or spikes in your weekly organic traffic?
It’s worth looking at your organic traffic from this perspective to get an idea of whether your SEO efforts are working. Here’s what some trends might mean:

- An **increase** in organic traffic may show that your SEO efforts are working, whether because you’re publishing more content or your content is moving further up in SERPs. 
- A **steady decrease** in organic traffic may be a sign that competitors have published better content, so your content is moving lower in SERP rankings.
- A **sudden decrease** in organic traffic may be a sign of a core update from Google, or worse, a penalty.
- In this case, you should do more research, like which day traffic suddenly declined and how many pages are affected. Also look up news about whether Google’s algorithms had any major updates at this specific point in time.

## Phase 2.2: Landing Page Performance

Now scroll down to the table listing each of your landing pages. By default, the data here is organized using keyword as the primary dimension, but Google Analytics’ keyword data isn’t very good. Oftentimes, instead of showing keywords, Google Analytics shows “(not provided)” or “(not set)” in the effort to [protect user privacy](https://analytics.googleblog.com/2011/10/making-search-more-secure-accessing.html).

Since we’ll look at Google Search Console’s keyword data later, click the Landing Page option.

Google Analytics’ data will update to show every URL on your site that has received organic traffic. If you notice any missing URLs from this list, it means those pages haven’t received any organic traffic in the specific time frame you designated.

Looking at the data table, answer the following questions in your worksheet.

- What URLs drove the most new users? 
- Looking at the percentage of users going to each URL, how is organic search traffic generally distributed across your site? E.g., one URL drives 30% of organic traffic; most other pages drive less than 5%.
- What URLs drove the least new users?
The goal here is to find your best and worst performing content in terms of traffic. Note that some of your worst performing URLs might simply not drive much traffic right now because they were published later—and it takes a while for pages to begin ranking in search results.

Traffic only tells one part of the story, though. It may be that even though one page gets a lot of visitors, users don’t stick around on it for long. To get more insight, we’ll dive into user behavior metrics next.

## Phase 3: User Behavior

### Phase 3.1: Pages/Session

Sort by **Pages/Session**. This metric represents the average number of pages users browse after they’ve landed on a specific URL. Then answer in your worksheet:

- What URLs have a high number of pages/session?
- Which URLs have a low number of pages/session? 
Consider the differences between these URLs. For example, what kinds of pages have more pages/session and how are they structured? A low number of pages/session could mean your content’s not very engaging, so users aren’t motivated to stick around. 

A few potential reoptimization moves for them:

- Review your content to find weak spots—irrelevant or outdated information, poor writing, etc. Fix them.
- Place strategic CTAs that relate to your product. 
- Add internal links to related posts that users would be interested in. If you notice low pages/session across your blog posts, try adding a “Recommended Posts” section.

### Phase 3.2: Average Time on Page

Besides Pages/Session, we want to look at other user behavior metrics for your content. To find these, go to Behavior in the sidebar. Click **Site Content**, and then click **All Pages**. You should be looking at data for the same timeframe you specified earlier. 

Before diving in, first filter out pages with less than 300 unique pageviews—there isn’t enough data to go off of here. You can do this by clicking **advanced** next to the search bar.

Remember to click the Apply button to use the filter.

Then sort the data table by **Average Time on Page**. 

Answer in your worksheet:

- What URLs have the highest average time on page?
- What URLs have the lowest average time on page?
Consider the differences between these pages and how they’re formatted. Some pages have a very low average time on page relative to the amount of content on them, e.g., a 3,000-word blog post that users spend an average of 11 seconds on. 

Like a low pages/session, people might spend less time on a page because your content isn’t engaging or relevant. To reoptimize these pages, try these tactics:

- Rewrite your introduction, title tag, and/or meta description. Make them accurate—don’t use clickbait or overpromise.
- Embed videos and audio clips to give users an alternate way of processing info besides simply reading text.
- Add interactive elements like quizzes, calculators, and polls.

### Phase 3.3: Exit Percentage

Now sort by **% Exit**. Look for any pages that have a number above 50%. This shows how often people leave your site on that page. List these pages in your worksheet, under:

- What URLs have a high exit percentage (above 50%)?
Here are a few potential fixes to test on these pages:

- Place strategic CTAs that relate to your product. 
- Add internal links to other content that visitors would benefit from, e.g., related blog posts.

### Phase 3.4: CTR

Next, we’ll look at the data shared from Google Search Console (only available if you’ve connected your Google Analytics and Google Search Console accounts). To get to this data, go to Acquisition in the sidebar. Click **Search Console**, and then click **Landing Pages**.

Sort by Impressions in descending order to find the pages that receive the most impressions in search results. Some URLs might get fewer clicks than others despite receiving more impressions, leading to a lower clickthrough rate (CTR).

This indicates that even though users are seeing your page in Google SERPs, they’re not clicking on it. 

What counts as a low vs. high CTR? The higher the CTR, the better. But instead of aiming for a specific CTR, we recommend comparing the current CTRs of different URLs against one another. The pages with low CTRs by comparison are the ones you should focus on. Paste them into your worksheet, under: 

- What URLs have a low CTR? 
One reason behind low organic CTRs: Your page’s title tag and meta description aren’t very enticing or helpful to users, so they’d rather click on another result. Try rewriting these elements for low-performing URLs.

## Phase 4: Keyword Performance

Now under **Search Console** in the sidebar, click **Queries**. Here, Google Search Console data reveals the keywords your content currently ranks for in SERPs. It’s a good place to do two things:

- Confirm whether your content is ranking for its target keywords 
- Find keyword opportunities—phrases that aren’t your primary keyword but that your content appears in SERPs for. You can then create new content or modify existing content to target these keywords.
Sort by **Impressions** in descending order. Ideally, you should see your primary keywords at the top with the most impressions and highest CTRs. But in reality, you may find that your content is ranking for other keywords. 

Scroll through the table to find relevant keyword opportunities. Then answer in your worksheet:

- Which keywords generate the most impressions?
- Which of these high-impression keywords have high CTRs?
- Which of these high-impression keywords have low CTRs?
- List any other potential keyword opportunities that you can either create new content about or edit existing content to target.
There are a few options for what you can do with this insight:

- Edit your current content to better target your primary keywords.
- Edit your current content to better target any new relevant keywords that aren’t your original primary keywords.
- Create new content to target these newly identified keyword opportunities. 

## Phase 5: Links

Not all of Google Search Console’s data is available in Google Analytics. To find out link data, navigate to [Google Search Console](https://search.google.com/search-console). Click **Links** in the sidebar.

You’ll find out your site’s top linked pages, from other websites as well as within your site. For this audit, we want to focus on internal links, so in the Internal links table, click **More** at the bottom. Then sort the table by ascending order to find out which pages have the fewest internal links. 

Answer in your worksheet:

- What URLs have the fewest internal links? 
Your action item here: Add more internal links to important URLs. 

However, if you find any old pages that aren’t quite in line with your website, consider deleting them. For any pages you delete, remember to remove the few internal links that direct to them or [set up a redirect](https://developers.google.com/search/docs/advanced/crawling/301-redirects).

## Next Steps

While it’s impossible to see how every visitor interacts with your site, an SEO audit offers some insight. 

In your SEO Audit Worksheet, you may see an overlap in some answers—for example, the same URLs might have poor user behavior metrics all around. Or maybe the same URLs that have great user behavior metrics also happen to drive the most traffic. You can use these findings to draw conclusions about what is and isn’t working on your site, and then make changes accordingly.

That said, you should log any major content changes somewhere, like in a doc or spreadsheet. Then, after 6-12 months, do another audit. Compare your pages’ performance over time to see how your reoptimization efforts have affected them.