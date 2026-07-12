import { useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import articles from '../data/articles';

export default function Blog({ lang }: { lang: 'fr' | 'en' }) {
  const [search, setSearch] = useState('');
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const allTags = [...new Set(articles.flatMap(a => a.tags))].sort();

  const filtered = articles
    .filter(a => {
      if (activeTag && !a.tags.includes(activeTag)) return false;
      if (search) {
        const q = search.toLowerCase();
        const title = a.title[lang].toLowerCase();
        const desc = a.description[lang].toLowerCase();
        const content = a.content[lang].toLowerCase();
        if (!title.includes(q) && !desc.includes(q) && !content.includes(q)) return false;
      }
      return true;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

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

      <div className="blog-controls">
        <div className="blog-search">
          <svg className="blog-search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            className="blog-search-input"
            placeholder={lang === 'fr' ? 'Rechercher un article...' : 'Search articles...'}
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="blog-tags-filter">
          <button
            className={`blog-tag-filter-btn${activeTag === null ? ' active' : ''}`}
            onClick={() => setActiveTag(null)}
          >
            {lang === 'fr' ? 'Tous' : 'All'}
          </button>
          {allTags.map(tag => (
            <button
              key={tag}
              className={`blog-tag-filter-btn${activeTag === tag ? ' active' : ''}`}
              onClick={() => setActiveTag(activeTag === tag ? null : tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <div className="blog-list">
        {filtered.length === 0 ? (
          <p className="empty-state">
            {lang === 'fr' ? 'Aucun article trouvé.' : 'No articles found.'}
          </p>
        ) : (
          filtered.map(article => (
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
          ))
        )}
      </div>
    </div>
  );
}
