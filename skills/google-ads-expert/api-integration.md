# Google Ads API Integration

Authentication patterns, endpoint references, GAQL query templates, and response field mappings for the Google Ads Expert agent.

---

## Required Environment Variables

```
GOOGLE_ADS_DEVELOPER_TOKEN   — Developer token from Google Ads API Center
GOOGLE_ADS_CLIENT_ID         — OAuth 2.0 client ID (from Google Cloud Console)
GOOGLE_ADS_CLIENT_SECRET     — OAuth 2.0 client secret
GOOGLE_ADS_REFRESH_TOKEN     — OAuth 2.0 refresh token (from consent flow)
GOOGLE_ADS_CUSTOMER_ID       — Google Ads customer ID (no dashes, e.g., 1234567890)
GOOGLE_ADS_LOGIN_CUSTOMER_ID — (Optional) Manager account ID if using MCC
```

**Never ask the user to paste secrets into chat. Never write credentials to any project file.**

---

## Setup Checklist

1. **Google Cloud Project**: Create at console.cloud.google.com
2. **Enable Google Ads API**: APIs & Services > Enable "Google Ads API"
3. **OAuth Credentials**: Create OAuth 2.0 client ID (Desktop app type)
4. **Developer Token**: Apply at Google Ads > Tools > API Center. Starts as test token (limited to own account), production requires review.
5. **Refresh Token**: Run the OAuth consent flow once to generate a long-lived refresh token
6. **Customer ID**: Found in Google Ads dashboard top-right (remove dashes)

### OAuth Consent Flow (One-Time Setup)

```python
#!/usr/bin/env python3
"""One-time OAuth consent flow to get a refresh token."""

import os
from google_auth_oauthlib.flow import InstalledAppFlow

SCOPES = ["https://www.googleapis.com/auth/adwords"]

def get_refresh_token():
    client_config = {
        "installed": {
            "client_id": os.environ["GOOGLE_ADS_CLIENT_ID"],
            "client_secret": os.environ["GOOGLE_ADS_CLIENT_SECRET"],
            "auth_uri": "https://accounts.google.com/o/oauth2/auth",
            "token_uri": "https://oauth2.googleapis.com/token",
        }
    }
    flow = InstalledAppFlow.from_client_config(client_config, scopes=SCOPES)
    flow.run_local_server(port=8080)
    print(f"Refresh token: {flow.credentials.refresh_token}")
    print("Save this as GOOGLE_ADS_REFRESH_TOKEN environment variable.")

if __name__ == "__main__":
    get_refresh_token()
```

---

## Step 1: Authenticate (OAuth 2.0 Refresh Token Flow)

```python
#!/usr/bin/env python3
"""Get a fresh access token from a refresh token."""

import os
import requests

def get_access_token():
    resp = requests.post(
        "https://oauth2.googleapis.com/token",
        data={
            "grant_type": "refresh_token",
            "client_id": os.environ["GOOGLE_ADS_CLIENT_ID"],
            "client_secret": os.environ["GOOGLE_ADS_CLIENT_SECRET"],
            "refresh_token": os.environ["GOOGLE_ADS_REFRESH_TOKEN"],
        },
    )
    resp.raise_for_status()
    return resp.json()["access_token"]

if __name__ == "__main__":
    token = get_access_token()
    print(token)
```

---

## Step 2: API Base URL and Headers

Google Ads REST API v18:

```python
API_VERSION = "v18"
BASE_URL = f"https://googleads.googleapis.com/{API_VERSION}"

def get_headers(access_token, developer_token, login_customer_id=None):
    headers = {
        "Authorization": f"Bearer {access_token}",
        "developer-token": developer_token,
        "Content-Type": "application/json",
    }
    if login_customer_id:
        headers["login-customer-id"] = login_customer_id
    return headers
```

---

## Step 3: GAQL (Google Ads Query Language)

All data is pulled via GAQL queries sent to the `googleads:searchStream` endpoint.

```python
def execute_gaql(access_token, customer_id, query, developer_token, login_customer_id=None):
    url = f"{BASE_URL}/customers/{customer_id}/googleAds:searchStream"
    headers = get_headers(access_token, developer_token, login_customer_id)
    body = {"query": query}
    resp = requests.post(url, json=body, headers=headers)
    resp.raise_for_status()
    results = resp.json()
    # searchStream returns a list of result batches
    rows = []
    for batch in results:
        rows.extend(batch.get("results", []))
    return rows
```

---

## Step 4: Date Range Helper

Google Ads uses 14-day windows by default (longer than Apple Ads due to broad match + Smart Bidding learning periods).

