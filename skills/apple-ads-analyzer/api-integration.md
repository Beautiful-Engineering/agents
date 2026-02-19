# Apple Search Ads API Integration

Authentication patterns, endpoint references, response field mappings, and RevenueCat join logic for the Apple Ads Analyzer.

---

## Required Python Packages

```
PyJWT>=2.8.0
cryptography>=42.0.0
requests>=2.31.0
```

Install check (run before first use):
```bash
python3 -c "import jwt, cryptography, requests; print('Dependencies OK')" 2>/dev/null || \
  pip3 install PyJWT cryptography requests
```

---

## Step 1: Generate ES256 JWT

Apple Search Ads uses a private key (`.p8` file) to sign a JWT, which is then exchanged for an OAuth access token.

```python
#!/usr/bin/env python3
"""Generate Apple Search Ads OAuth access token from .p8 private key."""

import os
import time
import jwt
import requests

def get_access_token():
    client_id = os.environ["APPLE_ADS_CLIENT_ID"]
    team_id   = os.environ["APPLE_ADS_TEAM_ID"]
    key_id    = os.environ["APPLE_ADS_KEY_ID"]
    key_path  = os.environ["APPLE_ADS_KEY_PATH"]

    with open(key_path, "r") as f:
        private_key = f.read()

    now = int(time.time())
    payload = {
        "sub": client_id,
        "aud": "https://appleid.apple.com",
        "iat": now,
        "exp": now + 3600,  # 1-hour expiry
        "iss": team_id,
    }

    client_secret = jwt.encode(
        payload,
        private_key,
        algorithm="ES256",
        headers={"kid": key_id, "alg": "ES256"},
    )

    # Exchange client secret for access token
    token_response = requests.post(
        "https://appleid.apple.com/auth/oauth2/token",
        data={
            "grant_type": "client_credentials",
            "client_id": client_id,
            "client_secret": client_secret,
            "scope": "searchadsorg",
        },
    )
    token_response.raise_for_status()
    return token_response.json()["access_token"]

if __name__ == "__main__":
    token = get_access_token()
    print(token)
```

Save as `apple-ads/scripts/get_token.py` (this file is safe to commit — no credentials inside).

---

## Step 2: API Base URL and Headers

```python
BASE_URL = "https://api.searchads.apple.com/api/v4"

def get_headers(access_token, org_id):
    return {
        "Authorization": f"Bearer {access_token}",
        "X-AP-Context": f"orgId={org_id}",
        "Content-Type": "application/json",
    }
```

---

## Step 3: Date Range Helper

```python
from datetime import date, timedelta

def last_7_days():
    today = date.today()
    end   = today - timedelta(days=1)      # yesterday
    start = today - timedelta(days=7)      # 7 days ago
    return str(start), str(end)            # "YYYY-MM-DD", "YYYY-MM-DD"
```

---

## Step 4: Campaign-Level Report

```python
def pull_campaign_report(token, org_id, start_date, end_date):
    url = f"{BASE_URL}/reports/campaigns"
    headers = get_headers(token, org_id)
    body = {
        "startTime": start_date,
        "endTime": end_date,
        "selector": {
            "orderBy": [{"field": "localSpend", "sortOrder": "DESCENDING"}],
            "pagination": {"offset": 0, "limit": 100},
        },
        "groupBy": ["campaignId"],
        "granularity": "TOTAL",
        "returnGrandTotals": True,
        "returnRecordsWithNoMetrics": False,
        "timeZone": "UTC",
    }
    resp = requests.post(url, json=body, headers=headers)
    resp.raise_for_status()
    return resp.json()
```

**Key response fields** (inside `data.reportingDataResponse.row[].metrics`):

| Field | Meaning |
|-------|---------|
| `localSpend.amount` | Spend in account currency |
| `impressions` | Total ad impressions |
| `taps` | Total taps (clicks) |
| `installs` | Confirmed installs |
| `newDownloads` | First-time installs (subset of installs) |
| `avgCPA.amount` | Average Cost Per Acquisition (= CPI) |
| `avgCPT.amount` | Average Cost Per Tap (bid proxy) |
| `conversionRate` | CR = installs ÷ taps |
| `tapThroughRate` | TTR = taps ÷ impressions |

Campaign metadata (in `data.reportingDataResponse.row[].metadata`):

| Field | Meaning |
|-------|---------|
| `campaignId` | Numeric campaign ID |
| `campaignName` | Campaign display name |
| `campaignStatus` | ENABLED / PAUSED |
| `totalBudgetAmount.amount` | Campaign lifetime budget |
| `dailyBudgetAmount.amount` | Daily budget cap |

---

## Step 5: Ad Group-Level Report

```python
def pull_adgroup_report(token, org_id, campaign_id, start_date, end_date):
    url = f"{BASE_URL}/reports/campaigns/{campaign_id}/adgroups"
    headers = get_headers(token, org_id)
    body = {
        "startTime": start_date,
        "endTime": end_date,
        "selector": {"pagination": {"offset": 0, "limit": 100}},
        "groupBy": ["adGroupId"],
        "granularity": "TOTAL",
        "returnGrandTotals": False,
        "returnRecordsWithNoMetrics": False,
    }
    resp = requests.post(url, json=body, headers=headers)
    resp.raise_for_status()
    return resp.json()
```

---

## Step 6: Keyword-Level Report

