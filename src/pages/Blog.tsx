import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import articles from '../data/articles';

export default function Blog({ lang }: { lang: 'fr' | 'en' }) {
  const [query, setQuery] = useState('');
  const [tag, setTag] = useState<string | null>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== '/') return;
      const tgt = e.target as HTMLElement | null;
      const tagName = tgt?.tagName;
      if (tagName === 'INPUT' || tagName === 'TEXTAREA') return;
      e.preventDefault();
      searchRef.current?.focus();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const allTags = Array.from(new Set(articles.flatMap(a => a.tags))).sort();

  const filtered = articles
    .filter(a => {
      if (tag && !a.tags.includes(tag)) return false;
      const q = query.trim().toLowerCase();
      if (!q) return true;
      return (
        a.title[lang].toLowerCase().includes(q) ||
        a.description[lang].toLowerCase().includes(q) ||
        a.tags.some(t => t.toLowerCase().includes(q))
      );
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <div className="page-container fade-in" data-code="06">
      <SEO
        title="Blog"
        description={lang === 'fr' ? 'Blog de Lucas Sangkhavongs' : "Lucas Sangkhavongs' blog"}
        path="/blog"
      />
      <h1 className="title">{lang === 'fr' ? 'Blog' : 'Blog'}</h1>
      <p className="subtitle">{lang === 'fr' ? 'Notes et articles.' : 'Notes and articles.'}</p>

      <div className="blog-controls">
        <div className="blog-search">
          <span className="blog-search-icon">⌕</span>
          <input
            ref={searchRef}
            type="search"
            className="blog-search-input"
            placeholder={lang === 'fr' ? 'Rechercher… (/)' : 'Search… (/)'}
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
        </div>
        <div className="blog-tags-filter">
          <button
            className={`blog-tag-filter-btn${tag === null ? ' active' : ''}`}
            onClick={() => setTag(null)}
          >
            {lang === 'fr' ? 'Tous' : 'All'}
          </button>
          {allTags.map(t => (
            <button
              key={t}
              className={`blog-tag-filter-btn${tag === t ? ' active' : ''}`}
              onClick={() => setTag(tag === t ? null : t)}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="blog-list">
        {filtered.length === 0 ? (
          <p className="empty-state">{lang === 'fr' ? 'Aucun article.' : 'No articles.'}</p>
        ) : (
          filtered.map(a => (
            <Link key={a.slug} to={`/blog/${a.slug}`} className="blog-card">
              <div className="blog-card-meta">
                <time className="blog-card-date">{a.date}</time>
                <div className="blog-card-tags">
                  {a.tags.map(t => (
                    <span key={t} className="blog-tag">{t}</span>
                  ))}
                </div>
              </div>
              <h2 className="blog-card-title">{a.title[lang]}</h2>
              <p className="blog-card-desc">{a.description[lang]}</p>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
