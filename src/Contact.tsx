import SEO from './components/SEO';

interface ContactProps { lang: 'fr' | 'en' }

export default function Contact({ lang }: ContactProps) {
  return (
    <div className="contact-container page-container fade-in">
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
    </div>
  );
}
