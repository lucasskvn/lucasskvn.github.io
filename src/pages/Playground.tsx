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
    <canvas ref={canvasRef} style={{ width: '100%', height: 200, borderRadius: 12, display: 'block' }} />
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
    <canvas ref={canvasRef} style={{ width: '100%', height: 200, borderRadius: 12, display: 'block' }} />
  );
}

/* ─── Color Picker ─── */
function ColorPicker() {
  const [hue, setHue] = useState(270);
  const [saturation, setSaturation] = useState(100);
  const [lightness, setLightness] = useState(50);

  const color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ width: '100%', height: 80, borderRadius: 10, background: color, transition: 'background 0.2s' }} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <label style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
          Hue <span>{hue}°</span>
        </label>
        <input type="range" min={0} max={360} value={hue} onChange={e => setHue(+e.target.value)} style={{ width: '100%', accentColor: color }} />
        <label style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
          Saturation <span>{saturation}%</span>
        </label>
        <input type="range" min={0} max={100} value={saturation} onChange={e => setSaturation(+e.target.value)} style={{ width: '100%', accentColor: color }} />
        <label style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
          Lightness <span>{lightness}%</span>
        </label>
        <input type="range" min={0} max={100} value={lightness} onChange={e => setLightness(+e.target.value)} style={{ width: '100%', accentColor: color }} />
      </div>
      <code style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textAlign: 'center' }}>{color}</code>
    </div>
  );
}

/* ─── Bouncy Balls ─── */
function BouncyBalls() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    const balls = Array.from({ length: 15 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 4,
      vy: (Math.random() - 0.5) * 4,
      r: Math.random() * 12 + 6,
      hue: Math.random() * 360,
    }));

    const draw = () => {
      ctx.fillStyle = 'rgba(11, 15, 20, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (const b of balls) {
        b.x += b.vx;
        b.y += b.vy;
        if (b.x < b.r || b.x > canvas.width - b.r) b.vx *= -1;
        if (b.y < b.r || b.y > canvas.height - b.r) b.vy *= -1;

        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsl(${b.hue}, 80%, 60%)`;
        ctx.fill();
        b.hue = (b.hue + 1) % 360;
      }
    };

    const interval = setInterval(draw, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <canvas ref={canvasRef} style={{ width: '100%', height: 200, borderRadius: 12, display: 'block' }} />
  );
}

/* ─── ASCII Art Generator ─── */
function AsciiArt() {
  const [text, setText] = useState('lucasskvn');
  const [art, setArt] = useState('');

  const generate = () => {
    if (!text) { setArt(''); return; }
    const chars = '@%#*+=-:. ';
    const lines: string[] = [];
    const w = 40;
    const h = 8;
    for (let y = 0; y < h; y++) {
      let line = '';
      for (let x = 0; x < w; x++) {
        const i = Math.floor(Math.random() * chars.length);
        line += chars[i];
      }
      lines.push(line);
    }
    // Insert text in the middle
    const mid = Math.floor(h / 2);
    const start = Math.floor((w - text.length) / 2);
    const arr = lines[mid].split('');
    for (let i = 0; i < text.length; i++) {
      if (start + i < w) arr[start + i] = text[i];
    }
    lines[mid] = arr.join('');
    setArt(lines.join('\n'));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div style={{ display: 'flex', gap: 8 }}>
        <input
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Type something..."
          style={{
            flex: 1, padding: '0.5rem 0.75rem', borderRadius: 8, border: '1px solid var(--border)',
            background: 'var(--bg-card)', color: 'var(--text-primary)', fontFamily: 'inherit', fontSize: '0.9rem', outline: 'none',
          }}
          onKeyDown={e => e.key === 'Enter' && generate()}
        />
        <button onClick={generate} style={{
          padding: '0.5rem 1rem', borderRadius: 8, border: 'none', background: 'var(--accent)', color: '#fff',
          fontWeight: 600, cursor: 'pointer', fontSize: '0.85rem',
        }}>Go</button>
      </div>
      {art && (
        <pre style={{
          background: '#0d1117', color: '#3fb950', padding: '1rem', borderRadius: 10,
          fontSize: '0.7rem', lineHeight: 1.2, overflow: 'auto', margin: 0, fontFamily: 'monospace',
        }}>{art}</pre>
      )}
    </div>
  );
}

/* ─── Main Page ─── */
const experiments = [
  { id: 'matrix', title: { fr: 'Pluie Matrix', en: 'Matrix Rain' }, desc: { fr: 'Katakana qui tombent façon Matrix', en: 'Falling katakana Matrix-style' }, comp: MatrixRain },
  { id: 'starfield', title: { fr: 'Champ d\'étoiles', en: 'Starfield' }, desc: { fr: 'Warp speed à travers les étoiles', en: 'Warp speed through stars' }, comp: Starfield },
  { id: 'bounce', title: { fr: 'Balles rebondissantes', en: 'Bouncy Balls' }, desc: { fr: 'Des balles colorées qui rebondissent', en: 'Colorful bouncing balls' }, comp: BouncyBalls },
  { id: 'color', title: { fr: 'Nuancier HSL', en: 'HSL Picker' }, desc: { fr: 'Joue avec les couleurs en temps réel', en: 'Play with colors in real-time' }, comp: ColorPicker },
  { id: 'ascii', title: { fr: 'ASCII Art', en: 'ASCII Art' }, desc: { fr: 'Génère du texte en art ASCII', en: 'Generate ASCII text art' }, comp: AsciiArt },
];

export default function Playground({ lang }: { lang: 'fr' | 'en' }) {
  const [active, setActive] = useState(experiments[0].id);

  const current = experiments.find(e => e.id === active)!;

  return (
    <div className="page-container fade-in">
      <SEO
        title="Playground"
        description={lang === 'fr' ? 'Bac à sable interactif — expériences CSS/JS' : 'Interactive sandbox — CSS/JS experiments'}
        path="/playground"
      />
      <h1 className="title">Playground</h1>
      <p className="subtitle">{lang === 'fr' ? 'Bac à sable interactif' : 'Interactive sandbox'}</p>

      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
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
        padding: '1.5rem', marginBottom: '2rem',
      }}>
        <h3 style={{ margin: '0 0 0.25rem', color: 'var(--text-primary)', fontSize: '1.1rem' }}>{current.title[lang]}</h3>
        <p style={{ margin: '0 0 1rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>{current.desc[lang]}</p>
        <current.comp />
      </div>
    </div>
  );
}
