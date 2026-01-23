import { Project } from '@/types';

/**
 * Projects Data
 * ============================================
 *
 * HOW TO ADD A NEW PROJECT:
 * 1. Copy the template object below
 * 2. Fill in all required fields
 * 3. Add the project to the `projects` array
 * 4. Add your project thumbnail to /public/images/projects/
 *
 * PLACEHOLDER MARKERS:
 * - [PLACEHOLDER_LINKEDIN_URL] - Replace with actual LinkedIn post URL
 * - [PLACEHOLDER_GITHUB_URL] - Replace with actual GitHub repo URL
 * - [PLACEHOLDER_LIVE_APP_URL] - Replace with actual live app URL
 * - [PLACEHOLDER_IMAGE_PATH] - Replace with actual image path
 * - [PLACEHOLDER_DESCRIPTION] - Replace with actual description
 *
 * PROJECT TEMPLATE:
 * {
 *   id: 'unique-id',
 *   title: 'Project Title',
 *   slug: 'project-slug',
 *   description: 'Short description (1-2 sentences)',
 *   longDescription: 'Detailed description for project page',
 *   category: 'Personal' | 'Professional' | 'Automation' | 'AI-ML',
 *   subcategory: 'Optional subcategory',
 *   company: 'Sony' | 'Cisco' | 'Tech Mahindra' | null,
 *   status: 'Live' | 'In Development' | 'Completed' | 'Archived',
 *   featured: true | false,
 *   tags: ['Tag1', 'Tag2'],
 *   thumbnail: '/images/projects/project-thumbnail.jpg',
 *   banner: '/images/projects/project-banner.jpg',
 *   screenshots: ['/images/projects/screenshot1.jpg'],
 *   videoUrl: 'https://youtube.com/embed/xxx',
 *   links: [
 *     { type: 'linkedin', url: 'https://linkedin.com/...', label: 'LinkedIn Post' },
 *     { type: 'github', url: 'https://github.com/...', label: 'View Code' },
 *     { type: 'live', url: 'https://app.example.com', label: 'Live Demo' },
 *     { type: 'blog', url: '/blog/post-slug', label: 'Read More' },
 *   ],
 *   problemStatement: 'What problem does this solve?',
 *   approach: 'How did you approach the solution?',
 *   outcomes: ['Outcome 1', 'Outcome 2'],
 *   techStack: ['Python', 'React', 'AWS'],
 *   dateCreated: '2024-01-15',
 *   dateUpdated: '2024-03-20',
 *   relatedProjects: ['other-project-id'],
 * }
 */

