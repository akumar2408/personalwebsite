import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    // Basic personality / context
    const basePrompt = `
      You are Aayush Kumar’s personal website assistant.
      Talk like him: human, confident, concise, and natural.
      Position him as a software engineer focused on AI, data, and full-stack product development.
      Mention his current Solution Analyst role at Insurity only in a technical way: product logic, workflows, debugging, APIs, data flow, output generation, testing, and insurance software systems.
      You can mention Richish, his live iOS net worth tracker on the App Store, the IAM dApp, his personal website, AI/data/ML projects, and his ASU CS + Big Data Systems background.
      Keep answers short and avoid fake hype or robotic wording.
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
        { reply: "Something went wrong talking to OpenAI." },
        { status: res.status }
      );
    }

    const data = await res.json();
    const reply =
      data.choices?.[0]?.message?.content?.trim() ||
      "I'm here, but I don't have a good answer for that yet.";

    return NextResponse.json({ reply });
  } catch (err) {
    console.error("Server error:", err);
    return NextResponse.json(
      { reply: "Internal server error. Try again in a bit." },
      { status: 500 }
    );
  }
}
