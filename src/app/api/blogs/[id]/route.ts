import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Blog from '@/models/Blog';
import { getAdminSession } from '@/lib/auth';
import mongoose from 'mongoose';

type Params = Promise<{ id: string }>;

export async function GET(req: NextRequest, { params }: { params: Params }) {
  try {
    const { id } = await params;
    await dbConnect();

    let blog;
    // Check if the parameter is a valid MongoDB ObjectID
    if (mongoose.Types.ObjectId.isValid(id)) {
      blog = await Blog.findById(id);
    } else {
      blog = await Blog.findOne({ slug: id });
    }

    if (!blog) {
      return NextResponse.json({ success: false, message: 'Blog post not found' }, { status: 404 });
    }

    // Increment view counter on public requests
    const isAdmin = await getAdminSession(req);
    if (!isAdmin && blog.published) {
      blog.views += 1;
      await blog.save();
    }

    return NextResponse.json({ success: true, data: blog });
  } catch (error: unknown) {
    console.error('Failed to get blog post:', error);
    return NextResponse.json({ success: false, message: 'Failed to retrieve blog post' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: Params }) {
  try {
    const session = await getAdminSession(req);
    if (!session) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    await dbConnect();
    const body = await req.json();
    const { title, content, tags, coverImage, published } = body;

    const blog = await Blog.findById(id);
    if (!blog) {
      return NextResponse.json({ success: false, message: 'Blog post not found' }, { status: 404 });
    }

    if (title && title !== blog.title) {
      blog.title = title;
      // Re-generate slug if title changes
      const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');

      const existing = await Blog.findOne({ slug, _id: { $ne: blog._id } });
      blog.slug = existing ? `${slug}-${Date.now().toString().slice(-4)}` : slug;
    }

    blog.content = content ?? blog.content;
    blog.coverImage = coverImage ?? blog.coverImage;
    blog.published = published !== undefined ? published : blog.published;
    if (tags !== undefined) {
      blog.tags = Array.isArray(tags) ? tags : tags.split(',').map((t: string) => t.trim());
    }

    await blog.save();
    return NextResponse.json({ success: true, data: blog, message: 'Blog post updated successfully' });
  } catch (error: unknown) {
    console.error('Failed to update blog:', error);
    return NextResponse.json({ success: false, message: 'Failed to update blog post' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Params }) {
  try {
    const session = await getAdminSession(req);
    if (!session) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    await dbConnect();

    const blog = await Blog.findByIdAndDelete(id);
    if (!blog) {
      return NextResponse.json({ success: false, message: 'Blog post not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Blog post deleted successfully' });
  } catch (error: unknown) {
    console.error('Failed to delete blog:', error);
    return NextResponse.json({ success: false, message: 'Failed to delete blog post' }, { status: 500 });
  }
}
