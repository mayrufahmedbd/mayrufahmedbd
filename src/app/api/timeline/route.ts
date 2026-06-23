import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import TimelineItem from '@/models/TimelineItem';
import { getAdminSession } from '@/lib/auth';

export async function GET() {
  try {
    await dbConnect();
    const items = await TimelineItem.find().sort({ order: 1 });
    return NextResponse.json({ success: true, data: items });
  } catch (error: unknown) {
    console.error('Failed to get timeline items:', error);
    return NextResponse.json({ success: false, message: 'Failed to retrieve timeline' }, { status: 500 });
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
    const { period, title, description, order } = body;

    if (!period || !title || !description || order === undefined) {
      return NextResponse.json({ success: false, message: 'Missing fields' }, { status: 400 });
    }

    const item = await TimelineItem.create({
      period,
      title,
      description,
      order: Number(order),
    });

    return NextResponse.json({ success: true, data: item, message: 'Timeline item created successfully' });
  } catch (error: unknown) {
    console.error('Failed to create timeline item:', error);
    return NextResponse.json({ success: false, message: 'Failed to create timeline item' }, { status: 500 });
  }
}
