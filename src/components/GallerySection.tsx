'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, X } from 'lucide-react';
import Image from 'next/image';

interface GalleryImageType {
  _id: string;
  title: string;
  category: 'Profile' | 'Football' | 'Banner Designs' | 'Memories';
  imageUrl: string;
}

interface GallerySectionProps {
  data: GalleryImageType[];
}

const filterCategories = ['All', 'Profile', 'Football', 'Banner Designs', 'Memories'];

export default function GallerySection({ data }: GallerySectionProps) {
  const [activeTab, setActiveTab] = useState('All');
  const [lightboxImage, setLightboxImage] = useState<GalleryImageType | null>(null);

  const filteredImages = data
    ? activeTab === 'All'
      ? data
      : data.filter((img) => img.category === activeTab)
    : [];

  return (
    <section id="gallery" className="py-20 relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-blue-500/5 rounded-full glow-blur -z-10" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-xs uppercase font-mono tracking-widest text-primary-main bg-primary-main/10 border border-primary-main/20 px-3 py-1 rounded-full">
            Moments
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold mt-3 bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">
            My Gallery
          </h2>
          <p className="text-text-muted mt-2 text-sm sm:text-base max-w-md mx-auto">
            A visual showcase of my profile shots, football activities, graphics work, and tech memories.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {filterCategories.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-xl transition-all duration-300 cursor-pointer ${
                activeTab === tab
                  ? 'bg-primary-main text-white shadow-md shadow-primary-main/20 border border-primary-main'
                  : 'glass-panel border-card-border hover:border-primary-main/50'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredImages.length > 0 ? (
              filteredImages.map((image, index) => (
                <motion.div
                  key={image._id || index}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="relative group aspect-square rounded-2xl overflow-hidden glass-panel border border-card-border/80 shadow-md cursor-pointer hover:shadow-xl transition-all duration-300"
                  onClick={() => setLightboxImage(image)}
                >
                  <Image
                    src={image.imageUrl}
                    alt={image.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-white">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-primary-main mb-1">
                      {image.category}
                    </span>
                    <h3 className="text-sm font-bold truncate pr-6">{image.title}</h3>
                    <div className="absolute top-4 right-4 p-2 rounded-xl bg-white/10 backdrop-blur border border-white/20 hover:scale-110 active:scale-95 transition-transform">
                      <Maximize2 size={14} />
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center text-text-muted py-12">No media found in this category.</div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10"
            onClick={() => setLightboxImage(null)}
          >
            {/* Close Button */}
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 z-50 transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>

            {/* Lightbox Content Card */}
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="relative max-w-5xl max-h-[80vh] w-full h-full flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-full max-h-[70vh] flex items-center justify-center">
                <Image
                  src={lightboxImage.imageUrl}
                  alt={lightboxImage.title}
                  fill
                  sizes="100vw"
                  className="object-contain"
                />
              </div>

              {/* Description bar */}
              <div className="text-center mt-6 text-white max-w-xl">
                <span className="text-[10px] uppercase font-mono tracking-widest text-primary-main bg-primary-main/10 border border-primary-main/30 px-3 py-1 rounded-full">
                  {lightboxImage.category}
                </span>
                <h3 className="text-lg font-bold mt-2">{lightboxImage.title}</h3>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
