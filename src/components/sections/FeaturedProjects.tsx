import { getFeaturedProjects } from '@/data/projects';
import { SectionHeader, Button } from '@/components/ui';
import ProjectCard from './ProjectCard';

export default function FeaturedProjects() {
  const featuredProjects = getFeaturedProjects();

  return (
    <section className="section-padding bg-background-alt">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          title="Featured Projects"
          subtitle="A selection of projects that showcase my expertise in ML engineering, data pipelines, and automation"
        />

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Button href="/projects" variant="outline" size="lg">
            View All Projects
            <svg
              className="w-4 h-4 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </Button>
        </div>
      </div>
    </section>
  );
}
