# CLAUDE.md — kcd-ruleta

## What this is

Fork of [OpenRuleta](https://github.com/LorenGrz/OpenRuleta) branded for
**KCD Argentina 2026** (Kubernetes Community Days Buenos Aires, 3/10/2026,
Plaza Galicia): a public raffle sign-up form + a local winner-picker wheel,
sharing one Supabase database. See `README.md` for the full picture and
`AGENTS.md` for the original template's customization checklist (still
accurate for how the repo is structured, minus the "generic template"
guardrail — this fork intentionally carries real event data).

## Layout

```
apps/form      @openruleta/form    public sign-up form (anon key, deploy on Vercel)
apps/ruleta    @openruleta/ruleta  winner wheel (service_role key, run locally)
packages/config  @openruleta/config  ALL branding/copy/event data — siteConfig
packages/core    @openruleta/core    types, validation, Supabase client, mock store
packages/ui      @openruleta/ui      shared React bits + Tailwind theme tokens
```

## Where config lives

- `packages/config/src/index.ts` — the one file with event name, Spanish
  (voseo) copy, sponsors/collaborators, wheel timing, CSV columns.
- `packages/ui/src/theme.css` — color palette (dark, `#010409` base,
  `#2563eb` primary) and font variable.
- `apps/*/src/app/layout.tsx` — Poppins font import (compile-time, can't live
  in config).
- `apps/*/public/` — logos; shared assets are copied into **both** apps'
  `public/` dirs since each app resolves config `src` paths against its own.

## Commands

```bash
pnpm install
pnpm dev            # form :3000 + ruleta :3100 in parallel
pnpm dev:form       # form only
pnpm dev:ruleta     # ruleta only (or: cd apps/ruleta && pnpm dev)
pnpm mock:reset     # wipe the local mock DB (no Supabase needed for any of the above)
pnpm typecheck && pnpm lint && pnpm test && pnpm build   # full check, all workspaces
```

## Env vars

Per-app `.env.local` (not committed):

| Var                         | form |              ruleta              |
| --------------------------- | :--: | :------------------------------: |
| `NEXT_PUBLIC_SUPABASE_URL`  |  ✅  |                ✅                |
| `SUPABASE_ANON_KEY`         |  ✅  |                                  |
| `SUPABASE_SERVICE_ROLE_KEY` |      |                ✅                |
| `RULETA_BASIC_AUTH`         |      | opt. (only if hosting the wheel) |

Unset `NEXT_PUBLIC_SUPABASE_URL` → both apps fall back to the file-backed mock
store automatically.

## Deploy

- `apps/form` → Vercel, Root Directory `apps/form`, anon key only (RLS makes it
  insert-only).
- `apps/ruleta` → run locally on the operator's laptop against the same
  Supabase project (service_role key never leaves the laptop).

## Known issues / pending

- `apps/ruleta/public/poster.svg` is still OpenRuleta's placeholder QR poster —
  regenerate it once the form has a deployed URL.
- Supabase project not yet created; both apps run on the mock store until then.
