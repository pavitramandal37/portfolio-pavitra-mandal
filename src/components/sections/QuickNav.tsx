import Link from 'next/link';

const navCards = [
  {
    title: 'Projects',
    description: 'Explore my portfolio of ML systems, data pipelines, and automation tools',
    href: '/projects',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
        />
      </svg>
    ),
    color: 'teal',
  },
  {
    title: 'Experience',
    description: 'My professional journey at Sony, Cisco, and Tech Mahindra',
    href: '/experience',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
    color: 'navy',
  },
  {
    title: 'Blog',
    description: 'Deep dives into technical projects and engineering insights',
    href: '/blog',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
        />
      </svg>
    ),
    color: 'rose',
  },
  {
    title: 'Contact',
    description: 'Let\'s connect and discuss opportunities or collaborations',
    href: '/contact',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
    color: 'teal',
  },
];

const colorClasses = {
  teal: {
    bg: 'bg-teal-50',
    icon: 'text-teal-600',
    hover: 'hover:border-teal-300',
  },
  navy: {
    bg: 'bg-navy-50',
    icon: 'text-navy-600',
    hover: 'hover:border-navy-300',
  },
  rose: {
    bg: 'bg-rose-300/20',
    icon: 'text-rose-500',
    hover: 'hover:border-rose-300',
  },
};

export default function QuickNav() {
  return (
    <section className="section-padding">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {navCards.map((card) => {
            const colors = colorClasses[card.color as keyof typeof colorClasses];
            return (
              <Link
                key={card.href}
                href={card.href}
                className={`group p-6 bg-white rounded-xl border border-card-border ${colors.hover} transition-all duration-300 card-hover`}
              >
                <div
                  className={`inline-flex p-3 rounded-lg ${colors.bg} ${colors.icon} mb-4`}
                >
                  {card.icon}
                </div>
                <h3 className="text-lg font-bold text-navy-900 mb-2 group-hover:text-teal-600 transition-colors">
                  {card.title}
                </h3>
                <p className="text-sm text-navy-600">
                  {card.description}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
