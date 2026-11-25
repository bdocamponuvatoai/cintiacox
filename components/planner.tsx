'use client';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { initialPlan, planText, useExperience, type Plan } from './experience';
import { CheckIcon, DownloadIcon, ResetIcon } from './icons';

const options = {
  intent: ['Buy', 'Sell', 'Relocate'],
  origin: ['Within the U.S.', 'Outside the U.S.', 'Already in Florida'],
  area: ['Still exploring', 'Boca Raton', 'Delray Beach', 'Highland Beach', 'Palm Beach', 'Another Florida area'],
  priority: ['Coastal living', 'City & culture', 'More space', 'A second home', 'A fresh start'],
  budget: ['Let’s discuss', 'Under $750,000', '$750,000–$1.5 million', '$1.5–$3 million', '$3 million+'],
  timing: ['Just exploring', 'Within 3 months', '3–6 months', '6–12 months', 'More than a year'],
  language: ['English', 'Español', 'Português'],
};

const TITLES = ['What are you planning?', 'Where, and what matters most?', 'Timing and budget', 'Your Florida plan'];
const STEP_NAMES = ['Your move', 'Area and priority', 'Timing and budget'];

export function Planner() {
  const { plan, setPlan, ready } = useExperience();
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState('');
  const init = useRef(false);
  const heading = useRef<HTMLHeadingElement>(null);

  // Presets from the URL (?intent, ?area, ?timing) are applied once, after saved answers load.
  useEffect(() => {
    if (!ready || init.current) return;
    init.current = true;
    const q = new URLSearchParams(window.location.search);
    const next = { ...plan };
    for (const key of ['intent', 'area', 'timing'] as const) {
      const value = q.get(key);
      if (value && options[key].includes(value)) next[key] = value;
    }
    setPlan(next);
  }, [ready, plan, setPlan]);

  function update(k: keyof Plan, v: string) {
    setPlan({ ...plan, [k]: v });
  }

  function go(n: number) {
    setStep(n);
    setStatus('');
    requestAnimationFrame(() => heading.current?.focus());
  }

  function choices(k: keyof Plan) {
    return (
      <div className="choices">
        {options[k].map((v) => (
          <button type="button" key={v} aria-pressed={plan[k] === v} onClick={() => update(k, v)}>
            <span>{v}</span>
            <CheckIcon size={18} className="choices__check" />
          </button>
        ))}
      </div>
    );
  }

  const tasks =
    plan.intent === 'Sell'
      ? [
          'Share your property, timing, and what you want from the sale.',
          'Discuss presentation, positioning, and current comparable properties.',
          'Agree on a marketing and communication plan before moving forward.',
        ]
      : [
          `Explore ${plan.area === 'Still exploring' ? 'a few areas side by side' : plan.area} with your daily routines in mind.`,
          `Discuss ${plan.priority.toLowerCase()}, your preferred home type, and an overall budget.`,
          plan.origin === 'Outside the U.S.'
            ? 'Plan remote conversations and a visit; consult qualified legal, tax, and financing professionals for cross-border questions.'
            : 'Discuss viewing plans, timing, and the questions to ask before making an offer.',
        ];

  function download() {
    const content =
      planText(plan) +
      '\n\nConversation checklist\n' +
      tasks.map((t) => '• ' + t).join('\n') +
      '\n\nPrepared as a planning aid, not a property recommendation, offer, or appointment confirmation.\nCintia Cox | Compass\n561-465-6446 | cintia.cox@compass.com';
    const u = URL.createObjectURL(new Blob([content], { type: 'text/plain;charset=utf-8' }));
    const a = document.createElement('a');
    a.href = u;
    a.download = 'my-florida-move-plan.txt';
    a.click();
    URL.revokeObjectURL(u);
    setStatus('Your plan has been downloaded. Nothing has been sent.');
  }

  return (
    <div className="shell planner">
      <aside className="planner__aside">
        <p className="meta">Move plan</p>
        <h2>Three short steps, then one useful conversation.</h2>
        <p>Your answers stay in this browser. Contact details are only requested when you choose to get in touch.</p>
        <ol className="planner__steps" aria-hidden="true">
          {STEP_NAMES.map((name, n) => (
            <li key={name} data-state={step > n ? 'done' : step === n ? 'current' : undefined}>
              <span>{String(n + 1).padStart(2, '0')}</span>
              {name}
            </li>
          ))}
        </ol>
      </aside>

      <div className="planner__panel">
        <div
          className="planner__progress"
          aria-label={`Step ${Math.min(step + 1, 3)} of 3${step === 3 ? ', complete' : ''}`}
        >
          <span>{step === 3 ? 'Your plan' : `Step ${step + 1} of 3`}</span>
          <div className="planner__bar">
            {[0, 1, 2].map((n) => (
              <i key={n} className={step >= n ? 'is-active' : ''} />
            ))}
          </div>
        </div>

        <h1 ref={heading} tabIndex={-1}>
          {TITLES[step]}
        </h1>

        {step === 0 && (
          <>
            <p className="planner__help">Start wherever you are. You can change your answers at any time.</p>
            <fieldset>
              <legend>I’m looking to</legend>
              {choices('intent')}
            </fieldset>
            <fieldset>
              <legend>I’m moving from</legend>
              {choices('origin')}
            </fieldset>
            <label className="field">
              <span className="field__label">Preferred conversation language</span>
              <select value={plan.language} onChange={(e) => update('language', e.target.value)}>
                {options.language.map((l) => (
                  <option key={l}>{l}</option>
                ))}
              </select>
            </label>
          </>
        )}

        {step === 1 && (
          <>
            <fieldset>
              <legend>The area I have in mind</legend>
              {choices('area')}
            </fieldset>
            <fieldset>
              <legend>A priority for my next chapter</legend>
              {choices('priority')}
            </fieldset>
          </>
        )}

        {step === 2 && (
          <>
            <p className="planner__help">These are conversation starters. No financial documents or commitment needed.</p>
            <fieldset>
              <legend>My timing</legend>
              {choices('timing')}
            </fieldset>
            <label className="field">
              <span className="field__label">My {plan.intent === 'Sell' ? 'next-home ' : ''}budget, if known</span>
              <select value={plan.budget} onChange={(e) => update('budget', e.target.value)}>
                {options.budget.map((b) => (
                  <option key={b}>{b}</option>
                ))}
              </select>
            </label>
            <p className="fine-print">
              Your selections stay in this browser. Contact details are only requested when you choose to get in touch.
            </p>
          </>
        )}

        {step === 3 && (
          <div className="plan-summary">
            <dl className="facts facts--single">
              <div>
                <dt>Interest</dt>
                <dd>{plan.intent}</dd>
              </div>
              <div>
                <dt>Area</dt>
                <dd>{plan.area}</dd>
              </div>
              <div>
                <dt>Timing</dt>
                <dd>{plan.timing}</dd>
              </div>
              <div>
                <dt>Language</dt>
                <dd>{plan.language}</dd>
              </div>
            </dl>
            <p>Your priorities give us a place to begin. Here’s what to talk through next.</p>
            <ol className="plan-summary__tasks">
              {tasks.map((t) => (
                <li key={t}>
                  <CheckIcon size={18} />
                  <span>{t}</span>
                </li>
              ))}
            </ol>
            <div className="actions">
              <Link className="btn" href="/contact/?include=plan">
                Discuss my plan with Cintia
              </Link>
              <button className="arrow-link" type="button" onClick={download}>
                <span>Download my plan</span>
                <DownloadIcon size={18} />
              </button>
            </div>
            <p role="status" className="form-status">
              {status}
            </p>
            <p className="fine-print">A planning aid, not a property recommendation, offer, or booked appointment.</p>
          </div>
        )}

        <div className="planner__controls">
          {step > 0 && (
            <button className="arrow-link planner__back" type="button" onClick={() => go(step - 1)}>
              <span>Back</span>
            </button>
          )}
          {step < 3 ? (
            <button type="button" className="btn" disabled={!ready} onClick={() => go(step + 1)}>
              {step === 2 ? 'Build my plan' : 'Continue'}
            </button>
          ) : (
            <button
              type="button"
              className="arrow-link"
              onClick={() => {
                setPlan(initialPlan);
                go(0);
              }}
            >
              <ResetIcon size={16} />
              <span>Start again</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
