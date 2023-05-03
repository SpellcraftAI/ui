import type { NextPage } from "next";
import { SpellCacheContext } from "../lib/context";

export const withSpellStyles = (Page: NextPage): NextPage => {
  const UserPage = ({ spellCache, ...props }: any) => (
    <SpellCacheContext.Provider value={{ spellCache }}>
      <Page {...props} />
    </SpellCacheContext.Provider>
  );

  return UserPage;
};
