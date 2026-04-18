'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import CornerBrackets from '@/components/ui/CornerBrackets';
import pageImages from '@/data/pageImages';

const MONO: React.CSSProperties = { fontFamily: 'var(--font-mono)' };
const DISPLAY: React.CSSProperties = { fontFamily: 'var(--font-display)' };

const TERMINAL_LINES = [
  { command: '$ cat ~/.profile',      output: 'Pavitra Mandal | AI & Data Platform Engineer @ Sony, Tokyo' },
  { command: '$ ls ~/active-projects/', output: 'AI_Demand_Forecasting/   Sales_Data_Agent/   [2 active]' },
  { command: '$ python -c "import snowflake.cortex,pyspark"', output: 'RAG | Text-to-SQL | MLOps | Data Engineering' },
  { command: '$ ./impact.sh',          output: '¥36M savings | 156M+ rows | 99.9% uptime | 280+ pipelines' },
];

const TECH_PILLS = [
  'Snowflake Cortex AI', 'RAG', 'Text-to-SQL', 'Prompt Engineering',
  'AI Observability (TruLens)', 'Azure Databricks', 'PySpark', 'Delta Lake',
  'Apache Airflow', 'Azure Data Factory', 'MLflow', 'DeepAR / ARIMA',
  'Power BI', 'Docker', 'CI/CD (GitHub Actions)',
];

export default function TerminalShowcase() {
  const [displayedText, setDisplayedText] = useState('');
  const [lineIdx, setLineIdx] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (lineIdx >= TERMINAL_LINES.length) { setDone(true); return; }
    const line = TERMINAL_LINES[lineIdx];
    const full = `${line.command}\n${line.output}`;
    if (displayedText.length < full.length) {
      const t = setTimeout(() => setDisplayedText(full.slice(0, displayedText.length + 1)), 22);
      return () => clearTimeout(t);
    } else if (lineIdx < TERMINAL_LINES.length - 1) {
      const t = setTimeout(() => { setLineIdx(i => i + 1); setDisplayedText(''); }, 750);
      return () => clearTimeout(t);
    }
  }, [displayedText, lineIdx]);

  useEffect(() => {
    const i = setInterval(() => setShowCursor(c => !c), 530);
    return () => clearInterval(i);
  }, []);

  return (
    <section className="section-padding bg-background-alt relative overflow-hidden">
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(to right, transparent, var(--border), transparent)' }}
      />

      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

        {/* ── Left: decorative landscape image ── */}
        <motion.div
          className="relative hidden lg:block overflow-hidden"
          style={{ aspectRatio: '3/4' }}
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85 }}
        >
          <Image
            src={pageImages.terminal}
            alt="Engineering philosophy"
            fill
            className="object-cover"
            sizes="50vw"
            quality={85}
          />
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to top, rgba(14,14,14,0.8) 30%, rgba(14,14,14,0.1) 100%)' }}
          />
          <CornerBrackets size={24} color="#E4572E" thickness={1.5} gap={8} />
          <div className="absolute bottom-8 left-8 right-8 z-10">
            <p style={{ ...MONO, fontSize: '9px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(244,241,234,0.55)', marginBottom: '10px' }}>
              Engineering Philosophy
            </p>
            <p style={{ ...DISPLAY, fontSize: '1.6rem', color: 'rgba(244,241,234,0.9)', lineHeight: 1.2 }}>
              Build with precision.<br />
              <em style={{ fontStyle: 'italic', color: 'rgba(244,241,234,0.65)' }}>Deploy with confidence.</em>
            </p>
          </div>
        </motion.div>

        {/* ── Right: terminal ── */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85, delay: 0.1 }}
        >
          <p style={{ ...MONO, fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#E4572E', marginBottom: '16px' }}>
            <span className="inline-block w-1.5 h-1.5 rounded-full mr-2 align-middle animate-pulse" style={{ backgroundColor: '#E4572E' }} />
            System Profile
          </p>

          <h2 style={{ ...DISPLAY, fontSize: 'clamp(2rem, 3.5vw, 3.5rem)', fontWeight: 400, color: 'var(--foreground)', marginBottom: '32px', lineHeight: 1.1 }}>
            Who I am
          </h2>

          {/* Terminal window */}
          <div
            className="border overflow-hidden mb-6"
            style={{ backgroundColor: 'var(--terminal-bg)', borderColor: 'var(--terminal-border)' }}
          >
            <div
              className="flex items-center gap-2 px-4 py-3 border-b"
              style={{ backgroundColor: 'var(--terminal-header)', borderColor: 'var(--terminal-border)' }}
            >
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <span style={{ ...MONO, fontSize: '12px', color: '#6b7280', marginLeft: '8px' }}>
                pavitra@portfolio:~
              </span>
            </div>

            <div className="p-5" style={{ ...MONO, fontSize: '13px', minHeight: '240px' }}>
              {TERMINAL_LINES.slice(0, lineIdx).map((line, i) => (
                <div key={i} className="mb-3">
                  <div style={{ color: '#2dd4bf' }}>{line.command}</div>
                  <div style={{ color: '#a1a1aa', marginTop: '4px' }}>{line.output}</div>
                </div>
              ))}
              {lineIdx < TERMINAL_LINES.length && (
                <div>
                  <div style={{ color: '#2dd4bf' }}>{displayedText.split('\n')[0]}</div>
                  {displayedText.includes('\n') && (
                    <div style={{ color: '#a1a1aa', marginTop: '4px' }}>
                      {displayedText.split('\n')[1]}
                      {showCursor && <span style={{ color: '#2dd4bf' }}>█</span>}
                    </div>
                  )}
                  {!displayedText.includes('\n') && showCursor && (
                    <span style={{ color: '#2dd4bf' }}>█</span>
                  )}
                </div>
              )}
              {done && (
                <div style={{ color: '#2dd4bf', marginTop: '8px' }}>
                  <span className="animate-pulse">█</span>
                </div>
              )}
            </div>
          </div>

          {/* Tech pills */}
          <div className="flex flex-wrap gap-2">
            {TECH_PILLS.map(tech => (
              <span
                key={tech}
                className="border px-2.5 py-1"
                style={{
                  ...MONO,
                  fontSize: '9px',
                  letterSpacing: '0.08em',
                  borderColor: 'var(--card-border)',
                  color: 'var(--foreground-muted)',
                  backgroundColor: 'var(--card)',
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
