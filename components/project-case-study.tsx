'use client';

import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Layers,
  Shield,
  Workflow,
  BarChart3,
  Users,
  Settings,
  Sparkles,
  MessageSquare,
  Calendar,
  Mail,
  Search,
  Target,
} from 'lucide-react';
import { Project } from '@/lib/data';
import { Sticker } from '@/components/sticker';
import { Spotlight } from '@/components/spotlight';
import { SectionReveal } from '@/components/section-reveal';
import { ProjectCard } from '@/components/project-card';

const MODULE_ICONS = [Layers, Shield, Workflow, BarChart3, Users, Settings, Sparkles, MessageSquare, Calendar, Mail, Search, Target];

const WHO_TINT: Record<string, string> = {
  'bg-violet': 'bg-violet text-white',
  'bg-hotpink': 'bg-hotpink text-white',
  'bg-tangerine': 'bg-tangerine text-foreground',
  'bg-cyan': 'bg-cyan text-foreground',
  'bg-lime': 'bg-lime text-foreground',
  'bg-indigo': 'bg-indigo text-white',
};

const NEXT_TINT: Record<string, string> = {
  'bg-violet': 'bg-hotpink text-white',
  'bg-hotpink': 'bg-tangerine text-foreground',
  'bg-tangerine': 'bg-lime text-foreground',
  'bg-cyan': 'bg-violet text-white',
  'bg-lime': 'bg-cyan text-foreground',
  'bg-indigo': 'bg-hotpink text-white',
};

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
}

const TRIAD = [
  { key: 'problemPoints' as const, label: 'The problem', index: '01', tint: 'bg-card' },
  { key: 'decisionPoints' as const, label: 'Key decisions', index: '02', tint: 'bg-card' },
  { key: 'outcomePoints' as const, label: 'Outcome', index: '03', tint: 'bg-card' },
];

