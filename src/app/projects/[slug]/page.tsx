import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getAllProjects, getProjectBySlug, getRelatedProjects } from '@/data/projects';
import { Button, Tag } from '@/components/ui';
import { ProjectCard } from '@/components/sections';
import { formatRelativeDate, formatEndDate } from '@/utils';

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
    return { title: 'Project Not Found' };
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

  const linkedInLink = project.links.find((l) => l.type === 'linkedin');
  const liveLink = project.links.find((l) => l.type === 'live');
  const githubLink = project.links.find((l) => l.type === 'github');

  return (
    <div className="bg-navy-950 pt-20">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-end text-white overflow-hidden">
        <div className="absolute inset-0">
          {project.banner && (
            <Image src={project.banner} alt={project.title} fill className="object-cover" priority />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/70 to-navy-950/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950/80 via-transparent to-navy-950/40" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(20,184,166,0.15),transparent_50%)]" />
        </div>

        <div className="relative w-full pb-12 pt-32 md:pt-40">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="mb-8">
              <ol className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-sm">
                <li><Link href="/" className="text-white/50 hover:text-white transition-colors">Home</Link></li>
                <li className="text-white/20">/</li>
                <li><Link href="/projects" className="text-white/50 hover:text-white transition-colors">Projects</Link></li>
                <li className="text-white/20">/</li>
                <li className="text-teal-400 font-medium truncate max-w-[200px]">{project.title}</li>
              </ol>
            </nav>

            <div className="flex flex-wrap items-center gap-3 mb-6">
              {project.company && (
                <span className="px-4 py-1.5 text-sm font-semibold rounded-full bg-white/10 backdrop-blur-sm text-white border border-white/10">
                  {project.company}
                </span>
              )}
              <span className="px-4 py-1.5 text-sm font-semibold rounded-full bg-teal-500/20 backdrop-blur-sm text-teal-300 border border-teal-400/20">
                {project.category}
              </span>
              <span className={`px-4 py-1.5 text-sm font-semibold rounded-full backdrop-blur-sm border ${
                project.status === 'Live'
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/20'
                  : project.status === 'In Development'
                  ? 'bg-amber-500/20 text-amber-300 border-amber-400/20'
                  : 'bg-white/10 text-white/60 border-white/10'
              }`}>
                {project.status}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">{project.title}</h1>
            <p className="text-lg md:text-xl text-white/60 mb-10 leading-relaxed max-w-3xl">
              {project.longDescription || project.description}
            </p>

            <div className="flex flex-wrap gap-4">
              {liveLink && !liveLink.url.startsWith('[PLACEHOLDER') && (
                <Button href={liveLink.url} external variant="secondary" size="lg">Live Demo</Button>
              )}
              {githubLink && !githubLink.url.startsWith('[PLACEHOLDER') && (
                <Button href={githubLink.url} external variant="ghost" size="lg" className="border border-white/20 text-white hover:bg-white/10">
                  View Code
                </Button>
              )}
              {linkedInLink && !linkedInLink.url.startsWith('[PLACEHOLDER') && (
                <Button href={linkedInLink.url} external variant="ghost" size="lg" className="text-white hover:bg-white/10">
                  LinkedIn Post
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-12">
              {project.problemStatement && (
                <div className="rounded-2xl p-6 border border-white/10 bg-white/5">
                  <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                    <span className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center mr-3">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </span>
                    Problem Statement
                  </h2>
                  <p className="text-white/60 leading-relaxed">{project.problemStatement}</p>
                </div>
              )}

              {project.approach && (
                <div className="rounded-2xl p-6 border border-white/10 bg-white/5">
                  <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                    <span className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center mr-3">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </span>
                    My Approach
                  </h2>
                  <p className="text-white/60 leading-relaxed">{project.approach}</p>
                </div>
              )}

              {project.outcomes && project.outcomes.length > 0 && (
                <div className="rounded-2xl p-6 border border-white/10 bg-white/5">
                  <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                    <span className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center mr-3">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </span>
                    Key Outcomes
                  </h2>
                  <ul className="space-y-3">
                    {project.outcomes.map((outcome, index) => (
                      <li key={index} className="flex items-start">
                        <svg className="w-5 h-5 text-teal-400 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-white/60">{outcome}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {project.screenshots && project.screenshots.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">Screenshots</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {project.screenshots.map((screenshot, index) => (
                      <div key={index} className="relative aspect-video rounded-xl overflow-hidden bg-navy-800 border border-white/10">
                        <Image src={screenshot} alt={`${project.title} screenshot ${index + 1}`} fill className="object-cover hover:scale-105 transition-transform duration-300" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {project.videoUrl && (
                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">Demo Video</h2>
                  <div className="relative aspect-video rounded-xl overflow-hidden bg-navy-800 border border-white/10">
                    <iframe src={project.videoUrl} className="absolute inset-0 w-full h-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {project.techStack && project.techStack.length > 0 && (
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                  <h3 className="text-lg font-bold text-white mb-4">Tech Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <span key={tech} className="px-3 py-1 text-xs font-medium rounded-full border border-white/10 text-white/50 bg-white/5">{tech}</span>
                    ))}
                  </div>
                </div>
              )}

              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <h3 className="text-lg font-bold text-white mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 text-xs font-medium rounded-full border border-white/10 text-white/50 bg-white/5">{tag}</span>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <h3 className="text-lg font-bold text-white mb-4">Project Info</h3>
                <dl className="space-y-4 text-sm">
                  {[
                    { label: 'Status', value: project.status },
                    { label: 'Category', value: String(project.category) },
                    ...(project.company ? [{ label: 'Company', value: project.company }] : []),
                    { label: 'Created', value: formatRelativeDate(project.dateCreated) },
                    { label: 'Ended', value: formatEndDate(project.dateEnded) },
                  ].map((item) => (
                    <div key={item.label} className="flex justify-between items-center py-2 border-b border-white/5">
                      <dt className="text-white/30">{item.label}</dt>
                      <dd className="font-semibold text-white/70">{item.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <h3 className="text-lg font-bold text-white mb-4">Links</h3>
                <div className="space-y-2">
                  {project.links.map((link, index) => (
                    <a
                      key={index}
                      href={link.url.startsWith('[PLACEHOLDER') ? '#' : link.url}
                      target={link.url.startsWith('/') ? '_self' : '_blank'}
                      rel="noopener noreferrer"
                      className={`flex items-center p-3 rounded-xl transition-all ${
                        link.url.startsWith('[PLACEHOLDER')
                          ? 'text-white/20 cursor-not-allowed bg-white/5'
                          : 'text-white/60 hover:bg-teal-500/10 hover:text-teal-400 border border-white/5 hover:border-teal-400/20'
                      }`}
                    >
                      <span className="capitalize font-medium">{link.type}</span>
                      {!link.url.startsWith('[PLACEHOLDER') && (
                        <svg className="w-4 h-4 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      )}
                      {link.url.startsWith('[PLACEHOLDER') && (
                        <span className="ml-auto text-xs text-white/20">(Coming soon)</span>
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
        <section className="section-padding border-t border-white/5">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-8 text-center">Related Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProjects.map((relatedProject) => (
                <ProjectCard key={relatedProject.id} project={relatedProject} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Back */}
      <section className="py-8 text-center">
        <Button href="/projects" variant="ghost" className="border border-white/20 text-white hover:bg-white/10">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to All Projects
        </Button>
      </section>
    </div>
  );
}
