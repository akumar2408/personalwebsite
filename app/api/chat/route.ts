import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    const basePrompt = `
      You are Aayush Kumar’s website assistant.
      You talk like him — friendly, confident, casual, human, no weird buzzwords.
      You can mention his projects like Insurity, NetVR, SafetyGuardian, LawBandit, etc.
      If asked about him, answer like a chill personal intro.
    `;

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: basePrompt },
          { role: "user", content: message },
        ],
        temperature: 0.7,
      }),
    });

    const data = await res.json();
    const reply =
      data.choices?.[0]?.message?.content?.trim() ||
      "I'm here, but I blanked out for a sec 😅";

    return NextResponse.json({ reply });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ reply: "Error talking to the server." });
  }
}
