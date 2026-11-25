'use client';
import { useEffect, useRef, useState } from 'react';
import { advisor, residences } from '../lib/content';
import { planText, useExperience } from './experience';

const TIMING = ['Just exploring', 'Within 3 months', '3–6 months', '6–12 months', 'More than a year'];

export function ContactForm() {
  const { plan, saved, ready } = useExperience();
  const [enabled, setEnabled] = useState(false);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState('');
  const [success, setSuccess] = useState(false);
  const [draft, setDraft] = useState('');
  const init = useRef(false);
  const [data, setData] = useState({
    name: '',
    email: '',
    phone: '',
    intent: 'General',
    language: 'English',
    timing: '',
    timezone: '',
    message: '',
    consent: false,
    website: '',
  });

  // Online delivery is available only when the server reports a complete configuration.
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_PREVIEW_MODE === '1') return;
    const c = new AbortController();
    fetch('/api/contact-config/', { signal: c.signal })
      .then((r) => (r.ok ? r.json() : null))
      .then((r) => setEnabled(r?.enabled === true))
      .catch(() => {});
    return () => c.abort();
  }, []);

  // Presets from the URL: ?intent, ?language, ?include=plan|saved, ?property, ?area.
  useEffect(() => {
    if (!ready || init.current) return;
    init.current = true;
    const q = new URLSearchParams(window.location.search);
    let intent = q.get('intent') || 'General';
    if (!['Buy', 'Sell', 'Relocate', 'General'].includes(intent)) intent = 'General';
    let language = q.get('language') || plan.language;
    if (!['English', 'Español', 'Português'].includes(language)) language = 'English';
    let message = '';
    if (q.get('include') === 'plan') {
      message = planText(plan);
      intent = ['Buy', 'Sell', 'Relocate'].includes(plan.intent) ? plan.intent : 'General';
    }
    if (q.get('include') === 'saved') {
      message =
        'I liked these past-property references and would like to discuss similar current possibilities:\n\n' +
        residences
          .filter((h) => saved.includes(h.slug))
          .map((h) => `${h.address}, ${h.city}`)
          .join('\n');
    }
    const property = residences.find((h) => h.slug === q.get('property'));
    if (property)
      message = `I’m interested in properties similar to ${property.address}, ${property.city}. I understand this is a past transaction.`;
    const area = q.get('area');
    if (area && area.length < 100) message = `I’d like to explore homes in ${area}.`;
    setData((d) => ({ ...d, intent, language, message }));
  }, [ready, plan, saved]);

  function set(key: string, value: string | boolean) {
    setSuccess(false);
    setData((d) => ({ ...d, [key]: value }));
  }

  const inquiry = `Hello Cintia,\n\n${data.message}\n\nName: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone || 'Not supplied'}\nInterest: ${data.intent}\nPreferred language: ${data.language}\nTiming: ${data.timing || 'To discuss'}\nTime zone: ${data.timezone || 'To discuss'}`;

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('');
    setSuccess(false);
    if (data.name.trim().length < 2 || data.message.trim().length < 10) {
      setStatus('Please add your name and a message of at least 10 characters.');
      return;
    }
    if (!enabled) {
      setDraft(inquiry);
      setStatus('Your inquiry is ready below. Nothing has been sent. Open your email app or copy the text to send it.');
      return;
    }
    setBusy(true);
    try {
      const response = await fetch('/api/inquiries/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (!response.ok) {
        setStatus(result.error || 'We could not submit your inquiry. Please use email or call Cintia.');
        setDraft(inquiry);
      } else {
        setSuccess(true);
        setStatus('Your inquiry has been submitted. Any consultation time will be confirmed personally.');
        setDraft('');
      }
    } catch {
      setStatus('Delivery could not be confirmed. Please use the email option or call Cintia.');
      setDraft(inquiry);
    } finally {
      setBusy(false);
    }
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(draft);
      setStatus('Copied. Paste your inquiry into an email to ' + advisor.email + '.');
    } catch {
      setStatus('Please select and copy the inquiry text below.');
    }
  }

  return (
    <div className="contact-form">
      <h2>Send a message</h2>
      <form onSubmit={submit} className="form">
        <div className="form__row">
          <label className="field">
            <span className="field__label">Your name</span>
            <input
              required
              autoComplete="name"
              minLength={2}
              maxLength={100}
              value={data.name}
              onChange={(e) => set('name', e.target.value)}
            />
          </label>
          <label className="field">
            <span className="field__label">Email address</span>
            <input
              required
              type="email"
              autoComplete="email"
              maxLength={200}
              value={data.email}
              onChange={(e) => set('email', e.target.value)}
            />
          </label>
        </div>
        <div className="form__row">
          <label className="field">
            <span className="field__label">
              Phone <span>(optional)</span>
            </span>
            <input
              type="tel"
              autoComplete="tel"
              maxLength={50}
              value={data.phone}
              onChange={(e) => set('phone', e.target.value)}
            />
          </label>
          <label className="field">
            <span className="field__label">Preferred language</span>
            <select value={data.language} onChange={(e) => set('language', e.target.value)}>
              {advisor.languages.map((l) => (
                <option key={l}>{l}</option>
              ))}
            </select>
          </label>
        </div>
        <div className="form__row">
          <label className="field">
            <span className="field__label">I’m interested in</span>
            <select value={data.intent} onChange={(e) => set('intent', e.target.value)}>
              {['General', 'Buy', 'Sell', 'Relocate'].map((x) => (
                <option key={x}>{x}</option>
              ))}
            </select>
          </label>
          <label className="field">
            <span className="field__label">
              My timing <span>(optional)</span>
            </span>
            <select value={data.timing} onChange={(e) => set('timing', e.target.value)}>
              <option value="">Let’s discuss</option>
              {TIMING.map((x) => (
                <option key={x}>{x}</option>
              ))}
            </select>
          </label>
        </div>
        <label className="field">
          <span className="field__label">
            Your time zone or location <span>(optional)</span>
          </span>
          <input
            maxLength={100}
            placeholder="e.g. London, São Paulo, or Eastern Time"
            value={data.timezone}
            onChange={(e) => set('timezone', e.target.value)}
          />
        </label>
        <label className="field">
          <span className="field__label">What do you have in mind?</span>
          <textarea
            required
            minLength={10}
            maxLength={4000}
            rows={5}
            value={data.message}
            placeholder="A home by the water, a move from overseas, a property you’re thinking of selling…"
            onChange={(e) => set('message', e.target.value)}
          />
        </label>
        <div className="honeypot" aria-hidden="true">
          <label>
            Website
            <input tabIndex={-1} autoComplete="off" value={data.website} onChange={(e) => set('website', e.target.value)} />
          </label>
        </div>
        <label className="consent">
          <input type="checkbox" checked={data.consent} onChange={(e) => set('consent', e.target.checked)} required />
          <span>
            I agree to be contacted about this inquiry. I have read the <a href="/privacy/">privacy information</a>.
          </span>
        </label>
        <div className="form__submit">
          <button className="btn" disabled={busy || success} type="submit">
            {busy ? 'Submitting…' : success ? 'Inquiry submitted' : enabled ? 'Send my inquiry' : 'Prepare my inquiry'}
          </button>
          <p className="fine-print">
            {enabled
              ? 'Your details will be sent to Cintia’s configured inbox when you submit.'
              : 'Design preview: prepare a message, then send it through your own email app. No message is sent automatically.'}{' '}
            Please do not include sensitive financial or identity documents.
          </p>
        </div>
      </form>

      <p className={`form-status ${success ? 'form-status--success' : ''}`} role="status">
        {status}
      </p>

      {draft && (
        <div className="draft panel">
          <h3>Your inquiry is ready.</h3>
          <div className="actions">
            <a
              className="btn"
              href={`mailto:${advisor.email}?subject=${encodeURIComponent('Florida real estate inquiry')}&body=${encodeURIComponent(draft)}`}
            >
              Open email app
            </a>
            <button type="button" className="arrow-link draft__copy" onClick={copy}>
              <span>Copy inquiry</span>
            </button>
          </div>
          <label className="field">
            <span className="field__label">Prepared message</span>
            <textarea readOnly rows={9} value={draft} />
          </label>
          <p className="fine-print">Review the message in your email app and press Send there. No appointment has been booked.</p>
        </div>
      )}
    </div>
  );
}
