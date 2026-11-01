# Anti-Patterns

What to flag in audits and never produce in designs. Three groups: generic AI-looking UI, dark patterns you refuse to build, and pages with no hierarchy.

---

## 1. Generic AI UI tells

These make a product look auto-generated and untrusted. Each has a better move.

| Tell | Why it fails | Do instead |
|------|-------------|------------|
| Highlighting a block with a thicker colored side border | Reads as a template default; adds a line without adding meaning | Lead with a stronger heading, a label, or a background tint from the brand tokens |
| Drop shadow to make one card "important" | Shadows signal elevation (it floats, you can lift it), not importance | Use position (first), size, or the brand accent |
| Gradient blobs and glowing orbs behind content | Decoration with no job; lowers text contrast | Plain brand background; let content and one image carry it |
| Emoji as icons | Render differently per platform, feel unserious, can't be styled or sized consistently | A real icon set (SF Symbols, Lucide, the project's own) |
| Card soup: every item in its own rounded card | Everything looks equally important; wastes space | Lists with dividers for same-type items; cards only for distinct, tappable objects |
| Everything the same weight | No entry point; the eye has nowhere to land | Three levels max: one headline, a few key facts, quiet details |
| Centered walls of text | Ragged left edges are hard to read past two lines | Left-align body text; center only short headings and single lines |
| Three-column "feature" grids of icon + title + blurb | The most common template layout; nobody reads it | One clear benefit with proof, or a real screenshot |
| Badges and pills on everything ("New," "Pro," "Beta") | Badge blindness; none stand out | One badge, only where it changes a decision |
| Generic hero copy ("Unlock your potential") | Says nothing about the job | The job in the user's words: "Know if it's safe to eat, in one scan" |
| Spinners on every load | Feels slow; no sense of what's coming | Skeleton screens shaped like the content |

**Rule:** if a choice could appear unchanged in any app, question it. Brand tokens and the product's real content are the cure.

---

## 2. Dark patterns: refuse these

Dark patterns (plain words: designs that trick people into things they didn't intend) may lift a number briefly, then cost trust, reviews, refunds, and in many places legal trouble (FTC, EU DSA). If asked to build one, decline, explain the risk in one sentence, and offer the honest alternative.

| Pattern | Example | Honest alternative |
|---------|---------|--------------------|
| Confirmshaming | "No thanks, I don't care about my baby's safety" | Neutral decline: "Not now" |
| Fake scarcity or urgency | Countdown timers that reset; "Only 2 left" when untrue | Real deadlines only, stated plainly |
| Hidden costs | Fees appear at the last step | Show the full price on the first screen it matters |
| Roach motel | Easy to subscribe, hard to cancel | Cancel in as few steps as sign-up, in the app |
| Trick wording | Double negatives on opt-out checkboxes | One clear positive question, unchecked by default |
| Pre-checked add-ons | Insurance or upsell already selected | Offer it; let them choose |
| Disguised ads | Sponsored items styled as content | Label sponsored items clearly |
| Nagging | Permission or rating prompt on every launch | Ask once at a meaningful moment; respect "Not now" for weeks |
| Fake social proof | Invented reviews or activity | Real activity only, or none |
| Forced continuity | Free trial silently converts with no reminder | Remind before the charge; easy cancel |

For a soft trial or paywall, the honest version converts fine: clear price, clear trial length, a reminder before billing, and a visible close button.

---

## 3. "List of things" pages with no hierarchy

The most common product page failure: a screen that shows everything it knows, in the order the data arrives, at the same visual weight.

**Symptoms**
- A long scroll of equal sections with no primary action at the top
- Settings-style rows used for content people came to act on
- Every section has a heading of the same size
- The thing the user came for is item 6 of 9

**Fix in four steps**
1. Name the job and the one primary action (`jobs-and-metrics.md`).
2. Put the answer or action at the top: verdict first, details after; "Send a message" before the message history.
3. Group the rest into at most three levels and collapse details behind "See all" or a disclosure.
4. Cut anything that doesn't serve the job or a likely next job. Removing a section is a valid recommendation.

**Inverted pyramid** (plain words: most important first, details later, like a news article) is the shape to aim for.
