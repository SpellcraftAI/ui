import { createContext } from "react";

export interface SpellCacheArgs {
  spellCache: Record<string, string>
}

export const SpellCacheContext = createContext<SpellCacheArgs>({
  spellCache: {}
});
