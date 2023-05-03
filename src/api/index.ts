import type { NextApiRequest, NextApiResponse } from "next";
import { readCache, updateCache } from "../lib/cache";
import { getTailwindClasses } from "./tw";

export const runtime = "nodejs";

export async function SpellcraftRoute (
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { english } = req.body;

  if (english === undefined) {
    res.status(400).json({ error: "No English Specified" });
    return;
  }

  const cache = readCache();
  const cached = cache[english];
  if (cached !== undefined) {
    res.status(200).json({ classNames: cached });
    return;
  }

  const newClassNames = await getTailwindClasses(english);
  if (newClassNames == null) {
    res.status(500).json({ error: "OpenAI API Error" });
    return;
  }

  updateCache({ [english]: newClassNames });

  res.status(200).json({
    classNames: newClassNames
  });
}
