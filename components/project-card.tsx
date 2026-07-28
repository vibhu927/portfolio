import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Project } from '@/lib/data';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link href={`/projects/${project.slug}`} className='group relative block rounded-3xl overflow-hidden border-2 border-foreground/90 bg-card card-tilt'>
      <div className={`relative aspect-[16/10] bg-gradient-to-br ${project.gradient} grain overflow-hidden`}>
        <div className='absolute inset-0 flex items-center justify-center'>
          {project.image ? (
            <img src={project.image} alt={project.title} className='max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-110' />
          ) : (
            <span className='text-[9rem] md:text-[11rem] leading-none drop-shadow-xl transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6'>
              {project.emoji}
            </span>
          )}
        </div>
        <span className='absolute top-4 left-4 sticker'>🚀 Shipped</span>
        <span className={`absolute top-4 right-4 h-3 w-3 rounded-full ${project.dotColor} ring-4 ring-cream`} />
      </div>
      <div className='p-6 md:p-7'>
        <div className='flex items-start justify-between gap-4'>
          <h3 className='text-display text-2xl md:text-3xl font-bold leading-tight'>{project.title}</h3>
          <ArrowUpRight className='shrink-0 mt-1 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1' size={22} />
        </div>
        <p className='mt-2 text-sm md:text-base text-muted-foreground line-clamp-2'>{project.description}</p>
        <div className='mt-4 flex flex-wrap gap-1.5'>
          {project.tags.map((tag) => (
            <span key={tag} className='text-[11px] px-2 py-1 rounded-full bg-muted font-medium'>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
