// Contact form endpoint. Sends the enquiry through Resend's REST API.
// Env (set in Vercel > Project > Settings > Environment Variables):
//   RESEND_API_KEY      required, from resend.com (domain sastech.com.ng is verified there)
//   CONTACT_TO_EMAIL    optional, defaults to hello@sastech.com.ng
//   CONTACT_FROM_EMAIL  optional, defaults to "Sastech Website <noreply@sastech.com.ng>"

const LIMITS = { name: 120, email: 200, company: 160, phone: 40, message: 4000 } as const;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type Body = {
  name?: unknown;
  email?: unknown;
  company?: unknown;
  phone?: unknown;
  message?: unknown;
  website?: unknown; // honeypot: real people never fill this
  startedAt?: unknown; // ms timestamp when the form was rendered
};

function clean(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(request: Request) {
  let body: Body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Quietly accept bots so they don't retry: honeypot filled, or submitted too fast.
  const startedAt = typeof body.startedAt === "number" ? body.startedAt : 0;
  if (clean(body.website, 200) || Date.now() - startedAt < 2500) {
    return Response.json({ ok: true });
  }

  const name = clean(body.name, LIMITS.name);
  const email = clean(body.email, LIMITS.email);
  const company = clean(body.company, LIMITS.company);
  const phone = clean(body.phone, LIMITS.phone);
  const message = clean(body.message, LIMITS.message);

  const errors: Record<string, string> = {};
  if (name.length < 2) errors.name = "Please tell us your name.";
  if (!EMAIL_RE.test(email)) errors.email = "Please enter a valid email address.";
  if (message.length < 10) errors.message = "Please tell us a little more (at least 10 characters).";
  if (Object.keys(errors).length) {
    return Response.json({ ok: false, errors }, { status: 422 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[contact] RESEND_API_KEY is not set");
    return Response.json(
      { ok: false, error: "Our form is not connected yet. Please email hello@sastech.com.ng or use WhatsApp." },
      { status: 503 },
    );
  }

  const to = process.env.CONTACT_TO_EMAIL || "hello@sastech.com.ng";
  const from = process.env.CONTACT_FROM_EMAIL || "Sastech Website <noreply@sastech.com.ng>";
  const text = [
    `New enquiry from sastech.com.ng`,
    ``,
    `Name: ${name}`,
    `Email: ${email}`,
    `Business: ${company || "-"}`,
    `Phone / WhatsApp: ${phone || "-"}`,
    ``,
    message,
  ].join("\n");

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `Website enquiry: ${name}${company ? ` (${company})` : ""}`,
        text,
      }),
    });
    if (!res.ok) {
      console.error("[contact] Resend error", res.status, await res.text());
      throw new Error("send failed");
    }
  } catch {
    return Response.json(
      { ok: false, error: "We couldn't send that just now. Please try again, or email hello@sastech.com.ng." },
      { status: 502 },
    );
  }

  return Response.json({ ok: true });
}
