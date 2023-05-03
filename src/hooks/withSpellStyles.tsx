import type { AppProps } from "next/app";
import { SpellCacheContext } from "../lib/context";

export const withSpellStyles = (MyApp: React.ComponentType<AppProps>) => {
  const UserApp = ({ Component, pageProps, ...props }: AppProps & { spellCache: any }) => {
    const { spellCache } = pageProps;
    return (
      <SpellCacheContext.Provider value={{ spellCache }}>
        <MyApp Component={Component} pageProps={pageProps} {...props} />
      </SpellCacheContext.Provider>
    );
  };

  return UserApp;
};
