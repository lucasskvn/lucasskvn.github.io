import SEO from './components/SEO';
import TerminalWidget from './components/TerminalWidget';
import './home.css';

type HomeProps = {
  lang?: 'fr' | 'en';
};

const Home = ({ lang = 'en' }: HomeProps) => (
  <div className="Home-container fade-in-home">
    <SEO
      title="Home"
      description={lang === 'fr' ? 'Portfolio de Lucas Sangkhavongs — développeur, projets Epitech, musique' : "Lucas Sangkhavongs' portfolio — developer, Epitech projects, music"}
      path="/"
    />
    <div className="home-hero">
      <h1>{lang === 'fr' ? 'Bienvenue !' : 'Welcome!'}</h1>
      <p>
        {lang === 'fr'
          ? 'Bienvenue sur le portfolio de Lucas Sangkhavongs.'
          : "Welcome to Lucas Sangkhavongs' portfolio."}
      </p>
    </div>
    <TerminalWidget />
  </div>
);

export default Home;
