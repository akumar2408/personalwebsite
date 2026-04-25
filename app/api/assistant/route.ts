import { NextResponse } from "next/server";
import aayush from "@/data/aayush.json";

export async function POST(req: Request) {
  const { message } = await req.json();

  // GitHub fetch
  const ghRes = await fetch("https://api.github.com/users/akumar2408/events/public", {
    headers: { "User-Agent": "aayush-site" },
  });
  const ghData = await ghRes.json();
  const recentCommit = ghData.find((e: any) => e.type === "PushEvent")
    ?.payload?.commits?.[0]?.message;

  // Simple local rules
  const lower = message.toLowerCase();
  let reply = "";

  if (lower.includes("hi") || lower.includes("hello")) reply = "Hey, I’m Aayush’s site. Ask me about his work, projects, or stack.";
  else if (lower.includes("working") || lower.includes("now"))
    reply = aayush.now[Math.floor(Math.random() * aayush.now.length)];
  else if (lower.includes("project"))
    reply = aayush.projects.map((p) => `${p.name}: ${p.desc}`).join(" • ");
  else if (lower.includes("commit"))
    reply = recentCommit
      ? `Last commit says: “${recentCommit}” — likely more polish or debugging.`
      : "No fresh public commits lately, but he is probably still building or debugging something.";
  else if (lower.includes("fun"))
    reply = aayush.fun[Math.floor(Math.random() * aayush.fun.length)];
  else reply = "Ask me about Aayush’s Insurity work, Richish, AI/data projects, or technical stack.";

  // Tone polish via GPT-4-mini
  try {
    const aiTone = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "You are Aayush's personal AI assistant. Speak in a natural, confident, concise tone. Keep the positioning technical: software engineering, AI, data, product quality, and real production experience. Avoid fake hype.",
          },
          { role: "user", content: reply },
        ],
      }),
    });

    const aiData = await aiTone.json();
    reply = aiData.choices?.[0]?.message?.content?.trim() || reply;
  } catch {
    // fallback if API fails
  }

  return NextResponse.json({ reply });
}
