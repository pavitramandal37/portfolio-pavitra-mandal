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
  const linkedInLink = project.links.find((l) => l.type === 'linkedin');
  const liveLink = project.links.find((l) => l.type === 'live');
  const githubLink = project.links.find((l) => l.type === 'github');
  const blogLink = project.links.find((l) => l.type === 'blog');

  // Determine which link to use for "Read More" and "Access Project"
  const readMoreLink = blogLink || linkedInLink;
  const accessLink = liveLink || githubLink;

  return (
    <div className="group bg-white rounded-xl border border-card-border overflow-hidden card-hover">
      {/* Thumbnail */}
      <div className="relative h-48 overflow-hidden bg-navy-100">
        <Image
          src={project.thumbnail}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          onError={(e) => {
            // Fallback for placeholder images
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
          }}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Status Badge */}
        <div className="absolute top-3 right-3">
          <span
            className={`px-2 py-1 text-xs font-medium rounded-full ${
              project.status === 'Live'
                ? 'bg-teal-500 text-white'
                : project.status === 'In Development'
                ? 'bg-yellow-500 text-navy-900'
                : 'bg-navy-600 text-white'
            }`}
          >
            {project.status}
          </span>
        </div>

        {/* Category Badge */}
        {project.company && (
          <div className="absolute top-3 left-3">
            <span className="px-2 py-1 text-xs font-medium rounded-full bg-navy-900/80 text-white">
              {project.company}
            </span>
          </div>
        )}

        {/* Placeholder fallback */}
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-teal-600 to-navy-800 -z-10">
          <span className="text-white/30 text-6xl font-bold">
            {project.title.charAt(0)}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Title */}
        <Link href={`/projects/${project.slug}`}>
          <h3 className="text-lg font-bold text-navy-900 mb-2 group-hover:text-teal-600 transition-colors line-clamp-1">
            {project.title}
          </h3>
        </Link>

        {/* Description */}
        <p className={`text-navy-600 text-sm mb-4 ${showFullDescription ? '' : 'line-clamp-2'}`}>
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
        <div className="flex gap-2 pt-3 border-t border-navy-100">
          {readMoreLink && (
            <Button
              href={readMoreLink.url.startsWith('[PLACEHOLDER') ? '#' : readMoreLink.url}
              external={!readMoreLink.url.startsWith('/')}
              variant="outline"
              size="sm"
              className="flex-1"
            >
              Read More
            </Button>
          )}
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
          {!readMoreLink && !accessLink && (
            <Button
              href={`/projects/${project.slug}`}
              variant="secondary"
              size="sm"
              className="flex-1"
            >
              View Details
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
