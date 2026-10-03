# KCD Ruleta — Sorteo KCD Argentina 2026

Sorteo para **KCD Argentina 2026** (Kubernetes Community Days Buenos Aires),
3/10/2026 en Plaza Galicia. Dos apps Next.js que comparten una misma base de
datos:

- **`apps/form`** — formulario público de inscripción. Se comparte por QR;
  la gente carga sus datos desde el celular y queda anotada en el sorteo.
  Se despliega en Vercel.
- **`apps/ruleta`** — ruleta para quien conduce el sorteo en vivo: gira,
  asigna un premio, marca ganadores (quedan afuera de los próximos giros) y
  exporta un CSV. Se corre en una notebook, en la red local.

Basado en [OpenRuleta](https://github.com/LorenGrz/OpenRuleta) — este repo es
el fork con marca y copys propios del evento.

URL del formulario: _pendiente_.

## Stack

pnpm workspaces · Next.js 16 (App Router) · React 19 · TypeScript ·
Tailwind CSS v4 · Supabase (`@supabase/supabase-js`) · Vercel.

```
apps/
  form/      formulario público            (clave anon, se despliega)
  ruleta/    ruleta de ganadores            (clave service_role, local)
packages/
  config/    @openruleta/config  — TODA la marca, copys y datos del evento
  core/      @openruleta/core    — tipos, validación, cliente Supabase, DB
  ui/        @openruleta/ui      — componentes React compartidos + tema
supabase/
  schema.sql esquema único para ambas apps
```

## Probarlo sin base de datos

Un clone recién hecho corre contra un **mock store** local (un archivo JSON),
sin Supabase ni `.env`:

```bash
pnpm install
pnpm dev            # las dos apps en paralelo
# o por separado:
pnpm dev:form       # → http://localhost:3000
pnpm dev:ruleta     # → http://localhost:3100  (o: cd apps/ruleta && pnpm dev)
```

El mock se activa solo cuando `NEXT_PUBLIC_SUPABASE_URL` no está seteada.
`pnpm mock:reset` reinicia los datos de prueba.

## Configuración y deploy

### `apps/form` (Vercel)

1. Importar el repo con **Root Directory** en `apps/form`.
2. Variables de entorno: `NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_ANON_KEY`.
3. Deploy. `apps/form/vercel.json` pega diariamente a `/api/ping` para que el
   proyecto de Supabase (free tier) no se pause por inactividad.

### `apps/ruleta` (local)

Usa la clave **service_role**, sin autenticación por defecto — no se despliega
públicamente. Se corre en la notebook de quien conduce el sorteo:

```bash
cp apps/ruleta/.env.example apps/ruleta/.env.local
# completar NEXT_PUBLIC_SUPABASE_URL y SUPABASE_SERVICE_ROLE_KEY
pnpm dev:ruleta
```

## Decisiones de arquitectura

- Marca y copys viven en un solo archivo: `packages/config/src/index.ts`. Todo
  el texto está en español rioplatense (voseo).
- El isotipo de KCD es blanco sobre fondo transparente, pensado para fondos
  oscuros. Por eso el tema es oscuro (`#010409` de base) en vez del fondo claro
  original de OpenRuleta; en la tarjeta blanca del formulario, el logo se
  muestra dentro de un chip oscuro para mantener contraste. El hub central de
  la ruleta también se oscureció (antes era blanco) por el mismo motivo.
- Tipografía Poppins en reemplazo de Montserrat.
- Logos de sponsors y comunidades se mantienen sobre tarjetas blancas: son
  artes pensados para fondo claro.

## Lecciones aprendidas

- Antes de aplicar un tema oscuro a un fork, conviene mirar el isotipo real
  del evento: si es monocromático claro, define el fondo necesario en vez de
  al revés.
- Un solo archivo de config (`siteConfig`) hace que adaptar un template a un
  evento nuevo sea mayormente edición de datos, no de código.

## Próximos pasos

- Desplegar `apps/form` en Vercel y completar la URL pendiente arriba.
- Regenerar `apps/ruleta/public/poster.svg` (el QR del formulario) una vez
  que el deploy tenga URL final.
- Cargar el proyecto de Supabase real y correr `supabase/schema.sql`.

## Comandos

```bash
pnpm dev        ·  pnpm dev:form   ·  pnpm dev:ruleta   ·  pnpm mock:reset
pnpm build      ·  pnpm lint       ·  pnpm typecheck    ·  pnpm test
pnpm format
```

## Licencia

MIT — ver [`LICENSE`](LICENSE). Basado en OpenRuleta
(github.com/LorenGrz/OpenRuleta).
