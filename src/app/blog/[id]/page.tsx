import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import dbConnect from '@/lib/dbConnect';
import BlogModel from '@/models/Blog';
import ReactMarkdown from 'react-markdown';
import { Calendar, Eye, ArrowLeft, Clock } from 'lucide-react';
import Image from 'next/image';

type Params = Promise<{ id: string }>;

async function getBlogPost(slug: string) {
  await dbConnect();
  
  // Increment view counter and fetch document in a single database operation
  const blog = await BlogModel.findOneAndUpdate(
    { slug, published: true },
    { $inc: { views: 1 } },
    { new: true }
  );
  
  if (!blog) return null;
  return JSON.parse(JSON.stringify(blog));
}

export default async function BlogDetailPage({ params }: { params: Params }) {
  const { id } = await params;
  const blog = await getBlogPost(id);

  if (!blog) {
    notFound();
  }

  // Calculate read time roughly
  const wordCount = blog.content.split(/\s+/).length;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <article className="max-w-4xl mx-auto px-6 py-12">
      {/* Back Button */}
      <Link
        href="/blog"
        className="flex items-center gap-2 text-sm font-semibold text-primary-main hover:text-primary-main/80 transition-colors w-fit mb-8 group cursor-pointer"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        <span>Back to Articles</span>
      </Link>

      {/* Meta Headers */}
      <div className="flex flex-col gap-6 mb-10">
        <div className="flex flex-wrap gap-2">
          {blog.tags.map((tag: string, index: number) => (
            <span
              key={index}
              className="text-xs font-mono font-bold uppercase tracking-wider text-primary-main bg-primary-main/10 border border-primary-main/20 px-3 py-1 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
          {blog.title}
        </h1>

        <div className="flex flex-wrap items-center gap-6 text-sm text-text-muted font-mono border-y border-card-border/60 py-4">
          <span className="flex items-center gap-1.5">
            <Calendar size={15} />
            {new Date(blog.createdAt).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock size={15} />
            {readTime} min read
          </span>
          <span className="flex items-center gap-1.5">
            <Eye size={15} />
            {blog.views} views
          </span>
        </div>
      </div>

      {/* Cover Image */}
      {blog.coverImage && (
        <div className="relative w-full h-[300px] sm:h-[400px] md:h-[480px] rounded-3xl overflow-hidden mb-12 shadow-xl border border-card-border">
          <Image
            src={blog.coverImage}
            alt={blog.title}
            fill
            sizes="100vw"
            priority
            className="object-cover"
          />
        </div>
      )}

      {/* Markdown Body */}
      <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-card-border/80 shadow-lg">
        <div className="markdown-content">
          <ReactMarkdown>{blog.content}</ReactMarkdown>
        </div>
      </div>
    </article>
  );
}
