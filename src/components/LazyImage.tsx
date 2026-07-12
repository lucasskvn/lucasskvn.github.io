import { useState, useRef, useEffect } from 'react';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  placeholderColor?: string;
}

export default function LazyImage({ src, alt, className = '', style = {}, placeholderColor = 'var(--bg-card)' }: LazyImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [inView, setInView] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = imgRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={imgRef}
      className={`lazy-img-wrapper ${className}`}
      style={{
        ...style,
        position: 'relative',
        overflow: 'hidden',
        background: placeholderColor,
      }}
    >
      {/* Placeholder blur */}
      <div
        className="lazy-img-placeholder"
        style={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(135deg, ${placeholderColor}, color-mix(in srgb, ${placeholderColor} 80%, var(--accent) 20%))`,
          filter: 'blur(20px)',
          opacity: loaded ? 0 : 1,
          transition: 'opacity 0.4s ease-out',
        }}
      />

      {/* Real image */}
      {inView && (
        <img
          src={src}
          alt={alt}
          className={`lazy-img-real ${loaded ? 'lazy-img-loaded' : ''}`}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: loaded ? 1 : 0,
            transition: 'opacity 0.4s ease-out',
          }}
          onLoad={() => setLoaded(true)}
          onError={() => setLoaded(true)} // Hide placeholder even on error
        />
      )}
    </div>
  );
}
