'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface SkillType {
  _id: string;
  name: string;
  category: 'Programming' | 'Frontend' | 'Backend' | 'Database' | 'Tools' | 'Cybersecurity';
  level: number;
}

interface SkillsProps {
  data: SkillType[];
}

const categories = ['All', 'Programming', 'Frontend', 'Backend', 'Database', 'Tools', 'Cybersecurity'];

export default function Skills({ data }: SkillsProps) {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredSkills = data
    ? activeCategory === 'All'
      ? data
      : data.filter((skill) => skill.category === activeCategory)
    : [];

  return (
    <section id="skills" className="py-20 relative overflow-hidden">
      {/* Decorative Blur */}
      <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-blue-500/5 rounded-full glow-blur -z-10" />

      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-xs uppercase font-mono tracking-widest text-primary-main bg-primary-main/10 border border-primary-main/20 px-3 py-1 rounded-full">
            Expertise
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold mt-3 bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">
            Skills & Abilities
          </h2>
          <p className="text-text-muted mt-2 text-sm sm:text-base max-w-md mx-auto">
            My technical competencies across programming, application development, and cybersecurity.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-xl transition-all duration-300 cursor-pointer ${
                activeCategory === category
                  ? 'bg-primary-main text-white shadow-md shadow-primary-main/20 border border-primary-main'
                  : 'glass-panel border-card-border hover:border-primary-main/50'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredSkills.length > 0 ? (
            filteredSkills.map((skill, index) => (
              <div
                key={skill._id || index}
                className="glass-panel p-6 rounded-2xl flex flex-col gap-4 border border-card-border/80 relative overflow-hidden group hover:border-primary-main/30 transition-colors duration-300"
              >
                <div className="flex items-center justify-between font-medium">
                  <span className="text-base tracking-tight font-bold">{skill.name}</span>
                  <span className="text-xs font-mono text-primary-main font-bold bg-primary-main/10 border border-primary-main/20 px-2.5 py-0.5 rounded-full">
                    {skill.level}%
                  </span>
                </div>

                {/* Progress Bar Container */}
                <div className="h-3 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden p-0.5 border border-card-border/30">
                  {/* Animated Progress Fill */}
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: 'easeOut', delay: index * 0.05 }}
                    className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
                  />
                </div>
                
                {/* Category tag */}
                <span className="absolute right-4 bottom-1.5 text-[8px] uppercase tracking-widest font-mono text-text-muted opacity-40">
                  {skill.category}
                </span>
              </div>
            ))
          ) : (
            <div className="col-span-2 text-center text-text-muted py-8">No skills found in this category.</div>
          )}
        </div>
      </div>
    </section>
  );
}
