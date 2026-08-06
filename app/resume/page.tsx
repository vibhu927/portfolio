'use client';

import { Sticker } from '@/components/sticker';
import { SectionReveal } from '@/components/section-reveal';
import { Download } from 'lucide-react';
import { useContent } from '@/lib/content-context';

export default function ResumePage() {
  const content = useContent();
  const resume = content.resume || {};

  return (
    <section className='mx-auto max-w-4xl px-5 md:px-8 pt-12 md:pt-20'>
      <SectionReveal>
        <div className='flex flex-wrap items-end justify-between gap-4'>
          <div>
            <Sticker>📄 Résumé</Sticker>
            <h1 className='text-display mt-4 font-extrabold leading-none' style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)' }}>
              The one-pager.
            </h1>
            <p className='mt-3 text-muted-foreground max-w-xl'>
              For recruiters, hiring managers, and anyone who wants the skimmable version. Full PDF below.
            </p>
          </div>
          <a
            href='/resume/Vaibhav Narula Resume.pdf'
            download
            className='inline-flex items-center gap-2 rounded-full bg-foreground text-background px-5 py-3 font-semibold hover:opacity-90'
          >
            <Download size={16} /> Download PDF
          </a>
        </div>
      </SectionReveal>

      <SectionReveal delay={100}>
        <article className='mt-12 rounded-3xl border-2 border-foreground bg-card p-8 md:p-12 space-y-10'>
          <header>
            <h2 className='text-display text-4xl font-extrabold'>{resume.name || 'Vaibhav Narula'}</h2>
            <p className='mt-1 text-lg text-muted-foreground'>{resume.subtitle || 'Senior Software Engineer · AI PM in progress'}</p>
            <p className='mt-2 text-sm text-muted-foreground'>{resume.contact || 'vbnarula78@gmail.com · linkedin.com/in/vaibhavnarula47 · github.com/vibhu927'}</p>
          </header>

          <section>
            <h3 className='text-xs font-bold uppercase tracking-widest text-muted-foreground border-b border-border pb-2 mb-4'>
              Summary
            </h3>
            <div className='space-y-2 text-foreground/90 leading-relaxed'>
              <p>
                {resume.summary || 'Senior full-stack engineer with 3+ years shipping .NET / React / Next.js products in production.'}
              </p>
            </div>
          </section>

          <section>
            <h3 className='text-xs font-bold uppercase tracking-widest text-muted-foreground border-b border-border pb-2 mb-4'>
              Experience
            </h3>
            <div className='space-y-2 text-foreground/90 leading-relaxed'>
              <div className='space-y-6'>
                {(resume.experience || []).map((exp: any, i: number) => (
                  <div key={i}>
                    <div className='flex flex-wrap items-baseline justify-between gap-2'>
                      <p className='text-display text-xl font-bold'>
                        {exp.role}
                        <span className='font-medium text-muted-foreground'> · {exp.company}</span>
                      </p>
                      <p className='text-sm text-muted-foreground'>{exp.period}</p>
                    </div>
                    <ul className='mt-2 space-y-1.5'>
                      {exp.bullets?.map((bullet: string, j: number) => (
                        <li key={j}>• {bullet}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section>
            <h3 className='text-xs font-bold uppercase tracking-widest text-muted-foreground border-b border-border pb-2 mb-4'>
              Self-initiated projects
            </h3>
            <div className='space-y-2 text-foreground/90 leading-relaxed'>
              <ul className='space-y-2'>
                {(resume.projects || []).map((proj: any, i: number) => (
                  <li key={i}>
                    <strong>{proj.name}</strong> — {proj.description}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section>
            <h3 className='text-xs font-bold uppercase tracking-widest text-muted-foreground border-b border-border pb-2 mb-4'>
              Skills
            </h3>
            <div className='space-y-2 text-foreground/90 leading-relaxed'>
              <p>
                <strong>Engineering:</strong> {resume.skills?.engineering || '.NET Core, C#, React, Next.js, TypeScript, Node.js, Azure, MongoDB, SQL'}
              </p>
              <p>
                <strong>AI &amp; automation:</strong> {resume.skills?.ai || 'OpenAI API, LangGraph, n8n, Ollama, pgvector, prompt design, Agent orchestration'}
              </p>
              <p>
                <strong>Product:</strong> {resume.skills?.['product thinking'] || 'Discovery, roadmapping, user interviews, PRDs, metrics design'}
              </p>
            </div>
          </section>

          <section>
            <h3 className='text-xs font-bold uppercase tracking-widest text-muted-foreground border-b border-border pb-2 mb-4'>
              Certifications &amp; education
            </h3>
            <div className='space-y-2 text-foreground/90 leading-relaxed'>
              <ul className='space-y-1'>
                {(resume.certifications || []).map((cert: string, i: number) => (
                  <li key={i}>• {cert}</li>
                ))}
              </ul>
            </div>
          </section>
        </article>
      </SectionReveal>
    </section>
  );
}