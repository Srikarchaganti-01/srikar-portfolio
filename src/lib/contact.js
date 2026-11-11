import { site } from "../config/site";

/** True when a Web3Forms access key is present in the build. */
export const isFormConfigured = () => Boolean(site.contact.accessKey);

/** mailto: link pre-filled from the form, used when no form key is configured. */
export function buildMailto({ name, email, subject, message }) {
  const body = `${message}\n\n— ${name} (${email})`;
  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/**
 * Sends a message through Web3Forms. To switch providers (e.g. Formspree), only
 * this function and `site.contact` need to change.
 * @returns {Promise<{ok: true} | {ok: false, error: string}>}
 */
export async function sendMessage(values) {
  try {
    const res = await fetch(site.contact.endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: site.contact.accessKey,
        from_name: `${site.name} portfolio`,
        name: values.name,
        email: values.email,
        subject: values.subject,
        message: values.message,
        botcheck: Boolean(values.botcheck),
      }),
      signal: AbortSignal.timeout?.(15000),
    });

    let data = null;
    try {
      data = await res.json();
    } catch {
      /* non-JSON response */
    }

    if (res.ok && data?.success) return { ok: true };
    return { ok: false, error: data?.message || `The form service returned an error (${res.status}).` };
  } catch {
    return { ok: false, error: "The form service couldn't be reached." };
  }
}
