import { createContext } from "react";

export interface StylesCacheArgs {
  stylesCache: Record<string, string>
}

export const StylesCacheContext = createContext<StylesCacheArgs>({
  stylesCache: {}
});
