'use client';

import { tools as defaultTools } from '@/lib/data';
import { SectionReveal } from './section-reveal';
import { Sticker } from './sticker';
import { Spotlight } from './spotlight';
import { useContent } from '@/lib/content-context';

export function ToolsGrid() {
  const content = useContent();
  const tools = content.tools || defaultTools;

  return (
    <section className='mx-auto max-w-6xl px-5 md:px-8 mt-14 md:mt-16'>
      <SectionReveal>
        <Sticker>🛰️ What I&apos;m exploring</Sticker>
        <h2 className='text-display mt-4 font-extrabold' style={{ fontSize: 'clamp(2rem, 6vw, 4rem)' }}>
          The AI tools ecosystem, on my desk right now.
        </h2>
      </SectionReveal>

      <div className='mt-10 grid gap-3 grid-cols-2 md:grid-cols-4'>
        {tools.map((tool: any, i: number) => (
          <SectionReveal key={tool.name} delay={i * 60}>
            <Spotlight className='h-full rounded-2xl'>
              <div className='h-full rounded-2xl border-2 border-foreground bg-card p-5 card-tilt'>
                {tool.icon && (
                  <div
                    className='w-8 h-8 text-foreground mb-3'
                    dangerouslySetInnerHTML={{ __html: tool.icon }}
                  />
                )}
                <p className='text-display text-lg font-bold'>{tool.name}</p>
                <p className='mt-1 text-sm text-muted-foreground'>{tool.description}</p>
              </div>
            </Spotlight>
          </SectionReveal>
        ))}
      </div>
    </section>
  );
}