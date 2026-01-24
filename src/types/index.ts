// ============================================
// Type Definitions for Portfolio
// ============================================

export type ProjectCategory = 'Personal' | 'Professional' | 'Automation' | 'AI-ML';
export type ProjectStatus = 'Live' | 'In Development' | 'Completed' | 'Archived';
export type Company = 'Sony' | 'Cisco' | 'Tech Mahindra' | 'Human Resocia' | 'Delhivery' | 'Rogers Communication' | null;

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
  dateEnded?: string | 'Present'; // End date or 'Present' if ongoing
  dateUpdated?: string;
  relatedProjects?: string[]; // Array of project IDs
}

// Role within a company (for companies with multiple positions)
export interface Role {
  title: string;
  startDate: string;
  endDate: string | 'Present';
  location: string;
  description: string;
  highlights: string[];
  technologies: string[];
  clientCompany?: string; // If working on client site (e.g., dispatch to Sony)
  projects?: RoleProject[];
}

// Project within a role
export interface RoleProject {
  name: string;
  description: string;
  highlights?: string[];
}

export interface Experience {
  id: string;
  company: string;
  companyLogo?: string;
  employmentType?: 'Full-time' | 'Contract' | 'Internship' | 'Part-time';
  location: string;
  startDate: string;
  endDate: string | 'Present';
  // Main role info (for single-role experiences)
  role?: string;
  description?: string;
  highlights?: string[];
  technologies?: string[];
  // Multiple roles (for companies with progression or multiple positions)
  roles?: Role[];
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
  platform: 'linkedin' | 'github' | 'instagram' | 'twitter' | 'youtube' | 'email';
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

// Hobby/Gallery types
export interface Photo {
  id: string;
  src: string;
  alt: string;
  category?: string;
  width?: number;
  height?: number;
}
