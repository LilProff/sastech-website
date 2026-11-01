"use client";

import { useRef, useState } from "react";
import { CheckCircle, PaperPlaneTilt, WarningCircle } from "@phosphor-icons/react";
import { cn } from "./ui";

type Status = "idle" | "sending" | "sent" | "error";
type Errors = Partial<Record<"name" | "email" | "message", string>>;

const inputClass =
  "w-full rounded-[var(--radius-input)] border border-line-strong bg-navy-950/60 px-4 py-3 text-ink placeholder:text-faint transition-colors focus:border-cyan focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan aria-[invalid=true]:border-red-400";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [message, setMessage] = useState("");
  const startedAt = useRef(Date.now());

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;

    const next: Errors = {};
    if ((data.name ?? "").trim().length < 2) next.name = "Please tell us your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test((data.email ?? "").trim())) next.email = "Please enter a valid email address.";
    if ((data.message ?? "").trim().length < 10) next.message = "Please tell us a little more (at least 10 characters).";
    setErrors(next);
    if (Object.keys(next).length) {
      form.querySelector<HTMLElement>("[aria-invalid=true]")?.focus();
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, startedAt: startedAt.current }),
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok && json.ok) {
        setStatus("sent");
        form.reset();
        return;
      }
      if (json.errors) setErrors(json.errors);
      setMessage(json.error ?? "Something went wrong. Please try again.");
      setStatus("error");
    } catch {
      setMessage("You seem to be offline. Please try again, or message us on WhatsApp.");
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div role="status" className="card flex flex-col items-start gap-4 p-8">
        <CheckCircle size={40} weight="duotone" className="text-success" aria-hidden />
        <h3 className="text-2xl">Thanks, we&apos;ve got it.</h3>
        <p className="text-ink-2">
          We reply to every enquiry, usually within one working day. If it&apos;s urgent, WhatsApp is fastest.
        </p>
        <button type="button" onClick={() => setStatus("idle")} className="font-display text-sm font-semibold text-cyan">
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={onSubmit} className="card grid gap-5 p-6 sm:p-8" aria-describedby="form-note">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Your name" name="name" error={errors.name} required autoComplete="name" />
        <Field label="Email" name="email" type="email" error={errors.email} required autoComplete="email" />
        <Field label="Business name" name="company" autoComplete="organization" optional />
        <Field label="Phone or WhatsApp" name="phone" type="tel" autoComplete="tel" optional />
      </div>
      <div className="grid gap-2">
        <label htmlFor="message" className="text-sm font-medium text-ink">
          What would you like help with?
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? "message-error" : "message-hint"}
          className={cn(inputClass, "resize-y")}
          placeholder="For example: we sell phones across two branches and lose track of stock and orders."
        />
        {errors.message ? (
          <p id="message-error" className="flex items-center gap-1.5 text-sm text-red-300">
            <WarningCircle size={16} aria-hidden /> {errors.message}
          </p>
        ) : (
          <p id="message-hint" className="text-sm text-muted">
            A few lines is plenty. Please don&apos;t include passwords or customer data.
          </p>
        )}
      </div>

      {/* Honeypot, hidden from people and screen readers. */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="website">Leave this empty</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      {status === "error" && (
        <p role="alert" className="flex items-start gap-2 rounded-[var(--radius-input)] border border-red-400/40 bg-red-400/10 px-4 py-3 text-sm text-red-200">
          <WarningCircle size={18} className="mt-px shrink-0" aria-hidden /> {message}
        </p>
      )}

      <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p id="form-note" className="max-w-sm text-sm text-muted">
          We only use your details to reply to you. See our{" "}
          <a href="/privacy" className="text-ink-2 underline underline-offset-2 hover:text-ink">
            privacy policy
          </a>
          .
        </p>
        <button type="submit" disabled={status === "sending"} className="btn btn-primary disabled:opacity-70">
          {status === "sending" ? (
            <>
              <span className="size-4 animate-spin rounded-full border-2 border-on-brand/30 border-t-on-brand" aria-hidden />
              Sending
            </>
          ) : (
            <>
              Send message
              <PaperPlaneTilt size={18} weight="bold" aria-hidden />
            </>
          )}
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  error,
  required,
  optional,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  error?: string;
  required?: boolean;
  optional?: boolean;
  autoComplete?: string;
}) {
  return (
    <div className="grid gap-2">
      <label htmlFor={name} className="text-sm font-medium text-ink">
        {label} {optional && <span className="font-normal text-muted">(optional)</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${name}-error` : undefined}
        className={inputClass}
      />
      {error && (
        <p id={`${name}-error`} className="flex items-center gap-1.5 text-sm text-red-300">
          <WarningCircle size={16} aria-hidden /> {error}
        </p>
      )}
    </div>
  );
}
