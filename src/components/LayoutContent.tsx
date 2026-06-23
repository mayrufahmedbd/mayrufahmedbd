'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';
import BackToTop from './BackToTop';

export default function LayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminPath = pathname.startsWith('/admin');

  return (
    <div className="flex flex-col min-h-screen">
      {!isAdminPath && <Navbar />}
      <main className={`flex-grow ${!isAdminPath ? 'pt-24' : ''}`}>{children}</main>
      {!isAdminPath && <Footer />}
      {!isAdminPath && <BackToTop />}
    </div>
  );
}
