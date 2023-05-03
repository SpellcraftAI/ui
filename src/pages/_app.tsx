/* eslint-disable @typescript-eslint/no-unused-vars */
import "../index.css";

import { StrictMode } from "react";
import { type AppProps } from "next/app";
import { withSpellStyles } from "../client";

export const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <StrictMode>
      <Component {...pageProps} />
    </StrictMode>
  );
};

export default withSpellStyles(MyApp);
