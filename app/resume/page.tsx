import { Sticker } from '@/components/sticker';
import { SectionReveal } from '@/components/section-reveal';
import Link from 'next/link';
import { Download } from 'lucide-react';

export default function ResumePage() {
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
            href='#'
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
            <h2 className='text-display text-4xl font-extrabold'>Vaibhav Narula</h2>
            <p className='mt-1 text-lg text-muted-foreground'>Senior Software Engineer · AI PM in progress</p>
            <p className='mt-2 text-sm text-muted-foreground'>hello@vaibhav.dev · linkedin.com/in/vaibhav · github.com/vaibhav</p>
          </header>

          <section>
            <h3 className='text-xs font-bold uppercase tracking-widest text-muted-foreground border-b border-border pb-2 mb-4'>
              Summary
            </h3>
            <div className='space-y-2 text-foreground/90 leading-relaxed'>
              <p>
                Senior full-stack engineer with 3+ years shipping .NET / React / Next.js products in production.
                Self-initiated builder of four AI tools. Certified in Product Management and Cloud Architecture.
                Actively transitioning into AI Product Management roles.
              </p>
            </div>
          </section>

          <section>
            <h3 className='text-xs font-bold uppercase tracking-widest text-muted-foreground border-b border-border pb-2 mb-4'>
              Experience
            </h3>
            <div className='space-y-2 text-foreground/90 leading-relaxed'>
              <div className='space-y-6'>
                <div>
                  <div className='flex flex-wrap items-baseline justify-between gap-2'>
                    <p className='text-display text-xl font-bold'>
                      Senior Software Engineer
                      <span className='font-medium text-muted-foreground'> · TODO: Current company</span>
                    </p>
                    <p className='text-sm text-muted-foreground'>2024 — Present</p>
                  </div>
                  <ul className='mt-2 space-y-1.5'>
                    <li>
                      • Lead full-stack delivery across .NET Core services and React/Next.js frontends on Azure.
                    </li>
                    <li>
                      • Drove adoption of AI-assisted workflows across the team, cutting typical ticket cycle time by{' '}
                      ~30%.
                    </li>
                    <li>
                      • Owned the tech-to-product handoff on 3 major features — from discovery through post-launch
                      metrics.
                    </li>
                  </ul>
                </div>
                <div>
                  <div className='flex flex-wrap items-baseline justify-between gap-2'>
                    <p className='text-display text-xl font-bold'>
                      Software Engineer
                      <span className='font-medium text-muted-foreground'> · TODO: Previous company</span>
                    </p>
                    <p className='text-sm text-muted-foreground'>2022 — 2024</p>
                  </div>
                  <ul className='mt-2 space-y-1.5'>
                    <li>• Built and shipped MERN/MEAN features end-to-end for a B2B SaaS product.</li>
                    <li>• Migrated a legacy monolith module to Azure Functions, cutting infra cost ~40%.</li>
                    <li>• Mentored 2 junior engineers on React and clean-architecture patterns.</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h3 className='text-xs font-bold uppercase tracking-widest text-muted-foreground border-b border-border pb-2 mb-4'>
              Self-initiated projects
            </h3>
            <div className='space-y-2 text-foreground/90 leading-relaxed'>
              <ul className='space-y-2'>
                <li>
                  <strong>AI LinkedIn Automator</strong> — end-to-end content pipeline with human-in-the-loop
                  approval.
                </li>
                <li>
                  <strong>Idea Curator</strong> — pgvector-based second brain that surfaces ship-worthy ideas weekly.
                </li>
                <li>
                  <strong>Leads Finder</strong> — natural-language ICP → enriched, ranked lead list overnight.
                </li>
                <li>
                  <strong>Agentic Workflow Summarizer</strong> — narrative post-mortems for agent runs.
                </li>
              </ul>
            </div>
          </section>

          <section>
            <h3 className='text-xs font-bold uppercase tracking-widest text-muted-foreground border-b border-border pb-2 mb-4'>
              Skills
            </h3>
            <div className='space-y-2 text-foreground/90 leading-relaxed'>
              <p>
                <strong>Engineering:</strong> .NET Core, C#, React, Next.js, TypeScript, Node.js, Azure, MongoDB,
                SQL
              </p>
              <p>
                <strong>AI &amp; automation:</strong> OpenAI API, LangGraph, n8n, Ollama, pgvector, prompt design,
                Agent orchestration
              </p>
              <p>
                <strong>Product:</strong> Discovery, roadmapping, user interviews, PRDs, metrics design
              </p>
            </div>
          </section>

          <section>
            <h3 className='text-xs font-bold uppercase tracking-widest text-muted-foreground border-b border-border pb-2 mb-4'>
              Certifications &amp; education
            </h3>
            <div className='space-y-2 text-foreground/90 leading-relaxed'>
              <ul className='space-y-1'>
                <li>• Product Management — Great Learning</li>
                <li>• Cloud Computing Architecture — Great Learning</li>
                <li>• AWS Certified</li>
                <li>• TODO: Bachelor's degree — Institution, year</li>
              </ul>
            </div>
          </section>
        </article>
      </SectionReveal>

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