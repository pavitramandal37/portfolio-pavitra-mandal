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
    description: 'Interactive mind mapping tool for visual thinking and brainstorming. Built with a Python FastAPI backend and a D3.js-powered frontend.',
    longDescription: 'A comprehensive mind mapping web application focused on simple, performant visual organization. The app uses FastAPI for the backend (PostgreSQL for local persistence via SQLAlchemy) and a D3.js-driven frontend (vanilla JavaScript + Jinja2 templates). Features include drag-and-drop node management, customizable node styling, auto-save/export, sanitized rich-text node descriptions, and an intuitive editor UI. (Development in progress.)',
    category: 'Personal',
    status: 'Live',
    featured: true,
    tags: [
      'Python',
      'FastAPI',
      'D3.js',
      'JavaScript',
      'PostgreSQL',
      'SQLite',
      'SQLAlchemy',
      'Jinja2',
      'HTML5',
      'CSS3'
    ],
    thumbnail: '/images/projects/mind-map-thumbnail.jpg',
    banner: '/images/projects/mind-map-banner.jpg',
    screenshots: [
      '/images/projects/mind-map-screenshot-1.jpg',
      '/images/projects/mind-map-screenshot-2.jpg'
    ],
    links: [
      { type: 'github', url: 'https://github.com/pavitramandal37/mind-map-webapp', label: 'Source (GitHub)' },
      { type: 'live', url: 'https://www.mindmapify.in/', label: 'Try It Live' },
      { type: 'linkedin', url: 'https://www.linkedin.com/posts/pavitra-mandal-b0b0571a0_indexing-in-sql-made-easy-understanding-activity-7416397024536768512-8mES?utm_source=share&utm_medium=member_desktop&rcm=ACoAAC7-SnsBt7sRGQzu2j7JTuPaPY8yyHJUxOQ', label: 'How to create a mind map' }
    ],
    problemStatement: 'Linear note-taking often fails to capture the non-linear, interconnected nature of ideas. The goal was to create a lightweight, usable mind-mapping tool for quick idea organization without heavy client frameworks.',
    approach: 'Built a Python FastAPI backend with REST endpoints and simple persistent storage (PostgreSQL). The frontend uses D3.js and vanilla JavaScript within Jinja2-rendered templates to render and interact with mind maps. Focused on performance for larger maps, sanitization for rich-text node content, and export/import utilities.',
    outcomes: [
      'Intuitive editor for creating and organizing idea graphs',
      'D3.js-powered rendering of hierarchical node structures',
      'Export/import(In Progress) and auto-save to persistent PostgreSQL storage',
      'Sanitized rich-text node descriptions for safe sharing'
    ],
    techStack: [
      'Python',
      'FastAPI',
      'D3.js',
      'Vanilla JavaScript',
      'Jinja2 (templating)',
      'PostgreSQL',
      'SQLAlchemy',
      'UVicorn',
      'DOMPurify'
    ],
    dateCreated: '2025-12-01',
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
    relatedProjects: ["cisco-project"],
  },

  // ============================================
  // PROFESSIONAL PROJECTS - CISCO
  // ============================================
  {
    id: 'cisco-myid-data-migration',
    title: 'Cisco MyID Group Data Migration Project',
    slug: 'cisco-myid-data-migration',
    description: 'Enterprise-scale data migration project transferring group management data from legacy Cisco Groups (MS SQL Server) to modern MyID Groups (PostgreSQL), involving complex hierarchical relationships, validation mechanisms, and rollback capabilities.',
    longDescription: 'Led the development and execution of a comprehensive data migration framework at Cisco, migrating millions of group records with nested ownership and membership relationships from Microsoft SQL Server to PostgreSQL. The project involved building a Python-based migration CLI with 14+ commands, implementing Union-Find clustering algorithms for maintaining referential integrity, and establishing CI/CD pipelines with Docker containerization. The solution ensured zero data loss through snapshot comparison, batch processing, and automated rollback mechanisms.',
    category: 'Professional',
    subcategory: 'Enterprise Data Engineering',
    company: 'Cisco',
    status: 'Completed',
    featured: true,
    tags: [
      'Python',
      'PostgreSQL',
      'MS SQL Server',
      'SQLAlchemy',
      'Data Migration',
      'ETL Pipeline',
      'Docker',
      'Jenkins CI/CD',
      'Union-Find Algorithm',
      'Database Engineering',
      'Enterprise Software',
      'Alembic',
      'CLI Development'
    ],
    thumbnail: '/images/projects/cisco-data-migration-thumbnail.jpg',
    // images: [
    //   '/images/projects/cisco-migration-architecture.png',
    //   '/images/projects/cisco-migration-flowchart.png',
    //   '/images/projects/cisco-clustering-diagram.png'
    // ],
    links: [
      { type: 'blog', url: '/blog/cisco-myid-data-migration', label: 'Read Case Study' },
      // { type: 'documentation', url: '/docs/cisco-migration-technical-spec', label: 'Technical Documentation' }
    ],
    problemStatement: 'Cisco needed to migrate group management data from a legacy system (Cisco Groups on MS SQL Server) to a modern platform (MyID Groups on PostgreSQL). The challenge involved preserving complex hierarchical relationships between groups, including nested ownership structures and membership chains. Additionally, the migration required zero downtime, complete data integrity verification, and the ability to rollback at any stage without data loss.',
    approach: 'Developed a modular Python-based migration framework spanning three repositories: myid-groups-migration (core migration logic), myid-groups-persistence (database schema management via Alembic), and myid-groups-provision (infrastructure and CI/CD). Implemented a Union-Find (Disjoint Set Union) algorithm to cluster related groups and preserve referential integrity during migration. Built a comprehensive CLI with 14+ commands supporting precheck, migrate, rollback, snapshot comparison, and audit operations. Utilized batch processing (configurable up to 1000 groups) to handle large datasets efficiently while maintaining transaction consistency.',
    outcomes: [
      'Successfully migrated 100,000+ group records with zero data loss',
      'Reduced migration time by 60% through optimized batch processing and parallel operations',
      'Achieved 99.9% data integrity through automated snapshot comparison and validation',
      'Implemented rollback capability that reduced recovery time from hours to minutes',
      'Built reusable migration framework supporting both Cisco Groups and OKTA migration paths',
      'Established CI/CD pipeline with Docker containerization for consistent deployments',
      'Created comprehensive documentation enabling knowledge transfer across teams'
    ],
    techStack: [
      'Python 3.10+',
      'SQLAlchemy ORM',
      'PostgreSQL',
      'Microsoft SQL Server',
      'Alembic (Schema Migrations)',
      'Docker & Docker Compose',
      'Jenkins (CI/CD)',
      'SonarQube (Code Quality)',
      'cx_Oracle',
      'psycopg2',
      'python-dotenv',
      'JSON Logging Framework'
    ],
    // keyFeatures: [
    //   {
    //     title: 'Union-Find Clustering Algorithm',
    //     description: 'Implemented advanced Union-Find data structure to identify and preserve hierarchical group relationships, ensuring parent-child group structures maintain referential integrity during migration.'
    //   },
    //   {
    //     title: 'Multi-Command CLI Interface',
    //     description: 'Built comprehensive command-line interface with 14+ operations including precheck, migrate, rollback, snapshot, diff_snapshots, audit_fix, and more, supporting both direct arguments and file-based batch input.'
    //   },
    //   {
    //     title: 'Automated Rollback System',
    //     description: 'Designed fail-safe rollback mechanism that captures pre-migration snapshots, enabling complete restoration of source and target systems in case of migration failures.'
    //   },
    //   {
    //     title: 'Batch Processing Engine',
    //     description: 'Developed configurable batch processing system handling up to 1000 groups per batch, with comprehensive error handling and progress logging for large-scale migrations.'
    //   },
    //   {
    //     title: 'Dual-Database Architecture',
    //     description: 'Engineered solution supporting simultaneous connections to MS SQL Server (source) and PostgreSQL (target) with SQLAlchemy ORM for database-agnostic operations.'
    //   },
    //   {
    //     title: 'Validation Framework',
    //     description: 'Created MigrateGroupValidator class performing pre-migration checks, data integrity validation, and post-migration reconciliation to ensure data consistency.'
    //   }
    // ],
    // architecture: {
    //   repositories: [
    //     {
    //       name: 'myid-groups-migration',
    //       purpose: 'Core migration scripts, CLI entry point, validators, and job schedulers',
    //       components: ['main.py (CLI)', 'migration/', 'validator/', 'adhoc/', 'check/', 'job/']
    //     },
    //     {
    //       name: 'myid-groups-persistence',
    //       purpose: 'Database schema management, Alembic migrations, and ORM models',
    //       components: ['alembic/', 'myidgroups_db/', 'db_scripts/', 'examples/']
    //     },
    //     {
    //       name: 'myid-groups-provision',
    //       purpose: 'Infrastructure provisioning, Docker containers, and CI/CD pipelines',
    //       components: ['Dockerfile', 'Jenkinsfile', 'docker-compose.yml', 'tests/', 'src/']
    //     }
    //   ],
    //   migrationFlow: [
    //     'Pre-check Phase: Validate source data and check for existing groups in target',
    //     'Loading Phase: Load groups from source and build clusters based on relationships',
    //     'Validation Phase: Run MigrateGroupValidator on all clusters',
    //     'Snapshot Phase: Capture pre-migration state for rollback capability',
    //     'Migration Execution: Batch process groups, build relationships, update targets',
    //     'Reconciliation Phase: Verify migrated data, compare snapshots, generate reports'
    //   ]
    // },
    // challenges: [
    //   {
    //     challenge: 'Preserving nested group hierarchies during migration',
    //     solution: 'Implemented Union-Find algorithm to cluster related groups and migrate them together, maintaining parent-child relationships and avoiding orphan records.'
    //   },
    //   {
    //     challenge: 'Handling large datasets without memory overflow',
    //     solution: 'Designed batch processing system with configurable batch sizes, using generators and database cursors to stream data rather than loading entire datasets into memory.'
    //   },
    //   {
    //     challenge: 'Ensuring zero-downtime migration with rollback capability',
    //     solution: 'Built snapshot mechanism capturing state before migration, combined with transactional batch processing allowing partial rollbacks without affecting already-migrated data.'
    //   },
    //   {
    //     challenge: 'Managing complex ownership and membership relationships',
    //     solution: 'Created comprehensive data model supporting user owners, group owners, user members, and group members with proper foreign key relationships and validation rules.'
    //   }
    // ],
    // metrics: {
    //   recordsMigrated: '100,000+',
    //   dataIntegrity: '99.9%',
    //   performanceImprovement: '60% faster than manual migration',
    //   rollbackTime: 'Minutes instead of hours',
    //   cliCommands: '14+',
    //   testCoverage: '85%+'
    // },
    // learnings: [
    //   'Deep understanding of enterprise data migration patterns and best practices',
    //   'Experience with Union-Find and other graph algorithms for relationship management',
    //   'Proficiency in building production-grade CLI tools with comprehensive error handling',
    //   'Knowledge of database migration strategies including schema versioning with Alembic',
    //   'Skills in containerization and CI/CD pipeline design for data engineering projects'
    // ],
    dateCreated: '2024-01-01',
    // dateCompleted: '2024-12-31',
    // duration: '12 months',
    // teamSize: 'Cross-functional team of 5',
    // role: 'Data Engineer / Migration Specialist',
    relatedProjects: ['mind-map-web-app'],
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
