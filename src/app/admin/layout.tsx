import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Panel | Mayruf Ahmed – Web Designer & Developer',
  description: 'Authorized Admin Security Gate and Dashboard Management Panel',
  icons: {
    icon: [
      { url: '/black-logo.png', type: 'image/png' },
    ],
    apple: [
      { url: '/black-logo.png', type: 'image/png' },
    ],
    shortcut: ['/black-logo.png'],
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
