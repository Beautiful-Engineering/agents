# Interaction Patterns

Action-oriented patterns: what to reach for when a screen has to get someone to do something. Each pattern lists when it fits and the concept behind it. Used in Audit A2 to A4 and Design D3.

---

## 1. One primary action per screen

**Plain words:** if everything shouts, nothing is heard. Give the screen one obvious next step.

- One filled, full-width (mobile) or high-contrast (web) button for the primary action. Secondary actions are outlined or text buttons. Tertiary actions live in a menu or at the bottom.
- Label with a verb plus object: "Send a message," not "Continue" or "Submit."
- On mobile, put the primary action in the bottom third, within thumb reach. **Fitts's law:** bigger and closer targets are faster to hit.
- **Von Restorff effect:** the one thing that looks different gets noticed. Spend visual contrast on the primary action, nowhere else.

## 2. Action strip / "ways to help" hub

**When:** the screen's audience can take several valid actions (a family page where people can send a message, a gift, or a meal).

- Show three or four actions as a row or grid of equal-sized tiles, each with an icon and a short verb label, near the top.
- Order by how often people should pick each, most useful first, and give the default a subtle emphasis.
- Cap the choices. **Hick's law:** more options mean slower decisions. Past four, group or hide behind "More."
- Each tile leads straight to the action, not to another menu.

## 3. Inline actions on the object

**Plain words:** put the button where the thing is. Don't make people select something, then hunt for what to do with it.

- Reactions, reply, edit, or share sit on the item itself (a message card, a list row).
- Swipe actions on mobile rows for frequent, reversible actions; always mirror them in a visible menu, because swipes are invisible.
- **Proximity (Gestalt):** controls next to what they affect are read as belonging to it.

## 4. Progress and goal meters

**When:** the job takes several steps or builds toward a target (onboarding, a fundraising goal, a streak).

- Show how far along the user is and how much is left: "Step 2 of 4," a filled bar, "3 of 5 meals covered."
- Start the bar partly filled where honest (a completed sign-up counts as step 1). **Goal-gradient effect:** people speed up as they near the finish.
- Unfinished visible progress pulls people back. **Zeigarnik effect:** we remember incomplete tasks.
- Never fake progress. A bar that jumps backward destroys trust.

## 5. Social proof and activity feeds

**When:** people hesitate because they don't know if others do this, or the product is about a group.

- Show recent real activity: "Ana sent a message 2 hours ago," "12 people are following along."
- Faces and names beat counts. Counts beat nothing. Small counts ("1 person") can backfire; hide them until they help.
- Make each feed item actionable (react, reply), so watching turns into doing.
- Only real data. Invented activity is a dark pattern (see `anti-patterns.md`).

## 6. Success states that chain to a next action

**Plain words:** the moment after someone finishes is when they're most willing to do one more thing. Don't waste it on "Done!"

- Confirm what happened in specific words: "Your message is on the family page," not "Success."
- Offer one next action that serves the same job: "Add a photo" or "Share the page with someone else."
- Make it skippable with an obvious way out.
- **Peak-end rule:** people judge an experience by its best moment and its end. The success screen is the end; make it feel good.

## 7. Contextual opt-ins

**When:** you need a permission (notifications, camera, contacts) or a sign-up.

- Ask at the moment the benefit is obvious: notifications right after someone joins a family page ("Want a ping when the baby arrives?"), not on launch.
- Pre-prompt in your own UI first, explaining the benefit, then trigger the system dialog. A system "Don't allow" is hard to reverse; your own "Not now" is free.
- Let people try before sign-up. Ask for an account when there is something worth saving.

## 8. Empty states that teach

**Plain words:** a blank screen is a dead end. An empty state is the best tutorial you'll ever get to show.

- Say what will appear here, why it's useful, and give one button to make the first one: "No scans yet. Scan your first food to see if it's safe. [Scan a barcode]."
- Use an illustration only if it carries meaning; otherwise text plus a button is enough.
- Distinguish "nothing yet" (first use) from "nothing matches" (search, filter) from "something broke" (error). Each needs different words.

## 9. Undo over confirm

**Plain words:** "Are you sure?" dialogs train people to tap Yes without reading. Let them act, then let them take it back.

- For reversible actions (delete, archive, send to a draft), act immediately and show a toast with "Undo" for 5 to 10 seconds.
- Keep confirm dialogs for actions that truly can't be undone or that cost money, and name the consequence in the button: "Delete 12 scans," not "OK."

## 10. Optimistic UI

**When:** an action almost always succeeds (likes, sending a message, toggling a setting).

- Update the screen immediately as if it worked, sync in the background, and roll back with a clear message if it fails.
- **Doherty threshold:** responses under about 400 ms keep people in flow. Optimistic UI makes slow networks feel instant.
- Don't use it for payments or anything where a silent failure would hurt.

## 11. Forms: one thing per page

Distilled from the GOV.UK Design System, which tests its patterns with millions of real users.

- **One question per page** for anything longer than a few fields, especially on mobile. Each page has one job, errors are easy to place, and progress feels steady.
- Ask only what you need, and know why you need each answer. **Tesler's law:** some complexity can't be removed, only moved; move it to the system, not the user.
- Labels above fields, always visible. Placeholder text is not a label; it disappears when typing starts.
- Use the right keyboard and input type (email, number, date), and allow paste.
- Validate on submit or on leaving a field, not on every keystroke. Error messages say how to fix it: "Enter a due date in the future."
- Show a "Check your answers" summary before anything final.
- **Miller's law:** people hold a handful of items in working memory. Chunk long inputs (phone numbers, codes) and long forms into groups.

## 12. Tap targets and reach

- Minimum 44 x 44 pt on iOS, 48 x 48 dp on Android, 24 x 24 CSS px under WCAG 2.2 (aim for 44 on touch web).
- At least 8 pt between adjacent targets.
- The visible element can be smaller than the target; pad the hit area.
- Primary actions in the bottom half on phones; destructive actions away from where thumbs rest.

## 13. Follow conventions

**Jakob's law:** people spend most of their time in other apps and expect yours to work the same way. Tab bars at the bottom, back at top left, pull to refresh, search with a magnifying glass. Break a convention only when the gain is large and you've tested it.

---

## Pattern picker

| The user needs to... | Reach for |
|----------------------|-----------|
| Pick from a few valid actions | Action strip (2) |
| Act on one item in a list | Inline actions (3) |
| Finish a multi-step task | Progress meter (4) + one thing per page (11) |
| Trust that others do this | Social proof feed (5) |
| Keep going after finishing | Chained success state (6) |
| Grant a permission | Contextual opt-in (7) |
| Start from nothing | Teaching empty state (8) |
| Delete or change something | Undo over confirm (9) |
| Get instant feedback | Optimistic UI (10) |
