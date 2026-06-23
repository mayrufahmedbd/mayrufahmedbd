import React from 'react';
import dbConnect from '@/lib/dbConnect';
import BlogModel from '@/models/Blog';
import BlogClientList from '@/components/BlogClientList';

export const revalidate = 0;

async function getBlogs() {
  await dbConnect();
  const blogs = await BlogModel.find({ published: true }).sort({ createdAt: -1 });
  return JSON.parse(JSON.stringify(blogs));
}

export default async function BlogPage() {
  const blogs = await getBlogs();

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Page Header */}
      <div className="text-center mb-16">
        <span className="text-xs uppercase font-mono tracking-widest text-primary-main bg-primary-main/10 border border-primary-main/20 px-3 py-1 rounded-full">
          Knowledge Base
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold mt-3 bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">
          My Blog Articles
        </h1>
        <p className="text-text-muted mt-2 text-sm sm:text-base max-w-md mx-auto">
          Insights, tutorials, and documentations about software engineering and security labs.
        </p>
      </div>

      {/* Client List Wrapper */}
      <BlogClientList initialBlogs={blogs} />
    </div>
  );
}
