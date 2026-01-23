import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getAllExperiences } from '@/data/experience';
import { getProjectsByCompany } from '@/data/projects';
import { SectionHeader, Tag, Button } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Experience',
  description: 'My professional journey as an ML Engineer and Data Engineer at Sony, Cisco, and Tech Mahindra.',
};

export default function ExperiencePage() {
  const experiences = getAllExperiences();

  return (
    <div className="pt-20">
      {/* Header */}
      <section className="section-padding bg-gradient-to-br from-navy-50 to-teal-50/30">
        <div className="max-w-4xl mx-auto">
          <SectionHeader
            title="Professional Experience"
            subtitle="My journey building ML systems, data pipelines, and intelligent automation solutions across leading tech companies"
          />
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-0 md:left-1/2 transform md:-translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-teal-500 via-navy-300 to-navy-200" />

            {/* Experience Items */}
            <div className="space-y-12">
              {experiences.map((experience, index) => {
                const relatedProjects = experience.relatedProjects
                  ? getProjectsByCompany(experience.company as 'Sony' | 'Cisco' | 'Tech Mahindra')
                  : [];
                const isEven = index % 2 === 0;

                return (
                  <div
                    key={experience.id}
                    className={`relative flex flex-col md:flex-row items-start ${
                      isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                    }`}
                  >
                    {/* Timeline Dot */}
                    <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-teal-500 border-4 border-white shadow-md z-10" />

                    {/* Date Badge - Mobile */}
                    <div className="md:hidden ml-8 mb-4">
                      <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-teal-100 text-teal-700">
                        {experience.startDate} — {experience.endDate}
                      </span>
                    </div>

                    {/* Content Card */}
                    <div
                      className={`ml-8 md:ml-0 md:w-[calc(50%-2rem)] ${
                        isEven ? 'md:pr-8' : 'md:pl-8'
                      }`}
                    >
                      <div className="bg-white rounded-xl border border-card-border p-6 card-hover">
                        {/* Date Badge - Desktop */}
                        <div className="hidden md:block mb-4">
                          <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-teal-100 text-teal-700">
                            {experience.startDate} — {experience.endDate}
                          </span>
                        </div>

                        {/* Company Logo & Name */}
                        <div className="flex items-center gap-4 mb-4">
                          <div className="relative w-12 h-12 rounded-lg bg-navy-50 flex items-center justify-center overflow-hidden">
                            {experience.companyLogo ? (
                              <Image
                                src={experience.companyLogo}
                                alt={experience.company}
                                fill
                                className="object-contain p-2"
                              />
                            ) : (
                              <span className="text-xl font-bold text-navy-600">
                                {experience.company.charAt(0)}
                              </span>
                            )}
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-navy-900">
                              {experience.company}
                            </h3>
                            <p className="text-teal-600 font-medium">{experience.role}</p>
                          </div>
                        </div>

                        {/* Location */}
                        <div className="flex items-center text-navy-500 text-sm mb-4">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {experience.location}
                        </div>

                        {/* Description */}
                        <p className="text-navy-600 mb-4 leading-relaxed">
                          {experience.description}
                        </p>

                        {/* Highlights */}
                        <div className="mb-4">
                          <h4 className="text-sm font-semibold text-navy-700 mb-2">
                            Key Achievements
                          </h4>
                          <ul className="space-y-2">
                            {experience.highlights.slice(0, 4).map((highlight, hIndex) => (
                              <li
                                key={hIndex}
                                className="flex items-start text-sm text-navy-600"
                              >
                                <svg className="w-4 h-4 text-teal-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                {highlight}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Technologies */}
                        <div className="mb-4">
                          <h4 className="text-sm font-semibold text-navy-700 mb-2">
                            Technologies
                          </h4>
                          <div className="flex flex-wrap gap-1.5">
                            {experience.technologies.slice(0, 6).map((tech) => (
                              <Tag key={tech} size="sm">
                                {tech}
                              </Tag>
                            ))}
                            {experience.technologies.length > 6 && (
                              <Tag size="sm" variant="teal">
                                +{experience.technologies.length - 6}
                              </Tag>
                            )}
                          </div>
                        </div>

                        {/* Related Projects Link */}
                        {relatedProjects.length > 0 && (
                          <div className="pt-4 border-t border-navy-100">
                            <Link
                              href={`/projects?company=${experience.company}`}
                              className="inline-flex items-center text-sm text-teal-600 hover:text-teal-700 font-medium"
                            >
                              View {relatedProjects.length} related project{relatedProjects.length > 1 ? 's' : ''}
                              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                              </svg>
                            </Link>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Empty space for alternating layout */}
                    <div className="hidden md:block md:w-[calc(50%-2rem)]" />
                  </div>
                );
              })}
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
