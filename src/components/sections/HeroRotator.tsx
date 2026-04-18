'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { heroPhotos } from '@/data/heroPhotos';
import CornerBrackets from '@/components/ui/CornerBrackets';

const ROTATE_INTERVAL = 6000;
const RESUME_DELAY = 15000;

const MONO: React.CSSProperties = {
  fontFamily: 'var(--font-mono)',
};

const DISPLAY: React.CSSProperties = {
  fontFamily: 'var(--font-display)',
};

export default function HeroRotator() {
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const goToNext = useCallback(() => {
    setCurrent(c => (c + 1) % heroPhotos.length);
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(goToNext, ROTATE_INTERVAL);
    return () => clearInterval(timer);
  }, [isAutoPlaying, goToNext]);

  const goTo = (idx: number) => {
    setCurrent(idx);
    setIsAutoPlaying(false);
    const resume = setTimeout(() => setIsAutoPlaying(true), RESUME_DELAY);
    return () => clearTimeout(resume);
  };

  return (
    <section className="relative w-full overflow-hidden bg-background" style={{ height: '100svh', minHeight: '600px' }}>

      {/* Background image stack — all rendered, only active is visible */}
      {heroPhotos.map((photo, idx) => (
        <div
          key={photo.src}
          className="absolute inset-0"
          style={{
            opacity: idx === current ? 1 : 0,
            zIndex: idx === current ? 1 : 0,
            transition: 'opacity 1.5s ease-in-out',
          }}
        >
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            className="object-cover object-center"
            priority={idx === 0}
            loading={idx === 0 ? 'eager' : 'lazy'}
            quality={85}
            sizes="100vw"
          />
        </div>
      ))}

      {/* Left-to-right gradient overlay */}
      <div
        className="absolute inset-0 z-10 hidden sm:block"
        style={{
          background:
            'linear-gradient(to right, var(--hero-overlay-strong) 0%, var(--hero-overlay-strong) 35%, var(--hero-overlay-mid) 65%, transparent 100%)',
        }}
      />
      {/* Mobile: uniform overlay */}
      <div
        className="absolute inset-0 z-10 sm:hidden"
        style={{ background: 'var(--hero-overlay-strong)' }}
      />
      {/* Bottom fade into page background */}
      <div
        className="absolute bottom-0 left-0 right-0 z-10"
        style={{
          height: '220px',
          background: 'linear-gradient(to top, var(--background) 0%, transparent 100%)',
        }}
      />

      {/* ── Main content ── */}
      <div className="relative z-20 h-full flex flex-col justify-center px-6 sm:px-10 lg:px-16 pt-20 pb-44 max-w-5xl">

        {/* Status badge */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span
            className="inline-flex items-center gap-2"
            style={{
              ...MONO,
              fontSize: '10px',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--foreground-muted)',
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: '#E4572E' }} />
            Open for Tech Lead Roles — India &amp; Japan
          </span>
        </motion.div>

        {/* Display headline */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          style={{
            ...DISPLAY,
            fontSize: 'clamp(2.6rem, 6.5vw, 8.5rem)',
            fontWeight: 400,
            lineHeight: 1.06,
            letterSpacing: '-0.025em',
            color: 'var(--foreground)',
          }}
        >
          Engineering<br />
          intelligence.<br />
          <em
            style={{
              fontStyle: 'italic',
              color: 'var(--foreground-muted)',
            }}
          >
            Capturing light.
          </em>
        </motion.h1>

        {/* Mono sub-headline */}
        <motion.p
          className="mt-6 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          style={{
            ...MONO,
            fontSize: '11px',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--foreground-muted)',
          }}
        >
          AI &amp; Data Platform Engineer — Sony Tokyo&nbsp;/&nbsp;Visual Storyteller
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <Link
            href="/projects"
            className="group inline-flex items-center gap-3 px-7 py-4 transition-all duration-300 hover:gap-4"
            style={{
              ...MONO,
              fontSize: '11px',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              backgroundColor: '#E4572E',
              color: '#F4F1EA',
            }}
          >
            View Case Studies
            <svg
              className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>

          <Link
            href="/contact"
            className="group inline-flex items-center gap-3 px-7 py-4 border transition-all duration-300 hover:gap-4"
            style={{
              ...MONO,
              fontSize: '11px',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              borderColor: 'var(--foreground-muted)',
              color: 'var(--foreground)',
              backgroundColor: 'transparent',
            }}
          >
            Let&apos;s Connect
            <svg
              className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </motion.div>
      </div>

      {/* ── Thumbnail strip ── */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-end gap-2"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 1 }}
      >
        {heroPhotos.map((photo, idx) => (
          <button
            key={photo.src}
            onClick={() => goTo(idx)}
            className="relative group overflow-hidden flex-shrink-0 transition-all duration-300"
            style={{
              width: idx === current ? '72px' : '50px',
              height: idx === current ? '50px' : '36px',
              opacity: idx === current ? 1 : 0.5,
              outline: 'none',
            }}
            aria-label={`View photo: ${photo.title}`}
          >
            <Image
              src={photo.src}
              alt={photo.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="72px"
              quality={50}
            />
            {/* Active top bar */}
            {idx === current && (
              <div
                className="absolute top-0 left-0 right-0 h-0.5"
                style={{ backgroundColor: '#E4572E' }}
              />
            )}
            {/* Corner brackets on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <CornerBrackets size={8} color="#E4572E" thickness={1} />
            </div>
          </button>
        ))}
      </motion.div>

      {/* ── Scroll indicator ── */}
      <motion.div
        className="absolute bottom-8 right-8 z-20 hidden lg:flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
      >
        <div
          className="relative w-px overflow-hidden"
          style={{ height: '48px', backgroundColor: 'rgba(138,133,124,0.25)' }}
        >
          <motion.div
            className="absolute top-0 left-0 w-full"
            style={{ height: '50%', backgroundColor: 'var(--foreground-muted)' }}
            animate={{ y: ['-100%', '250%'] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'linear', repeatDelay: 0.3 }}
          />
        </div>
        <span
          style={{
            ...MONO,
            fontSize: '9px',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'var(--foreground-muted)',
            writingMode: 'vertical-rl',
            transform: 'rotate(180deg)',
          }}
        >
          Scroll
        </span>
      </motion.div>
    </section>
  );
}
