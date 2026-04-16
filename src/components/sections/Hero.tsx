'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui';

export default function Hero() {
  const [displayedText, setDisplayedText] = useState('');
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [counts, setCounts] = useState({ savings: 0, products: 0, accuracy: 0 });
  const [terminalComplete, setTerminalComplete] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const terminalLines = [
    {
      command: '$ cat ~/.profile',
      output: 'Pavitra Mandal | AI & Data Platform Engineer @ Sony, Tokyo',
    },
    {
      command: '$ ls ~/active-projects/',
      output: 'AI_Demand_Forecasting/ [perf-optimization]   Sales_Data_Agent/ [leading]',
    },
    {
      command: '$ python -c "import snowflake.cortex,pyspark,airflow"',
      output: 'AI Agent Dev | RAG | Text-to-SQL | MLOps | Data Engineering',
    },
    {
      command: '$ ./calculate_impact.sh',
      output: 'High ROI Delivery | 156M+ rows | 99.9% uptime | ¥36M cost savings',
    },
  ];

  // Terminal typing animation
  useEffect(() => {
    if (currentLineIndex >= terminalLines.length) {
      setTerminalComplete(true);
      return;
    }

    const currentLine = terminalLines[currentLineIndex];
    const fullText = currentLine.command + '\n' + currentLine.output;

    if (displayedText.length < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(fullText.slice(0, displayedText.length + 1));
      }, 30);
      return () => clearTimeout(timeout);
    } else if (currentLineIndex < terminalLines.length - 1) {
      const timeout = setTimeout(() => {
        setCurrentLineIndex(currentLineIndex + 1);
        setDisplayedText('');
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [displayedText, currentLineIndex]);

  // Cursor blinking
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  // Animated counters (start after terminal completes)
  useEffect(() => {
    if (!terminalComplete) return;

    const targets = { savings: 36, products: 280, accuracy: 15 };
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;

      setCounts({
        savings: Math.floor(targets.savings * progress),
        products: Math.floor(targets.products * progress),
        accuracy: Math.floor(targets.accuracy * progress),
      });

      if (step >= steps) clearInterval(timer);
    }, interval);

    return () => clearInterval(timer);
  }, [terminalComplete]);

  // Subtle particle background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
    }> = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    const createParticles = () => {
      particles = [];
      const numParticles = Math.floor((canvas.width * canvas.height) / 30000);

      for (let i = 0; i < numParticles; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.2,
          vy: (Math.random() - 0.5) * 0.2,
          radius: Math.random() * 1.5 + 0.5,
        });
      }
    };

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const particleColor = getComputedStyle(document.documentElement)
        .getPropertyValue('--particle-color').trim() || 'rgba(20, 184, 166, 0.2)';

      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particleColor;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(drawParticles);
    };

    resize();
    createParticles();
    drawParticles();

    window.addEventListener('resize', () => {
      resize();
      createParticles();
    });

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  const techPills = [
    // AI / GenAI first
    'Snowflake Cortex AI',
    'RAG Development',
    'Text-to-SQL',
    'Prompt Engineering',
    'LLM Orchestration',
    'AI Observability (TruLens)',
    'Snowflake Intelligence',
    // Data Engineering
    'Azure Databricks',
    'PySpark',
    'Delta Lake',
    'Apache Airflow',
    'Azure Data Factory',
    'SQL',
    'MLflow',
    'DeepAR / ARIMA',
    'Power BI',
    'Docker',
    'CI/CD (GitHub Actions)',
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Subtle Animated Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: 0 }}
      />

      {/* Gradient Overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to bottom right, var(--hero-gradient-from), var(--hero-gradient-via), var(--hero-gradient-to))`,
        }}
      />

      {/* Grid Pattern Accent */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(20,184,166,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(20,184,166,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left: Terminal Window */}
          <motion.div
            className="order-2 lg:order-1"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
          >
            <div
              className="backdrop-blur-sm rounded-2xl border shadow-2xl overflow-hidden transform hover:scale-[1.02] transition-transform duration-300"
              style={{
                backgroundColor: 'var(--terminal-bg)',
                borderColor: 'var(--terminal-border)',
              }}
            >
              {/* Terminal Header */}
              <div
                className="px-4 py-3 flex items-center gap-2 border-b"
                style={{
                  backgroundColor: 'var(--terminal-header)',
                  borderColor: 'var(--terminal-border)',
                }}
              >
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 cursor-pointer transition-colors" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 cursor-pointer transition-colors" />
                  <div className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 cursor-pointer transition-colors" />
                </div>
                <span className="ml-2 font-mono text-sm" style={{ color: '#6b7280' }}>
                  pavitra@portfolio:~
                </span>
              </div>

              {/* Terminal Body — always use dark-theme fixed colors for readability */}
              <div className="p-6 font-mono text-sm min-h-[320px]">
                {terminalLines.slice(0, currentLineIndex).map((line, i) => (
                  <div key={i} className="mb-4">
                    <div style={{ color: '#2dd4bf' }}>{line.command}</div>
                    <div className="mt-1" style={{ color: '#a1a1aa' }}>{line.output}</div>
                  </div>
                ))}
                {currentLineIndex < terminalLines.length && (
                  <div>
                    <div className="inline" style={{ color: '#2dd4bf' }}>
                      {displayedText.split('\n')[0]}
                    </div>
                    {displayedText.includes('\n') && (
                      <div className="mt-1" style={{ color: '#a1a1aa' }}>
                        {displayedText.split('\n')[1]}
                        {showCursor && (
                          <span
                            className="inline-block w-2 h-4 ml-1 animate-pulse"
                            style={{ backgroundColor: '#2dd4bf' }}
                          />
                        )}
                      </div>
                    )}
                    {!displayedText.includes('\n') && showCursor && (
                      <span
                        className="inline-block w-2 h-4 ml-1 animate-pulse"
                        style={{ backgroundColor: '#2dd4bf' }}
                      />
                    )}
                  </div>
                )}

                {/* Terminal completion indicator */}
                {terminalComplete && (
                  <div className="mt-4" style={{ color: '#2dd4bf' }}>
                    <span className="animate-pulse">█</span>
                  </div>
                )}
              </div>
            </div>

            {/* Tech Stack Pills */}
            <div className="mt-6 flex flex-wrap gap-2">
              {techPills.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium shadow-sm hover:shadow-md transition-all border"
                  style={{
                    backgroundColor: 'var(--hero-pill-bg)',
                    borderColor: 'var(--hero-pill-border)',
                    color: 'var(--hero-pill-text)',
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Right: Main Content */}
          <div className="order-1 lg:order-2 space-y-6">

            {/* Status Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0 }}
            >
              <div
                className="inline-flex items-center gap-2 px-4 py-2 mt-6 rounded-full text-sm font-medium border"
                style={{
                  backgroundColor: 'var(--hero-badge-bg)',
                  borderColor: 'var(--hero-badge-border)',
                  color: 'var(--hero-badge-text)',
                }}
              >
                <span className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
                Open for Tech Lead Roles in India &amp; Japan
              </div>
            </motion.div>

            {/* Greeting + Name */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
            >
              <p className="text-secondary text-lg font-medium mb-2">Hello, I&apos;m</p>
              <h1
                className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-4 -ml-1"
                style={{ color: 'var(--hero-heading)' }}
              >
                Pavitra Mandal
              </h1>
              <div className="flex items-center gap-3 text-xl font-medium" style={{ color: 'var(--hero-subtitle)' }}>
                <span>AI &amp; Data Platform Engineer</span>
                <span className="text-secondary text-2xl">@ Scale</span>
              </div>
            </motion.div>

            {/* Description */}
            <motion.p
              className="text-lg leading-relaxed text-foreground-muted"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
            >
              Currently leading two major AI initiatives at Sony — an enterprise
              AI Sales Data Agent (conversational analytics on Snowflake) and an
              AI Demand Forecasting platform in production ops across 280+ product
              lines. I architect end-to-end data &amp; AI systems from ingestion and
              RAG pipelines to LLM observability and MLOps.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-3 flex-wrap"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45, ease: 'easeOut' }}
            >
              <Button href="/projects" variant="primary" size="lg">
                Explore Projects
              </Button>
              <Button href="/contact" variant="outline" size="lg">
                Let&apos;s Connect
              </Button>
            </motion.div>

            {/* Animated Metrics */}
            {terminalComplete && (
              <motion.div
                className="grid grid-cols-3 gap-6 pt-6 border-t border-card-border"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="space-y-1">
                  <div className="text-3xl sm:text-4xl font-bold text-secondary">¥{counts.savings}M</div>
                  <div className="text-xs text-foreground-muted font-medium">Cost Savings</div>
                </div>
                <div className="space-y-1">
                  <div className="text-3xl sm:text-4xl font-bold text-secondary">{counts.products}+</div>
                  <div className="text-xs text-foreground-muted font-medium">Product Lines</div>
                </div>
                <div className="space-y-1">
                  <div className="text-3xl sm:text-4xl font-bold text-secondary">{counts.accuracy}%</div>
                  <div className="text-xs text-foreground-muted font-medium">Accuracy ↑</div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Decorative Blur Elements */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-secondary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-muted/30 rounded-full blur-3xl" />
    </section>
  );
}
