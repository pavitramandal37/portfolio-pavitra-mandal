'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { getAllProjects, getAllCategories, getAllTags } from '@/data/projects';
import { Project } from '@/types';
import { ProjectCard } from '@/components/sections';

type SortOption = 'newest' | 'oldest' | 'endDate' | 'title';
type FilterCategory = Project['category'] | 'All';
type ViewMode = 'grid' | 'compact' | 'detailed';

const DEFAULT_CATEGORY: FilterCategory = 'All';
const DEFAULT_TAG = 'All';
const DEFAULT_SORT: SortOption = 'endDate';
const DEFAULT_SEARCH = '';

export default function ProjectsPage() {
  const allProjects = getAllProjects();
  const categories = getAllCategories();
  const allTags = getAllTags();

  const [selectedCategory, setSelectedCategory] = useState<FilterCategory>(DEFAULT_CATEGORY);
  const [selectedTag, setSelectedTag] = useState<string>(DEFAULT_TAG);
  const [sortBy, setSortBy] = useState<SortOption>(DEFAULT_SORT);
  const [searchQuery, setSearchQuery] = useState(DEFAULT_SEARCH);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [showFilters, setShowFilters] = useState(false);

  const hasActiveFilters =
    selectedCategory !== DEFAULT_CATEGORY ||
    selectedTag !== DEFAULT_TAG ||
    sortBy !== DEFAULT_SORT ||
    searchQuery !== DEFAULT_SEARCH;

  const resetFilters = () => {
    setSelectedCategory(DEFAULT_CATEGORY);
    setSelectedTag(DEFAULT_TAG);
    setSortBy(DEFAULT_SORT);
    setSearchQuery(DEFAULT_SEARCH);
  };

  const filteredAndSortedProjects = useMemo(() => {
    let filtered = [...allProjects];

    if (selectedCategory !== 'All') {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    if (selectedTag !== 'All') {
      filtered = filtered.filter((p) => p.tags.includes(selectedTag));
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.tags.some((t) => t.toLowerCase().includes(query))
      );
    }

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime();
        case 'oldest':
          return new Date(a.dateCreated).getTime() - new Date(b.dateCreated).getTime();
        case 'endDate': {
          const aEndDate = a.dateEnded;
          const bEndDate = b.dateEnded;
          if (aEndDate === 'Present' || !aEndDate) {
            if (bEndDate === 'Present' || !bEndDate) return 0;
            return -1;
          }
          if (bEndDate === 'Present' || !bEndDate) return 1;
          return new Date(bEndDate).getTime() - new Date(aEndDate).getTime();
        }
        case 'title':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

    return filtered;
  }, [allProjects, selectedCategory, selectedTag, sortBy, searchQuery]);

  const stats = useMemo(() => {
    const activeProjects = allProjects.filter(p => p.dateEnded === 'Present').length;
    const completedProjects = allProjects.length - activeProjects;
    const categoryBreakdown = categories.reduce((acc, cat) => {
      acc[cat] = allProjects.filter(p => p.category === cat).length;
      return acc;
    }, {} as Record<string, number>);
    const techCount = allProjects.reduce((acc, project) => {
      project.tags.forEach(tag => { acc[tag] = (acc[tag] || 0) + 1; });
      return acc;
    }, {} as Record<string, number>);
    const topTech = Object.entries(techCount).sort((a, b) => b[1] - a[1]).slice(0, 5);

    return { total: allProjects.length, active: activeProjects, completed: completedProjects, categories: categories.length, technologies: allTags.length, categoryBreakdown, topTech };
  }, [allProjects, categories, allTags]);

  return (
    <div className="min-h-screen bg-navy-950 pt-20">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(20,184,166,0.08),transparent_60%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(20,184,166,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(20,184,166,0.02)_1px,transparent_1px)] bg-[size:80px_80px]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-12">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-400 mb-4"
            >
              Portfolio
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6"
            >
              Projects
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-white/50 max-w-3xl mx-auto"
            >
              Production data warehouses, ETL pipelines, and ML infrastructure at enterprise scale
            </motion.p>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8"
          >
            {[
              { value: stats.total, label: 'Total', color: 'teal' },
              { value: stats.active, label: 'Active', color: 'green' },
              { value: stats.completed, label: 'Completed', color: 'blue' },
              { value: stats.categories, label: 'Categories', color: 'purple' },
              { value: stats.technologies, label: 'Technologies', color: 'orange' },
            ].map((stat) => (
              <div key={stat.label} className="group relative p-5 rounded-2xl border border-white/10 bg-white/5 hover:border-teal-400/20 hover:bg-white/10 transition-all text-center">
                <div className="text-3xl font-bold text-white">{stat.value}</div>
                <div className="text-sm font-medium text-white/40 mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          {/* Top Tech */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="p-6 rounded-2xl border border-white/10 bg-white/5"
          >
            <h3 className="text-sm font-bold text-white/30 mb-4 uppercase tracking-wider">Most Used Technologies</h3>
            <div className="flex flex-wrap gap-3">
              {stats.topTech.map(([tech, count]) => (
                <div key={tech} className="inline-flex items-center gap-2 px-4 py-2 border border-white/10 rounded-full bg-white/5 hover:border-teal-400/20 transition-all">
                  <span className="text-white/70 font-medium text-sm">{tech}</span>
                  <span className="inline-flex items-center justify-center min-w-[24px] h-6 px-2 bg-teal-500/10 text-teal-400 text-xs font-bold rounded-full">{count}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Search & Filters */}
      <section className="bg-navy-900 border-b border-white/5 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="relative max-w-2xl mx-auto mb-4">
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-4 pl-14 pr-12 rounded-xl border border-white/10 bg-white/5 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all text-base"
            />
            <svg className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-white/30 hover:text-white rounded-lg hover:bg-white/10 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            <button
              onClick={() => setSelectedCategory('All')}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all border ${
                selectedCategory === 'All'
                  ? 'bg-teal-500 text-white border-teal-500'
                  : 'bg-white/5 text-white/60 border-white/10 hover:border-white/20 hover:text-white'
              }`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all border ${
                  selectedCategory === cat
                    ? 'bg-teal-500 text-white border-teal-500'
                    : 'bg-white/5 text-white/60 border-white/10 hover:border-white/20 hover:text-white'
                }`}
              >
                {cat}
                <span className={`ml-2 text-xs ${selectedCategory === cat ? 'text-white/80' : 'text-white/30'}`}>
                  {stats.categoryBreakdown[cat] || 0}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Toolbar */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-8 p-4 rounded-2xl border border-white/5 bg-white/[0.02]">
            <div className="flex flex-wrap items-center gap-4">
              <div className="text-sm font-medium text-white/40">
                <span className="text-2xl font-bold text-white">{filteredAndSortedProjects.length}</span>
                <span className="text-white/20 mx-1">/</span>
                <span className="text-lg font-semibold text-white/50">{allProjects.length}</span>
                <span className="ml-2">projects</span>
              </div>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-semibold transition-all ${
                  showFilters || hasActiveFilters
                    ? 'border-teal-500/30 bg-teal-500/10 text-teal-400'
                    : 'border-white/10 bg-white/5 text-white/50 hover:text-white'
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
                Filters
              </button>

              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 text-white text-sm font-semibold hover:bg-white/20 transition-colors"
                >
                  Reset
                </button>
              )}
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 bg-white/5 rounded-xl p-1 border border-white/5">
                {(['grid', 'compact', 'detailed'] as ViewMode[]).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setViewMode(mode)}
                    className={`p-2 rounded-lg transition-all ${
                      viewMode === mode ? 'bg-white/10 text-white' : 'text-white/30 hover:text-white/60'
                    }`}
                    title={`${mode} View`}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {mode === 'grid' ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                      ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                      )}
                    </svg>
                  </button>
                ))}
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="px-4 py-2 rounded-xl border border-white/10 bg-white/5 text-sm font-semibold text-white/60 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
              >
                <option value="endDate">Latest First</option>
                <option value="newest">Start Date (Newest)</option>
                <option value="oldest">Start Date (Oldest)</option>
                <option value="title">Alphabetical</option>
              </select>
            </div>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="mb-8 p-6 rounded-2xl border border-white/5 bg-white/[0.02]">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="tech-filter" className="block text-sm font-bold text-white/50 mb-3">Technology</label>
                  <select
                    id="tech-filter"
                    value={selectedTag}
                    onChange={(e) => setSelectedTag(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-sm text-white/60 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
                  >
                    <option value="All">All Technologies ({allTags.length})</option>
                    {allTags.map((tag) => (
                      <option key={tag} value={tag}>{tag}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-white/50 mb-3">Active Filters</label>
                  <div className="flex flex-wrap gap-2">
                    {selectedCategory !== 'All' && (
                      <span className="inline-flex items-center gap-2 px-3 py-2 bg-teal-500/10 text-teal-400 rounded-lg text-sm font-medium border border-teal-500/20">
                        {selectedCategory}
                        <button onClick={() => setSelectedCategory('All')} className="hover:text-white">×</button>
                      </span>
                    )}
                    {selectedTag !== 'All' && (
                      <span className="inline-flex items-center gap-2 px-3 py-2 bg-teal-500/10 text-teal-400 rounded-lg text-sm font-medium border border-teal-500/20">
                        {selectedTag}
                        <button onClick={() => setSelectedTag('All')} className="hover:text-white">×</button>
                      </span>
                    )}
                    {!hasActiveFilters && <span className="text-sm text-white/30 py-2">No active filters</span>}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Projects */}
          {filteredAndSortedProjects.length > 0 ? (
            <div className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                : viewMode === 'compact'
                ? 'grid grid-cols-1 md:grid-cols-2 gap-4'
                : 'space-y-4'
            }>
              {filteredAndSortedProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-white/10 p-16 text-center">
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-white/5 mb-6">
                <svg className="w-12 h-12 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">No projects found</h3>
              <p className="text-white/40 mb-8 max-w-md mx-auto">
                Try adjusting your search or filters.
              </p>
              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="inline-flex items-center gap-3 px-8 py-4 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-all font-semibold"
                >
                  Reset All Filters
                </button>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
