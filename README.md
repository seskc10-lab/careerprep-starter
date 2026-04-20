# CareerPrep Starter

A Next.js App Router starter for the editorial-style CV analysis and interview prep product.

## What this starter includes

- Landing page
- Analyze funnel
- Free preview generation via server routes
- Full report page
- Stripe Checkout scaffolding
- Supabase Auth + database scaffolding
- Local JSON fallback storage for development
- Demo LLM fallback if no model key is configured

## Quick start

```bash
npm install
npm run dev
```

Then open:

- http://localhost:3000
- http://localhost:3000/api/me

## Storage behavior

The app tries Supabase first. If server-side Supabase env is missing, it falls back to `.data/reports.json` so the starter still works locally.

## Stripe behavior

If Stripe env is missing, checkout runs in demo mode and the success page still unlocks the full report for testing.

## Demo mode

Use `.env.local` with:

```bash
DEMO_MODE=true
NEXT_PUBLIC_DEMO_MODE=true
APP_BASE_URL=http://localhost:3000
OPENAI_API_KEY=
OPENAI_MODEL=gpt-5.4-mini
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PRICE_ID=
```

When `DEMO_MODE=true`:

- Preview generation returns deterministic local fallback JSON.
- Full report generation returns deterministic local fallback JSON.
- Checkout redirects to a fake local success URL and no real payment is attempted.
- Demo reports are saved to `local_db.json` in the project root.
- Demo reports are treated as unlocked and can be opened locally at `/report/[id]`.
