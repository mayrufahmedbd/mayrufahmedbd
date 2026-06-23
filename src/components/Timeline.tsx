'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Briefcase, Award } from 'lucide-react';

interface TimelineItemType {
  _id: string;
  period: 'Beginning' | 'Current' | 'Future Goal';
  title: string;
  description: string;
}

interface TimelineProps {
  data: TimelineItemType[];
}

export default function Timeline({ data }: TimelineProps) {
  const getIcon = (period: string) => {
    switch (period) {
      case 'Beginning':
        return <Calendar size={18} />;
      case 'Current':
        return <Briefcase size={18} />;
      case 'Future Goal':
      default:
        return <Award size={18} />;
    }
  };

  const getColor = (period: string) => {
    switch (period) {
      case 'Beginning':
        return 'text-blue-500 border-blue-500/30 bg-blue-500/10';
      case 'Current':
        return 'text-purple-400 border-purple-500/30 bg-purple-500/10';
      case 'Future Goal':
      default:
        return 'text-indigo-400 border-indigo-500/30 bg-indigo-500/10';
    }
  };

  return (
    <section id="journey" className="py-20 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/4 left-0 w-82 h-82 bg-purple-500/5 rounded-full glow-blur -z-10" />

      <div className="max-w-4xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-xs uppercase font-mono tracking-widest text-primary-main bg-primary-main/10 border border-primary-main/20 px-3 py-1 rounded-full">
            Milestones
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold mt-3 bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">
            Journey Timeline
          </h2>
          <p className="text-text-muted mt-2 text-sm sm:text-base max-w-md mx-auto">
            A chronological timeline of where I started, what I am learning now, and where I plan to go.
          </p>
        </div>

        {/* Timeline Line & Cards */}
        <div className="relative pl-6 sm:pl-8 border-l border-card-border/80 ml-4 sm:ml-6 flex flex-col gap-12">
          {data && data.length > 0 ? (
            data.map((item, index) => (
              <motion.div
                key={item._id || index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative"
              >
                {/* Connector Dot */}
                <div
                  className={`absolute -left-[38px] sm:-left-[46px] top-1.5 p-2 rounded-full border glass-panel shadow-md z-10 ${getColor(
                    item.period
                  )}`}
                >
                  {getIcon(item.period)}
                </div>

                {/* Timeline Card */}
                <div className="glass-panel p-6 sm:p-8 rounded-3xl shadow-lg border border-card-border/80 hover:border-primary-main/30 transition-all duration-300">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                    <span
                      className={`text-xs uppercase font-mono tracking-wider px-3 py-1 border rounded-full w-fit ${getColor(
                        item.period
                      )}`}
                    >
                      {item.period}
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold tracking-tight">{item.title}</h3>
                  </div>
                  <p className="text-sm sm:text-base text-text-muted leading-relaxed whitespace-pre-line">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="text-center text-text-muted py-8">No journey entries found.</div>
          )}
        </div>
      </div>
    </section>
  );
}
