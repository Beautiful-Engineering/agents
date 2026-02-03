# Project: Set Up A/B Test

Unfortunately, Google has sunset its free A/B testing tool, Google Optimize.

We used to have detailed step-by-step instructions to do this, but unfortunately, there are a lot of other options, ranging from $30/mo ([Zoho](https://www.zoho.com/pagesense/optimize/ab-test.html)) to many hundreds or thousands, so it depends on personal preference.

This project will broadly speak on "how to do it" but won't do it step-by-step, unfortunately.

## Prerequisites

- A completed A/B test proposal
- Google Analytics has been set up on your website
- At least 200 visitors to your site a week
NOTE: If Instapage already hosts your current homepage, make an A/B test through their editor. It will be much easier and much less painful.

## Phase 1: Build Your New Landing Page

### Phase 1a: Build It

You already built one landing page. Make one to A/B test against, using the proposal you’ve been building out. Use [Instapage](https://instapage.com/?utm_source=demandcurve&utm_medium=demandcurve&utm_campaign=demandcurve) or whatever website builder you use.

### Phase 1b: DNS records

Log into where you registered your site’s domain name (e.g., Namecheap).

Set up a CNAME record at start.yoursitename.com to point at the new page. (Or ask an engineer to do it.)

## Phase 2: Set up the A/B test tool

This will depend on which tool you choose. But make sure the account is made and ready to go.

## Phase 3: Link to Google Analytics

Make sure you're able to sync up Google Analytics to the page.

## Phase 4: Add the Optimize snippet

Add the A/B test code to your site.

## Phase 5: Run the experiment

### Variants

This will depend on the tool you're using, but this is generally how to do it:

- Click “Add Variant.” Name it “Variant 1” or something more descriptive if you’d like.
- Set the “redirect destination” to be the URL you’re using for the new landing page you want to test, e.g., start.yoursite.com. Hit "Done."

### Phase 5c: Measurement and objectives

What's an objective/goal? This is what you want users to do most on your site — whether it’s clicking the CTA button, signing up, or purchasing.

Make sure it’s early enough in the funnel that many people will do it: you need at least 50 times a week. Otherwise, you won’t get enough data.

A/B testing tools will show the page that performs better: the page where more people do the thing you want.

Configure that in the tool.

## Phase 6: Track events on your variant page

*Skip this section if you've already added tracking on your site (which you should have done when you built the page).*

Ensure that GA and the A/B test tool is accurately tracking your goal event when people visit your variation page. 

## Phase 7: Run a sanity test (Optional)

Assuming your site gets under 1,000 visits a day, it’s worth sanity-checking that your redirect is set up correctly. (It’s notoriously tricky to get right, and lots of teams screw it up.)

To do that, we'll make a copy of your experiment and temporarily set it to redirect 100% of your traffic, instead of only 10%. This allows us to test and verify if everything is working properly manually. We'll then switch the real experiment back on and turn off the copy.

- First, click the 3 dots next to your experiment, and click "Make a copy".

![](https://cdn.prod.website-files.com/5ca4f46f1600f04b73b1ccfe/683e459024c5f4ded631e49f_fe4b1a9b33f8ea39ec751b1e8ef3570608887cc8-1694x264.avif)

- Let's rename the Copy Experiment. Click the three dots in the Draft box, and name it something like "Sanity Test."

![](https://cdn.prod.website-files.com/5ca4f46f1600f04b73b1ccfe/683e459001b7487cbadb028b_98f27d954569d2be48e28da2dc34cd6dfea3859c-2254x202.avif)

- Click the three dots to the far right.
- Next, under **Settings** > **Traffic allocation**, set it to 100%. Then under **Variants and targeting** > **Variants**, click on "**% WEIGHT**" next to the variants. Set 90% of your weight to your Variant, and 10% to the original: 

![](https://cdn.prod.website-files.com/5ca4f46f1600f04b73b1ccfe/683e459017f8edd11ebd1268_8372426d26cf4a3473705caf9565b95e3cece713-1208x962.avif)

- Set the experiment live, then open your site 4-5 times in a bunch of incognito windows. Most of them should redirect to the new page

![](https://cdn.prod.website-files.com/5ca4f46f1600f04b73b1ccfe/683e45903701f316afe6a61b_122170a9cb25a42aaa4e8452e59b1f59dc8bbd82-970x322.avif)

As soon as you’ve proven that your test works, **turn off** the experiment. You can now go back to your real experiment.

## Phase 8: Go Live!

Hit “Start Experiment.” For real this time.

Check out the “Reporting” section of the experiment — this is where your results will show up.

### Measure Paid Traffic Results

Regarding A/B testing, you quickly get diminishing returns on your organic, high-intent traffic because those visitors already came looking for what you sell. The onus on you was to affirm you sell what they want and not to scare them off. They were already primed to convert.

However, with your paid traffic, A/B testing gets you a lot further. These are medium-intent eyeballs at best — usually people who errantly clicked your ad — and are, therefore, looking for an excuse to dismiss your value props and bounce from the page.

If you a/b test very aggressively, you can 5x your conversion rate on paid. Most companies can do this. We’ve done it for them a half-dozen times in the last several months.

Here’s one important takeaway: determine a test's success by measuring the conversion boost mostly on paid traffic. That’s where the delta is large enough to notice the impact.

If you only assess high-intent organic (non-paid search, referrals, and word of mouth), you may not even see a bump and might mistakenly dismiss the test as a failure.

## Set Reminders

Set a reminder to check back in one, four, and seven days.

### 1 Day

Make sure events are actually being recorded on each variant. This is the biggest problem we usually see running A/B tests and it’s totally normal. You might have to debug issues here.

### 4 Days

If the new variant is performing significantly worse than your old landing page, turn the test off. Otherwise, keep waiting.

### 7 Days, 14 days, etc.

Google will funnel traffic to the highest-performing variant automatically. Check back to see what’s winning. If one does, have your devs make that the permanent homepage.