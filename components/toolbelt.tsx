import { skillCategories } from '@/lib/data';
import { SectionReveal } from './section-reveal';

export function Toolbelt() {
  return (
    <div className='grid gap-8 md:grid-cols-3'>
      {skillCategories.map((cat, i) => (
        <SectionReveal key={cat.title} delay={i * 100}>
          <div>
            <h3 className='text-display text-lg font-bold mb-4'>{cat.title}</h3>
            <div className='flex flex-wrap gap-2'>
              {cat.skills.map((skill) => (
                <span key={skill} className='text-sm px-3 py-1.5 rounded-full border-2 border-foreground bg-card font-medium'>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </SectionReveal>
      ))}
    </div>
  );
}
