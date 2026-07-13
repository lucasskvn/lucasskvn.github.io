import { useState, useEffect, useRef } from 'react';
import SEO from '../components/SEO';

/* ─── Matrix Rain ─── */
function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789';
    const fontSize = 14;
    const cols = Math.floor(canvas.width / fontSize);
    const drops: number[] = Array(cols).fill(1);

    const draw = () => {
      ctx.fillStyle = 'rgba(11, 15, 20, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#a259ff';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillStyle = Math.random() > 0.98 ? '#ff9100' : '#a259ff';
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <canvas ref={canvasRef} style={{ width: '100%', height: 300, borderRadius: 12, display: 'block' }} />
  );
}

/* ─── Starfield ─── */
function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    const stars: { x: number; y: number; z: number }[] = Array.from({ length: 200 }, () => ({
      x: Math.random() * canvas.width - canvas.width / 2,
      y: Math.random() * canvas.height - canvas.height / 2,
      z: Math.random() * canvas.width,
    }));

    const draw = () => {
      ctx.fillStyle = 'rgba(11, 15, 20, 0.15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      for (const star of stars) {
        star.z -= 3;
        if (star.z <= 0) {
          star.x = Math.random() * canvas.width - cx;
          star.y = Math.random() * canvas.height - cy;
          star.z = canvas.width;
        }

        const sx = (star.x / star.z) * canvas.width + cx;
        const sy = (star.y / star.z) * canvas.height + cy;
        const r = Math.max(0.5, 2 - star.z / 200);
        const b = Math.min(1, 1 - star.z / canvas.width);

        ctx.beginPath();
        ctx.arc(sx, sy, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(162, 89, 255, ${b})`;
        ctx.fill();
      }
    };

    const interval = setInterval(draw, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <canvas ref={canvasRef} style={{ width: '100%', height: 300, borderRadius: 12, display: 'block' }} />
  );
}

/* ─── Experiments ─── */
const experiments = [
  { id: 'matrix', title: { fr: 'Pluie Matrix', en: 'Matrix Rain' }, desc: { fr: 'Katakana qui tombent façon Matrix', en: 'Falling katakana Matrix-style' }, comp: MatrixRain },
  { id: 'starfield', title: { fr: 'Champ d\'étoiles', en: 'Starfield' }, desc: { fr: 'Warp speed à travers les étoiles', en: 'Warp speed through stars' }, comp: Starfield },
];

/* ─── Sites ─── */
const sites = [
  {
    title: 'Neocities',
    url: 'https://lucasskvn.neocities.org/',
    desc: { fr: 'Site artistique hébergé sur Neocities', en: 'Artistic site hosted on Neocities' },
  },
];

export default function Playground({ lang }: { lang: 'fr' | 'en' }) {
  const [active, setActive] = useState(experiments[0].id);
  const [preview, setPreview] = useState<string | null>(null);

  const current = experiments.find(e => e.id === active)!;

  return (
    <div className="page-container fade-in">
      <SEO
        title="Playground"
        description={lang === 'fr' ? 'Bac à sable interactif — expériences et sites artistiques' : 'Interactive sandbox — experiments and artistic sites'}
        path="/playground"
      />
      <h1 className="title">Playground</h1>
      <p className="subtitle">{lang === 'fr' ? 'Expériences interactives et sites artistiques' : 'Interactive experiments and artistic sites'}</p>

      {/* Experiments */}
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
        {experiments.map(exp => (
          <button
            key={exp.id}
            onClick={() => setActive(exp.id)}
            style={{
              padding: '0.5rem 1rem', borderRadius: 8, border: `1px solid ${active === exp.id ? 'var(--accent)' : 'var(--border)'}`,
              background: active === exp.id ? 'var(--accent)' : 'transparent',
              color: active === exp.id ? '#fff' : 'var(--text-secondary)',
              fontWeight: 600, cursor: 'pointer', fontSize: '0.85rem', fontFamily: 'inherit',
              transition: 'all 0.2s',
            }}
          >
            {exp.title[lang]}
          </button>
        ))}
      </div>

      <div style={{
        background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 16,
        padding: '1.5rem', marginBottom: '3rem',
      }}>
        <h3 style={{ margin: '0 0 0.25rem', color: 'var(--text-primary)', fontSize: '1.1rem' }}>{current.title[lang]}</h3>
        <p style={{ margin: '0 0 1rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>{current.desc[lang]}</p>
        <current.comp />
      </div>

      {/* Artistic Sites */}
      <h2 className="section-title">{lang === 'fr' ? 'Sites artistiques' : 'Artistic Sites'}</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
        {sites.map(site => (
          <div
            key={site.title}
            onClick={() => setPreview(site.url)}
            style={{
              display: 'flex', flexDirection: 'column', gap: '0.3rem',
              background: 'var(--bg-card)', border: '1px solid var(--border)',
              borderRadius: 16, padding: '1.25rem', cursor: 'pointer',
              transition: 'transform 0.2s, box-shadow 0.2s, border-color 0.2s',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)';
              (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 32px rgba(162, 89, 255, 0.12)';
              (e.currentTarget as HTMLElement).style.borderColor = 'color-mix(in srgb, var(--accent) 30%, var(--border))';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.transform = '';
              (e.currentTarget as HTMLElement).style.boxShadow = '';
              (e.currentTarget as HTMLElement).style.borderColor = '';
            }}
          >
            <span style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--accent)' }}>
              {site.title}
            </span>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              {site.desc[lang]}
            </span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'monospace', marginTop: '0.25rem' }}>
              {site.url}
            </span>
          </div>
        ))}
      </div>

      {/* Preview Modal */}
      {preview && (
        <div
          className="modal-overlay"
          onClick={() => setPreview(null)}
          style={{ zIndex: 200 }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              width: '90vw', height: '85vh', maxWidth: 1200,
              background: '#fff', borderRadius: 16, overflow: 'hidden',
              display: 'flex', flexDirection: 'column',
              boxShadow: '0 16px 64px rgba(0,0,0,0.5)',
            }}
          >
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '0.75rem 1rem', background: '#1a1a2e', color: '#fff',
            }}>
              <span style={{ fontSize: '0.85rem', fontFamily: 'monospace', color: '#aaa' }}>
                {preview}
              </span>
              <button
                onClick={() => setPreview(null)}
                style={{
                  background: 'none', border: 'none', color: '#fff', fontSize: '1.3rem',
                  cursor: 'pointer', padding: '0 0.25rem', lineHeight: 1,
                }}
              >
                ✕
              </button>
            </div>
            <iframe
              src={preview}
              title={preview}
              style={{ flex: 1, width: '100%', border: 'none' }}
              sandbox="allow-scripts allow-same-origin"
            />
          </div>
        </div>
      )}
    </div>
  );
}
