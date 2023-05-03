import Head from "next/head";
import { useSpell } from "../client";
import { withStylesCache } from "../server";

export default function Home () {
  const props = useSpell(
    "dark green text in large font, shows alert dialog that says 'hello' on click"
  );

  return (
    <>
      <Head>
        <title>UI Spells - By Spellcraft</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <span {...props}>
          hello world
        </span>
      </main>
    </>
  );
}

export const getStaticProps = withStylesCache();
