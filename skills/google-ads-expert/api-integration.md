# Google Ads API Integration

MCP server setup for reads, REST API mutate templates for writes, response field mappings, and error handling for the Google Ads Expert agent.

---

## Section A: MCP Server Setup (Reads)

All data reads go through the [Google Ads MCP server](https://github.com/googleads/google-ads-mcp). The MCP server handles authentication, query execution, and pagination — no Python scripts needed.

### Prerequisites

1. **pipx** installed (`brew install pipx` or `pip install pipx`)
2. **Google Cloud Project** with Google Ads API enabled (console.cloud.google.com)
3. **Developer Token** from Google Ads > Tools > API Center
4. **Credentials** via one of two auth methods below

### Auth Method 1: Application Default Credentials (Recommended)

Uses `gcloud` CLI for auth. Simplest setup — same credentials power both MCP reads and REST API writes.

```bash
# 1. Install gcloud CLI (if not installed)
brew install google-cloud-sdk

# 2. Login and set application default credentials
gcloud auth application-default login --scopes="https://www.googleapis.com/auth/adwords"

# 3. Set your project
gcloud config set project YOUR_PROJECT_ID
```

### Auth Method 2: Service Account / google-ads.yaml

For automated environments or CI. Create a `google-ads.yaml` file:

```yaml
developer_token: YOUR_DEVELOPER_TOKEN
client_id: YOUR_CLIENT_ID
client_secret: YOUR_CLIENT_SECRET
refresh_token: YOUR_REFRESH_TOKEN
login_customer_id: YOUR_MCC_ID  # optional, only if using Manager account
```

Place it in one of: `$HOME/google-ads.yaml`, current directory, or set `GOOGLE_ADS_YAML` env var.

### Claude Code MCP Configuration

Add to your Claude Code MCP settings (`.mcp.json` or project settings):

```json
{
  "mcpServers": {
    "google_ads": {
      "command": "pipx",
      "args": ["run", "--spec", "git+https://github.com/googleads/google-ads-mcp.git", "google-ads-mcp"],
      "env": {
        "GOOGLE_APPLICATION_CREDENTIALS": "/path/to/credentials.json",
        "GOOGLE_PROJECT_ID": "YOUR_PROJECT_ID",
        "GOOGLE_ADS_DEVELOPER_TOKEN": "YOUR_DEVELOPER_TOKEN"
      }
    }
  }
}
```

If using ADC (Method 1), you can omit `GOOGLE_APPLICATION_CREDENTIALS` — gcloud handles it automatically. Keep `GOOGLE_PROJECT_ID` and `GOOGLE_ADS_DEVELOPER_TOKEN`.

### Verify MCP Connectivity

Call `mcp__google_ads__list_accessible_customers` to verify the MCP server is running and auth is working. If it returns customer IDs, you're good. If it fails, check:
1. Is pipx installed? (`pipx --version`)
2. Are env vars set? (developer token, project ID)
3. Is ADC configured? (`gcloud auth application-default print-access-token`)

**Never ask the user to paste secrets into chat. Never write credentials to any project file.**

---

## Section B: MCP Read Templates (6 Reports)

All reads use the `mcp__google_ads__search` tool. Each template shows the exact parameters to pass.

Date range default: last 14 days (longer than Apple Ads due to broad match + Smart Bidding learning periods).

### Report 1: Campaign Performance

```
Tool: mcp__google_ads__search
Parameters:
  customer_id: "1234567890"
  query: >
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
    WHERE segments.date BETWEEN 'YYYY-MM-DD' AND 'YYYY-MM-DD'
      AND campaign.status != 'REMOVED'
    ORDER BY metrics.cost_micros DESC
```

### Report 2: Ad Group Performance

```
Tool: mcp__google_ads__search
Parameters:
  customer_id: "1234567890"
  query: >
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
    WHERE segments.date BETWEEN 'YYYY-MM-DD' AND 'YYYY-MM-DD'
      AND ad_group.status != 'REMOVED'
    ORDER BY metrics.cost_micros DESC
```

### Report 3: Keyword Performance

```
Tool: mcp__google_ads__search
Parameters:
  customer_id: "1234567890"
  query: >
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
    WHERE segments.date BETWEEN 'YYYY-MM-DD' AND 'YYYY-MM-DD'
      AND ad_group_criterion.status != 'REMOVED'
    ORDER BY metrics.cost_micros DESC
```

### Report 4: Search Terms

```
Tool: mcp__google_ads__search
Parameters:
  customer_id: "1234567890"
  query: >
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
    WHERE segments.date BETWEEN 'YYYY-MM-DD' AND 'YYYY-MM-DD'
    ORDER BY metrics.cost_micros DESC
```

### Report 5: Ad Performance (RSA)

```
Tool: mcp__google_ads__search
Parameters:
  customer_id: "1234567890"
  query: >
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
    WHERE segments.date BETWEEN 'YYYY-MM-DD' AND 'YYYY-MM-DD'
      AND ad_group_ad.status != 'REMOVED'
    ORDER BY metrics.impressions DESC
```

### Report 6: Asset Performance (PMax)

```
Tool: mcp__google_ads__search
Parameters:
  customer_id: "1234567890"
  query: >
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
```

---

## Section C: Mutate Operations (Writes via REST API)

Writes use the Google Ads REST API directly via `curl`. Auth reuses the same ADC credentials as the MCP server — no separate setup needed.

**API version:** v18
**Base URL:** `https://googleads.googleapis.com/v18`

### C1: Get Access Token

Reuses the same ADC that powers the MCP server:

```bash
ACCESS_TOKEN=$(gcloud auth application-default print-access-token)
```

All mutate commands below assume `$ACCESS_TOKEN`, `$DEVELOPER_TOKEN`, and `$CUSTOMER_ID` are set. Optionally set `$LOGIN_CUSTOMER_ID` if using a Manager (MCC) account.

### C2: Pause a Keyword

Pauses a keyword by updating its AdGroupCriterion status to PAUSED.

```bash
curl -s -X POST \
  "https://googleads.googleapis.com/v18/customers/${CUSTOMER_ID}/googleAds:mutate" \
  -H "Authorization: Bearer ${ACCESS_TOKEN}" \
  -H "developer-token: ${DEVELOPER_TOKEN}" \
  -H "Content-Type: application/json" \
  ${LOGIN_CUSTOMER_ID:+-H "login-customer-id: ${LOGIN_CUSTOMER_ID}"} \
  -d '{
    "mutateOperations": [{
      "adGroupCriterionOperation": {
        "update": {
          "resourceName": "customers/'${CUSTOMER_ID}'/adGroupCriteria/'${AD_GROUP_ID}'~'${CRITERION_ID}'",
          "status": "PAUSED"
        },
        "updateMask": "status"
      }
    }]
  }'
```

**Required variables:** `$AD_GROUP_ID`, `$CRITERION_ID` (from keyword report data).

### C3: Add Keyword (Exact Match)

Creates a new keyword in an ad group with exact match type.

```bash
curl -s -X POST \
  "https://googleads.googleapis.com/v18/customers/${CUSTOMER_ID}/googleAds:mutate" \
  -H "Authorization: Bearer ${ACCESS_TOKEN}" \
  -H "developer-token: ${DEVELOPER_TOKEN}" \
  -H "Content-Type: application/json" \
  ${LOGIN_CUSTOMER_ID:+-H "login-customer-id: ${LOGIN_CUSTOMER_ID}"} \
  -d '{
    "mutateOperations": [{
      "adGroupCriterionOperation": {
        "create": {
          "adGroup": "customers/'${CUSTOMER_ID}'/adGroups/'${AD_GROUP_ID}'",
          "status": "ENABLED",
          "keyword": {
            "text": "'"${KEYWORD_TEXT}"'",
            "matchType": "EXACT"
          }
        }
      }
    }]
  }'
```

**Required variables:** `$AD_GROUP_ID`, `$KEYWORD_TEXT`.

### C4: Add Negative Keyword

#### Campaign-level negative (blocks across all ad groups in the campaign):

```bash
curl -s -X POST \
  "https://googleads.googleapis.com/v18/customers/${CUSTOMER_ID}/googleAds:mutate" \
  -H "Authorization: Bearer ${ACCESS_TOKEN}" \
  -H "developer-token: ${DEVELOPER_TOKEN}" \
  -H "Content-Type: application/json" \
  ${LOGIN_CUSTOMER_ID:+-H "login-customer-id: ${LOGIN_CUSTOMER_ID}"} \
  -d '{
    "mutateOperations": [{
      "campaignCriterionOperation": {
        "create": {
          "campaign": "customers/'${CUSTOMER_ID}'/campaigns/'${CAMPAIGN_ID}'",
          "negative": true,
          "keyword": {
            "text": "'"${NEGATIVE_KEYWORD}"'",
            "matchType": "EXACT"
          }
        }
      }
    }]
  }'
```

#### Ad-group-level negative:

```bash
curl -s -X POST \
  "https://googleads.googleapis.com/v18/customers/${CUSTOMER_ID}/googleAds:mutate" \
  -H "Authorization: Bearer ${ACCESS_TOKEN}" \
  -H "developer-token: ${DEVELOPER_TOKEN}" \
  -H "Content-Type: application/json" \
  ${LOGIN_CUSTOMER_ID:+-H "login-customer-id: ${LOGIN_CUSTOMER_ID}"} \
  -d '{
    "mutateOperations": [{
      "adGroupCriterionOperation": {
        "create": {
          "adGroup": "customers/'${CUSTOMER_ID}'/adGroups/'${AD_GROUP_ID}'",
          "negative": true,
          "keyword": {
            "text": "'"${NEGATIVE_KEYWORD}"'",
            "matchType": "EXACT"
          }
        }
      }
    }]
  }'
```

**Required variables:** `$CAMPAIGN_ID` or `$AD_GROUP_ID`, `$NEGATIVE_KEYWORD`.

### C5: Update Bid (Ad Group CPC)

Updates the CPC bid at the ad group level. Bid amount is in micros (multiply dollars by 1,000,000).

```bash
curl -s -X POST \
  "https://googleads.googleapis.com/v18/customers/${CUSTOMER_ID}/googleAds:mutate" \
  -H "Authorization: Bearer ${ACCESS_TOKEN}" \
  -H "developer-token: ${DEVELOPER_TOKEN}" \
  -H "Content-Type: application/json" \
  ${LOGIN_CUSTOMER_ID:+-H "login-customer-id: ${LOGIN_CUSTOMER_ID}"} \
  -d '{
    "mutateOperations": [{
      "adGroupOperation": {
        "update": {
          "resourceName": "customers/'${CUSTOMER_ID}'/adGroups/'${AD_GROUP_ID}'",
          "cpcBidMicros": "'${BID_MICROS}'"
        },
        "updateMask": "cpcBidMicros"
      }
    }]
  }'
```

**Required variables:** `$AD_GROUP_ID`, `$BID_MICROS` (e.g., 2500000 = $2.50).

### C6: Update Budget

Updates a campaign budget. Budget amount is in micros.

```bash
curl -s -X POST \
  "https://googleads.googleapis.com/v18/customers/${CUSTOMER_ID}/googleAds:mutate" \
  -H "Authorization: Bearer ${ACCESS_TOKEN}" \
  -H "developer-token: ${DEVELOPER_TOKEN}" \
  -H "Content-Type: application/json" \
  ${LOGIN_CUSTOMER_ID:+-H "login-customer-id: ${LOGIN_CUSTOMER_ID}"} \
  -d '{
    "mutateOperations": [{
      "campaignBudgetOperation": {
        "update": {
          "resourceName": "customers/'${CUSTOMER_ID}'/campaignBudgets/'${BUDGET_ID}'",
          "amountMicros": "'${BUDGET_MICROS}'"
        },
        "updateMask": "amountMicros"
      }
    }]
  }'
```

**Required variables:** `$BUDGET_ID` (from campaign report's `campaign.campaign_budget` field), `$BUDGET_MICROS` (e.g., 50000000 = $50/day).

### C7: Pause or Enable a Campaign

```bash
curl -s -X POST \
  "https://googleads.googleapis.com/v18/customers/${CUSTOMER_ID}/googleAds:mutate" \
  -H "Authorization: Bearer ${ACCESS_TOKEN}" \
  -H "developer-token: ${DEVELOPER_TOKEN}" \
  -H "Content-Type: application/json" \
  ${LOGIN_CUSTOMER_ID:+-H "login-customer-id: ${LOGIN_CUSTOMER_ID}"} \
  -d '{
    "mutateOperations": [{
      "campaignOperation": {
        "update": {
          "resourceName": "customers/'${CUSTOMER_ID}'/campaigns/'${CAMPAIGN_ID}'",
          "status": "PAUSED"
        },
        "updateMask": "status"
      }
    }]
  }'
```

Change `"PAUSED"` to `"ENABLED"` to re-enable. **Required variables:** `$CAMPAIGN_ID`.

---

## Section D: Response Field Mappings

### Micros Conversion

All monetary fields (`cost_micros`, `average_cpc`, `cost_per_conversion`, `cpcBidMicros`, `amountMicros`) are in micros. Divide by 1,000,000 for currency.

```
$150.50 = 150500000 micros
$2.50   = 2500000 micros
```

### Campaign Status Enums

| API Value | Meaning |
|-----------|---------|
| `ENABLED` | Active and running |
| `PAUSED` | Paused by user |
| `REMOVED` | Deleted (filter out in queries) |

### Campaign Channel Types

| API Value | Meaning |
|-----------|---------|
| `SEARCH` | Search campaigns |
| `PERFORMANCE_MAX` | PMax campaigns |
| `SHOPPING` | Shopping campaigns |
| `DISPLAY` | Display campaigns |

### Bidding Strategy Types

| API Value | Meaning |
|-----------|---------|
| `MANUAL_CPC` | Manual CPC bidding |
| `TARGET_CPA` | Target CPA (automated) |
| `TARGET_ROAS` | Target ROAS (automated) |
| `MAXIMIZE_CONVERSIONS` | Maximize conversions (automated) |
| `MAXIMIZE_CONVERSION_VALUE` | Maximize conversion value (automated) |

### Quality Score Components

| Field | Values |
|-------|--------|
| `quality_info.quality_score` | 1-10 integer |
| `quality_info.creative_quality_score` | `BELOW_AVERAGE`, `AVERAGE`, `ABOVE_AVERAGE` |
| `quality_info.post_click_quality_score` | `BELOW_AVERAGE`, `AVERAGE`, `ABOVE_AVERAGE` |
| `quality_info.search_predicted_ctr` | `BELOW_AVERAGE`, `AVERAGE`, `ABOVE_AVERAGE` |

### Keyword Match Types

| API Value | Meaning |
|-----------|---------|
| `EXACT` | Exact match `[keyword]` |
| `PHRASE` | Phrase match `"keyword"` |
| `BROAD` | Broad match `keyword` |

### Search Term Status

| API Value | Meaning |
|-----------|---------|
| `ADDED` | Already a keyword |
| `EXCLUDED` | Already a negative |
| `NONE` | Neither — candidate for addition or exclusion |

### Asset Performance Labels (PMax)

`BEST`, `GOOD`, `LOW`, `LEARNING`, `PENDING`

### CTR Values

CTR is returned as a decimal (e.g., `0.035` = 3.5%). Multiply by 100 for display.

---

## Section E: Error Handling

### MCP Server Errors

| Error | Cause | Fix |
|-------|-------|-----|
| Tool not found | MCP server not configured | Add `google_ads` server to MCP config (see Section A) |
| Connection refused | MCP server failed to start | Check `pipx --version`; verify git access to MCP repo |
| `UNAUTHENTICATED` | ADC expired or not configured | Run `gcloud auth application-default login --scopes="https://www.googleapis.com/auth/adwords"` |
| `PERMISSION_DENIED` | Developer token issue or wrong customer ID | Verify developer token is approved and customer ID is correct |
| Empty results | Wrong customer ID or no data in date range | Verify customer ID (no dashes); try broader date range |

### REST API Mutate Errors

| Error | Cause | Fix |
|-------|-------|-----|
| `401 UNAUTHENTICATED` | Expired access token | Re-run `gcloud auth application-default print-access-token` |
| `403 PERMISSION_DENIED` | Developer token or customer ID issue | Verify developer token approval level; check customer ID |
| `400 INVALID_ARGUMENT` | Bad resource name or invalid field value | Check resource name format: `customers/{id}/adGroupCriteria/{adGroupId}~{criterionId}` |
| `400 MUTATE_ERROR` | Business rule violation (e.g., duplicate keyword) | Read error detail for specific cause; adjust operation |
| `429 RESOURCE_EXHAUSTED` | Rate limit hit | Wait 60s; reduce batch size |
| `404 NOT_FOUND` | Resource doesn't exist | Verify IDs from latest read data |

### General Troubleshooting

1. **MCP works but mutate fails**: The MCP server uses its own auth flow. For mutate calls, verify `gcloud auth application-default print-access-token` returns a valid token with the `adwords` scope.
2. **Wrong customer ID format**: Always use plain digits, no dashes (e.g., `1234567890` not `123-456-7890`).
3. **MCC accounts**: Set `$LOGIN_CUSTOMER_ID` to the Manager account ID when operating on child accounts.

---

## Section F: Config File Template

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

## gitignore Entries

Add to the project's `.gitignore`:
```
google-ads/raw/
```

Raw API JSON files are for debugging only and should not be committed.
