'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { getAllExperiences } from '@/data/experience';
import { Button, Tag, PageHero } from '@/components/ui';
import CornerBrackets from '@/components/ui/CornerBrackets';
import { Experience, Role } from '@/types';
import pageImages from '@/data/pageImages';

const MONO: React.CSSProperties = { fontFamily: 'var(--font-mono)' };
const DISPLAY: React.CSSProperties = { fontFamily: 'var(--font-display)' };

// ── Education Data ──────────────────────────────────────────────────────────
const EDUCATION = [
  {
    type: 'B.E.',
    degree: 'Bachelor of Engineering',
    field: 'Electronics & Communication Engineering',
    institution: 'G.H. Raisoni Academy of Engineering and Technology',
    location: 'Nagpur, India',
    period: '2017 – 2021',
    score: 'CGPA 8.47 / 10',
    note: 'Featured Alumni · Raisoni Alumni Foundation',
    highlight: true,
  },
  {
    type: 'HSC',
    degree: 'Higher Secondary Certificate',
    field: 'Computer Science',
    institution: 'Ordnance Factory Higher Secondary School Chanda',
    location: 'India',
    period: '2015 – 2017',
    score: '72.93%',
    note: null,
    highlight: false,
  },
  {
    type: 'SSC',
    degree: 'Secondary School Certificate',
    field: '',
    institution: 'Ordnance Factory Higher Secondary School Chanda',
    location: 'India',
    period: '2015',
    score: '81.40%',
    note: null,
    highlight: false,
  },
];

// ── Certifications Data ─────────────────────────────────────────────────────
const MB = '/certificates/Microsoft%20Azure%20Certification';
const OB = '/certificates/Oracle%20Certification/Oracle%20Database%40AWS%20Architect';

const CERTS = [
  {
    name: 'Azure Data Engineer Associate',
    code: 'DP-203',
    issuer: 'Microsoft',
    validity: '2024 – 2026',
    badge: null as string | null,
    pdf: `${MB}/Azure%20Data%20Engineer%20Associate.pdf`,
    accent: '#0078d4',
  },
  {
    name: 'Azure Data Scientist Associate',
    code: 'DP-100',
    issuer: 'Microsoft',
    validity: '2022 – 2026',
    badge: `${MB}/azure-data-scientist-associate-600x600.png`,
    pdf: `${MB}/Azure%20Data%20Scientist%20Associate.pdf`,
    accent: '#0078d4',
  },
  {
    name: 'Azure AI Engineer Associate',
    code: 'AI-102',
    issuer: 'Microsoft',
    validity: '2024 – 2026',
    badge: null as string | null,
    pdf: null as string | null,
    accent: '#0078d4',
  },
  {
    name: 'Power BI Data Analyst Associate',
    code: 'PL-300',
    issuer: 'Microsoft',
    validity: '2024 – 2025',
    badge: `${MB}/power-bi-data-analyst-associate.png`,
    pdf: `${MB}/Power%20BI%20Data%20Analyst%20Associate.pdf`,
    accent: '#f2c811',
  },
  {
    name: 'Database@AWS Architect Professional',
    code: 'OCP',
    issuer: 'Oracle',
    validity: '2025',
    badge: `${OB}/ODBAWSOCP.jpg`,
    pdf: `${OB}/Oracle%20Database%40AWS%20Architect%20Certification.pdf`,
    accent: '#f80000',
  },
  {
    name: 'Core Designer',
    code: 'CDS',
    issuer: 'Dataiku',
    validity: '2025',
    badge: null as string | null,
    pdf: '/certificates/DataIku/certificate-j75df26tfeon-1744000514.pdf',
    accent: '#1e6fce',
  },
];

// ── Helper Functions ────────────────────────────────────────────────────────
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

