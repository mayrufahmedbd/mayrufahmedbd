'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Calendar, Eye, ArrowRight, Tag } from 'lucide-react';
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

interface BlogClientListProps {
  initialBlogs: BlogType[];
}

export default function BlogClientList({ initialBlogs }: BlogClientListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Extract all unique tags
  const allTags = useMemo(() => {
    const tagsSet = new Set<string>();
    initialBlogs.forEach((blog) => {
      blog.tags.forEach((tag) => tagsSet.add(tag));
    });
    return Array.from(tagsSet);
  }, [initialBlogs]);

  // Filtered blogs list
  const filteredBlogs = useMemo(() => {
    return initialBlogs.filter((blog) => {
      const matchesSearch =
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesTag = selectedTag ? blog.tags.includes(selectedTag) : true;

      return matchesSearch && matchesTag;
    });
  }, [initialBlogs, searchQuery, selectedTag]);

  return (
    <div className="flex flex-col gap-10">
      
      {/* Search & Tag Controls */}
      <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
        
        {/* Search Input */}
        <div className="relative w-full md:max-w-md">
          <input
            type="text"
            placeholder="Search articles or tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-card-border bg-input-bg text-text-base focus:border-primary-main focus:outline-none transition-colors duration-200"
          />
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
        </div>

        {/* Tag Filters */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-start md:justify-end">
          <button
            onClick={() => setSelectedTag(null)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer border ${
              selectedTag === null
                ? 'bg-primary-main border-primary-main text-white'
                : 'glass-panel border-card-border hover:border-primary-main/50'
            }`}
          >
            All Tags
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer border flex items-center gap-1.5 ${
                selectedTag === tag
                  ? 'bg-primary-main border-primary-main text-white'
                  : 'glass-panel border-card-border hover:border-primary-main/50'
              }`}
            >
              <Tag size={12} />
              <span>{tag}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Blogs Grid */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[400px]">
        <AnimatePresence mode="popLayout">
          {filteredBlogs.length > 0 ? (
            filteredBlogs.map((blog, index) => (
              <motion.div
                key={blog._id || index}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
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
                        <button
                          key={tIndex}
                          onClick={() => setSelectedTag(tag)}
                          className="text-[9px] font-mono text-text-muted bg-card-bg border border-card-border px-2 py-0.5 rounded cursor-pointer hover:border-primary-main"
                        >
                          #{tag}
                        </button>
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
            <div className="col-span-full flex flex-col items-center justify-center py-20 text-center text-text-muted">
              <p className="text-lg font-bold">No articles match your criteria.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedTag(null);
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
