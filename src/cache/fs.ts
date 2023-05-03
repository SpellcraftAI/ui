import { existsSync, readFileSync, writeFileSync } from "fs";
import { resolve } from "path";

export const CACHE_PATH = resolve("spellcraft.json"); ;

export const readCache = () => {
  const cacheExists = existsSync(CACHE_PATH);
  if (!cacheExists) {
    writeFileSync(CACHE_PATH, "{}");
  }

  const cacheFile = readFileSync(CACHE_PATH, "utf8");
  if (cacheFile === "") {
    return {};
  } else {
    return JSON.parse(cacheFile);
  }
};

export const updateCache = (update: Record<string, string>) => {
  const cache = readCache();
  const newCache = { ...cache, ...update };

  writeFileSync(
    CACHE_PATH,
    JSON.stringify(newCache, null, 2)
  );
};
