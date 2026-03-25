'use client';

import { useState, useMemo } from 'react';
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
      project.tags.forEach(tag => {
        acc[tag] = (acc[tag] || 0) + 1;
      });
      return acc;
    }, {} as Record<string, number>);

    const topTech = Object.entries(techCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    return {
      total: allProjects.length,
      active: activeProjects,
      completed: completedProjects,
      categories: categories.length,
      technologies: allTags.length,
      categoryBreakdown,
      topTech,
    };
  }, [allProjects, categories, allTags]);

  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-background-alt border-b border-card-border">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(20,184,166,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(20,184,166,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/10 border border-secondary/20 rounded-full text-secondary text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
              Full Stack Data Engineering Portfolio
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4">
              Project Portfolio
            </h1>
            <p className="text-xl text-foreground-muted max-w-3xl mx-auto">
              Production data warehouses, ETL pipelines, and ML infrastructure at enterprise scale
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            {[
              { value: stats.total, label: 'Total Projects', color: 'text-secondary' },
              { value: stats.active, label: 'Active Projects', color: 'text-green-500' },
              { value: stats.completed, label: 'Completed', color: 'text-blue-500' },
              { value: stats.categories, label: 'Categories', color: 'text-purple-500' },
              { value: stats.technologies, label: 'Technologies', color: 'text-orange-500' },
            ].map((stat, idx) => (
              <div key={idx} className="group relative bg-card rounded-2xl p-6 border-2 border-card-border hover:border-secondary/50 transition-all">
                <div className={`text-4xl font-bold ${stat.color} mb-2`}>{stat.value}</div>
                <div className="text-sm font-semibold text-foreground-muted">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Top Technologies Bar */}
          <div className="bg-card rounded-2xl p-6 border-2 border-card-border shadow-sm">
            <h3 className="text-sm font-bold text-foreground-muted mb-4 uppercase tracking-wider">
              Most Used Technologies
            </h3>
            <div className="flex flex-wrap gap-3">
              {stats.topTech.map(([tech, count]) => (
                <div
                  key={tech}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-muted border border-card-border rounded-xl hover:border-secondary/50 transition-all"
                >
                  <span className="text-foreground font-semibold">{tech}</span>
                  <span className="inline-flex items-center justify-center min-w-[24px] h-6 px-2 bg-secondary/10 text-secondary text-xs font-bold rounded-full">
                    {count}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Search Section */}
      <section className="bg-card border-b border-card-border sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="relative max-w-2xl mx-auto mb-4">
            <input
              type="text"
              placeholder="Search by project name, description, or technology..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-4 pl-14 pr-12 rounded-xl border-2 border-card-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary transition-all text-base placeholder:text-muted-foreground"
            />
            <svg
              className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-muted-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            <button
              onClick={() => setSelectedCategory('All')}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all border-2 ${
                selectedCategory === 'All'
                  ? 'bg-foreground text-background border-foreground shadow-lg'
                  : 'bg-card text-foreground-muted border-card-border hover:border-foreground/30 hover:bg-muted'
              }`}
            >
              All Projects
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all border-2 ${
                  selectedCategory === cat
                    ? 'bg-foreground text-background border-foreground shadow-lg'
                    : 'bg-card text-foreground-muted border-card-border hover:border-foreground/30 hover:bg-muted'
                }`}
              >
                {cat}
                <span className={`ml-2 inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 text-xs font-bold rounded-full ${
                  selectedCategory === cat
                    ? 'bg-background/20 text-background'
                    : 'bg-secondary/10 text-secondary'
                }`}>
                  {stats.categoryBreakdown[cat] || 0}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 bg-background-alt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Toolbar */}
          <div className="bg-card rounded-2xl shadow-sm border-2 border-card-border p-4 mb-8">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-4">
                <div className="text-sm font-medium text-foreground-muted">
                  Showing{' '}
                  <span className="text-2xl font-bold text-foreground">{filteredAndSortedProjects.length}</span>
                  <span className="text-muted-foreground mx-1">/</span>
                  <span className="text-lg font-semibold text-foreground-muted">{allProjects.length}</span>
                  <span className="ml-2">projects</span>
                </div>

                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 text-sm font-semibold transition-all ${
                    showFilters || hasActiveFilters
                      ? 'border-secondary bg-secondary/10 text-secondary'
                      : 'border-card-border bg-card text-foreground-muted hover:bg-muted hover:border-foreground/20'
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                  Advanced Filters
                  {hasActiveFilters && (
                    <span className="inline-flex items-center justify-center w-5 h-5 bg-secondary text-background text-xs font-bold rounded-full animate-pulse">
                      !
                    </span>
                  )}
                </button>

                {hasActiveFilters && (
                  <button
                    onClick={resetFilters}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-foreground text-background text-sm font-semibold hover:bg-foreground/90 transition-colors shadow-lg"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Reset All
                  </button>
                )}
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 bg-muted rounded-xl p-1 border border-card-border">
                  {(['grid', 'compact', 'detailed'] as ViewMode[]).map((mode) => (
                    <button
                      key={mode}
                      onClick={() => setViewMode(mode)}
                      className={`p-2.5 rounded-lg transition-all ${
                        viewMode === mode
                          ? 'bg-card text-foreground shadow-sm'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                      title={`${mode.charAt(0).toUpperCase() + mode.slice(1)} View`}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="px-4 py-2.5 rounded-xl border-2 border-card-border bg-card text-sm font-semibold text-foreground focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary transition-all"
                >
                  <option value="endDate">Latest First</option>
                  <option value="newest">Start Date (Newest)</option>
                  <option value="oldest">Start Date (Oldest)</option>
                  <option value="title">Alphabetical (A-Z)</option>
                </select>
              </div>
            </div>

            {/* Collapsible Advanced Filters */}
            {showFilters && (
              <div className="mt-6 pt-6 border-t-2 border-card-border">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="tech-filter" className="block text-sm font-bold text-foreground-muted mb-3">
                      Filter by Technology
                    </label>
                    <select
                      id="tech-filter"
                      value={selectedTag}
                      onChange={(e) => setSelectedTag(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border-2 border-card-border bg-card text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary transition-all"
                    >
                      <option value="All">All Technologies ({allTags.length})</option>
                      {allTags.map((tag) => (
                        <option key={tag} value={tag}>{tag}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-foreground-muted mb-3">
                      Active Filters
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {selectedCategory !== 'All' && (
                        <span className="inline-flex items-center gap-2 px-3 py-2 bg-foreground text-background rounded-lg text-sm font-medium">
                          {selectedCategory}
                          <button onClick={() => setSelectedCategory('All')} className="hover:text-red-300 font-bold">×</button>
                        </span>
                      )}
                      {selectedTag !== 'All' && (
                        <span className="inline-flex items-center gap-2 px-3 py-2 bg-foreground text-background rounded-lg text-sm font-medium">
                          {selectedTag}
                          <button onClick={() => setSelectedTag('All')} className="hover:text-red-300 font-bold">×</button>
                        </span>
                      )}
                      {!hasActiveFilters && (
                        <span className="text-sm text-muted-foreground py-2">No active filters</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Projects Display */}
          {filteredAndSortedProjects.length > 0 ? (
            <div className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                : viewMode === 'compact'
                ? 'grid grid-cols-1 md:grid-cols-2 gap-4'
                : 'space-y-4'
            }>
              {filteredAndSortedProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <div className="bg-card rounded-3xl border-2 border-dashed border-card-border p-16 text-center">
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-muted mb-6">
                <svg className="w-12 h-12 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-3">No projects found</h3>
              <p className="text-foreground-muted mb-8 max-w-md mx-auto text-lg">
                We couldn&apos;t find any projects matching {searchQuery ? <span className="font-semibold">&quot;{searchQuery}&quot;</span> : 'your filters'}.
                Try adjusting your search or filters.
              </p>
              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="inline-flex items-center gap-3 px-8 py-4 bg-secondary text-background rounded-xl hover:bg-secondary/90 transition-all font-semibold text-lg shadow-xl"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
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
