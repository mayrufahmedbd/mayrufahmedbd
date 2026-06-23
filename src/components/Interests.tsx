'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Code2, Globe2, BookOpen, Terminal, Trophy } from 'lucide-react';

const interests = [
  {
    title: 'Football',
    icon: <Trophy className="text-emerald-500" size={24} />,
    emoji: '⚽',
    description: 'Passion for playing, watching, and analyzing football matches and tactics.',
    color: 'border-emerald-500/20 hover:border-emerald-500/50 bg-emerald-500/5',
  },
  {
    title: 'Programming',
    icon: <Code2 className="text-blue-500" size={24} />,
    emoji: '💻',
    description: 'Writing clean code, debugging, and solving algorithmic problems.',
    color: 'border-blue-500/20 hover:border-blue-500/50 bg-blue-500/5',
  },
  {
    title: 'Web Development',
    icon: <Globe2 className="text-violet-500" size={24} />,
    emoji: '🌐',
    description: 'Building modern, fully responsive, and highly interactive applications.',
    color: 'border-violet-500/20 hover:border-violet-500/50 bg-violet-500/5',
  },
  {
    title: 'Cybersecurity',
    icon: <Shield className="text-red-500" size={24} />,
    emoji: '🔐',
    description: 'Learning security protocols, cryptography, and network defense strategies.',
    color: 'border-red-500/20 hover:border-red-500/50 bg-red-500/5',
  },
  {
    title: 'Ethical Hacking',
    icon: <Terminal className="text-amber-500" size={24} />,
    emoji: '🛡',
    description: 'Exploring penetration testing labs, vulnerability assessments, and linux tools.',
    color: 'border-amber-500/20 hover:border-amber-500/50 bg-amber-500/5',
  },
  {
    title: 'Learning New Tech',
    icon: <BookOpen className="text-indigo-500" size={24} />,
    emoji: '📚',
    description: 'Consistently reading documentation and experimenting with emerging frameworks.',
    color: 'border-indigo-500/20 hover:border-indigo-500/50 bg-indigo-500/5',
  },
];

export default function Interests() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Decorative Blur */}
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-violet-500/5 rounded-full glow-blur -z-10" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-xs uppercase font-mono tracking-widest text-primary-main bg-primary-main/10 border border-primary-main/20 px-3 py-1 rounded-full">
            Passions
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold mt-3 bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">
            My Interests
          </h2>
          <p className="text-text-muted mt-2 text-sm sm:text-base max-w-md mx-auto">
            What keeps me motivated, curious, and energized outside and inside of work.
          </p>
        </div>

        {/* Interests Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {interests.map((item, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className={`glass-panel p-6 rounded-2xl border transition-all duration-300 hover:scale-[1.02] flex items-start gap-4 ${item.color}`}
            >
              {/* Icon Container */}
              <div className="p-3 bg-card-bg border border-card-border rounded-xl shadow-inner shrink-0">
                {item.icon}
              </div>

              {/* Text info */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-lg tracking-tight text-text-base">{item.title}</h3>
                  <span className="text-base select-none">{item.emoji}</span>
                </div>
                <p className="text-xs sm:text-sm text-text-muted leading-relaxed">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
