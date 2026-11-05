# Gurdarshan Singh — Portfolio

Static site, no build step. Works on GitHub Pages and by double-clicking `index.html`.

## Folder map
```
index.html                 page skeleton (no content lives here)
assets/
  data/content.js          ALL text, projects, timeline, links, image paths  ← edit this
  data/kpis.js / kpis.json numbers computed from the two Power BI (.pbix) data models
  css/tokens.css           colours, fonts, radii  ← swap this to re-theme
  css/site.css             layout + components
  js/site.js               renders the page from content.js
  img/portrait/            hero cutout (colour + B&W), full cutout, photo, avatar
  img/projects/            web-optimised project screenshots (.webp)
  img/certs/               certificate images (.webp)
  img/brand/               favicon.svg, og-image.png (link preview)
  docs/                    project reports (PDF) linked from the project cards
  source/                  full-resolution originals (portrait, PDF screenshots, old site images)
```

## Changing the theme later
Keep `assets/` as is. A new theme only needs a new `index.html` + `site.css`/`tokens.css`
that reads `window.SITE` (content.js). All images and copy carry over.

## Deploy to GitHub Pages
Replace the contents of the `gurdarshan1997.github.io` repo with this folder and push.
You can leave out `assets/source/` (originals only, not used by the page) to keep the repo small.
