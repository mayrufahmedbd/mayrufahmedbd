import type { MetadataRoute } from 'next';
import dbConnect from '@/lib/dbConnect';
import BlogModel from '@/models/Blog';
import ProjectModel from '@/models/Project';

const siteUrl = 'https://mayrufahmedbd.vercel.app';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  await dbConnect();

  // Fetch all published blog posts for dynamic URLs
  const blogs = await BlogModel.find({ published: true })
    .select('slug updatedAt createdAt')
    .lean();

  // Fetch all projects for dynamic URLs
  const projects = await ProjectModel.find()
    .select('_id updatedAt createdAt')
    .lean();

  const blogUrls: MetadataRoute.Sitemap = blogs.map((blog) => {
    const b = blog as { slug: string; updatedAt?: Date; createdAt?: Date };
    return {
      url: `${siteUrl}/blog/${b.slug}`,
      lastModified: new Date(b.updatedAt || b.createdAt || Date.now()),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    };
  });

  const projectUrls: MetadataRoute.Sitemap = projects.map((project) => {
    const p = project as { _id: { toString(): string }; updatedAt?: Date; createdAt?: Date };
    return {
      url: `${siteUrl}/projects/${p._id.toString()}`,
      lastModified: new Date(p.updatedAt || p.createdAt || Date.now()),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    };
  });

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${siteUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${siteUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.75,
    },
    {
      url: `${siteUrl}/gallery`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ];

  return [...staticPages, ...blogUrls, ...projectUrls];
}
