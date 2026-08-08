'use client';

import { SectionReveal } from './section-reveal';

interface MarqueeProps {
  items: string[];
  className?: string;
  duration?: number;
  rotated?: boolean;
}

export function Marquee({ items, className = '', duration = 30, rotated = false }: MarqueeProps) {
  const row = [...items, ...items];

  return (
    <SectionReveal>
      <div className='relative overflow-hidden'>
        <div className={`border-y-2 border-foreground py-3.5 ${className} ${rotated ? '-rotate-2 scale-[1.03]' : ''}`}>
          <div
            className='animate-marquee flex w-max items-center gap-8 whitespace-nowrap'
            style={{ '--marquee-duration': `${duration}s` } as React.CSSProperties}
          >
            {row.map((item, i) => (
              <span key={i} className='flex items-center gap-8 text-display text-xl md:text-2xl font-bold uppercase tracking-tight'>
                <span className='h-2.5 w-2.5 rounded-full bg-current opacity-40' />
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </SectionReveal>
  );
}