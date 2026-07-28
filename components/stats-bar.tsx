'use client';

import { SectionReveal } from './section-reveal';
import { Zap } from 'lucide-react';
import { useContent } from '@/lib/content-context';

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
          <p className='text-display font-extrabold text-5xl leading-none'>{stats.stat1?.value || '3+'}</p>
          <p className='mt-3 text-sm font-medium'>{stats.stat1?.label || 'years shipping full-stack'}</p>
        </div>
        <div className='rounded-3xl p-6 border-2 border-foreground bg-tangerine text-foreground'>
          <p className='text-display font-extrabold text-5xl leading-none'>{stats.stat2?.value || '4'}</p>
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