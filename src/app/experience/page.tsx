'use client';

import { useState } from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getAllExperiences } from '@/data/experience';
import { SectionHeader, Tag, Button } from '@/components/ui';
import { Experience, Role } from '@/types';

// Helper to format date
function formatDate(dateStr: string): string {
  if (dateStr === 'Present') return 'Present';
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

// Helper to calculate duration
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

// Collapsible Role Card Component
function RoleCard({ role, isLast }: { role: Role; isLast: boolean }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={`relative pl-6 ${!isLast ? 'pb-6 border-l-2 border-navy-200' : ''}`}>
      {/* Role Dot */}
      <div className="absolute left-0 top-0 transform -translate-x-1/2 w-3 h-3 rounded-full bg-teal-500 border-2 border-white" />

      {/* Role Header */}
      <div className="mb-2">
        <div className="flex items-start justify-between">
          <div>
            <h4 className="font-semibold text-navy-900">{role.title}</h4>
            {role.clientCompany && (
              <span className="text-sm text-teal-600 font-medium">@ {role.clientCompany}</span>
            )}
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-sm text-navy-500 mt-1">
          <span>{formatDate(role.startDate)} — {formatDate(role.endDate)}</span>
          <span className="w-1 h-1 rounded-full bg-navy-400" />
          <span>{calculateDuration(role.startDate, role.endDate)}</span>
          <span className="w-1 h-1 rounded-full bg-navy-400" />
          <span>{role.location}</span>
        </div>
      </div>

      {/* Brief Description (always visible) */}
      <p className="text-navy-600 text-sm mb-3">{role.description}</p>

      {/* Know More Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="inline-flex items-center text-sm font-medium text-teal-600 hover:text-teal-700 transition-colors mb-3"
      >
        {isExpanded ? 'Show Less' : 'Know More'}
        <svg
          className={`w-4 h-4 ml-1 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Expandable Content */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        {/* Key Achievements */}
        {role.highlights && role.highlights.length > 0 && (
          <div className="mb-4 bg-navy-50 rounded-lg p-4">
            <h5 className="text-sm font-semibold text-navy-700 mb-2">Key Achievements</h5>
            <ul className="space-y-2">
              {role.highlights.map((highlight, idx) => (
                <li key={idx} className="flex items-start text-sm text-navy-600">
                  <svg className="w-4 h-4 text-teal-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {highlight}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Projects */}
        {role.projects && role.projects.length > 0 && (
          <div className="mb-4">
            <h5 className="text-sm font-semibold text-navy-700 mb-2">Projects</h5>
            <div className="space-y-3">
              {role.projects.map((project, idx) => (
                <div key={idx} className="bg-white border border-navy-200 rounded-lg p-3">
                  <h6 className="font-medium text-navy-900 text-sm">{project.name}</h6>
                  <p className="text-navy-600 text-sm mt-1">{project.description}</p>
                  {project.highlights && project.highlights.length > 0 && (
                    <ul className="mt-2 space-y-1">
                      {project.highlights.map((h, hIdx) => (
                        <li key={hIdx} className="flex items-start text-xs text-navy-500">
                          <span className="text-teal-500 mr-1">•</span>
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
          <div className="mb-2">
            <h5 className="text-sm font-semibold text-navy-700 mb-2">Technologies</h5>
            <div className="flex flex-wrap gap-1.5">
              {role.technologies.map((tech) => (
                <Tag key={tech} size="sm">{tech}</Tag>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Experience Card Component (for companies with single role)
function SimpleExperienceCard({ experience }: { experience: Experience }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white rounded-xl border border-card-border p-6 card-hover">
      {/* Header */}
      <div className="flex items-start gap-4 mb-4">
        <div className="relative w-14 h-14 rounded-lg bg-navy-50 flex items-center justify-center overflow-hidden flex-shrink-0">
          {experience.companyLogo ? (
            <Image
              src={experience.companyLogo}
              alt={experience.company}
              fill
              className="object-contain p-2"
            />
          ) : (
            <span className="text-2xl font-bold text-navy-600">
              {experience.company.charAt(0)}
            </span>
          )}
        </div>
        <div className="flex-grow">
          <h3 className="text-xl font-bold text-navy-900">{experience.company}</h3>
          <p className="text-teal-600 font-medium">{experience.role}</p>
          <div className="flex flex-wrap items-center gap-2 text-sm text-navy-500 mt-1">
            <span>{formatDate(experience.startDate)} — {formatDate(experience.endDate)}</span>
            <span className="w-1 h-1 rounded-full bg-navy-400" />
            <span>{calculateDuration(experience.startDate, experience.endDate)}</span>
          </div>
        </div>
      </div>

      {/* Location */}
      <div className="flex items-center text-navy-500 text-sm mb-3">
        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        {experience.location}
      </div>

      {/* Description */}
      <p className="text-navy-600 text-sm mb-3">{experience.description}</p>

      {/* Know More Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="inline-flex items-center text-sm font-medium text-teal-600 hover:text-teal-700 transition-colors"
      >
        {isExpanded ? 'Show Less' : 'Know More'}
        <svg
          className={`w-4 h-4 ml-1 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Expandable Content */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isExpanded ? 'max-h-[500px] opacity-100 mt-4' : 'max-h-0 opacity-0'
        }`}
      >
        {/* Highlights */}
        {experience.highlights && experience.highlights.length > 0 && (
          <div className="mb-4 bg-navy-50 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-navy-700 mb-2">Key Achievements</h4>
            <ul className="space-y-2">
              {experience.highlights.map((highlight, idx) => (
                <li key={idx} className="flex items-start text-sm text-navy-600">
                  <svg className="w-4 h-4 text-teal-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {highlight}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Technologies */}
        {experience.technologies && experience.technologies.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-navy-700 mb-2">Technologies</h4>
            <div className="flex flex-wrap gap-1.5">
              {experience.technologies.map((tech) => (
                <Tag key={tech} size="sm">{tech}</Tag>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Multi-Role Experience Card Component
function MultiRoleExperienceCard({ experience }: { experience: Experience }) {
  return (
    <div className="bg-white rounded-xl border border-card-border p-6 card-hover">
      {/* Company Header */}
      <div className="flex items-start gap-4 mb-6">
        <div className="relative w-14 h-14 rounded-lg bg-navy-50 flex items-center justify-center overflow-hidden flex-shrink-0">
          {experience.companyLogo ? (
            <Image
              src={experience.companyLogo}
              alt={experience.company}
              fill
              className="object-contain p-2"
            />
          ) : (
            <span className="text-2xl font-bold text-navy-600">
              {experience.company.charAt(0)}
            </span>
          )}
        </div>
        <div className="flex-grow">
          <h3 className="text-xl font-bold text-navy-900">{experience.company}</h3>
          <div className="flex flex-wrap items-center gap-2 text-sm text-navy-500 mt-1">
            <span className="px-2 py-0.5 bg-teal-100 text-teal-700 rounded-full text-xs font-medium">
              {experience.employmentType}
            </span>
            <span className="w-1 h-1 rounded-full bg-navy-400" />
            <span>{formatDate(experience.startDate)} — {formatDate(experience.endDate)}</span>
            <span className="w-1 h-1 rounded-full bg-navy-400" />
            <span>{calculateDuration(experience.startDate, experience.endDate)}</span>
          </div>
        </div>
      </div>

      {/* Roles */}
      {experience.roles && (
        <div className="space-y-4">
          {experience.roles.map((role, idx) => (
            <RoleCard
              key={idx}
              role={role}
              isLast={idx === experience.roles!.length - 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function ExperiencePage() {
  const experiences = getAllExperiences();

  return (
    <div className="pt-20">
      {/* Header */}
      <section className="section-padding bg-gradient-to-br from-navy-50 to-teal-50/30">
        <div className="max-w-4xl mx-auto">
          <SectionHeader
            title="Professional Experience"
            subtitle="4+ years building ML systems, data pipelines, and intelligent automation solutions across leading tech companies"
          />

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="bg-white rounded-lg p-4 text-center border border-card-border">
              <p className="text-3xl font-bold text-teal-600">4+</p>
              <p className="text-sm text-navy-600">Years Experience</p>
            </div>
            <div className="bg-white rounded-lg p-4 text-center border border-card-border">
              <p className="text-3xl font-bold text-teal-600">3</p>
              <p className="text-sm text-navy-600">Companies</p>
            </div>
            <div className="bg-white rounded-lg p-4 text-center border border-card-border">
              <p className="text-3xl font-bold text-teal-600">5+</p>
              <p className="text-sm text-navy-600">Major Projects</p>
            </div>
            <div className="bg-white rounded-lg p-4 text-center border border-card-border">
              <p className="text-3xl font-bold text-teal-600">3</p>
              <p className="text-sm text-navy-600">Industries</p>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Cards */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            {experiences.map((experience) => {
              // Check if experience has multiple roles
              if (experience.roles && experience.roles.length > 0) {
                return (
                  <MultiRoleExperienceCard key={experience.id} experience={experience} />
                );
              }
              return (
                <SimpleExperienceCard key={experience.id} experience={experience} />
              );
            })}
          </div>
        </div>
      </section>

      {/* Skills Summary */}
      <section className="section-padding bg-background-alt">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-navy-900 mb-6 text-center">Core Competencies</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 border border-card-border">
              <div className="w-10 h-10 rounded-lg bg-teal-100 flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-semibold text-navy-900 mb-2">Data Engineering</h3>
              <p className="text-sm text-navy-600">ETL Development, PySpark, Azure Databricks, Snowflake, Medallion Architecture, CI/CD</p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-card-border">
              <div className="w-10 h-10 rounded-lg bg-teal-100 flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="font-semibold text-navy-900 mb-2">Generative AI</h3>
              <p className="text-sm text-navy-600">LLMs, Text-to-SQL, RAG, Prompt Engineering, AI Observability (TruLens)</p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-card-border">
              <div className="w-10 h-10 rounded-lg bg-teal-100 flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                </svg>
              </div>
              <h3 className="font-semibold text-navy-900 mb-2">Data Science & AI</h3>
              <p className="text-sm text-navy-600">Forecasting Models, Deep Learning, NLP, MLOps</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-navy-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Interested in working together?</h2>
          <p className="text-navy-300 mb-8 max-w-2xl mx-auto">
            I&apos;m always open to discussing new opportunities, interesting projects, or ways to collaborate.
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
              className="border-white/30 text-white hover:bg-white hover:text-navy-900"
            >
              Connect on LinkedIn
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
