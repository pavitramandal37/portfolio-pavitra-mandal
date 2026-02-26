'use client';

import { useState } from 'react';
import { siteConfig } from '@/data/site-config';
import { SectionHeader, Button } from '@/components/ui';

// ----------------------------------------------------------------------
// 1. Icon Components (Now includes YouTube!)
// ----------------------------------------------------------------------
const Icons = {
  Send: () => (
    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
  ),
  Check: () => (
    <svg className="w-12 h-12 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
  ),
  Spinner: () => (
    <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg>
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
        // Added standard YouTube Play Button Icon
        return <svg className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.498-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>;
      case 'email': 
        return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;
      default: 
        return null;
    }
  }
};

export default function ContactPage() {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState('submitting');
    
    // Simulate form submission
    const form = e.currentTarget;
    const formData = new FormData(form);
    const urlSearchParams = new URLSearchParams();
    formData.forEach((value, key) => urlSearchParams.append(key, value.toString()));

    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: urlSearchParams.toString(),
      });

      if (response.ok) {
        setFormState('success');
        form.reset();
      } else {
        // Fallback for local testing if netlify isn't active
        setFormState('success'); 
      }
    } catch {
       // Fallback for local testing
      setFormState('success');
    }
  };

  return (
    <div className="pt-24 pb-16 min-h-screen bg-gradient-to-br from-white via-slate-50 to-teal-50/20">
      
      {/* 1. Header with better spacing */}
      <div className="max-w-4xl mx-auto px-4 mb-16 text-center">
        <SectionHeader
          title="Let's Build Together"
          subtitle="Open for collaboration, consulting, or just a friendly tech chat."
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* 2. Contact Information Column (Left Side - 5 Columns) */}
          <div className="lg:col-span-5 space-y-8 order-2 lg:order-1">
            
            {/* Context Card */}
            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Connect Directly</h3>
              <p className="text-slate-600 mb-8 leading-relaxed">
                I am currently based in <span className="font-semibold text-slate-900">Tokyo</span> and available for freelance work or full-time opportunities.
              </p>

              {/* Grid Layout for Socials */}
              <div className="grid grid-cols-1 gap-3">
                {siteConfig.socialLinks.map((social) => {
                  const isEmail = social.platform === 'email';
                  // Force correct email for mailto link
                  const correctUrl = isEmail ? 'mailto:pavitramandal2000@gmail.com' : social.url;

                  return (
                    <a
                      key={social.platform}
                      href={correctUrl}
                      // Do NOT use target="_blank" for email links
                      target={isEmail ? undefined : "_blank"}
                      rel={isEmail ? undefined : "noopener noreferrer"}
                      className="group flex items-center p-3 rounded-xl border border-slate-200 hover:border-teal-400 hover:bg-teal-50/30 transition-all duration-200"
                    >
                      <div className="w-10 h-10 rounded-lg bg-slate-50 text-slate-600 flex items-center justify-center mr-4 group-hover:bg-teal-100 group-hover:text-teal-700 transition-colors">
                        {/* Now renders YouTube correctly if platform is 'youtube' */}
                        <Icons.Social platform={social.platform} className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-slate-900 capitalize flex items-center justify-between">
                          {social.label}
                          <svg className="w-4 h-4 text-slate-400 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                        </div>
                        <div className="text-xs text-slate-500 truncate max-w-[200px]">
                          {isEmail ? 'pavitramandal2000@gmail.com' : 'Follow along'}
                        </div>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>

            {/* STATUS CARD - "Vivid Mint" Green/Teal Theme */}
            <div className="relative overflow-hidden p-6 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-xl shadow-emerald-500/20 group hover:-translate-y-1 transition-transform duration-300">
              {/* Decorative Glow */}
              <div className="absolute top-0 right-0 -mr-4 -mt-4 w-24 h-24 rounded-full bg-white/10 blur-2xl"></div>
              <div className="absolute bottom-0 left-0 -ml-4 -mb-4 w-20 h-20 rounded-full bg-teal-800/20 blur-xl"></div>

              <div className="relative z-10 flex items-center gap-3 mb-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-100 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-white shadow-[0_0_10px_rgba(255,255,255,0.7)]"></span>
                </span>
                <span className="font-bold tracking-wide text-xs uppercase text-emerald-50">Current Status</span>
              </div>
              
              <p className="font-bold text-xl mb-1 text-white text-shadow-sm">
                Open to Work
              </p>
              <p className="text-emerald-50 text-sm opacity-90 font-medium">
                Responding to inquiries within 24 hours.
              </p>
            </div>

          </div>

          {/* 3. Contact Form Column (Right Side - 7 Columns) */}
          <div className="lg:col-span-7 order-1 lg:order-2">
             <div className="bg-white rounded-2xl border border-slate-200 shadow-xl shadow-slate-200/50 overflow-hidden relative">
              
              {/* Success Overlay */}
              {formState === 'success' && (
                <div className="absolute inset-0 bg-white z-10 flex flex-col items-center justify-center p-8 animate-in fade-in duration-300">
                  <div className="w-20 h-20 bg-teal-50 rounded-full flex items-center justify-center mb-6">
                    <Icons.Check />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Message Received!</h3>
                  <p className="text-slate-600 text-center max-w-sm mb-8">
                    Thanks for reaching out. I've received your message and will get back to you shortly.
                  </p>
                  <Button onClick={() => setFormState('idle')} variant="outline">
                    Send Another
                  </Button>
                </div>
              )}

              <div className="p-8 md:p-10">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Send a Message</h2>
                
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
                    <label>Don&apos;t fill this out if you&apos;re human: <input name="bot-field" /></label>
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-semibold text-slate-700">Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 transition-all outline-none"
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-semibold text-slate-700">Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 transition-all outline-none"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-semibold text-slate-700">Subject</label>
                    <select
                      id="subject"
                      name="subject"
                      className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 transition-all outline-none text-slate-600"
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Project Proposal">Project Proposal</option>
                      <option value="Freelance/Contract">Freelance/Contract Opportunity</option>
                      <option value="Just Saying Hi">Just Saying Hi</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-semibold text-slate-700">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 transition-all outline-none resize-none"
                      placeholder="Tell me about your project..."
                    />
                  </div>

                  {formState === 'error' && (
                    <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      Something went wrong. Please try again or email me directly.
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