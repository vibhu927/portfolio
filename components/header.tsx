'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { navLinks as defaultNavLinks } from '@/lib/data';
import { useContent } from '@/lib/content-context';
import { Menu, X } from 'lucide-react';

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const content = useContent();
  const navLinks = content.navLinks || defaultNavLinks;

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const scrollTop = doc.scrollTop || window.scrollY;
      const height = doc.scrollHeight - doc.clientHeight;
      setScrolled(scrollTop > 12);
      setProgress(height > 0 ? (scrollTop / height) * 100 : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 backdrop-blur-lg bg-background/70 border-b border-border/60 transition-all duration-300 ${
        scrolled ? 'shadow-lg shadow-foreground/5' : ''
      }`}
    >
      {/* Scroll progress */}
      <div className='absolute top-0 left-0 right-0 h-[3px]'>
        <div
          className='h-full gradient-signature transition-[width] duration-100 ease-out'
          style={{ width: `${progress}%` }}
        />
      </div>

      <nav className={`mx-auto max-w-6xl px-5 md:px-8 flex items-center justify-between transition-all duration-300 ${scrolled ? 'h-14' : 'h-16'}`}>
        <Link href='/' className='flex items-center gap-2 group'>
          <span className='h-8 w-8 rounded-xl gradient-signature grain shadow-md group-hover:rotate-6 transition-transform' />
          <span className='text-display text-lg font-bold'>vaibhav.</span>
        </Link>

        <ul className='hidden md:flex items-center gap-1'>
          {navLinks.map((link: any) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`relative px-3 py-2 text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? 'text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {link.label}
                {pathname === link.href && (
                  <span className='absolute inset-x-2 -bottom-0.5 h-[3px] gradient-signature rounded-full' />
                )}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href='/contact'
          className='hidden md:inline-flex items-center gap-2 rounded-full bg-foreground text-background px-4 py-2 text-sm font-semibold hover:opacity-90 transition'
        >
          Let&apos;s talk →
        </Link>

        <button
          className='md:hidden p-2 rounded-lg hover:bg-muted'
          aria-label='Toggle menu'
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {mobileOpen && (
        <div className='md:hidden border-t border-border/60 bg-background/95 backdrop-blur-lg px-5 pb-4'>
          <ul className='flex flex-col gap-1 pt-3'>
            {navLinks.map((link: any) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    pathname === link.href
                      ? 'text-foreground bg-muted'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href='/contact'
            onClick={() => setMobileOpen(false)}
            className='mt-3 block text-center rounded-full bg-foreground text-background px-4 py-2 text-sm font-semibold hover:opacity-90 transition'
          >
            Let&apos;s talk →
          </Link>
        </div>
      )}
    </header>
  );
}