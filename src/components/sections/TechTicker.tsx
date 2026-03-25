'use client';

import { motion } from 'framer-motion';

const techStack = [
  'Azure Databricks',
  'PySpark',
  'Delta Lake',
  'Unity Catalog',
  'Apache Airflow',
  'Snowflake',
  'Python',
  'SQL',
  'MLflow',
  'DeepAR',
  'Power BI',
  'Docker',
  'CI/CD',
  'D3.js',
  'FastAPI',
  'PostgreSQL',
  'React',
  'Next.js',
  'TruLens',
  'RAG',
  'Three.js',
];

function TickerRow({ direction = 'left', speed = 25 }: { direction?: 'left' | 'right'; speed?: number }) {
  const items = [...techStack, ...techStack]; // Double for seamless loop

  return (
    <div className="flex overflow-hidden py-3">
      <motion.div
        className="flex gap-6 whitespace-nowrap"
        animate={{
          x: direction === 'left' ? ['0%', '-50%'] : ['-50%', '0%'],
        }}
        transition={{
          x: {
            duration: speed,
            repeat: Infinity,
            ease: 'linear',
          },
        }}
      >
        {items.map((tech, i) => (
          <span
            key={`${tech}-${i}`}
            className="inline-flex items-center px-5 py-2.5 bg-white/5 border border-white/10 rounded-full text-sm font-medium text-white/70 hover:text-teal-400 hover:border-teal-400/30 hover:bg-teal-400/5 transition-all duration-300 cursor-default"
          >
            {tech}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export default function TechTicker() {
  return (
    <section className="relative py-20 bg-navy-950 overflow-hidden">
      {/* Gradient fades on edges */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-navy-950 to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-navy-950 to-transparent z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-400 mb-2"
        >
          Tech Stack
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-4xl font-bold text-white"
        >
          Tools I Work With
        </motion.h2>
      </div>

      <TickerRow direction="left" speed={30} />
      <TickerRow direction="right" speed={35} />
    </section>
  );
}
