'use client';

import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { siteConfig } from '@/data/site-config';
import { SectionHeader, Button, PageHero } from '@/components/ui';
import pageImages from '@/data/pageImages';

// ----------------------------------------------------------------------
// 1. Icon Components
// ----------------------------------------------------------------------
const Icons = {
  Send: () => (
    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
  ),
  Check: () => (
    <svg className="w-12 h-12 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
  ),
  Spinner: () => (
    <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg>
  ),
  Briefcase: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
  ),
  Social: ({ platform, className }: { platform: string, className?: string }) => {
    switch (platform.toLowerCase()) {
      case 'linkedin':
        return <svg className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>;
      case 'github':
        return <svg className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>;
      case 'instagram':
        return <svg className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>;
      case 'youtube':
        return <svg className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.498-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>;
      case 'email':
        return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;
      default:
        return null;
    }
  }
};

const inputClass = "w-full px-4 py-3 rounded-lg bg-muted border border-card-border text-foreground focus:bg-background focus:border-secondary focus:ring-4 focus:ring-secondary/10 transition-all outline-none placeholder:text-muted-foreground";

const SUBJECTS = [
  'Job Opportunity',
  'General Inquiry',
] as const;

type Subject = typeof SUBJECTS[number];

const DEFAULT_SUBJECT: Subject = 'Job Opportunity';

const TEMPLATE_IDS: Record<Subject, string | undefined> = {
  'Job Opportunity': process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_JOB,
  'General Inquiry': process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_GENERAL,
};

const DAILY_LIMIT = 5;
const RATE_WINDOW_MS = 24 * 60 * 60 * 1000;

const rateLimitKey = (email: string) => `contact_submissions_${email.toLowerCase().trim()}`;

const getRecentSubmissions = (email: string): number[] => {
  if (typeof window === 'undefined' || !email) return [];
  try {
    const raw = localStorage.getItem(rateLimitKey(email));
    if (!raw) return [];
    const data: unknown = JSON.parse(raw);
    if (!Array.isArray(data)) return [];
    const now = Date.now();
    return data.filter((t): t is number => typeof t === 'number' && now - t < RATE_WINDOW_MS);
  } catch {
    return [];
  }
};

const recordSubmission = (email: string) => {
  if (typeof window === 'undefined' || !email) return;
  const recent = getRecentSubmissions(email);
  recent.push(Date.now());
  localStorage.setItem(rateLimitKey(email), JSON.stringify(recent));
};

const formatHoursUntilReset = (oldestTimestamp: number): string => {
  const msLeft = RATE_WINDOW_MS - (Date.now() - oldestTimestamp);
  const hours = Math.ceil(msLeft / (60 * 60 * 1000));
  return hours <= 1 ? 'in about an hour' : `in about ${hours} hours`;
};

