import { OpenAI } from "openai";

import { getFunctions, getSystemPrompt } from "@/utils/prompts";

export const getOpenAIServerClient = () => {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY is not set");
  }
  
  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  });
};

export default async function openai(payload: any) {
  const userMessage = payload || "";

  try {
    const systemMessage = getSystemPrompt();
    const functions = getFunctions();
    const messages = [systemMessage, userMessage];

    const response = await getOpenAIServerClient().chat.completions.create({
      model: "gpt-4o-mini",
      messages: messages,
      functions: functions,
      max_tokens: 250,
      top_p: 0,
      temperature: 1,
    });

    const resultContent = response.choices[0].message.function_call?.arguments;

    return resultContent;
  } catch (error) {
    if (error as any) {
      console.error(
        (error as any).response.status,
        (error as any).response.data,
      );
    } else {
      console.error(`Error with OpenAI API request: ${(error as any).message}`);
    }
    throw error;
  }
}
