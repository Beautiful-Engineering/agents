# Keyword Research & Selection

Frameworks for sourcing, evaluating, categorizing, and organizing keywords for Apple Search Ads campaigns. Source: Demand Curve ASA curriculum, Lessons 01-03.

---

## Core Principle

Apple Search Ads work best with exact match keywords. The goal of keyword research is to build a comprehensive, categorized keyword list that feeds into the 4-campaign structure (Brand, Generic, Competitor, Discovery). Discovery campaigns then continuously mine new keywords to add as exact match to the other campaigns.

---

## 4 Keyword Sourcing Methods

### Method 1: Google Keyword Planner (Free — 15 minutes)
1. Go to ads.google.com → Tools & Settings → Keyword Planner
2. Click "Discover new keywords"
3. Enter the app's main function (e.g., "budget tracker")
4. Export the keyword list
5. Filter for keywords with mobile/app intent
6. Note: Google volume ≠ App Store volume, but directionally useful

### Method 2: Apple's Suggestion Tool (Built-in — 10 minutes)
1. When creating campaigns in Apple Search Ads, Apple shows "Recommended Keywords"
2. Type core terms and Apple suggests related keywords
3. Save suggestions in a spreadsheet
4. These are high-signal because they come from Apple's actual search data

### Method 3: Competitor Research (20 minutes)
**Quick approach**:
- Use AppAnnie (free tier) or SensorTower (free trial) for competitor keyword data
- Search competitors in the App Store
- Note "Related Searches" and "You Might Also Like" sections
- Check if competitors run ASA ads (search their brand terms)

**Manual approach**:
- Search the App Store for your core value prop
- Note the top 10 apps that appear
- Read their titles, subtitles, and descriptions for keyword ideas
- Check their screenshots for messaging angles

### Method 4: Existing Ads (If Applicable)
- Export keyword lists from Google Ads or Facebook Ads
- Adapt for mobile search intent (shorter, more action-oriented)
- Cross-reference with App Store search behavior

### Bonus: Brain Dump
- List every way a user might describe what your app does
- Ask: "What would someone type into the App Store to find an app like mine?"
- Include problem-focused terms ("stop overspending") and solution-focused terms ("budget tracker")
- Ask existing users: "How would you describe this app to a friend?"

---

## Keyword Selection Rules

### Good ASA Keywords
- 2-4 words long ("budget app" not "budgeting")
- Direct problem/solution match ("expense tracker" for an expense app)
- High intent ("download budget app" vs "budgeting tips")
- Specific to your app's core function
- Searchable in the App Store context

### Bad ASA Keywords
- Single broad words ("money", "fitness", "health")
- Educational intent ("how to budget", "budgeting tips")
- Branded terms you don't own (unless in Competitor campaign)
- Overly long phrases (5+ words rarely get searched)
- Terms unrelated to your core function

### Intent Hierarchy
| Intent Level | Example | Campaign Type | Expected CR |
|-------------|---------|---------------|-------------|
| Highest | "[your app name]" | Brand | 50-70% |
| High | "budget app download" | Generic | 20-40% |
| Medium | "[competitor name]" | Competitor | 15-30% |
| Lower | "personal finance" | Generic/Discovery | 10-20% |

---

## Keyword Categorization

### Brand Keywords (15-20 keywords)
- Your app name and variations
- Your company name
- Common misspellings of your app name
- Your app name + descriptors ("budgetly app", "budgetly download")

### Generic Keywords (25-30 keywords)
- Core functionality terms ("budget app", "expense tracker")
- Problem-focused terms ("track spending", "manage money")
- Solution-focused terms ("personal finance app", "saving goals")
- Feature-specific terms ("receipt scanner", "bill reminder")
- Category terms ("finance app", "productivity app")

### Competitor Keywords (15-20 keywords)
- Direct competitor app names
- Competitor + descriptor ("mint alternative", "ynab app")
- Note: Apple may reject trademarked terms — start with obvious ones

### Discovery Keywords (All of the above as broad match)
- Every exact match keyword from Brand, Generic, and Competitor campaigns
- Added as broad match in the Discovery campaign
- These find variations and related terms you haven't thought of

**Total target: 50-100 keywords for initial testing**

---

## Keyword List Building Template

Build a spreadsheet with these columns:

| Column | Description |
|--------|-------------|
| Keyword | The search term |
| Campaign Type | Brand / Generic / Competitor / Discovery |
| Match Type | Exact (for Brand/Generic/Competitor) or Broad (for Discovery) |
| Priority | High / Medium / Low |
| Expected Volume | High / Medium / Low |
| Source | Where you found it (Google KP, Apple suggestions, competitor, brain dump) |
| Notes | Any relevant context |

### Priority Assignment Rules
- **High**: Direct match to core value prop + likely search volume
- **Medium**: Related to core function but less specific
- **Low**: Tangential or experimental keywords

---

## Keyword-to-Campaign Mapping

After categorization, map keywords to the 4-campaign structure:

```
Brand Campaign (Exact Match Only, Search Match OFF)
├── [app name]
├── [app name] app
├── [company name]
├── [common misspellings]
└── [app name] + descriptors

Generic Campaign (Exact Match Only, Search Match OFF)
├── [core function terms]
├── [problem-focused terms]
├── [solution-focused terms]
└── [feature-specific terms]

Competitor Campaign (Exact Match Only, Search Match OFF)
├── [competitor name 1]
├── [competitor name 1] app
├── [competitor name 2]
└── [competitor name 2] app

Discovery Campaign (Broad Match + Search Match)
├── Search Match Ad Group (no keywords, Search Match ON)
└── Broad Match Ad Group (all keywords as broad match)
    ├── All Brand keywords as broad match
    ├── All Generic keywords as broad match
    └── All Competitor keywords as broad match
```

### Negative Keyword Setup (Critical)
Add ALL exact match keywords from Brand, Generic, and Competitor campaigns as **exact match negative keywords** to the Discovery campaign. This prevents:
- Discovery from competing with your exact match campaigns
- Bidding against yourself
- Wasting Discovery budget on terms you already target

---

## Niche App Keyword Strategy

For apps that don't fit obvious categories:

1. **Start with core function**: "meditation app", "mindfulness app"
2. **Add unique angle**: "meditation for parents", "quick meditation"
3. **Problem-focused terms**: "stress relief app", "calm app"
4. **Competitor research**: Find apps serving similar niches
5. **Use broad match discovery**: Let Apple find related terms
6. **Consider Discovery-first**: For very niche apps, start with Discovery campaigns to uncover hidden volume

---

## Ongoing Keyword Mining

After campaigns are running, continuously mine the Discovery campaign:

| Condition | Action |
|-----------|--------|
| Search term with ≥5 installs, not in keyword list | Add as exact match to relevant campaign |
| Search term with ≥10 taps + 0 installs | Add as negative keyword to Discovery |
| High spend + poor CPI + no installs | Add as negative keyword immediately |
| Strong performer matching brand name | Move to Brand campaign as exact match |

After adding a keyword to Brand/Generic/Competitor, also add it as an exact match negative to Discovery.
