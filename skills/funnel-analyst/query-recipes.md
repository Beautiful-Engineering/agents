# Funnel Analyst — PostHog MCP Query Recipes

Validated patterns for the `mcp__posthog__exec` tool. Always `info <tool>` first, and drill
`schema query-trends series|breakdownFilter|dateRange` (and the funnel equivalents) before
populating those fields. Confirm event/property names with `read-data-schema` first — names vary
per project; the recipes below use placeholders like `<attribution_event>`.

`dateRange.date_from` units: `-7d` (last 7 days), `-14d`, `all` (all time), `mStart`. Use a
`compareFilter` or a second `-14d…-7d` query for week-over-week.

## Discovery (run once / when config is missing)

```
call read-data-schema {"query":{"kind":"events"}}
call read-data-schema {"query":{"kind":"event_properties","event_name":"<attribution_event>"}}
call read-data-schema {"query":{"kind":"event_property_values","event_name":"<attribution_event>","property_name":"<source_prop>"}}
```

## View A — Acquisition sources

Week breakdown:
```
call query-trends {"kind":"TrendsQuery",
  "series":[{"kind":"EventsNode","event":"<attribution_event>","math":"total"}],
  "breakdownFilter":{"breakdowns":[{"property":"<source_prop>","type":"event"}],"breakdown_limit":25},
  "dateRange":{"date_from":"-7d"},"interval":"day"}
```
Coverage (installs vs attribution completed vs skipped), monthly trend:
```
call query-trends {"kind":"TrendsQuery",
  "series":[
    {"kind":"EventsNode","event":"<install_event>","math":"total"},
    {"kind":"EventsNode","event":"<attribution_event>","math":"total"},
    {"kind":"EventsNode","event":"<attribution_skip_event>","math":"total"}],
  "dateRange":{"date_from":"all"},"interval":"month"}
```

## View B — Onboarding / activation funnel

```
call query-funnel {"kind":"FunnelsQuery",
  "series":[
    {"kind":"EventsNode","event":"<install_event>","name":"Install"},
    {"kind":"EventsNode","event":"<step_2>","name":"…"},
    {"kind":"EventsNode","event":"<activation_or_paywall>","name":"…"}],
  "dateRange":{"date_from":"-7d"},
  "funnelsFilter":{"funnelOrderType":"ordered","funnelWindowInterval":1,"funnelWindowIntervalUnit":"day"}}
```

## View C — Install → Trial → Paid

**Step 1 — linkage test (ALWAYS run first).** No breakdown, generous window:
```
call query-funnel {"kind":"FunnelsQuery",
  "series":[
    {"kind":"EventsNode","event":"<attribution_event>","name":"Attribution"},
    {"kind":"EventsNode","event":"<trial_started_event>","name":"Trial"},
    {"kind":"EventsNode","event":"<trial_converted_event>","name":"Paid"}],
  "dateRange":{"date_from":"all"},
  "funnelsFilter":{"funnelOrderType":"ordered","funnelWindowInterval":60,"funnelWindowIntervalUnit":"day"}}
```
If the trial step is **0**, the identity gap is present → use BLENDED totals:
```
call query-trends {"kind":"TrendsQuery",
  "series":[
    {"kind":"EventsNode","event":"<install_event>","math":"total"},
    {"kind":"EventsNode","event":"<trial_started_event>","math":"total"},
    {"kind":"EventsNode","event":"<trial_converted_event>","math":"total"},
    {"kind":"EventsNode","event":"<initial_purchase_event>","math":"total"}],
  "dateRange":{"date_from":"all"},"interval":"month"}
```
Compute trial-start rate (trials ÷ installs) and trial→paid (converted ÷ trials) by hand or with
`trendsFilter.formula`.

**By source — ONLY when the linkage test reads non-zero:**
```
"breakdownFilter":{"breakdown":"<source_prop>","breakdown_type":"event"},
"funnelsFilter":{…,"breakdownAttributionType":"step","breakdownAttributionValue":0,
                 "funnelWindowInterval":60,"funnelWindowIntervalUnit":"day"}
```

## View D — Paywall & churn

```
call query-trends {"kind":"TrendsQuery",
  "series":[
    {"kind":"EventsNode","event":"<paywall_presented_event>","math":"total"},
    {"kind":"EventsNode","event":"<paywall_result_event>","math":"total"}],
  "dateRange":{"date_from":"-7d"},"interval":"day",
  "trendsFilter":{"formula":"B/A"}}
```
Churn/renewal totals: one series each for `<trial_cancelled>`, `<expiration>`, `<cancellation>`,
`<renewal>`, `<billing_issue>`.

## Identity-gap diagnostic (execute-sql)

Confirm whether RevenueCat events share a person with the rest of the app:
```
call execute-sql {"truncate":true,"query":
 "SELECT countIf(startsWith(distinct_id,'$RCAnonymousID')) AS rc_anon,
         countIf(NOT startsWith(distinct_id,'$RCAnonymousID')) AS identified,
         count(DISTINCT distinct_id) AS users
  FROM events WHERE event IN ('<trial_started_event>','<initial_purchase_event>')
  AND timestamp >= now() - INTERVAL 120 DAY LIMIT 100"}
```
A high `rc_anon` share = gap present. Fix in-app by setting the RevenueCat `$posthogUserId`
subscriber attribute to `posthog.getDistinctId()` (does NOT change the App User ID; not retroactive).
