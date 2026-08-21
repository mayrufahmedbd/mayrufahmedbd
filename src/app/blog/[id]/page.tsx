import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import dbConnect from '@/lib/dbConnect';
import BlogModel from '@/models/Blog';
import ReactMarkdown from 'react-markdown';
import { Calendar, Eye, ArrowLeft, Clock } from 'lucide-react';
import Image from 'next/image';

type Params = Promise<{ id: string }>;

const siteUrl = 'https://www.mayrufahmedbd.com';

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

// Dynamic metadata for each blog post
export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { id } = await params;
  await dbConnect();
  const blog = await BlogModel.findOne({ slug: id, published: true }).lean();

  if (!blog) {
    return {
      title: 'Blog Post Not Found | Mayruf Ahmed',
      description: 'The requested blog post could not be found.',
    };
  }

  const b = blog as {
    title: string;
    excerpt?: string;
    content?: string;
    coverImage?: string;
    tags?: string[];
    createdAt: Date | string;
    slug: string;
  };

  const description =
    b.excerpt ||
    (b.content ? b.content.replace(/[#*`_[\]()]/g, '').slice(0, 160) : '') ||
    `Blog post by Mayruf Ahmed – web designer and developer from Sylhet, Bangladesh.`;

  const postUrl = `${siteUrl}/blog/${b.slug}`;
  const ogImage = b.coverImage || `${siteUrl}/logo.png`;

  return {
    title: `${b.title} | Mayruf Ahmed Blog`,
    description,
    keywords: [
      ...(b.tags || []),
      'Mayruf Ahmed blog',
      'web design',
      'web development',
      'Sylhet developer',
      'Mayruf Ahmed',
    ],
    alternates: {
      canonical: postUrl,
    },
    openGraph: {
      title: b.title,
      description,
      url: postUrl,
      type: 'article',
      publishedTime: new Date(b.createdAt).toISOString(),
      authors: ['Mayruf Ahmed'],
      tags: b.tags,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: b.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: b.title,
      description,
      images: [ogImage],
      creator: '@mayrufahmed',
    },
  };
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

  const postUrl = `${siteUrl}/blog/${blog.slug}`;

  // Article structured data for this specific blog post
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: blog.title,
    description:
      blog.excerpt ||
      blog.content.replace(/[#*`_[\]()]/g, '').slice(0, 160),
    image: blog.coverImage || `${siteUrl}/logo.png`,
    url: postUrl,
    datePublished: new Date(blog.createdAt).toISOString(),
    dateModified: new Date(blog.updatedAt || blog.createdAt).toISOString(),
    author: {
      '@type': 'Person',
      name: 'Mayruf Ahmed',
      url: siteUrl,
    },
    publisher: {
      '@type': 'Person',
      name: 'Mayruf Ahmed',
      url: siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/logo.png`,
      },
    },
    keywords: (blog.tags || []).join(', '),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': postUrl,
    },
  };

  return (
    <article className="max-w-4xl mx-auto px-6 py-12">
      {/* JSON-LD for this article */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

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
