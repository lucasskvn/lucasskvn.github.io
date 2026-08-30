import SEO from './components/SEO';
import Profile from './assets/profile.jpg';
import DownloadIcon from './assets/download.png';
import './About.css';

const status = "EPITECH Lyon Student";

const About = ({ lang }: { lang: 'fr' | 'en' }) => (
  <div className="Rectangles-container fade-in-home" data-code="02">
    <SEO
      title="About"
      description={lang === 'fr' ? 'À propos de Lucas Sangkhavongs — étudiant EPITECH Lyon' : 'About Lucas Sangkhavongs — EPITECH Lyon student'}
      path="/about"
      image={Profile}
    />
    <div className="Rounded-rectangle">
      <img src={Profile} alt="Profile" className="Profile-rectangle" loading="lazy" decoding="async" />
      <a href="/CV_LucasSangkhavongs.pdf" download className="CV-download-btn">
        {lang === 'fr' ? 'Télécharger le CV' : 'Download CV'}
        <span className="DownloadArrow">
          <img src={DownloadIcon} alt="Download" width={22} height={22} />
        </span>
      </a>
      <div className="Profile-vertical-divider"></div>
      <div className="Profile-content">
        <h2 className='Profile-title'>Lucas Sangkhavongs</h2>
        <div className="Profile-subtitle">{status}</div>
        <p>
          {lang === 'fr'
            ? "Je m'appelle Lucas Sangkhavongs, j'ai 20 ans et je suis étudiant en deuxième année à EPITECH Lyon. Passionné d'informatique et de programmation."
            : "I'm Lucas Sangkhavongs, I'm 20 years old and a second-year EPITECH student based in Lyon, France. I'm passionate about programming and computers."}
          <br />
          <br />
          {lang === 'fr'
            ? "J'ai récemment lancé ButterflyNet, un serveur IRC privé et chiffré, accessible uniquement sur invitation."
            : "I recently launched ButterflyNet, a private encrypted IRC server — invite only."}
        </p>
      </div>
    </div>
  </div>
);

export default About;
