import { SiteConfig, NavItem } from '@/types';

export const siteConfig: SiteConfig = {
  name: 'Pavitra Mandal',
  title: 'Pavitra Mandal | Full Stack Data Engineering | AI Infrastructure',
  description: 'Full Stack Data Engineering | AI Infrastructure specializing in demand forecasting systems, MLOps pipelines, and intelligent automation. Building production-grade AI solutions.',
  tagline: 'Full Stack Data Engineering | AI Infrastructure',
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
      url: 'https://www.youtube.com/@pavitramandal37',
      label: 'YouTube',
    },
    {
      platform: 'email',
      url: 'mailto:pavitramandal37@gmail.com',
      label: 'Email',
    },
  ],
};

export const navItems: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Projects', href: '/projects' },
  { label: 'Experience', href: '/experience' },
  { label: 'Hobby', href: '/hobby' },
  { label: 'Contact', href: '/contact' },
];
