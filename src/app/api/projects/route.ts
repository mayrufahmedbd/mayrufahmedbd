import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Project from '@/models/Project';
import { getAdminSession } from '@/lib/auth';

export async function GET() {
  try {
    await dbConnect();
    const projects = await Project.find().sort({ order: 1, createdAt: -1 });
    return NextResponse.json({ success: true, data: projects });
  } catch (error: unknown) {
    console.error('Failed to get projects:', error);
    return NextResponse.json({ success: false, message: 'Failed to retrieve projects' }, { status: 500 });
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
    const { title, description, imageUrl, tech, githubUrl, liveUrl, order } = body;

    if (!title || !description || !imageUrl) {
      return NextResponse.json({ success: false, message: 'Missing title, description, or image' }, { status: 400 });
    }

    const project = await Project.create({
      title,
      description,
      imageUrl,
      tech: Array.isArray(tech) ? tech : tech.split(',').map((t: string) => t.trim()),
      githubUrl: githubUrl || '',
      liveUrl: liveUrl || '',
      order: order !== undefined ? Number(order) : 0,
    });

    return NextResponse.json({ success: true, data: project, message: 'Project created successfully' });
  } catch (error: unknown) {
    console.error('Failed to create project:', error);
    return NextResponse.json({ success: false, message: 'Failed to create project' }, { status: 500 });
  }
}
