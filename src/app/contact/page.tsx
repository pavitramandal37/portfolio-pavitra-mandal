'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { siteConfig } from '@/data/site-config';
import { Button } from '@/components/ui';

const Icons = {
  Send: () => (
    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
  ),
  Check: () => (
    <svg className="w-12 h-12 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
  ),
  Spinner: () => (
    <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg>
  ),
  Download: () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
  ),
  Social: ({ platform, className }: { platform: string; className?: string }) => {
    switch (platform.toLowerCase()) {
      case 'linkedin':
        return <svg className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>;
      case 'github':
        return <svg className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>;
      case 'instagram':
        return <svg className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>;
      case 'youtube':
        return <svg className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.498-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>;
      case 'tableau':
        return <svg className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M11.654.174V2.377H9.682v.58h1.972V5.16h.696V2.957h1.97v-.58h-1.97V.174h-.696zm6.03 2.262l-.002 1.623-1.452-.003v.493H17.683v1.625h.58V4.55h1.45v-.494h-1.45V2.435h-.58zM5.654 2.34v1.62H4.202v.495H5.654v1.62h.58v-1.62h1.45v-.495h-1.45V2.34h-.58zm11.78 3.164v2.203h-1.97v.58h1.97v2.203h.697V8.287h1.97v-.58h-1.97V5.504h-.697zM5.414 5.42v2.204H3.443v.58h1.97v2.204h.697V8.204h1.97v-.58h-1.97V5.42h-.697zm6.24.078v2.2H9.683v.58h1.972v2.2h.696v-2.2h1.97v-.58h-1.97V5.5h-.696zm-6.228 5.59v1.62H4.202v.495h1.224v1.62h.58v-1.62h1.45v-.495h-1.45v-1.62h-.58zm11.78.003v1.62h-1.452v.494h1.452v1.622h.58v-1.622h1.45v-.494h-1.45v-1.62h-.58zm-5.8 2.842v2.204H9.437v.58h1.97v2.203h.696v-2.203h1.97v-.58h-1.97v-2.204h-.696zm6.05 2.26v1.62h-1.452v.496h1.452v1.622h.58v-1.622h1.45v-.495h-1.45v-1.62h-.58zm-11.78.002v1.62H4.202v.495h1.224v1.62h.58v-1.62h1.45v-.495h-1.45v-1.62h-.58zm5.832 2.738v2.205H9.682v.58h1.972V24h.696v-2.303h1.97v-.58h-1.97v-2.205h-.696z" /></svg>;
      case 'email':
        return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;
      default:
        return null;
    }
  },
};

