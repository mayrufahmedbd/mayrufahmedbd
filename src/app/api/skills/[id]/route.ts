import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Skill from '@/models/Skill';
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
    const { name, category, level } = body;

    const skill = await Skill.findById(id);
    if (!skill) {
      return NextResponse.json({ success: false, message: 'Skill not found' }, { status: 404 });
    }

    skill.name = name ?? skill.name;
    skill.category = category ?? skill.category;
    skill.level = level !== undefined ? Number(level) : skill.level;

    await skill.save();
    return NextResponse.json({ success: true, data: skill, message: 'Skill updated successfully' });
  } catch (error: unknown) {
    console.error('Failed to update skill:', error);
    return NextResponse.json({ success: false, message: 'Failed to update skill' }, { status: 500 });
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

    const skill = await Skill.findByIdAndDelete(id);
    if (!skill) {
      return NextResponse.json({ success: false, message: 'Skill not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Skill deleted successfully' });
  } catch (error: unknown) {
    console.error('Failed to delete skill:', error);
    return NextResponse.json({ success: false, message: 'Failed to delete skill' }, { status: 500 });
  }
}