// ── Sub-Components ──────────────────────────────────────────────────────────
function RoleCard({ role, isLast }: { role: Role; isLast: boolean }) {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div className={`relative ${!isLast ? 'mb-6 pb-6 border-b border-card-border' : ''}`}>
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
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{formatDate(role.startDate)} — {formatDate(role.endDate)}</span>
          </div>
          <span className="text-muted-foreground">|</span>
          <span className="font-medium text-secondary">{calculateDuration(role.startDate, role.endDate)}</span>
          <span className="text-muted-foreground">|</span>
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>{role.location}</span>
          </div>
        </div>
      </div>
      <p className="text-foreground-muted mb-3 leading-relaxed">{role.description}</p>
      <button onClick={() => setIsExpanded(!isExpanded)} className="inline-flex items-center gap-2 text-sm font-semibold text-secondary hover:text-teal-400 transition-colors">
        {isExpanded ? 'Show Less' : 'View Full Details'}
        <svg className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isExpanded && (
        <div className="mt-4 space-y-4">
          {role.highlights && role.highlights.length > 0 && (
            <div className="bg-muted rounded-xl p-4 border border-card-border">
              <h5 className="text-sm font-bold text-foreground mb-3">Key Achievements</h5>
              <ul className="space-y-2">
                {role.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-foreground-muted">
                    <svg className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {role.projects && role.projects.length > 0 && (
            <div>
              <h5 className="text-sm font-bold text-foreground mb-3">Projects</h5>
              <div className="space-y-3">
                {role.projects.map((project, i) => (
                  <div key={i} className="bg-card rounded-lg p-4 border border-card-border">
                    <h6 className="font-semibold text-foreground mb-1">{project.name}</h6>
                    <p className="text-foreground-muted text-sm mb-2">{project.description}</p>
                    {project.highlights && (
                      <ul className="space-y-1">
                        {project.highlights.map((h, hi) => (
                          <li key={hi} className="flex items-start gap-2 text-xs text-foreground-muted">
                            <span className="text-secondary font-bold">•</span>{h}
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
              <h5 className="text-sm font-bold text-foreground mb-2">Technologies Used</h5>
              <div className="flex flex-wrap gap-2">
                {role.technologies.map(tech => <Tag key={tech} size="sm">{tech}</Tag>)}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function ExperienceCard({ experience }: { experience: Experience }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasMultipleRoles = experience.roles && experience.roles.length > 0;
  return (
    <div className="bg-card rounded-2xl border-2 border-card-border hover:border-secondary/50 transition-all shadow-lg hover:shadow-xl p-8">
      <div className="flex items-start gap-6 mb-6">
        <div className="relative w-20 h-20 rounded-xl bg-muted border-2 border-card-border flex items-center justify-center overflow-hidden flex-shrink-0 shadow-sm">
          {experience.companyLogo ? (
            <Image src={experience.companyLogo} alt={experience.company} fill className="object-contain p-3" />
          ) : (
            <span className="text-3xl font-bold text-foreground-muted">{experience.company.charAt(0)}</span>
          )}
        </div>
        <div className="flex-grow">
          <h3 className="text-2xl font-bold text-foreground mb-2">{experience.company}</h3>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="px-3 py-1 bg-secondary/10 border border-secondary/20 rounded-full text-sm font-semibold text-secondary">{experience.employmentType}</span>
            <span className="text-muted-foreground">•</span>
            <span className="text-foreground-muted font-medium">{formatDate(experience.startDate)} — {formatDate(experience.endDate)}</span>
            <span className="text-muted-foreground">•</span>
            <span className="px-3 py-1 bg-muted rounded-full text-sm font-semibold text-foreground-muted">{calculateDuration(experience.startDate, experience.endDate)}</span>
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
      {hasMultipleRoles ? (
        <div>
          <div className="flex items-center gap-2 mb-4 px-4 py-2 bg-secondary/10 rounded-lg border border-secondary/20">
            <svg className="w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            <span className="text-sm font-bold text-secondary">Career Progression — {experience.roles!.length} Roles</span>
          </div>
          {experience.roles!.map((role, idx) => (
            <RoleCard key={idx} role={role} isLast={idx === experience.roles!.length - 1} />
          ))}
        </div>
      ) : (
        <div>
          {experience.role && <p className="text-lg font-semibold text-secondary mb-3">{experience.role}</p>}
          {experience.description && <p className="text-foreground-muted mb-4 leading-relaxed">{experience.description}</p>}
          <button onClick={() => setIsExpanded(!isExpanded)} className="inline-flex items-center gap-2 text-sm font-semibold text-secondary hover:text-teal-400 transition-colors">
            {isExpanded ? 'Show Less' : 'View Full Details'}
            <svg className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {isExpanded && (
            <div className="mt-4 space-y-4">
              {experience.highlights && experience.highlights.length > 0 && (
                <div className="bg-muted rounded-xl p-4 border border-card-border">
                  <h5 className="text-sm font-bold text-foreground mb-3">Key Achievements</h5>
                  <ul className="space-y-2">
                    {experience.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-foreground-muted">
                        <svg className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {experience.technologies && experience.technologies.length > 0 && (
                <div>
                  <h5 className="text-sm font-bold text-foreground mb-2">Technologies Used</h5>
                  <div className="flex flex-wrap gap-2">
                    {experience.technologies.map(tech => <Tag key={tech} size="sm">{tech}</Tag>)}
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

// ── Page ────────────────────────────────────────────────────────────────────
export default function ExperiencePage() {
  const experiences = getAllExperiences();
  const totalYears = experiences.reduce((acc, exp) => {
    const start = new Date(exp.startDate);
    const end = exp.endDate === 'Present' ? new Date() : new Date(exp.endDate);
    return acc + (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 30);
  }, 0) / 12;

  return (
    <div className="min-h-screen bg-background">
      <PageHero
        title="Professional"
        titleItalic="Experience"
        category="Career"
        subtitle={`Sony · Cisco · Tech Mahindra — ${Math.floor(totalYears)}+ years at enterprise scale`}
        imageSrc={pageImages.experience}
        imageAlt="Professional Experience"
      />

      {/* ── Career Timeline ─────────────────────────────── */}
      <section className="section-padding bg-background-alt relative">
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(to right, transparent, var(--border), transparent)' }} />
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p style={{ ...MONO, fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#E4572E', marginBottom: '12px' }}>
              <span className="inline-block w-1.5 h-1.5 rounded-full mr-2 align-middle" style={{ backgroundColor: '#E4572E' }} />
              Work History
            </p>
            <h2 style={{ ...DISPLAY, fontSize: 'clamp(1.8rem, 3.5vw, 3rem)', fontWeight: 400, color: 'var(--foreground)', lineHeight: 1.1 }}>
              Career Timeline
            </h2>
          </motion.div>
          <div className="space-y-6">
            {experiences.map((experience, idx) => (
              <motion.div
                key={experience.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
              >
                <ExperienceCard experience={experience} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Alumni Feature ──────────────────────────────── */}
      <section className="section-padding bg-background relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(to right, transparent, var(--border), transparent)' }} />
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <p style={{ ...MONO, fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#E4572E', marginBottom: '12px' }}>
              <span className="inline-block w-1.5 h-1.5 rounded-full mr-2 align-middle animate-pulse" style={{ backgroundColor: '#E4572E' }} />
              Recognition
            </p>
            <h2 style={{ ...DISPLAY, fontSize: 'clamp(1.8rem, 3.5vw, 3rem)', fontWeight: 400, color: 'var(--foreground)', lineHeight: 1.1 }}>
              Alumni Success Story
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative border overflow-hidden"
            style={{ borderColor: 'rgba(228,87,46,0.45)', borderLeft: '4px solid #E4572E', backgroundColor: 'var(--card)' }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-5">
              {/* Left: content */}
              <div className="lg:col-span-3 p-8 lg:p-12">
                <div className="flex items-center gap-3 mb-6">
                  <svg className="w-5 h-5 flex-shrink-0" fill="#0a66c2" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  <span style={{ ...MONO, fontSize: '9px', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#E4572E' }}>
                    Featured by Raisoni Alumni Foundation
                  </span>
                </div>

                <h3 style={{ ...DISPLAY, fontSize: 'clamp(1.5rem, 2.5vw, 2.4rem)', fontWeight: 400, color: 'var(--foreground)', lineHeight: 1.2, marginBottom: '16px' }}>
                  Engineering Intelligence —<br />
                  <em style={{ fontStyle: 'italic', color: 'var(--foreground-muted)' }}>From Nagpur to Tokyo</em>
                </h3>

                <p style={{ fontSize: '0.9rem', color: 'var(--foreground-muted)', lineHeight: 1.85, marginBottom: '24px' }}>
                  Recognised by G.H. Raisoni Academy of Engineering and Technology&apos;s Alumni Foundation for building production AI infrastructure at Sony, Tokyo — a success story shared across the global Raisoni engineering community as a symbol of alumni pride and global impact.
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {['#RaisoniAlumni', '#RaisoniPride', '#GlobalSuccess'].map(tag => (
                    <span key={tag} style={{ ...MONO, fontSize: '9px', letterSpacing: '0.1em', color: '#E4572E', border: '1px solid rgba(228,87,46,0.35)', padding: '3px 10px' }}>
                      {tag}
                    </span>
                  ))}
                </div>

                <a
                  href="https://www.linkedin.com/posts/raisoni-alumni_raisonialumni-raisonipride-globalsuccess-activity-7415676405134385152-xTLM?utm_source=share&utm_medium=member_desktop&rcm=ACoAAC7-SnsBt7sRGQzu2j7JTuPaPY8yyHJUxOQ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 transition-all"
                  style={{ ...MONO, fontSize: '9px', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#E4572E', border: '1px solid rgba(228,87,46,0.55)', padding: '10px 22px' }}
                >
                  View Featured Post
                  <svg className="w-3 h-3 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>

              {/* Right: decorative quote */}
              <div
                className="lg:col-span-2 flex items-center justify-center p-8 lg:p-12 relative"
                style={{ backgroundColor: 'rgba(228,87,46,0.04)', borderTop: '1px solid rgba(228,87,46,0.15)' }}
              >
                <div className="relative">
                  <CornerBrackets size={22} color="#E4572E" thickness={1} />
                  <div className="px-8 py-8 text-center">
                    <p style={{ ...DISPLAY, fontSize: '4rem', color: '#E4572E', lineHeight: 0.8, marginBottom: '12px' }}>&ldquo;</p>
                    <p style={{ ...DISPLAY, fontSize: '1.15rem', fontWeight: 400, fontStyle: 'italic', color: 'var(--foreground)', lineHeight: 1.5, maxWidth: '240px' }}>
                      A Raisoni engineer shaping the future of AI at Sony, Tokyo
                    </p>
                    <div
                      className="mt-5 pt-4"
                      style={{ borderTop: '1px solid rgba(228,87,46,0.25)' }}
                    >
                      <p style={{ ...MONO, fontSize: '9px', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#E4572E' }}>
                        Raisoni Alumni Foundation
                      </p>
                      <p style={{ ...MONO, fontSize: '8px', letterSpacing: '0.1em', color: 'var(--foreground-muted)', opacity: 0.6, marginTop: '4px' }}>
                        G.H. Raisoni Academy · Nagpur · 2021
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Education Timeline ──────────────────────────── */}
      <section className="section-padding bg-background-alt relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(to right, transparent, var(--border), transparent)' }} />
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p style={{ ...MONO, fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#E4572E', marginBottom: '12px' }}>
              <span className="inline-block w-1.5 h-1.5 rounded-full mr-2 align-middle" style={{ backgroundColor: '#E4572E' }} />
              Academic Background
            </p>
            <h2 style={{ ...DISPLAY, fontSize: 'clamp(1.8rem, 3.5vw, 3rem)', fontWeight: 400, color: 'var(--foreground)', lineHeight: 1.1 }}>
              Education
            </h2>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical connecting line */}
            <div
              className="absolute hidden sm:block"
              style={{ left: '19px', top: '20px', bottom: '20px', width: '1px', backgroundColor: 'var(--card-border)' }}
            />

            <div className="space-y-6">
              {EDUCATION.map((edu, idx) => (
                <motion.div
                  key={idx}
                  className="relative sm:pl-14"
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: idx * 0.12 }}
                >
                  {/* Timeline node */}
                  <div
                    className="hidden sm:flex absolute left-0 top-5 w-10 h-10 items-center justify-center"
                    style={{
                      border: `1px solid ${edu.highlight ? '#E4572E' : 'var(--card-border)'}`,
                      backgroundColor: edu.highlight ? 'rgba(228,87,46,0.08)' : 'var(--card)',
                    }}
                  >
                    <span style={{ ...MONO, fontSize: '7px', letterSpacing: '0.08em', color: edu.highlight ? '#E4572E' : 'var(--foreground-muted)', fontWeight: 700 }}>
                      {edu.type}
                    </span>
                  </div>

                  {/* Card */}
                  <div
                    className="border overflow-hidden"
                    style={{
                      borderColor: edu.highlight ? 'rgba(228,87,46,0.4)' : 'var(--card-border)',
                      borderLeft: edu.highlight ? '3px solid #E4572E' : undefined,
                      backgroundColor: 'var(--card)',
                      boxShadow: edu.highlight ? '0 4px 24px rgba(228,87,46,0.08)' : 'none',
                    }}
                  >
                    <div className="p-6 sm:p-7">
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                        <div className="flex-1">
                          {/* Mobile-only type badge */}
                          <span
                            className="sm:hidden inline-block mb-2"
                            style={{ ...MONO, fontSize: '8px', letterSpacing: '0.12em', textTransform: 'uppercase', color: edu.highlight ? '#E4572E' : 'var(--foreground-muted)', border: '1px solid var(--card-border)', padding: '2px 7px' }}
                          >
                            {edu.type}
                          </span>
                          <h3 style={{ ...DISPLAY, fontSize: '1.25rem', fontWeight: 400, color: 'var(--foreground)', lineHeight: 1.25 }}>
                            {edu.degree}
                            {edu.field && (
                              <em style={{ fontStyle: 'italic', color: 'var(--foreground-muted)', fontSize: '0.88em' }}>
                                {' '}— {edu.field}
                              </em>
                            )}
                          </h3>
                          <p style={{ ...MONO, fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--foreground-muted)', marginTop: '6px' }}>
                            {edu.institution}
                          </p>
                          <p style={{ ...MONO, fontSize: '9px', letterSpacing: '0.08em', color: 'var(--foreground-muted)', opacity: 0.6, marginTop: '3px' }}>
                            {edu.location}
                          </p>
                        </div>
                        <div className="shrink-0 sm:text-right">
                          <p style={{ ...MONO, fontSize: '11px', letterSpacing: '0.12em', color: '#E4572E' }}>
                            {edu.period}
                          </p>
                          <p style={{ ...MONO, fontSize: '12px', letterSpacing: '0.06em', color: 'var(--foreground)', marginTop: '5px', fontWeight: 700 }}>
                            {edu.score}
                          </p>
                        </div>
                      </div>

                      {edu.note && (
                        <div
                          className="mt-4 pt-4 flex items-center gap-2"
                          style={{ borderTop: '1px solid rgba(228,87,46,0.2)' }}
                        >
                          <span className="inline-block w-1 h-1 rounded-full animate-pulse" style={{ backgroundColor: '#E4572E' }} />
                          <p style={{ ...MONO, fontSize: '9px', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#E4572E' }}>
                            {edu.note}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Certifications ──────────────────────────────── */}
      <section className="section-padding bg-background relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(to right, transparent, var(--border), transparent)' }} />
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p style={{ ...MONO, fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#E4572E', marginBottom: '12px' }}>
              <span className="inline-block w-1.5 h-1.5 rounded-full mr-2 align-middle" style={{ backgroundColor: '#E4572E' }} />
              Verified Credentials
            </p>
            <div className="flex items-end justify-between gap-4 flex-wrap">
              <h2 style={{ ...DISPLAY, fontSize: 'clamp(1.8rem, 3.5vw, 3rem)', fontWeight: 400, color: 'var(--foreground)', lineHeight: 1.1 }}>
                Certifications
              </h2>
              <span style={{ ...MONO, fontSize: '9px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--foreground-muted)', opacity: 0.7 }}>
                {CERTS.length} active credentials
              </span>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {CERTS.map((cert, idx) => (
              <motion.div
                key={cert.code}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.07 }}
                className="group border overflow-hidden"
                style={{
                  borderColor: 'var(--card-border)',
                  backgroundColor: 'var(--card)',
                  borderTop: `2px solid ${cert.accent}`,
                  transition: 'box-shadow 0.3s ease, transform 0.3s ease',
                }}
              >
                {/* Badge + meta row */}
                <div
                  className="flex items-center gap-4 p-5"
                  style={{ borderBottom: '1px solid var(--card-border)' }}
                >
                  {/* Badge / icon */}
                  <div
                    className="relative shrink-0 overflow-hidden"
                    style={{ width: '68px', height: '68px', border: '1px solid var(--card-border)', backgroundColor: 'var(--background-alt)' }}
                  >
                    {cert.badge ? (
                      <Image
                        src={cert.badge}
                        alt={cert.name}
                        fill
                        className="object-contain p-2"
                        sizes="68px"
                        quality={80}
                      />
                    ) : (
                      <div
                        className="absolute inset-0 flex flex-col items-center justify-center gap-0.5"
                        style={{ backgroundColor: cert.accent + '12' }}
                      >
                        <span style={{ ...MONO, fontSize: '9px', fontWeight: 700, color: cert.accent, letterSpacing: '0.05em' }}>
                          {cert.issuer.slice(0, 2).toUpperCase()}
                        </span>
                        <span style={{ ...MONO, fontSize: '7px', color: cert.accent, opacity: 0.7, letterSpacing: '0.05em' }}>
                          {cert.code}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p style={{ ...MONO, fontSize: '8px', letterSpacing: '0.14em', textTransform: 'uppercase', color: cert.accent, marginBottom: '5px' }}>
                      {cert.issuer} · {cert.code}
                    </p>
                    <p style={{ ...DISPLAY, fontSize: '1rem', fontWeight: 400, color: 'var(--foreground)', lineHeight: 1.3 }} className="line-clamp-2">
                      {cert.name}
                    </p>
                  </div>
                </div>

                {/* Footer: validity + link */}
                <div className="flex items-center justify-between px-5 py-3">
                  <span style={{ ...MONO, fontSize: '9px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--foreground-muted)' }}>
                    Valid: {cert.validity}
                  </span>
                  {cert.pdf ? (
                    <a
                      href={cert.pdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/link inline-flex items-center gap-1 transition-all"
                      style={{ ...MONO, fontSize: '8px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#E4572E' }}
                    >
                      View
                      <svg className="w-2.5 h-2.5 transition-transform group-hover/link:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  ) : (
                    <span style={{ ...MONO, fontSize: '8px', color: 'var(--foreground-muted)', opacity: 0.4 }}>—</span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Skills Grid ─────────────────────────────────── */}
      <section className="section-padding bg-background-alt relative">
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(to right, transparent, var(--border), transparent)' }} />
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p style={{ ...MONO, fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#E4572E', marginBottom: '12px' }}>
              <span className="inline-block w-1.5 h-1.5 rounded-full mr-2 align-middle" style={{ backgroundColor: '#E4572E' }} />
              Core Competencies
            </p>
            <h2 style={{ ...DISPLAY, fontSize: 'clamp(1.8rem, 3.5vw, 3rem)', fontWeight: 400, color: 'var(--foreground)', lineHeight: 1.1 }}>
              Technical Expertise
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: 'Data Engineering', detail: 'ETL · PySpark · Databricks · Snowflake · Medallion Architecture', accent: '#14b8a6' },
              { title: 'Generative AI', detail: 'LLMs · RAG · TruLens · Cortex AI · Prompt Engineering', accent: '#E4572E' },
              { title: 'ML & Forecasting', detail: 'DeepAR · Prophet · MLflow · MLOps · Time Series', accent: '#8b5cf6' },
              { title: 'Cloud & DevOps', detail: 'Azure · Airflow · CI/CD · GitHub Actions · Docker', accent: '#0078d4' },
            ].map((skill, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                className="border overflow-hidden group"
                style={{ borderColor: 'var(--card-border)', borderTop: `2px solid ${skill.accent}`, backgroundColor: 'var(--card)' }}
              >
                <div className="p-6">
                  <h3 style={{ ...DISPLAY, fontSize: '1.15rem', fontWeight: 400, color: 'var(--foreground)', marginBottom: '10px' }}>
                    {skill.title}
                  </h3>
                  <p style={{ ...MONO, fontSize: '9px', letterSpacing: '0.08em', color: 'var(--foreground-muted)', lineHeight: 1.8 }}>
                    {skill.detail}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────── */}
      <section className="section-padding" style={{ background: 'linear-gradient(to bottom right, var(--cta-bg-from), var(--cta-bg-to))' }}>
        <div className="max-w-4xl mx-auto text-center">
          <p style={{ ...MONO, fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#E4572E', marginBottom: '16px' }}>
            Open to Opportunities
          </p>
          <h2 style={{ ...DISPLAY, fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 400, color: '#F4F1EA', lineHeight: 1.1, marginBottom: '16px' }}>
            Ready to Collaborate?
          </h2>
          <p style={{ ...MONO, fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(244,241,234,0.6)', marginBottom: '40px' }}>
            Open for Tech Lead roles in Data Engineering & AI Infrastructure
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/contact" variant="secondary" size="lg">Get in Touch</Button>
            <Button href="https://www.linkedin.com/in/pavitra-mandal-b0b0571a0/" external variant="outline" size="lg" className="border-white/30 text-white hover:bg-white hover:text-black">
              Connect on LinkedIn
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
