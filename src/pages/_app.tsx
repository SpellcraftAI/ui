import "../index.css";

import App, { type AppContext, type AppProps } from "next/app";
import { StrictMode } from "react";
import withTwindApp from "@twind/next/app";

import { SpellCacheContext } from "../lib/context";

export const MyApp = ({ Component, pageProps }: AppProps) => {
  console.log({ pageProps });
  return (
    <SpellCacheContext.Provider value={{ spellCache: pageProps.spellCache }}>
      <StrictMode>
        <Component {...pageProps} />
      </StrictMode>
    </SpellCacheContext.Provider>
  );
};

MyApp.getInitialProps = async (appContext: AppContext): Promise<any> => {
  const cacheRequest = await fetch("http://localhost:3000/spellcraft.json");
  const spellCache = await cacheRequest.json();

  console.log("getInitialProps", { spellCache });

  let appProps;
  if (MyApp.getInitialProps !== undefined) {
    appProps = await MyApp.getInitialProps(appContext);
  } else {
    appProps = await App.getInitialProps(appContext);
  }

  return {
    ...appProps,
    spellCache
  };
};

export default withTwindApp(MyApp);
