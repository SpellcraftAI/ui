import "../index.css";

import type { AppProps } from "next/app";
import { StrictMode } from "react";
// import { withSpellcraft } from "../components/Test/withSpellcraft";

export const App = ({ Component, pageProps }: AppProps) => {
  return (
    <StrictMode>
      <Component {...pageProps} />
    </StrictMode>
  );
};

export default App;
