import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getAllPosts, getAllBlogTags } from '@/lib/blog';
import { SectionHeader, Tag } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Technical write-ups, project deep dives, and insights on ML engineering, data pipelines, and automation.',
};

export default function BlogPage() {
  const posts = getAllPosts();
  const tags = getAllBlogTags();

  return (
    <div className="pt-20">
      {/* Header */}
      <section className="section-padding bg-gradient-to-br from-navy-50 to-teal-50/30">
        <div className="max-w-4xl mx-auto">
          <SectionHeader
            title="Blog"
            subtitle="Technical write-ups, project deep dives, and insights on ML engineering, data pipelines, and automation"
          />

          {/* Tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2 mt-8">
              {tags.map((tag) => (
                <Tag key={tag} variant="teal" size="md">
                  {tag}
                </Tag>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Blog Posts */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto">
          {posts.length > 0 ? (
            <div className="space-y-8">
              {posts.map((post) => (
                <article
                  key={post.slug}
                  className="group bg-white rounded-xl border border-card-border overflow-hidden card-hover"
                >
                  <Link href={`/blog/${post.slug}`} className="block md:flex">
                    {/* Cover Image */}
                    <div className="relative h-48 md:h-auto md:w-72 flex-shrink-0 bg-navy-100">
                      {post.coverImage ? (
                        <Image
                          src={post.coverImage}
                          alt={post.title}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-teal-600 to-navy-800">
                          <span className="text-white/30 text-4xl font-bold">
                            {post.title.charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6 flex flex-col flex-grow">
                      {/* Meta */}
                      <div className="flex items-center gap-4 text-sm text-navy-500 mb-3">
                        <time dateTime={post.date}>
                          {new Date(post.date).toLocaleDateString('en-US', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </time>
                        <span className="w-1 h-1 rounded-full bg-navy-300" />
                        <span>{post.readingTime}</span>
                      </div>

                      {/* Title */}
                      <h2 className="text-xl font-bold text-navy-900 mb-2 group-hover:text-teal-600 transition-colors">
                        {post.title}
                      </h2>

                      {/* Excerpt */}
                      <p className="text-navy-600 mb-4 line-clamp-2 flex-grow">
                        {post.excerpt}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5">
                        {post.tags.slice(0, 3).map((tag) => (
                          <Tag key={tag} size="sm">
                            {tag}
                          </Tag>
                        ))}
                        {post.tags.length > 3 && (
                          <Tag size="sm" variant="teal">
                            +{post.tags.length - 3}
                          </Tag>
                        )}
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <svg
                className="w-16 h-16 mx-auto text-navy-300 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                />
              </svg>
              <h3 className="text-lg font-medium text-navy-700 mb-2">No posts yet</h3>
              <p className="text-navy-500">
                Blog posts are coming soon. Check back later!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Subscribe CTA - Optional placeholder */}
      <section className="section-padding bg-navy-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
          <p className="text-navy-300 mb-6">
            Follow me on LinkedIn for updates on new posts and projects.
          </p>
          <a
            href="https://www.linkedin.com/in/pavitra-mandal-b0b0571a0/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-teal-600 text-white rounded-lg font-medium hover:bg-teal-700 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            Connect on LinkedIn
          </a>
        </div>
      </section>
    </div>
  );
}
