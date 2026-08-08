'use client';

import { useEffect, useRef, useState } from 'react';
import { SectionReveal } from './section-reveal';
import { Zap } from 'lucide-react';
import { useContent } from '@/lib/content-context';

function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const match = value.match(/^(\d+)(.*)$/);
    if (!match) {
      setDisplay(value);
      return;
    }

    const target = parseInt(match[1], 10);
    const suffix = match[2];

    let started = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!started && entry.isIntersecting) {
          started = true;
          const duration = 1400;
          const start = performance.now();
          const tick = (now: number) => {
            const t = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - t, 3);
            setDisplay(`${Math.round(eased * target)}${suffix}`);
            if (t < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          observer.unobserve(el);
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <p ref={ref} className='text-display font-extrabold text-5xl leading-none tabular-nums'>
      {display}
    </p>
  );
}

export function StatsBar() {
  const content = useContent();
  const stats = content.stats || {};

  return (
    <SectionReveal>
      <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
        <div className='col-span-2 rounded-3xl p-6 md:p-8 gradient-signature grain text-white border-2 border-foreground'>
          <p className='text-xs font-semibold uppercase tracking-widest opacity-80'>Currently</p>
          <p className='text-display text-2xl md:text-3xl font-bold mt-2 leading-tight'>
            {stats.currently || 'Shipping AI tools while I earn the PM stripes.'}
          </p>
        </div>
        <div className='rounded-3xl p-6 border-2 border-foreground bg-card'>
          <CountUp value={stats.stat1?.value || '3+'} />
          <p className='mt-3 text-sm font-medium'>{stats.stat1?.label || 'years shipping full-stack'}</p>
        </div>
        <div className='rounded-3xl p-6 border-2 border-foreground bg-tangerine text-foreground'>
          <CountUp value={stats.stat2?.value || '4'} />
          <p className='mt-3 text-sm font-medium'>{stats.stat2?.label || 'AI tools built solo'}</p>
        </div>
        <div className='rounded-3xl p-6 border-2 border-foreground bg-card'>
          <p className='text-display font-extrabold text-5xl leading-none'>{stats.stat3?.value || '.NET'}</p>
          <p className='mt-3 text-sm font-medium'>{stats.stat3?.label || '+ React · Next · Azure'}</p>
        </div>
        <div className='rounded-3xl p-6 border-2 border-foreground bg-card'>
          <p className='text-xs font-semibold uppercase tracking-widest text-muted-foreground'>{stats.stat4?.value || 'Certified'}</p>
          <p className='mt-2 font-semibold leading-snug'>{stats.stat4?.label || 'Product Management · Cloud Architecture · AWS'}</p>
        </div>
        <div className='rounded-3xl p-6 border-2 border-foreground bg-lime text-foreground md:col-span-2'>
          <Zap size={22} />
          <p className='mt-2 font-semibold leading-snug'>{stats.stat5 || 'Obsessed with Claude Code, n8n, ComfyUI, ElevenLabs, Ollama.'}</p>
        </div>
      </div>
    </SectionReveal>
  );
}