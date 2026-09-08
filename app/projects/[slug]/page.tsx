'use client';

import { notFound } from 'next/navigation';
import { projects as defaultProjects } from '@/lib/data';
import { useContent } from '@/lib/content-context';
import { useParams } from 'next/navigation';
import { ProjectCaseStudy } from '@/components/project-case-study';

export default function ProjectDetail() {
  const params = useParams();
  const slug = params.slug as string;
  const content = useContent();
  const loaded = Array.isArray(content.projects);
  const projects = loaded ? content.projects : defaultProjects;
  const project = projects.find((p: { slug: string }) => p.slug === slug);

  if (!loaded) {
    return <div className='mx-auto max-w-6xl px-5 py-24 text-lg text-muted-foreground'>Loading case study…</div>;
  }

  if (!project) return notFound();

  const related = projects.filter((p: { slug: string }) => p.slug !== slug);

  return <ProjectCaseStudy project={project} related={related} />;
}
