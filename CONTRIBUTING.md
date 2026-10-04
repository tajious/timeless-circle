# Contributing

Thanks for helping shape the neighborhood. This project is small on purpose, so
a few clear habits go a long way.

## Ground rules

- No code comments. Explain intent through clear naming and sensible grouping.
- Every change arrives as a pull request. Direct pushes to `main` are not
  accepted.
- One concern per pull request. Small reviews get reviewed.
- Never hand-format. Run `npm run format` and let the tooling decide.

## Getting set up

```bash
git clone https://github.com/tajious/timeless-circle.git
cd timeless-circle
npm install
```

## Working on a change

Branch off `main` using a descriptive name:

| Prefix   | Use for                          |
| -------- | -------------------------------- |
| `feat/`  | New visible behaviour or content |
| `fix/`   | A bug in existing behaviour      |
| `docs/`  | Documentation only               |
| `chore/` | Tooling, config, dependencies    |

Keep branches short-lived and based on the latest `main`.

```bash
git checkout -b feat/crest-alt-text
```

## Before you open a pull request

```bash
npm run check
```

This verifies Prettier formatting and HTML validity. Fix anything it reports,
or run `npm run format` and re-check.

## Opening the pull request

Fill in the template. Describe what changed and why, and show a before and after
screenshot for any visual change. Screenshots are the fastest way to get a
visual change approved.

## Review

A maintainer reviews every pull request, and nothing merges without an approving
review. If you get asked for changes, push new commits to the same branch and
the pull request updates automatically.

## Code of conduct

Participation is governed by [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).
