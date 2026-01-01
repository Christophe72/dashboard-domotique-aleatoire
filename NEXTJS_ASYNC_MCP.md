# NEXTJS_ASYNC_MCP.md

> **But**: Garde ce fichier à la racine du repo. C’est un « Minimum Compliant Policy » (MCP) pratique pour garantir la conformité aux APIs _asynchrones_ de Next.js 15+, ainsi que les choix React 19, TS 5.6/5.7 et Tailwind 4.x. Copie/colle les snippets tels quels.

---

## 🎯 Objectif

- Utiliser **uniquement** les APIs _request‑bound_ asynchrones (`await cookies()`, `await headers()`, `await draftMode()`, etc.).
- Éviter les régressions : nouveaux **defaults de cache** Next 15, **Server Actions** sécurisées, **React 19** (Actions/hooks), **TypeScript** strict, **Tailwind 4** CSS‑first.
- Garder KISS/DRY/SOLID.

---

## ✅ Check‑list CI (copier dans votre pipeline)

- [ ] `grep`/lint interdit les usages sync des APIs `next/headers`/`draftMode`.
- [ ] `tsc -p tsconfig.json --noEmit` passe en strict.
- [ ] `next build` passe avec `NEXT_TELEMETRY_DISABLED=1`.
- [ ] Tests e2e valident que les pages utilisent `await` pour `searchParams` (App Router), `cookies()` et `headers()`.
- [ ] `tailwindcss` v4 importé via CSS (`@import "tailwindcss";`).

---

## 📦 Dépendances minimales

```bash
npm i next react react-dom typescript @types/node
npm i -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
npm i tailwindcss @tailwindcss/postcss -D
```

> **Note** : sharp se charge automatiquement pour `next/image` en self‑host.

---

## ⚙️ `next.config.ts` (exemple sûr par défaut)

```ts
// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Contrôle fin du cache côté client pour App Router
    staleTimes: {
      dynamic: 0, // Page segments: toujours frais
    },
    // Activer si nécessaire des features expérimentales :
    // viewTransition: true,
    // after: true, // si vous êtes encore sur <15.1
  },
  eslint: { ignoreDuringBuilds: false },
  typescript: { ignoreBuildErrors: false },
};
export default nextConfig;
```

---

## 🔒 ESLint (règles utiles)

```json
// .eslintrc.json
{
  "root": true,
  "parser": "@typescript-eslint/parser",
  "plugins": ["@typescript-eslint"],
  "extends": ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  "rules": {
    "@typescript-eslint/await-thenable": "error",
    "no-restricted-imports": [
      "error",
      {
        "name": "next/headers",
        "importNames": ["cookies", "headers", "draftMode"],
        "message": "Utilise les versions **async** avec `await`."
      }
    ]
  }
}
```

> Astuce : ajoute un _custom rule_ si tu veux bloquer des patterns (`cookies()` sans `await`, etc.).

---

## 🧠 TS config stricte

```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2023", "DOM"],
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "allowJs": false,
    "strict": true,
    "noUncheckedSideEffectImports": true,
    "noFallthroughCasesInSwitch": true,
    "noImplicitOverride": true,
    "skipLibCheck": true,
    "jsx": "preserve",
    "incremental": true,
    "types": ["node"],
    "verbatimModuleSyntax": true
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}
```

---

## 🎨 Tailwind 4 (CSS‑first)

```css
/* app/globals.css */
@import "tailwindcss";
@layer theme {
  :root {
    --brand: oklch(0.65 0.18 264);
  }
}
```

_Sans `tailwind.config.js`_. Pour sourcer d’autres fichiers :

```css
@source "./app";
@source "./components";
```

---

## 🧩 Patterns conformes (App Router)

### 1) Server Component lisant les APIs request‑bound (asynchrone)

```tsx
// app/(dashboard)/page.tsx
import { cookies, headers, draftMode } from "next/headers";

export default async function Page({
  // Next 15: searchParams est asynchrone dans page.tsx
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[]>>;
}) {
  const sp = await searchParams;
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const h = await headers();
  const dm = await draftMode();

  return (
    <main className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <pre className="text-sm opacity-70">
        {JSON.stringify(
          { q: sp.q, token, ua: h.get("user-agent"), draft: dm.isEnabled },
          null,
          2
        )}
      </pre>
    </main>
  );
}
```

### 2) GET Route Handler (non‑caché par défaut)

```ts
// app/api/time/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ now: Date.now() });
}

// Pour forcer le statique :
export const dynamic = "force-static";
export const revalidate = 3600; // 1h
```

