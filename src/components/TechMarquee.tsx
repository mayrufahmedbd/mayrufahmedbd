'use client';

import React from 'react';
import { Shield, Cpu, Code2, Database, Globe2, Terminal, Server, Key, GitBranch, Layers, Box } from 'lucide-react';

const techItems = [
  { name: 'JavaScript', icon: <Code2 size={16} className="text-yellow-500" /> },
  { name: 'TypeScript', icon: <Code2 size={16} className="text-blue-500" /> },
  { name: 'React.js', icon: <Layers size={16} className="text-cyan-400" /> },
  { name: 'Next.js', icon: <Globe2 size={16} className="text-text-base" /> },
  { name: 'Node.js', icon: <Server size={16} className="text-green-500" /> },
  { name: 'Express.js', icon: <Server size={16} className="text-gray-400" /> },
  { name: 'MongoDB', icon: <Database size={16} className="text-emerald-500" /> },
  { name: 'Cybersecurity', icon: <Shield size={16} className="text-red-500" /> },
  { name: 'Ethical Hacking', icon: <Terminal size={16} className="text-amber-500" /> },
  { name: 'Linux OS', icon: <Box size={16} className="text-orange-500" /> },
  { name: 'Git & GitHub', icon: <GitBranch size={16} className="text-indigo-400" /> },
  { name: 'Web Security', icon: <Key size={16} className="text-purple-400" /> },
];

export default function TechMarquee() {
  // Duplicate items array to make a seamless infinite marquee scroll
  const marqueeItems = [...techItems, ...techItems];

  return (
    <div className="w-full py-8 bg-card-bg/20 border-y border-card-border/50 relative overflow-hidden backdrop-blur-sm select-none animate-marquee-hover-pause">
      {/* Soft gradient fades on left & right edges to hide sharp edges */}
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-bg-base to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-bg-base to-transparent z-10 pointer-events-none" />

      <div className="animate-marquee flex items-center gap-6">
        {marqueeItems.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-2.5 px-5 py-2.5 rounded-2xl glass-panel border border-card-border hover:border-primary-main/30 shadow-sm hover:scale-[1.03] transition-all duration-300 shrink-0 font-mono text-xs font-semibold tracking-wider text-text-base cursor-default"
          >
            {item.icon}
            <span>{item.name.toUpperCase()}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
