import { Configuration, OpenAIApi } from "openai";

const OPENAI = new OpenAIApi(
  new Configuration({
    apiKey: process.env.OPENAI_API_KEY
  })
);

export const getTailwindClasses = async (english: string) => {
  const gptRes = await OPENAI.createCompletion({
    model: "text-davinci-003",
    prompt: `You are a Tailwind CSS classnames generator. The user will input English and you will output Tailwind CSS class names. For example, if the user inputs "I want a red button", you will output "bg-red-300". Do not use any newlines, just return the classnames immediately.\n\n
    Input: ${english}\n
    Output:`,
    stop: ["\n"]
  });

  if (gptRes.status !== 200) return null;
  return gptRes.data.choices[0].text;
};
