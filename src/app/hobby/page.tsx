'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { PageHero } from '@/components/ui';
import pageImages from '@/data/pageImages';
import { lensPhotos, LENS_CATEGORIES, type LensCategory } from '@/data/lensPhotos';
import CornerBrackets from '@/components/ui/CornerBrackets';

const MONO: React.CSSProperties = { fontFamily: 'var(--font-mono)' };
const DISPLAY: React.CSSProperties = { fontFamily: 'var(--font-display)' };

const CATEGORY_LABELS: Record<LensCategory | 'ALL', string> = {
  ALL: 'All',
  LANDSCAPE: 'Landscape',
  STREET: 'Street',
  FLORA: 'Flora',
  SNOW: 'Snow',
  WATER: 'Water',
};

const YOUTUBE_VIDEOS = [
  {
    id: 'y_xPP0HRaSc',
    embedUrl: 'https://www.youtube.com/embed/y_xPP0HRaSc',
    watchUrl: 'https://youtu.be/y_xPP0HRaSc',
    label: 'Latest Video',
  },
  {
    id: '6OpmN8DPwxw',
    embedUrl: 'https://www.youtube.com/embed/6OpmN8DPwxw',
    watchUrl: 'https://youtu.be/6OpmN8DPwxw',
    label: 'Featured Video',
  },
];

