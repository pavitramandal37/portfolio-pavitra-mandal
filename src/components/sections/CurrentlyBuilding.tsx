'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import CornerBrackets from '@/components/ui/CornerBrackets';

const MONO: React.CSSProperties = { fontFamily: 'var(--font-mono)' };
const DISPLAY: React.CSSProperties = { fontFamily: 'var(--font-display)' };

const activeProjects = [
  {
    title: 'AI Demand Forecasting',
    company: 'Sony, Tokyo',
    category: 'Machine Learning · MLOps',
    phase: 'Performance Optimization',
    phaseColor: '#fbbf24',
    phaseBg: 'rgba(251, 191, 36, 0.1)',
    dotColor: '#fbbf24',
    borderColor: 'rgba(251, 191, 36, 0.2)',
    description:
      'Production ML system delivering AI-driven demand forecasts across 280+ product lines globally. Currently optimizing model accuracy and pipeline performance.',
    tags: ['Azure Databricks', 'PySpark', 'MLflow', 'Delta Lake'],
    href: '/projects/sony-ai-demand-forecasting',
  },
  {
    title: 'AI Sales Data Agent',
    company: 'Sony, Tokyo',
    category: 'Generative AI · RAG',
    phase: 'Leading Development',
    phaseColor: '#34d399',
    phaseBg: 'rgba(52, 211, 153, 0.1)',
    dotColor: '#34d399',
    borderColor: 'rgba(52, 211, 153, 0.2)',
    description:
      'Conversational AI agent enabling business users to query Snowflake sales data in plain English — no SQL required. Powered by RAG, Text-to-SQL, and TruLens observability.',
    tags: ['Snowflake Cortex AI', 'RAG', 'Text-to-SQL', 'TruLens'],
    href: '/projects/sale-data-agent',
  },
];

export default function CurrentlyBuilding() {
  return (
    <section className="section-padding relative overflow-hidden" style={{ backgroundColor: 'var(--background-alt)' }}>

      {/* Top separator */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(to right, transparent, var(--border), transparent)' }}
      />

      <div className="max-w-6xl mx-auto">

        {/* Section header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
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
            <span className="inline-block w-1.5 h-1.5 rounded-full animate-pulse mr-2 align-middle" style={{ backgroundColor: '#E4572E' }} />
            Currently Building
          </p>
          <h2
            style={{
              ...DISPLAY,
              fontSize: 'clamp(2rem, 4vw, 4rem)',
              fontWeight: 400,
              lineHeight: 1.1,
              color: 'var(--foreground)',
            }}
          >
            Active at Sony
          </h2>
          <p className="mt-3 text-base" style={{ color: 'var(--foreground-muted)', maxWidth: '480px' }}>
            Two major AI initiatives I am currently leading in production and development.
          </p>
        </motion.div>

        {/* Project cards — staggered grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {activeProjects.map((project, idx) => (
            <motion.div
              key={project.href}
              className={idx === 1 ? 'lg:mt-16' : ''}
              initial={{ opacity: 0, y: 48 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, delay: idx * 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link href={project.href} className="group block h-full">
                <div
                  className="relative p-8 h-full transition-all duration-500 group-hover:shadow-2xl"
                  style={{
                    backgroundColor: 'var(--card)',
                    border: `1px solid ${project.borderColor}`,
                  }}
                >
                  <CornerBrackets size={14} color="#E4572E" thickness={1} gap={4} />

                  {/* Index + company */}
                  <p
                    className="mb-6"
                    style={{
                      ...MONO,
                      fontSize: '10px',
                      letterSpacing: '0.16em',
                      textTransform: 'uppercase',
                      color: 'var(--foreground-muted)',
                    }}
                  >
                    {String(idx + 1).padStart(2, '0')}&nbsp;&nbsp;/&nbsp;&nbsp;{project.company}
                  </p>

                  {/* Category */}
                  <p
                    className="mb-4"
                    style={{
                      ...MONO,
                      fontSize: '9px',
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      color: 'var(--foreground-muted)',
                      opacity: 0.7,
                    }}
                  >
                    {project.category}
                  </p>

                  {/* Phase badge */}
                  <div className="mb-5">
                    <span
                      className="inline-flex items-center gap-2"
                      style={{
                        ...MONO,
                        fontSize: '9px',
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        padding: '4px 10px',
                        backgroundColor: project.phaseBg,
                        color: project.phaseColor,
                        border: `1px solid ${project.borderColor}`,
                      }}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full animate-pulse"
                        style={{ backgroundColor: project.dotColor }}
                      />
                      {project.phase}
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    className="mb-4 transition-colors duration-300 group-hover:text-secondary"
                    style={{
                      ...DISPLAY,
                      fontSize: 'clamp(1.4rem, 2.5vw, 2rem)',
                      fontWeight: 400,
                      lineHeight: 1.15,
                      color: 'var(--foreground)',
                    }}
                  >
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p
                    className="mb-6 text-sm leading-relaxed"
                    style={{ color: 'var(--foreground-muted)' }}
                  >
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tags.map(tag => (
                      <span
                        key={tag}
                        style={{
                          ...MONO,
                          fontSize: '9px',
                          letterSpacing: '0.1em',
                          textTransform: 'uppercase',
                          padding: '4px 8px',
                          border: '1px solid var(--card-border)',
                          color: 'var(--foreground-muted)',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <div
                    className="flex items-center gap-2 transition-all duration-300 group-hover:gap-3"
                    style={{
                      ...MONO,
                      fontSize: '10px',
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      color: project.phaseColor,
                    }}
                  >
                    View Project
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
