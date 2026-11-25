'use client';
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { residences } from '../lib/content';

export type Plan = {
  intent: string;
  origin: string;
  area: string;
  priority: string;
  budget: string;
  timing: string;
  language: string;
};

export const initialPlan: Plan = {
  intent: 'Buy',
  origin: 'Within the U.S.',
  area: 'Still exploring',
  priority: 'Coastal living',
  budget: 'Let’s discuss',
  timing: 'Just exploring',
  language: 'English',
};

// Storage keys are unchanged from the first version so visitors keep their saved homes and plan.
const SAVED_KEY = 'cintia-saved-v1';
const PLAN_KEY = 'cintia-plan-v1';

type Experience = {
  saved: string[];
  toggle: (id: string) => void;
  plan: Plan;
  setPlan: (p: Plan) => void;
  ready: boolean;
};

const Context = createContext<Experience>({
  saved: [],
  toggle: () => {},
  plan: initialPlan,
  setPlan: () => {},
  ready: false,
});

export function ExperienceProvider({ children }: { children: ReactNode }) {
  const [saved, setSaved] = useState<string[]>([]);
  const [plan, setPlan] = useState<Plan>(initialPlan);
  const [ready, setReady] = useState(false);

  // Read storage after mount so server and client render the same markup.
  useEffect(() => {
    try {
      const s = JSON.parse(localStorage.getItem(SAVED_KEY) || '[]');
      if (Array.isArray(s))
        setSaved([...new Set(s.filter((x) => typeof x === 'string' && residences.some((p) => p.slug === x)))]);
      const p = JSON.parse(localStorage.getItem(PLAN_KEY) || 'null');
      if (p && Object.keys(initialPlan).every((k) => typeof p[k] === 'string' && p[k].length < 150)) setPlan(p);
    } catch {}
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(SAVED_KEY, JSON.stringify(saved));
      localStorage.setItem(PLAN_KEY, JSON.stringify(plan));
    } catch {}
  }, [saved, plan, ready]);

  const toggle = (id: string) => setSaved((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));

  return <Context.Provider value={{ saved, toggle, plan, setPlan, ready }}>{children}</Context.Provider>;
}

export const useExperience = () => useContext(Context);

export function planText(p: Plan) {
  return `My Florida plan\nInterest: ${p.intent}\nMoving from: ${p.origin}\nArea: ${p.area}\nPriority: ${p.priority}\nBudget: ${p.budget}\nTiming: ${p.timing}\nPreferred language: ${p.language}`;
}