```python
from datetime import date, timedelta

def last_14_days():
    today = date.today()
    end   = today - timedelta(days=1)      # yesterday
    start = today - timedelta(days=14)     # 14 days ago
    return str(start), str(end)            # "YYYY-MM-DD", "YYYY-MM-DD"

def format_date_range(start, end):
    """Format for GAQL WHERE clause."""
    return f"segments.date BETWEEN '{start}' AND '{end}'"
```

---

## Step 5: Campaign Performance Report

```python
CAMPAIGN_QUERY = """
    SELECT
        campaign.id,
        campaign.name,
        campaign.status,
        campaign.advertising_channel_type,
        campaign.bidding_strategy_type,
        campaign.campaign_budget,
        metrics.impressions,
        metrics.clicks,
        metrics.conversions,
        metrics.conversions_value,
        metrics.cost_micros,
        metrics.ctr,
        metrics.average_cpc,
        metrics.cost_per_conversion,
        metrics.search_impression_share,
        metrics.search_budget_lost_impression_share,
        metrics.search_rank_lost_impression_share
    FROM campaign
    WHERE {date_range}
        AND campaign.status != 'REMOVED'
    ORDER BY metrics.cost_micros DESC
"""
```

**Key response fields:**

| Field | Meaning |
|-------|---------|
| `metrics.cost_micros` | Spend in micros (divide by 1,000,000 for currency) |
| `metrics.impressions` | Total impressions |
| `metrics.clicks` | Total clicks |
| `metrics.conversions` | Total conversions (may be fractional due to attribution) |
| `metrics.conversions_value` | Total conversion value (revenue) |
| `metrics.ctr` | Click-through rate (decimal, e.g., 0.035 = 3.5%) |
| `metrics.average_cpc` | Average CPC in micros |
| `metrics.cost_per_conversion` | CPA in micros |
| `metrics.search_impression_share` | Impression share (decimal) |
| `campaign.advertising_channel_type` | SEARCH, PERFORMANCE_MAX, SHOPPING, DISPLAY |
| `campaign.bidding_strategy_type` | MANUAL_CPC, TARGET_CPA, TARGET_ROAS, MAXIMIZE_CONVERSIONS, etc. |

---

## Step 6: Ad Group Performance Report

```python
AD_GROUP_QUERY = """
    SELECT
        campaign.id,
        campaign.name,
        ad_group.id,
        ad_group.name,
        ad_group.status,
        ad_group.type,
        metrics.impressions,
        metrics.clicks,
        metrics.conversions,
        metrics.conversions_value,
        metrics.cost_micros,
        metrics.ctr,
        metrics.cost_per_conversion
    FROM ad_group
    WHERE {date_range}
        AND ad_group.status != 'REMOVED'
    ORDER BY metrics.cost_micros DESC
"""
```

---

## Step 7: Keyword Performance Report

```python
KEYWORD_QUERY = """
    SELECT
        campaign.id,
        campaign.name,
        ad_group.id,
        ad_group.name,
        ad_group_criterion.keyword.text,
        ad_group_criterion.keyword.match_type,
        ad_group_criterion.quality_info.quality_score,
        ad_group_criterion.quality_info.creative_quality_score,
        ad_group_criterion.quality_info.post_click_quality_score,
        ad_group_criterion.quality_info.search_predicted_ctr,
        ad_group_criterion.status,
        metrics.impressions,
        metrics.clicks,
        metrics.conversions,
        metrics.conversions_value,
        metrics.cost_micros,
        metrics.ctr,
        metrics.average_cpc,
        metrics.cost_per_conversion,
        metrics.search_impression_share
    FROM keyword_view
    WHERE {date_range}
        AND ad_group_criterion.status != 'REMOVED'
    ORDER BY metrics.cost_micros DESC
"""
```

**Additional keyword fields:**

| Field | Meaning |
|-------|---------|
| `ad_group_criterion.keyword.text` | Keyword text |
| `ad_group_criterion.keyword.match_type` | EXACT, PHRASE, BROAD |
| `ad_group_criterion.quality_info.quality_score` | 1-10 Quality Score |
| `ad_group_criterion.quality_info.creative_quality_score` | BELOW_AVERAGE, AVERAGE, ABOVE_AVERAGE |
| `ad_group_criterion.quality_info.post_click_quality_score` | Landing page experience rating |
| `ad_group_criterion.quality_info.search_predicted_ctr` | Expected CTR rating |

---

## Step 8: Search Terms Report

