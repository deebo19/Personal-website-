import React, { useState } from "react";
import { CONTACT_EMAIL } from '../data';
import '../assets/styles/Feedback.scss';

type Errors = { rating?: string; message?: string; email?: string };

const RATING_LABELS = ["Poor", "Fair", "Good", "Great", "Excellent"];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateFeedback(rating: number, message: string, email: string): Errors {
  const errors: Errors = {};
  if (!rating) errors.rating = "Please choose a rating.";
  if (message.trim().length < 10) errors.message = "Please write at least 10 characters.";
  if (email.trim() && !EMAIL_RE.test(email.trim())) errors.email = "That email address doesn't look right.";
  return errors;
}

// The site is static (no server), so instead of pretending to submit, the form validates the
// feedback and hands it to the visitor's email app, with a copy option as a fallback.
function Feedback() {
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [ready, setReady] = useState(false);
  const [copied, setCopied] = useState(false);

  const body =
    `Rating: ${rating}/5 (${RATING_LABELS[rating - 1] ?? ""})\n\n${message.trim()}\n\n` +
    `From: ${name.trim() || "Anonymous"}${email.trim() ? ` <${email.trim()}>` : ""}`;
  const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`Portfolio feedback (${rating}/5)`)}&body=${encodeURIComponent(body)}`;

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const found = validateFeedback(rating, message, email);
    setErrors(found);
    if (Object.keys(found).length === 0) setReady(true);
    else document.getElementById(found.rating ? "rating-1" : found.message ? "feedback-message" : "feedback-email")?.focus();
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(body);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  const reset = () => {
    setRating(0); setMessage(""); setName(""); setEmail("");
    setErrors({}); setReady(false); setCopied(false);
  };

  return (
    <div id="feedback">
      <div className="items-container">
        <div className="feedback-wrapper">
          <h2>Feedback on this site</h2>
          <p>Spotted a bug or have a suggestion? I'm a QA lead, so I'd genuinely like to know.</p>

          {ready ? (
            <div className="feedback-ready" role="status">
              <h3>Thanks! Your feedback is ready to send</h3>
              <p>This site has no server, so nothing has been sent yet. Send it from your email app, or copy it.</p>
              <div className="feedback-actions">
                <a className="feedback-primary" href={mailto}>Open in email app</a>
                <button type="button" className="feedback-secondary" onClick={copy}>{copied ? "Copied!" : "Copy feedback"}</button>
                <button type="button" className="feedback-link" onClick={reset}>Write another</button>
              </div>
            </div>
          ) : (
            <form className="feedback-form" onSubmit={onSubmit} noValidate>
              <fieldset className="rating" aria-describedby={errors.rating ? "rating-error" : undefined}>
                <legend>How would you rate this site? <span aria-hidden="true">*</span></legend>
                <div className="stars">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <label key={n} className={n <= rating ? "is-on" : undefined}>
                      <input
                        type="radio"
                        name="rating"
                        id={`rating-${n}`}
                        value={n}
                        checked={rating === n}
                        onChange={() => setRating(n)}
                      />
                      <span aria-hidden="true">★</span>
                      <span className="visually-hidden">{n} – {RATING_LABELS[n - 1]}</span>
                    </label>
                  ))}
                  {rating > 0 && <span className="rating-label">{RATING_LABELS[rating - 1]}</span>}
                </div>
                {errors.rating && <p className="field-error" id="rating-error">{errors.rating}</p>}
              </fieldset>

              <label htmlFor="feedback-message">Your feedback <span aria-hidden="true">*</span></label>
              <textarea
                id="feedback-message"
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? "message-error" : undefined}
                required
              />
              {errors.message && <p className="field-error" id="message-error">{errors.message}</p>}

              <div className="feedback-row">
                <div>
                  <label htmlFor="feedback-name">Name (optional)</label>
                  <input id="feedback-name" type="text" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div>
                  <label htmlFor="feedback-email">Email (optional)</label>
                  <input
                    id="feedback-email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "email-error" : undefined}
                  />
                  {errors.email && <p className="field-error" id="email-error">{errors.email}</p>}
                </div>
              </div>

              <button type="submit" className="feedback-primary">Prepare feedback</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default Feedback;
