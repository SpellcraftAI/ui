import type { AppProps } from "next/app";
import { StylesCacheContext } from "../cache/context";

export const withApp = (MyApp: React.ComponentType<AppProps>) => {
  const UserApp = ({ Component, pageProps, ...props }: AppProps & { stylesCache: any }) => {
    const { stylesCache } = pageProps;

    return (
      <StylesCacheContext.Provider value={{ stylesCache }}>
        <MyApp Component={Component} pageProps={pageProps} {...props} />
      </StylesCacheContext.Provider>
    );
  };

  return UserApp;
};
