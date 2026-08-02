'use client';

import Link from 'next/link';
import { Mail } from 'lucide-react';
import { useContent } from '@/lib/content-context';

export function Footer() {
  const content = useContent();
  const footer = content.footer || {};

  return (
    <footer className='mt-32 border-t border-border/60'>
      <div className='mx-auto max-w-6xl px-5 md:px-8 py-16'>
        <div className='grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]'>
          <div>
            <h3 className='text-display text-4xl md:text-5xl font-bold leading-none'>
              {footer.heading || 'Building things.'}<br />
              <span className='gradient-text-signature'>{footer.headingGradient || "Let's build one together."}</span>
            </h3>
            <Link
              href='/contact'
              className='mt-6 inline-flex items-center gap-2 rounded-full bg-foreground text-background px-5 py-3 text-sm font-semibold hover:opacity-90 transition'
            >
              Start a conversation →
            </Link>
          </div>

          <div>
            <p className='text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3'>
              Navigate
            </p>
            <ul className='space-y-2 text-sm'>
              <li><Link href='/projects' className='hover:text-foreground text-muted-foreground'>Projects</Link></li>
              <li><Link href='/about' className='hover:text-foreground text-muted-foreground'>About</Link></li>
              <li><Link href='/resume' className='hover:text-foreground text-muted-foreground'>Resume</Link></li>
              <li><Link href='/contact' className='hover:text-foreground text-muted-foreground'>Contact</Link></li>
            </ul>
          </div>

          <div>
            <p className='text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3'>
              Elsewhere
            </p>
            <ul className='space-y-2 text-sm'>
              <li>
                <a href='https://linkedin.com' target='_blank' rel='noreferrer' className='inline-flex items-center gap-2 hover:text-foreground text-muted-foreground'>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg> LinkedIn
                </a>
              </li>
              <li>
                <a href='https://github.com' target='_blank' rel='noreferrer' className='inline-flex items-center gap-2 hover:text-foreground text-muted-foreground'>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg> GitHub
                </a>
              </li>
              <li>
                <a href='mailto:vbnarula78@gmail.com' className='inline-flex items-center gap-2 hover:text-foreground text-muted-foreground'>
                  <Mail size={14} /> Email
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className='mt-12 pt-6 border-t border-border/60 flex flex-wrap gap-3 items-center justify-between text-xs text-muted-foreground'>
          <span>{footer.copyright || '© 2026 Vaibhav Narula. Built with too much coffee.'}</span>

        </div>
      </div>
    </footer>
  );
}