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

  const liveLink = project.links.find((l) => l.type === 'live');
  const githubLink = project.links.find((l) => l.type === 'github');
  const readMoreHref = `/projects/${project.slug}`;
  const accessLink = liveLink || githubLink;
  const isFeatured = project.featured;

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transition: 'transform 0.2s ease-out' }}
      className={`group bg-navy-900 rounded-xl overflow-hidden ${
        isFeatured
          ? 'border border-teal-500/20 shadow-lg shadow-teal-500/5 hover:border-teal-400/40 hover:shadow-xl hover:shadow-teal-500/10'
          : 'border border-white/10 hover:border-white/20'
      }`}
    >
      {/* Thumbnail */}
      <div className={`relative overflow-hidden bg-navy-800 ${isFeatured ? 'h-52' : 'h-48'}`}>
        <Image
          src={project.thumbnail}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Status Badge */}
        <div className="absolute top-3 right-3">
          <span className={`px-2.5 py-1 text-xs font-bold rounded-full backdrop-blur-sm ${
            project.status === 'Live'
              ? 'bg-teal-500/90 text-white'
              : project.status === 'In Development'
              ? 'bg-yellow-500/90 text-navy-900'
              : 'bg-navy-600/90 text-white'
          }`}>
            {project.status}
          </span>
        </div>

        {/* Company Badge */}
        {project.company && (
          <div className="absolute top-3 left-3">
            <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-white/90 text-navy-900 backdrop-blur-sm">
              {project.company}
            </span>
          </div>
        )}

        {/* Featured Ribbon */}
        {isFeatured && (
          <div className="absolute bottom-3 left-3">
            <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-teal-500 text-white shadow-lg">
              Featured
            </span>
          </div>
        )}

        {/* Placeholder fallback */}
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-teal-600 to-navy-800 -z-10">
          <span className="text-white/10 text-6xl font-bold">
            {project.title.charAt(0)}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <Link href={`/projects/${project.slug}`}>
          <h3 className={`font-bold text-white mb-2 group-hover:text-teal-400 transition-colors line-clamp-1 ${
            isFeatured ? 'text-xl' : 'text-lg'
          }`}>
            {project.title}
          </h3>
        </Link>

        <p className={`text-white/50 text-sm mb-4 ${showFullDescription ? '' : 'line-clamp-2'}`}>
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tags.slice(0, 4).map((tag) => (
            <span key={tag} className="px-2 py-1 text-xs font-medium rounded border border-white/10 text-white/40 bg-white/5">
              {tag}
            </span>
          ))}
          {project.tags.length > 4 && (
            <span className="px-2 py-1 text-xs font-medium rounded border border-teal-500/20 text-teal-400 bg-teal-500/5">
              +{project.tags.length - 4}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-3 border-t border-white/5">
          <Button href={readMoreHref} variant="outline" size="sm" className="flex-1 border-white/20 text-white/70 hover:bg-white/10 hover:text-white">
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
