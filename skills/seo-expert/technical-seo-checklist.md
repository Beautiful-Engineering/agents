# Technical SEO Checklist

8-point audit for establishing a solid technical SEO foundation. Each item is scored Red/Yellow/Green.

Source: `seo-fundamentals/05-technical-seo.md`, `seo-build-your-foundation/01-seo-basics.md`

---

## Scoring Rubric

- **Green**: Properly configured, no action needed
- **Yellow**: Partially configured or needs minor improvement
- **Red**: Missing, broken, or critically misconfigured — fix immediately

---

## 1. HTTPS / SSL Certificate

**Check**: WebFetch the site URL. Verify HTTPS with lock icon.

| Score | Criteria |
|-------|----------|
| Green | HTTPS enabled, lock icon visible, no mixed content warnings |
| Yellow | HTTPS enabled but mixed content warnings present |
| Red | No SSL certificate, site loads on HTTP |

**Fix by platform**:
- Squarespace: Automatic HTTPS
- Wix: Settings → Domains → "Secure Your Site"
- WordPress.com: Automatic
- Webflow: Project Settings → Hosting → SSL Certificate
- Custom/Next.js: Configure SSL via hosting provider (Vercel auto-handles)

---

## 2. Google Search Console Setup

**Check**: Ask user if GSC is configured. If not, guide through setup.

| Score | Criteria |
|-------|----------|
| Green | GSC verified, sitemap submitted, data flowing |
| Yellow | GSC verified but sitemap not submitted or <7 days of data |
| Red | GSC not set up |

**Setup steps**:
1. Go to search.google.com/search-console
2. Add property (URL prefix or Domain)
3. Verify ownership (DNS TXT record recommended for domain-level)
4. Submit sitemap URL
5. Wait 24-48 hours for data to start appearing

---

## 3. Google Analytics Setup

**Check**: WebFetch the site, search page source for `gtag`, `GA4`, `G-`, or `analytics`.

| Score | Criteria |
|-------|----------|
| Green | GA4 installed and receiving data, linked to GSC |
| Yellow | GA installed but not linked to GSC |
| Red | No analytics installed |

**Setup**: Install GA4 tracking code. Link GA to GSC under GA Admin → Property Settings → Search Console Links.

---

## 4. Mobile-Friendliness

**Check**: Use PageSpeed Insights API (mobile strategy). Check for mobile usability issues.

```bash
curl -s "https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url={URL}&strategy=mobile&category=ACCESSIBILITY" | python3 -m json.tool | head -50
```

| Score | Criteria |
|-------|----------|
| Green | Responsive design, no mobile usability errors, no intrusive popups |
| Yellow | Minor issues (tap targets too close, text too small) |
| Red | Not mobile-friendly, requires pinch/zoom, intrusive interstitials |

**Key requirements**:
- Responsive web design (adapts to all screen sizes)
- No intrusive mobile pop-ups
- Readable text without zooming
- Adequate tap target sizes

---

## 5. Page Speed / Core Web Vitals

**Check**: PageSpeed Insights API for both mobile and desktop.

```bash
curl -s "https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url={URL}&strategy=mobile" | python3 -c "
import sys, json
data = json.load(sys.stdin)
lh = data.get('lighthouseResult', {}).get('audits', {})
metrics = {
    'Performance Score': data.get('lighthouseResult', {}).get('categories', {}).get('performance', {}).get('score', 'N/A'),
    'LCP': lh.get('largest-contentful-paint', {}).get('displayValue', 'N/A'),
    'FID/TBT': lh.get('total-blocking-time', {}).get('displayValue', 'N/A'),
    'CLS': lh.get('cumulative-layout-shift', {}).get('displayValue', 'N/A'),
    'Speed Index': lh.get('speed-index', {}).get('displayValue', 'N/A'),
}
for k, v in metrics.items():
    print(f'{k}: {v}')
"
```

**Core Web Vitals targets**:
- **LCP** (Largest Contentful Paint): ≤ 2.5 seconds
- **FID/TBT** (First Input Delay / Total Blocking Time): ≤ 100ms / ≤ 200ms
- **CLS** (Cumulative Layout Shift): < 0.1

