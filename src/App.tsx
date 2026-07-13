import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
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
import Music from './pages/Music';
import Blog from './pages/Blog';
import Article from './pages/Article';
import NotFound from './pages/NotFound';
import ScrollProgress from './components/ScrollProgress';
import ParticleBackground from './components/ParticleBackground';
import BackToTop from './components/BackToTop';

const email = "lucas.sangkhavongs@epitech.eu";
const linkedin = "https://www.linkedin.com/in/lucas-sangkhavongs/";
const github = "https://github.com/lucasskvn";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [lang, setLang] = useState<'fr' | 'en'>('en');
  const [navOpen, setNavOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [location.pathname]);

  const t = {
    fr: {
      home: "Accueil",
      about: "À propos",
      projects: "Projets",
      music: "Musique",
      blog: "Blog",
      contact: "Contact",
      switch: "FR",
    },
    en: {
      home: "Home",
      about: "About",
      projects: "Projects",
      music: "Music",
      blog: "Blog",
      contact: "Contact",
      switch: "EN",
    },
  };

  const isActive = (path: string) => location.pathname === path ? ' active' : '';

  return (
    <>
      <ParticleBackground />
      <ScrollProgress />
      <BackToTop />
      <nav className="Navbar">
        <img src={PP} alt="PP GitHub" className="Navbar-ppgithub" />
        <div className="Navbar-divider"></div>
        <span className="Navbar-title">lucasskvn</span>
        <button
          className="Navbar-burger"
          aria-label="Ouvrir le menu"
          onClick={() => setNavOpen(!navOpen)}
        >
          <span />
          <span />
          <span />
        </button>
        <div className={`Navbar-center${navOpen ? ' open' : ''}`} onClick={() => setNavOpen(false)}>
          <span className={`Navbar-Home${isActive('/')}`} onClick={() => navigate('/')}>
            {t[lang].home}
          </span>
          <span className={`Navbar-About${isActive('/about')}`} onClick={() => navigate('/about')}>
            {t[lang].about}
          </span>
          <span className={`Navbar-Projects${isActive('/projects')}`} onClick={() => navigate('/projects')}>
            {t[lang].projects}
          </span>
          <span className={`Navbar-Music${isActive('/music')}`} onClick={() => navigate('/music')}>
            {t[lang].music}
          </span>
          <span className={`Navbar-Blog${isActive('/blog') || location.pathname.startsWith('/blog/') ? ' active' : ''}`} onClick={() => navigate('/blog')}>
            {t[lang].blog}
          </span>
          <span className={`Navbar-Contact${isActive('/contact')}`} onClick={() => navigate('/contact')}>
            {t[lang].contact}
          </span>
          <div className="Navbar-socials mobile">
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
              className="language-switch-btn"
              onClick={e => { e.stopPropagation(); setLang(lang === 'fr' ? 'en' : 'fr'); }}
              aria-label="Switch language"
            >
              {t[lang].switch}
            </button>
          </div>
        </div>
        <div className="Navbar-socials desktop">
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
            className="language-switch-btn"
            onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')}
            aria-label="Switch language"
          >
            {t[lang].switch}
          </button>
        </div>
      </nav>
      <AnimatePresence>
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
        >
          <Routes location={location}>
            <Route path="/" element={<Home lang={lang} />} />
            <Route path="/about" element={<About lang={lang} />} />
            <Route path="/projects" element={<Projects lang={lang} />} />
            <Route path="/music" element={<Music lang={lang} />} />
            <Route path="/blog" element={<Blog lang={lang} />} />
            <Route path="/blog/:slug" element={<Article lang={lang} />} />
            <Route path="/contact" element={<Contact lang={lang} />} />
            <Route path="/radio" element={<RadioPlayer lang={lang} />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
    </>
  );
}

export default App
