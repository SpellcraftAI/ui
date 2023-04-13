/**
 * @fileoverview - IGNORE THIS FILE UNTIL THE MANUAL DEMO WORKS
 */

/* eslint-disable no-lone-blocks */
import type { AppContext, AppProps } from "next/app";
import App from "next/app";
import { SpellCacheContext } from "./context";

type SpellcraftAppProps = AppProps & {
  spellCache: Record<string, string>
};

export const withSpellcraft = (UserApp: any) => {
  const appWithProvider = (props: SpellcraftAppProps) => (
    <SpellCacheContext.Provider value={{ spellCache: props.spellCache }}>
      <UserApp {...props} />
    </SpellCacheContext.Provider>
  );

  appWithProvider.getInitialProps = async (appContext: AppContext) => {
    const { readFileSync, writeFileSync, existsSync } = await import("fs");

    let appProps;
    if (UserApp.getInitialProps !== undefined) {
      appProps = await UserApp.getInitialProps(appContext);
    } else {
      appProps = App.getInitialProps(appContext);
    }

    const cacheExists = existsSync("spellcraft.json");
    if (!cacheExists) {
      writeFileSync("spellcraft.json", "{}");
    }

    const spellCache = JSON.parse(readFileSync("spellcraft.json", "utf8"));
    return {
      ...appProps,
      spellCache
    };
  };

  return appWithProvider;
};
