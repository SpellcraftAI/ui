import type { GetStaticProps, GetStaticPropsContext } from "next";
import { readCache } from "../lib";

export const withStaticCache = (originalGetStaticProps?: GetStaticProps) => {
  const getStaticProps = async (context: GetStaticPropsContext) => {
    // const { readCache } = await import("../lib/cache");
    const spellCache = readCache();
    console.log("withStaticCache", { spellCache });

    if (originalGetStaticProps == null) {
      return {
        props: {
          spellCache
        }
      };
    }

    const result = await originalGetStaticProps(context);
    return {
      ...result,
      props: {
        spellCache
      }
    };
  };

  return getStaticProps;
};