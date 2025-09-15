import './home.css';

type HomeProps = {
  lang?: 'fr' | 'en';
};

const Home = ({ lang = 'en' }: HomeProps) => (
  <div className="Home-container fade-in-home">
    <h1>{lang === 'fr' ? 'Bienvenue !' : 'Welcome!'}</h1>
    <p>
      {lang === 'fr'
        ? 'Bienvenue sur le portfolio de Lucas Sangkhavongs.'
        : "Welcome to Lucas Sangkhavongs' portfolio."}
    </p>
  </div>
);

export default Home;
