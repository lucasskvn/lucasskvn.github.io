import { useState, useEffect } from 'react';
import SEO from './components/SEO';
import TerminalWidget from './components/TerminalWidget';
import './home.css';

type HomeProps = {
  lang?: 'fr' | 'en';
  world?: 'brouillard' | 'autre-monde';
};

const owIndex = {
  fr: ['Accueil', 'À propos', 'Projets', 'Musique', 'Contact'],
  en: ['Home', 'About', 'Projects', 'Music', 'Contact'],
};

const Home = ({ lang = 'en', world = 'brouillard' }: HomeProps) => {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (world !== 'autre-monde') return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        setRevealed(true);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [world]);

  if (world === 'autre-monde') {
    return (
      <div className="Home-container Home-other fade-in-home">
        <SEO
          title="Home"
          description={lang === 'fr' ? 'Portfolio de Lucas Sangkhavongs — développeur, projets Epitech, musique' : "Lucas Sangkhavongs' portfolio — developer, Epitech projects, music"}
          path="/"
        />
        <div className="ow-home">
          <div className="ow-chapter">{lang === 'fr' ? 'Chapitre 01 — Signal' : 'Chapter 01 — Signal'}</div>
          <h1 className="ow-title aberrant">
            {lang === 'fr' ? 'Lucas Sangkhavongs' : 'Lucas Sangkhavongs'}
          </h1>
          <p className="ow-sub">
            {lang === 'fr'
              ? 'Développeur · homelab · systèmes. Tu es venu, le brouillard est venu.'
              : 'Developer · homelab · systems. You came, the fog came.'}
          </p>
          {!revealed ? (
            <button className="ow-reveal" onClick={() => setRevealed(true)}>
              {lang === 'fr' ? '— APPUYER SUR ENTRÉE —' : '— PRESS ENTER —'}
            </button>
          ) : (
            <ul className="ow-index">
              {owIndex[lang].map((item, i) => (
                <li key={item}>
                  {String(i + 1).padStart(2, '0')} — {item}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="Home-container fade-in-home">
      <SEO
        title="Home"
        description={lang === 'fr' ? 'Portfolio de Lucas Sangkhavongs — développeur, projets Epitech, musique' : "Lucas Sangkhavongs' portfolio — developer, Epitech projects, music"}
        path="/"
      />
      <div className="home-hero">
        <h1 className="Home-title aberrant">{lang === 'fr' ? 'Lucas Sangkhavongs' : 'Lucas Sangkhavongs'}</h1>
        <p className="Home-subtitle">
          {lang === 'fr'
            ? 'Développeur, homelab, systèmes. Dans le brouillard.'
            : 'Developer, homelab, systems. In the fog.'}
        </p>
      </div>
      <TerminalWidget />
    </div>
  );
};

export default Home;
