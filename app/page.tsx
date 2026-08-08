'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { StatsBar } from '@/components/stats-bar';
import { CaseStudies } from '@/components/case-studies';
import { ToolsGrid } from '@/components/tools-grid';
import { CtaBanner } from '@/components/cta-banner';
import { Sticker } from '@/components/sticker';
import { SectionReveal } from '@/components/section-reveal';
import { Marquee } from '@/components/marquee';
import { useContent } from '@/lib/content-context';

const TICKER = [
  'React',
  'Next.js',
  '.NET Core',
  'AI Agents',
  'n8n',
  'TypeScript',
  'Product Discovery',
  'Azure',
  'Prompt Design',
  'Ollama',
  'Claude Code',
  'Roadmapping',
];

const ATTITUDE = [
  'Shipping beats perfect',
  'Idea → shipped → written up',
  'Scoped before stunning',
  'Metrics over vibes',
  'Fail fast, run post-mortems',
  'Demo-ready every Friday',
];

export default function Home() {
  const content = useContent();
  const hero = content.hero || {};

  return (
    <>
      {/* Hero */}
      <section className='relative overflow-hidden'>
        <div aria-hidden='true' className='pointer-events-none absolute -top-24 -left-24 h-[420px] w-[420px] rounded-full gradient-signature opacity-40 blur-3xl' />
        <div aria-hidden='true' className='pointer-events-none absolute top-40 -right-24 h-[360px] w-[360px] rounded-full gradient-cool opacity-35 blur-3xl' />
        <div className='mx-auto max-w-6xl px-5 md:px-8 pt-16 md:pt-24 pb-20 md:pb-32'>

          <SectionReveal delay={0} className='relative z-10'>
            <Sticker>{hero.sticker || '✨ Available for AI PM roles · Q3 2026'}</Sticker>
          </SectionReveal>

          <SectionReveal delay={100}>
            <h1
              className='text-display mt-6 font-extrabold leading-[0.9] tracking-tight'
              style={{ fontSize: 'clamp(3rem, 10vw, 8rem)' }}
            >
              {hero.heading?.line1 || 'Engineer who'} <br />
              <span className='gradient-text-signature-animate'>{hero.heading?.line2gradient || 'ships product,'}</span> <br />
              {hero.heading?.line3 || 'not just'} <span className='italic font-[family-name:var(--font-serif)]'>{hero.heading?.line3italic || 'code.'}</span>
            </h1>
          </SectionReveal>

          <SectionReveal delay={200}>
            <p
              className='mt-8 max-w-2xl text-lg md:text-xl text-muted-foreground'
              dangerouslySetInnerHTML={{ __html: hero.description || "I'm <strong>Vaibhav Narula</strong> — a senior .NET / React engineer with 3+ years of full-stack chops, quietly building an AI tools portfolio and pivoting into <strong>AI Product Management.</strong>" }}
            />
          </SectionReveal>

          <SectionReveal delay={300}>
            <div className='mt-10 flex flex-wrap gap-3'>
              <Link
                href={hero.cta?.primary?.href || '/projects'}
                className='group inline-flex items-center gap-2 rounded-full bg-foreground text-background px-6 py-3.5 font-semibold hover:opacity-90 transition'
              >
                {hero.cta?.primary?.label || 'View case studies'}
                <ArrowRight size={18} className='group-hover:translate-x-1 transition-transform' />
              </Link>
              <Link
                href={hero.cta?.secondary?.href || '/resume'}
                className='inline-flex items-center gap-2 rounded-full border-2 border-foreground px-6 py-3.5 font-semibold hover:bg-foreground hover:text-background transition'
              >
                {hero.cta?.secondary?.label || 'See the résumé'}
              </Link>
              <Link
                href={hero.cta?.tertiary?.href || '/contact'}
                className='inline-flex items-center gap-2 rounded-full px-6 py-3.5 font-semibold hover:bg-muted transition'
              >
                {hero.cta?.tertiary?.label || 'Say hi →'}
              </Link>
            </div>
          </SectionReveal>

          <div className='mt-16 md:mt-24'>
            <StatsBar />
          </div>
        </div>
      </section>

      <Marquee items={TICKER} rotated className='mt-4 md:mt-5 mb-10 md:mb-14 bg-card' />

      <CaseStudies />
      <Marquee items={ATTITUDE} duration={24} rotated className='mt-24 md:mt-32 mb-2 md:mb-3 bg-foreground text-background' />
      <ToolsGrid />
      <CtaBanner />
    </>
  );
}