| Score | Criteria |
|-------|----------|
| Green | Performance score ≥ 70, all CWV in green |
| Yellow | Performance score 50-69, one CWV in yellow |
| Red | Performance score < 50, any CWV in red |

**Quick speed fixes**:
- Compress images (TinyPNG, or WebP format)
- Resize images to actual display size
- Remove unused plugins/scripts
- Limit auto-playing videos
- Use CDN (Cloudflare, Vercel Edge)
- Quality hosting (not cheapest shared)
- Lazy load below-fold images

---

## 6. Robots.txt

**Check**: WebFetch `{site}/robots.txt`

| Score | Criteria |
|-------|----------|
| Green | Exists, doesn't block important pages, includes sitemap reference |
| Yellow | Exists but missing sitemap reference or blocking some useful pages |
| Red | Blocks important pages/sections, or returns 404 when site has >10K pages |

**Notes**:
- Most small sites don't need a complex robots.txt
- Only needed for sites with >10,000 unique pages changing weekly+
- Used to disallow: staging environments, filtered/faceted pages, internal search results
- Should reference sitemap: `Sitemap: https://example.com/sitemap.xml`

---

## 7. XML Sitemap

**Check**: WebFetch `{site}/sitemap.xml` (also try `/sitemap_index.xml`)

| Score | Criteria |
|-------|----------|
| Green | Valid XML sitemap, all important pages included, submitted to GSC |
| Yellow | Sitemap exists but missing pages or not submitted to GSC |
| Red | No sitemap, or sitemap returns 404 |

**Requirements**:
- Lists all important pages (not utility pages like privacy/terms)
- Valid XML format
- Submitted via GSC (Sitemaps → Add a new sitemap)
- Updated automatically when new pages are added
- Most CMS platforms generate this automatically (WordPress/Yoast, Webflow, Squarespace)

---

## 8. Ahrefs Site Audit

**Check**: Run `mcp__ahrefs__site-audit-page-explorer` with the site domain.

Categorize all issues found:

| Priority | Issue Types |
|----------|-------------|
| **Critical** | Broken pages (4xx/5xx), broken redirects, orphan pages with no internal links, pages not in sitemap but indexed |
| **Warning** | Slow pages (>3s), missing title tags, duplicate titles/metas, missing alt text, redirect chains |
| **Notice** | Long titles (>60 chars), short meta descriptions, missing H1, low word count pages |

**Workflow after audit**:
1. List all issues by priority
2. Fix Critical issues first (directly in codebase when possible)
3. Fix Warnings next
4. Address Notices as time allows
5. Deploy fixes
6. Trigger Ahrefs re-crawl
7. Verify all critical/warning issues resolved

---

## Deliverable Template

```markdown
# Technical SEO Foundation — [Site URL]
Date: [YYYY-MM-DD]

## Summary Scorecard

| Check | Score | Notes |
|-------|-------|-------|
| HTTPS/SSL | [R/Y/G] | |
| Google Search Console | [R/Y/G] | |
| Google Analytics | [R/Y/G] | |
| Mobile-Friendliness | [R/Y/G] | |
| Page Speed / CWV | [R/Y/G] | LCP: _, TBT: _, CLS: _ |
| Robots.txt | [R/Y/G] | |
| XML Sitemap | [R/Y/G] | |
| Ahrefs Site Audit | [R/Y/G] | Critical: _, Warning: _, Notice: _ |

## Overall Score: [X/8 Green]

## Detailed Findings

### [Item]: [Score]
- Finding: [what was found]
- Impact: [why it matters]
- Fix: [specific action to take]
- Status: [fixed | needs user action | needs developer]

## Priority Fix List

### Critical (fix today)
1. ...

### Warning (fix this week)
1. ...

### Notice (fix when convenient)
1. ...

## What's Next
Phase 2: On-Page Optimization — we'll audit your top pages for title tags, meta descriptions, headings, images, and internal links.
```
