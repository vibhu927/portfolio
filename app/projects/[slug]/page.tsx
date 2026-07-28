'use client';

import { notFound } from 'next/navigation';
import Link from 'next/link';
import { projects as defaultProjects } from '@/lib/data';
import { Sticker } from '@/components/sticker';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { useContent } from '@/lib/content-context';
import { useParams } from 'next/navigation';

export default function ProjectDetail() {
  const params = useParams();
  const slug = params.slug as string;
  const content = useContent();
  const projects = content.projects || defaultProjects;
  const project = projects.find((p: any) => p.slug === slug);

  if (!project) return notFound();

  return (
    <section className='mx-auto max-w-6xl px-5 md:px-8 py-16 md:py-24'>
      <Link
        href='/projects'
        className='inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition mb-8'
      >
        <ArrowLeft size={16} /> All projects
      </Link>

      <div className={`relative aspect-[16/5] rounded-3xl overflow-hidden bg-gradient-to-br ${project.gradient} grain mb-10`}>
        <div className='absolute inset-0 flex items-center justify-center'>
          {project.image ? (
            <img src={project.image} alt={project.title} className='max-h-full max-w-full object-contain' />
          ) : (
            <span className='text-[12rem] md:text-[16rem] leading-none drop-shadow-xl'>{project.emoji}</span>
          )}
        </div>
        <span className='absolute top-6 left-6 sticker'>🚀 Shipped</span>
      </div>

      <div className='max-w-3xl'>
        <Sticker>🧪 Case study</Sticker>
        <h1 className='text-display mt-6 font-extrabold' style={{ fontSize: 'clamp(2.5rem, 7vw, 5rem)' }}>
          {project.title}
        </h1>
        <p className='mt-4 text-lg text-muted-foreground leading-relaxed'>{project.description}</p>
        <div className='mt-6 flex flex-wrap gap-2'>
          {project.tags?.map((tag: string) => (
            <span key={tag} className='text-sm px-3 py-1.5 rounded-full border-2 border-foreground bg-card font-medium'>
              {tag}
            </span>
          ))}
        </div>
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target='_blank'
            rel='noreferrer'
            className='mt-6 inline-flex items-center gap-2 rounded-full bg-foreground text-background px-6 py-3 font-semibold hover:opacity-90 transition'
          >
            <ExternalLink size={16} /> Visit live project
          </a>
        )}
      </div>

      <div className='mt-16 space-y-16 max-w-3xl'>
        <div>
          <h2 className='text-display text-2xl font-bold mb-4'>The Problem</h2>
          <p className='text-muted-foreground leading-relaxed'>
            {project.problem || 'This project was born from a personal pain point — a gap in the market that no existing tool addressed well enough.'}
          </p>
        </div>
        <div>
          <h2 className='text-display text-2xl font-bold mb-4'>Key Decisions</h2>
          <p className='text-muted-foreground leading-relaxed'>
            {project.keyDecisions || `The stack was chosen for speed and reliability: ${project.tags?.join(', ')}. Each choice was driven by what would ship fastest without compromising on quality.`}
          </p>
        </div>
        <div>
          <h2 className='text-display text-2xl font-bold mb-4'>Outcome</h2>
          <p className='text-muted-foreground leading-relaxed'>
            {project.outcome || 'Shipped end-to-end, self-initiated, and fully documented. A proper case study from problem to outcome.'}
          </p>
        </div>
      </div>
    </section>
  );
}