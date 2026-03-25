'use client';

import { useEffect, useState, useRef } from 'react';
import { Button } from '@/components/ui';

export default function Hero() {
  const [displayedText, setDisplayedText] = useState('');
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [counts, setCounts] = useState({ savings: 0, products: 0, accuracy: 0 });
  const [terminalComplete, setTerminalComplete] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const terminalLines = [
    { command: '$ cat ~/.profile', output: 'Pavitra Mandal | Full Stack Data Engineer @ Sony' },
    { command: '$ databricks --version', output: 'Production DWH: 3.2GB | ETL: 17+ pipelines & 280+ products | Zero-downtime migrations' },
    { command: '$ python -c "import pandas,pyspark,airflow"', output: '✓ SQL Expert | ✓ Python | ✓ PySpark | ✓ Big Data | ✓ Cloud DWH' },
    { command: '$ ./calculate_impact.sh', output: '📈 High ROI Delivery | 📊 156M+ rows | 🚀 99.9% uptime | ⚡ <65min ETL' },
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

      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(20, 184, 166, 0.2)';
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

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
      {/* Subtle Animated Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: 0 }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/95 via-white/85 to-teal-50/60" />

      {/* Grid Pattern Accent */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(20,184,166,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(20,184,166,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Terminal Window */}
          <div className="order-2 lg:order-1">
            <div className="bg-slate-900/95 backdrop-blur-sm rounded-2xl border border-slate-700/50 shadow-2xl overflow-hidden transform hover:scale-[1.02] transition-transform duration-300">
              {/* Terminal Header */}
              <div className="bg-slate-800/90 px-4 py-3 flex items-center gap-2 border-b border-slate-700/50">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 cursor-pointer transition-colors" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 cursor-pointer transition-colors" />
                  <div className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 cursor-pointer transition-colors" />
                </div>
                <span className="text-slate-400 text-sm ml-2 font-mono">pavitra@portfolio:~</span>
              </div>

              {/* Terminal Body */}
              <div className="p-6 font-mono text-sm min-h-[320px] bg-gradient-to-b from-slate-900 to-slate-950">
                {terminalLines.slice(0, currentLineIndex).map((line, i) => (
                  <div key={i} className="mb-4 animate-fade-in">
                    <div className="text-teal-400">{line.command}</div>
                    <div className="text-slate-300 mt-1">{line.output}</div>
                  </div>
                ))}
                {currentLineIndex < terminalLines.length && (
                  <div>
                    <div className="text-teal-400 inline">{displayedText.split('\n')[0]}</div>
                    {displayedText.includes('\n') && (
                      <div className="text-slate-300 mt-1">
                        {displayedText.split('\n')[1]}
                        {showCursor && <span className="inline-block w-2 h-4 bg-teal-400 ml-1 animate-pulse" />}
                      </div>
                    )}
                    {!displayedText.includes('\n') && showCursor && (
                      <span className="inline-block w-2 h-4 bg-teal-400 ml-1 animate-pulse" />
                    )}
                  </div>
                )}
                
                {/* Terminal completion indicator */}
                {terminalComplete && (
                  <div className="mt-4 text-teal-400 animate-fade-in">
                    <span className="animate-pulse">█</span>
                  </div>
                )}
              </div>
            </div>

            {/* Tech Stack Pills Below Terminal */}
            <div className="mt-6 flex flex-wrap gap-2">
              {[
                'Azure Databricks',
                'PySpark',
                'Delta Lake',
                'Unity Catalog',
                'Azure Data Lake',
                'Apache Airflow',
                'Azure Data Factory',
                'SQL',
                'MLflow',
                'DeepAR',
                'ARIMA',
                'Power BI',
                'CI/CD (GitHub Actions)',
                'Docker',
                'AI Observability (TruLens)'
              ].map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-700 font-medium shadow-sm hover:shadow-md hover:border-teal-300 transition-all"
                >
                  {tech}
                </span>
              ))}
            </div>

          </div>

          {/* Right: Main Content */}
          <div className="order-1 lg:order-2 space-y-8">
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 mt-6 bg-teal-50 border border-teal-200 rounded-full text-teal-700 text-sm font-medium animate-fade-in">
              <span className="w-2 h-2 bg-teal-500 rounded-full animate-pulse" />
              Open for Tech Lead Roles in India & Japan
            </div>


            {/* Greeting */}
            <div className="animate-slide-up">
              <p className="text-teal-600 text-lg font-medium mb-2">
                Hello, I&apos;m
              </p>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 mb-4 -ml-1">
                Pavitra Mandal
              </h1>

              <div className="flex items-center gap-3 text-xl text-slate-700 font-medium">
                <span>Building Production-Grade AI & Data Systems</span>
                <span className="block text-teal-500 text-2xl">at Scale</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-lg text-slate-600 leading-relaxed animate-slide-up" style={{ animationDelay: '0.1s' }}>
              I design and deploy end-to-end data and ML platforms — from ingestion and feature engineering to forecasting, CI/CD, and monitoring — powering business decisions across 280+ product lines at Sony.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <Button href="/projects" variant="primary" size="lg">
                Explore Projects
              </Button>
              <Button href="/contact" variant="outline" size="lg">
                Let&apos;s Connect
              </Button>
            </div>

            {/* Animated Metrics */}
            {terminalComplete && (
              <div className="grid grid-cols-3 gap-6 pt-6 border-t border-slate-200 animate-fade-in">
                <div className="space-y-1">
                  <div className="text-3xl sm:text-4xl font-bold text-teal-600">¥{counts.savings}M</div>
                  <div className="text-xs text-slate-600 font-medium">Cost Savings</div>
                </div>
                <div className="space-y-1">
                  <div className="text-3xl sm:text-4xl font-bold text-teal-600">{counts.products}+</div>
                  <div className="text-xs text-slate-600 font-medium">Product Lines</div>
                </div>
                <div className="space-y-1">
                  <div className="text-3xl sm:text-4xl font-bold text-teal-600">{counts.accuracy}%</div>
                  <div className="text-xs text-slate-600 font-medium">Accuracy ↑</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Decorative Blur Elements */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-teal-200/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-slate-200/15 rounded-full blur-3xl" />
    </section>
  );
}