# Instantly Playbook

Step-by-step workflows for using Instantly MCP tools to build, launch, and manage cold email campaigns.

---

## Instantly MCP Tool Reference

### Account Management
| Tool | Purpose | When to Use |
|------|---------|------------|
| `list_accounts` | List all sending accounts and their status | Orientation, infrastructure audit |
| `get_account` | Get details + warmup status for one account | Checking specific account health |
| `create_account` | Create new sending account (IMAP/SMTP creds) | Setting up new infrastructure |
| `update_account` | Update account settings | Adjusting send limits, schedule |
| `manage_account_state` | Pause/resume/warmup/test vitals | Starting warmup, pausing sick accounts |
| `delete_account` | Permanently delete account | CAUTION — requires user approval |

### Campaign Management
| Tool | Purpose | When to Use |
|------|---------|------------|
| `create_campaign` | Create email campaign (two-step process) | Phase 4 — Campaign Setup |
| `list_campaigns` | List campaigns with pagination | Orientation, audit |
| `get_campaign` | Get campaign details and sequences | Reviewing campaign config |
| `update_campaign` | Update campaign settings/sequences | Optimizing live campaigns |
| `activate_campaign` | Start campaign sending | Launch — REQUIRES USER APPROVAL |
| `pause_campaign` | Stop campaign sending | Pausing for fixes or investigation |
| `delete_campaign` | Permanently delete campaign | CAUTION — requires user approval |
| `search_campaigns_by_contact` | Find campaigns a contact is in | Avoiding duplicate outreach |

### Lead Management
| Tool | Purpose | When to Use |
|------|---------|------------|
| `list_leads` | List leads with filtering | Reviewing lead data |
| `get_lead` | Get details for one lead | Investigating specific contacts |
| `create_lead` | Create single lead | Manual lead addition |
| `update_lead` | Update lead data | Fixing lead info (note: replaces all custom vars) |
| `list_lead_lists` | List all lead lists | Orientation, organization |
| `create_lead_list` | Create a named lead list | Phase 4 — organizing leads by segment |
| `update_lead_list` | Update lead list metadata | Renaming, adjusting lists |
| `get_verification_stats_for_lead_list` | Email verification stats for a list | Pre-launch quality check |
| `add_leads_to_campaign_or_list_bulk` | Bulk add up to 1,000 leads | Phase 4 — uploading leads |
| `delete_lead` | Permanently delete a lead | CAUTION — requires user approval |
| `delete_lead_list` | Permanently delete a list | CAUTION — requires user approval |
| `move_leads_to_campaign_or_list` | Move/copy leads between lists | Segmentation, campaign rotation |

### Email Operations
| Tool | Purpose | When to Use |
|------|---------|------------|
| `list_emails` | List emails with filtering | Reading replies, monitoring |
| `get_email` | Get full email details | Reading specific replies |
| `reply_to_email` | Send real email reply | CAUTION — sends real email, requires user approval |
| `count_unread_emails` | Count unread inbox emails | Quick reply check |
| `verify_email` | Verify email deliverability | Pre-upload verification |
| `mark_thread_as_read` | Mark thread as read | Inbox management |

### Analytics
| Tool | Purpose | When to Use |
|------|---------|------------|
| `get_campaign_analytics` | Overall campaign metrics | Phase 5, Optimize mode |
| `get_daily_campaign_analytics` | Day-by-day performance | Trend analysis, optimization |
| `get_warmup_analytics` | Account warmup health | Infrastructure audit |

### Background Jobs
| Tool | Purpose | When to Use |
|------|---------|------------|
| `list_background_jobs` | List async jobs | Checking bulk operation status |
| `get_background_job` | Get job details | Waiting for bulk uploads to complete |

---

## Workflow: New Campaign Setup (Phase 4)

### Step 1: Verify Infrastructure

```
1. list_accounts → Check all accounts are connected and warmed
2. get_warmup_analytics → Verify warmup metrics are healthy
   - Look for: positive engagement rates, no spam folder delivery
   - If warmup not complete: STOP — tell user to wait
```

### Step 2: Create Lead List

```
1. create_lead_list → Name it descriptively:
   - Pattern: "[ICP Segment] - [Date]"
   - Example: "VP Marketing SaaS 50-200 - 2025-01"

2. If user has leads ready:
   add_leads_to_campaign_or_list_bulk → Upload leads
   - Max 1,000 per batch
   - Include custom variables for personalization:
     - {{firstName}}, {{lastName}}, {{company}}, {{personalization}}
   - Verify emails first if not already done

3. get_verification_stats_for_lead_list → Check list quality
   - If bounce rate prediction >3%: Clean list before proceeding
```

### Step 3: Create Campaign

```
1. create_campaign → Set up campaign:
   - Name: "[ICP]-[Archetype]-[Date]"
     Example: "VP-Marketing-Value-First-2025-01"
   - Assign sending accounts (warmed only)
   - Set daily send limit: 10-15/day for new campaigns
   - Set schedule: Tue-Thu, 10AM-2PM recipient timezone
   - Set tracking: Opens only (click tracking can hurt deliverability)

2. Add email sequences:
   - Step 1: Initial email (Day 0)
   - Step 2: Follow-up 1 (Day 3)
   - Step 3: Follow-up 2 (Day 10)

3. Configure A/B variants (if testing):
   - Variant A: Archetype 1 subject + body
   - Variant B: Archetype 2 subject + body
   - Split: 50/50
```

