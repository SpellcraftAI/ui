import type { NextApiRequest, NextApiResponse } from "next";
import { readCache, updateCache } from "../cache";
import { Configuration, OpenAIApi } from "openai";

export const runtime = "nodejs";

export async function StylesAPI (
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (process.env.NODE_ENV !== "development") {
    throw new Error("This API only available in development.");
  }

  const { english } = JSON.parse(req.body);

  if (english === undefined) {
    res.status(400).json({ error: "No prompt specified." });
    return;
  }

  const cache = readCache();
  const cached = cache[english];
  console.log({ cached });
  if (cached !== undefined) {
    res.status(200).json(cached);
    return;
  }

  const newProps = await getPropsFromGPT(english);
  if (newProps == null) {
    res.status(500).json({ error: "OpenAI API Error" });
    return;
  }

  console.log({ newProps });
  updateCache({ [english]: newProps });
  res.status(200).json(newProps);
}

const OPENAI = new OpenAIApi(
  new Configuration({
    apiKey: process.env.OPENAI_API_KEY
  })
);

const UI_SPELL_PROMPT =
`You power UI Spells, which allow users to describe a React component and have
the props generated for them. For styles, you use Tailwind.

IMPORTANT: You respond with JSON on a single line.
`;

const getPropsFromGPT = async (english: string) => {
  const gptRes = await OPENAI.createChatCompletion({
    // model: "text-davinci-003",
    // prompt: `You are a Tailwind CSS classnames generator. The user will input English and you will output Tailwind CSS class names. For example, if the user inputs "I want a red button", you will output "bg-red-300". Do not use any newlines, just return the classnames immediately.\n\n
    // Input: ${english}\n
    // Output:`,
    // stop: ["\n"],
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: UI_SPELL_PROMPT
      },
      {
        role: "user",
        content: english
      }
    ],
    temperature: 0.1
  });

  if (gptRes.status !== 200) {
    return null;
  }

  const { message } = gptRes.data.choices[0];
  if (message === undefined) {
    return null;
  }

  return JSON.parse(message.content.trim());
};
