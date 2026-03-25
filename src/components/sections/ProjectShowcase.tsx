'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { getFeaturedProjects } from '@/data/projects';
import { Button, Tag } from '@/components/ui';

function ShowcaseCard({ project, index }: { project: ReturnType<typeof getFeaturedProjects>[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const isEven = index % 2 === 0;
  const liveLink = project.links.find((l) => l.type === 'live');
  const githubLink = project.links.find((l) => l.type === 'github');
  const accessLink = liveLink || githubLink;

  return (
    <motion.div
      ref={cardRef}
      style={{ opacity }}
      className="relative py-16 md:py-24"
    >
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
        isEven ? '' : 'direction-rtl'
      }`}>
        {/* Image */}
        <motion.div
          style={{ y }}
          className={`relative aspect-[16/10] rounded-2xl overflow-hidden group ${isEven ? '' : 'lg:order-2'}`}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-teal-600 to-navy-800 -z-10" />
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 to-transparent" />

          {/* Status + Company badges */}
          <div className="absolute top-4 left-4 flex gap-2">
            {project.company && (
              <span className="px-3 py-1.5 text-xs font-bold rounded-full bg-white/90 text-navy-900 backdrop-blur-sm">
                {project.company}
              </span>
            )}
            <span className={`px-3 py-1.5 text-xs font-bold rounded-full backdrop-blur-sm ${
              project.status === 'Live'
                ? 'bg-teal-500/90 text-white'
                : project.status === 'In Development'
                ? 'bg-yellow-500/90 text-navy-900'
                : 'bg-navy-600/90 text-white'
            }`}>
              {project.status}
            </span>
          </div>

          {/* Large project initial for placeholder */}
          <div className="absolute inset-0 flex items-center justify-center -z-10">
            <span className="text-white/10 text-[10rem] font-bold leading-none">
              {project.title.charAt(0)}
            </span>
          </div>
        </motion.div>

        {/* Content */}
        <div className={`space-y-6 ${isEven ? '' : 'lg:order-1'}`} style={{ direction: 'ltr' }}>
          {/* Number */}
          <span className="text-7xl font-extrabold text-white/5">
            {String(index + 1).padStart(2, '0')}
          </span>

          <div>
            <Link href={`/projects/${project.slug}`}>
              <h3 className="text-3xl md:text-4xl font-bold text-white hover:text-teal-400 transition-colors leading-tight">
                {project.title}
              </h3>
            </Link>
            <p className="mt-4 text-lg text-white/60 leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {project.tags.slice(0, 5).map((tag) => (
              <span
                key={tag}
                className="px-3 py-1.5 text-xs font-medium rounded-full border border-white/10 text-white/60 bg-white/5"
              >
                {tag}
              </span>
            ))}
            {project.tags.length > 5 && (
              <span className="px-3 py-1.5 text-xs font-medium rounded-full border border-teal-500/30 text-teal-400 bg-teal-500/10">
                +{project.tags.length - 5}
              </span>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-4 pt-2">
            <Button
              href={`/projects/${project.slug}`}
              variant="secondary"
              size="md"
            >
              View Case Study
            </Button>
            {accessLink && !accessLink.url.startsWith('[PLACEHOLDER') && (
              <Button
                href={accessLink.url}
                external={!accessLink.url.startsWith('/')}
                variant="ghost"
                size="md"
                className="border border-white/20 text-white hover:bg-white/10"
              >
                {accessLink.type === 'live' ? 'Live Demo' : 'Source Code'}
              </Button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ProjectShowcase() {
  const featuredProjects = getFeaturedProjects();

  return (
    <section className="relative bg-navy-950 py-20">
      {/* Section header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-400 mb-2"
        >
          Featured Work
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl font-bold text-white"
        >
          Case Studies
        </motion.h2>
      </div>

      {/* Projects */}
      {featuredProjects.map((project, index) => (
        <ShowcaseCard key={project.id} project={project} index={index} />
      ))}

      {/* View All */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mt-8 pb-8"
      >
        <Button href="/projects" variant="ghost" size="lg" className="border border-white/20 text-white hover:bg-white/10 text-lg px-12">
          View All Projects
          <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Button>
      </motion.div>
    </section>
  );
}
