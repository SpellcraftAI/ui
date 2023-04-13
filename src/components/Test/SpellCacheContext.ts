import { createContext } from "react";

export interface SpellCacheArgs {
  spellCache: Record<string, string>
}

export default createContext<SpellCacheArgs>({
  spellCache: {}
});
