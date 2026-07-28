'use client';

import { useEffect, useRef } from 'react';

export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleMouseMove = (e: MouseEvent) => {
      el.style.opacity = '1';
      el.style.transform = `translate(${e.clientX - 200}px, ${e.clientY - 200}px)`;
    };

    const handleMouseLeave = () => {
      el.style.opacity = '0';
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.body.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={ref}
      className='pointer-events-none fixed top-0 left-0 z-50 h-[400px] w-[400px] rounded-full opacity-0 transition-opacity duration-300'
      style={{
        background: 'radial-gradient(circle, rgba(160, 60, 200, 0.25) 0%, rgba(220, 80, 120, 0.15) 35%, rgba(240, 140, 60, 0.08) 60%, transparent 75%)',
        filter: 'blur(50px)',
      }}
      aria-hidden='true'
    />
  );
}