/**
 * @fileoverview SHOULD NOT USE USEEFFECT() OR USESTATE()
 *
 * Fetch requests should be made within getInitialProps() or
 * getServerSideProps() and passed to the page as props, not on the client.
 */
import { useContext, useEffect } from "react";
import { SpellCacheContext } from "./context";
import { tw } from "twind";

export const useSpell = (english: string): string => {
  const { spellCache } = useContext(SpellCacheContext);
  console.log({ english, spellCache });

  /**
   * Developer experience - generate new spell on the fly.
   */
  useEffect(
    () => {
      if (process?.env?.NODE_ENV !== "development") {
        return;
      }

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
          console.log({ classNames });
        }
      })();
    },
    [english, spellCache]
  );

  const classNames = spellCache?.[english];
  if (classNames === undefined) {
    return "";
  }

  console.log({ classNames });
  return tw`${classNames}`;
};
