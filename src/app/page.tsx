import React from 'react';
import Link from 'next/link';
import { ArrowRight, Shield, Terminal, Lock, Binary } from 'lucide-react';
import dbConnect from '@/lib/dbConnect';
import AboutModel from '@/models/About';
import { seedDatabase } from '@/lib/seed';

// Import components
import Hero from '@/components/Hero';
import TechMarquee from '@/components/TechMarquee';
import SecurityTerminal from '@/components/SecurityTerminal';

// Force dynamic rendering to ensure fresh views and dynamic tracking
export const revalidate = 0;

async function getDashboardData() {
  await dbConnect();

  // Try to find the about page info
  let about = await AboutModel.findOne();
  if (!about) {
    // Database is empty. Seed it.
    await seedDatabase();
    about = await AboutModel.findOne();
  }

  return {
    about: JSON.parse(JSON.stringify(about)),
  };
}

export default async function HomePage() {
  const { about } = await getDashboardData();

  return (
    <div className="relative overflow-x-hidden min-h-screen">
      {/* 1. Hero Splash Screen */}
      <Hero data={about} />

      {/* 2. Infinite Tech Marquee */}
      <TechMarquee />

      {/* 3. DevSec Telemetry Stats Grid */}
      <section className="py-12 bg-card-bg/5 border-b border-card-border/30 relative">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: 'Active CTF Rank',
              value: '1,337 PTS',
              desc: 'Global hackthebox scoring',
              icon: <Terminal size={18} className="text-emerald-500" />,
              glow: 'hover:border-emerald-500/30 hover:shadow-emerald-500/5',
            },
            {
              title: 'Secure Builds',
              value: '14 Active',
              desc: 'Protected serverless nodes',
              icon: <Lock size={18} className="text-blue-500" />,
              glow: 'hover:border-blue-500/30 hover:shadow-blue-500/5',
            },
            {
              title: 'Shell Invocations',
              value: '142 Sessions',
              desc: 'Linux environments executed',
              icon: <Binary size={18} className="text-purple-400" />,
              glow: 'hover:border-purple-500/30 hover:shadow-purple-500/5',
            },
            {
              title: 'Vulnerabilities Patched',
              value: '42 Patches',
              desc: 'OWASP security compliance',
              icon: <Shield size={18} className="text-red-400" />,
              glow: 'hover:border-red-500/30 hover:shadow-red-500/5',
            },
          ].map((stat, index) => (
            <div
              key={index}
              className={`glass-panel p-6 rounded-2xl border border-card-border/80 shadow-sm flex items-start justify-between transition-all duration-300 hover:scale-[1.02] ${stat.glow}`}
            >
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-text-muted">{stat.title}</span>
                <p className="text-2xl font-extrabold font-mono text-text-base">{stat.value}</p>
                <span className="text-[10px] text-text-muted">{stat.desc}</span>
              </div>
              <div className="p-3 bg-card-bg border border-card-border rounded-xl shadow-inner shrink-0">
                {stat.icon}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Biography & Security Terminal */}
      <section id="about-summary" className="py-24 relative overflow-hidden">
        {/* Soft background glows */}
        <div className="absolute top-1/4 left-1/3 w-80 h-80 bg-blue-500/5 rounded-full glow-blur -z-10" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/5 rounded-full glow-blur -z-10" />

        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Biography Details */}
            <div className="lg:col-span-6 flex flex-col gap-6">
              <span className="text-xs uppercase font-mono tracking-widest text-primary-main bg-primary-main/10 border border-primary-main/20 px-3 py-1 rounded-full w-fit">
                Biography Summary
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500 bg-clip-text text-transparent tracking-tight">
                Engineering Secure Web Systems
              </h2>
              <p className="text-base text-text-muted leading-relaxed">
                {about?.whoIAm || 'I am passionate about programming, web development, and cybersecurity. I enjoy learning new technologies and building modern, robust, and highly secure applications.'}
              </p>
              
              <div className="flex flex-col gap-3 font-mono text-xs text-text-muted mt-2">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-main" />
                  <span>Main Stack: Node.js, Next.js, TypeScript & Mongoose</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-main" />
                  <span>Security Fields: Vulnerability assessments, Linux kernel & port scans</span>
                </div>
              </div>

              <Link
                href="/about"
                className="flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/20 hover:scale-[1.03] transition-all duration-300 w-fit cursor-pointer mt-2"
              >
                <span>Explore Full Biography</span>
                <ArrowRight size={16} />
              </Link>
            </div>

            {/* Interactive Security Console (Terminal) Playground */}
            <div className="lg:col-span-6 flex flex-col gap-4">
              <div className="flex items-center justify-between text-xs text-text-muted px-2">
                <span className="font-mono">INTELLIGENCE TERMINAL</span>
                <span className="flex items-center gap-1.5 text-emerald-500 font-mono">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  SHELL ACTIVE
                </span>
              </div>
              <SecurityTerminal />
            </div>

          </div>
        </div>
      </section>

      {/* 5. Active Missions Operations Panel */}
      <section className="py-24 relative overflow-hidden border-t border-card-border/30 bg-gradient-to-b from-transparent via-primary-main/2 to-transparent">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="text-xs uppercase font-mono tracking-widest text-primary-main bg-primary-main/10 border border-primary-main/20 px-3 py-1 rounded-full">
              Operations Center
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold mt-3 bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">
              Active Security & Dev Missions
            </h2>
            <p className="text-text-muted mt-2 text-sm sm:text-base max-w-md mx-auto">
              Real-time monitoring of current engineering focuses and cybersecurity projects.
            </p>
          </div>

          {/* Missions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                id: 'MSN-01',
                title: 'Zero Trust API Core',
                category: 'CYBER_DEFENSE',
                desc: 'Hardening backend endpoints with helmet security headers, rate limiters, and strict JWT signature validations.',
                tech: ['Node.js', 'Express', 'JWT', 'Helmet'],
                status: 'DEPLOYED',
                statusColor: 'bg-green-500 text-green-500 bg-green-500/10 border-green-500/20',
                statusIcon: <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />,
              },
              {
                id: 'MSN-02',
                title: 'Recon Port Auditor',
                category: 'OFFENSIVE_RECON',
                desc: 'Multi-threaded service scanning utility querying port statuses and cross-referencing active CVE vulnerability databases.',
                tech: ['Python', 'Socket API', 'Vuln DB', 'Threading'],
                status: 'SCANNING',
                statusColor: 'bg-blue-500 text-blue-400 bg-blue-500/10 border-blue-500/20',
                statusIcon: <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />,
              },
              {
                id: 'MSN-03',
                title: 'Decoupled Edge Cache',
                category: 'INFRASTRUCTURE',
                desc: 'Connecting dynamic Next.js components to globally cached database pipelines for optimized web rendering loads.',
                tech: ['Next.js', 'React', 'MongoDB', 'Cloudinary'],
                status: 'STABLE',
                statusColor: 'bg-teal-500 text-teal-400 bg-teal-500/10 border-teal-500/20',
                statusIcon: <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />,
              },
            ].map((mission, index) => (
              <div
                key={index}
                className="glass-panel rounded-3xl p-8 border border-card-border/80 shadow-md hover:border-primary-main/30 hover:scale-[1.01] transition-all duration-300 flex flex-col justify-between h-full group relative overflow-hidden"
              >
                {/* Micro Ambient Corner Glow */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary-main/10 to-transparent blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="flex flex-col gap-4">
                  {/* Mission ID and Category */}
                  <div className="flex items-center justify-between text-[10px] font-mono tracking-widest text-text-muted">
                    <span>{mission.id}</span>
                    <span className="bg-primary-main/5 px-2 py-0.5 rounded border border-primary-main/15 text-primary-main">
                      {mission.category}
                    </span>
                  </div>

                  {/* Title and description */}
                  <div className="flex flex-col gap-2">
                    <h3 className="text-xl font-bold tracking-tight group-hover:text-primary-main transition-colors duration-300">
                      {mission.title}
                    </h3>
                    <p className="text-sm text-text-muted leading-relaxed line-clamp-3">
                      {mission.desc}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-4 mt-6">
                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-1.5">
                    {mission.tech.map((t, idx) => (
                      <span
                        key={idx}
                        className="text-[9px] font-mono text-text-muted bg-card-bg border border-card-border px-2 py-0.5 rounded"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Status Indicator */}
                  <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-mono font-semibold justify-center ${mission.statusColor}`}>
                    {mission.statusIcon}
                    <span>{mission.status}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* View All Projects Route CTA */}
          <div className="flex justify-center mt-12">
            <Link
              href="/projects"
              className="flex items-center gap-2 px-6 py-3 border border-card-border hover:border-primary-main glass-panel text-text-base hover:text-primary-main font-semibold rounded-xl transition-all duration-300 cursor-pointer hover:scale-105"
            >
              <span>View Detailed Projects Portfolio</span>
              <ArrowRight size={15} />
            </Link>
          </div>

        </div>
      </section>

      {/* 6. Collaboration Call To Action */}
      <section className="py-24 relative overflow-hidden border-t border-card-border/30">
        <div className="max-w-4xl mx-auto px-6">
          <div className="glass-panel p-10 md:p-16 rounded-3xl border border-card-border/80 shadow-2xl flex flex-col items-center text-center gap-6 relative overflow-hidden">
            {/* Decorative Glow */}
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />

            <span className="text-xs uppercase font-mono tracking-widest text-primary-main bg-primary-main/10 border border-primary-main/20 px-3 py-1 rounded-full">
              Get In Touch
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500 bg-clip-text text-transparent">
              Let&apos;s Collaborate On Your Next Project
            </h2>
            <p className="text-base text-text-muted max-w-lg leading-relaxed">
              Whether you have a web application idea, security questions, or just want to connect, feel free to drop me a line. I&apos;ll get back to you as soon as possible!
            </p>
            <Link
              href="/contact"
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-blue-500/20 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
            >
              Contact Me Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
