# Technical SEO

On-page SEO also includes **technical SEO**, website and server optimizations that help search engine crawlers understand and index your websites’ content more easily. The goal is to optimize for Google’s [Core Web Vitals](https://web.dev/vitals/#core-web-vitals), the factors Google considers most important in a website’s user experience:

- **Loading: **How fast it takes for your page to load
- **Interactivity:** How long it takes for users to interact with your content, like clicking on your navigation menu
- **Visual stability: **Whether elements on your page move around as it loads (ideally, they don’t)
Technical SEO isn’t just for satisfying search engines. The idea behind the Core Web Vitals is that users enjoy and benefit most from websites that are fast, clear, and easy to use. 

Some of the earlier on-page tactics we discussed also optimize for these vitals, like image optimization. However, in this lesson, we’ll cover more technical tactics:

- HTTPS
- Indexability
- Mobile usability
- Robots.txt file
- Schema markup 
Heads up: Some of these tactics require advanced web development skills—you may not be able to handle them without a developer or technical SEO specialist. Still, you should read this section to develop an understanding of what needs to be done on the technical side; this will set you up to vet potential hires and identify candidates that really know their stuff.  

Oftentimes you can hire a freelance developer or technical SEO specialist to help execute these tactics on a project basis, and then do a periodic technical SEO audit a few times a year. These issues don’t usually require constant attention. 

The exception here is large websites that are programmatically driven—for example, marketplaces like Poshmark or Airbnb. These tend to require more ongoing SEO maintenance, in which case we recommend hiring an inhouse technical SEO specialist. 

Whether inhouse or freelance, if you don’t already have these resources, ask around your network or a paid community like [Traffic Think Tank](https://trafficthinktank.com/) for recommendations. Or advertise your job posting to a more targeted community. With platforms like Upwork, you often need to sift through a lot of low-quality candidates—and if you’re not a technical SEO expert yourself, it’s not always clear who’s actually qualified. 

## HTTPS

Take a look at how these two URLs appear in your browser:

![](https://cdn.prod.website-files.com/5ca4f46f1600f04b73b1ccfe/683d270ebb11df9731b89606_1636071343776.avif)

The difference is HTTPS, an internet communication protocol that protects the data shared between a user and a website. The alternative, an HTTP connection, is less secure.

Google announced [HTTPS as a ranking signal](https://developers.google.com/search/blog/2014/08/https-as-ranking-signal) in 2014. Apart from its SEO benefits, using HTTPS also enhances the user experience by making visitors more comfortable on your site. You can set it up for your site with an SSL certificate, which is often offered by your web host.

For example, with DreamHost, you can see which sites aren’t secure under the Manage Domains option. 

![](https://cdn.prod.website-files.com/5ca4f46f1600f04b73b1ccfe/683d270e1185f97765588959_1636071346545.avif)

Click on the site you want to secure; then follow the prompts to activate it.

If your web host doesn’t offer SSL certificates, get one from a Certificate Authority like [GoDaddy](https://www.godaddy.com/web-security/ssl-certificate) or [Namecheap](https://www.namecheap.com/security/ssl-certificates/). You’ll need to install it yourself, but whatever authority you get it from will provide instructions about this process.

## Indexability

Search engine crawlers visit web pages to analyze their content and then store them in Google’s index. It’s these indexed pages that appear in SERPs—so if your content isn’t indexed, it won’t show up in search results.

To find out whether your site has any indexability issues, use [GSC](https://search.google.com/search-console/welcome). Click Coverage (under Index) in the sidebar. It’ll show any non-indexed pages as errors. 

![](https://cdn.prod.website-files.com/5ca4f46f1600f04b73b1ccfe/683d270f35cea17eb0a028b4_1636071350876.avif)

To find out if a specific page has been indexed, you can look it up using GSC’s [URL Inspection Tool](https://support.google.com/webmasters/answer/9012289?hl=en). 

![](https://cdn.prod.website-files.com/5ca4f46f1600f04b73b1ccfe/683d270ff829b64f0b4a31d3_1636071347696.avif)

If a page isn’t indexed, the URL Inspection Tool will tell you. Click the Request Indexing button to bring it to Google’s attention. You can also do this for pages that are already indexed but that have been updated recently.

### Mobile-first indexing

With more and more users browsing content on their phones, Google has shifted to [mobile-first indexing](https://developers.google.com/search/mobile-sites/mobile-first-indexing). 

What this means: Google crawls and indexes sites’ mobile versions. You can confirm this in GSC’s Coverage report, which shows how Google crawls your site. 

![](https://cdn.prod.website-files.com/5ca4f46f1600f04b73b1ccfe/683d270fbaa8dc9c0d8b6f23_1636071344509.avif)

For most businesses, this won’t cause major problems. It’s a bigger concern for websites that have very different desktop and mobile versions—for example, less content on their mobile site or different URLs (www.example.com vs. m.example.com). 

If you do hide content on your mobile site or use separate URLs for a mobile and desktop version, stop. Work with your developer to ensure that your content is the same on both mobile and desktop. 

## Mobile usability

While your website content should be the same on both mobile and desktop, it should be just as accessible on mobile as it is on desktop. This is the concept of mobile usability, which is separate from mobile-first indexing.

It’s not about having the same exact appearance on different devices. Rather, making your site mobile-friendly means visitors can easily navigate it and read content despite viewing it on a smaller screen. 

Use [Google’s Mobile-Friendly Test](https://search.google.com/test/mobile-friendly) to find out whether your site is mobile-friendly. Bring up any identified issues with your web developer. 

Some tactics for better usability:

- **Use a responsive web design.** Responsive designs adapt content to the device it’s being viewed on—for example, landscape-orientation pages become oriented for portrait, and images automatically resize. This way, users don’t have to pinch and zoom.
- Many CMS platforms like WordPress offer responsive site themes so you don’t necessarily need a developer’s help here. Rather, switch to a responsive theme for your site.

- **Disable intrusive pop-ups on mobile.** These are the pop-ups that cover content and must be dismissed before users can read your page. Most pop-up plugins have smart targeting that let you specify where these show. Non-intrusive pop-ups, like slide-ins, are preferred since they don’t disrupt the user experience.
- **Improve page speed.** A slow user experience makes it harder for users to find what they’re looking for on your site. We’ve covered a few tactics like compressing your images to improve page speed, but there are more technical aspects like removing unnecessary scripts from your site’s source code.
- Use Google’s [PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/) to analyze your site’s speed, and be sure to check both your mobile and desktop score. You can also use [Lighthouse](https://developers.google.com/web/tools/lighthouse) for detailed recommendations. This information is quite technical, so it’s best to review this with a developer. 

## Robots.txt file

Robots.txt is a text file that instructs search crawlers how to crawl your site. It’s used to disallow web pages, which tells Googlebot to focus elsewhere. 

Most websites don’t need a robots.txt file, especially new companies just starting out. It makes the most sense for sites with more than 10,000 unique pages that change frequently—at least once a week or more often.

For these larger, frequently changing sites, a robots.txt file helps Googlebot prioritize which content to crawl. You’d disallow less important content that users don’t need to see in SERPs, like your staging site, filtered product category pages, and internal search results pages.

You can create a robots.txt file by using a free robots.txt generator like [this one from SEO Book](http://tools.seobook.com/robots-txt/generator/). Once complete, upload the robots.txt file to your site’s root domain. 

## Schema markup

Schema markups (also known as structured data) are snippets of code that, when added to your web pages, give Google more information about how to represent your content in SERPs. You’ve no doubt seen them before.

![](https://cdn.prod.website-files.com/5ca4f46f1600f04b73b1ccfe/683d270e73a0abb80699fb4f_1636071351443.avif)

Several types exist, and you can find more details about each on [schema.org](https://schema.org/docs/schemas.html).

There’s no evidence that schema directly affects SEO—but it does improve user experience. How so? It gives visitors more insight about your content, which can then encourage them to actually click on your site. For example, a user looking for a specific item might be motivated to click on a result after seeing product schema that indicates it’s currently in stock.

![](https://cdn.prod.website-files.com/5ca4f46f1600f04b73b1ccfe/683d270f024257bbe5af4824_1636071345056.avif)

Not as many websites as you might expect actually use schema, so adding it can make your content leave a stronger impression on users and improve clickthrough. We especially recommend adding the following schema:

- **FAQ: **Add this markup to not only your actual FAQ page but also your product and service pages. By addressing user objections and concerns, this schema gives more readers info than your meta description on its own.

![](https://cdn.prod.website-files.com/5ca4f46f1600f04b73b1ccfe/683d270e2c5be804fba35ba0_1636071349841.avif)

- **Product/offer:** This schema shows price and availability. If your competitors don’t use it, it’s a quick way for your page to stand out. If they do use it, it helps users quickly compare products from different search results. 
- **Ratings and reviews:** This schema functions as social proof. A search result with obviously good ratings and reviews is a lot more enticing than one without any of this information.
- **Video:** Since this schema enables a video thumbnail in SERPs, your content gets a visual element that text-only search results lack.

![](https://cdn.prod.website-files.com/5ca4f46f1600f04b73b1ccfe/683d270e6a6b1fb8aa2828d1_1636071349083.avif)

To set up schema markup, use Google’s [Structured Data Markup Helper](https://www.google.com/webmasters/markup-helper/u/0/) or another free online generator like [TechnicalSEO.com’s](https://technicalseo.com/tools/schema-markup-generator/). These tools walk you through the markup process and then provide a code to be added to a specific page’s HTML code.