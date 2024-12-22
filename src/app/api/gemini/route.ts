import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json(
        { message: "A valid 'prompt' is required" },
        { status: 400 }
      );
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);

    if (
      !result ||
      !result.response ||
      typeof result.response.text !== "function"
    ) {
      throw new Error("Unexpected response format from Gemini API");
    }

    return NextResponse.json({ text: result.response.text() }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error generating content:", error);
      return NextResponse.json(
        { message: error.message || "Internal Server Error" },
        { status: 500 }
      );
    }
  }
}
