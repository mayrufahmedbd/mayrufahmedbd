import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Skill from '@/models/Skill';
import { getAdminSession } from '@/lib/auth';

export async function GET() {
  try {
    await dbConnect();
    const skills = await Skill.find().sort({ category: 1, level: -1 });
    return NextResponse.json({ success: true, data: skills });
  } catch (error: unknown) {
    console.error('Failed to get skills:', error);
    return NextResponse.json({ success: false, message: 'Failed to retrieve skills' }, { status: 500 });
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
    const { name, category, level } = body;

    if (!name || !category || level === undefined) {
      return NextResponse.json({ success: false, message: 'Missing fields' }, { status: 400 });
    }

    const skill = await Skill.create({ name, category, level: Number(level) });
    return NextResponse.json({ success: true, data: skill, message: 'Skill created successfully' });
  } catch (error: unknown) {
    console.error('Failed to create skill:', error);
    return NextResponse.json({ success: false, message: 'Failed to create skill' }, { status: 500 });
  }
}
