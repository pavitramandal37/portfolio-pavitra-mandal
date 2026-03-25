'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { getAllExperiences } from '@/data/experience';
import { Button, Tag } from '@/components/ui';
import { Experience, Role } from '@/types';

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

function RoleCard({ role, isLast }: { role: Role; isLast: boolean }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={`relative ${!isLast ? 'mb-6 pb-6 border-b border-white/5' : ''}`}>
      <div className="mb-3">
        <h4 className="text-lg font-bold text-white">{role.title}</h4>
        {role.clientCompany && (
          <span className="inline-flex items-center gap-1.5 mt-2 px-3 py-1 bg-teal-500/10 border border-teal-500/20 rounded-full text-xs font-semibold text-teal-400">
            Client: {role.clientCompany}
          </span>
        )}
        <div className="flex flex-wrap items-center gap-2 mt-2 text-sm text-white/40">
          <span>{formatDate(role.startDate)} — {formatDate(role.endDate)}</span>
          <span className="text-white/20">|</span>
          <span className="font-medium text-teal-400">{calculateDuration(role.startDate, role.endDate)}</span>
          <span className="text-white/20">|</span>
          <span>{role.location}</span>
        </div>
      </div>

      <p className="text-white/50 mb-3 leading-relaxed">{role.description}</p>

      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="inline-flex items-center gap-2 text-sm font-semibold text-teal-400 hover:text-teal-300 transition-colors"
      >
        {isExpanded ? 'Show Less' : 'View Details'}
        <svg className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isExpanded && (
        <div className="mt-4 space-y-4 animate-slide-down">
          {role.highlights && role.highlights.length > 0 && (
            <div className="bg-white/5 rounded-xl p-4 border border-white/5">
              <h5 className="text-sm font-bold text-white mb-3">Key Achievements</h5>
              <ul className="space-y-2">
                {role.highlights.map((highlight, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-white/60">
                    <svg className="w-4 h-4 text-teal-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
                    </svg>
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {role.projects && role.projects.length > 0 && (
            <div>
              <h5 className="text-sm font-bold text-white mb-3">Projects</h5>
              <div className="space-y-3">
                {role.projects.map((project, idx) => (
                  <div key={idx} className="bg-white/5 rounded-lg p-4 border border-white/5">
                    <h6 className="font-semibold text-white mb-1">{project.name}</h6>
                    <p className="text-white/50 text-sm">{project.description}</p>
                    {project.highlights && (
                      <ul className="mt-2 space-y-1">
                        {project.highlights.map((h, hIdx) => (
                          <li key={hIdx} className="flex items-start gap-2 text-xs text-white/40">
                            <span className="text-teal-400">•</span>
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

          {role.technologies && role.technologies.length > 0 && (
            <div>
              <h5 className="text-sm font-bold text-white mb-2">Technologies</h5>
              <div className="flex flex-wrap gap-2">
                {role.technologies.map((tech) => (
                  <span key={tech} className="px-3 py-1 text-xs font-medium rounded-full border border-white/10 text-white/50 bg-white/5">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function TimelineCard({ experience, index }: { experience: Experience; index: number }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasMultipleRoles = experience.roles && experience.roles.length > 0;
  const isLeft = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="relative grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-6 lg:gap-8"
    >
      {/* Content - alternating sides */}
      <div className={`${isLeft ? 'lg:col-start-1' : 'lg:col-start-3'} ${isLeft ? '' : 'lg:text-left'}`}>
        <div className="bg-navy-900 rounded-2xl border border-white/10 hover:border-teal-400/20 transition-all p-8">
          {/* Header */}
          <div className="flex items-start gap-5 mb-6">
            <div className="relative w-16 h-16 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden flex-shrink-0">
              {experience.companyLogo ? (
                <Image
                  src={experience.companyLogo}
                  alt={experience.company}
                  fill
                  className="object-contain p-2"
                />
              ) : (
                <span className="text-2xl font-bold text-white/30">
                  {experience.company.charAt(0)}
                </span>
              )}
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">{experience.company}</h3>
              <div className="flex flex-wrap items-center gap-2 mt-1">
                <span className="px-2.5 py-0.5 bg-teal-500/10 border border-teal-500/20 rounded-full text-xs font-semibold text-teal-400">
                  {experience.employmentType}
                </span>
                <span className="text-white/30 text-sm">
                  {formatDate(experience.startDate)} — {formatDate(experience.endDate)}
                </span>
              </div>
              <div className="flex items-center gap-2 mt-1 text-white/30 text-sm">
                <span>{experience.location}</span>
                <span>•</span>
                <span className="text-teal-400 font-medium">{calculateDuration(experience.startDate, experience.endDate)}</span>
              </div>
            </div>
          </div>

          {/* Content */}
          {hasMultipleRoles ? (
            <div>
              <div className="flex items-center gap-2 mb-4 px-3 py-2 bg-teal-500/5 rounded-lg border border-teal-500/10">
                <svg className="w-4 h-4 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                <span className="text-xs font-bold text-teal-400">
                  {experience.roles!.length} Roles — Career Progression
                </span>
              </div>
              {experience.roles!.map((role, idx) => (
                <RoleCard key={idx} role={role} isLast={idx === experience.roles!.length - 1} />
              ))}
            </div>
          ) : (
            <div>
              {experience.role && (
                <p className="text-lg font-semibold text-teal-400 mb-3">{experience.role}</p>
              )}
              {experience.description && (
                <p className="text-white/50 mb-4 leading-relaxed">{experience.description}</p>
              )}

              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="inline-flex items-center gap-2 text-sm font-semibold text-teal-400 hover:text-teal-300 transition-colors"
              >
                {isExpanded ? 'Show Less' : 'View Details'}
                <svg className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isExpanded && (
                <div className="mt-4 space-y-4 animate-slide-down">
                  {experience.highlights && experience.highlights.length > 0 && (
                    <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                      <h5 className="text-sm font-bold text-white mb-3">Key Achievements</h5>
                      <ul className="space-y-2">
                        {experience.highlights.map((highlight, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-white/60">
                            <svg className="w-4 h-4 text-teal-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
                            </svg>
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {experience.technologies && experience.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {experience.technologies.map((tech) => (
                        <span key={tech} className="px-3 py-1 text-xs font-medium rounded-full border border-white/10 text-white/50 bg-white/5">
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Timeline dot - center */}
      <div className="hidden lg:flex flex-col items-center lg:col-start-2 lg:row-start-1">
        <div className="w-4 h-4 rounded-full bg-teal-400 border-4 border-navy-950 z-10 shadow-[0_0_20px_rgba(20,184,166,0.3)]" />
        <div className="w-px flex-grow bg-gradient-to-b from-teal-400/30 to-transparent" />
      </div>

      {/* Empty space for alternating layout */}
      <div className={`hidden lg:block ${isLeft ? 'lg:col-start-3' : 'lg:col-start-1'}`} />
    </motion.div>
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
    <div className="min-h-screen bg-navy-950 pt-20">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(20,184,166,0.08),transparent_60%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(20,184,166,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(20,184,166,0.02)_1px,transparent_1px)] bg-[size:80px_80px]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-16">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-400 mb-4"
            >
              Career Journey
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6"
            >
              Experience
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-white/50 max-w-3xl mx-auto"
            >
              {Math.floor(totalYears)}+ years delivering production-grade data infrastructure and AI solutions at enterprise scale
            </motion.p>
          </div>

          {/* Impact Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
          >
            {[
              { value: '¥36M', label: 'Cost Savings', sublabel: 'Platform Migration' },
              { value: '3.2GB', label: 'Daily Processing', sublabel: 'Production DWH' },
              { value: '280+', label: 'Product Lines', sublabel: 'ETL Coverage' },
              { value: '99.9%', label: 'Uptime SLA', sublabel: 'Production Systems' },
            ].map((metric, i) => (
              <div key={i} className="group relative p-6 rounded-2xl border border-white/10 bg-white/5 hover:border-teal-400/30 hover:bg-white/10 transition-all text-center">
                <div className="text-3xl sm:text-4xl font-extrabold text-white">{metric.value}</div>
                <div className="text-sm font-medium text-teal-400 mt-1">{metric.label}</div>
                <div className="text-xs text-white/30 mt-0.5">{metric.sublabel}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 relative">
        {/* Central line */}
        <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-teal-400/20 via-white/5 to-transparent" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {experiences.map((experience, index) => (
            <TimelineCard key={experience.id} experience={experience} index={index} />
          ))}
        </div>
      </section>

      {/* Skills */}
      <section className="py-20 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-white mb-12 text-center"
          >
            Technical Expertise
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Data Engineering', skills: 'ETL, PySpark, Databricks, Snowflake, Medallion Architecture' },
              { title: 'Generative AI', skills: 'LLMs, RAG, TruLens, Cortex AI, Prompt Engineering' },
              { title: 'ML & Forecasting', skills: 'DeepAR, Prophet, SARIMA, MLOps, Time Series' },
              { title: 'Cloud & DevOps', skills: 'Azure, CI/CD, GitHub Actions, Docker, Airflow' },
            ].map((skill, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-6 rounded-2xl border border-white/10 bg-white/5 hover:border-teal-400/20 hover:bg-white/10 transition-all"
              >
                <h3 className="font-bold text-white mb-3">{skill.title}</h3>
                <p className="text-sm text-white/40">{skill.skills}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Collaborate?</h2>
          <p className="text-white/40 mb-8 text-lg">
            Open for Tech Lead roles in Data Engineering & AI Infrastructure
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/contact" variant="secondary" size="lg">
              Get in Touch
            </Button>
            <Button
              href="https://www.linkedin.com/in/pavitra-mandal-b0b0571a0/"
              external
              variant="ghost"
              size="lg"
              className="border border-white/20 text-white hover:bg-white/10"
            >
              Connect on LinkedIn
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
