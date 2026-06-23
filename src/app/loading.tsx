'use client';

import React from 'react';

export default function RootLoading() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-24 flex flex-col gap-12">
      {/* Header skeleton */}
      <div className="flex flex-col items-center gap-4 text-center animate-pulse">
        <div className="h-6 w-24 bg-gray-250 dark:bg-gray-800 rounded-full" />
        <div className="h-10 w-64 bg-gray-350 dark:bg-gray-700 rounded-xl" />
        <div className="h-4 w-96 bg-gray-250 dark:bg-gray-800 rounded-lg mt-2" />
      </div>

      {/* Grid skeletons */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3].map((n) => (
          <div
            key={n}
            className="glass-panel p-6 rounded-3xl border border-card-border/80 flex flex-col gap-5 animate-pulse"
          >
            {/* Image placeholder */}
            <div className="w-full h-48 bg-gray-300 dark:bg-gray-800 rounded-2xl" />

            {/* Metadata placeholder */}
            <div className="flex gap-4">
              <div className="h-3 w-16 bg-gray-250 dark:bg-gray-850 rounded" />
              <div className="h-3 w-16 bg-gray-250 dark:bg-gray-850 rounded" />
            </div>

            {/* Title placeholder */}
            <div className="h-5 w-full bg-gray-350 dark:bg-gray-700 rounded-lg" />
            <div className="h-3.5 w-5/6 bg-gray-250 dark:bg-gray-800 rounded-lg" />

            {/* Footer placeholder */}
            <div className="flex gap-2 pt-4 border-t border-card-border/40">
              <div className="h-3 w-12 bg-gray-200 dark:bg-gray-850 rounded" />
              <div className="h-3 w-12 bg-gray-200 dark:bg-gray-850 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
