# Timeless Circle

The landing page for the Timeless Circle neighborhood, live at
[timeless-circle.world](https://timeless-circle.world).

A single static page, served by Nginx, with a direct invitation to the
community Discord.

## Stack

| Concern | Choice                    |
| ------- | ------------------------- |
| Markup  | Plain HTML                |
| Styles  | Plain CSS, no framework   |
| Script  | Vanilla JavaScript        |
| Hosting | Nginx on Docker           |
| Deploy  | Dokploy, built from image |

There is no build step. What is in the repository is what is served.

## Layout

```
index.html            Page markup only, no inline CSS or JS
assets/styles.css     Every style, grouped by component
assets/app.js         Copy-to-clipboard behaviour for the Discord invite
assets/*.png, *.webp  Artwork
nginx.conf            Server config and security headers
Dockerfile            Image definition used by Dokploy
```

## Running locally

Build and start the image exactly as production does:

```bash
docker build -t timeless-circle .
docker run --rm -p 8080:80 timeless-circle
```

Then open <http://localhost:8080>.

To iterate on the files without rebuilding, serve the folder directly with any
static server:

```bash
npx serve .
```

## Checks

Formatting and markup validity run through Prettier and html-validate:

```bash
npm install
npm run check      # verify
npm run format     # fix
```

Both run automatically on every pull request.

## Editing

Style lives in `assets/styles.css`, ordered from design tokens to components to
responsive overrides. Layout is desktop-first: the base rules target a wide
viewport, and the `@media` queries at the bottom of the file narrow it down at
1100px, 760px and 390px.

The code carries no comments. Names and grouping carry the meaning instead, so
keep them honest when you edit.

Reusable colours and fonts are CSS custom properties on `:root`. Prefer changing
one there over hunting for a hard-coded value.

## Contributing

Read [CONTRIBUTING.md](CONTRIBUTING.md) first. Every change lands through a pull
request and needs an approving review before it can merge.

## License

[MIT](LICENSE) © 2026 Timeless Circle
