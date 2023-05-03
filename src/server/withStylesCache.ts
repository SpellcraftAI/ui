import type { GetStaticProps, GetStaticPropsContext } from "next";
import { readCache } from "../cache";

export const withStylesCache = (originalGetStaticProps?: GetStaticProps): GetStaticProps => {
  const getStaticProps = async (context: GetStaticPropsContext) => {
    const stylesCache = readCache();

    if (originalGetStaticProps == null) {
      return {
        props: {
          stylesCache
        }
      };
    }

    const result = await originalGetStaticProps(context) as any;
    const originalProps = (result?.props) ?? {};
    return {
      ...result,
      props: {
        ...originalProps,
        stylesCache
      }
    };
  };

  return getStaticProps;
};
