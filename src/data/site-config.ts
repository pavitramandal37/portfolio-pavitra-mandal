import { SiteConfig, NavItem } from '@/types';

export const siteConfig: SiteConfig = {
  name: 'Pavitra Mandal',
  title: 'Pavitra Mandal | ML Engineer & Data Engineer',
  description: 'ML Engineer & Data Engineer specializing in demand forecasting systems, MLOps pipelines, and intelligent automation. Building production-grade AI solutions.',
  tagline: 'ML Engineer | Data Engineer',
  author: 'Pavitra Mandal',
  url: 'https://pavitramandal.com', // [PLACEHOLDER_SITE_URL] - Update with your actual domain
  ogImage: '/images/og-image.png', // [PLACEHOLDER_OG_IMAGE] - Create and add OG image
  socialLinks: [
    {
      platform: 'linkedin',
      url: 'https://www.linkedin.com/in/pavitra-mandal-b0b0571a0/',
      label: 'LinkedIn',
    },
    {
      platform: 'github',
      url: 'https://github.com/pavitramandal37',
      label: 'GitHub',
    },
    {
      platform: 'instagram',
      url: 'https://www.instagram.com/pavitra.hito/',
      label: 'Instagram',
    },
    {
      platform: 'youtube',
      url: '[PLACEHOLDER_YOUTUBE_URL]', // Add your YouTube channel URL
      label: 'YouTube',
    },
    {
      platform: 'email',
      url: 'mailto:pavitra@example.com', // [PLACEHOLDER_EMAIL] - Update with your actual email
      label: 'Email',
    },
  ],
};

export const navItems: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Projects', href: '/projects' },
  { label: 'Experience', href: '/experience' },
  { label: 'Blog', href: '/blog' },
  { label: 'Hobby', href: '/hobby' },
  { label: 'Contact', href: '/contact' },
];
