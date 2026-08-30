import SEO from './components/SEO';
import linkedinLogo from './assets/linkedin.svg';
import githubLogo from './assets/github.png';
import mailLogo from './assets/mail.png';
import './Contact.css';

const email = "lucas.sangkhavongs@epitech.eu";
const linkedin = "https://www.linkedin.com/in/lucas-sangkhavongs/";
const github = "https://github.com/lucasskvn";

interface ContactProps { lang: 'fr' | 'en' }

export default function Contact({ lang }: ContactProps) {
  return (
    <div className="contact-container page-container fade-in" data-code="05">
      <SEO
        title="Contact"
        description={lang === 'fr' ? 'Contacter Lucas Sangkhavongs' : 'Contact Lucas Sangkhavongs'}
        path="/contact"
      />
      <h1 className="title">{lang === 'fr' ? 'Contact' : 'Contact'}</h1>
      <p className="subtitle">
        {lang === 'fr'
          ? "Vous pouvez me contacter à l'adresse : lucas.sangkhavongs@epitech.eu"
          : "You can contact me at : lucas.sangkhavongs@epitech.eu"}
      </p>

      <div className="contact-socials">
        <a href={linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          <img src={linkedinLogo} alt="LinkedIn" className="SocialLogo" />
        </a>
        <a href={github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
          <img src={githubLogo} alt="GitHub" className="SocialLogo" />
        </a>
        <a href={`mailto:${email}`} aria-label="Email">
          <img src={mailLogo} alt="Email" className="SocialLogo" />
        </a>
      </div>

      <p style={{ textAlign: 'center', marginTop: '2.5rem' }}>
        <a
          href="https://chat.2bananas4monkeys.org/"
          target="_blank"
          rel="noopener noreferrer"
          className="butterflynet-link"
        >
          {lang === 'fr' ? 'Rejoindre ButterflyNet (IRC)' : 'Join ButterflyNet (IRC)'}
        </a>
      </p>
    </div>
  );
}
