'use client';

import { useEffect, useState, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui';
import dynamic from 'next/dynamic';

const DataNetwork = dynamic(() => import('@/components/three/DataNetwork'), {
  ssr: false,
  loading: () => null,
});

export default function Hero() {
  const [counts, setCounts] = useState({ savings: 0, products: 0, accuracy: 0 });
  const [hasAnimated, setHasAnimated] = useState(false);

  // Animated counters on mount
  useEffect(() => {
    if (hasAnimated) return;
    setHasAnimated(true);

    const targets = { savings: 36, products: 280, accuracy: 15 };
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic

      setCounts({
        savings: Math.floor(targets.savings * eased),
        products: Math.floor(targets.products * eased),
        accuracy: Math.floor(targets.accuracy * eased),
      });

      if (step >= steps) clearInterval(timer);
    }, interval);

    return () => clearInterval(timer);
  }, [hasAnimated]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-navy-950">
      {/* Three.js Data Network Background */}
      <Suspense fallback={null}>
        <DataNetwork />
      </Suspense>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-950/40 via-transparent to-navy-950" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,var(--navy-950)_70%)]" />

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(20,184,166,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(20,184,166,0.03)_1px,transparent_1px)] bg-[size:80px_80px]" />

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
        <div className="text-center">
          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 mb-10 border border-teal-500/30 rounded-full bg-teal-500/10 backdrop-blur-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-400" />
            </span>
            <span className="text-teal-300 text-sm font-medium tracking-wide">
              Open for Tech Lead Roles in India & Japan
            </span>
          </motion.div>

          {/* Name - Split Large */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="font-bold tracking-tight leading-[0.85]">
              <span className="block text-[clamp(3.5rem,12vw,10rem)] text-white">
                PAVITRA
              </span>
              <span className="block text-[clamp(3.5rem,12vw,10rem)] text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-teal-300 to-emerald-400">
                MANDAL
              </span>
            </h1>
          </motion.div>

          {/* Role */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-8 space-y-3"
          >
            <p className="text-xl sm:text-2xl md:text-3xl font-semibold text-white/90">
              Full Stack Data Engineer
            </p>
            <p className="text-lg text-white/50 max-w-2xl mx-auto font-medium">
              Building Production-Grade AI & Data Systems{' '}
              <span className="text-teal-400 font-bold">at Scale</span>{' '}
              — powering business decisions across{' '}
              <span className="text-white font-semibold">280+ product lines at Sony</span>
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="mt-12 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button href="/projects" variant="secondary" size="lg" className="text-lg px-10 py-4">
              Explore Projects
            </Button>
            <Button
              href="/contact"
              variant="ghost"
              size="lg"
              className="text-lg px-10 py-4 border border-white/20 text-white hover:bg-white/10 hover:border-white/40"
            >
              Let&apos;s Connect
            </Button>
          </motion.div>

          {/* Impact Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9 }}
            className="mt-20 grid grid-cols-3 gap-6 max-w-3xl mx-auto"
          >
            <div className="group relative p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:border-teal-400/30 hover:bg-white/10 transition-all duration-300">
              <div className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
                ¥{counts.savings}<span className="text-teal-400 text-3xl">M</span>
              </div>
              <div className="text-sm font-medium text-white/50 mt-2">Cost Savings</div>
            </div>
            <div className="group relative p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:border-teal-400/30 hover:bg-white/10 transition-all duration-300">
              <div className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
                {counts.products}<span className="text-teal-400 text-3xl">+</span>
              </div>
              <div className="text-sm font-medium text-white/50 mt-2">Product Lines</div>
            </div>
            <div className="group relative p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:border-teal-400/30 hover:bg-white/10 transition-all duration-300">
              <div className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
                {counts.accuracy}<span className="text-teal-400 text-3xl">%</span>
              </div>
              <div className="text-sm font-medium text-white/50 mt-2">Accuracy Gain</div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-white/30 text-xs uppercase tracking-[0.3em] font-medium">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center p-1.5"
        >
          <div className="w-1 h-2 rounded-full bg-teal-400" />
        </motion.div>
      </motion.div>
    </section>
  );
}
