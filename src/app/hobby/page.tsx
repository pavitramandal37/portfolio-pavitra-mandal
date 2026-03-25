'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface Hobby {
  id: string;
  title: string;
  emoji: string;
  category: 'creative' | 'active' | 'learning' | 'social';
  description: string;
  why: string;
  highlights: string[];
  gradient: string;
  externalLinks?: { label: string; url: string; icon: string }[];
}

const hobbies: Hobby[] = [
  {
    id: 'social-creator',
    title: 'Content Creator',
    emoji: '🎬',
    category: 'social',
    description: 'Sharing the developer journey and life in Tokyo through video and visuals.',
    why: 'Building in public and sharing experiences creates a feedback loop that accelerates growth.',
    highlights: ['YouTube: Tech & Life Vlogs', 'Instagram: Visual Portfolio', 'Community engagement'],
    gradient: 'from-pink-500 to-rose-600',
    externalLinks: [
      { label: 'YouTube Channel', url: 'https://www.youtube.com/@pavitramandal37', icon: '📺' },
      { label: 'Instagram', url: 'https://www.instagram.com/pavitra.hito/', icon: '📸' },
    ],
  },
  {
    id: 'hiking',
    title: 'Hiking & Nature',
    emoji: '🥾',
    category: 'active',
    description: 'Trading the keyboard for mountain trails to reset dopamine levels.',
    why: 'The best debugging happens offline. Conquering physical peaks builds endurance.',
    highlights: ['Weekend trail explorations', 'Nature photography integration', 'Disconnecting to reconnect'],
    gradient: 'from-emerald-500 to-teal-700',
  },
  {
    id: 'tech-tinkering',
    title: 'Tech Tinkering',
    emoji: '🔧',
    category: 'learning',
    description: 'Exploring new stacks and hardware outside of work requirements.',
    why: 'Innovation happens when you break things just to see how they work.',
    highlights: ['Experimenting with LLM fine-tuning', 'Home automation & IoT projects', 'Building fun CLI tools'],
    gradient: 'from-cyan-500 to-blue-600',
  },
  {
    id: 'photography',
    title: 'Photo & Video',
    emoji: '📸',
    category: 'creative',
    description: 'Visual storyteller capturing moments through cinematic vlogs and street photography.',
    why: 'Code builds the logic, but visual storytelling captures the emotion.',
    highlights: ['Cinematic video editing (DaVinci/Premiere)', 'Street photography & color grading', 'Documenting journey'],
    gradient: 'from-purple-600 to-indigo-600',
  },
  {
    id: 'chess',
    title: 'Chess Strategy',
    emoji: '♟️',
    category: 'learning',
    description: 'A mental "Refresh" button. Playing not for the grind, but for the beauty of pure logic.',
    why: 'Stepping away from code syntax to pure strategy helps reset problem-solving focus.',
    highlights: ['Casual rapid games for mental agility', 'Studying grandmaster patterns', 'Pure strategic relaxation'],
    gradient: 'from-slate-500 to-slate-700',
  },
];

const categories = {
  creative: { label: 'Creative', icon: '🎨' },
  active: { label: 'Active', icon: '⚡' },
  learning: { label: 'Learning', icon: '🧠' },
  social: { label: 'Social', icon: '🤝' },
};

