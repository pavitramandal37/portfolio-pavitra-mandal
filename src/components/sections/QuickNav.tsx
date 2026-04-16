'use client';

import Link from 'next/link';
import { motion, type Variants } from 'framer-motion';

const navCards = [
  {
    title: 'Projects',
    description: 'Explore my portfolio of AI systems, data pipelines, and automation tools',
    href: '/projects',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
        />
      </svg>
    ),
  },
  {
    title: 'Experience',
    description: 'My professional journey at Sony, Cisco, and Tech Mahindra',
    href: '/experience',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
  },
  {
    title: 'Contact',
    description: "Let's connect and discuss opportunities or collaborations",
    href: '/contact',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export default function QuickNav() {
  return (
    <section className="section-padding bg-background-alt relative">
      {/* Top divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="max-w-6xl mx-auto">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {navCards.map((card) => (
            <motion.div key={card.href} variants={cardVariants}>
              <Link
                href={card.href}
                className="group relative flex flex-col p-6 rounded-xl bg-card border border-card-border overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-secondary/40 h-full"
              >
                {/* Teal left accent border */}
                <div className="absolute left-0 top-4 bottom-4 w-[3px] rounded-full bg-gradient-to-b from-secondary/60 via-secondary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Icon */}
                <div className="inline-flex p-3 rounded-lg bg-secondary/10 text-secondary mb-4 w-fit">
                  {card.icon}
                </div>

                {/* Text */}
                <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-secondary transition-colors">
                  {card.title}
                </h3>
                <p className="text-sm text-foreground-muted flex-1">
                  {card.description}
                </p>

                {/* Arrow */}
                <div className="mt-4 flex items-center gap-1 text-secondary text-sm font-semibold opacity-0 group-hover:opacity-100 translate-x-0 group-hover:translate-x-1 transition-all duration-200">
                  Explore
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
