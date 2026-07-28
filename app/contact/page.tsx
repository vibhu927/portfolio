import { Sticker } from '@/components/sticker';
import { ContactForm } from '@/components/contact-form';
import { SectionReveal } from '@/components/section-reveal';
import Link from 'next/link';

export default function ContactPage() {
  return (
    <section className='mx-auto max-w-5xl px-5 md:px-8 pt-12 md:pt-20'>
      <SectionReveal>
        <Sticker>✉️ Contact</Sticker>
        <h1 className='text-display mt-6 font-extrabold' style={{ fontSize: 'clamp(2.5rem, 8vw, 6rem)' }}>
          Let's make<br /><span className='gradient-text-signature'>something ship.</span>
        </h1>
        <p className='mt-4 max-w-2xl text-lg text-muted-foreground'>
          Open to AI Product Management roles, interesting collaborations, and honest coffee chats about the messy middle of building AI products.
        </p>
      </SectionReveal>

      <div className='mt-12'>
        <SectionReveal delay={100}>
          <ContactForm />
        </SectionReveal>
      </div>

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
