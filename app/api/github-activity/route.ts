import { NextResponse } from "next/server";

// Aggregate last 30 days of public events into date -> count.
// You can set GITHUB_TOKEN in env to raise rate limits (optional).
export async function GET(req: Request) {
  const url = new URL(req.url);
  const user = url.searchParams.get("user") || "akumar2408";

  const headers: Record<string, string> = { "User-Agent": "aayush-site" };
  if (process.env.GITHUB_TOKEN) headers.Authorization = `token ${process.env.GITHUB_TOKEN}`;

  const r = await fetch(`https://api.github.com/users/${user}/events/public`, { headers });
  if (!r.ok) {
    return NextResponse.json({ ok: false, reason: "github_error" }, { status: 500 });
  }
  const events: any[] = await r.json();

  const today = new Date();
  const start = new Date();
  start.setDate(today.getDate() - 29);

  const days: Record<string, number> = {};
  for (let d = new Date(start); d <= today; d.setDate(d.getDate() + 1)) {
    const key = d.toISOString().slice(0, 10);
    days[key] = 0;
  }

  for (const e of events) {
    const key = (e.created_at as string).slice(0, 10);
    if (key in days) days[key] += 1;
  }

  return NextResponse.json({ ok: true, days });
}
