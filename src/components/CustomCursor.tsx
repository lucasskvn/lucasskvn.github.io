import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only on desktop
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const cursor = cursorRef.current;
    const dot = dotRef.current;
    if (!cursor || !dot) return;

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    };

    const animate = () => {
      cursorX += (mouseX - cursorX) * 0.15;
      cursorY += (mouseY - cursorY) * 0.15;
      cursor.style.transform = `translate(${cursorX - 12}px, ${cursorY - 12}px)`;
      requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', onMouseMove);
    animate();

    // Hide cursor on interactive elements
    const addHover = () => cursor.classList.add('cursor-hover');
    const rmHover = () => cursor.classList.remove('cursor-hover');

    document.querySelectorAll('a, button, span[role="button"], input, .project-card, .track-row, .artist-card, .blog-card')
      .forEach(el => {
        el.addEventListener('mouseenter', addHover);
        el.addEventListener('mouseleave', rmHover);
      });

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.querySelectorAll('a, button, span[role="button"], input, .project-card, .track-row, .artist-card, .blog-card')
        .forEach(el => {
          el.removeEventListener('mouseenter', addHover);
          el.removeEventListener('mouseleave', rmHover);
        });
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="custom-cursor" />
      <div ref={dotRef} className="custom-cursor-dot" />
    </>
  );
}
