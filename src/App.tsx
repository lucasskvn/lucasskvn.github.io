import { Routes, Route, useNavigate, useLocation, Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import githubLogo from './assets/github.png';
import Projects from './Projects';
import Contact from './Contact';
import RadioPlayer from './RadioPlayer';
import './About.css';
import './App.css';
import About from './About';
import Home from './Home';
import Music from './pages/Music';
import Blog from './pages/Blog';
import Article from './pages/Article';
import Uses from './pages/Uses';
import NotFound from './pages/NotFound';

const github = "https://github.com/lucasskvn";
const email = "lucas.sangkhavongs@epitech.eu";

type HorrorMode = 'brouillard' | 'autre-monde';

function Logo() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" className="brand-mark" fill="none">
      <circle cx="12" cy="12" r="2" fill="currentColor" />
      <path d="M7 7a7 7 0 0 1 10 0M5 4a10 10 0 0 1 14 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M4 17h16M7 21h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [lang, setLang] = useState<'fr' | 'en'>('en');
  const [navOpen, setNavOpen] = useState(false);
  const [horror, setHorror] = useState<HorrorMode>(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('horror') : null;
    return saved === 'autre-monde' ? 'autre-monde' : 'brouillard';
  });
  const menuIndexRef = useRef(0);
  const menuRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const navLinksRef = useRef<{ path: string; label: string }[]>([]);
  const menuPointerRef = useRef<HTMLSpanElement | null>(null);

  const placePointer = (idx: number) => {
    const el = menuRefs.current[idx];
    const pointer = menuPointerRef.current;
    if (!el || !pointer) return;
    const li = el.closest('li');
    if (!li) return;
    const top = li.offsetTop + (li.offsetHeight - pointer.offsetHeight) / 2;
    pointer.style.transform = `translateY(${top}px)`;
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-horror', horror);
    localStorage.setItem('horror', horror);
  }, [horror]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = navOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [navOpen]);

  useEffect(() => {
    if (navOpen) return;
    const onTabOpen = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      const tgt = e.target as HTMLElement | null;
      const tag = tgt?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
      e.preventDefault();
      setNavOpen(true);
    };
    window.addEventListener('keydown', onTabOpen);
    return () => window.removeEventListener('keydown', onTabOpen);
  }, [navOpen]);

  useEffect(() => {
    if (!navOpen) return;
    const path = location.pathname;
    const activeIdx = navLinksRef.current.findIndex(l =>
      l.path === '/' ? path === '/' : path === l.path || path.startsWith(l.path + '/')
    );
    menuIndexRef.current = activeIdx >= 0 ? activeIdx : 0;
    const el = menuRefs.current[menuIndexRef.current];
    if (el) requestAnimationFrame(() => { el.focus(); placePointer(menuIndexRef.current); });
  }, [navOpen, location.pathname]);

  useEffect(() => {
    if (!navOpen) return;
    const onKey = (e: KeyboardEvent) => {
      const count = navLinksRef.current.length;
      if (count === 0) return;
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault();
        menuIndexRef.current = (menuIndexRef.current + 1) % count;
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        menuIndexRef.current = (menuIndexRef.current - 1 + count) % count;
      } else if (e.key === 'Home') {
        e.preventDefault();
        menuIndexRef.current = 0;
      } else if (e.key === 'End') {
        e.preventDefault();
        menuIndexRef.current = count - 1;
      } else if (e.key === 'Escape') {
        setNavOpen(false);
        return;
      } else if (/^[1-9]$/.test(e.key)) {
        e.preventDefault();
        const idx = Number(e.key) - 1;
        if (idx < count) {
          menuIndexRef.current = idx;
          setNavOpen(false);
          navigate(navLinksRef.current[idx].path);
        }
        return;
      } else {
        return;
      }
      menuRefs.current[menuIndexRef.current]?.focus();
      placePointer(menuIndexRef.current);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [navOpen, navigate]);

  const t = {
    fr: {
      home: "Accueil",
      about: "À propos",
      projects: "Projets",
      music: "Musique",
      uses: "Uses",
      blog: "Blog",
      contact: "Contact",
      switch: "FR",
      menu: "Menu",
      close: "Fermer le menu",
      open: "Ouvrir le menu",
    },
    en: {
      home: "Home",
      about: "About",
      projects: "Projects",
      music: "Music",
      uses: "Uses",
      blog: "Blog",
      contact: "Contact",
      switch: "EN",
      menu: "Menu",
      close: "Close menu",
      open: "Open menu",
    },
  };

  const navLinks: { path: string; label: string }[] = [
    { path: '/', label: t[lang].home },
    { path: '/about', label: t[lang].about },
    { path: '/projects', label: t[lang].projects },
    { path: '/music', label: t[lang].music },
    { path: '/uses', label: t[lang].uses },
    { path: '/blog', label: t[lang].blog },
    { path: '/contact', label: t[lang].contact },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  navLinksRef.current = navLinks;

  const toggleHorror = () => {
    setHorror(h => (h === 'brouillard' ? 'autre-monde' : 'brouillard'));
  };

  const closeMenu = () => setNavOpen(false);

  return (
    <>
      <nav className="Navbar">
        <span
          className="Navbar-brand aberrant"
          role="link"
          tabIndex={0}
          onClick={() => navigate('/')}
          onKeyDown={e => { if (e.key === 'Enter') navigate('/'); }}
        >
          <Logo /> lucasskvn
        </span>

        <button
          className="Navbar-menu-btn"
          aria-label={navOpen ? t[lang].close : t[lang].open}
          aria-expanded={navOpen}
          onClick={() => setNavOpen(o => !o)}
        >
          ☰ <span>{t[lang].menu}</span>
        </button>
      </nav>

      {navOpen && (
        <div className="menu-overlay" role="dialog" aria-modal="true" aria-label={t[lang].menu}>
          <div className="menu-overlay-inner">
            <div className="menu-top">
              <span className="menu-brand">
                <Logo /> lucasskvn
              </span>
              <button className="menu-close" onClick={closeMenu} aria-label={t[lang].close}>
                ✕
              </button>
            </div>

            <nav className="menu-nav">
              <ul>
                <span className="menu-pointer" ref={menuPointerRef} aria-hidden="true">▸</span>
                {navLinks.map((l, i) => (
                  <li key={l.path}>
                    <Link
                      to={l.path}
                      ref={el => { menuRefs.current[i] = el; }}
                      className={`menu-link${isActive(l.path) ? ' active' : ''}`}
                      onClick={closeMenu}
                      onMouseEnter={() => placePointer(i)}
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="menu-footer">
              <button
                className="horror-toggle"
                onClick={toggleHorror}
                aria-label={horror === 'autre-monde' ? 'Passer au brouillard' : 'Passer à l\u2019Autre Monde'}
                title={horror === 'autre-monde' ? 'L\u2019Autre Monde — basculer' : 'Le Brouillard — basculer'}
              >
                {horror === 'autre-monde' ? '☽' : '☁'}
              </button>
              <a href={github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <img src={githubLogo} alt="GitHub" className="SocialLogo" />
              </a>
              <button
                className="language-switch-btn"
                onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')}
                aria-label="Switch language"
              >
                {t[lang].switch}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className={horror === 'autre-monde' ? 'world-otherworld' : 'world-brouillard'}>
        <Routes location={location}>
          <Route path="/" element={<Home lang={lang} world={horror} />} />
        <Route path="/about" element={<About lang={lang} />} />
        <Route path="/projects" element={<Projects lang={lang} />} />
        <Route path="/music" element={<Music lang={lang} />} />
        <Route path="/uses" element={<Uses lang={lang} />} />
        <Route path="/blog" element={<Blog lang={lang} />} />
        <Route path="/blog/:slug" element={<Article lang={lang} />} />
        <Route path="/contact" element={<Contact lang={lang} />} />
        <Route path="/radio" element={<RadioPlayer lang={lang} />} />
        <Route path="*" element={<NotFound lang={lang} />} />
        </Routes>
      </div>

      <footer className="Site-footer">
        <span className="footer-signal">SIGNAL 108.0 · LAT 41.38 · LON -71.90</span>
        <span className="footer-meta">
          © {new Date().getFullYear()} lucasskvn —{' '}
          <a href={github} target="_blank" rel="noopener noreferrer">GitHub</a> ·{' '}
          <a href={`mailto:${email}`}>Email</a>
        </span>
      </footer>
    </>
  );
}

export default App