export default function ContactPage() {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [selectedSubject, setSelectedSubject] = useState<Subject>(DEFAULT_SUBJECT);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage('');
    const form = e.currentTarget;
    const emailValue = (form.elements.namedItem('email') as HTMLInputElement | null)?.value ?? '';

    const recent = getRecentSubmissions(emailValue);
    if (recent.length >= DAILY_LIMIT) {
      const oldest = Math.min(...recent);
      setFormState('error');
      setErrorMessage(
        `You've reached the daily limit of ${DAILY_LIMIT} messages from this email. You can send again ${formatHoursUntilReset(oldest)}.`
      );
      return;
    }

    const templateId = TEMPLATE_IDS[selectedSubject];
    if (!templateId) {
      setFormState('error');
      setErrorMessage('Email service is not configured. Please email me directly at pavitramandal2000@gmail.com');
      return;
    }

    setFormState('submitting');

    try {
      const result = await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        templateId,
        form,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );
      console.log('EmailJS success:', result);
      recordSubmission(emailValue);
      setFormState('success');
      form.reset();
      setSelectedSubject(DEFAULT_SUBJECT);
    } catch (err) {
      const e = err as { status?: number; text?: string };
      console.error('EmailJS error — status:', e?.status, '| text:', e?.text);
      setFormState('error');
      setErrorMessage('Something went wrong. Please try again or email me directly at pavitramandal2000@gmail.com');
    }
  };

  return (
    <div className="pb-16 min-h-screen bg-background">

      <PageHero
        title="Let's Build"
        titleItalic="Together"
        category="Contact"
        subtitle="Open for collaboration, consulting, or just a friendly tech chat."
        imageSrc={pageImages.contact}
        imageAlt="Contact"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

          {/* 2. Contact Information Column */}
          <div className="lg:col-span-5 space-y-8 order-2 lg:order-1">

            {/* Context Card */}
            <div className="bg-card p-8 rounded-2xl border border-card-border shadow-sm">
              <h3 className="text-xl font-bold text-foreground mb-4">Connect Directly</h3>
              <p className="text-foreground-muted mb-8 leading-relaxed">
                I am currently based in <span className="font-semibold text-foreground">Tokyo</span> and available for freelance work or full-time opportunities.
              </p>

              {/* Grid Layout for Socials */}
              <div className="grid grid-cols-1 gap-3">
                {siteConfig.socialLinks.map((social) => {
                  const isEmail = social.platform === 'email';
                  const correctUrl = isEmail ? 'mailto:pavitramandal37@gmail.com' : social.url;

                  return (
                    <a
                      key={social.platform}
                      href={correctUrl}
                      target={isEmail ? undefined : "_blank"}
                      rel={isEmail ? undefined : "noopener noreferrer"}
                      className="group flex items-center p-3 rounded-xl border border-card-border hover:border-secondary/50 hover:bg-secondary/5 transition-all duration-200"
                    >
                      <div className="w-10 h-10 rounded-lg bg-muted text-foreground-muted flex items-center justify-center mr-4 group-hover:bg-secondary/10 group-hover:text-secondary transition-colors">
                        <Icons.Social platform={social.platform} className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-foreground capitalize flex items-center justify-between">
                          {social.label}
                          <svg className="w-4 h-4 text-muted-foreground opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                        </div>
                        <div className="text-xs text-muted-foreground truncate max-w-[200px]">
                          {isEmail ? 'pavitramandal37@gmail.com' : 'Follow along'}
                        </div>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>

            {/* STATUS CARD */}
            <div className="relative overflow-hidden p-6 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-xl shadow-emerald-500/20 group hover:-translate-y-1 transition-transform duration-300">
              <div className="absolute top-0 right-0 -mr-4 -mt-4 w-24 h-24 rounded-full bg-white/10 blur-2xl"></div>
              <div className="absolute bottom-0 left-0 -ml-4 -mb-4 w-20 h-20 rounded-full bg-teal-800/20 blur-xl"></div>

              <div className="relative z-10 flex items-center gap-3 mb-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-100 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-white shadow-[0_0_10px_rgba(255,255,255,0.7)]"></span>
                </span>
                <span className="font-bold tracking-wide text-xs uppercase text-emerald-50">Current Status</span>
              </div>

              <p className="font-bold text-xl mb-1 text-white">
                Open to Work
              </p>
              <p className="text-emerald-50 text-sm opacity-90 font-medium">
                Responding to inquiries within 24 hours.
              </p>
            </div>

            {/* RESUME DOWNLOAD */}
            <a
              href="/resume/Pavitra Mandal.pdf"
              download="Pavitra_Mandal_Resume.pdf"
              className="group flex items-center gap-4 p-5 rounded-2xl border border-card-border bg-card hover:border-secondary/50 hover:shadow-md transition-all duration-200"
            >
              <div className="w-11 h-11 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center shrink-0 group-hover:bg-secondary/20 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-foreground group-hover:text-secondary transition-colors">Download Resume</p>
                <p className="text-xs text-foreground-muted mt-0.5">PDF · Latest version</p>
              </div>
              <svg className="w-4 h-4 text-muted-foreground opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>

          </div>

          {/* 3. Contact Form Column */}
          <div className="lg:col-span-7 order-1 lg:order-2">
             <div className="bg-card rounded-2xl border border-card-border shadow-xl overflow-hidden relative">

              {/* Success Overlay */}
              {formState === 'success' && (
                <div className="absolute inset-0 bg-card z-10 flex flex-col items-center justify-center p-8 animate-in fade-in duration-300">
                  <div className="w-20 h-20 bg-secondary/10 rounded-full flex items-center justify-center mb-6">
                    <Icons.Check />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">Message Received!</h3>
                  <p className="text-foreground-muted text-center max-w-sm mb-8">
                    Thanks for reaching out. I&apos;ve received your message and will get back to you shortly.
                  </p>
                  <Button onClick={() => setFormState('idle')} variant="outline">
                    Send Another
                  </Button>
                </div>
              )}

              <div className="p-8 md:p-10">
                <h2 className="text-2xl font-bold text-foreground mb-6">Send a Message</h2>

                <form
                  name="contact"
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-semibold text-foreground-muted">Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        className={inputClass}
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-semibold text-foreground-muted">Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className={inputClass}
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-semibold text-foreground-muted">Subject</label>
                    <select
                      id="subject"
                      name="subject"
                      value={selectedSubject}
                      onChange={(e) => setSelectedSubject(e.target.value as Subject)}
                      className={inputClass}
                    >
                      {SUBJECTS.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>

                  {/* Recruiter fields — visible only for Job Opportunity */}
                  {selectedSubject === 'Job Opportunity' && (
                    <div className="space-y-5 p-5 rounded-xl bg-secondary/5 border border-secondary/20">
                      <div className="flex items-center gap-2 mb-1">
                        <Icons.Briefcase />
                        <p className="text-sm font-semibold text-secondary">Recruiter Details</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="space-y-2">
                          <label htmlFor="company" className="text-sm font-semibold text-foreground-muted">Company Name</label>
                          <input
                            type="text"
                            id="company"
                            name="company"
                            required
                            className={inputClass}
                            placeholder="Acme Corp"
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="role" className="text-sm font-semibold text-foreground-muted">Role / Position</label>
                          <input
                            type="text"
                            id="role"
                            name="role"
                            required
                            className={inputClass}
                            placeholder="Frontend Engineer"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="job_type" className="text-sm font-semibold text-foreground-muted">Employment Type</label>
                        <select
                          id="job_type"
                          name="job_type"
                          className={inputClass}
                        >
                          <option value="Full-time">Full-time</option>
                          <option value="Part-time">Part-time</option>
                          <option value="Contract">Contract</option>
                          <option value="Remote">Remote</option>
                          <option value="Hybrid">Hybrid</option>
                        </select>
                      </div>

                      <label className="flex items-start gap-3 cursor-pointer group">
                        <input
                          type="checkbox"
                          name="wants_resume"
                          value="Yes"
                          className="mt-0.5 w-4 h-4 rounded border-card-border accent-secondary cursor-pointer"
                        />
                        <span className="text-sm text-foreground-muted group-hover:text-foreground transition-colors">
                          Please share your updated resume in your reply
                        </span>
                      </label>
                    </div>
                  )}

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-semibold text-foreground-muted">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      className={`${inputClass} resize-none`}
                      placeholder={
                        selectedSubject === 'Job Opportunity'
                          ? 'Tell me about the role, team, and what you\'re looking for...'
                          : 'Project pitch, freelance brief, or just say hi — share whatever you\'d like to discuss...'
                      }
                    />
                  </div>

                  {formState === 'error' && (
                    <div className="p-3 bg-red-500/10 text-red-400 text-sm rounded-lg flex items-start">
                      <svg className="w-4 h-4 mr-2 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      <span>{errorMessage || 'Something went wrong. Please try again or email me directly at pavitramandal2000@gmail.com'}</span>
                    </div>
                  )}

                  <div className="pt-2">
                    <Button
                      type="submit"
                      disabled={formState === 'submitting'}
                      className="w-full md:w-auto px-8"
                      size="lg"
                    >
                      {formState === 'submitting' ? (
                        <span className="flex items-center">
                          <Icons.Spinner /> Sending...
                        </span>
                      ) : (
                        <span className="flex items-center">
                          Send Message <Icons.Send />
                        </span>
                      )}
                    </Button>
                  </div>

                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
