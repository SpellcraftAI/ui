import { useContext, useEffect, useState } from "react";
import { tw } from "twind";
// eslint-disable-next-line sort-imports
import SpellCacheContext from "./SpellCacheContext";

export const useSpell = (english: string) => {
  const [classNames, setClassNames] = useState("");
  // const english = strings.join(" ");
  const cache = useContext(SpellCacheContext).spellCache;

  useEffect(() => {
    void (async () => {
      if (cache[english] !== undefined) {
        setClassNames(cache[english]);
      } else {
        const response = await fetch(
          "/api/spellcraft",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ english })
          }
        );

        const { classNames } = await response.json();
        setClassNames(classNames);
      }
    })();
  }, [english, cache]);

  return tw`${classNames}`;
};
