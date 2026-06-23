'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Cpu, Target, User, ArrowRight } from 'lucide-react';

interface AboutProps {
  data: {
    whoIAm: string;
    whatIDo: string[];
    whatIWantToDo: string[];
  };
}

export default function About({ data }: AboutProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section id="about" className="py-20 relative overflow-hidden">
      {/* Decorative Blur */}
      <div className="absolute top-1/2 right-0 w-80 h-80 bg-blue-500/5 rounded-full glow-blur -z-10" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-xs uppercase font-mono tracking-widest text-primary-main bg-primary-main/10 border border-primary-main/20 px-3 py-1 rounded-full">
            Biography
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold mt-3 bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">
            About Me
          </h2>
          <p className="text-text-muted mt-2 text-sm sm:text-base max-w-xl mx-auto">
            Discover my passion, what I currently focus on, and where I want to build my career.
          </p>
        </div>

        {/* Grid Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-12 gap-8"
        >
          {/* Who I Am */}
          <motion.div variants={itemVariants} className="md:col-span-12 lg:col-span-5 flex flex-col gap-4">
            <div className="glass-panel p-8 rounded-3xl h-full flex flex-col justify-center border-l-4 border-l-blue-500 shadow-lg">
              <div className="flex items-center gap-3 text-primary-main mb-4">
                <div className="p-2.5 rounded-2xl bg-blue-500/10 border border-blue-500/20">
                  <User size={22} />
                </div>
                <h3 className="text-xl font-bold tracking-tight text-text-base">Who I Am</h3>
              </div>
              <p className="text-base text-text-muted leading-relaxed">
                {data?.whoIAm ||
                  'My name is Mayruf Ahmed. I am passionate about programming, web development, and cybersecurity. I enjoy learning new technologies and building modern applications.'}
              </p>
            </div>
          </motion.div>

          {/* What I Do */}
          <motion.div variants={itemVariants} className="md:col-span-6 lg:col-span-3.5">
            <div className="glass-panel p-8 rounded-3xl h-full flex flex-col border-l-4 border-l-purple-500 shadow-lg">
              <div className="flex items-center gap-3 text-purple-400 mb-6">
                <div className="p-2.5 rounded-2xl bg-purple-500/10 border border-purple-500/20">
                  <Cpu size={22} />
                </div>
                <h3 className="text-xl font-bold tracking-tight text-text-base">What I Do</h3>
              </div>
              <ul className="flex flex-col gap-3">
                {(data?.whatIDo || [
                  'Web Development',
                  'Programming',
                  'Learning Cybersecurity',
                  'Exploring Ethical Hacking',
                  'Problem Solving',
                ]).map((item, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm text-text-muted">
                    <ArrowRight size={14} className="text-purple-400 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* What I Want To Do */}
          <motion.div variants={itemVariants} className="md:col-span-6 lg:col-span-3.5">
            <div className="glass-panel p-8 rounded-3xl h-full flex flex-col border-l-4 border-l-indigo-500 shadow-lg">
              <div className="flex items-center gap-3 text-indigo-400 mb-6">
                <div className="p-2.5 rounded-2xl bg-indigo-500/10 border border-indigo-500/20">
                  <Target size={22} />
                </div>
                <h3 className="text-xl font-bold tracking-tight text-text-base">What I Want To Do</h3>
              </div>
              <ul className="flex flex-col gap-3">
                {(data?.whatIWantToDo || [
                  'Full Stack Development',
                  'Cybersecurity',
                  'Ethical Hacking',
                  'Software Engineering',
                ]).map((item, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm text-text-muted">
                    <Shield size={14} className="text-indigo-400 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
