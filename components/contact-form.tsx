'use client';

import { Mail, Calendar, Send } from 'lucide-react';

export function ContactForm() {
  return (
    <div className='grid gap-8 md:grid-cols-[1.4fr_1fr]'>
      <div>
        <form className='rounded-3xl border-2 border-foreground bg-card p-6 md:p-8 space-y-5'>
          <div>
            <label className='text-xs font-bold uppercase tracking-widest text-muted-foreground'>Your name</label>
            <input
              type='text'
              required
              placeholder='Jane Cooper'
              className='mt-2 w-full rounded-2xl border-2 border-border bg-background px-4 py-3 focus:border-foreground focus:outline-none transition'
              name='name'
            />
          </div>
          <div>
            <label className='text-xs font-bold uppercase tracking-widest text-muted-foreground'>Email</label>
            <input
              type='email'
              required
              placeholder='jane@company.com'
              className='mt-2 w-full rounded-2xl border-2 border-border bg-background px-4 py-3 focus:border-foreground focus:outline-none transition'
              name='email'
            />
          </div>
          <div>
            <label className='text-xs font-bold uppercase tracking-widest text-muted-foreground'>Message</label>
            <textarea
              name='message'
              required
              rows={5}
              placeholder="What's on your mind?"
              className='mt-2 w-full rounded-2xl border-2 border-border bg-background px-4 py-3 focus:border-foreground focus:outline-none transition'
            />
          </div>
          <button
            type='submit'
            className='inline-flex items-center gap-2 rounded-full bg-foreground text-background px-6 py-3 font-semibold hover:opacity-90 disabled:opacity-60'
          >
            <Send size={16} /> Send message
          </button>
        </form>
      </div>

      <div className='space-y-4'>
        <a
          href='mailto:hello@vaibhav.dev'
          className='flex items-center gap-4 rounded-3xl border-2 border-foreground p-5 card-tilt bg-tangerine'
        >
          <span className='h-11 w-11 rounded-2xl bg-cream border-2 border-foreground grid place-items-center text-foreground shrink-0'>
            <Mail size={24} />
          </span>
          <div>
            <p className='text-xs font-bold uppercase tracking-widest opacity-80'>Email</p>
            <p className='text-display text-lg font-bold'>hello@vaibhav.dev</p>
          </div>
        </a>
        <a
          href='https://linkedin.com'
          target='_blank'
          rel='noreferrer'
          className='flex items-center gap-4 rounded-3xl border-2 border-foreground p-5 card-tilt bg-cyan'
        >
          <span className='h-11 w-11 rounded-2xl bg-cream border-2 border-foreground grid place-items-center text-foreground shrink-0'>
            <svg width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'><path d='M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z'></path><rect width='4' height='12' x='2' y='9'></rect><circle cx='4' cy='4' r='2'></circle></svg>
          </span>
          <div>
            <p className='text-xs font-bold uppercase tracking-widest opacity-80'>LinkedIn</p>
            <p className='text-display text-lg font-bold'>/in/vaibhav</p>
          </div>
        </a>
        <a
          href='https://github.com'
          target='_blank'
          rel='noreferrer'
          className='flex items-center gap-4 rounded-3xl border-2 border-foreground p-5 card-tilt bg-lime'
        >
          <span className='h-11 w-11 rounded-2xl bg-cream border-2 border-foreground grid place-items-center text-foreground shrink-0'>
            <svg width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'><path d='M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4'></path><path d='M9 18c-4.51 2-5-2-7-2'></path></svg>
          </span>
          <div>
            <p className='text-xs font-bold uppercase tracking-widest opacity-80'>GitHub</p>
            <p className='text-display text-lg font-bold'>@vaibhav</p>
          </div>
        </a>
        <a
          href='#'
          className='flex items-center gap-4 rounded-3xl border-2 border-foreground p-5 card-tilt bg-hotpink text-white'
        >
          <span className='h-11 w-11 rounded-2xl bg-cream border-2 border-foreground grid place-items-center text-foreground shrink-0'>
            <Calendar size={24} />
          </span>
          <div>
            <p className='text-xs font-bold uppercase tracking-widest opacity-80'>Book a call</p>
            <p className='text-display text-lg font-bold'>Calendly · 30 min</p>
          </div>
        </a>
      </div>
    </div>
  );
}