import { SectionReveal } from './section-reveal';
import { Zap } from 'lucide-react';

export function StatsBar() {
  return (
    <SectionReveal>
      <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
        <div className='col-span-2 rounded-3xl p-6 md:p-8 gradient-signature grain text-white border-2 border-foreground'>
          <p className='text-xs font-semibold uppercase tracking-widest opacity-80'>Currently</p>
          <p className='text-display text-2xl md:text-3xl font-bold mt-2 leading-tight'>
            Shipping AI tools while I earn the PM stripes.
          </p>
        </div>
        <div className='rounded-3xl p-6 border-2 border-foreground bg-card'>
          <p className='text-display font-extrabold text-5xl leading-none'>3+</p>
          <p className='mt-3 text-sm font-medium'>years shipping full-stack</p>
        </div>
        <div className='rounded-3xl p-6 border-2 border-foreground bg-tangerine text-foreground'>
          <p className='text-display font-extrabold text-5xl leading-none'>4</p>
          <p className='mt-3 text-sm font-medium'>AI tools built solo</p>
        </div>
        <div className='rounded-3xl p-6 border-2 border-foreground bg-card'>
          <p className='text-display font-extrabold text-5xl leading-none'>.NET</p>
          <p className='mt-3 text-sm font-medium'>+ React · Next · Azure</p>
        </div>
        <div className='rounded-3xl p-6 border-2 border-foreground bg-card'>
          <p className='text-xs font-semibold uppercase tracking-widest text-muted-foreground'>Certified</p>
          <p className='mt-2 font-semibold leading-snug'>Product Management · Cloud Architecture · AWS</p>
        </div>
        <div className='rounded-3xl p-6 border-2 border-foreground bg-lime text-foreground'>
          <Zap size={22} />
          <p className='mt-2 font-semibold leading-snug'>Obsessed with Claude Code, n8n, ComfyUI, ElevenLabs, Ollama.</p>
        </div>
      </div>
    </SectionReveal>
  );
}
