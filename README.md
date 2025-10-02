# Aayush Personal Site (Next.js + Tailwind + framer-motion)

## Quickstart
```bash
pnpm i   # or npm i / yarn
cp .env.local.example .env.local
pnpm dev
```

Set either **Resend** (preferred) or **Formspree** env vars.

## Deploy to Vercel
1. Push to a GitHub repo.
2. Import in Vercel → set env vars from `.env.local`.
3. Commits to `main` auto-deploy. PRs create preview URLs.
4. Add your domain in Vercel. Update `metadataBase` and OG image.

## Email
- **Resend:** set `RESEND_API_KEY`, `CONTACT_FROM`, `CONTACT_TO`. (Route uses Resend when key is present.)
- **Formspree:** set `NEXT_PUBLIC_FORM_ENDPOINT`. (Route falls back to Formspree when Resend not set.)

## Structure
- `components/PersonalSite.tsx` — your site (client component).
- `app/api/contact/route.ts` — email API route.
- `public/` — favicon, og image, placeholder résumé.
