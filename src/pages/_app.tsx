/* eslint-disable @typescript-eslint/no-unused-vars */
import "../index.css";

import { StrictMode } from "react";
import withTwindApp from "@twind/next/app";
import { type AppProps } from "next/app";

export const MyApp = ({ Component, pageProps }: AppProps) => {
  // console.log("MyApp", { pageProps });
  return (
    <StrictMode>
      <Component {...pageProps} />
    </StrictMode>
  );
};

export default withTwindApp(MyApp);