```python
SEARCH_TERMS_QUERY = """
    SELECT
        campaign.id,
        campaign.name,
        ad_group.id,
        search_term_view.search_term,
        search_term_view.status,
        metrics.impressions,
        metrics.clicks,
        metrics.conversions,
        metrics.conversions_value,
        metrics.cost_micros,
        metrics.ctr,
        metrics.cost_per_conversion
    FROM search_term_view
    WHERE {date_range}
    ORDER BY metrics.cost_micros DESC
"""
```

**Search term fields:**

| Field | Meaning |
|-------|---------|
| `search_term_view.search_term` | Actual query the user typed |
| `search_term_view.status` | ADDED, EXCLUDED, NONE (whether it's already a keyword or negative) |

---

## Step 9: Ad Performance Report (RSA)

```python
AD_PERFORMANCE_QUERY = """
    SELECT
        campaign.id,
        campaign.name,
        ad_group.id,
        ad_group_ad.ad.id,
        ad_group_ad.ad.type,
        ad_group_ad.ad.responsive_search_ad.headlines,
        ad_group_ad.ad.responsive_search_ad.descriptions,
        ad_group_ad.ad_strength,
        metrics.impressions,
        metrics.clicks,
        metrics.conversions,
        metrics.cost_micros,
        metrics.ctr,
        metrics.cost_per_conversion
    FROM ad_group_ad
    WHERE {date_range}
        AND ad_group_ad.status != 'REMOVED'
    ORDER BY metrics.impressions DESC
"""
```

---

## Step 10: Asset Performance Report (PMax)

```python
ASSET_PERFORMANCE_QUERY = """
    SELECT
        campaign.id,
        campaign.name,
        asset.id,
        asset.name,
        asset.type,
        asset.text_asset.text,
        asset_group_asset.performance_label,
        asset_group_asset.status
    FROM asset_group_asset
    WHERE campaign.advertising_channel_type = 'PERFORMANCE_MAX'
"""
```

**Performance labels:** `BEST`, `GOOD`, `LOW`, `LEARNING`, `PENDING`

---

## Config File Template

Write this to `google-ads/config.md` during orientation setup:

```markdown
# Google Ads Config — [Business Name]

## Account Info
- **Business Name**: [Name]
- **Customer ID**: [1234567890]
- **Currency**: [USD]
- **Business Type**: [Ecommerce / SaaS / Lead Gen / B2B Services]
- **Website**: [URL]

## Targets
- **Target CPA**: $[X.XX]
- **Target ROAS**: [X]% (if ecommerce/revenue tracking)
- **Monthly Budget**: $[X,XXX]

## Campaigns

| Campaign Name | Type | Bid Strategy | Daily Budget |
|---------------|------|-------------|-------------|
| [Name] | SEARCH | TARGET_CPA | $XX |
| [Name] | PERFORMANCE_MAX | MAXIMIZE_CONVERSIONS | $XX |
| [Name] | SHOPPING | TARGET_ROAS | $XX |

## Conversion Actions
- Primary: [e.g., Purchase, Lead Form Submit, Trial Signup]
- Secondary: [e.g., Add to Cart, Page View]

## Rubric Overrides
(Leave blank to use defaults from rubric.md)
- Target CPA:
- Target ROAS:
- Min CTR (Brand):
- Min CTR (Generic):
- Min Quality Score:
```

---

## Error Handling Reference

| Error | Cause | Fix |
|-------|-------|-----|
| `401 UNAUTHENTICATED` | Expired access token | Re-run auth to get fresh access token from refresh token |
| `403 PERMISSION_DENIED` | Developer token issue or wrong customer ID | Verify developer token is approved and customer ID is correct |
| `429 RESOURCE_EXHAUSTED` | Rate limit hit | Wait 60s; implement exponential backoff |
| `400 INVALID_ARGUMENT` | Bad GAQL syntax or invalid date range | Check query syntax and date format (YYYY-MM-DD) |
| `404 NOT_FOUND` | Customer ID doesn't exist | Verify customer ID (no dashes) |
| Refresh token expired | User revoked access or token rotated | Re-run OAuth consent flow |

---

## Required Python Packages

```
google-auth>=2.0.0
google-auth-oauthlib>=1.0.0
requests>=2.31.0
```

Install check:
```bash
python3 -c "import google.auth, requests; print('Dependencies OK')" 2>/dev/null || \
  pip3 install google-auth google-auth-oauthlib requests
```

---

## gitignore Entries

Add to the project's `.gitignore`:
```
google-ads/raw/
```

Raw API JSON files are for debugging only and should not be committed.
