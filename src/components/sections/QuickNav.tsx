'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import CornerBrackets from '@/components/ui/CornerBrackets';
import pageImages from '@/data/pageImages';

const MONO: React.CSSProperties = { fontFamily: 'var(--font-mono)' };
const DISPLAY: React.CSSProperties = { fontFamily: 'var(--font-display)' };

const navPanels = [
  {
    number: '01',
    title: 'Projects',
    subtitle: 'AI Systems & Data Platforms',
    href: '/projects',
    imageSrc: pageImages.navProjects,
  },
  {
    number: '02',
    title: 'Experience',
    subtitle: 'Sony · Cisco · Tech Mahindra',
    href: '/experience',
    imageSrc: pageImages.navExperience,
  },
  {
    number: '03',
    title: 'Contact',
    subtitle: "Let's build together",
    href: '/contact',
    imageSrc: pageImages.navContact,
  },
];

export default function QuickNav() {
  return (
    <section className="section-padding bg-background relative overflow-hidden">
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(to right, transparent, var(--border), transparent)' }}
      />

      <div className="max-w-6xl mx-auto">

        {/* Section header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p style={{ ...MONO, fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#E4572E', marginBottom: '12px' }}>
            Explore
          </p>
          <h2 style={{ ...DISPLAY, fontSize: 'clamp(1.8rem, 3.5vw, 3.5rem)', fontWeight: 400, color: 'var(--foreground)', lineHeight: 1.1 }}>
            Navigate the portfolio
          </h2>
        </motion.div>

        {/* Photo panels grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
        >
          {navPanels.map(panel => (
            <motion.div
              key={panel.href}
              variants={{ hidden: { opacity: 0, y: 32 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } } }}
            >
              <Link href={panel.href} className="group block relative overflow-hidden" style={{ height: '320px' }}>
                {/* Landscape photo */}
                <Image
                  src={panel.imageSrc}
                  alt={panel.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, 33vw"
                  quality={80}
                />

                {/* Dark overlay — lightens on hover */}
                <div
                  className="absolute inset-0 transition-opacity duration-500"
                  style={{ background: 'linear-gradient(to top, rgba(14,14,14,0.85) 0%, rgba(14,14,14,0.3) 100%)' }}
                />
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ backgroundColor: 'rgba(228,87,46,0.12)' }}
                />

                {/* Corner brackets */}
                <div className="absolute inset-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <CornerBrackets size={14} color="#E4572E" thickness={1} />
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p style={{ ...MONO, fontSize: '9px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(228,87,46,0.9)', marginBottom: '6px' }}>
                    {panel.number}
                  </p>
                  <h3
                    className="transition-all duration-300 group-hover:translate-x-1"
                    style={{ ...DISPLAY, fontSize: '1.8rem', fontWeight: 400, color: '#F4F1EA', lineHeight: 1.1, marginBottom: '6px' }}
                  >
                    {panel.title}
                  </h3>
                  <p style={{ ...MONO, fontSize: '9px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(244,241,234,0.55)' }}>
                    {panel.subtitle}
                  </p>

                  {/* Arrow */}
                  <div
                    className="mt-4 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0"
                    style={{ ...MONO, fontSize: '9px', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#E4572E' }}
                  >
                    Explore
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
