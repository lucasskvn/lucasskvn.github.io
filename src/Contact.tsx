interface ContactProps { lang: 'fr' | 'en' }

export default function Contact({ lang }: ContactProps) {
  return (
    <div style={{ padding: "2rem", color: "#fff" }}>
      <h1>{lang === 'fr' ? 'Contact' : 'Contact'}</h1>
      <p>
        {lang === 'fr'
          ? "Vous pouvez me contacter à l'adresse : lucas.sangkhavongs@epitech.eu"
          : "You can contact me at: lucas.sangkhavongs@epitech.eu"}
      </p>
    </div>
  );
}