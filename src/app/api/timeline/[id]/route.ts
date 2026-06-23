import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import TimelineItem from '@/models/TimelineItem';
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
    const { period, title, description, order } = body;

    const item = await TimelineItem.findById(id);
    if (!item) {
      return NextResponse.json({ success: false, message: 'Timeline item not found' }, { status: 404 });
    }

    item.period = period ?? item.period;
    item.title = title ?? item.title;
    item.description = description ?? item.description;
    item.order = order !== undefined ? Number(order) : item.order;

    await item.save();
    return NextResponse.json({ success: true, data: item, message: 'Timeline item updated successfully' });
  } catch (error: unknown) {
    console.error('Failed to update timeline item:', error);
    return NextResponse.json({ success: false, message: 'Failed to update timeline item' }, { status: 500 });
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

    const item = await TimelineItem.findByIdAndDelete(id);
    if (!item) {
      return NextResponse.json({ success: false, message: 'Timeline item not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Timeline item deleted successfully' });
  } catch (error: unknown) {
    console.error('Failed to delete timeline item:', error);
    return NextResponse.json({ success: false, message: 'Failed to delete timeline item' }, { status: 500 });
  }
}
