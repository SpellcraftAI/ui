import Head from "next/head";
import { useSpell } from "../client";
import { withStylesCache } from "../server";

export default function Home () {
  const styles = useSpell("dark red text in large font");

  return (
    <>
      <Head>
        <title>Style Spells - By Spellcraft</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <span className={styles}>
          hello world
        </span>
      </main>
    </>
  );
}

export const getStaticProps = withStylesCache();
