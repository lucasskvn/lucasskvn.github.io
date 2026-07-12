import SEO from '../components/SEO';

export default function NotFound() {
  return (
    <div className="page-container fade-in">
      <SEO title="404" description="Page not found" />
      <div className="not-found">
        <h1 className="not-found-code">404</h1>
        <p className="not-found-text">
          Cette page n'existe pas... ou a été dévorée par un bug.
        </p>
        <a href="/" className="not-found-link">Retour à l'accueil</a>
      </div>
    </div>
  );
}
