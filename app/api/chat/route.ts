import { NextResponse } from "next/server";
import { OpenAI } from "openai";

import { getFunctions, getSystemPrompt } from "@/utils/prompts";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const headers = new Headers();
  headers.set("Access-Control-Allow-Origin", "*");
  headers.set("Access-Control-Allow-Methods", "POST");
  headers.set("Content-Type", "application/json");

  try {
    const payload = await req.json();
    const userMessage = payload || "";

    const systemMessage = getSystemPrompt();
    const functions = getFunctions();
    const messages = [systemMessage, userMessage];

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini", // Updated model name
      messages: messages,
      functions: functions,
      max_tokens: 250,
      top_p: 0,
      temperature: 1,
    });

    const resultContent = response.choices[0].message.function_call?.arguments;

    return NextResponse.json({ result: resultContent });
  } catch (error: any) {
    console.error("OpenAI API error:", error);

    if (error.response) {
      return NextResponse.json(
        {
          error: "OpenAI API error",
          status: error.response.status,
          data: error.response.data,
        },
        { status: error.response.status },
      );
    } else {
      return NextResponse.json(
        { error: error.message || "Internal server error" },
        { status: 500 },
      );
    }
  }
}

export { POST as GET, POST as PUT, POST as DELETE };
