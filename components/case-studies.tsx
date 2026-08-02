'use client';

import Link from 'next/link';
import { projects as defaultProjects } from '@/lib/data';
import { ProjectCard } from './project-card';
import { Sticker } from './sticker';
import { SectionReveal } from './section-reveal';
import { useContent } from '@/lib/content-context';

export function CaseStudies() {
  const content = useContent();
  const projects = content.projects || defaultProjects;

  return (
    <section className='mx-auto max-w-6xl px-5 md:px-8'>
      <SectionReveal>
        <div className='flex flex-wrap items-end justify-between gap-4 mb-10'>
          <div>
            <Sticker>🧪 Case studies</Sticker>
            <h2 className='text-display mt-4 font-extrabold' style={{ fontSize: 'clamp(2rem, 6vw, 4rem)' }}>
              Things I built <span className='gradient-text-cool'>because nobody asked.</span>
            </h2>
            <p className='mt-3 max-w-xl text-muted-foreground'>
              Four AI tools, all shipped self-initiated. Each one is written up as a proper product case study — problem → decisions → outcome.
            </p>
          </div>
          <Link href='/projects' className='text-sm font-semibold underline decoration-2 underline-offset-4 hover:text-accent'>
            All projects →
          </Link>
        </div>
      </SectionReveal>

      <div className='grid gap-6 md:grid-cols-2 [grid-auto-rows:1fr]'>
        {projects.map((project: any, i: number) => (
          <SectionReveal key={project.slug} delay={i * 100}>
            <ProjectCard project={project} />
          </SectionReveal>
        ))}
      </div>
    </section>
  );
}