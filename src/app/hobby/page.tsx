'use client';

import { useState } from 'react';

interface Hobby {
  id: string;
  title: string;
  emoji: string;
  category: 'creative' | 'active' | 'learning' | 'social';
  description: string;
  why: string;
  highlights: string[];
  gradient: string;
  headerTextColor?: string;
  pillStyles?: string;
  externalLinks?: { label: string; url: string; icon: string }[];
}

const hobbies: Hobby[] = [
  {
    id: 'social-creator',
    title: 'Content Creator',
    emoji: '🎬',
    category: 'social',
    description: 'Sharing the developer journey and life in Tokyo through video and visuals.',
    why: 'Building in public and sharing experiences creates a feedback loop that accelerates growth and connects me with global peers.',
    highlights: ['YouTube: Tech & Life Vlogs', 'Instagram: Visual Portfolio', 'Community engagement'],
    gradient: 'from-pink-500 to-rose-600',
    externalLinks: [
      { label: 'YouTube Channel', url: 'https://www.youtube.com/@pavitramandal37', icon: '📺' },
      { label: 'Instagram', url: 'https://www.instagram.com/pavitra.hito/', icon: '📸' }
    ]
  },
  {
    id: 'hiking',
    title: 'Hiking & Nature',
    emoji: '🥾',
    category: 'active',
    description: 'Trading the keyboard for mountain trails to reset dopamine levels.',
    why: 'The best debugging happens offline. Conquering physical peaks builds the endurance needed for complex engineering hurdles.',
    highlights: ['Weekend trail explorations', 'Nature photography integration', 'Disconnecting to reconnect with clarity'],
    gradient: 'from-emerald-500 to-teal-700',
  },
  {
    id: 'tech-tinkering',
    title: 'Tech Tinkering',
    emoji: '🔧',
    category: 'learning',
    description: 'The sandbox for curiosity. Exploring new stacks and hardware outside of work requirements.',
    why: 'Innovation happens when you break things just to see how they work. This is where I learn without pressure.',
    highlights: ['Experimenting with LLM fine-tuning', 'Home automation & IoT projects', 'Building useless but fun CLI tools'],
    gradient: 'from-cyan-500 to-blue-600',
  },
  {
    id: 'photography',
    title: 'Photo & Video',
    emoji: '📸',
    category: 'creative',
    description: 'Visual storyteller capturing moments through cinematic vlogs and street photography.',
    why: 'Code builds the logic, but visual storytelling captures the emotion. It teaches me to see the world from different angles/frames.',
    highlights: ['Cinematic video editing (DaVinci/Premiere)', 'Street photography & color grading', 'Documenting tech journey & travel logs'],
    gradient: 'from-purple-600 to-indigo-600',
  },
  {
    id: 'chess',
    title: 'Chess Strategy',
    emoji: '♟️',
    category: 'learning',
    description: 'A mental "Refresh" button. Playing not for the grind, but for the beauty of pure logic.',
    why: 'It acts as a palate cleanser for the brain. Stepping away from code syntax to pure strategy helps reset my problem-solving focus.',
    highlights: ['Casual rapid games for mental agility', 'Studying grandmaster patterns', 'Pure strategic relaxation'],
    gradient: 'from-stone-100 to-stone-300',
    headerTextColor: 'text-stone-800',
    pillStyles: 'bg-stone-800/10 border-stone-800/20 text-stone-900',
  },
];

const categories = {
  creative: { label: 'Creative', color: 'purple', icon: '🎨' },
  active: { label: 'Active', color: 'emerald', icon: '⚡' },
  learning: { label: 'Learning', color: 'blue', icon: '🧠' },
  social: { label: 'Social', color: 'pink', icon: '🤝' },
};

