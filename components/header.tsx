'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { navLinks } from '@/lib/data';
import { Menu, X } from 'lucide-react';

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className='sticky top-0 z-50 backdrop-blur-lg bg-background/70 border-b border-border/60'>
      <nav className='mx-auto max-w-6xl px-5 md:px-8 h-16 flex items-center justify-between'>
        <Link href='/' className='flex items-center gap-2 group'>
          <span className='h-8 w-8 rounded-xl gradient-signature grain shadow-md group-hover:rotate-6 transition-transform' />
          <span className='text-display text-lg font-bold'>vaibhav.</span>
        </Link>

        <ul className='hidden md:flex items-center gap-1'>
          {navLinks.map((link) => (
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
          Let's talk →
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
            {navLinks.map((link) => (
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
            Let's talk →
          </Link>
        </div>
      )}
    </header>
  );
}
