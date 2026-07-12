import { useParams, Link } from 'react-router-dom';
import SEO from '../components/SEO';
import articles from '../data/articles';

export default function Article({ lang }: { lang: 'fr' | 'en' }) {
  const { slug } = useParams<{ slug: string }>();
  const article = articles.find(a => a.slug === slug);

  if (!article) {
    return (
      <div className="page-container fade-in">
        <h1 className="title">404</h1>
        <p className="subtitle">{lang === 'fr' ? 'Article non trouvé' : 'Article not found'}</p>
        <Link to="/blog" style={{ color: 'var(--accent)' }}>
          {lang === 'fr' ? 'Retour au blog' : 'Back to blog'}
        </Link>
      </div>
    );
  }

  // Simple markdown-like rendering (no deps needed for basic content)
  const renderContent = (md: string) => {
    const lines = md.split('\n');
    const html: string[] = [];
    let inList = false;

    for (const line of lines) {
      if (line.startsWith('## ')) {
        if (inList) { html.push('</ul>'); inList = false; }
        html.push(`<h2>${line.slice(3)}</h2>`);
      } else if (line.startsWith('### ')) {
        if (inList) { html.push('</ul>'); inList = false; }
        html.push(`<h3>${line.slice(4)}</h3>`);
      } else if (line.startsWith('- ')) {
        if (!inList) { html.push('<ul>'); inList = true; }
        html.push(`<li>${line.slice(2)}</li>`);
      } else if (line.startsWith('**') && line.endsWith('**')) {
        if (inList) { html.push('</ul>'); inList = false; }
        html.push(`<p><strong>${line.slice(2, -2)}</strong></p>`);
      } else if (line.trim() === '') {
        if (inList) { html.push('</ul>'); inList = false; }
      } else {
        if (inList) { html.push('</ul>'); inList = false; }
        // Bold inline
        const processed = line.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
        html.push(`<p>${processed}</p>`);
      }
    }
    if (inList) html.push('</ul>');
    return html.join('\n');
  };

  return (
    <div className="page-container fade-in">
      <SEO
        title={article.title[lang]}
        description={article.description[lang]}
        path={`/blog/${article.slug}`}
      />

      <Link to="/blog" className="blog-back">
        ← {lang === 'fr' ? 'Retour au blog' : 'Back to blog'}
      </Link>

      <article className="blog-article">
        <header className="blog-article-header">
          <time className="blog-card-date">{article.date}</time>
          <div className="blog-card-tags">
            {article.tags.map(tag => (
              <span key={tag} className="blog-tag">{tag}</span>
            ))}
          </div>
          <h1 className="title">{article.title[lang]}</h1>
        </header>

        <div
          className="blog-content"
          dangerouslySetInnerHTML={{ __html: renderContent(article.content[lang]) }}
        />
      </article>
    </div>
  );
}