```python
def pull_keyword_report(token, org_id, campaign_id, start_date, end_date):
    url = f"{BASE_URL}/reports/campaigns/{campaign_id}/keywords"
    headers = get_headers(token, org_id)
    body = {
        "startTime": start_date,
        "endTime": end_date,
        "selector": {
            "conditions": [
                {"field": "keywordStatus", "operator": "IN", "values": ["ACTIVE", "PAUSED"]},
            ],
            "pagination": {"offset": 0, "limit": 1000},
        },
        "groupBy": ["keywordId"],
        "granularity": "TOTAL",
        "returnRecordsWithNoMetrics": False,
    }
    resp = requests.post(url, json=body, headers=headers)
    resp.raise_for_status()
    return resp.json()
```

**Additional keyword fields** (in `metadata`):

| Field | Meaning |
|-------|---------|
| `keywordId` | Numeric keyword ID |
| `keyword` | Keyword text |
| `matchType` | EXACT / BROAD / SEARCH_MATCH |
| `bidAmount.amount` | Current bid |
| `keywordStatus` | ACTIVE / PAUSED / DELETED |

---

## Step 7: Search Term Report (Discovery Campaign)

```python
def pull_search_term_report(token, org_id, campaign_id, start_date, end_date):
    url = f"{BASE_URL}/reports/campaigns/{campaign_id}/searchterms"
    headers = get_headers(token, org_id)
    body = {
        "startTime": start_date,
        "endTime": end_date,
        "selector": {
            "pagination": {"offset": 0, "limit": 1000},
        },
        "groupBy": ["searchTermText"],
        "granularity": "TOTAL",
        "returnRecordsWithNoMetrics": False,
    }
    resp = requests.post(url, json=body, headers=headers)
    resp.raise_for_status()
    return resp.json()
```

Search term response fields (in `metadata`):

| Field | Meaning |
|-------|---------|
| `searchTermText` | The exact search query typed by user |
| `keywordId` | Which keyword matched it |
| `keyword` | Keyword that matched |
| `matchType` | Match type that triggered this term |

---

## Step 8: RevenueCat MCP Integration

The agent discovers RevenueCat MCP tools at runtime. Expected tool naming convention: `mcp__revenuecat__*`.

### Check for RevenueCat availability
```python
# In the agent context: list available tools at runtime
# Look for any tool matching mcp__revenuecat__*
# If found, revenue data is available
```

### What to pull from RevenueCat
Revenue attributed to Apple Search Ads installs for the same last-7-day window:
- Revenue grouped by: keyword text, or campaign/ad group
- Fields needed: `revenue`, `installs` (from RevenueCat), `keyword_text` or `campaign_id`

### Join logic
```python
# Match RevenueCat keyword revenue to ASA keyword list
# Primary join key: keyword text (case-insensitive)
# Fallback join key: campaign_id + ad_group_id

def join_revenue_to_keywords(asa_keywords, rc_revenue_by_keyword):
    for kw in asa_keywords:
        keyword_text = kw["keyword"].lower()
        rc_data = rc_revenue_by_keyword.get(keyword_text, {})

        rc_installs = rc_data.get("installs", 0)
        rc_revenue  = rc_data.get("revenue", 0.0)
        asa_spend   = kw["spend"]
        asa_installs = kw["installs"]

        # Compute derived metrics
        kw["rc_revenue"]    = rc_revenue
        kw["revenue_per_install"] = (rc_revenue / asa_installs) if asa_installs > 0 else None
        kw["roas"]          = (rc_revenue / asa_spend * 100) if asa_spend > 0 else None  # percent
```

### Attribution prerequisite
RevenueCat keyword-level attribution requires the app to pass Apple Search Ads attribution via:
```swift
// In app startup (Swift):
Purchases.shared.attribution.enableAdServicesAttributionTokenCollection()
```

The agent verifies this during orientation by asking: "Is Apple Search Ads attribution configured in RevenueCat for this app?"

---

## Config File Template

Write this to `apple-ads/config.md` during orientation setup:

```markdown
# Apple Ads Config — [App Name]

- **App Name**: [App Name]
- **Org ID**: [12345678]
- **CAC Target**: $[X.XX]
- **Max CPI**: $[X.XX]  (= CAC ÷ 3)
- **Currency**: [USD]
- **RevenueCat Attribution**: [Yes | No | Unknown]

## Campaigns

| Campaign Name | Apple Campaign ID | Type |
|---|---|---|
| [App] - Brand | [ID] | Brand |
| [App] - Generic | [ID] | Generic |
| [App] - Competitor | [ID] | Competitor |
| [App] - Discovery | [ID] | Discovery |

## Rubric Overrides

(Leave blank to use defaults from rubric.md)

- Max CPI:
- ROAS Target:
- Min TTR (Brand):
- Min TTR (Generic):
```

---

## Error Handling Reference

| Error | Cause | Fix |
|-------|-------|-----|
| `401 Unauthorized` | Expired or invalid access token | Re-run auth script; verify env vars |
| `403 Forbidden` | API user lacks permissions | Check API user role in ASA dashboard |
| `429 Too Many Requests` | Rate limit hit | Wait 60s; retry once |
| `400 Bad Request` | Invalid date range or body | Check date format (YYYY-MM-DD) and required fields |
| No rows in response | Campaign had no activity | Log spend=$0, note campaign paused/no data |
| JWT sign error | Bad .p8 file path or malformed key | Verify `APPLE_ADS_KEY_PATH` points to valid .p8 |

---

## gitignore Entries

Add to the project's `.gitignore`:
```
apple-ads/raw/
```

Raw API JSON files are for debugging only and should not be committed.
