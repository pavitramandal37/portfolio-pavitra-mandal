'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Project } from '@/types';
import { Tag, Button } from '@/components/ui';

interface ProjectCardProps {
  project: Project;
  showFullDescription?: boolean;
}

export default function ProjectCard({ project, showFullDescription = false }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -4;
    const rotateY = ((x - centerX) / centerX) * 4;
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  };
  // Get primary links
  const liveLink = project.links.find((l) => l.type === 'live');
  const githubLink = project.links.find((l) => l.type === 'github');

  // Read More always goes to the project detail page
  const readMoreHref = `/projects/${project.slug}`;
  const accessLink = liveLink || githubLink;

  const isFeatured = project.featured;

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transition: 'transform 0.2s ease-out' }}
      className={`group bg-white rounded-xl overflow-hidden ${
      isFeatured
        ? 'border-2 border-teal-200 shadow-lg shadow-teal-500/5 hover:border-teal-400 hover:shadow-xl hover:shadow-teal-500/10'
        : 'border border-card-border'
    }`}>
      {/* Thumbnail */}
      <div className={`relative overflow-hidden bg-navy-100 ${isFeatured ? 'h-52' : 'h-48'}`}>
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
            className={`px-2.5 py-1 text-xs font-bold rounded-full ${
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

        {/* Company Badge */}
        {project.company && (
          <div className="absolute top-3 left-3">
            <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-navy-900/80 text-white backdrop-blur-sm">
              {project.company}
            </span>
          </div>
        )}

        {/* Featured Ribbon */}
        {isFeatured && (
          <div className="absolute bottom-3 left-3">
            <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-teal-600 text-white shadow-lg">
              Featured
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
          <h3 className={`font-bold text-navy-900 mb-2 group-hover:text-teal-600 transition-colors line-clamp-1 ${
            isFeatured ? 'text-xl' : 'text-lg'
          }`}>
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
