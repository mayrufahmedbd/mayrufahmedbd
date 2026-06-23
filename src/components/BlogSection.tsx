'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Calendar, Eye, ArrowRight } from 'lucide-react';
import Image from 'next/image';

interface BlogType {
  _id: string;
  title: string;
  slug: string;
  coverImage: string;
  createdAt: string;
  views: number;
  tags: string[];
}

interface BlogSectionProps {
  data: BlogType[];
}

export default function BlogSection({ data }: BlogSectionProps) {
  // Take only the 3 most recent blogs for landing page preview
  const recentBlogs = data ? data.slice(0, 3) : [];

  return (
    <section id="blog" className="py-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute bottom-1/3 left-0 w-72 h-72 bg-purple-500/5 rounded-full glow-blur -z-10" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <span className="text-xs uppercase font-mono tracking-widest text-primary-main bg-primary-main/10 border border-primary-main/20 px-3 py-1 rounded-full">
              Articles
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold mt-3 bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">
              Latest Blog Posts
            </h2>
            <p className="text-text-muted mt-2 text-sm sm:text-base max-w-md">
              Tutorials, journey notes, and guides on Web Development, Databases, and Cybersecurity.
            </p>
          </div>
          
          <Link
            href="/blog"
            className="flex items-center gap-2 text-sm font-semibold text-primary-main hover:text-primary-main/80 transition-colors group cursor-pointer"
          >
            <span>View All Articles</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Blogs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recentBlogs.length > 0 ? (
            recentBlogs.map((blog, index) => (
              <motion.div
                key={blog._id || index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass-panel rounded-3xl overflow-hidden flex flex-col h-full border border-card-border/80 hover:border-primary-main/30 shadow-lg group hover:scale-[1.01] transition-all duration-300"
              >
                {/* Cover Image */}
                <Link href={`/blog/${blog.slug}`} className="relative w-full h-48 bg-slate-900 overflow-hidden block">
                  <Image
                    src={blog.coverImage || 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=400'}
                    alt={blog.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </Link>

                {/* Card Content */}
                <div className="p-6 flex flex-col flex-grow justify-between gap-4">
                  <div className="flex flex-col gap-2">
                    {/* Date and Views */}
                    <div className="flex items-center gap-4 text-xs text-text-muted font-mono">
                      <span className="flex items-center gap-1">
                        <Calendar size={13} />
                        {new Date(blog.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye size={13} />
                        {blog.views} views
                      </span>
                    </div>

                    <Link href={`/blog/${blog.slug}`} className="block group/title">
                      <h3 className="text-lg font-bold tracking-tight group-hover/title:text-primary-main transition-colors line-clamp-2">
                        {blog.title}
                      </h3>
                    </Link>
                  </div>

                  <div className="flex flex-col gap-4 mt-auto">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1">
                      {blog.tags.map((tag, tIndex) => (
                        <span
                          key={tIndex}
                          className="text-[9px] font-mono text-text-muted bg-card-bg border border-card-border px-2 py-0.5 rounded"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <Link
                      href={`/blog/${blog.slug}`}
                      className="flex items-center gap-1.5 text-xs font-semibold text-primary-main hover:underline pt-2 border-t border-card-border/60 w-fit cursor-pointer"
                    >
                      <span>Read Article</span>
                      <ArrowRight size={12} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-3 text-center text-text-muted py-8">Writing guides! New articles are coming soon.</div>
          )}
        </div>
      </div>
    </section>
  );
}
