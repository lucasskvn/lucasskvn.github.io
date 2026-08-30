import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
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

        <div className="blog-content">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {article.content[lang]}
          </ReactMarkdown>
        </div>
      </article>
    </div>
  );
}
