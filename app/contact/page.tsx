'use client';

import { Sticker } from '@/components/sticker';
import { ContactForm } from '@/components/contact-form';
import { SectionReveal } from '@/components/section-reveal';
import { useContent } from '@/lib/content-context';

export default function ContactPage() {
  const content = useContent();
  const contact = content.contact || {};

  return (
    <section className='mx-auto max-w-5xl px-5 md:px-8 pt-12 md:pt-20'>
      <SectionReveal>
        <Sticker>✉️ Contact</Sticker>
        <h1 className='text-display mt-6 font-extrabold' style={{ fontSize: 'clamp(2.5rem, 8vw, 6rem)' }}>
          {contact.heading?.line1 || "Let's make"}<br /><span className='gradient-text-signature'>{contact.heading?.line2gradient || 'something ship.'}</span>
        </h1>
        <p className='mt-4 max-w-2xl text-lg text-muted-foreground'>
          {contact.description || 'Open to AI Product Management roles, interesting collaborations, and honest coffee chats about the messy middle of building AI products.'}
        </p>
      </SectionReveal>

      <div className='mt-12'>
        <SectionReveal delay={100}>
          <ContactForm />
        </SectionReveal>
      </div>
    </section>
  );
}