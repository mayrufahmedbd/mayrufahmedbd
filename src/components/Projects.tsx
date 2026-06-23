'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Code } from 'lucide-react';
import Image from 'next/image';

interface ProjectType {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  tech: string[];
  githubUrl: string;
  liveUrl: string;
}

interface ProjectsProps {
  data: ProjectType[];
}

export default function Projects({ data }: ProjectsProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section id="projects" className="py-20 relative overflow-hidden">
      {/* Glow Blur decoration */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-indigo-500/5 rounded-full glow-blur -z-10" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-xs uppercase font-mono tracking-widest text-primary-main bg-primary-main/10 border border-primary-main/20 px-3 py-1 rounded-full">
            Portfolio
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold mt-3 bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <p className="text-text-muted mt-2 text-sm sm:text-base max-w-md mx-auto">
            A curated showcase of applications and repositories I have built or contributed to.
          </p>
        </div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {data && data.length > 0 ? (
            data.map((project, index) => (
              <motion.div
                key={project._id || index}
                variants={cardVariants}
                className="glass-panel rounded-3xl overflow-hidden flex flex-col h-full border border-card-border/80 hover:border-primary-main/30 shadow-lg group hover:scale-[1.01] transition-all duration-300"
              >
                {/* Project Image */}
                <div className="relative w-full h-48 bg-slate-900 overflow-hidden">
                  <Image
                    src={project.imageUrl || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=400'}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <span className="text-[10px] font-mono text-white/90 bg-black/40 backdrop-blur px-2.5 py-1 rounded border border-white/10 flex items-center gap-1">
                      <Code size={10} /> Active Build
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 flex flex-col flex-grow gap-4 justify-between">
                  <div className="flex flex-col gap-2">
                    <h3 className="text-xl font-bold tracking-tight group-hover:text-primary-main transition-colors duration-200">
                      {project.title}
                    </h3>
                    <p className="text-sm text-text-muted leading-relaxed line-clamp-3">
                      {project.description}
                    </p>
                  </div>

                  <div className="flex flex-col gap-4 mt-auto">
                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1.5">
                      {project.tech.map((tag, tIndex) => (
                        <span
                          key={tIndex}
                          className="text-[10px] font-mono font-semibold text-primary-main bg-primary-main/5 border border-primary-main/15 px-2.5 py-0.5 rounded-md"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Action Links */}
                    <div className="flex items-center gap-3 pt-2 border-t border-card-border/60">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-xs font-semibold hover:text-primary-main transition-colors"
                        >
                          <Github size={15} />
                          <span>Codebase</span>
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-xs font-semibold hover:text-accent-main transition-colors ml-auto"
                        >
                          <ExternalLink size={15} />
                          <span>Live Demo</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-3 text-center text-text-muted py-8">No projects currently listed. Check back soon!</div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
