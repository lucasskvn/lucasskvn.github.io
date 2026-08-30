import SEO from '../components/SEO';
import Setup from '../components/Setup';

export default function Uses({ lang }: { lang: 'fr' | 'en' }) {
  return (
    <div className="page-container fade-in">
      <SEO
        title="Uses"
        description={lang === 'fr' ? 'Mon matériel et mes outils' : 'My gear and tools'}
        path="/uses"
      />
      <h1 className="title">Uses</h1>
      <p className="subtitle">
        {lang === 'fr'
          ? 'Le matériel et les outils avec lesquels je travaille.'
          : 'The gear and tools I work with.'}
      </p>

      <Setup lang={lang} />
    </div>
  );
}
