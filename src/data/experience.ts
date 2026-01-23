import { Experience } from '@/types';

/**
 * Experience Data
 * ============================================
 * Based on LinkedIn profile data
 *
 * Structure:
 * - Companies are listed with overall tenure
 * - Multiple roles within a company are tracked in the `roles` array
 * - Client projects and dispatch assignments are noted
 */

export const experiences: Experience[] = [
  {
    id: 'human-resocia',
    company: 'Human Resocia / Global IT Talent',
    companyLogo: '/images/companies/human-resocia-logo.png',
    employmentType: 'Full-time',
    location: 'Tokyo, Japan',
    startDate: '2025-01',
    endDate: 'Present',
    roles: [
      {
        title: 'Data Scientist (Dispatch to Sony BI Strategy & Planning Division)',
        startDate: '2025-01',
        endDate: 'Present',
        location: 'Tokyo, Japan',
        clientCompany: 'Sony',
        description: 'Dispatched to Sony BI Strategy and Planning Division, working on AI-powered data solutions and demand forecasting systems.',
        highlights: [
          'Currently building "Sales Data Agent" - an AI-powered conversational agent using Snowflake Cortex Analyst',
          'Enables business users to query sales data using natural language, eliminating SQL dependencies',
          'Implementing AI Observability using TruLens to monitor response accuracy and detect hallucinations',
          'Successfully delivered migration of "AI Demand Forecasting System" from Dataiku to Azure Databricks',
          'Built scalable ETL pipelines using Medallion Architecture for cost optimization and data governance',
        ],
        technologies: ['Python', 'Snowflake', 'Cortex Analyst', 'TruLens', 'Azure Databricks', 'PySpark', 'SQL', 'Power BI', 'MLOps'],
        projects: [
          {
            name: 'Sales Data Agent',
            description: 'AI-powered conversational analytics agent that enables business users to query sales data and internal glossary using natural language.',
            highlights: [
              'Leveraged Snowflake Cortex Analyst for text-to-SQL conversion',
              'Implemented Cortex Search for semantic retrieval',
              'Designed AI observability pipelines using TruLens',
            ],
          },
          {
            name: 'AI Demand Forecasting Migration',
            description: 'Migrated AI forecasting systems from Dataiku (PaaS) to Azure Databricks (IaaS) for improved scalability and cost efficiency.',
            highlights: [
              'Designed ETL workflows using Medallion Architecture',
              'Automated data extraction from on-premises to Azure Data Lake Storage',
              'Implemented automated data quality checks',
              'Deployed CI/CD pipeline for Databricks using GitHub',
            ],
          },
        ],
      },
    ],
    linkedInUrl: 'https://www.linkedin.com/company/human-resocia/',
  },
  {
    id: 'tech-mahindra',
    company: 'Tech Mahindra',
    companyLogo: '/images/companies/tech-mahindra-logo.png',
    employmentType: 'Full-time',
    location: 'India',
    startDate: '2021-12',
    endDate: '2025-01',
    roles: [
      {
        title: 'Data Engineer (Client: Cisco MyID Group)',
        startDate: '2023-06',
        endDate: '2025-01',
        location: 'Nagpur, Maharashtra, India',
        clientCompany: 'Cisco',
        description: 'Led database migration projects and developed AI solutions for Cisco MyID Group.',
        highlights: [
          'Led Database Migration of Cisco Group management software "MyID Group"',
          'Developed AI API support chatbot POC using Azure OpenAI Service',
          'Implemented data architecture improvements for group management systems',
        ],
        technologies: ['PostgreSQL', 'Azure OpenAI', 'Python', 'SQL', 'Data Architecture'],
        projects: [
          {
            name: 'MyID Group Database Migration',
            description: 'Led the migration of Cisco Group Database to MyID Group infrastructure.',
          },
          {
            name: 'AI API Support Chatbot POC',
            description: 'Developed proof of concept for an AI-powered support chatbot using Azure OpenAI Service.',
          },
        ],
      },
      {
        title: 'TRIBE Training Program',
        startDate: '2023-03',
        endDate: '2023-05',
        location: 'Pune, Maharashtra, India',
        description: 'Selected for the internal AI training program (Technology Ready Inspired Business Executive). One of 26 candidates selected from 2000 applicants.',
        highlights: [
          'Comprehensive training in ML, Deep Learning, LLMs, SDLC, Quantum Computing, Cybersecurity',
          'Python Django framework development',
          'Enhanced professional skills: client presentation, time management, communication',
          'Collaborated on 5 projects including enterprise search engine optimization and face recognition',
        ],
        technologies: ['Machine Learning', 'Deep Learning', 'NLP', 'Python', 'Django', 'Quantum Computing'],
      },
      {
        title: 'Azure Data Engineer (Client: Rogers Communication)',
        startDate: '2021-12',
        endDate: '2023-02',
        location: 'Remote',
        clientCompany: 'Rogers Communication',
        description: 'Worked on end-to-end telecom customer data migration from on-premises to Azure cloud.',
        highlights: [
          'End-to-end Telecom Customer data migration from On-prem MS SQL Servers to Azure Data Storage',
          'Developed Customer Churn prediction ML model',
          'Built data pipelines using Azure Synapse Studio',
        ],
        technologies: ['Azure Data Lake', 'Azure Synapse', 'MS SQL Server', 'Python', 'Machine Learning', 'Data Pipelines'],
        projects: [
          {
            name: 'Azure Data Migration',
            description: 'Migrated telecom customer data from on-premises SQL servers to Azure cloud infrastructure.',
          },
          {
            name: 'Customer Churn Prediction',
            description: 'Developed machine learning model to predict customer churn for telecom services.',
          },
        ],
      },
    ],
    linkedInUrl: 'https://www.linkedin.com/company/tech-mahindra/',
  },
  {
    id: 'delhivery',
    company: 'Delhivery Pvt Ltd',
    companyLogo: '/images/companies/delhivery-logo.png',
    employmentType: 'Full-time',
    location: 'India',
    startDate: '2021-08',
    endDate: '2021-09',
    role: 'Team Lead Manager',
    description: 'Team Leader Manager in logistics company at Last Mile Operations. Managed delivery operations and team coordination.',
    highlights: [
      'Managed last mile delivery operations',
      'Led team of delivery associates',
      'Coordinated logistics and delivery schedules',
    ],
    technologies: ['Operations Management', 'Logistics', 'Team Leadership'],
    linkedInUrl: 'https://www.linkedin.com/company/delhivery/',
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

/**
 * Get total years of experience
 */
export function getTotalExperience(): string {
  const startDate = new Date('2021-08'); // First job at Delhivery
  const now = new Date();
  const years = Math.floor((now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24 * 365));
  return `${years}+`;
}
