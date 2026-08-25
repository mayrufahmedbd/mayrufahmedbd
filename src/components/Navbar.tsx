'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useTheme } from './ThemeProvider';
import { Sun, Moon, Menu, X } from 'lucide-react';

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Projects', href: '/projects' },
  { name: 'Blog', href: '/blog' },
  { name: 'Gallery', href: '/gallery' },
  { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      // Calculate Scroll Progress
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }

      // Check Scrolled State for styling
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Scroll Progress Bar */}
      <div className="scroll-progress-container">
        <div className="scroll-progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>

      <nav
        className={`fixed top-4 left-1/2 -translate-x-1/2 w-[90%] max-w-7xl z-50 rounded-2xl transition-all duration-300 ${isScrolled
            ? 'glass-panel py-3 shadow-lg'
            : 'bg-transparent py-5 border-b border-transparent'
          }`}
      >
        <div className="px-6 flex items-center justify-between">
          {/* Logo / Name */}
          <Link href="/" className="text-xl font-bold tracking-wider flex items-center gap-2">
            <Image 
              src={theme === 'dark' ? "/logo.png" : "/black-logo.png"} 
              alt="Logo" 
              width={32} 
              height={32} 
              className="w-8 h-8 object-contain transition-all duration-300" 
            />
            {/* <span className="bg-gradient-to-r from-blue-500 to-violet-500 bg-clip-text text-transparent whitespace-nowrap">
              Mayruf Ahmed
            </span> */}
            <span className="text-[10px] uppercase font-mono tracking-widest px-2 py-0.5 border border-primary-main/30 rounded text-primary-main bg-primary-main/10">
              DevSec
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-sm font-medium transition-colors duration-200 ${isActive ? 'text-primary-main font-bold border-b border-primary-main' : 'text-text-base hover:text-primary-main'
                    }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl border border-card-border hover:bg-card-bg transition-colors duration-200 text-text-base cursor-pointer"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl border border-card-border hover:bg-card-bg transition-colors duration-200 text-text-base cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 mx-4 p-4 rounded-xl glass-panel flex flex-col gap-4 animate-float">
            {navItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-base font-medium px-3 py-2 rounded-lg transition-all duration-200 ${isActive ? 'bg-primary-main/10 text-primary-main font-bold' : 'hover:bg-primary-main/5 text-text-base hover:text-primary-main'
                    }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
        )}
      </nav>
    </>
  );
}
