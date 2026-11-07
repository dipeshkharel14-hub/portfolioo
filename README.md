# DIPESH — Portfolio (GitHub Pages)
Static site: no build step, no Vercel. Works as-is on GitHub Pages.

## Deploy
1. Create a GitHub repo and upload everything in this folder to the repo root (keep `.nojekyll`).
2. Settings → Pages → Source: **Deploy from a branch** → `main` / `(root)` → Save.
3. Your site goes live at `https://<username>.github.io/<repo>/` (name the repo `<username>.github.io` for a root URL).

## Customize
- Portrait: keep `Dipesh_ Cyberpunk Developer Profile.png` in the repo root. The site also tries other common names and auto-finds an image named like dipesh/cyberpunk/portrait/profile in your repo. For speed, convert it to WebP (squoosh.app) and name it `portrait.webp`.
- `main.js` → `CONFIG`: set `email`, `github`, `linkedin`. Empty values are hidden / the form copies to clipboard.
- Add projects by duplicating an `<article class="card">` in `index.html`.

## Behaviour
- Desktop: 10 autonomous pointers each drag a paint-style selection rectangle across sentences, buttons, tiles and images (a "locked" state), opening them at the same time, auto-scroll through all sections, and then wander, hovering nav, buttons and cards and opening previews. They pause when you scroll/move/type; **TAKE CONTROL** unlocks everything.
- Mobile / touch / reduced-motion: no artificial pointers, everything visible immediately.
- Sound is off by default (toggle in nav).
