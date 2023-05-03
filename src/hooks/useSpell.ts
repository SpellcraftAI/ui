/**
 * @fileoverview SHOULD NOT USE USEEFFECT() OR USESTATE()
 *
 * Fetch requests should be made within getInitialProps() or
 * getServerSideProps() and passed to the page as props, not on the client.
 */
import { useContext, useEffect, useState } from "react";
import { SpellCacheContext } from "../lib/context";
import { tw } from "twind";

export const useSpell = (english: string): string => {
  const { spellCache } = useContext(SpellCacheContext);
  const [classNames, setClassName] = useState(spellCache?.[english]);
  console.log({ english, spellCache });

  /**
   * Developer experience - generate new spell on the fly.
   */
  useEffect(
    () => {
      if (process?.env?.NODE_ENV !== "development") {
        return;
      }

      console.log("DEV MODE: Generating new spell...");
      console.log({ english });

      void (async () => {
        if (spellCache?.[english] === undefined) {
          const response = await fetch(
            "/api/spellcraft",
            {
              method: "POST",
              body: new URLSearchParams({ english })
            }
          );

          const { classNames } = await response.json();
          console.log("API", { classNames });

          setClassName(classNames);
        }
      })();
    },
    [english, spellCache]
  );

  if (classNames === undefined) {
    return "";
  }

  return tw`${classNames}`;
};
