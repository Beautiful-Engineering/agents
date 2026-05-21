# Funnel Analyst — Analysis Framework

How to score, how to handle the RevenueCat↔PostHog identity gap, and the formats for the
per-project config and tracker.

## Scoring method

1. For each enabled view, compute headline metrics for the last 7 complete days AND the prior 7.
2. Rate each 🟢/🟡/🔴 against `funnel/config.md` targets (fallback: `rubric.md`).
3. Always show this-week vs last-week with a delta and arrow (▲ better / ▼ worse). Direction
   matters more than the absolute number.
4. Identify the single biggest funnel drop-off and the single biggest WoW mover.
5. Flag any step with <30 events as directional-only.

## RevenueCat ↔ PostHog identity gap (read every run)

**Symptom:** a funnel from the acquisition/onboarding event → RevenueCat trial event reads 0,
and most `rc_*` events have `$RCAnonymousID:…` distinct_ids.

**Cause:** RevenueCat's PostHog integration keys events by the RC App User ID. If the app never
aligns identity, RC events land on a separate PostHog person from the device, so they can't be
joined to source/onboarding events.

**Handling:**
- Run the linkage test (`query-recipes.md`, View C step 1) FIRST, every run.
- Trial step 0 → report View C **blended** (totals + computed rates) and state the gap in the output.
- Trial step non-zero → run the by-source funnel and report conversion by acquisition source.
- Record the current linkage state in `funnel/.progress.md`.

**In-app fix (note in config, don't implement from this agent):** set RevenueCat's reserved
`$posthogUserId` subscriber attribute to `posthog.getDistinctId()` after `configure()` and after
`logIn()`. It does NOT change the App User ID (no entitlement risk) and is NOT retroactive — data
links from the build forward.

**Independent cross-check:** if the app writes acquisition source AND paid status onto a
users/profiles table (e.g. Supabase), source→paid can be answered there directly and retroactively
with a simple `GROUP BY source, count(paid)` — even while the PostHog gap persists. Note the table
in config when available.

## funnel/config.md template

```markdown
# [App] Funnel Config — PostHog

PostHog project "[name]" (id …). Timezone …. Person-on-events: [on/off].

## Targets / Rubric Overrides
| Metric | 🟢 | 🟡 | 🔴 |
|--------|----|----|----|
| Attribution coverage | … | … | … |
| Onboarding completion | … | … | … |
| Trial start rate | … | … | … |
| Trial → Paid | … | … | … |
| Paywall conversion | … | … | … |

## Validated events & properties (from read-data-schema, [date])
- install: `<event>`  | attribution: `<event>` + prop `<source_prop>` (values: …) | skip: `<event>`
- onboarding steps (ordered): `<e1>` → `<e2>` → `<activation/paywall>`
- monetization: `<trial_started>`, `<trial_converted>`, `<initial_purchase>`
- paywall/churn: `<paywall_presented>`, `<paywall_result>`, `<trial_cancelled>`, `<expiration>`, `<cancellation>`, `<renewal>`, `<billing_issue>`

## Identity-gap status
[linked | BLENDED-ONLY as of <date>; fix shipped in build <x>, not retroactive]

## Source→paid cross-check (optional)
[e.g. Supabase profiles: acquisition_source + is_premium + revenuecat_id, keyed by user id]
```

## weekly-funnel.csv header

```
Date,Week,Installs,AttrCoverage%,TopSource,TopSourceShare%,OnboardingCompletion%,Trials,TrialStartRate%,TrialToPaid%,PaywallConv%,TrialCancels,Expirations,Renewals,BySource(Y/N),Notes
```

One row per run. `BySource(Y/N)` records whether View C was attributable that week (linkage state).

## .progress.md template

```markdown
# Funnel Analyst Progress
- App: [name]
- Cadence: [manual | scheduled]
- Last Run: [date]
- Weeks Logged: [n]
- Linkage: [linked | blended-only]
- Last headline: [installs, top source, trial→paid]
```