export default function HobbiesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedHobby, setExpandedHobby] = useState<string | null>(null);

  const filteredHobbies = selectedCategory === 'all'
    ? hobbies
    : hobbies.filter(h => h.category === selectedCategory);

  return (
    <div className="min-h-screen bg-navy-950 pt-20">
      {/* Hero */}
      <section className="relative overflow-hidden py-20 border-b border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.1),transparent_60%)]" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center gap-4 mb-8 text-5xl"
          >
            {['📸', '🥾', '♟️', '🔧'].map((emoji, i) => (
              <span key={i} className="inline-block hover:scale-125 transition-transform cursor-pointer">{emoji}</span>
            ))}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6"
          >
            Beyond the Code
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/50 max-w-3xl mx-auto mb-8"
          >
            From cinematic editing to mountain trails — this is what fuels my creativity and keeps me human.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="inline-flex items-center gap-3 px-6 py-3 bg-white/5 backdrop-blur-sm rounded-full border border-white/10"
          >
            <span className="text-white/70 font-semibold">Tech at Core</span>
            <span className="text-teal-400">•</span>
            <span className="text-white/70 font-semibold">Creative at Heart</span>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="sticky top-20 z-20 bg-navy-900/90 backdrop-blur-xl border-b border-white/5 py-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-6 py-3 rounded-full font-semibold text-sm transition-all ${
                selectedCategory === 'all'
                  ? 'bg-teal-500 text-white'
                  : 'bg-white/5 text-white/60 border border-white/10 hover:text-white'
              }`}
            >
              All Interests <span className="ml-1 text-xs opacity-70">{hobbies.length}</span>
            </button>
            {Object.entries(categories).map(([key, cat]) => (
              <button
                key={key}
                onClick={() => setSelectedCategory(key)}
                className={`px-6 py-3 rounded-full font-semibold text-sm transition-all ${
                  selectedCategory === key
                    ? 'bg-teal-500 text-white'
                    : 'bg-white/5 text-white/60 border border-white/10 hover:text-white'
                }`}
              >
                <span className="mr-2">{cat.icon}</span>
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Hobbies Grid */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredHobbies.map((hobby, index) => (
              <motion.div
                key={hobby.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group relative bg-navy-900 rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300 flex flex-col"
              >
                {/* Gradient Header */}
                <div className={`bg-gradient-to-br ${hobby.gradient} p-8 relative overflow-hidden`}>
                  <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.2),transparent)]" />
                  <div className="relative z-10">
                    <div className="text-6xl mb-4 group-hover:scale-110 group-hover:rotate-6 transition-transform">
                      {hobby.emoji}
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">{hobby.title}</h3>
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-white/20 border border-white/30 text-white">
                      {categories[hobby.category].label}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-grow flex flex-col">
                  <p className="text-white/60 mb-4 leading-relaxed">{hobby.description}</p>

                  <div className="bg-white/5 border-l-2 border-teal-400/50 rounded-r-lg p-4 mb-4">
                    <p className="text-xs font-bold text-teal-400 mb-1">Perspective Shift</p>
                    <p className="text-sm text-white/40 italic">{hobby.why}</p>
                  </div>

                  <div className="mt-auto">
                    {hobby.externalLinks && (
                      <div className="mb-4 space-y-2">
                        {hobby.externalLinks.map((link, idx) => (
                          <a
                            key={idx}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 w-full py-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-lg hover:opacity-90 transition-opacity font-semibold text-sm"
                          >
                            <span>{link.icon}</span> {link.label}
                          </a>
                        ))}
                      </div>
                    )}

                    <button
                      onClick={() => setExpandedHobby(expandedHobby === hobby.id ? null : hobby.id)}
                      className={`w-full px-4 py-3 rounded-xl font-semibold text-sm transition-all ${
                        expandedHobby === hobby.id
                          ? 'bg-teal-500 text-white'
                          : 'bg-white/5 text-white/60 border border-white/10 hover:text-white'
                      }`}
                    >
                      {expandedHobby === hobby.id ? 'Close Details' : 'See Highlights'}
                    </button>

                    {expandedHobby === hobby.id && (
                      <div className="mt-4 space-y-2 animate-slide-down">
                        {hobby.highlights.map((highlight, idx) => (
                          <div key={idx} className="flex items-start gap-3 p-3 bg-white/5 rounded-lg">
                            <span className="text-teal-400 font-bold">•</span>
                            <span className="text-sm text-white/60">{highlight}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white text-center mb-12">The Fun Metrics</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { emoji: '📸', value: '1000+', label: 'Clips Edited' },
              { emoji: '🥾', value: '25+', label: 'Peaks Hiked' },
              { emoji: '♟️', value: 'Casually', label: 'Chess Puzzle' },
              { emoji: '🔧', value: '∞', label: 'Bugs Created' },
            ].map((stat, idx) => (
              <div key={idx} className="p-6 rounded-2xl border border-white/10 bg-white/5 hover:border-teal-400/20 hover:bg-white/10 transition-all text-center">
                <div className="text-5xl mb-3">{stat.emoji}</div>
                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-white/40">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-16 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">The Balance</h2>
          <p className="text-xl text-white/40 leading-relaxed italic">
            &ldquo;My best code logic often comes to me while I&apos;m editing a video or hiking a trail, not while staring at the IDE.
            Creativity, Logic, and Endurance are all connected.&rdquo;
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Let&apos;s Connect!</h2>
          <p className="text-white/40 mb-8 text-lg">Check out my YouTube for visuals or LinkedIn for professional details.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://www.youtube.com/@pavitramandal37" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-all">
              📺 YouTube
            </a>
            <a href="https://www.linkedin.com/in/pavitra-mandal-b0b0571a0/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/20 text-white rounded-xl font-bold hover:bg-white/10 transition-all">
              🔗 LinkedIn
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
