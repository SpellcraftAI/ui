/**
 * @fileoverview SHOULD NOT USE USEEFFECT() OR USESTATE()
 *
 * Fetch requests should be made within getInitialProps() or
 * getServerSideProps() and passed to the page as props, not on the client.
 */
import { useContext } from "react";
import { SpellCacheContext } from "./context";

export const useSpell = (english: string): string => {
  // const [classNames, setClassNames] = useState("");
  // const english = strings.join(" ");
  const { spellCache } = useContext(SpellCacheContext);
  console.log({ english, spellCache });

  // useEffect(() => {
  //   void (async () => {
  //     if (cache[english] !== undefined) {
  //       setClassNames(cache[english]);
  //     } else {
  //       const response = await fetch(
  //         "/api/spellcraft",
  //         {
  //           method: "POST",
  //           headers: {
  //             "Content-Type": "application/json"
  //           },
  //           body: JSON.stringify({ english })
  //         }
  //       );

  //       const { classNames } = await response.json();
  //       setClassNames(classNames);
  //     }
  //   })();
  // }, [english, cache]);

  // return tw`${classNames}`;
  return "test-class-name";
};
