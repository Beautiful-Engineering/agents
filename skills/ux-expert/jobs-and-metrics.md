# Jobs and Metrics

How to say what a screen is for, and how to know if it works. Used in Audit A1 and A6, and Design D1 and D5.

---

## Jobs to Be Done (JTBD)

**Plain words:** people don't want your feature; they want their situation to get better. A screen is "hired" to do a job.

### The job statement

> When **[situation]**, I want to **[motivation]**, so I can **[outcome]**.

- **Situation** is the trigger, not a demographic. "When I'm in the grocery aisle holding a cheese" beats "pregnant women 25 to 35."
- **Motivation** is the progress they want, in their words.
- **Outcome** is how life is better after. This is what success states should confirm.

### Writing good jobs

| Weak | Strong | Why |
|------|--------|-----|
| "Use the scanner" | "When I'm unsure a food is safe, I want a fast answer, so I can buy it without worrying" | Names the anxiety the screen must resolve |
| "View the family page" | "When the baby is coming, I want to know how labor is going, so I can help without calling every hour" | Reveals the real action: help, not view |
| "Sign up" | "When I like what I've tried, I want to keep my history, so I don't lose it" | Explains why sign-up should come after value |

### One job per screen, several per product

Map each screen to one main job. If a screen serves two jobs equally, it usually needs a clear primary for the most common arrival, with the second job one tap away.

### Where jobs come from

1. User interviews, reviews, and support messages (best: real words)
2. Analytics: what people actually do first, and where they stop
3. The founder's own experience (fine to start, label it an assumption)

---

## Activation and the North Star

**Activation** (plain words: the moment a new user first gets real value) is the event that predicts they'll come back. Find it by comparing retained and churned users: which early action did the retained ones take?

| Product type | Example activation |
|--------------|--------------------|
| Safety lookup app | First scan returns a verdict within the first session |
| Timer / tracker | First full session logged (for example, 3+ contractions timed) |
| Shared family page | A family member opens the link and takes one action (message, reaction, gift) |
| Habit app | Core action done on 3 of the first 7 days |

**North Star metric** (plain words: the one number that best captures value delivered to users, across the whole product) sits above flow metrics. Weekly users who completed the core action is a common shape. Revenue is an outcome of the North Star, not the North Star itself.

---

## Funnel thinking

A funnel is the ordered list of steps between arrival and the job done. Every step loses people.

1. **List the steps** as events: `screen_viewed` → `action_started` → `action_completed`.
2. **Find the biggest drop.** Fix the leakiest step first; improving a step only 10% of people reach barely moves the total.
3. **Segment before concluding.** Split by source, platform, and new versus returning. A blended funnel hides that one source converts and another doesn't.
4. **Watch the step after success.** Users who finish one job and see no next action are the quietest leak.

**Rule of thumb on sample size:** with fewer than about 100 users per step per week, treat percentages as directional. Say so in the output.

---

## Picking one metric per flow

Every flow gets exactly one **success metric** and one **guardrail metric**.

| Choose a success metric that is | Avoid |
|---------------------------------|-------|
| A rate tied to the job ("% of visitors who send a message") | Vanity counts (page views, taps on anything) |
| Measurable with events you have or can add this week | Metrics that need a data warehouse you don't have |
| Moved mainly by this flow | Company-level numbers many things affect |
| Time-bound ("within the first session") | Open-ended ("eventually") |

**Guardrail** (plain words: the number that must not get worse while you push the main one). Examples: refund rate for a checkout redesign, unsubscribe rate for a new prompt, crash rate for a heavier screen.

---

## Instrumentation and event naming

Good events let anyone read the funnel without asking what they mean.

### Naming rules

- **Match the project's existing style first.** Grep for current events before proposing new ones.
- If no style exists, use `object_action` in snake_case, past tense: `scan_completed`, `gift_sent`, `paywall_dismissed`.
- One event per meaningful action, with properties for detail. Prefer `share_tapped {channel: "sms"}` over `share_sms_tapped`, `share_whatsapp_tapped`.
- Name the outcome, not the UI: `message_sent`, not `blue_button_clicked`. Buttons move; outcomes don't.

### Properties every event should carry

| Property | Why |
|----------|-----|
| `source` or `entry_point` | Where the user came from, to segment the funnel |
| `screen` | Which screen fired it |
| `variant` / `flow_version` | Which design they saw, so before and after can be compared |
| Object id or type | What was acted on |

### Instrumentation plan template

| Event | Fires when | Properties | Funnel step |
|-------|-----------|------------|-------------|
| `family_page_viewed` | Page renders with data | `source`, `flow_version` | 1 |
| `help_action_tapped` | Any help option tapped | `action_type` | 2 |
| `help_action_completed` | Server confirms the action | `action_type` | 3 (success) |

### Measuring a change honestly

- Record the baseline for at least one full week before shipping.
- Ship with a `flow_version` property so old and new can be split.
- Compare the same weekdays and the same sources. A weekend or a new ad campaign can fake a win.
- Report as "moved from X% to Y% over N users" or "not enough data yet." Never round a hunch into a result.
