# Ekant — Portfolio

Personal portfolio of **Ekant**, full-stack .NET and Angular software engineer at Bosch Global Software Technologies, Bengaluru.

A single static page: no build step, no framework, no dependencies. It runs on any static host.

## Features

- Live terminal in the hero (`help`, `whoami`, `skills`, `projects`, `contact`, `hire ekant`)
- Interactive "What I do" capability explorer with code examples
- Highlights with a before/after stack switch
- Bosch projects section with an interactive V-model and an animated tool-suite map
- Career journey timeline
- Resume download (`Ekant_Resume.pdf`)
- Responsive down to phone width, respects reduced-motion settings

## Project structure

```
.
├── index.html               # page markup
├── 404.html                 # not-found page
├── Ekant_Resume.pdf         # resume served by the Download button
├── assets/
│   ├── css/style.css        # all styles (design tokens at the top)
│   ├── js/main.js           # terminal, explorer, V-model, tool map, etc.
│   └── img/
│       ├── ekant.jpg        # profile photo
│       └── favicon.svg      # browser tab icon
├── .github/workflows/deploy.yml   # auto-deploy to GitHub Pages
└── .nojekyll                # tells GitHub Pages to serve files as-is
```

## Run locally

Open `index.html` in a browser, or serve the folder:

```bash
python -m http.server 8000
# then open http://localhost:8000
```

## Deploy to GitHub Pages

1. Create a new **public** repository on GitHub.
   - Name it `<your-username>.github.io` to get the address `https://<your-username>.github.io`.
   - Any other name gives `https://<your-username>.github.io/<repo-name>`.
2. Push this folder to the `main` branch:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```
3. In the repository, open **Settings → Pages** and set **Source** to **GitHub Actions**.
4. The included workflow deploys the site on every push. Check progress under the **Actions** tab; the live URL appears when it finishes.

### Custom domain (optional)

Buy a domain (for example `ekant.dev`), then add it under **Settings → Pages → Custom domain** and follow GitHub's DNS instructions. Turn on **Enforce HTTPS** once it is available.

## Updating content

| What | Where |
|---|---|
| Text, sections, projects | `index.html` |
| Colors and fonts | design tokens at the top of `assets/css/style.css` |
| Terminal commands, capability explorer, tool-map details | `assets/js/main.js` |
| Resume | replace `Ekant_Resume.pdf` (keep the same file name) |
| Photo | replace `assets/img/ekant.jpg` |

Commit and push; the site redeploys automatically.

---

© 2026 Ekant. Designed & built by Ekant in Bengaluru.
