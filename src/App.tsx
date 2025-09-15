import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import linkedinLogo from './assets/linkedin.svg';
import githubLogo from './assets/github.png';
import mailLogo from './assets/mail.png';
import Projects from './Projects';
import Contact from './Contact';
import RadioPlayer from './RadioPlayer';
import PP from './assets/ppgithub.png';
import './About.css';
import './App.css';
import About from './About';
import Home from './Home';

const email = "lucas.sangkhavongs@epitech.eu";
const linkedin = "https://www.linkedin.com/in/lucas-sangkhavongs/";
const github = "https://github.com/lucaskvn";


function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [lang, setLang] = useState<'fr' | 'en'>('en');
  const [navOpen, setNavOpen] = useState(false); // Ajout état menu mobile
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
        {/* Hamburger menu visible sur mobile */}
        <button
          className="Navbar-burger"
          aria-label="Ouvrir le menu"
          onClick={() => setNavOpen(!navOpen)}
        >
          <span />
          <span />
          <span />
        </button>
        <div className={`Navbar-center${navOpen ? ' open' : ''}`}>
          <span
            className={`Navbar-Home${location.pathname === '/' ? ' active' : ''}`}
            onClick={() => { navigate('/'); setNavOpen(false); }}
          >
            {t[lang].home}
          </span>
          <span
            className={`Navbar-About${location.pathname === '/about' ? ' active' : ''}`}
            onClick={() => { navigate('/about'); setNavOpen(false); }}
          >
            {t[lang].about}
          </span>
          <span
            className={`Navbar-Projects${location.pathname === '/projects' ? ' active' : ''}`}
            onClick={() => { navigate('/projects'); setNavOpen(false); }}
          >
            {t[lang].projects}
          </span>
          <span
            className={`Navbar-Contact${location.pathname === '/contact' ? ' active' : ''}`}
            onClick={() => { navigate('/contact'); setNavOpen(false); }}
          >
            {t[lang].contact}
          </span>
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
        <Route path="/" element={<Home lang={lang} />} />
        <Route path="/about" element={<About lang={lang} />} />
        <Route path="/projects" element={<Projects lang={lang} />} />
        <Route path="/contact" element={<Contact lang={lang} />} />
        <Route path="/radio" element={<RadioPlayer lang={lang} />} />
      </Routes>
    </>
  );
}

export default App
