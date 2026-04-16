'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Project } from '@/types';
import { Tag, Button } from '@/components/ui';

interface ProjectCardProps {
  project: Project;
  showFullDescription?: boolean;
}

export default function ProjectCard({ project, showFullDescription = false }: ProjectCardProps) {
  // Get primary links
  const liveLink = project.links.find((l) => l.type === 'live');
  const githubLink = project.links.find((l) => l.type === 'github');

  // Read More always goes to the project detail page
  const readMoreHref = `/projects/${project.slug}`;
  const accessLink = liveLink || githubLink;

  return (
    <div className="group bg-card rounded-xl border border-card-border overflow-hidden card-hover">
      {/* Thumbnail */}
      <div className="relative h-48 overflow-hidden bg-muted">
        <Image
          src={project.thumbnail}
          alt={project.title}
          fill
          className="object-contain transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          onError={(e) => {
            // Fallback for placeholder images
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
          }}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Status Badge */}
        <div className="absolute top-3 right-3">
          <span
            className="px-2.5 py-1 text-xs font-semibold rounded-full flex items-center gap-1.5"
            style={
              project.status === 'Live'
                ? { backgroundColor: 'rgba(20, 184, 166, 0.9)', color: '#fff' }
                : project.status === 'In Development'
                ? { backgroundColor: 'rgba(245, 158, 11, 0.9)', color: '#fff' }
                : project.status === 'Completed'
                ? { backgroundColor: 'rgba(34, 197, 94, 0.85)', color: '#fff' }
                : { backgroundColor: 'rgba(113, 113, 122, 0.85)', color: '#fff' }
            }
          >
            {(project.status === 'Live' || project.status === 'In Development') && (
              <span className="w-1.5 h-1.5 rounded-full bg-white/80 animate-pulse inline-block" />
            )}
            {project.status}
          </span>
        </div>

        {/* Category Badge */}
        {project.company && (
          <div className="absolute top-3 left-3">
            <span className="px-2 py-1 text-xs font-medium rounded-full bg-black/70 text-white">
              {project.company}
            </span>
          </div>
        )}

        {/* Placeholder fallback */}
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-secondary to-foreground/80 -z-10">
          <span className="text-white/30 text-6xl font-bold">
            {project.title.charAt(0)}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Title */}
        <Link href={`/projects/${project.slug}`}>
          <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-secondary transition-colors line-clamp-1">
            {project.title}
          </h3>
        </Link>

        {/* Description */}
        <p className={`text-foreground-muted text-sm mb-4 ${showFullDescription ? '' : 'line-clamp-2'}`}>
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tags.slice(0, 4).map((tag) => (
            <Tag key={tag} size="sm">
              {tag}
            </Tag>
          ))}
          {project.tags.length > 4 && (
            <Tag size="sm" variant="teal">
              +{project.tags.length - 4}
            </Tag>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-3 border-t border-card-border">
          <Button
            href={readMoreHref}
            variant="outline"
            size="sm"
            className="flex-1"
          >
            Read More
          </Button>
          {accessLink && (
            <Button
              href={accessLink.url.startsWith('[PLACEHOLDER') ? '#' : accessLink.url}
              external={!accessLink.url.startsWith('/')}
              variant="secondary"
              size="sm"
              className="flex-1"
            >
              {accessLink.type === 'live' ? 'Live Demo' : 'View Code'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
