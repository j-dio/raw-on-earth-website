"use server";

import { site } from "@/data/site";

/* The one server-side path on the site: the contact enquiry.

   ENV VARS TO SET ON HOSTINGER (none of them have a safe default that sends):

     RESEND_API_KEY   required. Without it the form refuses to pretend it sent
                      and returns "unconfigured", and the UI shows the email /
                      WhatsApp / phone fallback instead.
     CONTACT_TO       where enquiries land. Defaults to site.email.
     CONTACT_FROM     the envelope sender, e.g.
                      "Raw On Earth <noreply@rawonearth.com>". The domain has to
                      be verified in Resend first or the API rejects the send.

   No SDK: one POST to https://api.resend.com/emails with fetch does the whole
   job, and a dependency that wraps one fetch is a dependency to keep updated.

   The key is read here and never returned, logged or rendered. There is no
   console call in this file on purpose - a failed send would otherwise write
   the enquirer's address into a shared host's log. */

export type Field = "name" | "email" | "phone" | "instagram" | "message";

export type State = {
  /* "invalid" -> render field errors. "sent" -> replace the form.
     "unconfigured" / "error" -> the form stays and the fallback routes show.
     A form that silently swallows an enquiry is worse than no form, so these
     two are never dressed up as success. */
  status: "idle" | "invalid" | "sent" | "unconfigured" | "error";
  errors?: Partial<Record<Field, string>>;
  /* Echoed back so a failed submit does not empty the textarea, and so the
     fallback mailto: can be pre-filled with what they already typed. React
     escapes all of it on the way out; nothing here goes near innerHTML. */
  values?: Partial<Record<Field, string>>;
};

const text = (v: FormDataEntryValue | null) => (typeof v === "string" ? v.trim() : "");

/* Deliberately permissive. The only shape check worth making on an address is
   that it could plausibly be one - anything stricter rejects real addresses,
   and the real proof is that she can reply to it. */
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE = /^[0-9+\-()\s]+$/;

export async function submitEnquiry(_prevState: State, formData: FormData): Promise<State> {
  /* Honeypot. A hidden field a person never sees and a bot fills in. Return
     the success state without sending: telling it that it failed only tells
     the author what to change. */
  if (text(formData.get("company"))) return { status: "sent" };

  const name = text(formData.get("name"));
  const email = text(formData.get("email"));
  const phone = text(formData.get("phone"));
  const message = text(formData.get("message"));

  /* People give their Instagram five ways. Normalise to a bare handle rather
     than making them guess the format. */
  const instagram = text(formData.get("instagram"))
    .replace(/^https?:\/\//i, "")
    .replace(/^www\./i, "")
    .replace(/^instagram\.com\//i, "")
    .replace(/^@/, "")
    .replace(/\/+$/, "");

  const values = { name, email, phone, instagram, message };
  const errors: Partial<Record<Field, string>> = {};

  /* Server-side validation, always. The `required` attributes on the inputs
     are a convenience for people, never a control - a POST does not have to
     come from our form. */
  if (name.length < 2 || name.length > 80) {
    errors.name = "Please give a name between 2 and 80 characters.";
  }
  if (!email || email.length > 160 || !EMAIL.test(email)) {
    errors.email = "Please give an email address she can reply to.";
  }
  if (phone && (phone.length > 32 || !PHONE.test(phone))) {
    errors.phone = "Please use digits, spaces and + - ( ) only.";
  }
  if (instagram.length > 60) {
    errors.instagram = "That handle is too long. Just the username is enough.";
  }
  if (message.length < 10 || message.length > 2000) {
    errors.message = "Please write between 10 and 2000 characters.";
  }

  if (Object.keys(errors).length > 0) return { status: "invalid", errors, values };

  const key = process.env.RESEND_API_KEY;
  if (!key) return { status: "unconfigured", values };

  const body = [
    `Name:      ${name}`,
    `Email:     ${email}`,
    `Phone:     ${phone || "-"}`,
    `Instagram: ${instagram ? `@${instagram}` : "-"}`,
    "",
    message,
    "",
    `-- sent from the enquiry form at ${site.url}/contact`,
  ].join("\n");

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM || `Raw On Earth <noreply@rawonearth.com>`,
        to: [process.env.CONTACT_TO || site.email],
        // So she can hit reply and be writing to the enquirer, not to noreply@.
        reply_to: email,
        subject: `Website enquiry from ${name}`,
        text: body,
      }),
      // ponytail: plain text only. Add an HTML part when someone asks for one.
      signal: AbortSignal.timeout(10_000),
    });

    if (!res.ok) return { status: "error", values };
  } catch {
    // Timeout, DNS, Resend down. Same answer either way: tell them honestly.
    return { status: "error", values };
  }

  return { status: "sent" };
}