### 3) Server Action sécurisée + post‑réponse

```ts
// app/actions.ts
"use server";
import { cookies } from "next/headers";
// Next >=15.1: after() est stable
import { after } from "next/server";

export async function updateProfile(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const cookieStore = await cookies();
  const userId = cookieStore.get("uid")?.value;
  if (!userId) {
    throw new Error("Unauthenticated");
  }

  // TODO: call your DB here
  // await db.user.update({ where: { id: userId }, data: { name } });

  after(() => {
    // logging/analytics non bloquant
    // void analytics.track('profile_updated', { userId });
  });

  return { ok: true } as const;
}
```

### 4) Formulaire enrichi côté client (React 19 Actions)

```tsx
// app/(dashboard)/profile-form.tsx
"use client";
import * as React from "react";
import { useFormStatus } from "react-dom";
import { updateProfile } from "../actions";

function SubmitBtn() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-2xl px-4 py-2 border"
    >
      {pending ? "…" : "Enregistrer"}
    </button>
  );
}

export default function ProfileForm() {
  return (
    <form action={updateProfile} className="space-y-3">
      <input
        name="name"
        placeholder="Votre nom"
        className="border p-2 rounded"
      />
      <SubmitBtn />
    </form>
  );
}
```

### 5) Middleware Node (optionnel/expérimental)

```ts
// middleware.ts (expérimental Node runtime)
export const config = { matcher: ["/api/:path*"] };

export default async function middleware(req: Request) {
  const key = req.headers.get("x-api-key");
  if (!key) return new Response("Forbidden", { status: 403 });
  return undefined; // continue
}
```

---

## 🧪 Test de conformité (suggestion vite/Playwright)

- Visite `/` avec `?q=abc` et vérifie que la page rend la valeur `q`.
- Vérifie que `user-agent` et `draftMode.isEnabled` sont présents dans le JSON rendu.
- Route `/api/time` renvoie un timestamp différent à chaque appel (non‑caché).
- Le formulaire `updateProfile` retourne `{ ok: true }` et désactive le bouton pendant le submit.

---

## 🗂️ Arborescence de départ

```
app/
  (dashboard)/
    page.tsx
    profile-form.tsx
  api/
    time/route.ts
  actions.ts
  globals.css
next.config.ts
.eslintrc.json
package.json
tsconfig.json
```

---

## 🔁 Migration rapide (si app existante)

1. Lance `npx @next/codemod@canary next-async-request-api .` (si nécessaire) et corrige tous les appels sync.
2. Remplace `searchParams` sync dans `page.tsx` par la version _Promise_ et `await`.
3. Révise les route handlers GET : non‑cachés par défaut, ajoute `dynamic='force-static'` si désiré.
4. Active `after()` et remplace les tâches post‑réponse manuelles.
5. Passe Tailwind v4 (CSS‑first) et supprime l’ancien `tailwind.config.js` si inutile.

````



---

## 🚨 Sécurité — Mise à jour Next.js (31 déc. 2025)

**Contexte**: Deux vulnérabilités RSC en amont (React) impactent les apps Next.js **App Router** :
- **CVE-2025-55184** (DoS, sévérité élevée) → requête mal formée provoquant une boucle infinie côté serveur. *Correctif initial incomplet* remplacé par **CVE-2025-67779**.
- **CVE-2025-55183** (exposition de code source, sévérité moyenne) → peut renvoyer le code compilé d’autres Server Functions si la requête est spécialement forgée. **Ne jamais** mettre de secrets inlinés dans le code.

**Versions corrigées (extraits)** :
- 14.x → **14.2.35**
- 15.0.x → **15.0.7** ; 15.1.x → **15.1.11** ; 15.2.x → **15.2.8** ; 15.3.x → **15.3.8** ; 15.4.x → **15.4.10** ; 15.5.x → **15.5.9** ; 15.x canary → **15.6.0‑canary.60**
- 16.0.x → **16.0.10** ; 16.x canary → **16.1.0‑canary.19**

