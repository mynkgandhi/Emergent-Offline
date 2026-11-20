# PRD — Philips Smart Locks Hub (by Mindmaze)

## Original problem statement
Create a Phillips Smart Locks Hub as a website to host on Github public repo. I want the website to have all the current locks available at mysmartlocks.com.au and use the colour template different to theirs and make it more modern. Have the website as ecommerce ready, but do not list the price and ask them to contact for the price to info@mindmaze.au. Do not include safes from the website and keep the door locks and the doorbell in the catalogue. Include detailed features and functionality for all the locks, as per mysmartlocks.com.au. Example: the DDL902 lock has more than 6 ways to open the door; current listings only highlight face and palm recognition and miss code, fingerprint, mechanical key and key tags. Also, include additional: Why Philips to Why Phillips and from Mindmaze, we provide personal care for the builders and trades to a seamless experience for them and their customers. Contact us for bulk prices for trade. Include the filters for Face, Palm, and other functionalities needed. Mention that Mindmaze is the Largest Trade Partner for Philips Smart Locks. Home page highlights that Philips locks provide secure and safe access and ease of access for you and your family. Home page image to change with family walking in with groceries in both hand and DDL 902 recognises Face and opens the door for them so they can push to enter the house. DDL 902 gold colour pictures can be found on www.binglee.com.au. On the home page, change the request pricing to Request for Trade Pricing. The home page should show only 4 products: DDL902, DDL801, DDL720-5HWS and DDL720-MVP-17HWS. Remove DDL709 and DDL303 from the catalogue. DDL720-5HWS page has images of DDL720-MVP-17HWS with black color please remove that. Both models are only available in grey.

## User choices
Static React site for GitHub Pages (no backend); enquiry form opens pre-filled email to info@mindmaze.au; product photos downloaded into the site; AI-generated hero.

## Architecture
- React (CRA/craco) static SPA, HashRouter, `homepage: "."` → works on any GitHub Pages URL
- Data: `frontend/src/data/products.js`; images in `frontend/public/products/<slug>/`
- Quote list stored per browser (localStorage); enquiry → mailto
- framer-motion + lenis; GitHub Actions workflow `.github/workflows/deploy.yml`

## Implemented (2026-11-11)
- Home: kinetic hero (AI image: family w/ groceries, DDL902 face scan), marquee, 4-product bento (DDL902, DDL801, DDL720-5HWS, DDL720-MVP-17HWS) with "Request for Trade Pricing", DDL902 8-method unlock matrix, Why Philips, Shop by function, Why Mindmaze (Largest Trade Partner)
- Catalogue: 17 products (16 locks + DDA270X doorbell; no safes, no DDL709/DDL303), filters by Face/Palm/Fingerprint/PIN/Key Tag/Key/App/Video + type + search
- Product pages: gallery w/ colour switch (DDL902 Gold from Bing Lee + Black), unlock methods, features, specs, ideal-for, related; DDL720-5HWS black images removed, grey only
- Quote drawer + enquiry form (mailto), Trade page, original SVG logo/favicon

## Implemented (2026-11-11, iteration 2)
- Contact email changed site-wide to info@phillipslocks.com.au
- Compare (up to 3 locks, floating bar, side-by-side unlock methods/features/specs) at /compare
- Door Fit Finder 5-question quiz with top-3 picks at /finder
- Trade spec pack from quote list at /spec-pack (print / Save as PDF)
- Hero image regenerated: DDL902 (gold/black) scanning dad's face on a fully closed door
- Hero scan animation: pulsing beam, face scan line, gold face brackets, green unlock glow; scan card/chip cycle "Scanning face…" → "Face recognised · Door unlocked"

## Backlog
- P1: Real form submission service so enquiries send without an email app (user chose to keep email-app method for now)
- P1: Verify per-colour imagery for 7300 (Copper) and DDL210S (Nickel)
- P2: Installation guides / PDFs per lock, comparison tool
