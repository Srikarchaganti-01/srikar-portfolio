import { useRef, useState } from "react";
import { site } from "../../config/site";
import { buildMailto, isFormConfigured, sendMessage } from "../../lib/contact";
import { cn } from "../../lib/cn";
import Button from "../../components/ui/Button";

const EMPTY = { name: "", email: "", subject: "", message: "" };

const FIELDS = [
  { name: "name", label: "Name", type: "text", autoComplete: "name" },
  { name: "email", label: "Email", type: "email", autoComplete: "email" },
  { name: "subject", label: "Subject", type: "text", autoComplete: "off" },
];

function validate(values) {
  const errors = {};
  if (!values.name.trim()) errors.name = "Enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) errors.email = "Enter a valid email address.";
  if (values.subject.trim().length < 3) errors.subject = "Add a short subject.";
  if (values.message.trim().length < 10) errors.message = "Write at least 10 characters.";
  return errors;
}

const fieldClass =
  "w-full border-0 border-b bg-transparent px-0 py-3 text-base outline-none transition-colors placeholder:text-ink-muted/60 focus:border-ink";

export default function ContactForm() {
  const configured = isFormConfigured();
  const formRef = useRef(null);
  const honeypot = useRef(null);
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  // "idle" | "sending" | "sent" | "error" | "mailto"
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const update = (event) => {
    const { name, value } = event.target;
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((e) => ({ ...e, [name]: undefined }));
  };

  async function onSubmit(event) {
    event.preventDefault();
    if (status === "sending") return;

    const found = validate(values);
    setErrors(found);
    const firstInvalid = Object.keys(found)[0];
    if (firstInvalid) {
      formRef.current?.querySelector(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    if (!configured) {
      // No form service configured: open the visitor's email app. Nothing is sent from here.
      window.location.href = buildMailto(values);
      setStatus("mailto");
      return;
    }

    setStatus("sending");
    const result = await sendMessage({ ...values, botcheck: honeypot.current?.checked });
    if (result.ok) {
      setValues(EMPTY);
      setStatus("sent");
    } else {
      setErrorMessage(result.error);
      setStatus("error");
    }
  }

  const sending = status === "sending";

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate aria-label="Contact form" className="space-y-7">
      {FIELDS.map((field) => {
        const error = errors[field.name];
        return (
          <div key={field.name}>
            <label htmlFor={`contact-${field.name}`} className="meta text-ink-muted">
              {field.label}
            </label>
            <input
              id={`contact-${field.name}`}
              name={field.name}
              type={field.type}
              autoComplete={field.autoComplete}
              value={values[field.name]}
              onChange={update}
              aria-invalid={Boolean(error)}
              aria-describedby={error ? `contact-${field.name}-error` : undefined}
              className={cn(fieldClass, error ? "border-signal-deep" : "border-ink/30")}
            />
            {error && (
              <p id={`contact-${field.name}-error`} className="meta mt-1 text-signal-deep">
                {error}
              </p>
            )}
          </div>
        );
      })}

      <div>
        <label htmlFor="contact-message" className="meta text-ink-muted">
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          value={values.message}
          onChange={update}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
          className={cn(fieldClass, "resize-y", errors.message ? "border-signal-deep" : "border-ink/30")}
        />
        {errors.message && (
          <p id="contact-message-error" className="meta mt-1 text-signal-deep">
            {errors.message}
          </p>
        )}
      </div>

      {/* Honeypot: real visitors never see or tick this. */}
      <input ref={honeypot} type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" className="hidden" style={{ display: "none" }} />

      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" disabled={sending} className="disabled:opacity-60">
          {sending ? "Sending…" : configured ? "Send message" : "Open in email app"}
        </Button>
        {!configured && (
          <p className="meta max-w-xs text-ink-muted">
            Direct sending isn't set up on this site, so this opens your email app with the message filled in.
          </p>
        )}
      </div>

      <div aria-live="polite">
        {status === "sent" && (
          <p role="status" className="border-l-2 border-signal pl-4">
            Message sent. Thank you, I'll reply to the address you gave.
          </p>
        )}
        {status === "mailto" && (
          <p role="status" className="border-l-2 border-signal pl-4">
            Your email app should have opened with the message ready. Nothing has been sent yet. If it didn't open, write to{" "}
            <a className="underline underline-offset-4" href={`mailto:${site.email}`}>
              {site.email}
            </a>
            .
          </p>
        )}
        {status === "error" && (
          <p role="alert" className="border-l-2 border-signal-deep pl-4">
            {errorMessage} Your message was not sent. Try again, or write to{" "}
            <a className="underline underline-offset-4" href={`mailto:${site.email}`}>
              {site.email}
            </a>
            .
          </p>
        )}
      </div>
    </form>
  );
}
