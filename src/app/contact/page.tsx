'use client';

import { useState } from 'react';
import { siteConfig } from '@/data/site-config';
import { SectionHeader, Button } from '@/components/ui';

export default function ContactPage() {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState('submitting');

    const form = e.currentTarget;
    const formData = new FormData(form);

    // Convert FormData to URLSearchParams for Netlify Forms
    const urlSearchParams = new URLSearchParams();
    formData.forEach((value, key) => {
      urlSearchParams.append(key, value.toString());
    });

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
        setFormState('error');
      }
    } catch {
      setFormState('error');
    }
  };

  return (
    <div className="pt-20">
      {/* Header */}
      <section className="section-padding bg-gradient-to-br from-navy-50 to-teal-50/30">
        <div className="max-w-4xl mx-auto">
          <SectionHeader
            title="Get in Touch"
            subtitle="Have a question, project idea, or just want to connect? I'd love to hear from you."
          />
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-padding">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-xl border border-card-border p-6 md:p-8">
              <h2 className="text-2xl font-bold text-navy-900 mb-6">Send a Message</h2>

              {formState === 'success' ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-teal-100 flex items-center justify-center">
                    <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-navy-900 mb-2">Message Sent!</h3>
                  <p className="text-navy-600 mb-6">
                    Thank you for reaching out. I&apos;ll get back to you as soon as possible.
                  </p>
                  <Button onClick={() => setFormState('idle')} variant="outline">
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form
                  name="contact"
                  method="POST"
                  data-netlify="true"
                  netlify-honeypot="bot-field"
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  {/* Netlify Forms hidden input */}
                  <input type="hidden" name="form-name" value="contact" />

                  {/* Honeypot field for spam protection */}
                  <p className="hidden">
                    <label>
                      Don&apos;t fill this out if you&apos;re human:
                      <input name="bot-field" />
                    </label>
                  </p>

                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-navy-700 mb-2">
                      Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-navy-200 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                      placeholder="Your name"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-navy-700 mb-2">
                      Email <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-navy-200 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                      placeholder="your@email.com"
                    />
                  </div>

                  {/* Subject */}
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-navy-700 mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      className="w-full px-4 py-3 rounded-lg border border-navy-200 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                      placeholder="What's this about?"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-navy-700 mb-2">
                      Message <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      className="w-full px-4 py-3 rounded-lg border border-navy-200 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all resize-none"
                      placeholder="Your message..."
                    />
                  </div>

                  {/* Error Message */}
                  {formState === 'error' && (
                    <div className="p-4 rounded-lg bg-rose-50 text-rose-700 text-sm">
                      Something went wrong. Please try again or reach out via email.
                    </div>
                  )}

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={formState === 'submitting'}
                    className="w-full"
                    size="lg"
                  >
                    {formState === 'submitting' ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              {/* Connect Section */}
              <div>
                <h2 className="text-2xl font-bold text-navy-900 mb-6">Let&apos;s Connect</h2>
                <p className="text-navy-600 mb-8 leading-relaxed">
                  Whether you&apos;re looking for a collaborator on an ML project, need help with data engineering,
                  or just want to chat about technology — I&apos;m always happy to connect.
                </p>

                {/* Social Links */}
                <div className="space-y-4">
                  {siteConfig.socialLinks
                    .filter((s) => s.platform !== 'email')
                    .map((social) => (
                      <a
                        key={social.platform}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center p-4 bg-white rounded-lg border border-card-border hover:border-teal-300 transition-all group"
                      >
                        <div className="w-10 h-10 rounded-lg bg-navy-50 flex items-center justify-center mr-4 group-hover:bg-teal-50 transition-colors">
                          <SocialIcon platform={social.platform} />
                        </div>
                        <div>
                          <p className="font-medium text-navy-900">{social.label}</p>
                          <p className="text-sm text-navy-500">{getDisplayUrl(social.url)}</p>
                        </div>
                        <svg className="w-5 h-5 ml-auto text-navy-400 group-hover:text-teal-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    ))}

                  {/* Email Link */}
                  <a
                    href={siteConfig.socialLinks.find((s) => s.platform === 'email')?.url || '#'}
                    className="flex items-center p-4 bg-white rounded-lg border border-card-border hover:border-teal-300 transition-all group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-navy-50 flex items-center justify-center mr-4 group-hover:bg-teal-50 transition-colors">
                      <svg className="w-5 h-5 text-navy-600 group-hover:text-teal-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-navy-900">Email</p>
                      <p className="text-sm text-navy-500">
                        {siteConfig.socialLinks.find((s) => s.platform === 'email')?.url.replace('mailto:', '') || '[PLACEHOLDER_EMAIL]'}
                      </p>
                    </div>
                  </a>
                </div>
              </div>

              {/* Availability */}
              <div className="bg-teal-50 rounded-xl p-6">
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-lg bg-teal-100 flex items-center justify-center mr-4 flex-shrink-0">
                    <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-navy-900 mb-1">Current Availability</h3>
                    <p className="text-navy-600 text-sm">
                      Open to discussing new opportunities and interesting projects.
                      Response time is typically within 24-48 hours.
                    </p>
                  </div>
                </div>
              </div>

              {/* Calendly Placeholder */}
              <div className="bg-white rounded-xl border border-card-border p-6">
                <h3 className="font-semibold text-navy-900 mb-2">Schedule a Call</h3>
                <p className="text-navy-600 text-sm mb-4">
                  Prefer a video call? Book a time that works for you.
                </p>
                {/* [PLACEHOLDER_CALENDLY] - Uncomment and add your Calendly link */}
                <button
                  disabled
                  className="w-full px-5 py-2.5 text-base font-medium rounded-lg border-2 border-navy-300 text-navy-400 cursor-not-allowed opacity-60"
                >
                  Coming Soon
                </button>
                {/*
                <Button
                  href="https://calendly.com/your-username"
                  external
                  variant="secondary"
                  className="w-full"
                >
                  Book a Meeting
                </Button>
                */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// Helper function to display URLs nicely
function getDisplayUrl(url: string): string {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname + urlObj.pathname;
  } catch {
    return url;
  }
}

// Social Icon component
function SocialIcon({ platform }: { platform: string }) {
  const iconClass = 'w-5 h-5 text-navy-600 group-hover:text-teal-600 transition-colors';

  switch (platform) {
    case 'linkedin':
      return (
        <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      );
    case 'github':
      return (
        <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
      );
    case 'instagram':
      return (
        <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      );
    default:
      return null;
  }
}
