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

export const metadata: Metadata = {
  title: {
    template: '%s | Mayruf Ahmed',
    default: 'Mayruf Ahmed | Web Developer & Cybersecurity Enthusiast',
  },
  description:
    'Portfolio of Mayruf Ahmed - Full Stack Developer, Programmer, and Cybersecurity Enthusiast. Explore my projects, skills, coding journey, and blog posts.',
  keywords: [
    'Mayruf Ahmed',
    'Web Developer',
    'Programmer',
    'Cybersecurity',
    'Ethical Hacking',
    'Next.js Portfolio',
    'Full Stack Developer',
  ],
  authors: [{ name: 'Mayruf Ahmed' }],
  creator: 'Mayruf Ahmed',
  manifest: '/manifest.json',
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
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
        <ThemeProvider>
          <LayoutContent>{children}</LayoutContent>
        </ThemeProvider>
      </body>
    </html>
  );
}
