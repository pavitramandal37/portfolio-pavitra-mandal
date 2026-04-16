'use client';

import { useState, useMemo } from 'react';
import { motion, type Variants } from 'framer-motion';
import Link from 'next/link';
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

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
};

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

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

  const activeProjects = useMemo(
    () => allProjects.filter((p) => p.dateEnded === 'Present' && p.company === 'Sony'),
    [allProjects]
  );

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
    const activeCount = allProjects.filter((p) => p.dateEnded === 'Present').length;
    const completedCount = allProjects.length - activeCount;
    const categoryBreakdown = categories.reduce((acc, cat) => {
      acc[cat] = allProjects.filter((p) => p.category === cat).length;
      return acc;
    }, {} as Record<string, number>);
    return { total: allProjects.length, active: activeCount, completed: completedCount, categoryBreakdown };
  }, [allProjects, categories]);

  return (
    <div className="min-h-screen bg-background pt-20">

      {/* ── Page Header ──────────────────────────────────── */}
      <section className="relative overflow-hidden bg-background-alt border-b border-card-border">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(20,184,166,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(20,184,166,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/10 border border-secondary/20 rounded-full text-secondary text-sm font-medium mb-5">
              <span className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
              AI &amp; Data Engineering Portfolio
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-3">
              Project Portfolio
            </h1>
            <p className="text-lg text-foreground-muted max-w-2xl mx-auto">
              AI agents, MLOps pipelines, data platforms, and enterprise migrations — built at scale.
            </p>

            {/* Slim stats bar */}
            <div className="mt-8 inline-flex flex-wrap justify-center gap-6 sm:gap-10 px-6 py-4 bg-card rounded-2xl border border-card-border text-sm">
              <span><span className="text-2xl font-bold text-foreground">{stats.total}</span><span className="ml-1.5 text-foreground-muted">Projects</span></span>
              <span className="text-card-border">|</span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse inline-block" />
                <span className="text-2xl font-bold text-foreground">{stats.active}</span>
                <span className="ml-0.5 text-foreground-muted">Active</span>
              </span>
              <span className="text-card-border">|</span>
              <span><span className="text-2xl font-bold text-foreground">{stats.completed}</span><span className="ml-1.5 text-foreground-muted">Completed</span></span>
              <span className="text-card-border hidden sm:inline">|</span>
              <span className="hidden sm:inline"><span className="text-2xl font-bold text-foreground">{allTags.length}</span><span className="ml-1.5 text-foreground-muted">Technologies</span></span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Currently Active ─────────────────────────────── */}
      {activeProjects.length > 0 && (
        <section className="bg-background border-b border-card-border">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.15 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
                <span className="text-xs font-mono uppercase tracking-widest text-secondary font-semibold">
                  Currently Active at Sony
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {activeProjects.slice(0, 2).map((project) => (
                  <Link
                    key={project.id}
                    href={`/projects/${project.slug}`}
                    className="group flex flex-col gap-3 p-5 rounded-xl border border-secondary/20 bg-card hover:border-secondary/50 hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-bold text-foreground group-hover:text-secondary transition-colors text-base leading-snug">
                          {project.title}
                        </h3>
                        <p className="text-xs text-foreground-muted font-mono mt-0.5">{project.company}</p>
                      </div>
                      <span
                        className="shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
                        style={{
                          backgroundColor: project.status === 'In Development' ? 'rgba(245,158,11,0.15)' : 'rgba(52,211,153,0.15)',
                          color: project.status === 'In Development' ? '#f59e0b' : '#34d399',
                          border: `1px solid ${project.status === 'In Development' ? 'rgba(245,158,11,0.3)' : 'rgba(52,211,153,0.3)'}`,
                        }}
                      >
                        <span className="w-1.5 h-1.5 rounded-full animate-pulse inline-block" style={{ backgroundColor: project.status === 'In Development' ? '#f59e0b' : '#34d399' }} />
                        {project.status}
                      </span>
                    </div>
                    <p className="text-sm text-foreground-muted line-clamp-2">{project.description}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.slice(0, 4).map((tag) => (
                        <span key={tag} className="px-2 py-0.5 rounded text-[11px] font-medium bg-secondary/10 text-secondary">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* ── Sticky Filter Bar ─────────────────────────────── */}
      <section className="bg-card border-b border-card-border sticky top-0 z-30 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row gap-3 items-center">
            {/* Search */}
            <div className="relative flex-1 w-full">
              <input
                type="text"
                placeholder="Search projects, technologies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2.5 pl-10 rounded-lg border border-card-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary transition-all text-sm placeholder:text-muted-foreground"
              />
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>

            {/* Category pills */}
            <div className="flex flex-wrap gap-1.5 items-center">
              {['All', ...categories].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat as FilterCategory)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
                    selectedCategory === cat
                      ? 'bg-secondary text-background border-secondary'
                      : 'bg-card text-foreground-muted border-card-border hover:border-secondary/40 hover:text-foreground'
                  }`}
                >
                  {cat === 'All' ? `All (${stats.total})` : `${cat} (${stats.categoryBreakdown[cat] || 0})`}
                </button>
              ))}
            </div>

            {/* Sort + view mode */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`p-2 rounded-lg border transition-all ${
                  showFilters || hasActiveFilters
                    ? 'border-secondary bg-secondary/10 text-secondary'
                    : 'border-card-border text-foreground-muted hover:text-foreground'
                }`}
                title="Advanced filters"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
                </svg>
              </button>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="px-3 py-2 rounded-lg border border-card-border bg-card text-xs font-semibold text-foreground focus:outline-none focus:ring-1 focus:ring-secondary transition-all"
              >
                <option value="endDate">Latest First</option>
                <option value="newest">Start (Newest)</option>
                <option value="oldest">Start (Oldest)</option>
                <option value="title">A – Z</option>
              </select>

              <div className="flex items-center gap-0.5 bg-muted rounded-lg p-0.5 border border-card-border">
                {(['grid', 'compact', 'detailed'] as ViewMode[]).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setViewMode(mode)}
                    className={`p-2 rounded-md transition-all ${
                      viewMode === mode ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
                    }`}
                    title={`${mode.charAt(0).toUpperCase() + mode.slice(1)} view`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {mode === 'grid' ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                      ) : mode === 'compact' ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                      ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                      )}
                    </svg>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Advanced filters collapse */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-card-border flex flex-wrap items-center gap-3">
              <select
                value={selectedTag}
                onChange={(e) => setSelectedTag(e.target.value)}
                className="px-3 py-2 rounded-lg border border-card-border bg-card text-xs font-semibold text-foreground focus:outline-none focus:ring-1 focus:ring-secondary"
              >
                <option value="All">All Technologies ({allTags.length})</option>
                {allTags.map((tag) => <option key={tag} value={tag}>{tag}</option>)}
              </select>
              {hasActiveFilters && (
                <button onClick={resetFilters} className="px-3 py-2 rounded-lg bg-foreground text-background text-xs font-semibold hover:bg-foreground/90 transition-colors">
                  Reset All
                </button>
              )}
            </div>
          )}
        </div>
      </section>

      {/* ── Projects Grid ─────────────────────────────────── */}
      <section className="py-10 bg-background-alt">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Result count */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-foreground-muted">
              Showing <span className="font-bold text-foreground">{filteredAndSortedProjects.length}</span>
              {filteredAndSortedProjects.length !== allProjects.length && (
                <> of <span className="font-semibold text-foreground">{allProjects.length}</span></>
              )} projects
            </p>
          </div>

          {filteredAndSortedProjects.length > 0 ? (
            <motion.div
              className={
                viewMode === 'grid'
                  ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                  : viewMode === 'compact'
                  ? 'grid grid-cols-1 md:grid-cols-2 gap-4'
                  : 'space-y-4'
              }
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              key={`${selectedCategory}-${selectedTag}-${searchQuery}-${sortBy}`}
            >
              {filteredAndSortedProjects.map((project) => (
                <motion.div key={project.id} variants={cardVariants}>
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="bg-card rounded-2xl border border-dashed border-card-border p-16 text-center">
              <svg className="w-12 h-12 text-muted-foreground mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-xl font-bold text-foreground mb-2">No projects found</h3>
              <p className="text-foreground-muted mb-6 max-w-md mx-auto">
                Try adjusting your search or filter criteria.
              </p>
              {hasActiveFilters && (
                <button onClick={resetFilters} className="px-6 py-3 bg-secondary text-background rounded-xl font-semibold hover:bg-secondary/90 transition-colors">
                  Reset Filters
                </button>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
