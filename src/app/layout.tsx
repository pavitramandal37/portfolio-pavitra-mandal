import type { Metadata } from 'next';
import { Navigation, Footer } from '@/components/layout';
import { siteConfig } from '@/data/site-config';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),

  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },

  description: siteConfig.description,

  keywords: [
    'ML Engineer',
    'Data Engineer',
    'Machine Learning',
    'Demand Forecasting',
    'MLOps',
    'Python',
    'Apache Airflow',
    'Azure Databricks',
    'Portfolio',
    'Pavitra Mandal',
  ],

  authors: [{ name: siteConfig.author }],
  creator: siteConfig.author,

  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        // ✅ MUST resolve to absolute URL via metadataBase
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: 'Pavitra Mandal – Full Stack Data Engineer',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: '@pavitramandal',
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },

  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className="font-sans antialiased min-h-screen flex flex-col"
        suppressHydrationWarning
      >
        <Navigation />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
