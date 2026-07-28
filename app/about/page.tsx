import { Sticker } from '@/components/sticker';
import { certifications, timeline } from '@/lib/data';
import { SectionReveal } from '@/components/section-reveal';
import { Award } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <section className='mx-auto max-w-4xl px-5 md:px-8 pt-12 md:pt-20'>
      <SectionReveal>
        <Sticker>👋 About</Sticker>
        <h1 className='text-display mt-4 font-extrabold leading-[0.95]' style={{ fontSize: 'clamp(2.5rem, 8vw, 6rem)' }}>
          Engineer by trade.<br />
          <span className='gradient-text-signature'>Product person</span> by{' '}
          <span className='italic font-[family-name:var(--font-serif)]'>obsession.</span>
        </h1>
      </SectionReveal>

      <SectionReveal delay={100}>
        <div className='mt-10 space-y-6 text-lg leading-relaxed text-foreground/85 max-w-2xl'>
          <p>
            I'm Vaibhav — senior software engineer with 3+ years of full-stack experience across the .NET and
            JavaScript worlds. I've spent most of that time in the enterprise trenches, shipping React and Next.js
            frontends onto .NET Core and Azure backends, and picking up MERN/MEAN work along the way.
          </p>
          <p>
            Somewhere in the last 18 months, my curiosity outgrew the ticket queue. I started building AI tools for
            myself on nights and weekends — four of them, so far — and each one taught me that the hard part was
            never the code. It was scoping, sequencing, and knowing what <em>not</em> to build.
          </p>
          <p>
            That's the muscle I want to grow next. I'm pivoting into{' '}
            <span className='font-semibold'>AI Product Management</span> — not because engineering bored me, but
            because the most interesting decisions in AI products live one layer up: what to build, for whom, with
            what tradeoffs, at what pace. I want to be in that room.
          </p>
        </div>
      </SectionReveal>

      <section className='mt-24'>
        <SectionReveal>
          <Sticker>🛤️ The journey</Sticker>
          <h2 className='text-display mt-4 font-extrabold text-4xl md:text-5xl'>How I got here.</h2>
        </SectionReveal>

        <div className='mt-12 relative'>
          <div
            className='absolute left-4 md:left-1/2 top-2 bottom-2 w-0.5 bg-border md:-translate-x-1/2'
            aria-hidden='true'
          />
          <ul className='space-y-10'>
            {timeline.map((event, i) => (
              <SectionReveal key={event.year} delay={i * 80}>
                <li className={`relative md:grid md:grid-cols-2 md:gap-10 ${i % 2 === 1 ? 'md:[&>*:first-child]:col-start-2' : ''}`}>
                  <div className='pl-12 md:pl-0 md:pr-10 md:text-right'>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold text-foreground ${event.colorClass}`}>
                      {event.year}
                    </span>
                    <h3 className='text-display text-2xl font-bold mt-3'>{event.title}</h3>
                    <p className='mt-2 text-muted-foreground'>{event.description}</p>
                  </div>
                  <span className={`absolute left-4 md:left-1/2 top-1 h-4 w-4 rounded-full ${event.dotClass} border-2 border-foreground md:-translate-x-1/2`} />
                </li>
              </SectionReveal>
            ))}
          </ul>
        </div>
      </section>

      <section className='mt-24'>
        <SectionReveal>
          <Sticker>🧰 Toolbelt</Sticker>
          <h2 className='text-display mt-4 font-extrabold text-4xl md:text-5xl'>
            What I <span className='gradient-text-cool'>actually use.</span>
          </h2>
        </SectionReveal>

        <div className='mt-10 grid gap-6 md:grid-cols-3'>
          <SectionReveal delay={0}>
            <div className='rounded-3xl border-2 border-foreground p-6 bg-card h-full'>
              <p className='text-xs font-bold uppercase tracking-widest text-muted-foreground'>Engineering</p>
              <div className='mt-4 flex flex-wrap gap-2'>
                {['.NET Core', 'C#', 'React', 'Next.js', 'TypeScript', 'Node.js', 'Azure', 'MongoDB', 'SQL'].map((skill) => (
                  <span key={skill} className='text-sm px-3 py-1.5 rounded-full bg-muted font-medium'>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </SectionReveal>
          <SectionReveal delay={80}>
            <div className='rounded-3xl border-2 border-foreground p-6 bg-card h-full'>
              <p className='text-xs font-bold uppercase tracking-widest text-muted-foreground'>AI &amp; Automation</p>
              <div className='mt-4 flex flex-wrap gap-2'>
                {['OpenAI API', 'LangGraph', 'n8n', 'Ollama', 'pgvector', 'Prompt design', 'Agent orchestration'].map((skill) => (
                  <span key={skill} className='text-sm px-3 py-1.5 rounded-full bg-muted font-medium'>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </SectionReveal>
          <SectionReveal delay={160}>
            <div className='rounded-3xl border-2 border-foreground p-6 bg-card h-full'>
              <p className='text-xs font-bold uppercase tracking-widest text-muted-foreground'>Product &amp; Craft</p>
              <div className='mt-4 flex flex-wrap gap-2'>
                {['Product discovery', 'Roadmapping', 'User interviews', 'Metrics design', 'PRD writing', 'Sprint planning'].map((skill) => (
                  <span key={skill} className='text-sm px-3 py-1.5 rounded-full bg-muted font-medium'>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      <section className='mt-24'>
        <SectionReveal>
          <div className='rounded-3xl border-2 border-foreground bg-lime p-8'>
            <h2 className='text-display text-3xl font-extrabold flex items-center gap-3'>
              <Award size={24} /> Certifications
            </h2>
            <ul className='mt-5 grid gap-3 md:grid-cols-3'>
              {certifications.map((cert) => (
                <li key={cert} className='rounded-2xl bg-cream border-2 border-foreground p-4 font-semibold'>
                  {cert}
                </li>
              ))}
            </ul>
          </div>
        </SectionReveal>
      </section>

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