export default function HobbiesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedHobby, setExpandedHobby] = useState<string | null>(null);

  const filteredHobbies = selectedCategory === 'all'
    ? hobbies
    : hobbies.filter(h => h.category === selectedCategory);

  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600 text-white py-20">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,.05)_25%,rgba(255,255,255,.05)_50%,transparent_50%,transparent_75%,rgba(255,255,255,.05)_75%,rgba(255,255,255,.05))] bg-[length:60px_60px]" />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center gap-4 mb-8 text-5xl animate-bounce">
              <span className="inline-block hover:scale-125 transition-transform cursor-pointer">📸</span>
              <span className="inline-block hover:scale-125 transition-transform cursor-pointer" style={{ animationDelay: '0.1s' }}>🥾</span>
              <span className="inline-block hover:scale-125 transition-transform cursor-pointer" style={{ animationDelay: '0.2s' }}>♟️</span>
              <span className="inline-block hover:scale-125 transition-transform cursor-pointer" style={{ animationDelay: '0.3s' }}>🔧</span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
              Beyond the Code
            </h1>
            <p className="text-2xl text-indigo-50 max-w-3xl mx-auto mb-8">
              From cinematic editing to mountain trails—this is what fuels my creativity and keeps me human.
            </p>

            <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full border-2 border-white/40">
              <span className="text-lg font-semibold">Tech at Core</span>
              <span className="text-2xl">•</span>
              <span className="text-lg font-semibold">Creative at Heart</span>
            </div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-16" style={{ fill: 'var(--background)' }}>
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" />
            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" />
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" />
          </svg>
        </div>
      </section>

      {/* Category Filter Pills */}
      <section className="sticky top-20 z-20 bg-card/80 backdrop-blur-lg border-b border-card-border py-6 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-6 py-3 rounded-full font-semibold text-sm transition-all transform hover:scale-105 ${
                selectedCategory === 'all'
                  ? 'bg-foreground text-background shadow-lg'
                  : 'bg-muted text-foreground-muted hover:bg-card-border'
              }`}
            >
              <span className="mr-2">✨</span>
              All Interests
              <span className="ml-2 px-2 py-0.5 bg-white/30 rounded-full text-xs">{hobbies.length}</span>
            </button>

            {Object.entries(categories).map(([key, cat]) => (
              <button
                key={key}
                onClick={() => setSelectedCategory(key)}
                className={`px-6 py-3 rounded-full font-semibold text-sm transition-all transform hover:scale-105 ${
                  selectedCategory === key
                    ? `bg-gradient-to-r from-${cat.color}-500 to-${cat.color}-600 text-white shadow-lg`
                    : 'bg-muted text-foreground-muted hover:bg-card-border'
                }`}
              >
                <span className="mr-2">{cat.icon}</span>
                {cat.label}
                <span className="ml-2 px-2 py-0.5 bg-white/30 rounded-full text-xs">
                  {hobbies.filter(h => h.category === key).length}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Hobbies Grid */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
            {filteredHobbies.map((hobby, index) => (
              <div
                key={hobby.id}
                className="group relative bg-card rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col h-full border border-card-border"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Gradient Header */}
                <div
                  className={`bg-gradient-to-br ${hobby.gradient} p-8 relative overflow-hidden ${hobby.headerTextColor || 'text-white'}`}
                >
                  <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.2),transparent)]" />

                  <div className="relative z-10">
                    <div className="text-6xl mb-4 transform group-hover:scale-110 group-hover:rotate-12 transition-transform">
                      {hobby.emoji}
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{hobby.title}</h3>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm border ${
                        hobby.pillStyles || 'bg-white/20 border-white/30'
                      }`}
                    >
                      {categories[hobby.category].label}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-grow flex flex-col">
                  <p className="text-foreground-muted mb-4 leading-relaxed">
                    {hobby.description}
                  </p>

                  <div className="bg-muted border-l-4 border-card-border rounded-r-lg p-4 mb-4">
                    <div className="flex items-start gap-2">
                      <span className="text-xl">💡</span>
                      <div>
                        <p className="text-xs font-bold text-foreground mb-1">Perspective Shift</p>
                        <p className="text-sm text-foreground-muted italic">{hobby.why}</p>
                      </div>
                    </div>
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
                          ? 'bg-foreground text-background shadow-lg'
                          : 'bg-muted text-foreground-muted hover:bg-card-border'
                      }`}
                    >
                      {expandedHobby === hobby.id ? 'Close Details' : 'See Highlights'}
                    </button>

                    {expandedHobby === hobby.id && (
                      <div className="mt-4 space-y-2 animate-slide-down">
                        <p className="text-xs font-bold text-foreground-muted uppercase tracking-wide mb-3">What I Do:</p>
                        {hobby.highlights.map((highlight, idx) => (
                          <div key={idx} className="flex items-start gap-3 p-3 bg-muted rounded-lg hover:bg-card-border transition-colors">
                            <span className="text-secondary font-bold text-lg">•</span>
                            <span className="text-sm text-foreground-muted">{highlight}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${hobby.gradient} opacity-10 rounded-bl-full`} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 text-white" style={{ background: 'linear-gradient(to bottom right, var(--cta-bg-from), var(--cta-bg-to))' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">The Fun Metrics</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { emoji: '📸', value: '1000+', label: 'Clips Edited', color: 'from-purple-400 to-pink-500' },
              { emoji: '🥾', value: '25+', label: 'Peaks Hiked', color: 'from-emerald-400 to-teal-500' },
              { emoji: '♟️', value: 'Casually', label: 'Chess Puzzle', color: 'from-slate-300 to-slate-500' },
              { emoji: '🔧', value: '∞', label: 'Bugs Created', color: 'from-cyan-400 to-blue-500' },
            ].map((stat, idx) => (
              <div key={idx} className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all transform hover:scale-105">
                <div className="text-5xl mb-3">{stat.emoji}</div>
                <div className={`text-3xl font-bold mb-1 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                  {stat.value}
                </div>
                <div className="text-sm text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-16 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-6xl mb-6">🌟</div>
          <h2 className="text-3xl font-bold text-foreground mb-6">The Balance</h2>
          <p className="text-xl text-foreground-muted leading-relaxed mb-8">
            "My best code logic often comes to me while I'm editing a video or hiking a trail, not while staring at the IDE.
            Creativity, Logic, and Endurance are all connected."
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Let's Connect!</h2>
          <p className="text-xl text-indigo-50 mb-8">
            Check out my YouTube for the visuals or LinkedIn for the professional details.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://www.youtube.com/@pavitramandal37"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-all transform hover:scale-105 shadow-lg"
            >
              <span className="text-xl">📺</span>
              YouTube
            </a>
            <a
              href="https://www.linkedin.com/in/pavitra-mandal-b0b0571a0/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl font-bold hover:bg-white hover:text-indigo-600 transition-all transform hover:scale-105"
            >
              <span className="text-xl">🔗</span>
              LinkedIn
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
