'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Github, ExternalLink, Code } from 'lucide-react';
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

interface ProjectsClientListProps {
  initialProjects: ProjectType[];
}

export default function ProjectsClientList({ initialProjects }: ProjectsClientListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTech, setSelectedTech] = useState<string | null>(null);

  // Extract all unique tech tags
  const allTech = useMemo(() => {
    const techSet = new Set<string>();
    initialProjects.forEach((proj) => {
      proj.tech.forEach((tag) => techSet.add(tag));
    });
    return Array.from(techSet);
  }, [initialProjects]);

  // Filtered projects list
  const filteredProjects = useMemo(() => {
    return initialProjects.filter((proj) => {
      const matchesSearch =
        proj.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        proj.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        proj.tech.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesTech = selectedTech ? proj.tech.includes(selectedTech) : true;

      return matchesSearch && matchesTech;
    });
  }, [initialProjects, searchQuery, selectedTech]);

  return (
    <div className="flex flex-col gap-10">
      {/* Search & Tag Controls */}
      <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
        {/* Search Input */}
        <div className="relative w-full md:max-w-md">
          <input
            type="text"
            placeholder="Search projects or technologies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-card-border bg-input-bg text-text-base focus:border-primary-main focus:outline-none transition-colors duration-200"
          />
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
        </div>

        {/* Tech Stack Filters */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-start md:justify-end">
          <button
            onClick={() => setSelectedTech(null)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer border ${
              selectedTech === null
                ? 'bg-primary-main border-primary-main text-white'
                : 'glass-panel border-card-border hover:border-primary-main/50'
            }`}
          >
            All Tech
          </button>
          {allTech.map((tech) => (
            <button
              key={tech}
              onClick={() => setSelectedTech(tech)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer border ${
                selectedTech === tech
                  ? 'bg-primary-main border-primary-main text-white'
                  : 'glass-panel border-card-border hover:border-primary-main/50'
              }`}
            >
              <span>{tech}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[400px]">
        <AnimatePresence mode="popLayout">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project, index) => (
              <motion.div
                key={project._id || index}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
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

                {/* Card Content */}
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
                        <button
                          key={tIndex}
                          onClick={() => setSelectedTech(tag)}
                          className="text-[10px] font-mono font-semibold text-primary-main bg-primary-main/5 border border-primary-main/15 px-2.5 py-0.5 rounded-md cursor-pointer hover:bg-primary-main/10"
                        >
                          {tag}
                        </button>
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
            <div className="col-span-full flex flex-col items-center justify-center py-20 text-center text-text-muted">
              <p className="text-lg font-bold">No projects match your search criteria.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedTech(null);
                }}
                className="mt-4 px-4 py-2 bg-primary-main text-white rounded-xl text-sm font-semibold cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
