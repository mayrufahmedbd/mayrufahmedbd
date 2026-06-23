import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Blog from '@/models/Blog';
import { getAdminSession } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const tag = searchParams.get('tag');
    const search = searchParams.get('search');
    const includeUnpublished = searchParams.get('all') === 'true';

    // Build filter
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const filter: any = {};
    
    if (!includeUnpublished) {
      filter.published = true;
    }
    if (tag) {
      filter.tags = tag;
    }
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
      ];
    }

    const blogs = await Blog.find(filter).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: blogs });
  } catch (error: unknown) {
    console.error('Failed to get blogs:', error);
    return NextResponse.json({ success: false, message: 'Failed to retrieve blogs' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getAdminSession(req);
    if (!session) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const body = await req.json();
    const { title, content, tags, coverImage, published } = body;

    if (!title || !content) {
      return NextResponse.json({ success: false, message: 'Missing title or content' }, { status: 400 });
    }

    // Generate clean URL slug
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    // Check slug collision
    const existing = await Blog.findOne({ slug });
    let finalSlug = slug;
    if (existing) {
      finalSlug = `${slug}-${Date.now().toString().slice(-4)}`;
    }

    const blog = await Blog.create({
      title,
      slug: finalSlug,
      content,
      tags: Array.isArray(tags) ? tags : tags.split(',').map((t: string) => t.trim()),
      coverImage: coverImage || '',
      published: published !== undefined ? published : true,
    });

    return NextResponse.json({ success: true, data: blog, message: 'Blog post created successfully' });
  } catch (error: unknown) {
    console.error('Failed to create blog:', error);
    return NextResponse.json({ success: false, message: 'Failed to create blog post' }, { status: 500 });
  }
}
