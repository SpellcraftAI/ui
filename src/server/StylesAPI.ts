import type { NextApiRequest, NextApiResponse } from "next";
import { readCache, updateCache } from "../cache";
import { Configuration, OpenAIApi } from "openai";

export const runtime = "nodejs";

export async function StylesAPI (
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { env } = await import("process");
  if (env.NODE_ENV !== "development") {
    throw new Error("This API only available in development.");
  }

  console.log({ body: JSON.stringify(req.body) });

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

const OPENAI = new OpenAIApi(
  new Configuration({
    apiKey: process.env.OPENAI_API_KEY
  })
);

const getTailwindClasses = async (english: string) => {
  const gptRes = await OPENAI.createCompletion({
    model: "text-davinci-003",
    prompt: `You are a Tailwind CSS classnames generator. The user will input English and you will output Tailwind CSS class names. For example, if the user inputs "I want a red button", you will output "bg-red-300". Do not use any newlines, just return the classnames immediately.\n\n
    Input: ${english}\n
    Output:`,
    stop: ["\n"]
  });

  if (gptRes.status !== 200) return null;
  return gptRes.data.choices[0].text?.trim();
};