export default function ContactPage() {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState('submitting');

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('https://formsubmit.co/ajax/pavitramandal37@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setFormState('success');
        form.reset();
      } else {
        setFormState('error');
      }
    } catch {
      setFormState('error');
    }
  };

  return (
    <div className="min-h-screen bg-navy-950 pt-24 pb-16">
      {/* Header */}
      <div className="max-w-4xl mx-auto px-4 mb-16 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-400 mb-4"
        >
          Contact
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl sm:text-6xl font-bold text-white mb-4"
        >
          Let&apos;s Build Together
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-white/50"
        >
          Open for collaboration, consulting, or just a friendly tech chat.
        </motion.p>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-5 space-y-8 order-2 lg:order-1"
          >
            {/* Social Links */}
            <div className="p-8 rounded-2xl border border-white/10 bg-white/5">
              <h3 className="text-xl font-bold text-white mb-4">Connect Directly</h3>
              <p className="text-white/40 mb-8 leading-relaxed">
                Based in <span className="font-semibold text-white">Tokyo</span> — available for freelance or full-time opportunities.
              </p>
              <div className="grid grid-cols-1 gap-3">
                {siteConfig.socialLinks.map((social) => {
                  const isEmail = social.platform === 'email';
                  const correctUrl = isEmail ? 'mailto:pavitramandal37@gmail.com' : social.url;
                  return (
                    <a
                      key={social.platform}
                      href={correctUrl}
                      target={isEmail ? undefined : '_blank'}
                      rel={isEmail ? undefined : 'noopener noreferrer'}
                      className="group flex items-center p-3 rounded-xl border border-white/10 hover:border-teal-400/30 hover:bg-white/5 transition-all duration-300"
                    >
                      <div className="w-10 h-10 rounded-lg bg-white/5 text-white/40 flex items-center justify-center mr-4 group-hover:bg-teal-500/10 group-hover:text-teal-400 transition-colors">
                        <Icons.Social platform={social.platform} className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-white/80 capitalize flex items-center justify-between">
                          {social.label}
                          <svg className="w-4 h-4 text-white/20 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                        <div className="text-xs text-white/30 truncate max-w-[200px]">
                          {isEmail ? 'pavitramandal37@gmail.com' : 'Follow along'}
                        </div>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Status Card */}
            <div className="relative overflow-hidden p-6 rounded-2xl bg-gradient-to-br from-teal-600 to-teal-800 text-white group hover:-translate-y-1 transition-transform duration-300">
              <div className="absolute top-0 right-0 -mr-4 -mt-4 w-24 h-24 rounded-full bg-white/10 blur-2xl" />
              <div className="relative z-10 flex items-center gap-3 mb-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white/50 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-white" />
                </span>
                <span className="font-bold tracking-wide text-xs uppercase text-teal-100">Current Status</span>
              </div>
              <p className="font-bold text-xl mb-1">Open to Work</p>
              <p className="text-teal-100 text-sm opacity-90">Responding within 24 hours.</p>
            </div>

            {/* Resume Download */}
            <a
              href="/documents/Pavitra_Mandal_Resume.pdf"
              download="Pavitra_Mandal_Resume.pdf"
              className="flex items-center justify-between p-5 rounded-2xl border border-white/10 hover:border-teal-400/30 hover:bg-white/5 transition-all duration-300 group"
            >
              <div>
                <h3 className="text-lg font-bold text-white group-hover:text-teal-400 transition-colors">Download Resume</h3>
                <p className="text-sm text-white/30 mt-1">Get a copy of my CV in PDF format.</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-white/5 text-white/40 flex items-center justify-center group-hover:bg-teal-500/10 group-hover:text-teal-400 transition-colors">
                <Icons.Download />
              </div>
            </a>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-7 order-1 lg:order-2"
          >
            <div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden relative">
              {/* Success Overlay */}
              {formState === 'success' && (
                <div className="absolute inset-0 bg-navy-900 z-10 flex flex-col items-center justify-center p-8">
                  <div className="w-20 h-20 bg-teal-500/10 rounded-full flex items-center justify-center mb-6">
                    <Icons.Check />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Message Received!</h3>
                  <p className="text-white/50 text-center max-w-sm mb-8">
                    Thanks for reaching out. I&apos;ll get back to you shortly.
                  </p>
                  <Button onClick={() => setFormState('idle')} variant="ghost" className="border border-white/20 text-white hover:bg-white/10">
                    Send Another
                  </Button>
                </div>
              )}

              <div className="p-8 md:p-10">
                <h2 className="text-2xl font-bold text-white mb-6">Send a Message</h2>

                <form
                  name="contact"
                  method="POST"
                  data-netlify="true"
                  netlify-honeypot="bot-field"
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <input type="hidden" name="form-name" value="contact" />
                  <p className="hidden">
                    <label>Don&apos;t fill this out: <input name="bot-field" /></label>
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-semibold text-white/70">Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:bg-white/10 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all outline-none"
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-semibold text-white/70">Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:bg-white/10 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all outline-none"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-semibold text-white/70">Subject</label>
                    <select
                      id="subject"
                      name="subject"
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white/60 focus:bg-white/10 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all outline-none"
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Project Proposal">Project Proposal</option>
                      <option value="Freelance/Contract">Freelance/Contract Opportunity</option>
                      <option value="Just Saying Hi">Just Saying Hi</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-semibold text-white/70">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:bg-white/10 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all outline-none resize-none"
                      placeholder="Tell me about your project..."
                    />
                  </div>

                  {formState === 'error' && (
                    <div className="p-3 bg-rose-500/10 text-rose-400 text-sm rounded-lg border border-rose-500/20 flex items-center">
                      <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      Something went wrong. Please try again or email me directly.
                    </div>
                  )}

                  <div className="pt-2">
                    <Button
                      type="submit"
                      disabled={formState === 'submitting'}
                      variant="secondary"
                      className="w-full md:w-auto px-8"
                      size="lg"
                    >
                      {formState === 'submitting' ? (
                        <span className="flex items-center"><Icons.Spinner /> Sending...</span>
                      ) : (
                        <span className="flex items-center">Send Message <Icons.Send /></span>
                      )}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
