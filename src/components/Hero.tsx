'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Typewriter from './Typewriter';
import ParticleBackground from './ParticleBackground';
import Link from 'next/link';
import { Download, Mail, ArrowDown } from 'lucide-react';
import Image from 'next/image';

interface HeroProps {
  data: {
    name: string;
    title: string;
    typingAnimations: string[];
    profileImage: string;
    resumeUrl: string;
    address?: string;
  };
}

export default function Hero({ data }: HeroProps) {
  return (
    <section id="home" className="relative min-h-[90vh] flex items-center justify-center py-20 overflow-hidden">
      {/* Interactive Background */}
      <ParticleBackground />

      {/* Decorative Glows */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500/10 dark:bg-blue-500/5 rounded-full glow-blur animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 dark:bg-purple-500/5 rounded-full glow-blur animate-pulse-slow" />

      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left gap-6"
        >
          <span className="text-xs uppercase font-mono tracking-widest px-3 py-1.5 border border-primary-main/20 rounded-full text-primary-main bg-primary-main/5">
            Welcome to my portfolio
          </span>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
            Hi, I&apos;m{' '}
            <span className="bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500 bg-clip-text text-transparent">
              {data?.name || 'Mayruf Ahmed'}
            </span>
          </h1>

          <div className="text-xl sm:text-2xl text-text-muted font-medium min-h-[40px]">
            I am a <Typewriter words={data?.typingAnimations || ['Developer', 'Programmer', 'Cybersecurity Enthusiast']} />
          </div>

          <p className="text-base text-text-muted max-w-lg leading-relaxed">
            {data?.title || 'Web Developer | Programmer | Cybersecurity Enthusiast'}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mt-4 w-full sm:w-auto">
            <a
              href={data?.resumeUrl || '#'}
              download={!!data?.resumeUrl}
              onClick={(e) => {
                if (!data?.resumeUrl) {
                  e.preventDefault();
                  alert('Resume PDF is currently being updated by Mayruf! You will be able to download it soon or upload it in the admin panel.');
                }
              }}
              className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium rounded-xl shadow-lg shadow-blue-500/20 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
            >
              <Download size={18} />
              Download Resume
            </a>

            <Link
              href="/contact"
              className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3.5 border border-card-border hover:border-primary-main glass-panel text-text-base font-medium rounded-xl hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
            >
              <Mail size={18} />
              Contact Me
            </Link>
          </div>
        </motion.div>

        {/* Profile Image & Graphics */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-5 flex justify-center"
        >
          <div className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96">
            {/* Ambient Background Circles */}
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 to-violet-500 rounded-3xl rotate-6 scale-95 opacity-20 blur-xl animate-pulse-slow" />
            <div className="absolute inset-0 bg-gradient-to-bl from-indigo-500 to-pink-500 rounded-3xl -rotate-6 scale-95 opacity-20 blur-xl animate-pulse-slow" />

            {/* Main Picture Card */}
            <div className="absolute inset-0 glass-panel border border-card-border/80 rounded-3xl p-3 shadow-2xl flex items-center justify-center overflow-hidden hover:-rotate-1 hover:scale-[1.02] transition-all duration-500 group">
              <div className="relative w-full h-full rounded-2xl overflow-hidden bg-slate-900 flex items-center justify-center">
                <Image
                  src={data?.profileImage || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=400'}
                  alt={data?.name || 'Mayruf Ahmed'}
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  priority
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                
                {/* Tech Badges overlaid */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-center gap-2 bg-slate-950/80 backdrop-blur border border-white/10 px-3 py-2 rounded-xl text-[10px] font-mono text-white">
                  <span>LOC: {data?.address || 'Sylhet, BD'}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Down arrow link indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce hidden md:block">
        <a href="#about-summary" aria-label="Scroll to About me">
          <ArrowDown size={20} className="text-text-muted hover:text-primary-main transition-colors" />
        </a>
      </div>
    </section>
  );
}
