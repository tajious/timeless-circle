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

You are the one entry on the bypass list. Be precise about what that does and
does not do, because the difference is not obvious.

It lets you **push straight to `main`**, so your own changes ship without a pull
request. It does **not** let you merge a pull request you authored: GitHub does
not count a pull request's author as one of its approving reviewers, and the
rule requires one. That combination is worth knowing before you plan a workflow
around it, because it is not fixable from the ruleset side.

## How changes land

Two paths, because the ruleset treats them differently.

- **Anyone else** opens a pull request. CI has to pass, you have to approve it,
  and you merge it. Nobody can merge it without you, and `--admin` does not get
  around that.
- **You** push to `main` directly. The bypass actor covers the push. Keep
  `npm run check` green locally first, since nothing else will catch a broken
  build.

The predictable failure mode: opening a pull request for your own change and
then finding it unmergeable. Push to `main` instead. If you would rather have
your own work reviewed too, add a second maintainer to `.github/CODEOWNERS` so
one of you can approve the other, and then the bypass is no longer load bearing.

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

**Adding a second maintainer is the stronger setup.** The bypass trusts one
account to push to `main` unreviewed, which is what makes solo work possible but
is also the one soft spot. A second code owner removes the need for it.
