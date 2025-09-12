import { Routes, Route, useNavigate } from 'react-router-dom'
import { useState } from 'react';
import Profile from './assets/profile.jpg'
import linkedinLogo from './assets/linkedin.svg'
import githubLogo from './assets/github.png'
import DownloadIcon from './assets/download.png'
import mailLogo from './assets/mail.png'
import Projects from './Projects'
import Contact from './Contact'
import RadioPlayer from './RadioPlayer'
import './App.css'

const email = "lucas.sangkhavongs@epitech.eu";
const status = "EPITECH Lyon Student";
const linkedin = "https://www.linkedin.com/in/lucas-sangkhavongs/";
const github = "https://github.com/lucaskvn";

function About({ lang }: { lang: 'fr' | 'en' }) {
  return (
    <div className="Rectangles-container">
      <div className="Rounded-rectangle">
        <img src={Profile} alt="Profile" className="Profile-rectangle" />
        <a href="/src/assets/CV_LucasSangkhavongs.pdf" download className="CV-download-btn">
          {lang === 'fr' ? 'Télécharger le CV' : 'Download CV'}
          <span className="DownloadArrow">
            <img src={DownloadIcon} alt="Download" width={22} height={22} />
          </span>
        </a>
        <div className="Profile-vertical-divider"></div>
        <div className="Profile-content">
          <h2>Lucas Sangkhavongs</h2>
          <div className="Profile-subtitle">{status}</div>
          <p>
            {lang === 'fr'
              ? "Je m'appelle Lucas Sangkhavongs, j'ai 19 ans et je suis étudiant en deuxième année à EPITECH Lyon. Passionné d'informatique et de programmation."
              : "I'm Lucas Sangkhavongs, I'm 19 years old and a second-year EPITECH student based in Lyon, France. I'm passionate about programming and computers."}
            <br />
          </p>
          <p>{lang === 'fr' ? "Je développe des applications en C et Python" : "I build apps in C and Python"}</p>
        </div>
      </div>
    </div>
  );
}

function App() {
  const navigate = useNavigate();
  const [lang, setLang] = useState<'fr' | 'en'>("fr");
  const t = {
    fr: {
      home: "Accueil",
      projects: "Projets",
      contact: "Contact",
      switch: "EN",
    },
    en: {
      home: "Home",
      projects: "Projects",
      contact: "Contact",
      switch: "FR",
    }
  };
  return (
    <>
      <nav className="Navbar">
        <div className="Navbar-divider"></div>
        <span className="Navbar-title">lucasskvn</span>
        <div className="Navbar-center">
          <span className="Navbar-About" onClick={() => navigate('/')}>{t[lang].home}</span>
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
        <Route path="/" element={<About lang={lang} />} />
        <Route path="/projects" element={<Projects lang={lang} />} />
        <Route path="/contact" element={<Contact lang={lang} />} />
        <Route path="/radio" element={<RadioPlayer lang={lang} />} />
      </Routes>
    </>
  )
}

export default App
