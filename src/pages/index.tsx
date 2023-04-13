import Head from "next/head";
import { useSpell } from "../lib/useSpell";

export default function Home () {
  const spellResult = useSpell("green text in large font");
  console.log({ spellResult });

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <span>
          {/* <span className={useSpell("green text in large font")}> */}
          hello world
        </span>
      </main>
    </>
  );
}
