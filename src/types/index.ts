// ============================================
// Type Definitions for Portfolio
// ============================================

export type ProjectCategory = 'Personal' | 'Professional' | 'Automation' | 'AI-ML';
export type ProjectStatus = 'Live' | 'In Development' | 'Completed' | 'Archived';
export type Company = 'Sony' | 'Cisco' | 'Tech Mahindra' | null;

export interface ProjectLink {
  type: 'linkedin' | 'github' | 'live' | 'blog';
  url: string;
  label?: string;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  longDescription?: string;
  category: ProjectCategory;
  subcategory?: string;
  company?: Company;
  status: ProjectStatus;
  featured: boolean;
  tags: string[];
  thumbnail: string;
  banner?: string;
  screenshots?: string[];
  videoUrl?: string;
  links: ProjectLink[];
  problemStatement?: string;
  approach?: string;
  outcomes?: string[];
  techStack?: string[];
  dateCreated: string;
  dateUpdated?: string;
  relatedProjects?: string[]; // Array of project IDs
}

export interface Experience {
  id: string;
  company: string;
  companyLogo?: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string | 'Present';
  description: string;
  highlights: string[];
  technologies: string[];
  relatedProjects?: string[]; // Array of project IDs
  linkedInUrl?: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readingTime: string;
  tags: string[];
  coverImage?: string;
  relatedProjects?: string[];
  published: boolean;
}

export interface SocialLink {
  platform: 'linkedin' | 'github' | 'instagram' | 'twitter' | 'email';
  url: string;
  label: string;
}

export interface SiteConfig {
  name: string;
  title: string;
  description: string;
  tagline: string;
  author: string;
  url: string;
  ogImage: string;
  socialLinks: SocialLink[];
}

export interface NavItem {
  label: string;
  href: string;
  isExternal?: boolean;
}
