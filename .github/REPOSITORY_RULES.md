# Branch protection rules

The `main` branch is protected by an active ruleset. This file records what that
ruleset enforces so the settings are not guesswork.

## Repository ruleset: `main`

- **Restrict deletions** — enabled
- **Block force pushes** — enabled
- **Require a pull request before merging** — enabled
  - Required approving reviews: **1**
  - Dismiss stale approvals when new commits are pushed: **enabled**
  - Require review from Code Owners: **enabled**
  - Require conversation resolution before merging: **enabled**
- **Require status checks to pass** — enabled
  - Required status check: `Format and validate`
  - Require branches to be up to date before merging: **enabled**
- **Bypass list** — `@tajious`, mode _always_

## What this gives you

Every change to `main` arrives through a pull request, needs a passing CI run,
and needs your approving review. `.github/CODEOWNERS` assigns every file to
`@tajious`, so "require review from Code Owners" resolves to you alone. Nobody
else can merge, and an administrator override does not get around it either.

You are the one entry on the bypass list, which matters for one specific case.
GitHub will not let you approve a pull request that you authored, and a rule
requiring one approving review counts nobody else, so without a bypass your own
pull requests could never be merged by anyone. The bypass closes that gap and
nothing more: it applies to you, so contributors still cannot merge their own
work without your review.

Changes to the ruleset are made from Settings → Rules → Rulesets, or:

```bash
gh api repos/tajious/timeless-circle/rulesets
gh api repos/tajious/timeless-circle/rulesets/24471165 -X PUT --input updated.json
```

A `PUT` replaces the whole ruleset, so the payload has to include every rule.
The API also rejects a `pull_request` rule unless all five of its parameters are
present, including the ones set to false.

## Two things worth knowing

**The status check is named `Format and validate`.** That is the job name in
`.github/workflows/check.yml`, not the workflow name and not the job id. Rename
the job and you must rename it in the ruleset too, otherwise every pull request
will be stuck waiting for a check that never reports.

**Adding a second maintainer is still the stronger setup.** The bypass trusts one
account with unreviewed merges. If someone else ever needs to help, put them in
`.github/CODEOWNERS` so one of you can review the other, and the bypass stops
being the only path.