### Step 4: Pre-Launch Verification

```
1. get_campaign → Review complete campaign config:
   - Verify sequences are correct
   - Verify daily limits
   - Verify schedule
   - Verify assigned accounts

2. Send test email:
   - Send to user's personal Gmail
   - Check: subject renders correctly, variables populate, not in spam
   - Check "Show Original" in Gmail for SPF/DKIM/DMARC pass

3. Present summary to user:
   - Campaign name
   - Lead count
   - Sequences (initial + follow-ups)
   - Daily volume
   - Sending schedule
   - Estimated time to contact all leads
```

### Step 5: Activate (REQUIRES EXPLICIT APPROVAL)

```
NEVER call activate_campaign without the user explicitly saying
"yes", "launch", "go", "activate", or similar clear approval.

1. activate_campaign → Start sending
2. Confirm: "Campaign is live. First emails go out [next scheduled time]."
```

---

## Workflow: Campaign Monitoring (Phase 5 / Optimize)

### Daily Check (Days 1-3)

```
1. get_warmup_analytics → Account health still good?
2. get_campaign_analytics → Overall metrics
3. get_daily_campaign_analytics → Daily breakdown
4. count_unread_emails → Any replies?

Report to user:
- Emails sent today: X
- Open rate: X% (benchmark: 30-50%)
- Reply rate: X% (benchmark: 5-10%)
- Bounce rate: X% (must be <3%)
- Unread replies: X
```

### Reply Management

```
1. list_emails → Pull recent replies
2. Categorize each reply:
   - Interested → Draft meeting booking response
   - Objection → Draft objection-handling response
   - Wrong person → Draft redirect request
   - Not now → Draft "noted, will follow up later" response
   - Unsubscribe → Remove from campaign immediately
   - Out of office → Note return date, follow up then

3. Present reply + draft response to user
4. ONLY send via reply_to_email after user approves each one
```

### Weekly Performance Review

```
1. get_campaign_analytics → Full metrics
2. get_daily_campaign_analytics → Trend over time
3. Compare to benchmarks and previous week

Generate analysis:
- What's improving vs. declining
- Which A/B variants are winning
- Whether to scale, pause, or optimize
- Specific recommendations with rationale
```

---

## Workflow: Campaign Optimization (Optimize Mode)

### Diagnosing Issues

```
Problem: Low open rates (<20%)
  → get_warmup_analytics → Account health issue?
  → Check subject lines → Need new variants?
  → Check send volume → Too aggressive?
  → Check email content → Spam trigger words?

Problem: Good opens, low replies (<5%)
  → list_emails → Read replies for objection patterns
  → Check body copy → Hook not compelling?
  → Check targeting → Right audience?
  → Check CTA → Too high-friction?

Problem: High bounces (>3%)
  → get_verification_stats_for_lead_list → List quality
  → pause_campaign → Stop sending to bad list
  → Clean list and re-upload
```

### Implementing Fixes

```
1. pause_campaign → Always pause before making major changes
2. Make changes:
   - update_campaign → New sequences, subjects, or schedule
   - add_leads_to_campaign_or_list_bulk → Fresh leads if targeting changed
   - manage_account_state → Fix account issues
3. get_campaign → Verify changes applied correctly
4. Re-activate ONLY with user approval
```

---

## Workflow: Scaling (Optimize Phase O3)

### Adding Sending Capacity

```
1. create_account → Add new sending accounts
   - Must be on the same or different sending subdomain
   - Requires IMAP/SMTP credentials

2. manage_account_state → Start warmup on new accounts
   - 2-3 week warmup before cold sending
   - Monitor with get_warmup_analytics

3. Once warmed:
   - update_campaign → Add new accounts to existing campaigns
   - OR create new campaigns for new segments
```

### Lead Pipeline Expansion

```
1. create_lead_list → New list for expanded segment
2. add_leads_to_campaign_or_list_bulk → Upload new leads
3. get_verification_stats_for_lead_list → Verify quality
4. Either:
   - Add to existing campaign: move_leads_to_campaign_or_list
   - Create new campaign: create_campaign → separate test
```

---

## Safety Rules (Non-Negotiable)

1. **NEVER activate a campaign without explicit user approval**
2. **NEVER send a reply without explicit user approval** (reply_to_email sends real emails)
3. **NEVER delete anything without explicit user approval** (delete operations are permanent)
4. **ALWAYS pause before making major changes** to live campaigns
5. **ALWAYS verify lead list quality** before uploading (check verification stats)
6. **Start with conservative volume** (10-15/day) and ramp gradually
7. **Monitor bounce rates obsessively** — pause if >3%
8. **Never exceed 50 emails/day per account** regardless of what the user asks
9. **Check campaign config before activating** — one wrong setting can damage domain reputation

---

## Naming Conventions

| Item | Pattern | Example |
|------|---------|---------|
| Campaign | `[ICP]-[Archetype]-[YYYY-MM]` | `VP-Marketing-Value-First-2025-01` |
| Lead list | `[ICP Segment] - [YYYY-MM]` | `SaaS CMOs 50-200 - 2025-01` |
| A/B variant | `[Campaign]-[Variant Letter]` | `VP-Marketing-Humble-2025-01-A` |
| Sending account | `[Name]@[subdomain]` | `founder@outreach.company.com` |
