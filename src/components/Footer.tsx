'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Github, Linkedin, Facebook, Twitter, Eye, Server, Shield, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  const [visitorCount, setVisitorCount] = useState<number | null>(null);
  const [aboutData, setAboutData] = useState<Record<string, string> | null>(null);
  const [systemPing, setSystemPing] = useState<number>(34);

  useEffect(() => {
    // Generate a subtle fluctuating ping simulation for developer authenticity
    const interval = setInterval(() => {
      setSystemPing(prev => {
        const diff = Math.floor(Math.random() * 7) - 3;
        const next = prev + diff;
        return next > 45 ? 45 : next < 25 ? 25 : next;
      });
    }, 4000);

    const trackVisitor = async () => {
      if (sessionStorage.getItem('has_visited')) return;
      try {
        const res = await fetch('/api/analytics', { method: 'POST' });
        const json = await res.json();
        if (json.success) {
          setVisitorCount(json.views);
          sessionStorage.setItem('has_visited', 'true');
        }
      } catch (err) {
        console.error('Failed to increment views:', err);
      }
    };

    const fetchVisitorCount = async () => {
      try {
        const res = await fetch('/api/about');
        const json = await res.json();
        if (json.success) {
          setAboutData(json.data);
        }
        await trackVisitor();
      } catch (err) {
        console.error(err);
      }
    };

    fetchVisitorCount();
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="w-full mt-24 border-t border-card-border/40 relative overflow-hidden bg-gradient-to-b from-transparent to-card-bg/20">
      {/* Background Grid Accent */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(var(--primary-rgb),0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(var(--primary-rgb),0.02)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none -z-10" />

      {/* Top Border Status Telemetry Strip */}
      <div className="border-b border-card-border/30 bg-card-bg/10 backdrop-blur-sm py-4">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap items-center justify-between gap-4 text-[10px] font-mono tracking-wider text-text-muted">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-emerald-500 font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              NODE_ONLINE
            </span>
            <span className="text-card-border">|</span>
            <span>SECURE PORT: 443</span>
            <span className="text-card-border">|</span>
            <span>RTT: <span className="text-primary-main">{systemPing}ms</span></span>
          </div>
          <div className="flex items-center gap-2">
            <Server size={12} className="text-primary-main" />
            <span>LOC: <span className="text-text-base font-semibold">{aboutData?.address || 'Sylhet, BD'}</span></span>
          </div>
        </div>
      </div>

      {/* Main Footer Directory */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-12 gap-12">
        {/* Column 1: Bio Branding */}
        <div className="md:col-span-5 flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <Link href="/" className="text-lg font-black tracking-widest font-mono group flex items-center gap-2 w-fit">
              <Image 
                src="/logo.png" 
                alt="Logo" 
                width={32} 
                height={32} 
                className="w-8 h-8 object-contain" 
              />
              <span className="text-primary-main">{`//`}</span>
              <span className="bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500 bg-clip-text text-transparent group-hover:opacity-80 transition-opacity whitespace-nowrap">
                Mayruf Ahmed
              </span>
            </Link>
            <p className="text-xs text-text-muted leading-relaxed max-w-sm">
              Engineering high-performance web systems, hardened API services, and zero-trust serverless network nodes.
            </p>
          </div>

          {/* Direct Dynamic Contact Details */}
          {aboutData && (aboutData.email || aboutData.phone) && (
            <div className="flex flex-col gap-2.5 font-mono text-xs text-text-muted border-l border-card-border/80 pl-4 mt-2">
              {aboutData.email && (
                <div className="flex items-center gap-2 group">
                  <span className="text-primary-main">SEC_MAIL:</span>
                  <a
                    href={`mailto:${aboutData.email}`}
                    className="text-text-base hover:text-primary-main transition-colors duration-200"
                  >
                    {aboutData.email}
                  </a>
                </div>
              )}
              {aboutData.phone && (
                <div className="flex items-center gap-2">
                  <span className="text-accent-main">SEC_LINE:</span>
                  <span className="text-text-base">{aboutData.phone}</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Column 2: Navigation Map */}
        <div className="md:col-span-3 flex flex-col gap-4">
          <h4 className="text-xs font-mono font-bold tracking-widest text-text-muted uppercase">
            Directory Linkages
          </h4>
          <nav className="grid grid-cols-2 gap-3 text-sm">
            {[
              { label: 'Home', path: '/' },
              { label: 'About', path: '/about' },
              { label: 'Projects', path: '/projects' },
              { label: 'Gallery', path: '/gallery' },
              { label: 'Contact', path: '/contact' },
            ].map((link, idx) => (
              <Link
                key={idx}
                href={link.path}
                className="text-text-muted hover:text-primary-main transition-all duration-300 flex items-center gap-1 group w-fit"
              >
                <span>{link.label}</span>
                <ArrowUpRight size={12} className="opacity-0 -translate-y-0.5 group-hover:opacity-100 transition-all duration-300" />
              </Link>
            ))}
          </nav>
        </div>

        {/* Column 3: Security & Visual Telemetry */}
        <div className="md:col-span-4 flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <h4 className="text-xs font-mono font-bold tracking-widest text-text-muted uppercase">
              System Console
            </h4>
            <div className="glass-panel p-4 rounded-2xl border border-card-border/80 shadow-sm flex flex-col gap-3 font-mono text-[10px]">
              <div className="flex items-center justify-between">
                <span className="text-text-muted">ENCRYPTION:</span>
                <span className="flex items-center gap-1 text-primary-main font-semibold">
                  <Shield size={10} />
                  TLS_1.3_AES_256
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-text-muted">BUILD_ENV:</span>
                <span className="text-accent-main font-semibold">NEXTJS_v15_PROD</span>
              </div>
              {visitorCount !== null && (
                <div className="flex items-center justify-between pt-2 border-t border-card-border/30 mt-1">
                  <span className="text-text-muted flex items-center gap-1">
                    <Eye size={10} />
                    TOTAL_PEERS:
                  </span>
                  <span className="text-text-base font-bold bg-primary-main/10 px-2 py-0.5 rounded border border-primary-main/20 text-primary-main">
                    {visitorCount}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright & Social Strip */}
      <div className="border-t border-card-border/30 py-8 bg-card-bg/5">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* copyright info */}
          <div className="flex flex-col items-center sm:items-start gap-1">
            <p className="text-xs font-semibold font-mono tracking-wide text-text-base">
              © {new Date().getFullYear()} MAYRUF AHMED. ALL RIGHTS RESERVED.
            </p>
            <p className="text-[10px] text-text-muted font-mono">
              BUILD: SECURE_STATIC_EDGE // CERTIFIED BY CODESHIELD
            </p>
          </div>

          {/* Social connections */}
          <div className="flex items-center gap-3">
            {[
              { icon: <Github size={16} />, url: aboutData?.githubUrl || 'https://github.com', label: 'GitHub' },
              { icon: <Linkedin size={16} />, url: aboutData?.linkedinUrl || 'https://linkedin.com', label: 'LinkedIn' },
              { icon: <Facebook size={16} />, url: aboutData?.facebookUrl || 'https://facebook.com', label: 'Facebook' },
              { icon: <Twitter size={16} />, url: aboutData?.twitterUrl || 'https://twitter.com', label: 'Twitter' },
            ].map((social, index) => (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl border border-card-border/60 hover:border-primary-main/50 hover:text-primary-main bg-card-bg hover:shadow-lg hover:shadow-primary-main/5 hover:-translate-y-1 active:translate-y-0 transition-all duration-300"
                aria-label={social.label}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