**Action requise** : mettre à jour vers la version corrigée de votre ligne.
```bash
# Exemple selon ligne
npm i next@14.2.35
npm i next@15.0.7   # 15.0.x
npm i next@15.1.11  # 15.1.x
npm i next@15.2.8   # 15.2.x
npm i next@15.3.8   # 15.3.x
npm i next@15.4.10  # 15.4.x
npm i next@15.5.9   # 15.5.x
npm i next@16.0.10  # 16.0.x
# canary
npm i next@15.6.0-canary.60
npm i next@16.1.0-canary.19

# Assistant interactif recommandé
npx fix-react2shell-next
````

**Pas de contournement** : la mise à jour est obligatoire.

**Politiques additionnelles** :

- **Secrets** uniquement via variables d’environnement (runtime), **jamais** en clair dans le code ou fichiers statiques.
- **Server Actions** : valider les entrées et retourner des objets sérialisables uniquement.
- Auditer toute réponse pour éviter de renvoyer du code (ex. erreurs CRUD non filtrées).

---

## 📡 Réseau : n’utiliser que les APIs Web asynchrones (pas d’axios)

**Objectif** : réduire la surface d’attaque, la taille du bundle et s’aligner avec l’exécution server/edge de Next.js.

### Interdits

- `axios`, `node-fetch`, `got`, clients HTTP custom non nécessaires.
- `XMLHttpRequest` côté client.

### ESLint (mise à jour)

```json
// .eslintrc.json (ajouts clés)
{
  "rules": {
    "no-restricted-imports": [
      "error",
      {
        "paths": [
          { "name": "axios", "message": "Utilise fetch (Web API) asynchrone." },
          {
            "name": "node-fetch",
            "message": "Utilise le fetch global fourni par Next/Node."
          },
          { "name": "got", "message": "Utilise fetch (Web API) asynchrone." }
        ],
        "patterns": [
          {
            "group": ["axios/*", "node-fetch/*", "got/*"],
            "message": "Utilise fetch asynchrone."
          }
        ]
      }
    ],
    "@typescript-eslint/await-thenable": "error"
  }
}
```

### Bonnes pratiques `fetch`

- **Toujours asynchrone** : `await fetch(...)`.
- Spécifier l’intention de cache Next :

  - `cache: 'no-store'` pour données dynamiques sensibles.
  - `next: { revalidate: N }` pour ISR.

- **Timeout** et **abort** via `AbortController`.
- **Retry** borné et idempotent (GET/HEAD). Pas de retry automatique pour mutations.
- **Parse** en JSON après vérif du `Content-Type`.
- **Ne jamais** interpoler directement des secrets dans l’URL.

### Utilitaire minimal : `safeFetch` (server & client)

```ts
// lib/safe-fetch.ts
export type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonValue[]
  | { [k: string]: JsonValue };

export async function safeFetch<T extends JsonValue = JsonValue>(
  input: RequestInfo | URL,
  init: RequestInit & { timeoutMs?: number; retries?: number } = {}
): Promise<T> {
  const { timeoutMs = 10_000, retries = 0, ...rest } = init;
  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(input, { ...rest, signal: controller.signal });
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }
    const ct = res.headers.get("content-type") || "";
    if (!ct.includes("application/json")) {
      throw new Error("Unexpected content-type");
    }
    return (await res.json()) as T;
  } catch (err) {
    if (retries > 0) {
      return safeFetch<T>(input, { ...rest, timeoutMs, retries: retries - 1 });
    }
    throw err;
  } finally {
    clearTimeout(t);
  }
}
```

### Exemples Next

```ts
// Server Component / Route Handler
const data = await safeFetch("https://api.example.com/items", {
  cache: "no-store", // données sensibles
  // next: { revalidate: 60 },  // alternative ISR
  headers: { accept: "application/json" },
});
```

```ts
// POST mutatif avec garde
await fetch(process.env.INTERNAL_URL + "/api/ingest", {
  method: "POST",
  cache: "no-store",
  headers: { "content-type": "application/json" },
  body: JSON.stringify({ id, value }),
});
```

### Migration rapide depuis axios

1. Remplacer `axios.get(url, { params })` par `fetch(url + new URLSearchParams(params))` ou `Request`.
2. Extraire `data` → `await res.json()` après vérif `res.ok`.
3. Injecter `AbortController` pour les timeouts et annulations.
4. Supprimer intercepteurs → écrire des helpers purs (ex. `safeFetch`).

---

## 🔐 Guardrails supplémentaires

- **Headers/Cookies** : utiliser uniquement les **APIs asynchrones** `await cookies()`, `await headers()` côté serveur.
- **Server Actions** : valider `FormData`, **pas** de secrets inlinés, préférer les IDs opaques.
- **Logging post-réponse** : `after(() => ...)` au lieu de bloquer la réponse.
- **CSP/Headers** : activer `Content-Security-Policy`, `Referrer-Policy`, `X-Content-Type-Options=nosniff` via middleware ou plateforme.
- **Sourcemaps** : ne pas exposer en prod ou restreindre l’accès.
