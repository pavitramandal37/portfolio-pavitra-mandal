import { Experience } from '@/types';

/**
 * Experience Data
 * ============================================
 *
 * HOW TO ADD A NEW EXPERIENCE:
 * 1. Copy the template object below
 * 2. Fill in all required fields
 * 3. Add the experience to the `experiences` array
 * 4. Optionally add company logo to /public/images/companies/
 *
 * EXPERIENCE TEMPLATE:
 * {
 *   id: 'unique-id',
 *   company: 'Company Name',
 *   companyLogo: '/images/companies/logo.png',
 *   role: 'Job Title',
 *   location: 'City, Country',
 *   startDate: '2023-01',
 *   endDate: '2024-06' | 'Present',
 *   description: 'Brief description of role and responsibilities',
 *   highlights: ['Achievement 1', 'Achievement 2'],
 *   technologies: ['Tech 1', 'Tech 2'],
 *   relatedProjects: ['project-id-1'],
 *   linkedInUrl: 'https://linkedin.com/company/...',
 * }
 */

export const experiences: Experience[] = [
  {
    id: 'sony',
    company: 'Sony',
    companyLogo: '/images/companies/sony-logo.png', // [PLACEHOLDER_IMAGE_PATH]
    role: 'ML Engineer / Data Engineer', // [PLACEHOLDER_ROLE] - Update with actual role
    location: 'India', // [PLACEHOLDER_LOCATION] - Update with actual location
    startDate: '2023-01', // [PLACEHOLDER_DATE] - Update with actual start date
    endDate: 'Present', // [PLACEHOLDER_DATE] - Update with actual end date
    description: 'Working on AI-driven demand forecasting systems and data engineering pipelines on Azure Databricks platform. Leading development of forecasting models for supply chain optimization.',
    highlights: [
      'Developed the Focus model for AI-driven demand forecasting toolkit',
      'Built scalable data pipelines processing millions of SKUs',
      'Implemented MLOps practices for model deployment and monitoring',
      '[PLACEHOLDER_HIGHLIGHT] - Add more highlights',
    ],
    technologies: ['Python', 'PySpark', 'Azure Databricks', 'Delta Lake', 'MLflow', 'SQL'],
    relatedProjects: ['sony-ai-demand-forecasting', 'sony-project-2'],
    linkedInUrl: 'https://www.linkedin.com/company/sony/',
  },
  {
    id: 'cisco',
    company: 'Cisco',
    companyLogo: '/images/companies/cisco-logo.png', // [PLACEHOLDER_IMAGE_PATH]
    role: '[PLACEHOLDER_ROLE]', // Update with actual role
    location: '[PLACEHOLDER_LOCATION]', // Update with actual location
    startDate: '[PLACEHOLDER_DATE]', // Update with actual start date (format: YYYY-MM)
    endDate: '[PLACEHOLDER_DATE]', // Update with actual end date (format: YYYY-MM)
    description: '[PLACEHOLDER_DESCRIPTION] - Brief description of your role at Cisco.',
    highlights: [
      '[PLACEHOLDER_HIGHLIGHT_1]',
      '[PLACEHOLDER_HIGHLIGHT_2]',
      '[PLACEHOLDER_HIGHLIGHT_3]',
    ],
    technologies: ['[PLACEHOLDER_TECH_1]', '[PLACEHOLDER_TECH_2]'],
    relatedProjects: ['cisco-project'],
    linkedInUrl: 'https://www.linkedin.com/company/cisco/',
  },
  {
    id: 'tech-mahindra',
    company: 'Tech Mahindra',
    companyLogo: '/images/companies/tech-mahindra-logo.png', // [PLACEHOLDER_IMAGE_PATH]
    role: '[PLACEHOLDER_ROLE]', // Update with actual role
    location: '[PLACEHOLDER_LOCATION]', // Update with actual location
    startDate: '[PLACEHOLDER_DATE]', // Update with actual start date (format: YYYY-MM)
    endDate: '[PLACEHOLDER_DATE]', // Update with actual end date (format: YYYY-MM)
    description: '[PLACEHOLDER_DESCRIPTION] - Brief description of your role at Tech Mahindra.',
    highlights: [
      '[PLACEHOLDER_HIGHLIGHT_1]',
      '[PLACEHOLDER_HIGHLIGHT_2]',
      '[PLACEHOLDER_HIGHLIGHT_3]',
    ],
    technologies: ['[PLACEHOLDER_TECH_1]', '[PLACEHOLDER_TECH_2]'],
    relatedProjects: ['tech-mahindra-project'],
    linkedInUrl: 'https://www.linkedin.com/company/tech-mahindra/',
  },
];

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Get all experiences sorted by date (most recent first)
 */
export function getAllExperiences(): Experience[] {
  return [...experiences].sort((a, b) => {
    const dateA = a.endDate === 'Present' ? new Date() : new Date(a.endDate);
    const dateB = b.endDate === 'Present' ? new Date() : new Date(b.endDate);
    return dateB.getTime() - dateA.getTime();
  });
}

/**
 * Get experience by ID
 */
export function getExperienceById(id: string): Experience | undefined {
  return experiences.find((e) => e.id === id);
}
