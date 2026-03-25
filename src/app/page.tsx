'use client';

import { Hero } from '@/components/sections';
import ProjectShowcase from '@/components/sections/ProjectShowcase';
import TechTicker from '@/components/sections/TechTicker';
import { motion } from 'framer-motion';

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* About / Intro Section */}
      <section className="relative py-32 bg-navy-950">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-400 mb-6"
          >
            About Me
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-2xl md:text-3xl lg:text-4xl font-medium text-white/80 leading-relaxed"
          >
            I design and deploy <span className="text-white font-bold">end-to-end data and ML platforms</span> — from
            ingestion and feature engineering to forecasting, CI/CD, and monitoring — powering business decisions across{' '}
            <span className="text-teal-400 font-bold">Sony</span>,{' '}
            <span className="text-teal-400 font-bold">Cisco</span>, and enterprise clients worldwide.
          </motion.p>
        </div>
      </section>

      <ProjectShowcase />
      <TechTicker />

      {/* Quick Nav Section */}
      <section className="relative py-24 bg-navy-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Experience',
                description: 'My professional journey at Sony, Cisco, and beyond',
                href: '/experience',
                number: '01',
              },
              {
                title: 'All Projects',
                description: 'Full portfolio of ML systems, data pipelines, and tools',
                href: '/projects',
                number: '02',
              },
              {
                title: 'Get in Touch',
                description: 'Open for collaboration, consulting, or opportunities',
                href: '/contact',
                number: '03',
              },
            ].map((card, index) => (
              <motion.a
                key={card.href}
                href={card.href}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative p-8 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-teal-400/30 transition-all duration-500"
              >
                <span className="text-5xl font-extrabold text-white/5 group-hover:text-teal-400/10 transition-colors">
                  {card.number}
                </span>
                <h3 className="text-xl font-bold text-white mt-4 mb-2 group-hover:text-teal-400 transition-colors">
                  {card.title}
                </h3>
                <p className="text-white/40 text-sm leading-relaxed">
                  {card.description}
                </p>
                <div className="mt-6 flex items-center text-teal-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Explore</span>
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
