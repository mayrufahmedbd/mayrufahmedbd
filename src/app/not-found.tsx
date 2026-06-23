'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShieldAlert, Home, ArrowLeft } from 'lucide-react';
import ParticleBackground from '@/components/ParticleBackground';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#030712] text-[#f9fafb] flex items-center justify-center px-6 relative overflow-hidden">
      {/* Dynamic particles in background */}
      <ParticleBackground />

      {/* Glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-500/10 rounded-full glow-blur -z-10" />

      <div className="max-w-md w-full text-center flex flex-col items-center gap-6 relative z-10">
        
        {/* Warning Icon Card */}
        <motion.div
          initial={{ scale: 0.8, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.5, type: 'spring' }}
          className="p-5 bg-red-500/10 border border-red-500/30 rounded-3xl text-red-500 shadow-lg shadow-red-500/5"
        >
          <ShieldAlert size={48} />
        </motion.div>

        {/* 404 Error Header */}
        <div className="flex flex-col gap-2">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xs font-mono uppercase tracking-widest text-red-400 font-bold"
          >
            Vulnerability detected: 404 Not Found
          </motion.span>
          <h1 className="text-7xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-pink-500 to-rose-500">
            404
          </h1>
          <p className="text-base text-text-muted mt-2">
            The system could not resolve the requested path. It may have been relocated, deleted, or never existed in the database.
          </p>
        </div>

        {/* Back Actions */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full mt-4"
        >
          <Link
            href="/"
            className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/20 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
          >
            <Home size={16} />
            <span>Return Home</span>
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="flex items-center justify-center gap-2 w-full px-6 py-3 border border-card-border hover:border-red-500/40 glass-panel text-text-base font-semibold rounded-xl hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
          >
            <ArrowLeft size={16} />
            <span>Go Back</span>
          </button>
        </motion.div>
      </div>
    </div>
  );
}
