"use client";

import { useActionState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import { useSearchParams } from "next/navigation";
import { submitEnquiry, type Field as FieldName, type State } from "@/app/contact/actions";
import { site } from "@/data/site";

/* The enquiry form. The only client component on the site that owns state.

   It is progressive by construction: a plain <form action={...}> posts to the
   Server Action with JavaScript off, and useActionState only adds the pending
   label and the in-place error rendering on top.

   Field errors are rendered next to their field AND collected into a summary
   at the top, which takes focus after a failed submit - a screen-reader user
   who submits and hears nothing has no idea what happened. */

const INITIAL: State = { status: "idle" };

/* border-ink/50 is a measured floor, not taste: WCAG 1.4.11 wants 3:1 between a
   control's boundary and its ground, and ink/50 on linen is 3.14:1 where the
   old ink/20 was 1.5:1. py-3.5 puts the control at 48px, over the 44px target. */
const CONTROL =
  "mt-3 w-full border border-ink/50 bg-transparent px-4 py-3.5 text-ink placeholder:text-ink/45 " +
  "transition-colors duration-300 hover:border-ink/70 focus:border-moss aria-[invalid=true]:border-moss";

const LABEL_TEXT: Record<FieldName, string> = {
  name: "Your name",
  email: "Email",
  phone: "Phone",
  instagram: "Instagram",
  message: "Your message",
};

function Field({
  name,
  error,
  hint,
  defaultValue,
  type = "text",
  rows,
  required = false,
  autoComplete,
  inputMode,
  maxLength,
}: {
  name: FieldName;
  error?: string;
  hint?: string;
  defaultValue?: string;
  type?: string;
  rows?: number;
  required?: boolean;
  autoComplete?: string;
  inputMode?: "text" | "email" | "tel";
  maxLength?: number;
}) {
  const describedBy = [error ? `${name}-error` : null, hint ? `${name}-hint` : null]
    .filter(Boolean)
    .join(" ");

  const shared = {
    id: name,
    name,
    required,
    maxLength,
    defaultValue,
    autoComplete,
    inputMode,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": describedBy || undefined,
    className: CONTROL,
  };

  return (
    <div>
      <label htmlFor={name} className="label block text-[0.72rem] text-moss">
        {LABEL_TEXT[name]}
        {required ? null : <span className="ml-2 normal-case tracking-normal text-ink/70">optional</span>}
      </label>

      {rows ? <textarea {...shared} rows={rows} /> : <input {...shared} type={type} />}

      {hint ? (
        <p id={`${name}-hint`} className="mt-2 text-[0.85rem] leading-relaxed text-ink/70">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={`${name}-error`} className="mt-2 text-[0.85rem] font-bold leading-relaxed text-moss">
          {error}
        </p>
      ) : null}
    </div>
  );
}

/* useFormStatus only reads the form it is rendered inside, so the button has
   to be its own component. */
function Submit() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="label inline-flex items-center justify-center rounded-full bg-moss px-8 py-[0.95rem] text-[0.72rem] text-linen transition-colors duration-300 hover:bg-moss-deep disabled:opacity-60"
    >
      {pending ? "Sending…" : "Send enquiry"}
    </button>
  );
}

