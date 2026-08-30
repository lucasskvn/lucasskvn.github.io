import SEO from '../components/SEO';

export default function NotFound({ lang }: { lang: 'fr' | 'en' }) {
  return (
    <div className="page-container fade-in">
      <SEO title="404" description="Page not found" />
      <div className="not-found">
        <h1 className="not-found-code aberrant">404</h1>
        <div className="no-signal" aria-hidden="true" />
        <p className="not-found-text">
          {lang === 'fr'
            ? 'NO SIGNAL — perdu dans le brouillard. Rien ne répond.'
            : 'NO SIGNAL — lost in the fog. Nothing answers.'}
        </p>
        <a href="/" className="not-found-link">{lang === 'fr' ? 'Retour à l\'accueil' : 'Back home'}</a>
      </div>
    </div>
  );
}
