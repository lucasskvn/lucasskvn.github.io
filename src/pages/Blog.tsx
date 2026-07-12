import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import articles from '../data/articles';

export default function Blog({ lang }: { lang: 'fr' | 'en' }) {
  const sorted = [...articles].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="page-container fade-in">
      <SEO
        title="Blog"
        description={lang === 'fr' ? 'Blog de Lucas Sangkhavongs — dev, musique, projets' : "Lucas Sangkhavongs' blog — dev, music, projects"}
        path="/blog"
      />
      <h1 className="title">{lang === 'fr' ? 'Blog' : 'Blog'}</h1>
      <p className="subtitle">
        {lang === 'fr' ? 'Réflexions, projets, et découvertes.' : 'Thoughts, projects, and discoveries.'}
      </p>

      <div className="blog-list">
        {sorted.map(article => (
          <Link key={article.slug} to={`/blog/${article.slug}`} className="blog-card">
            <div className="blog-card-meta">
              <time className="blog-card-date">{article.date}</time>
              <div className="blog-card-tags">
                {article.tags.map(tag => (
                  <span key={tag} className="blog-tag">{tag}</span>
                ))}
              </div>
            </div>
            <h2 className="blog-card-title">{article.title[lang]}</h2>
            <p className="blog-card-desc">{article.description[lang]}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
