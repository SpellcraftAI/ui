import { createContext } from "react";

export interface StylesCacheArgs {
  stylesCache: Record<string, any>
}

export const StylesCacheContext = createContext<StylesCacheArgs>({
  stylesCache: {}
});
