'use client';

import { useState } from 'react';
import Image from 'next/image';
import { getAllExperiences } from '@/data/experience';
import { Button, Tag } from '@/components/ui';
import { Experience, Role } from '@/types';

// Helper functions
function formatDate(dateStr: string): string {
  if (dateStr === 'Present') return 'Present';
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

function calculateDuration(startDate: string, endDate: string): string {
  const start = new Date(startDate);
  const end = endDate === 'Present' ? new Date() : new Date(endDate);
  const months = Math.max(1, Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 30)));
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  if (years === 0) return `${months} mo${months > 1 ? 's' : ''}`;
  if (remainingMonths === 0) return `${years} yr${years > 1 ? 's' : ''}`;
  return `${years} yr${years > 1 ? 's' : ''} ${remainingMonths} mo${remainingMonths > 1 ? 's' : ''}`;
}

// Role Card Component
function RoleCard({ role, isLast }: { role: Role; isLast: boolean }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={`relative ${!isLast ? 'mb-6 pb-6 border-b border-card-border' : ''}`}>
      {/* Role Header */}
      <div className="mb-3">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h4 className="text-lg font-bold text-foreground">{role.title}</h4>
            {role.clientCompany && (
              <span className="inline-flex items-center gap-1.5 mt-1 px-3 py-1 bg-secondary/10 border border-secondary/20 rounded-full text-xs font-semibold text-secondary">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Client: {role.clientCompany}
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-sm text-foreground-muted">
          <div className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{formatDate(role.startDate)} — {formatDate(role.endDate)}</span>
          </div>
          <span className="text-muted-foreground">|</span>
          <span className="font-medium text-secondary">{calculateDuration(role.startDate, role.endDate)}</span>
          <span className="text-muted-foreground">|</span>
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>{role.location}</span>
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="text-foreground-muted mb-3 leading-relaxed">{role.description}</p>

      {/* Expand Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="inline-flex items-center gap-2 text-sm font-semibold text-secondary hover:text-teal-400 transition-colors"
      >
        {isExpanded ? 'Show Less' : 'View Full Details'}
        <svg
          className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Expandable Content */}
      {isExpanded && (
        <div className="mt-4 space-y-4 animate-slide-down">
          {/* Achievements */}
          {role.highlights && role.highlights.length > 0 && (
            <div className="bg-muted rounded-xl p-4 border border-card-border">
              <h5 className="text-sm font-bold text-foreground mb-3">Key Achievements</h5>
              <ul className="space-y-2">
                {role.highlights.map((highlight, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-foreground-muted">
                    <svg className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Projects */}
          {role.projects && role.projects.length > 0 && (
            <div>
              <h5 className="text-sm font-bold text-foreground mb-3">Projects</h5>
              <div className="space-y-3">
                {role.projects.map((project, idx) => (
                  <div key={idx} className="bg-card rounded-lg p-4 border border-card-border">
                    <h6 className="font-semibold text-foreground mb-1">{project.name}</h6>
                    <p className="text-foreground-muted text-sm mb-2">{project.description}</p>
                    {project.highlights && project.highlights.length > 0 && (
                      <ul className="space-y-1">
                        {project.highlights.map((h, hIdx) => (
                          <li key={hIdx} className="flex items-start gap-2 text-xs text-foreground-muted">
                            <span className="text-secondary font-bold">•</span>
                            {h}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Technologies */}
          {role.technologies && role.technologies.length > 0 && (
            <div>
              <h5 className="text-sm font-bold text-foreground mb-2">Technologies Used</h5>
              <div className="flex flex-wrap gap-2">
                {role.technologies.map((tech) => (
                  <Tag key={tech} size="sm">{tech}</Tag>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Experience Card Component
function ExperienceCard({ experience }: { experience: Experience }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasMultipleRoles = experience.roles && experience.roles.length > 0;

  return (
    <div className="bg-card rounded-2xl border-2 border-card-border hover:border-secondary/50 transition-all shadow-lg hover:shadow-xl p-8">
      {/* Header */}
      <div className="flex items-start gap-6 mb-6">
        {/* Company Logo */}
        <div className="relative w-20 h-20 rounded-xl bg-muted border-2 border-card-border flex items-center justify-center overflow-hidden flex-shrink-0 shadow-sm">
          {experience.companyLogo ? (
            <Image
              src={experience.companyLogo}
              alt={experience.company}
              fill
              className="object-contain p-3"
            />
          ) : (
            <span className="text-3xl font-bold text-foreground-muted">
              {experience.company.charAt(0)}
            </span>
          )}
        </div>

        {/* Company Info */}
        <div className="flex-grow">
          <h3 className="text-2xl font-bold text-foreground mb-2">{experience.company}</h3>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="px-3 py-1 bg-secondary/10 border border-secondary/20 rounded-full text-sm font-semibold text-secondary">
              {experience.employmentType}
            </span>
            <span className="text-muted-foreground">•</span>
            <span className="text-foreground-muted font-medium">
              {formatDate(experience.startDate)} — {formatDate(experience.endDate)}
            </span>
            <span className="text-muted-foreground">•</span>
            <span className="px-3 py-1 bg-muted rounded-full text-sm font-semibold text-foreground-muted">
              {calculateDuration(experience.startDate, experience.endDate)}
            </span>
          </div>
          {experience.location && (
            <div className="flex items-center gap-1.5 text-foreground-muted">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-sm">{experience.location}</span>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      {hasMultipleRoles ? (
        <div>
          <div className="flex items-center gap-2 mb-4 px-4 py-2 bg-secondary/10 rounded-lg border border-secondary/20">
            <svg className="w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            <span className="text-sm font-bold text-secondary">
              Career Progression — {experience.roles!.length} Roles
            </span>
          </div>
          {experience.roles!.map((role, idx) => (
            <RoleCard key={idx} role={role} isLast={idx === experience.roles!.length - 1} />
          ))}
        </div>
      ) : (
        <div>
          {experience.role && (
            <p className="text-lg font-semibold text-secondary mb-3">{experience.role}</p>
          )}
          {experience.description && (
            <p className="text-foreground-muted mb-4 leading-relaxed">{experience.description}</p>
          )}

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="inline-flex items-center gap-2 text-sm font-semibold text-secondary hover:text-teal-400 transition-colors"
          >
            {isExpanded ? 'Show Less' : 'View Full Details'}
            <svg
              className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {isExpanded && (
            <div className="mt-4 space-y-4 animate-slide-down">
              {experience.highlights && experience.highlights.length > 0 && (
                <div className="bg-muted rounded-xl p-4 border border-card-border">
                  <h5 className="text-sm font-bold text-foreground mb-3">Key Achievements</h5>
                  <ul className="space-y-2">
                    {experience.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-foreground-muted">
                        <svg className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {experience.technologies && experience.technologies.length > 0 && (
                <div>
                  <h5 className="text-sm font-bold text-foreground mb-2">Technologies Used</h5>
                  <div className="flex flex-wrap gap-2">
                    {experience.technologies.map((tech) => (
                      <Tag key={tech} size="sm">{tech}</Tag>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function ExperiencePage() {
  const experiences = getAllExperiences();

  const totalYears = experiences.reduce((acc, exp) => {
    const start = new Date(exp.startDate);
    const end = exp.endDate === 'Present' ? new Date() : new Date(exp.endDate);
    const months = (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 30);
    return acc + months;
  }, 0) / 12;

  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Hero Section with Impact Banner */}
      <section className="relative overflow-hidden bg-background-alt border-b border-card-border">
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(20,184,166,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(20,184,166,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/10 border border-secondary/20 rounded-full text-secondary text-sm font-semibold mb-6">
              <span className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
              Full Stack Data Engineering Career
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4">
              Professional Experience
            </h1>
            <p className="text-xl text-foreground-muted max-w-3xl mx-auto">
              {Math.floor(totalYears)}+ years delivering production-grade data infrastructure and AI solutions at enterprise scale
            </p>
          </div>

          {/* Impact Metrics Banner */}
          <div className="relative rounded-2xl p-8 shadow-2xl mb-8
            bg-[radial-gradient(circle_at_top,rgba(20,184,166,0.35),rgba(15,23,42,1))]">
            <div className="text-center mb-6">
              <h2 className="text-white text-2xl font-bold mb-2">Business Impact & Scale</h2>
              <p className="text-teal-100 text-sm">Measurable results across enterprise data infrastructure</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z', value: '¥36M', label: 'Annual Cost Savings', sub: 'Platform Migration ROI' },
                { icon: 'M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4', value: '3.2GB', label: 'Daily Processing', sub: 'Production DWH Scale' },
                { icon: 'M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z', value: '280+', label: 'ETL Pipelines', sub: 'Production Deployments' },
                { icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', value: '99.9%', label: 'Uptime SLA', sub: 'Production Systems' },
              ].map((item, idx) => (
                <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all">
                  <div className="flex items-center justify-center mb-3">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                      </svg>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-white mb-1">{item.value}</div>
                    <div className="text-sm font-medium text-teal-100">{item.label}</div>
                    <div className="text-xs text-teal-200 mt-1">{item.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Professional Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: `${Math.floor(totalYears)}+`, label: 'Years Experience' },
              { value: `${experiences.length}`, label: 'Companies' },
              { value: '3', label: 'Continents' },
              { value: '15%', label: 'Accuracy Gain' },
            ].map((stat, idx) => (
              <div key={idx} className="bg-card rounded-xl p-6 text-center border-2 border-card-border hover:border-secondary/50 transition-all shadow-sm">
                <div className="text-3xl font-bold text-foreground mb-1">{stat.value}</div>
                <div className="text-sm font-semibold text-foreground-muted">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 bg-background-alt">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-foreground mb-3">Career Timeline</h2>
            <p className="text-foreground-muted">From data engineering to AI infrastructure leadership</p>
          </div>

          <div className="space-y-6">
            {experiences.map((experience) => (
              <ExperienceCard key={experience.id} experience={experience} />
            ))}
          </div>
        </div>
      </section>

      {/* Skills Grid */}
      <section className="py-16 bg-background border-y border-card-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground mb-10 text-center">Technical Expertise</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Data Engineering', icon: '💾', skills: 'ETL, PySpark, Databricks, Snowflake, Medallion' },
              { title: 'Generative AI', icon: '🤖', skills: 'LLMs, RAG, TruLens, Prompt Engineering' },
              { title: 'ML & Forecasting', icon: '📊', skills: 'DeepAR, Prophet, MLOps, Time Series' },
              { title: 'Cloud & DevOps', icon: '☁️', skills: 'Azure, CI/CD, GitHub Actions, Airflow' },
            ].map((skill, idx) => (
              <div key={idx} className="bg-card rounded-xl p-6 border-2 border-card-border hover:border-secondary/50 transition-all shadow-sm hover:shadow-lg">
                <div className="text-4xl mb-4">{skill.icon}</div>
                <h3 className="font-bold text-foreground mb-2">{skill.title}</h3>
                <p className="text-sm text-foreground-muted">{skill.skills}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16" style={{ background: 'linear-gradient(to bottom right, var(--cta-bg-from), var(--cta-bg-to))' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Collaborate?</h2>
          <p className="text-gray-300 mb-8 text-lg">
            Open for Tech Lead roles in Data Engineering & AI Infrastructure
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/contact" variant="secondary" size="lg">
              Get in Touch
            </Button>
            <Button
              href="https://www.linkedin.com/in/pavitra-mandal-b0b0571a0/"
              external
              variant="outline"
              size="lg"
              className="border-white/30 text-white hover:bg-white hover:text-black"
            >
              Connect on LinkedIn
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