export function ProjectCaseStudy({ project, related }: { project: Project; related: Project[] }) {
  const whoTint = WHO_TINT[project.dotColor] || 'bg-lime text-foreground';
  const nextTint = NEXT_TINT[project.dotColor] || 'bg-hotpink text-white';
  const overview = project.overview || stripHtml(project.description || '');
  const whoFor = project.whoFor || [];
  const modules = project.modules || [];
  const workflow = project.workflow || [];
  const next = project.next || [];
  const impact = (project.outcomePoints || []).slice(0, 4);

  return (
    <section className='mx-auto max-w-6xl px-5 md:px-8 py-16 md:py-24'>
      <Link
        href='/projects'
        className='inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition mb-8'
      >
        <ArrowLeft size={16} /> All projects
      </Link>

      <SectionReveal>
        <div className={`relative aspect-[16/5] rounded-3xl overflow-hidden bg-gradient-to-br ${project.gradient} grain mb-10 border-2 border-foreground`}>
          <div className='absolute inset-0 flex items-center justify-center'>
            {project.image ? (
              <img src={project.image} alt={project.title} className='max-h-[70%] max-w-[70%] object-contain' />
            ) : (
              <span className='text-[12rem] md:text-[16rem] leading-none drop-shadow-xl'>{project.emoji}</span>
            )}
          </div>
          <span className='absolute top-6 left-6 sticker'>🚀 Shipped</span>
          {project.category && (
            <span className='absolute top-6 right-6 sticker' style={{ transform: 'rotate(2deg)' }}>
              {project.category}
            </span>
          )}
        </div>
      </SectionReveal>

      <SectionReveal delay={40}>
        <div className='flex flex-col md:flex-row md:items-end md:justify-between gap-6'>
          <div className='max-w-3xl'>
            <Sticker>🧪 Case study</Sticker>
            <h1 className='text-display mt-6 font-extrabold' style={{ fontSize: 'clamp(2.5rem, 7vw, 5rem)' }}>
              {project.title}
            </h1>
            <p className='mt-4 text-lg text-muted-foreground leading-relaxed'>{overview}</p>
          </div>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target='_blank'
              rel='noreferrer'
              className='inline-flex shrink-0 items-center gap-2 rounded-full bg-foreground text-background px-6 py-3 font-semibold hover:opacity-90 transition'
            >
              <ExternalLink size={16} /> Visit live project
            </a>
          )}
        </div>
      </SectionReveal>

      <SectionReveal delay={80}>
        <div className='mt-10 grid grid-cols-2 md:grid-cols-4 gap-3'>
          <div className='rounded-3xl border-2 border-foreground bg-card p-5'>
            <p className='text-xs font-semibold uppercase tracking-widest text-muted-foreground'>Role</p>
            <p className='mt-2 text-display text-lg font-bold leading-tight'>{project.role || 'Solo build · product + engineering'}</p>
          </div>
          <div className='rounded-3xl border-2 border-foreground bg-card p-5'>
            <p className='text-xs font-semibold uppercase tracking-widest text-muted-foreground'>Category</p>
            <p className='mt-2 text-display text-lg font-bold leading-tight'>{project.category}</p>
          </div>
          <div className='rounded-3xl border-2 border-foreground bg-tangerine p-5'>
            <p className='text-xs font-semibold uppercase tracking-widest'>Stack</p>
            <p className='mt-2 text-sm font-semibold leading-snug'>{project.tags?.join(' · ')}</p>
          </div>
          <div className='rounded-3xl border-2 border-foreground bg-lime p-5'>
            <p className='text-xs font-semibold uppercase tracking-widest'>Status</p>
            <p className='mt-2 text-display text-lg font-bold leading-tight'>Shipped</p>
          </div>
        </div>
      </SectionReveal>

      <div className='mt-6 grid gap-3 md:grid-cols-2'>
        <SectionReveal delay={100}>
          <div className={`h-full rounded-3xl border-2 border-foreground p-6 md:p-8 ${whoTint}`}>
            <p className='text-xs font-semibold uppercase tracking-widest opacity-80'>Who it is for</p>
            <h2 className='text-display text-3xl font-extrabold mt-2'>The people this ships for</h2>
            <ul className='mt-5 space-y-3'>
              {whoFor.map((item) => (
                <li key={item} className='flex gap-3 text-sm md:text-base font-medium leading-snug'>
                  <span className='mt-1 h-2 w-2 shrink-0 rounded-full bg-current' />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </SectionReveal>
        <SectionReveal delay={140}>
          <div className='h-full rounded-3xl border-2 border-foreground bg-card p-6 md:p-8'>
            <p className='text-xs font-semibold uppercase tracking-widest text-muted-foreground'>Built with</p>
            <h2 className='text-display text-3xl font-extrabold mt-2'>Stack on the desk</h2>
            <div className='mt-5 flex flex-wrap gap-2'>
              {project.tags?.map((tag) => (
                <span key={tag} className='text-sm px-3 py-1.5 rounded-full border-2 border-foreground bg-muted font-medium'>
                  {tag}
                </span>
              ))}
            </div>
            <p className='mt-6 text-sm text-muted-foreground leading-relaxed'>
              Choices were made for ship speed, a clean module boundary, and room to add AI later without rewriting the core.
            </p>
          </div>
        </SectionReveal>
      </div>

      {modules.length > 0 && (
        <SectionReveal delay={80}>
          <div className='mt-16'>
            <Sticker>⚙️ Product surface</Sticker>
            <h2 className='text-display mt-4 font-extrabold' style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}>
              What the product actually does
            </h2>
            <div className='mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3'>
              {modules.map((mod, i) => {
                const Icon = MODULE_ICONS[i % MODULE_ICONS.length];
                return (
                  <Spotlight key={mod.title} className='h-full rounded-3xl'>
                    <div className='h-full rounded-3xl border-2 border-foreground bg-card p-5 md:p-6'>
                      <Icon size={22} />
                      <p className='text-display text-xl font-bold mt-3'>{mod.title}</p>
                      <p className='mt-2 text-sm text-muted-foreground leading-relaxed'>{mod.detail}</p>
                    </div>
                  </Spotlight>
                );
              })}
            </div>
          </div>
        </SectionReveal>
      )}

      {workflow.length > 0 && (
        <SectionReveal>
          <div className='mt-16'>
            <Sticker>🗺️ How it works</Sticker>
            <h2 className='text-display mt-4 font-extrabold' style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}>
              From first action to the loop
            </h2>
            <div className='mt-8 grid gap-3 md:grid-cols-2 lg:grid-cols-4'>
              {workflow.map((step) => (
                <div key={step.step} className='relative overflow-hidden rounded-3xl border-2 border-foreground bg-card p-5 md:p-6'>
                  <span className='absolute -top-3 -right-1 text-[4.5rem] font-bold text-muted/80 leading-none select-none pointer-events-none'>
                    {step.step}
                  </span>
                  <p className='relative text-display text-lg font-bold'>{step.title}</p>
                  <p className='relative mt-2 text-sm text-muted-foreground leading-relaxed'>{step.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </SectionReveal>
      )}

      <SectionReveal>
        <div className='mt-16 grid gap-3 md:grid-cols-3'>
          {TRIAD.map((block) => {
            const points = project[block.key] || [];
            return (
              <div key={block.label} className={`relative overflow-hidden rounded-3xl border-2 border-foreground ${block.tint} p-6`}>
                <span className='absolute -top-6 -left-2 text-[5.5rem] font-bold text-muted/80 leading-none select-none pointer-events-none'>
                  {block.index}
                </span>
                <h3 className='relative text-display text-sm font-semibold uppercase tracking-widest mb-4'>{block.label}</h3>
                <ul className='relative space-y-2.5'>
                  {points.map((point) => (
                    <li key={point} className='text-sm text-muted-foreground leading-relaxed pl-4 border-l-2 border-foreground/20'>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </SectionReveal>

      <div className='mt-6 grid gap-3 md:grid-cols-2'>
        <SectionReveal>
          <div className='h-full rounded-3xl border-2 border-foreground bg-card p-6 md:p-8'>
            <p className='text-xs font-semibold uppercase tracking-widest text-muted-foreground'>Impact</p>
            <h2 className='text-display text-3xl font-extrabold mt-2'>What changed after it shipped</h2>
            <ul className='mt-5 space-y-3'>
              {impact.map((item) => (
                <li key={item} className='flex gap-3 text-sm leading-relaxed'>
                  <ArrowRight size={16} className='mt-0.5 shrink-0' />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </SectionReveal>
        <SectionReveal delay={80}>
          <div className={`h-full rounded-3xl border-2 border-foreground p-6 md:p-8 ${nextTint}`}>
            <p className='text-xs font-semibold uppercase tracking-widest opacity-80'>What is next</p>
            <h2 className='text-display text-3xl font-extrabold mt-2'>The next build</h2>
            <ul className='mt-5 space-y-3'>
              {next.map((item) => (
                <li key={item} className='flex gap-3 text-sm md:text-base font-medium leading-snug'>
                  <span className='mt-1 h-2 w-2 shrink-0 rounded-full bg-current' />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </SectionReveal>
      </div>

      {related.length > 0 && (
        <SectionReveal>
          <div className='mt-16'>
            <Sticker>📦 More in the catalog</Sticker>
            <h2 className='text-display mt-4 font-extrabold' style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}>
              Related products
            </h2>
            <div className='mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3 [grid-auto-rows:1fr]'>
              {related.map((item) => (
                <ProjectCard key={item.slug} project={item} />
              ))}
            </div>
          </div>
        </SectionReveal>
      )}
    </section>
  );
}
