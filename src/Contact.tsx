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
      <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginTop: '2rem', fontSize: '0.95rem' }}>
        {lang === 'fr'
          ? '🦋 Tu peux aussi me rejoindre sur ButterflyNet, mon serveur IRC privé — contacte-moi pour une invitation.'
          : '🦋 You can also find me on ButterflyNet, my private IRC server — reach out for an invite.'}
      </p>
    </div>
  );
}
