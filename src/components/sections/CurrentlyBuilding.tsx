'use client';

import { motion, type Variants } from 'framer-motion';
import Link from 'next/link';

const activeProjects = [
  {
    title: 'AI Demand Forecasting',
    company: 'Sony, Tokyo',
    phase: 'Performance Optimization',
    phaseColor: '#fbbf24',
    phaseBg: 'rgba(251, 191, 36, 0.12)',
    problem: 'Production ML system delivering AI-driven demand forecasts across 280+ product lines globally. Currently optimizing model accuracy and pipeline performance.',
    tags: ['Azure Databricks', 'PySpark', 'MLflow', 'Delta Lake'],
    tagColor: 'rgba(251, 191, 36, 0.15)',
    tagText: '#fbbf24',
    href: '/projects/sony-ai-demand-forecasting',
    dotColor: '#fbbf24',
    borderColor: 'rgba(251, 191, 36, 0.25)',
  },
  {
    title: 'AI Sales Data Agent',
    company: 'Sony, Tokyo',
    phase: 'Leading Development',
    phaseColor: '#34d399',
    phaseBg: 'rgba(52, 211, 153, 0.12)',
    problem: 'Conversational AI agent enabling business users to query Snowflake sales data in plain English — no SQL required. Powered by RAG, Text-to-SQL, and TruLens observability.',
    tags: ['Snowflake Cortex AI', 'RAG', 'Text-to-SQL', 'TruLens'],
    tagColor: 'rgba(52, 211, 153, 0.15)',
    tagText: '#34d399',
    href: '/projects/sale-data-agent',
    dotColor: '#34d399',
    borderColor: 'rgba(52, 211, 153, 0.25)',
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
};

export default function CurrentlyBuilding() {
  return (
    <section className="section-padding bg-background relative overflow-hidden">
      {/* Subtle top separator */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-transparent via-secondary/30 to-transparent" />

      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          className="mb-10 flex items-start gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
              <span className="text-xs font-mono uppercase tracking-widest text-secondary font-semibold">
                What I&apos;m Building Now
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              Active at Sony
            </h2>
            <p className="mt-2 text-foreground-muted text-base max-w-xl">
              Two major AI initiatives I am currently leading in production and development.
            </p>
          </div>
        </motion.div>

        {/* Project cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {activeProjects.map((project) => (
            <motion.div key={project.href} variants={cardVariants}>
              <Link href={project.href} className="block group">
                <div
                  className="relative rounded-2xl border p-6 h-full transition-all duration-300 group-hover:shadow-lg group-hover:scale-[1.02]"
                  style={{
                    backgroundColor: 'var(--card)',
                    borderColor: project.borderColor,
                  }}
                >
                  {/* LIVE badge */}
                  <div className="absolute top-4 right-4">
                    <span
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest"
                      style={{
                        backgroundColor: project.phaseBg,
                        color: project.phaseColor,
                        border: `1px solid ${project.borderColor}`,
                      }}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full animate-pulse inline-block"
                        style={{ backgroundColor: project.dotColor }}
                      />
                      LIVE
                    </span>
                  </div>

                  {/* Title + company */}
                  <div className="mb-3 pr-16">
                    <h3 className="text-lg font-bold text-foreground group-hover:text-secondary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs text-foreground-muted font-mono mt-0.5">{project.company}</p>
                  </div>

                  {/* Phase badge */}
                  <div className="mb-4">
                    <span
                      className="inline-block px-2.5 py-1 rounded-lg text-[11px] font-semibold"
                      style={{ backgroundColor: project.phaseBg, color: project.phaseColor }}
                    >
                      {project.phase}
                    </span>
                  </div>

                  {/* Problem statement */}
                  <p className="text-sm text-foreground-muted leading-relaxed mb-5">
                    {project.problem}
                  </p>

                  {/* Tech tags */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-md text-[11px] font-medium"
                        style={{ backgroundColor: project.tagColor, color: project.tagText }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <div
                    className="flex items-center gap-1 text-sm font-semibold transition-all duration-200 group-hover:gap-2"
                    style={{ color: project.phaseColor }}
                  >
                    View Project
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
