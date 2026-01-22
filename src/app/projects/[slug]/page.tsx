import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getAllProjects, getProjectBySlug, getRelatedProjects } from '@/data/projects';
import { Button, Tag } from '@/components/ui';
import { ProjectCard } from '@/components/sections';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      images: [project.thumbnail],
    },
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const relatedProjects = getRelatedProjects(project.id);

  // Get links
  const linkedInLink = project.links.find((l) => l.type === 'linkedin');
  const liveLink = project.links.find((l) => l.type === 'live');
  const githubLink = project.links.find((l) => l.type === 'github');
  const blogLink = project.links.find((l) => l.type === 'blog');

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-navy-900 to-navy-800 text-white py-16 md:py-24">
        <div className="absolute inset-0 overflow-hidden">
          {project.banner && (
            <Image
              src={project.banner}
              alt={project.title}
              fill
              className="object-cover opacity-20"
              priority
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/80 to-transparent" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-6">
            <ol className="flex items-center space-x-2 text-sm">
              <li>
                <Link href="/" className="text-navy-300 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li className="text-navy-400">/</li>
              <li>
                <Link href="/projects" className="text-navy-300 hover:text-white transition-colors">
                  Projects
                </Link>
              </li>
              <li className="text-navy-400">/</li>
              <li className="text-teal-400">{project.title}</li>
            </ol>
          </nav>

          {/* Category & Status */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            {project.company && (
              <span className="px-3 py-1 text-sm font-medium rounded-full bg-white/10 text-white">
                {project.company}
              </span>
            )}
            <span className="px-3 py-1 text-sm font-medium rounded-full bg-teal-500/20 text-teal-300">
              {project.category}
            </span>
            <span
              className={`px-3 py-1 text-sm font-medium rounded-full ${
                project.status === 'Live'
                  ? 'bg-green-500/20 text-green-300'
                  : project.status === 'In Development'
                  ? 'bg-yellow-500/20 text-yellow-300'
                  : 'bg-navy-500/20 text-navy-300'
              }`}
            >
              {project.status}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{project.title}</h1>

          {/* Description */}
          <p className="text-xl text-navy-200 mb-8 leading-relaxed">
            {project.longDescription || project.description}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4">
            {liveLink && !liveLink.url.startsWith('[PLACEHOLDER') && (
              <Button
                href={liveLink.url}
                external
                variant="secondary"
                size="lg"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Live Demo
              </Button>
            )}
            {githubLink && !githubLink.url.startsWith('[PLACEHOLDER') && (
              <Button
                href={githubLink.url}
                external
                variant="outline"
                size="lg"
                className="border-white/30 text-white hover:bg-white hover:text-navy-900"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                View Code
              </Button>
            )}
            {linkedInLink && !linkedInLink.url.startsWith('[PLACEHOLDER') && (
              <Button
                href={linkedInLink.url}
                external
                variant="ghost"
                size="lg"
                className="text-white hover:bg-white/10"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                LinkedIn Post
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Problem Statement */}
              {project.problemStatement && (
                <div>
                  <h2 className="text-2xl font-bold text-navy-900 mb-4 flex items-center">
                    <span className="w-8 h-8 rounded-lg bg-rose-100 text-rose-600 flex items-center justify-center mr-3">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </span>
                    Problem Statement
                  </h2>
                  <p className="text-navy-600 leading-relaxed">{project.problemStatement}</p>
                </div>
              )}

              {/* Approach */}
              {project.approach && (
                <div>
                  <h2 className="text-2xl font-bold text-navy-900 mb-4 flex items-center">
                    <span className="w-8 h-8 rounded-lg bg-teal-100 text-teal-600 flex items-center justify-center mr-3">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </span>
                    My Approach
                  </h2>
                  <p className="text-navy-600 leading-relaxed">{project.approach}</p>
                </div>
              )}

              {/* Outcomes */}
              {project.outcomes && project.outcomes.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-navy-900 mb-4 flex items-center">
                    <span className="w-8 h-8 rounded-lg bg-navy-100 text-navy-600 flex items-center justify-center mr-3">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </span>
                    Key Outcomes
                  </h2>
                  <ul className="space-y-3">
                    {project.outcomes.map((outcome, index) => (
                      <li key={index} className="flex items-start">
                        <svg className="w-5 h-5 text-teal-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-navy-600">{outcome}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Screenshots */}
              {project.screenshots && project.screenshots.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-navy-900 mb-4">Screenshots</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {project.screenshots.map((screenshot, index) => (
                      <div key={index} className="relative aspect-video rounded-lg overflow-hidden bg-navy-100">
                        <Image
                          src={screenshot}
                          alt={`${project.title} screenshot ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                        {/* Placeholder fallback */}
                        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-navy-200 to-navy-300 -z-10">
                          <span className="text-navy-400 text-sm">[Screenshot Placeholder]</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Video Embed */}
              {project.videoUrl && (
                <div>
                  <h2 className="text-2xl font-bold text-navy-900 mb-4">Demo Video</h2>
                  <div className="relative aspect-video rounded-lg overflow-hidden bg-navy-100">
                    <iframe
                      src={project.videoUrl}
                      className="absolute inset-0 w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Tech Stack */}
              {project.techStack && project.techStack.length > 0 && (
                <div className="bg-navy-50 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-navy-900 mb-4">Tech Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <Tag key={tech} variant="navy" size="md">
                        {tech}
                      </Tag>
                    ))}
                  </div>
                </div>
              )}

              {/* Tags */}
              <div className="bg-white rounded-xl border border-card-border p-6">
                <h3 className="text-lg font-bold text-navy-900 mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Tag key={tag} size="md">
                      {tag}
                    </Tag>
                  ))}
                </div>
              </div>

              {/* Project Info */}
              <div className="bg-white rounded-xl border border-card-border p-6">
                <h3 className="text-lg font-bold text-navy-900 mb-4">Project Info</h3>
                <dl className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-navy-500">Status</dt>
                    <dd className="font-medium text-navy-900">{project.status}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-navy-500">Category</dt>
                    <dd className="font-medium text-navy-900">{project.category}</dd>
                  </div>
                  {project.company && (
                    <div className="flex justify-between">
                      <dt className="text-navy-500">Company</dt>
                      <dd className="font-medium text-navy-900">{project.company}</dd>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <dt className="text-navy-500">Created</dt>
                    <dd className="font-medium text-navy-900">
                      {new Date(project.dateCreated).toLocaleDateString('en-US', {
                        month: 'short',
                        year: 'numeric',
                      })}
                    </dd>
                  </div>
                </dl>
              </div>

              {/* Links */}
              <div className="bg-white rounded-xl border border-card-border p-6">
                <h3 className="text-lg font-bold text-navy-900 mb-4">Links</h3>
                <div className="space-y-2">
                  {project.links.map((link, index) => (
                    <a
                      key={index}
                      href={link.url.startsWith('[PLACEHOLDER') ? '#' : link.url}
                      target={link.url.startsWith('/') ? '_self' : '_blank'}
                      rel="noopener noreferrer"
                      className={`flex items-center p-2 rounded-lg transition-colors ${
                        link.url.startsWith('[PLACEHOLDER')
                          ? 'text-navy-400 cursor-not-allowed'
                          : 'text-navy-700 hover:bg-navy-50'
                      }`}
                    >
                      <span className="capitalize">{link.type}</span>
                      {!link.url.startsWith('[PLACEHOLDER') && (
                        <svg className="w-4 h-4 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      )}
                      {link.url.startsWith('[PLACEHOLDER') && (
                        <span className="ml-auto text-xs text-navy-400">(Coming soon)</span>
                      )}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <section className="section-padding bg-background-alt">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-navy-900 mb-8 text-center">Related Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProjects.map((relatedProject) => (
                <ProjectCard key={relatedProject.id} project={relatedProject} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Back to Projects */}
      <section className="py-8 text-center">
        <Button href="/projects" variant="outline">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to All Projects
        </Button>
      </section>
    </div>
  );
}
