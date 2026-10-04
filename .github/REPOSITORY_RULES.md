# Branch protection rules

Rulesets are configured on the repository. Apply them from the branch settings
screen.

## Repository ruleset: `main`

- **Restrict deletions** — enabled
- **Require a pull request before merging** — enabled
  - Required approving reviews: **1**
  - Dismiss stale approvals when new commits are pushed: **enabled**
  - Require review from Code Owners: **enabled**
  - Require conversation resolution before merging: **enabled**
- **Require status checks to pass** — enabled
  - Required status check: `Format and validate`
- **Require branches to be up to date before merging** — enabled
- **Block force pushes** — enabled
- **Restrict bypasses** — enabled, with an empty bypass list

## What this gives you

Every change to `main` has to arrive through a pull request, needs a passing CI
run, and needs your approving review. `.github/CODEOWNERS` assigns every file to
`@tajious`, so the "require review from Code Owners" rule resolves to you alone.
With the bypass list empty, nobody can skip the ruleset, including you and
including administrators.

## Enabling it

Settings → Rules → Rulesets → New ruleset → New branch ruleset.

- Target: `main`
- Enforcement: Active

Then tick the rules listed above.

For required status checks, pick `Format and validate` from the dropdown. That
is the job name in `.github/workflows/check.yml`, not the workflow name and not
the job id. If you rename the job, rename it here too, otherwise every pull
request will be stuck waiting for a check that never reports.
