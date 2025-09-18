interface ContactProps { lang: 'fr' | 'en' }

export default function Contact({ lang }: ContactProps) {
  return (
    <div className="contact-container">
      <h1 className="title">{lang === 'fr' ? 'Contact' : 'Contact'}</h1>
      <p className="description">
        {lang === 'fr'
          ? "Vous pouvez me contacter à l'adresse : lucas.sangkhavongs@epitech.eu"
          : "You can contact me at : lucas.sangkhavongs@epitech.eu"}
      </p>
    </div>
  );
}