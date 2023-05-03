<center>
  <h1>Style Spells</h1>

  <b>GPT Tailwind Generator for Next.js</b>

  Under development.

  <hr>
</center>

Use GPT-4 to generate Tailwind styles from natural language descriptions.

Generated styles are saved to a JSON cache and injected into the application at
build-time: No production fetch requests, no FOUC.

### Usage

<sub>**IMPORTANT:** _You must set the `getStaticProps` export in order to load
your styles from the JSON cache at build-time._</sub>

After following the **Setup** instructions below, you can generate styles using
the `useSpell()` hook, like so:

```tsx
// src/pages/index.tsx
import { useSpell } from "@spellcraft/styles/client";
import { withStylesCache } from "@spellcraft/styles/server";

export default function Home () {
  const styles = useSpell("purple text in small font");

  return (
    <main>
      <span className={styles}>
        hello world
      </span>
    </main>
  );
}

export const getStaticProps = withStylesCache();
```

<sub>**Note:** In production, the hook will not cause a re-render: It is only
used to fetch new styles and add them to the cache in dev mode.</sub>

### Setup

You'll need to configure the following pages to use Style Spells:

1. `pages/_document.tsx`
2. `pages/_app.tsx`
3. `pages/api/spellcraft.ts`

And for every page you use Style Spells, you'll need to ensure `getStaticProps`
exists and is wrapped:

```ts
export const getStaticProps = withStylesCache();
```

**We'll go over how to set this up below.**

---

#### 1. Wrap `_document.tsx` with `withDocument()`:

This adds support for SSR-compatible dynamic Tailwind with `@twind/next`. 

```tsx
// pages/_document.tsx

import { withDocument } from "@spellcraft/styles/document";
export default withDocument();
```

#### 2. Wrap `_app.tsx` with `withApp()`:

This wraps your app with a cache provider and utilities from `@twind/next`.

```tsx
// pages/app.tsx

import { StrictMode } from "react";
import { type AppProps } from "next/app";

import { withApp } from "@spellcraft/styles/client";

export const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <StrictMode>
      <Component {...pageProps} />
    </StrictMode>
  );
};

export default withApp(MyApp);
```

#### 3. Add API route to `pages/api/spellcraft.ts`:

This endpoint is used only in development mode to update your styles cache.

When you publish to production, this endpoint will not run, and the styles will
be loaded from the static JSON file at build-time only.

```ts
// pages/api/spellcraft.ts

import { SpellStylesAPI } from "@spellcraft/styles/server";
export default SpellStylesAPI;
```

That's it! 

With `pages/_document.tsx`, `pages/_app.tsx`, and `pages/api/spellcraft.ts`
configured, you're ready to use the `useSpell()` hook.