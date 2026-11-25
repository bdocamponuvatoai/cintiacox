'use client';
import Link from 'next/link';
import { useState } from 'react';

const text = {
  English: {
    lang: 'en',
    title: 'A conversation that feels like home.',
    body: 'Share your plans in the language you’re most comfortable with. Cintia speaks English, Spanish, and Portuguese, bringing a personal approach to your Florida real estate search.',
    cta: 'Start a conversation',
  },
  Español: {
    lang: 'es',
    title: 'Una conversación que se siente como en casa.',
    body: 'Comparta sus planes en el idioma con el que se sienta más cómodo. Cintia habla inglés, español y portugués y le ofrece atención personalizada para su búsqueda inmobiliaria en Florida.',
    cta: 'Converse con Cintia',
  },
  Português: {
    lang: 'pt',
    title: 'Uma conversa que faz você se sentir em casa.',
    body: 'Compartilhe seus planos no idioma em que você se sente mais à vontade. Cintia fala inglês, espanhol e português e oferece um atendimento pessoal para sua busca imobiliária na Flórida.',
    cta: 'Converse com a Cintia',
  },
};

type Language = keyof typeof text;

export function LanguageNote() {
  const [language, setLanguage] = useState<Language>('English');
  const t = text[language];
  return (
    <section className="section languages" aria-labelledby="languages-title">
      <div className="shell languages__grid">
        <div className="languages__tabs" role="group" aria-label="Read this introduction in your language">
          {(Object.keys(text) as Language[]).map((x) => (
            <button type="button" key={x} aria-pressed={x === language} onClick={() => setLanguage(x)}>
              {x}
            </button>
          ))}
        </div>
        <div className="languages__body" lang={t.lang}>
          <h2 id="languages-title">{t.title}</h2>
          <p>{t.body}</p>
          <Link
            href={`/contact/?intent=Relocate&language=${encodeURIComponent(language)}`}
            className="btn"
            lang={t.lang}
          >
            {t.cta}
          </Link>
        </div>
      </div>
    </section>
  );
}
