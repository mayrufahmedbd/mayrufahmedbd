import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import LayoutContent from '@/components/LayoutContent';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const siteUrl = 'https://mayrufahmedbd.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    template: '%s | Mayruf Ahmed – Web Designer & Developer',
    default: 'Mayruf Ahmed | Web Designer, Web Developer & Cybersecurity Enthusiast from Sylhet',
  },
  description:
    'Mayruf Ahmed is a professional web designer and web developer from Sylhet, Bangladesh. Specializing in modern, responsive websites, full-stack development, and cybersecurity. Hire Mayruf for web design in Sylhet.',
  keywords: [
    // Name variants
    'Mayruf',
    'Mayruf Ahmed',
    'Mayruf Ahmed BD',
    'mayrufahmedbd',
    // Role keywords
    'web designer',
    'web developer',
    'web designer in Sylhet',
    'web developer in Sylhet',
    'Sylheti web designer',
    'Sylhet web designer',
    'web design Sylhet Bangladesh',
    'web developer Bangladesh',
    'Bangladeshi web designer',
    // Service keywords
    'portfolio website',
    'professional web design',
    'responsive web design',
    'Next.js developer',
    'React developer',
    'full stack developer',
    'full stack web developer',
    'freelance web designer',
    'freelance web developer',
    // Cybersecurity
    'cybersecurity enthusiast',
    'ethical hacking',
    'CTF player',
    // Location
    'Sylhet',
    'Bangladesh',
    // Long-tail
    'hire web designer Sylhet',
    'hire web developer Bangladesh',
    'Mayruf Ahmed portfolio',
    'Mayruf Ahmed web designer',
    'Mayruf Ahmed web developer',
    'Mayruf Ahmed Sylhet',
  ],
  authors: [{ name: 'Mayruf Ahmed', url: siteUrl }],
  creator: 'Mayruf Ahmed',
  publisher: 'Mayruf Ahmed',
  manifest: '/manifest.json',
  alternates: {
    canonical: siteUrl,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'Mayruf Ahmed – Web Designer & Developer',
    title: 'Mayruf Ahmed | Web Designer & Developer from Sylhet, Bangladesh',
    description:
      'Mayruf Ahmed is a professional web designer and web developer from Sylhet, Bangladesh. Building modern, fast, and secure websites. Explore his portfolio, projects, and blog.',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'Mayruf Ahmed – Web Designer & Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mayruf Ahmed | Web Designer & Developer from Sylhet',
    description:
      'Professional web designer and full-stack developer from Sylhet, Bangladesh. Explore projects, blog, and contact Mayruf Ahmed.',
    images: ['/logo.png'],
    creator: '@mayrufahmed',
  },
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
    shortcut: '/logo.png',
  },
  category: 'technology',
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': `${siteUrl}/#person`,
      name: 'Mayruf Ahmed',
      alternateName: ['Mayruf', 'mayrufahmedbd', 'Mayruf Ahmed BD'],
      url: siteUrl,
      image: {
        '@type': 'ImageObject',
        url: `${siteUrl}/logo.png`,
        caption: 'Mayruf Ahmed – Web Designer & Developer',
      },
      jobTitle: ['Web Designer', 'Web Developer', 'Full Stack Developer', 'Cybersecurity Enthusiast'],
      description:
        'Mayruf Ahmed is a professional web designer and web developer from Sylhet, Bangladesh, specializing in modern, responsive websites, full-stack development, and cybersecurity.',
      knowsAbout: [
        'Web Design',
        'Web Development',
        'Next.js',
        'React',
        'Node.js',
        'TypeScript',
        'Cybersecurity',
        'Ethical Hacking',
        'MongoDB',
      ],
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Sylhet',
        addressCountry: 'BD',
      },
      sameAs: [
        'https://github.com/mayrufahmedbd',
        'https://www.linkedin.com/in/mayrufahmedbd',
        siteUrl,
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: siteUrl,
      name: 'Mayruf Ahmed – Web Designer & Developer',
      description:
        'Portfolio website of Mayruf Ahmed, a web designer and developer from Sylhet, Bangladesh.',
      author: { '@id': `${siteUrl}/#person` },
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${siteUrl}/blog?q={search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@type': 'LocalBusiness',
      '@id': `${siteUrl}/#localbusiness`,
      name: 'Mayruf Ahmed Web Design',
      url: siteUrl,
      image: `${siteUrl}/logo.png`,
      description: 'Professional web design and development services by Mayruf Ahmed in Sylhet, Bangladesh.',
      priceRange: '$$',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Sylhet',
        addressRegion: 'Sylhet Division',
        addressCountry: 'BD',
      },
      founder: { '@id': `${siteUrl}/#person` },
      areaServed: ['Sylhet', 'Bangladesh', 'Worldwide'],
      serviceType: ['Web Design', 'Web Development', 'Full Stack Development'],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full bg-bg-base text-text-base transition-colors duration-300">
        {/* JSON-LD Structured Data for Google Rich Results */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ThemeProvider>
          <LayoutContent>{children}</LayoutContent>
        </ThemeProvider>
      </body>
    </html>
  );
}
