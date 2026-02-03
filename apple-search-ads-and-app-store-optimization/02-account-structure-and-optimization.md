# Account Structure and Optimization

*Note: this reading is fairly technical in nature and it will make more sense when you do the project. It’s OK if you don’t understand the words in it right now.*

The recommended structure for Apple Search Ads is quite different from all other channels. We got our strategy from an Apple rep, so it’s best to follow it.

With AdWords, you usually target broad match modifiers, with an occasional exact match if a term is really important and frequent. For example, if you’re targeting people who bet on the soccer world cup, you might target the broad term “+sports +betting” with an exact match of “world cup sportsbook”.

On AdWords, you also do keyword research with the Keyword Planner, AdWords itself, and SEMrush.

But with Apple, you focus on exact keywords, and only use a broad match campaign to do keyword mining for you.

Basically it ends up looking like the chart below:

![](https://cdn.prod.website-files.com/5ca4f46f1600f04b73b1ccfe/683959a61617de7db4313aa9_1632183654073.avif)

## Campaigns

You have four campaigns:

### Brand

All keywords that contain the name of the business and/or product. They can be just the business name, like “service” or a combination of the business name and what it does “service flight delays”

### Competitor

All keywords that include competitor’s names

### Generic

This contains all keywords that aren’t Brand or Competitor related.

### Discovery

A campaign designed to discover new keywords (your broad matches).

The non-Discovery campaigns (Brand, Competitor, and Generic) contain **nothing but exact match keywords** and **do not have Search Match enabled** (more on this later).

### Why do we do this?

Apple Search Ads supposedly work best with exact match. You get more impressions and clicks, and more control. So we opt to have everything we can as an exact match keyword.

But the Discovery campaign is what’s working to mine for new keywords to target in our other campaigns. More on how it does this below.

## Ad groups

Although Apple suggests just using one ad group for the 3 non-Discovery campaigns, and two for Discovery, we will apply the structure that we normally follow for AdWords where each ad group is a distinct grouping of relative keywords.

Examples:

- Anything to do with “flights” will be under a Flight ad group.
- Anything under “travel” will be under a Travel ad group. And so on.
Although it’s unclear if this improves the Apple equivalent of AdWords’ Quality Score (the internal metric used to determine the legitimacy and quality of your ad) and thus lowering CPCs and increasing impressions, it’s possible.

It also makes the campaigns much better organized and easily parsed. It’ll make optimization easier as well.

## Creative Sets

If you’ve opted to create a Creative Set for a particular ad group, make sure to configure it as you create the ad group, otherwise you can leave it blank.

## Keywords

How to source keyword ideas:

- Type in related words to the suggestion tool and see what comes up
- Use the Google Keyword Planner
- Steal the keywords from AdWords
- Rack your brain

## Discovery

As mentioned before, the Discovery campaign is what is doing the keyword research for you. Its sole purpose is to find new keywords to add as exact match to the other campaigns.

You achieve this with two ad groups, Broad Match and Search Match.

## Broad Match

One ad group called Broad Match will include every keyword we have in the other 3 campaigns, just as broad match instead of exact match. Create the other campaigns and simply port them all over to this ad group as broad match keywords

## Search Match

The other called Search Match will use Apple’s internal ML algorithm to match user’s search terms to the app’s title, subtitle, and description to determine if the app is relevant to them. It’s super simple to set up and requires no keywords. Just create it and let it run.

*Note: Creative Sets aren’t a good match for the Discovery campaign since they’re meant to be as broad as possible. The default images are likely your best bet.* 

## Optimizing

As we optimize, we periodically check the keyword performance and Search Terms of the Discovery campaign to find well performing and interesting keywords that you can add to the other campaigns as exact match terms.

The steps for this are:

- Identify well performing exact match keyword in discovery campaign
- Add keyword to relevant campaign/ad set, with an exact match keyword
- Add that keyword as a negative keyword to the Discovery campaign