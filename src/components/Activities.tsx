'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Trophy } from 'lucide-react';

interface ActivityType {
  learning: string[];
  goals: string[];
}

interface ActivitiesProps {
  data: ActivityType;
}

export default function Activities({ data }: ActivitiesProps) {
  const defaultLearning = ['Next.js', 'MongoDB', 'Backend Development', 'Cybersecurity Fundamentals'];
  const defaultGoals = ['Become a Full Stack Developer and Cybersecurity Specialist.'];

  const learningList = data?.learning || defaultLearning;
  const goalsList = data?.goals || defaultGoals;

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Glow Blur Decor */}
      <div className="absolute top-1/2 right-0 w-80 h-80 bg-blue-500/5 rounded-full glow-blur -z-10" />

      <div className="max-w-4xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-xs uppercase font-mono tracking-widest text-primary-main bg-primary-main/10 border border-primary-main/20 px-3 py-1 rounded-full">
            Focus
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold mt-3 bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">
            Current Activities
          </h2>
          <p className="text-text-muted mt-2 text-sm sm:text-base max-w-md mx-auto">
            What I am actively learning right now and what targets I am pursuing.
          </p>
        </div>

        {/* Dual Panel Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Currently Learning Panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-panel p-8 rounded-3xl border border-card-border/80 hover:border-primary-main/30 shadow-lg group transition-colors duration-300"
          >
            <div className="flex items-center gap-3 text-primary-main mb-6">
              <div className="p-3 bg-primary-main/10 border border-primary-main/20 rounded-2xl">
                <BookOpen size={20} />
              </div>
              <h3 className="text-xl font-bold tracking-tight text-text-base">Currently Learning</h3>
            </div>

            <ul className="flex flex-col gap-4">
              {learningList.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-primary-main/10 text-primary-main text-[10px] font-bold shrink-0 mt-0.5">
                    {index + 1}
                  </span>
                  <span className="text-sm sm:text-base text-text-muted font-medium leading-relaxed">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Current Goal Panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="glass-panel p-8 rounded-3xl border border-card-border/80 hover:border-accent-main/30 shadow-lg group transition-colors duration-300"
          >
            <div className="flex items-center gap-3 text-accent-main mb-6">
              <div className="p-3 bg-accent-main/10 border border-accent-main/20 rounded-2xl">
                <Trophy size={20} />
              </div>
              <h3 className="text-xl font-bold tracking-tight text-text-base">Current Goals</h3>
            </div>

            <div className="flex flex-col gap-4 justify-center h-[calc(100%-80px)]">
              {goalsList.map((item, index) => (
                <div
                  key={index}
                  className="p-4 sm:p-5 rounded-2xl bg-accent-main/5 border border-accent-main/20 text-sm sm:text-base text-text-base font-semibold leading-relaxed"
                >
                  {item}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
