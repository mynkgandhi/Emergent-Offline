# Philips Smart Locks Hub — by Mindmaze

Static React catalogue of Philips smart door locks and the Philips video doorbell. No prices are listed; every enquiry opens a pre-filled email to **info@mindmaze.au**.

## Hosting on GitHub Pages
1. Push this repo to GitHub (public), branch `main`.
2. In the repo: **Settings → Pages → Source: GitHub Actions**.
3. The workflow in `.github/workflows/deploy.yml` builds `frontend/` and publishes it automatically.

The site uses hash routing (`/#/catalogue`) and relative asset paths, so it works on any Pages URL with no extra setup. No backend is needed.

## Local development
```bash
cd frontend
yarn install
yarn start
```

## Editing products
All product data (models, unlock methods, features, specs, colours, images) lives in `frontend/src/data/products.js`. Images are in `frontend/public/products/<slug>/`.
