'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import CornerBrackets from './CornerBrackets';

const MONO: React.CSSProperties = { fontFamily: 'var(--font-mono)' };
const DISPLAY: React.CSSProperties = { fontFamily: 'var(--font-display)' };

interface PageHeroProps {
  title: string;
  titleItalic?: string;
  subtitle?: string;
  category?: string;
  imageSrc: string;
  imageAlt?: string;
}

export default function PageHero({
  title,
  titleItalic,
  subtitle,
  category,
  imageSrc,
  imageAlt,
}: PageHeroProps) {
  return (
    <section
      className="relative overflow-hidden w-full"
      style={{ height: '58vh', minHeight: '420px' }}
    >
      {/* Background image */}
      <Image
        src={imageSrc}
        alt={imageAlt ?? title}
        fill
        className="object-cover object-center"
        priority
        quality={85}
        sizes="100vw"
      />

      {/* Directional gradient — strong left, fades right */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to right, var(--hero-overlay-strong) 0%, var(--hero-overlay-strong) 40%, var(--hero-overlay-mid) 70%, transparent 100%)',
        }}
      />

      {/* Bottom fade into page */}
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{
          height: '180px',
          background: 'linear-gradient(to top, var(--background) 0%, transparent 100%)',
        }}
      />

      {/* Viewfinder corner brackets */}
      <div className="absolute inset-5 z-10 hidden sm:block">
        <CornerBrackets size={22} color="#E4572E" thickness={1.5} />
      </div>

      {/* Content — sits at bottom-left */}
      <div className="relative z-20 h-full flex flex-col justify-end px-6 sm:px-10 lg:px-16 pb-14 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          {category && (
            <p
              className="mb-4"
              style={{
                ...MONO,
                fontSize: '10px',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: '#E4572E',
              }}
            >
              <span
                className="inline-block w-1.5 h-1.5 rounded-full mr-2 align-middle"
                style={{ backgroundColor: '#E4572E' }}
              />
              {category}
            </p>
          )}

          <h1
            style={{
              ...DISPLAY,
              fontSize: 'clamp(2.4rem, 5.5vw, 6.5rem)',
              fontWeight: 400,
              lineHeight: 1.06,
              letterSpacing: '-0.02em',
              color: 'var(--foreground)',
            }}
          >
            {title}
            {titleItalic && (
              <>
                <br />
                <em style={{ fontStyle: 'italic', color: 'var(--foreground-muted)' }}>
                  {titleItalic}
                </em>
              </>
            )}
          </h1>

          {subtitle && (
            <p
              className="mt-4"
              style={{
                ...MONO,
                fontSize: '11px',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--foreground-muted)',
              }}
            >
              {subtitle}
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