export default function ContactForm() {
  const [state, formAction] = useActionState(submitEnquiry, INITIAL);
  const summaryRef = useRef<HTMLDivElement>(null);

  /* The state object is new on every submit, so this fires per attempt rather
     than only on the first failure. */
  useEffect(() => {
    if (state.status === "invalid") summaryRef.current?.focus();
  }, [state]);

  /* Workshops (and anything else) can link here as /contact?about=corporate-yoga
     and the message starts with a line naming what the enquiry is about.
     Whitelisted to slug characters: it is URL input and it goes into a value
     that comes back to us. */
  const about = (useSearchParams().get("about") ?? "")
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "")
    .slice(0, 60);

  const values = state.values ?? {};
  const errors = state.errors ?? {};

  const prefill = about ? `I would like to know more about ${about.replace(/-/g, " ")}.\n\n` : "";

  if (state.status === "sent") {
    return (
      <div className="border border-ink/20 p-8 md:p-10" data-reveal>
        <p className="eyebrow">Thank you</p>
        <h2 className="mt-5 font-display text-[2rem] font-light leading-tight text-moss md:text-[2.4rem]">
          Your message is on its way
        </h2>
        <div className="mt-6 max-w-[52ch] space-y-4 leading-relaxed text-ink/80">
          <p>
            Rajalakshmi reads every enquiry herself, so a reply usually takes a couple of days
            rather than a couple of minutes. It will come from{" "}
            <a className="underline underline-offset-4" href={site.emailHref}>
              {site.email}
            </a>
            , so it is worth checking a spam folder if nothing arrives.
          </p>
          <p>
            If it is time-sensitive,{" "}
            <a
              className="underline underline-offset-4"
              href={site.whatsapp}
              target="_blank"
              rel="noreferrer noopener"
            >
              WhatsApp
            </a>{" "}
            reaches her faster than email does.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* The send failed or was never configured. Never a fake success: the
          enquirer is handed the routes that do work, with what they typed
          already in the mailto: so they are not asked to write it twice. */}
      {state.status === "unconfigured" || state.status === "error" ? (
        <div className="mb-10 border border-moss/40 bg-sand/50 p-6 md:p-8" role="alert">
          <p className="label text-[0.72rem] text-moss">Message not sent</p>
          <p className="mt-4 max-w-[52ch] leading-relaxed text-ink/80">
            The form could not deliver your message just now. Nothing was lost from this page, and
            any of these reaches her directly.
          </p>
          <ul className="mt-5 space-y-2 leading-relaxed text-ink/80">
            <li>
              <a
                className="underline underline-offset-4"
                href={`${site.emailHref}?subject=${encodeURIComponent(
                  `Website enquiry from ${values.name ?? ""}`.trim(),
                )}&body=${encodeURIComponent(values.message ?? "")}`}
              >
                Email {site.email}
              </a>
            </li>
            <li>
              <a
                className="underline underline-offset-4"
                href={site.whatsapp}
                target="_blank"
                rel="noreferrer noopener"
              >
                Message on WhatsApp
              </a>
            </li>
            <li>
              <a className="underline underline-offset-4" href={site.phoneHref}>
                Call {site.phone}
              </a>
            </li>
          </ul>
        </div>
      ) : null}

      <form action={formAction} className="space-y-8">
        {state.status === "invalid" ? (
          <div
            ref={summaryRef}
            tabIndex={-1}
            role="alert"
            className="border border-moss/40 bg-sand/50 p-6"
          >
            <p className="label text-[0.72rem] text-moss">Please check these fields</p>
            <ul className="mt-4 space-y-2 leading-relaxed text-ink/80">
              {(Object.keys(errors) as FieldName[]).map((k) => (
                <li key={k}>
                  <a className="underline underline-offset-4" href={`#${k}`}>
                    {LABEL_TEXT[k]}
                  </a>
                  : {errors[k]}
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {/* Honeypot. Off-screen rather than display:none - some bots skip
            hidden fields, and no assistive technology is sent here either
            (aria-hidden + tabIndex -1). */}
        <div aria-hidden className="absolute left-[-9999px] h-px w-px overflow-hidden">
          <label htmlFor="company">Company</label>
          <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        <div className="grid gap-8 sm:grid-cols-2">
          <Field name="name" required autoComplete="name" maxLength={80} error={errors.name} defaultValue={values.name} />
          <Field
            name="email"
            type="email"
            required
            autoComplete="email"
            inputMode="email"
            maxLength={160}
            error={errors.email}
            defaultValue={values.email}
          />
          <Field
            name="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            maxLength={32}
            error={errors.phone}
            defaultValue={values.phone}
          />
          <Field
            name="instagram"
            autoComplete="off"
            maxLength={60}
            hint="Handle or profile link. Either is fine."
            error={errors.instagram}
            defaultValue={values.instagram}
          />
        </div>

        <Field
          name="message"
          rows={7}
          required
          maxLength={2000}
          hint="What you are looking for, and whether you would prefer to practise online or in person."
          error={errors.message}
          defaultValue={values.message ?? prefill}
        />

        <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
          <Submit />
          <p className="max-w-[34ch] text-[0.85rem] leading-relaxed text-ink/70">
            Your details are used to answer your enquiry and nothing else.
          </p>
        </div>
      </form>
    </div>
  );
}
