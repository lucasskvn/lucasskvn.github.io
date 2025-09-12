import { Routes, Route, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import linkedinLogo from './assets/linkedin.svg';
import githubLogo from './assets/github.png';
import mailLogo from './assets/mail.png';
import Projects from './Projects';
import Contact from './Contact';
import RadioPlayer from './RadioPlayer';
import PP from './assets/ppgithub.png';
import './App.css';
import About from './About';
import Home from './Home';

const email = "lucas.sangkhavongs@epitech.eu";
const linkedin = "https://www.linkedin.com/in/lucas-sangkhavongs/";
const github = "https://github.com/lucaskvn";


function App() {
  const navigate = useNavigate();
  const [lang, setLang] = useState<'fr' | 'en'>('en');
  const t = {
    fr: {
      home: "Accueil",
      about: "À propos",
      projects: "Projets",
      contact: "Contact",
      switch: "FR",
    },
    en: {
      home: "Home",
      about: "About",
      projects: "Projects",
      contact: "Contact",
      switch: "EN",
    },
  };
  return (
    <>
      <nav className="Navbar">
        <img src={PP} alt="PP GitHub" className="Navbar-ppgithub" style={{ height: 40, width: 40, borderRadius: '50%', marginRight: 0, marginLeft: 29 }} />
        <div className="Navbar-divider"></div>
        <span className="Navbar-title">lucasskvn</span>
        <div className="Navbar-center">
          <span className="Navbar-Home" onClick={() => navigate('/')}>{t[lang].home}</span>
          <span className="Navbar-About" onClick={() => navigate('/about')}>{t[lang].about}</span>
          <span className="Navbar-Projects" onClick={() => navigate('/projects')}>{t[lang].projects}</span>
          <span className="Navbar-Contact" onClick={() => navigate('/contact')}>{t[lang].contact}</span>
        </div>
        <div className="Navbar-socials">
          <a href={linkedin} target="_blank" rel="noopener noreferrer">
            <img src={linkedinLogo} alt="LinkedIn" className="SocialLogo" />
          </a>
          <a href={github} target="_blank" rel="noopener noreferrer">
            <img src={githubLogo} alt="GitHub" className="SocialLogo" />
          </a>
          <a href={`mailto:${email}`}>
            <img src={mailLogo} alt="Email" className="SocialLogo" />
          </a>
          <button
            style={{ marginLeft: 10, background: '#222', color: '#fff', border: '1px solid #444', borderRadius: 6, padding: '0.3rem 0.7rem', cursor: 'pointer', fontWeight: 'bold' }}
            onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')}
            aria-label="Switch language"
          >
            {t[lang].switch}
          </button>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About lang={lang} />} />
        <Route path="/projects" element={<Projects lang={lang} />} />
        <Route path="/contact" element={<Contact lang={lang} />} />
        <Route path="/radio" element={<RadioPlayer lang={lang} />} />
      </Routes>
    </>
  );
}

export default App
