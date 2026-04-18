import type { Metadata } from 'next';
import Script from 'next/script';
import { Fraunces, JetBrains_Mono, Inter } from 'next/font/google';
import { Navigation, Footer } from '@/components/layout';
import ThemeProvider from '@/components/ThemeProvider';
import { siteConfig } from '@/data/site-config';
import './globals.css';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-jb-mono',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

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
    type: 'article',
    locale: 'en_US',
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.name,
    publishedTime: '2026-01-26',
    images: [
      {
        url: new URL(siteConfig.ogImage, siteConfig.url).toString(),
        width: 1200,
        height: 630,
        alt: 'Pavitra Mandal – AI & Data Platform Engineer',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    images: [new URL(siteConfig.ogImage, siteConfig.url).toString()],
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
    <html
      lang="en"
      className={`scroll-smooth ${fraunces.variable} ${jetbrainsMono.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* IST-based theme: 06:00–17:59 IST = cream, 18:00–05:59 IST = dark.
            Manual override stored in localStorage['theme-override'].
            Runs before React hydrates to prevent flash. */}
        <script
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var override = localStorage.getItem('theme-override');
                  var theme;
                  if (override === 'dark' || override === 'cream') {
                    theme = override;
                  } else {
                    var istHour = parseInt(
                      new Intl.DateTimeFormat('en-IN', {
                        timeZone: 'Asia/Kolkata',
                        hour: 'numeric',
                        hour12: false
                      }).format(new Date()),
                      10
                    );
                    theme = (istHour >= 6 && istHour < 18) ? 'cream' : 'dark';
                  }
                  document.documentElement.setAttribute('data-theme', theme);
                } catch(e) {
                  document.documentElement.setAttribute('data-theme', 'dark');
                }
              })();
            `,
          }}
        />
      </head>

      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-1MSNYKQ1DC"
        strategy="afterInteractive"
      />

      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-1MSNYKQ1DC', {
            page_path: window.location.pathname,
          });
        `}
      </Script>

      <body
        className="font-sans antialiased min-h-screen flex flex-col bg-background text-foreground"
        suppressHydrationWarning
      >
        <ThemeProvider>
          <Navigation />
          <main className="flex-grow">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