export default function LensPage() {
  const [activeCategory, setActiveCategory] = useState<LensCategory | 'ALL'>('ALL');
  const [lightboxPhoto, setLightboxPhoto] = useState<number | null>(null);

  const filtered = activeCategory === 'ALL'
    ? lensPhotos
    : lensPhotos.filter(p => p.category === activeCategory);

  const categories: (LensCategory | 'ALL')[] = ['ALL', ...LENS_CATEGORIES];

  const openLightbox = (idx: number) => setLightboxPhoto(idx);
  const closeLightbox = () => setLightboxPhoto(null);
  const prevPhoto = () => setLightboxPhoto(i => i !== null ? (i - 1 + filtered.length) % filtered.length : null);
  const nextPhoto = () => setLightboxPhoto(i => i !== null ? (i + 1) % filtered.length : null);

  return (
    <div className="min-h-screen bg-background">

      <PageHero
        title="Through the"
        titleItalic="Lens"
        category="Visual Work"
        subtitle="Landscapes · Street · Flora · Snow · Water"
        imageSrc={pageImages.hobby}
        imageAlt="Photography Portfolio"
      />

      {/* ── YouTube Section ── */}
      <section className="section-padding" style={{ borderBottom: '1px solid var(--border)' }}>
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p style={{ ...MONO, fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#E4572E', marginBottom: '12px' }}>
              <span className="inline-block w-1.5 h-1.5 rounded-full mr-2 align-middle animate-pulse" style={{ backgroundColor: '#E4572E' }} />
              From the Channel
            </p>
            <div className="flex items-end justify-between gap-4 flex-wrap">
              <h2 style={{ ...DISPLAY, fontSize: 'clamp(1.8rem, 3.5vw, 3.5rem)', fontWeight: 400, color: 'var(--foreground)', lineHeight: 1.1 }}>
                Watch on YouTube
              </h2>
              <a
                href="https://www.youtube.com/@pavitramandal37"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 shrink-0"
                style={{ ...MONO, fontSize: '9px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--foreground-muted)' }}
              >
                View Channel
                <svg className="w-3 h-3 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {YOUTUBE_VIDEOS.map((video, idx) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: idx * 0.1 }}
                className="group relative overflow-hidden border"
                style={{ borderColor: 'var(--card-border)' }}
              >
                {/* Video embed */}
                <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden' }}>
                  <iframe
                    src={video.embedUrl}
                    title={`YouTube video ${idx + 1}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{
                      position: 'absolute',
                      top: 0, left: 0,
                      width: '100%', height: '100%',
                      border: 0,
                    }}
                  />
                </div>

                {/* Bottom bar */}
                <div
                  className="flex items-center justify-between px-4 py-3"
                  style={{ backgroundColor: 'var(--card)', borderTop: '1px solid var(--card-border)' }}
                >
                  <p style={{ ...MONO, fontSize: '9px', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#E4572E' }}>
                    {video.label}
                  </p>
                  <a
                    href={video.watchUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/yt inline-flex items-center gap-1.5"
                    style={{ ...MONO, fontSize: '8px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--foreground-muted)' }}
                  >
                    Open on YouTube
                    <svg className="w-2.5 h-2.5 transition-transform group-hover/yt:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Filter bar */}
      <section className="section-padding pb-0">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="flex flex-wrap gap-2 mb-10"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  ...MONO,
                  fontSize: '9px',
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  padding: '6px 14px',
                  border: `1px solid ${activeCategory === cat ? '#E4572E' : 'var(--card-border)'}`,
                  color: activeCategory === cat ? '#E4572E' : 'var(--foreground-muted)',
                  backgroundColor: activeCategory === cat ? 'rgba(228,87,46,0.06)' : 'transparent',
                  transition: 'all 0.2s',
                }}
              >
                {CATEGORY_LABELS[cat]}
              </button>
            ))}
            <span
              style={{
                ...MONO,
                fontSize: '9px',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--foreground-muted)',
                opacity: 0.5,
                padding: '6px 0',
                marginLeft: 'auto',
              }}
            >
              {filtered.length} photos
            </span>
          </motion.div>

          {/* Masonry-style grid */}
          <motion.div
            className="columns-1 sm:columns-2 lg:columns-3 gap-4"
            layout
          >
            <AnimatePresence>
              {filtered.map((photo, idx) => (
                <motion.div
                  key={photo.src}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.4, delay: Math.min(idx, 8) * 0.04 }}
                  className="break-inside-avoid mb-4 relative group cursor-pointer overflow-hidden"
                  onClick={() => openLightbox(idx)}
                >
                  <div className="relative overflow-hidden">
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      width={600}
                      height={400}
                      className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                      quality={75}
                    />

                    {/* Hover overlay */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                      style={{ background: 'linear-gradient(to top, rgba(14,14,14,0.75) 0%, rgba(14,14,14,0.1) 60%, transparent 100%)' }}
                    />

                    {/* Corner brackets on hover */}
                    <div className="absolute inset-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <CornerBrackets size={12} color="#E4572E" thickness={1} />
                    </div>

                    {/* Photo info */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <p style={{ ...DISPLAY, fontSize: '1.1rem', fontWeight: 400, color: '#F4F1EA', lineHeight: 1.2 }}>
                        {photo.title}
                      </p>
                      <p style={{ ...MONO, fontSize: '8px', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#E4572E', marginTop: '4px' }}>
                        {CATEGORY_LABELS[photo.category]}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Social CTA band */}
      <section className="section-padding border-t" style={{ borderColor: 'var(--border)' }}>
        <div className="max-w-6xl mx-auto">
          <div
            className="absolute top-0 left-0 right-0 h-px"
            style={{ background: 'linear-gradient(to right, transparent, var(--border), transparent)' }}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-center">
            <div>
              <p style={{ ...MONO, fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#E4572E', marginBottom: '12px' }}>
                Follow along
              </p>
              <h2 style={{ ...DISPLAY, fontSize: 'clamp(1.8rem, 3vw, 3rem)', fontWeight: 400, color: 'var(--foreground)', lineHeight: 1.1 }}>
                See more on<br />
                <em style={{ fontStyle: 'italic', color: 'var(--foreground-muted)' }}>Instagram & YouTube</em>
              </h2>
              <p style={{ ...MONO, fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--foreground-muted)', marginTop: '12px' }}>
                Behind-the-lens moments · Japan life · Tech journey
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="https://www.instagram.com/pavitra.hito/"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 transition-all"
                style={{
                  ...MONO,
                  fontSize: '9px',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  padding: '12px 24px',
                  border: '1px solid #E4572E',
                  color: '#E4572E',
                  backgroundColor: 'transparent',
                }}
              >
                Instagram
                <svg className="w-3 h-3 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
              <a
                href="https://www.youtube.com/@pavitramandal37"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 transition-all"
                style={{
                  ...MONO,
                  fontSize: '9px',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  padding: '12px 24px',
                  border: '1px solid var(--card-border)',
                  color: 'var(--foreground-muted)',
                  backgroundColor: 'transparent',
                }}
              >
                YouTube
                <svg className="w-3 h-3 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxPhoto !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{ backgroundColor: 'rgba(14,14,14,0.95)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            <motion.div
              className="relative max-w-5xl max-h-[90vh] w-full mx-4"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={e => e.stopPropagation()}
            >
              <Image
                src={filtered[lightboxPhoto].src}
                alt={filtered[lightboxPhoto].alt}
                width={1200}
                height={800}
                className="w-full h-auto max-h-[80vh] object-contain"
                quality={90}
              />
              <div className="mt-4 flex items-center justify-between">
                <div>
                  <p style={{ ...DISPLAY, fontSize: '1.2rem', color: '#F4F1EA' }}>
                    {filtered[lightboxPhoto].title}
                  </p>
                  <p style={{ ...MONO, fontSize: '9px', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#E4572E', marginTop: '4px' }}>
                    {CATEGORY_LABELS[filtered[lightboxPhoto].category]}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <button onClick={prevPhoto} style={{ ...MONO, fontSize: '9px', letterSpacing: '0.12em', color: 'var(--foreground-muted)', textTransform: 'uppercase' }}>
                    ← Prev
                  </button>
                  <span style={{ ...MONO, fontSize: '9px', color: 'rgba(244,241,234,0.4)' }}>
                    {lightboxPhoto + 1} / {filtered.length}
                  </span>
                  <button onClick={nextPhoto} style={{ ...MONO, fontSize: '9px', letterSpacing: '0.12em', color: 'var(--foreground-muted)', textTransform: 'uppercase' }}>
                    Next →
                  </button>
                  <button onClick={closeLightbox} style={{ ...MONO, fontSize: '9px', letterSpacing: '0.12em', color: '#E4572E', textTransform: 'uppercase', marginLeft: '16px' }}>
                    Close ×
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
