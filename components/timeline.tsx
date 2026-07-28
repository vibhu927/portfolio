import { timeline } from '@/lib/data';
import { SectionReveal } from './section-reveal';

export function Timeline() {
  return (
    <div className='space-y-0'>
      {timeline.map((event, i) => (
        <SectionReveal key={event.year} delay={i * 80}>
          <div className='relative flex gap-6 pb-12 last:pb-0'>
            <div className='flex flex-col items-center'>
              <div className='w-10 h-10 rounded-full border-2 border-foreground bg-card flex items-center justify-center text-display text-xs font-bold shrink-0'>
                {event.year.slice(2)}
              </div>
              {i < timeline.length - 1 && (
                <div className='w-0.5 flex-1 bg-border mt-2' />
              )}
            </div>
            <div className='pt-1 pb-2'>
              <p className='text-xs font-semibold text-muted-foreground mb-1'>{event.year}</p>
              <h3 className='text-display text-xl md:text-2xl font-bold leading-tight'>{event.title}</h3>
              <p className='mt-2 text-muted-foreground leading-relaxed text-sm md:text-base'>{event.description}</p>
            </div>
          </div>
        </SectionReveal>
      ))}
    </div>
  );
}
