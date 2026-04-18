'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { getFeaturedProjects } from '@/data/projects';

const MONO: React.CSSProperties = { fontFamily: 'var(--font-mono)' };
const DISPLAY: React.CSSProperties = { fontFamily: 'var(--font-display)' };

const SPRING = { type: 'spring' as const, stiffness: 260, damping: 28, mass: 0.9 };

// Per-position visual state
function cardState(abs: number) {
  return {
    scale:   [1, 0.91, 0.82][abs] ?? 0.72,
    opacity: [1, 0.52, 0.22][abs] ?? 0,
  };
}

export default function FeaturedProjects() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const projects = getFeaturedProjects();

  useEffect(() => {
    if (isPaused || projects.length <= 1) return;
    const t = setInterval(() => setActiveIdx(i => (i + 1) % projects.length), 5500);
    return () => clearInterval(t);
  }, [isPaused, projects.length]);

  const navigate = useCallback((dir: number) => {
    setActiveIdx(i => (i + dir + projects.length) % projects.length);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 9000);
  }, [projects.length]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') navigate(-1);
      if (e.key === 'ArrowRight') navigate(1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [navigate]);

  const relPos = (i: number) => {
    let p = i - activeIdx;
    if (p > projects.length / 2) p -= projects.length;
    if (p < -projects.length / 2) p += projects.length;
    return p;
  };

  return (
    <section
      className="section-padding bg-background-alt relative overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(to right, transparent, var(--border), transparent)' }}
      />

      {/* Section header */}
      <div className="max-w-6xl mx-auto px-6 lg:px-8 mb-12">
        <motion.div
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <p style={{ ...MONO, fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#E4572E', marginBottom: '14px' }}>
              <span className="inline-block w-1.5 h-1.5 rounded-full mr-2 align-middle" style={{ backgroundColor: '#E4572E' }} />
              Featured Work
            </p>
            <h2 style={{ ...DISPLAY, fontSize: 'clamp(2rem, 4vw, 4rem)', fontWeight: 400, lineHeight: 1.1, color: 'var(--foreground)' }}>
              Selected Projects
            </h2>
          </div>
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 shrink-0"
            style={{ ...MONO, fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--foreground-muted)' }}
          >
            All Projects
            <svg className="w-3 h-3 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </motion.div>
      </div>

      {/* ── Coverflow strip ─────────────────────────────────── */}
      <div className="relative" style={{ height: '460px', overflow: 'hidden' }}>

        {/* Left arrow */}
        <button
          onClick={() => navigate(-1)}
          aria-label="Previous project"
          className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-30 flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95"
          style={{
            width: '52px', height: '52px',
            border: '1px solid rgba(228,87,46,0.55)',
            backgroundColor: 'rgba(10,10,10,0.75)',
            backdropFilter: 'blur(10px)',
            color: '#E4572E',
          }}
        >
          <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        {/* Cards */}
        {projects.map((project, i) => {
          const pos = relPos(i);
          const abs = Math.abs(pos);
          if (abs > 2) return null;

          const { scale, opacity } = cardState(abs);
          const isActive = pos === 0;

          return (
            <motion.div
              key={project.id}
              animate={{ x: `${pos * 105}%`, scale, opacity }}
              transition={SPRING}
              style={{
                position: 'absolute',
                top: '10px',
                bottom: '10px',
                left: 'calc(50% - min(390px, 44vw))',
                width: 'min(780px, 88vw)',
                zIndex: 10 - abs,
                transformOrigin: 'center center',
              }}
            >
              <div
                className="h-full overflow-hidden grid grid-cols-1 lg:grid-cols-2"
                style={{
                  border: `1px solid ${isActive ? 'rgba(228,87,46,0.4)' : 'var(--card-border)'}`,
                  backgroundColor: 'var(--card)',
                  /*
                   * Active card: coral top accent (inset shadow) + strong drop shadow
                   * Inactive cards: faint elevation only
                   */
                  boxShadow: isActive
                    ? 'inset 0 2.5px 0 0 #E4572E, 0 0 0 1px rgba(228,87,46,0.15), 0 28px 80px rgba(0,0,0,0.6), 0 8px 24px rgba(0,0,0,0.4)'
                    : '0 4px 24px rgba(0,0,0,0.25)',
                }}
              >
                {/* ── Left: Info ── */}
                <div
                  className="flex flex-col justify-between overflow-hidden"
                  style={{ padding: '2rem 2rem 1.75rem' }}
                >
                  <div>
                    {/* Category + status */}
                    <div className="flex items-center gap-2.5 mb-3">
                      <span style={{ ...MONO, fontSize: '9px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#E4572E' }}>
                        {project.category}
                      </span>
                      {project.status === 'In Development' && (
                        <span
                          className="inline-flex items-center gap-1"
                          style={{ ...MONO, fontSize: '8px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#E4572E', border: '1px solid rgba(228,87,46,0.35)', padding: '2px 6px' }}
                        >
                          <span className="inline-block w-1 h-1 rounded-full animate-pulse" style={{ backgroundColor: '#E4572E' }} />
                          Active
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3
                      style={{ ...DISPLAY, fontSize: 'clamp(1.3rem, 2vw, 1.9rem)', fontWeight: 400, lineHeight: 1.2, color: 'var(--foreground)', marginBottom: '12px' }}
                      className="line-clamp-3"
                    >
                      {project.title}
                    </h3>

                    {/* Description */}
                    <p className="line-clamp-3 mb-4" style={{ fontSize: '0.84rem', color: 'var(--foreground-muted)', lineHeight: 1.75 }}>
                      {project.description}
                    </p>

                    {/* Key outcome */}
                    {project.outcomes?.[0] && (
                      <p
                        className="line-clamp-2 mb-4"
                        style={{ ...MONO, fontSize: '9px', letterSpacing: '0.09em', color: 'var(--foreground-muted)', borderLeft: '2px solid #E4572E', paddingLeft: '10px', lineHeight: 1.7 }}
                      >
                        {project.outcomes[0]}
                      </p>
                    )}
                  </div>

                  <div>
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {project.tags.slice(0, 4).map(tag => (
                        <span
                          key={tag}
                          style={{ ...MONO, fontSize: '8px', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '3px 8px', border: '1px solid var(--card-border)', color: 'var(--foreground-muted)' }}
                        >
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 4 && (
                        <span style={{ ...MONO, fontSize: '8px', color: 'var(--foreground-muted)', opacity: 0.45, padding: '3px 0' }}>
                          +{project.tags.length - 4}
                        </span>
                      )}
                    </div>

                    {/* CTA */}
                    <Link
                      href={`/projects/${project.slug}`}
                      className="group/cta inline-flex items-center gap-1.5"
                      style={{ ...MONO, fontSize: '9px', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#E4572E' }}
                    >
                      View Project
                      <svg className="w-3 h-3 transition-transform group-hover/cta:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Link>
                  </div>
                </div>

                {/* ── Right: Thumbnail ── */}
                <div className="hidden lg:block relative" style={{ backgroundColor: 'var(--background-alt)' }}>
                  {project.thumbnail ? (
                    <Image
                      src={project.thumbnail}
                      alt={project.title}
                      fill
                      className="object-contain"
                      style={{ padding: '20px' }}
                      sizes="40vw"
                      quality={85}
                    />
                  ) : null}
                </div>
              </div>
            </motion.div>
          );
        })}

        {/* Right arrow */}
        <button
          onClick={() => navigate(1)}
          aria-label="Next project"
          className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95"
          style={{
            width: '52px', height: '52px',
            border: '1px solid rgba(228,87,46,0.55)',
            backgroundColor: 'rgba(10,10,10,0.75)',
            backdropFilter: 'blur(10px)',
            color: '#E4572E',
          }}
        >
          <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>

      {/* ── Progress dots + counter ─────────────────────────── */}
      <div className="mt-6 flex items-center justify-center gap-4">
        <div className="flex items-center gap-1.5">
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={() => { setActiveIdx(i); setIsPaused(true); setTimeout(() => setIsPaused(false), 9000); }}
              aria-label={`Go to project ${i + 1}`}
              style={{
                height: '3px',
                width: i === activeIdx ? '28px' : '7px',
                backgroundColor: i === activeIdx ? '#E4572E' : 'var(--card-border)',
                transition: 'all 0.35s ease',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
              }}
            />
          ))}
        </div>
        <span style={{ ...MONO, fontSize: '9px', letterSpacing: '0.12em', color: 'var(--foreground-muted)', opacity: 0.5 }}>
          {String(activeIdx + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
        </span>
      </div>
    </section>
  );
}
