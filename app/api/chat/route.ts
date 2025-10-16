import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    // Basic personality / context
    const basePrompt = `
      You are Aayush Kumar’s personal website assistant.
      Talk like him — casual, confident, chill, and human.
      You can mention his projects like Insurity, NetVR, SafetyGuardian, LawBandit, and his ASU background.
      Keep it short, witty, and natural — no over-the-top AI tone.
    `;

    // --- choose your OpenAI model here ---
    const model = "gpt-4-turbo"; 
    

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: "system", content: basePrompt },
          { role: "user", content: message },
        ],
        temperature: 0.8, // slightly more expressive
      }),
    });

    if (!res.ok) {
      const errorData = await res.text();
      console.error("OpenAI API error:", errorData);
      return NextResponse.json(
        { reply: "Something went wrong talking to OpenAI 😅" },
        { status: res.status }
      );
    }

    const data = await res.json();
    const reply =
      data.choices?.[0]?.message?.content?.trim() ||
      "I'm here, but I blanked out for a sec 😅";

    return NextResponse.json({ reply });
  } catch (err) {
    console.error("Server error:", err);
    return NextResponse.json(
      { reply: "Internal server error — try again in a bit 🛠️" },
      { status: 500 }
    );
  }
}
