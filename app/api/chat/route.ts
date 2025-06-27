import { auth } from "@/auth";
import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const SuperPrompt = `You are a highly capable, professional, and friendly AI assistant that responds accurately and helpfully. Always:

- Format code in proper markdown triple-backtick blocks with correct language tags.
- Format tables using markdown so they render correctly.
- Respond with concise, informative answers.
- Use bullet points and headings to break down complex explanations.
- For technical or programming queries, provide full working code samples.
- Never assume context not provided—always ask clarifying questions if uncertain.

You are being used inside a custom developer chat app, so your responses must render well in markdown-supported chat UIs.
Here's your question: 
`

export async function POST(req: NextRequest) {

  try {
    const { prompt } = await req.json()
    console.log("Received prompt:", prompt);

    const stream = new ReadableStream({
      async start(controller) {

        console.log(ai.models.list());

        try {
          const result = await ai.models.generateContentStream({
            model: 'gemini-2.5-flash',
            contents: SuperPrompt + prompt,
          })

          for await (const chunk of result) {
            const text = chunk.text;
            console.log("Streamed chunk:", text);
            controller.enqueue((text))
          }

          controller.close()
        } catch (err) {
          console.error("Stream error:", err)
          controller.enqueue(new TextEncoder().encode("An error occurred."))
          controller.close()
        }
      }
    });

    return new Response(
      stream,
      {
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "Cache-Control": "no-cache",
          "Transfer-Encoding": "chunked",
        },
      }
    )
  } catch (error) {
    console.error("Chat API Error:", error)
    return NextResponse.json(
      { error: "An error occurred while processing your request." },
      { status: 500 }
    );
  }
}

export async function GET() {

  const session = await auth()

  if (!session) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const userFromDb = await prisma.user.findUnique({
    where: {
      email: session?.user?.email as string
    }
  })

  const chatsData = await prisma.chat.findMany({
    where: {
      userId: userFromDb?.id
    }, orderBy: {
      createdAt: 'desc'
    }
  })

  return NextResponse.json(chatsData);
}