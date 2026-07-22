# Second Sunrise — all images integrated

This build includes:

- 34 shop products grouped into Tees, Crewnecks, Hats, Bottoms, Accessories, and New York Wave
- Multi-image product galleries
- All 69 unique uploaded images in a filterable Lookbook
- Optimized WebP images (about 6.7 MB total instead of about 138 MB)
- Cart drawer and a clearly labeled demo checkout
- Responsive desktop and mobile layouts

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Deploy from the existing Git repository

Copy the contents of this folder over your local `second-sunrise-photo-update` repository, then run:

```bash
git add .
git commit -m "Add full Second Sunrise catalog and lookbook"
git push origin main
```

Vercel should deploy the push automatically.

## Important

The checkout is intentionally a demo. It does not process payment. Connect Shopify, Stripe Checkout, or another provider before taking real orders.
