import { existsSync, readFileSync, writeFileSync } from "fs";
import type { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";
import { resolve } from "path";

const openai: OpenAIApi = new OpenAIApi(
  new Configuration({
    apiKey: process.env.OPENAI_API_KEY
  })
);

export const english2TailwindClassNames = async (english: string) => {
  const gptRes = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `You are a Tailwind CSS classnames generator. The user will input English and you will output Tailwind CSS class names. For example, if the user inputs "I want a red button", you will output "bg-red-300". Do not use any newlines, just return the classnames immediately.\n\n
    Input: ${english}\n
    Output:`,
    stop: ["\n"]
  });

  if (gptRes.status !== 200) return null;
  return gptRes.data.choices[0].text;
};

export const config = {
  runtime: "nodejs"
};

export default async function handler (
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { english } = req.body;

  const cachePath = resolve("public", "spellcraft.json");
  const cacheExists = existsSync(cachePath);
  if (!cacheExists) {
    writeFileSync(cachePath, "{}");
  }

  const cacheFile = readFileSync(cachePath, "utf8");
  const spellCache: Record<string, string> = JSON.parse(cacheFile);

  if (english === undefined) {
    res.status(400).json({ error: "No English Specified" });
    return;
  }

  const cached = spellCache[english];
  if (cached !== undefined) {
    res.status(200).json({ classNames: cached });
    return;
  }

  const newClassNames = await english2TailwindClassNames(english);
  if (newClassNames == null) {
    res.status(500).json({ error: "OpenAI API Error" });
    return;
  }

  spellCache[english] = newClassNames;

  writeFileSync(
    cachePath,
    JSON.stringify(spellCache)
  );

  res.status(200).json({
    classNames: newClassNames
  });
}
