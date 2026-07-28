'use client';

import { useState } from 'react';
import { projects as defaultProjects } from '@/lib/data';
import { ProjectCard } from '@/components/project-card';
import { SectionReveal } from '@/components/section-reveal';
import { Sticker } from '@/components/sticker';
import { useContent } from '@/lib/content-context';

const categories = ['All', 'AI Tools', 'Automation', 'Personal Branding', 'Productivity', 'GTM', 'Agents', 'Experiments'];

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const content = useContent();
  const projects = content.projects || defaultProjects;

  const filtered = activeCategory === 'All'
    ? projects
    : projects.filter((p: any) => p.category === activeCategory);

  return (
    <section className='mx-auto max-w-6xl px-5 md:px-8 py-16 md:py-24'>
      <SectionReveal>
        <Sticker>📦 The catalog</Sticker>
        <h1 className='text-display mt-6 font-extrabold' style={{ fontSize: 'clamp(2.5rem, 8vw, 6rem)' }}>
          Projects &<br /><span className='gradient-text-signature'>experiments.</span>
        </h1>
        <p className='mt-4 max-w-2xl text-lg text-muted-foreground'>
          Everything below was built self-initiated. No client brief, no PRD — just a hunch, a weekend, and the pipeline to ship it.
        </p>
      </SectionReveal>

      <div className='mt-8 flex flex-wrap gap-2'>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium border-2 transition-all ${
              activeCategory === cat
                ? 'border-foreground bg-foreground text-background'
                : 'border-border bg-card text-muted-foreground hover:border-foreground'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className='mt-10 grid gap-6 md:grid-cols-2'>
        {filtered.map((project: any, i: number) => (
          <SectionReveal key={project.slug} delay={i * 80}>
            <ProjectCard project={project} />
          </SectionReveal>
        ))}
      </div>
    </section>
  );
}