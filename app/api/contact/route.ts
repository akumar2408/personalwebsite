import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();
    const from = process.env.CONTACT_FROM || "portfolio@aayushkumar.dev";
    const to = process.env.CONTACT_TO || "aayushkumar2004@gmail.com";
    const resendKey = process.env.RESEND_API_KEY;
    const formspree = process.env.NEXT_PUBLIC_FORM_ENDPOINT;

    if (resendKey) {
      const resend = new Resend(resendKey);
      const subject = `Portfolio Contact: ${name || "No name"}`;
      const html = `<div style="font-family: sans-serif">
        <h2>New message from portfolio</h2>
        <p><strong>Name:</strong> ${name || "(n/a)"}<br/>
        <strong>Email:</strong> ${email || "(n/a)"}<br/></p>
        <p>${(message || "").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\n/g, "<br/>")}</p>
      </div>`;
      const { data, error } = await resend.emails.send({ from, to, subject, html });
      if (error) return NextResponse.json({ ok: false, provider: "resend", error: String(error) }, { status: 500 });
      return NextResponse.json({ ok: true, provider: "resend", id: data?.id });
    }

    if (formspree) {
      const r = await fetch(formspree, {
        method: "POST",
        headers: { "Accept": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      return NextResponse.json({ ok: r.ok, provider: "formspree" }, { status: r.ok ? 200 : 500 });
    }

    return NextResponse.json({ ok: false, error: "No email provider configured." }, { status: 500 });
  } catch (e:any) {
    return NextResponse.json({ ok: false, error: String(e) }, { status: 500 });
  }
}
