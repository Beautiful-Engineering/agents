# Fix Workflow

Patches HIG violations one at a time. Always runs Audit first. Commits atomically. Verifies before moving on.

## When to run this

User says: "fix the HIG issues", "make it match HIG", "audit and fix", "apply the fixes".

If the user just says "audit", run `workflows/audit.md` instead. Fix mode mutates code — always confirm before starting.

## Pre-flight checklist

Before mutating any file:
- [ ] Audit report exists (either from this session or generated now)
- [ ] User has confirmed the priority list (or said "fix everything Critical and High")
- [ ] Working tree is clean OR user accepts staging additional changes (run `git status` to confirm)
- [ ] Brand overrides file exists and is current (or user confirms there are none)

If any are unmet, stop and ask.

## Procedure

### Step 1 — Run an audit (or load existing one)

Follow `workflows/audit.md`. End with a prioritized findings list.

If the user provides an existing audit report, parse it instead.

### Step 2 — Confirm scope

Ask the user (or default to Critical + High if they explicitly said "fix everything important"):

> I found N Critical, M High, K Medium, L Low findings. Want me to:
> - **A.** Fix Critical + High only (recommended for a focused pass)
> - **B.** Fix Critical only (minimum to ship)
> - **C.** Fix all
> - **D.** Pick specific findings to fix

Wait for confirmation. Do not assume.

### Step 3 — Fix one finding at a time

For each finding, in priority order:

1. **Read the file at the exact line** the finding references. Don't trust the cached audit line — re-read in case the file moved.
2. **Confirm the issue is still there.** If the audit is stale, skip and note it.
3. **Apply the smallest possible patch** that resolves the finding. Don't fix unrelated issues in the same edit.
4. **For RN code:** translate via `reference/react-native-mapping.md` if the audit references SwiftUI patterns.
5. **Verify the patch makes sense:**
   - Does it satisfy the HIG principle?
   - Does it break anything obvious (typecheck-wise)?
   - Does it conflict with `hig-overrides.md`? If yes, stop — the audit shouldn't have raised this.
6. **Commit:** atomic commit with format `fix(hig): <one-line description>` mentioning the file and dimension. Example:
   ```
   fix(hig): use PlatformColor('label') for primary text — apps/mobile/src/screens/Home.tsx
   
   Replaces hardcoded #FFFFFF with semantic color so dark mode adapts.
   ```
7. **Move to next finding.**

### Step 4 — Run typecheck / linter (if available)

After every ~5 fixes (or all of them if the set is small), run:

```bash
cd apps/mobile && pnpm tsc --noEmit  # or whatever the project uses
```

If the project has a linter, run it too. Fix any new errors introduced before continuing.

### Step 5 — Re-run audit on the fixed files

Score only the dimensions touched, against the rubric. Report:
- Before score per dimension
- After score per dimension
- Composite delta
- Findings remaining

### Step 6 — Summary report

```markdown
# HIG Fix Pass — <target>

## Result
- **Before composite:** 5.6 / 10
- **After composite:** 8.2 / 10
- **Delta:** +2.6

## Fixed (N)
| Finding | File:Line | Dimension | Commit |
|---|---|---|---|
| ... | ... | ... | ... |

## Skipped (with reasons)
| Finding | Reason |
|---|---|
| Custom modal on `LoginScreen.tsx` | Requires new dependency; user to approve separately |

## Remaining
- M Medium, L Low findings remain (run another fix pass if desired)

## Verification
- TypeScript: ✓ no new errors
- Linter: ✓ no new warnings
- Manual: <list what you'd recommend testing>
```

## Constraints

- **One concern per commit.** Don't bundle "fix touch target" and "fix dark mode color" into one commit.
- **No drive-by fixes.** If you notice an unrelated bug or HIG issue not in the audit, note it for a follow-up audit. Don't fix it now.
- **No new dependencies without approval.** If a fix requires `expo-symbols` or `react-native-safe-area-context` and it's not installed, stop and ask before adding.
- **No file moves or renames.** Even if "Home.tsx should be HomeScreen.tsx" — out of scope.
- **No refactors.** If the right fix is to extract a `Theme` provider but the screen is the only thing inline-styling colors, ask before refactoring beyond the scope.

## Commit identity

Per Runo's CLAUDE.md, before committing in this repo:
```bash
git config user.email "100321034+pipeabellos@users.noreply.github.com"
git config user.name "Felipe Abello"
```

For other repos, ask the user for the right identity before the first commit.

## When to stop and ask

- A fix requires a new package
- A fix would change the public API of a component used elsewhere
- A finding contradicts the brand-overrides file (the audit shouldn't have raised it — flag the override mismatch)
- The user's earlier confirmation didn't cover the current finding's category
- A typecheck failure can't be resolved by reverting the single fix that caused it

## What to push back on

If the user says "fix everything to make it 10/10", push back:
- A 10/10 requires the codebase to have full theming infrastructure, design tokens, native-stack everywhere, full a11y annotations, etc. A single fix pass on one screen can't get there.
- Suggest a realistic target (e.g., "I can get this screen to 8.5/10 — getting to 10 means refactoring across the app").

If the user wants to skip Critical findings:
- Push back politely. Critical = accessibility/usability issues. Skipping them is a bad call.
- If they insist, document the skip in the report and proceed.