export const projects: Project[] = [
  // ============================================
  // PERSONAL PROJECTS
  // ============================================
  {
    id: 'mind-map-web-app',
    title: 'Mind Map Web App',
    slug: 'mind-map-web-app',
    description: 'Interactive mind mapping tool built for visual thinking and brainstorming. Features real-time collaboration and intuitive node management.',
    longDescription: 'A comprehensive mind mapping application designed to help users organize their thoughts visually. The app features drag-and-drop functionality, customizable node styles, keyboard shortcuts for power users, and export capabilities for sharing and documentation.',
    category: 'Personal',
    status: 'Live',
    featured: true,
    tags: ['React', 'TypeScript', 'Canvas API', 'Real-time'],
    thumbnail: '/images/projects/mind-map-thumbnail.jpg', // [PLACEHOLDER_IMAGE_PATH]
    banner: '/images/projects/mind-map-banner.jpg', // [PLACEHOLDER_IMAGE_PATH]
    screenshots: [
      '/images/projects/mind-map-screenshot-1.jpg', // [PLACEHOLDER_IMAGE_PATH]
      '/images/projects/mind-map-screenshot-2.jpg', // [PLACEHOLDER_IMAGE_PATH]
    ],
    links: [
      { type: 'linkedin', url: '[PLACEHOLDER_LINKEDIN_URL]', label: 'LinkedIn Post' },
      { type: 'live', url: '[PLACEHOLDER_LIVE_APP_URL]', label: 'Try It Live' },
    ],
    problemStatement: 'Traditional note-taking is linear and often fails to capture the interconnected nature of ideas. Existing mind mapping tools are either too complex or lack essential features for effective brainstorming.',
    approach: 'Built a web-based solution using modern React patterns with an intuitive drag-and-drop interface. Focused on performance optimization for handling large mind maps and implemented keyboard shortcuts for power users.',
    outcomes: [
      'Intuitive interface for creating and organizing ideas',
      'Real-time rendering of complex node hierarchies',
      'Export functionality for documentation and sharing',
    ],
    techStack: ['React', 'TypeScript', 'HTML Canvas', 'Zustand', 'Tailwind CSS'],
    dateCreated: '2024-06-01',
    relatedProjects: [],
  },
  {
    id: 'airflow-demand-forecasting',
    title: 'Airflow Demand Forecasting System',
    slug: 'airflow-demand-forecasting',
    description: 'Production-grade MLOps pipeline using Apache Airflow for demand forecasting with Prophet, SARIMA, and DeepAR models. Built for retail SaaS applications.',
    longDescription: 'A comprehensive MLOps solution that automates the entire demand forecasting workflow from data ingestion to model deployment. The system supports multiple forecasting algorithms and automatically selects the best performing model for each product category.',
    category: 'AI-ML',
    subcategory: 'MLOps',
    status: 'In Development',
    featured: true,
    tags: ['Python', 'Apache Airflow', 'Prophet', 'SARIMA', 'DeepAR', 'MLOps', 'Docker'],
    thumbnail: '/images/projects/airflow-forecasting-thumbnail.jpg', // [PLACEHOLDER_IMAGE_PATH]
    banner: '/images/projects/airflow-forecasting-banner.jpg', // [PLACEHOLDER_IMAGE_PATH]
    screenshots: [
      '/images/projects/airflow-dag-screenshot.jpg', // [PLACEHOLDER_IMAGE_PATH]
      '/images/projects/forecasting-dashboard.jpg', // [PLACEHOLDER_IMAGE_PATH]
    ],
    links: [
      { type: 'linkedin', url: '[PLACEHOLDER_LINKEDIN_URL]', label: 'LinkedIn Post' },
      { type: 'github', url: '[PLACEHOLDER_GITHUB_URL]', label: 'View Code' },
    ],
    problemStatement: 'Retail businesses struggle with accurate demand forecasting, leading to overstock or stockouts. Manual forecasting processes are time-consuming and don\'t scale well across thousands of SKUs.',
    approach: 'Designed a modular pipeline architecture using Apache Airflow that handles data preprocessing, feature engineering, model training, and prediction generation. Implemented automated model selection based on historical accuracy metrics.',
    outcomes: [
      'Automated daily forecasting for thousands of SKUs',
      'Model accuracy improvement through ensemble methods',
      'Reduced manual intervention in forecasting workflow',
      'Scalable architecture supporting multiple clients',
    ],
    techStack: ['Python', 'Apache Airflow', 'Prophet', 'SARIMA', 'DeepAR', 'PostgreSQL', 'Docker', 'Redis'],
    dateCreated: '2024-09-01',
    relatedProjects: ['sony-ai-demand-forecasting'],
  },
  {
    id: 'home-automation-siri-windows',
    title: 'Home Automation: Siri to Windows PC',
    slug: 'home-automation-siri-windows',
    description: 'Voice command system that lets Siri control Windows PC tasks. Includes setup instructions and workflow automation.',
    longDescription: 'A creative automation solution that bridges Apple\'s Siri ecosystem with Windows PC control. Using a combination of iOS Shortcuts, cloud services, and local Python scripts, this system enables voice-activated control of your Windows computer from anywhere.',
    category: 'Automation',
    status: 'Completed',
    featured: true,
    tags: ['Python', 'iOS Shortcuts', 'Automation', 'Voice Control', 'API'],
    thumbnail: '/images/projects/home-automation-thumbnail.jpg', // [PLACEHOLDER_IMAGE_PATH]
    banner: '/images/projects/home-automation-banner.jpg', // [PLACEHOLDER_IMAGE_PATH]
    links: [
      { type: 'linkedin', url: '[PLACEHOLDER_LINKEDIN_URL]', label: 'LinkedIn Post' },
      { type: 'github', url: '[PLACEHOLDER_GITHUB_URL]', label: 'Setup Guide' },
    ],
    problemStatement: 'Controlling a Windows PC remotely using voice commands through Apple\'s ecosystem requires bridging two incompatible platforms.',
    approach: 'Created a pipeline using iOS Shortcuts to send commands to a cloud service, which then triggers Python scripts running on the Windows PC. Implemented secure authentication and various command handlers.',
    outcomes: [
      'Seamless voice control of Windows PC via Siri',
      'Support for custom commands and workflows',
      'Secure command execution with authentication',
    ],
    techStack: ['Python', 'iOS Shortcuts', 'Firebase', 'Windows Task Scheduler'],
    dateCreated: '2024-03-15',
    relatedProjects: [],
  },

  // ============================================
  // PROFESSIONAL PROJECTS - SONY
  // ============================================
  {
    id: 'sony-ai-demand-forecasting',
    title: 'AI Demand Forecasting Toolkit',
    slug: 'sony-ai-demand-forecasting',
    description: 'Developed the Focus model within a toolkit used for AI-driven demand forecasting on Azure Databricks platform at Sony.',
    longDescription: 'Led the development of a critical forecasting model within Sony\'s enterprise demand forecasting toolkit. The Focus model specializes in handling irregular demand patterns and promotional effects, providing accurate predictions for inventory planning and supply chain optimization.',
    category: 'Professional',
    subcategory: 'Sony',
    company: 'Sony',
    status: 'Completed',
    featured: false,
    tags: ['Python', 'Azure Databricks', 'PySpark', 'Machine Learning', 'Time Series'],
    thumbnail: '/images/projects/sony-forecasting-thumbnail.jpg', // [PLACEHOLDER_IMAGE_PATH]
    banner: '/images/projects/sony-forecasting-banner.jpg', // [PLACEHOLDER_IMAGE_PATH]
    links: [
      { type: 'blog', url: '/blog/sony-demand-forecasting', label: 'Read Case Study' },
    ],
    problemStatement: 'Enterprise demand forecasting at scale requires handling diverse product categories, promotional effects, and market dynamics while maintaining prediction accuracy.',
    approach: 'Developed a specialized forecasting model using PySpark on Azure Databricks, focusing on handling promotional lifts and irregular demand patterns. Implemented feature engineering pipelines and model validation frameworks.',
    outcomes: [
      'Improved forecast accuracy for promotional periods',
      'Scalable solution processing millions of SKUs',
      'Integration with existing supply chain systems',
    ],
    techStack: ['Python', 'PySpark', 'Azure Databricks', 'Delta Lake', 'MLflow'],
    dateCreated: '2023-06-01',
    relatedProjects: ['airflow-demand-forecasting'],
  },
  {
    id: 'sony-project-2',
    title: 'Sony Project 2',
    slug: 'sony-project-2',
    description: '[PLACEHOLDER_DESCRIPTION] - Second major project at Sony involving data engineering and ML systems.',
    longDescription: '[PLACEHOLDER_DESCRIPTION] - Detailed description of the second Sony project.',
    category: 'Professional',
    subcategory: 'Sony',
    company: 'Sony',
    status: 'Completed',
    featured: false,
    tags: ['Python', 'Azure', 'Data Engineering'], // [PLACEHOLDER_TAGS]
    thumbnail: '/images/projects/sony-project-2-thumbnail.jpg', // [PLACEHOLDER_IMAGE_PATH]
    links: [
      { type: 'blog', url: '/blog/sony-project-2', label: 'Read Case Study' },
    ],
    problemStatement: '[PLACEHOLDER_DESCRIPTION]',
    approach: '[PLACEHOLDER_DESCRIPTION]',
    outcomes: ['[PLACEHOLDER_OUTCOME_1]', '[PLACEHOLDER_OUTCOME_2]'],
    techStack: ['[PLACEHOLDER_TECH_1]', '[PLACEHOLDER_TECH_2]'],
    dateCreated: '2023-01-01',
    relatedProjects: [],
  },

  // ============================================
  // PROFESSIONAL PROJECTS - CISCO
  // ============================================
  {
    id: 'cisco-project',
    title: 'Cisco Project',
    slug: 'cisco-project',
    description: '[PLACEHOLDER_DESCRIPTION] - Major project at Cisco involving network analytics and automation.',
    longDescription: '[PLACEHOLDER_DESCRIPTION] - Detailed description of the Cisco project.',
    category: 'Professional',
    subcategory: 'Cisco',
    company: 'Cisco',
    status: 'Completed',
    featured: false,
    tags: ['Python', 'Network Analytics', 'Automation'], // [PLACEHOLDER_TAGS]
    thumbnail: '/images/projects/cisco-project-thumbnail.jpg', // [PLACEHOLDER_IMAGE_PATH]
    links: [
      { type: 'blog', url: '/blog/cisco-project', label: 'Read Case Study' },
    ],
    problemStatement: '[PLACEHOLDER_DESCRIPTION]',
    approach: '[PLACEHOLDER_DESCRIPTION]',
    outcomes: ['[PLACEHOLDER_OUTCOME_1]', '[PLACEHOLDER_OUTCOME_2]'],
    techStack: ['[PLACEHOLDER_TECH_1]', '[PLACEHOLDER_TECH_2]'],
    dateCreated: '2022-01-01',
    relatedProjects: [],
  },

  // ============================================
  // PROFESSIONAL PROJECTS - TECH MAHINDRA
  // ============================================
  {
    id: 'tech-mahindra-project',
    title: 'Tech Mahindra Project',
    slug: 'tech-mahindra-project',
    description: '[PLACEHOLDER_DESCRIPTION] - Major project at Tech Mahindra.',
    longDescription: '[PLACEHOLDER_DESCRIPTION] - Detailed description of the Tech Mahindra project.',
    category: 'Professional',
    subcategory: 'Tech Mahindra',
    company: 'Tech Mahindra',
    status: 'Completed',
    featured: false,
    tags: ['Python', 'Data Engineering'], // [PLACEHOLDER_TAGS]
    thumbnail: '/images/projects/tech-mahindra-thumbnail.jpg', // [PLACEHOLDER_IMAGE_PATH]
    links: [
      { type: 'blog', url: '/blog/tech-mahindra-project', label: 'Read Case Study' },
    ],
    problemStatement: '[PLACEHOLDER_DESCRIPTION]',
    approach: '[PLACEHOLDER_DESCRIPTION]',
    outcomes: ['[PLACEHOLDER_OUTCOME_1]', '[PLACEHOLDER_OUTCOME_2]'],
    techStack: ['[PLACEHOLDER_TECH_1]', '[PLACEHOLDER_TECH_2]'],
    dateCreated: '2021-01-01',
    relatedProjects: [],
  },
];

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Get all projects sorted by date (newest first)
 */
export function getAllProjects(): Project[] {
  return [...projects].sort(
    (a, b) => new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime()
  );
}

/**
 * Get featured projects
 */
export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}

/**
 * Get projects by category
 */
export function getProjectsByCategory(category: Project['category']): Project[] {
  return getAllProjects().filter((p) => p.category === category);
}

/**
 * Get projects by company
 */
export function getProjectsByCompany(company: Project['company']): Project[] {
  return getAllProjects().filter((p) => p.company === company);
}

/**
 * Get a single project by slug
 */
export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

/**
 * Get related projects
 */
export function getRelatedProjects(projectId: string): Project[] {
  const project = projects.find((p) => p.id === projectId);
  if (!project?.relatedProjects) return [];
  return projects.filter((p) => project.relatedProjects?.includes(p.id));
}

/**
 * Get all unique tags
 */
export function getAllTags(): string[] {
  const tags = new Set<string>();
  projects.forEach((p) => p.tags.forEach((t) => tags.add(t)));
  return Array.from(tags).sort();
}

/**
 * Get all unique categories
 */
export function getAllCategories(): Project['category'][] {
  return ['Personal', 'Professional', 'Automation', 'AI-ML'];
}
