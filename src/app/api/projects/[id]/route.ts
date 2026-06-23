import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Project from '@/models/Project';
import { getAdminSession } from '@/lib/auth';

type Params = Promise<{ id: string }>;

export async function PUT(req: NextRequest, { params }: { params: Params }) {
  try {
    const session = await getAdminSession(req);
    if (!session) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    await dbConnect();
    const body = await req.json();
    const { title, description, imageUrl, tech, githubUrl, liveUrl, order } = body;

    const project = await Project.findById(id);
    if (!project) {
      return NextResponse.json({ success: false, message: 'Project not found' }, { status: 404 });
    }

    project.title = title ?? project.title;
    project.description = description ?? project.description;
    project.imageUrl = imageUrl ?? project.imageUrl;
    project.tech = tech !== undefined ? (Array.isArray(tech) ? tech : tech.split(',').map((t: string) => t.trim())) : project.tech;
    project.githubUrl = githubUrl ?? project.githubUrl;
    project.liveUrl = liveUrl ?? project.liveUrl;
    project.order = order !== undefined ? Number(order) : project.order;

    await project.save();
    return NextResponse.json({ success: true, data: project, message: 'Project updated successfully' });
  } catch (error: unknown) {
    console.error('Failed to update project:', error);
    return NextResponse.json({ success: false, message: 'Failed to update project' }, { status: 500 });
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

    const project = await Project.findByIdAndDelete(id);
    if (!project) {
      return NextResponse.json({ success: false, message: 'Project not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Project deleted successfully' });
  } catch (error: unknown) {
    console.error('Failed to delete project:', error);
    return NextResponse.json({ success: false, message: 'Failed to delete project' }, { status: 500 });
  }
}
