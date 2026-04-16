# Modern Deals Replatform (MVP)

This folder implements the requested phased re-infrastructure:

1. Foundation (Next.js + Prisma + Auth + RBAC)
2. Catalog core (niche/category/product models, public catalog, search)
3. Dashboard (event ingestion + analytics summaries)
4. Admin productivity (listings workspace + bulk actions + CSV export/import)

## Run

```bash
cd modern-deals
cp .env.example .env
npm install
npx prisma migrate dev --name init
npm run prisma:seed
npm run dev
```

## Default admin

- Email: `admin@deals.local`
- Password: `admin123`

## Key routes

- `/` niches landing
- `/catalog/[slug]` public niche catalog
- `/product/[id]` product detail
- `/admin/dashboard` analytics
- `/admin/listings` listing workspace
- `/admin/niches`, `/admin/categories`, `/admin/products`

## API

- `GET/POST /api/niches`
- `GET/POST /api/categories`
- `GET/POST /api/products`
- `POST /api/events`
- `POST /api/bulk`
- `GET /api/export`
- `POST /api/csv-import`

## Deploy on Vercel

1. Import this repo in Vercel and set **Root Directory** to `modern-deals`.
2. Add environment variables:
   - `DATABASE_URL`
   - `NEXTAUTH_URL` (your deployed URL)
   - `NEXTAUTH_SECRET`
3. Use this build command so Prisma client is generated in CI:
   - `npx prisma generate && npm run build`
4. If you are using Postgres in production, run migrations:
   - `npx prisma migrate deploy`
