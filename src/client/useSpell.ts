/**
 * @fileoverview SHOULD NOT USE USEEFFECT() OR USESTATE()
 *
 * Fetch requests should be made within getInitialProps() or
 * getServerSideProps() and passed to the page as props, not on the client.
 */
import { useContext, useEffect, useState } from "react";
import { StylesCacheContext } from "../cache/context";
import { tw } from "twind";

export const useSpell = (english: string) => {
  const { stylesCache } = useContext(StylesCacheContext);
  const [props, setProps] = useState(stylesCache?.[english]);

  /**
   * Developer experience - generate new spell on the fly.
   */
  useEffect(
    () => {
      if (process.env.NODE_ENV !== "development") {
        return;
      }

      void (async () => {
        if (stylesCache?.[english] === undefined) {
          console.log("[DEV] Generating new spell...");
          console.log(english);

          const response = await fetch(
            "/api/spellcraft",
            {
              method: "POST",
              body: JSON.stringify({ english })
            }
          );

          const freshProps = await response.json();
          console.log("[DEV] Generated props:", freshProps);

          setProps(freshProps);
        }
      })();
    },
    [english, stylesCache]
  );

  if (props === undefined) {
    return {};
  }

  const { className = "" } = props ?? {};
  console.log({ className });

  const finalProps = {
    ...props,
    className: tw`${className}`
  };

  console.log({ finalProps });
  return finalProps;
};
