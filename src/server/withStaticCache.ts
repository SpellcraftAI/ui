import type { GetStaticProps, GetStaticPropsContext } from "next";
import { readCache } from "../cache";

export const withStaticCache = (originalGetStaticProps?: GetStaticProps): GetStaticProps => {
  const getStaticProps = async (context: GetStaticPropsContext) => {
    const spellCache = readCache();
    console.log("withStaticCache", { spellCache });

    if (originalGetStaticProps == null) {
      return {
        props: {
          spellCache
        }
      };
    }

    const result = await originalGetStaticProps(context) as any;
    const originalProps = (result?.props) ?? {};
    return {
      ...result,
      props: {
        ...originalProps,
        spellCache
      }
    };
  };

  return getStaticProps;
};
