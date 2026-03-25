'use client';

import { Hero, FeaturedProjects, QuickNav } from '@/components/sections';
import { motion } from 'framer-motion';

export default function HomePage() {
  return (
    <>
      <Hero />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <QuickNav />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <FeaturedProjects />
      </motion.div>
    </>
  );
}
