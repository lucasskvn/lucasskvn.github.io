import SEO from '../components/SEO';

export default function Blog({ lang }: { lang: 'fr' | 'en' }) {
  return (
    <div className="page-container fade-in">
      <SEO
        title="Blog"
        description={lang === 'fr' ? 'Blog de Lucas Sangkhavongs' : "Lucas Sangkhavongs' blog"}
        path="/blog"
      />
      <h1 className="title">{lang === 'fr' ? 'Blog' : 'Blog'}</h1>
      <p className="subtitle" style={{ textAlign: 'center', marginTop: '2rem', fontSize: '1.2rem' }}>
        {lang === 'fr' ? 'Welcome to my blog ✨' : 'Welcome to my blog ✨'}
      </p>
    </div>
  );
}
