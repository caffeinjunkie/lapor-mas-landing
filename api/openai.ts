import { OpenAI } from "openai";
import { getSystemPrompt, getFunctions } from "@/utils/prompts";

const client = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export default async function openai(payload: any) {
  const userMessage = payload || "";

  try {
    const systemMessage = getSystemPrompt();
    const functions = getFunctions();
    const messages = [systemMessage, userMessage];

    const response = await client.chat.completions.create({
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
