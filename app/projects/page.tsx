'use client';

import { useState } from 'react';
import { projects } from '@/lib/data';
import { ProjectCard } from '@/components/project-card';
import { SectionReveal } from '@/components/section-reveal';
import { Sticker } from '@/components/sticker';
import Link from 'next/link';

const categories = ['All', 'AI Tools', 'Automation', 'Personal Branding', 'Productivity', 'GTM', 'Agents', 'Experiments'];

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = activeCategory === 'All'
    ? projects
    : projects.filter((p) => p.category === activeCategory);

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
        {filtered.map((project, i) => (
          <SectionReveal key={project.slug} delay={i * 80}>
            <ProjectCard project={project} />
          </SectionReveal>
        ))}
      </div>

      {/* <div className='mt-16 text-center'>
        <p className='text-display text-2xl md:text-3xl font-bold'>
          Building things.<br />
          <span className='gradient-text-signature'>Let's build one together.</span>
        </p>
        <Link
          href='/contact'
          className='mt-6 inline-flex items-center gap-2 rounded-full bg-foreground text-background px-6 py-3 font-semibold hover:opacity-90 transition'
        >
          Start a conversation →
        </Link>
      </div> */}
    </section>
  );
}
