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
- **Bypass list** — empty

## What this gives you

Every change to `main` arrives through a pull request, needs a passing CI run,
and needs your approving review. `.github/CODEOWNERS` assigns every file to
`@tajious`, so "require review from Code Owners" resolves to you alone. Because
the bypass list is empty, nobody can skip the ruleset, including administrators.

Changes to the ruleset are made from Settings → Rules → Rulesets, or:

```bash
gh api repos/tajious/timeless-circle/rulesets
gh api repos/tajious/timeless-circle/rulesets/24471165 -X PATCH --input updated.json
```

## Two things worth knowing

**The status check is named `Format and validate`.** That is the job name in
`.github/workflows/check.yml`, not the workflow name and not the job id. Rename
the job and you must rename it in the ruleset too, otherwise every pull request
will be stuck waiting for a check that never reports.

**Approval of your own pull requests.** GitHub does not let you approve a pull
request that you authored, and a ruleset that requires one approving review
counts nobody else. So pull requests you open yourself cannot be merged by you
alone. That is the right trade for a repository whose changes come from
contributors. If you want to ship your own work through the same path, add a
second maintainer to `.github/CODEOWNERS` so one of you can review the other.
