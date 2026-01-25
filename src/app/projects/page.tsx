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

  // Enhanced statistics
  const stats = useMemo(() => {
    const activeProjects = allProjects.filter(p => p.dateEnded === 'Present').length;
    const completedProjects = allProjects.length - activeProjects;
    
    // Count projects by category
    const categoryBreakdown = categories.reduce((acc, cat) => {
      acc[cat] = allProjects.filter(p => p.category === cat).length;
      return acc;
    }, {} as Record<string, number>);

    // Get most used technologies (top 5)
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
    <div className="min-h-screen bg-white pt-20">
      {/* Clean Hero Section - White Background */}
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-slate-50/30 to-teal-50/40 border-b border-slate-200">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(20,184,166,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(20,184,166,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-50 border border-teal-200 rounded-full text-teal-700 text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-teal-500 rounded-full animate-pulse" />
              Full Stack Data Engineering Portfolio
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-4">
              Project Portfolio
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Production data warehouses, ETL pipelines, and ML infrastructure at enterprise scale
            </p>
          </div>

          {/* Enhanced Stats Grid - White Cards */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            {/* Total Projects */}
            <div className="group relative bg-white rounded-2xl p-6 border-2 border-slate-200 hover:border-teal-400 transition-all hover:shadow-xl hover:shadow-teal-500/10">
              <div className="absolute top-3 right-3 w-10 h-10 bg-teal-50 rounded-xl flex items-center justify-center group-hover:bg-teal-100 group-hover:scale-110 transition-all">
                <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <div className="text-4xl font-bold text-teal-600 mb-2">{stats.total}</div>
              <div className="text-sm font-semibold text-slate-600">Total Projects</div>
            </div>

            {/* Active Projects */}
            <div className="group relative bg-white rounded-2xl p-6 border-2 border-slate-200 hover:border-green-400 transition-all hover:shadow-xl hover:shadow-green-500/10">
              <div className="absolute top-3 right-3 w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center group-hover:bg-green-100 group-hover:scale-110 transition-all">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="text-4xl font-bold text-green-600 mb-2">{stats.active}</div>
              <div className="text-sm font-semibold text-slate-600">Active Projects</div>
            </div>

            {/* Completed Projects */}
            <div className="group relative bg-white rounded-2xl p-6 border-2 border-slate-200 hover:border-blue-400 transition-all hover:shadow-xl hover:shadow-blue-500/10">
              <div className="absolute top-3 right-3 w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center group-hover:bg-blue-100 group-hover:scale-110 transition-all">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="text-4xl font-bold text-blue-600 mb-2">{stats.completed}</div>
              <div className="text-sm font-semibold text-slate-600">Completed</div>
            </div>

            {/* Categories */}
            <div className="group relative bg-white rounded-2xl p-6 border-2 border-slate-200 hover:border-purple-400 transition-all hover:shadow-xl hover:shadow-purple-500/10">
              <div className="absolute top-3 right-3 w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center group-hover:bg-purple-100 group-hover:scale-110 transition-all">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
              </div>
              <div className="text-4xl font-bold text-purple-600 mb-2">{stats.categories}</div>
              <div className="text-sm font-semibold text-slate-600">Categories</div>
            </div>

            {/* Technologies */}
            <div className="group relative bg-white rounded-2xl p-6 border-2 border-slate-200 hover:border-orange-400 transition-all hover:shadow-xl hover:shadow-orange-500/10">
              <div className="absolute top-3 right-3 w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center group-hover:bg-orange-100 group-hover:scale-110 transition-all">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <div className="text-4xl font-bold text-orange-600 mb-2">{stats.technologies}</div>
              <div className="text-sm font-semibold text-slate-600">Technologies</div>
            </div>
          </div>

          {/* Top Technologies Bar - White Card */}
          <div className="bg-white rounded-2xl p-6 border-2 border-slate-200 shadow-sm">
            <h3 className="text-sm font-bold text-slate-700 mb-4 uppercase tracking-wider">
              Most Used Technologies
            </h3>
            <div className="flex flex-wrap gap-3">
              {stats.topTech.map(([tech, count]) => (
                <div
                  key={tech}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl hover:border-teal-300 hover:bg-teal-50 transition-all"
                >
                  <span className="text-slate-900 font-semibold">{tech}</span>
                  <span className="inline-flex items-center justify-center min-w-[24px] h-6 px-2 bg-teal-100 text-teal-700 text-xs font-bold rounded-full">
                    {count}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Search Section - White */}
      <section className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto mb-4">
            <input
              type="text"
              placeholder="Search by project name, description, or technology..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-4 pl-14 pr-12 rounded-xl border-2 border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all text-base placeholder:text-slate-400"
            />
            <svg
              className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          {/* Quick Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            <button
              onClick={() => setSelectedCategory('All')}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all border-2 ${
                selectedCategory === 'All'
                  ? 'bg-slate-900 text-white border-slate-900 shadow-lg shadow-slate-900/20'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
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
                    ? 'bg-slate-900 text-white border-slate-900 shadow-lg shadow-slate-900/20'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                {cat}
                <span className={`ml-2 inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 text-xs font-bold rounded-full ${
                  selectedCategory === cat
                    ? 'bg-white/20 text-white'
                    : 'bg-teal-100 text-teal-700'
                }`}>
                  {stats.categoryBreakdown[cat] || 0}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Advanced Toolbar - White Card */}
          <div className="bg-white rounded-2xl shadow-sm border-2 border-slate-200 p-4 mb-8">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
              {/* Left: Results and Filters */}
              <div className="flex flex-wrap items-center gap-4">
                <div className="text-sm font-medium text-slate-600">
                  Showing{' '}
                  <span className="text-2xl font-bold text-slate-900">{filteredAndSortedProjects.length}</span>
                  <span className="text-slate-400 mx-1">/</span>
                  <span className="text-lg font-semibold text-slate-700">{allProjects.length}</span>
                  <span className="ml-2">projects</span>
                </div>

                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 text-sm font-semibold transition-all ${
                    showFilters || hasActiveFilters
                      ? 'border-teal-500 bg-teal-50 text-teal-700'
                      : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:border-slate-300'
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                  Advanced Filters
                  {hasActiveFilters && (
                    <span className="inline-flex items-center justify-center w-5 h-5 bg-teal-500 text-white text-xs font-bold rounded-full animate-pulse">
                      !
                    </span>
                  )}
                </button>

                {hasActiveFilters && (
                  <button
                    onClick={resetFilters}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/20"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Reset All
                  </button>
                )}
              </div>

              {/* Right: View Mode and Sort */}
              <div className="flex items-center gap-3">
                {/* View Mode Toggle */}
                <div className="flex items-center gap-1 bg-slate-100 rounded-xl p-1 border border-slate-200">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2.5 rounded-lg transition-all ${
                      viewMode === 'grid'
                        ? 'bg-white text-slate-900 shadow-sm'
                        : 'text-slate-500 hover:text-slate-700'
                    }`}
                    title="Grid View"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setViewMode('compact')}
                    className={`p-2.5 rounded-lg transition-all ${
                      viewMode === 'compact'
                        ? 'bg-white text-slate-900 shadow-sm'
                        : 'text-slate-500 hover:text-slate-700'
                    }`}
                    title="Compact View"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setViewMode('detailed')}
                    className={`p-2.5 rounded-lg transition-all ${
                      viewMode === 'detailed'
                        ? 'bg-white text-slate-900 shadow-sm'
                        : 'text-slate-500 hover:text-slate-700'
                    }`}
                    title="Detailed View"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </button>
                </div>

                {/* Sort Dropdown */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="px-4 py-2.5 rounded-xl border-2 border-slate-200 bg-white text-sm font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
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
              <div className="mt-6 pt-6 border-t-2 border-slate-200">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Technology Filter */}
                  <div>
                    <label htmlFor="tech-filter" className="block text-sm font-bold text-slate-700 mb-3">
                      Filter by Technology
                    </label>
                    <select
                      id="tech-filter"
                      value={selectedTag}
                      onChange={(e) => setSelectedTag(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 bg-white text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
                    >
                      <option value="All">All Technologies ({allTags.length})</option>
                      {allTags.map((tag) => (
                        <option key={tag} value={tag}>
                          {tag}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Active Filter Tags */}
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-3">
                      Active Filters
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {selectedCategory !== 'All' && (
                        <span className="inline-flex items-center gap-2 px-3 py-2 bg-slate-900 text-white rounded-lg text-sm font-medium">
                          {selectedCategory}
                          <button onClick={() => setSelectedCategory('All')} className="hover:text-red-300 font-bold">
                            ×
                          </button>
                        </span>
                      )}
                      {selectedTag !== 'All' && (
                        <span className="inline-flex items-center gap-2 px-3 py-2 bg-slate-900 text-white rounded-lg text-sm font-medium">
                          {selectedTag}
                          <button onClick={() => setSelectedTag('All')} className="hover:text-red-300 font-bold">
                            ×
                          </button>
                        </span>
                      )}
                      {!hasActiveFilters && (
                        <span className="text-sm text-slate-500 py-2">No active filters</span>
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
            <div className="bg-white rounded-3xl border-2 border-dashed border-slate-300 p-16 text-center">
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-slate-100 mb-6">
                <svg
                  className="w-12 h-12 text-slate-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">No projects found</h3>
              <p className="text-slate-600 mb-8 max-w-md mx-auto text-lg">
                We couldn&apos;t find any projects matching {searchQuery ? <span className="font-semibold">&quot;{searchQuery}&quot;</span> : 'your filters'}. 
                Try adjusting your search or filters.
              </p>
              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="inline-flex items-center gap-3 px-8 py-4 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-all font-semibold text-lg shadow-xl shadow-teal-600/30"
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