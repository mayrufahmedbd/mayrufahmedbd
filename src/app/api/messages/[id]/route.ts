import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Message from '@/models/Message';
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

    const message = await Message.findById(id);
    if (!message) {
      return NextResponse.json({ success: false, message: 'Message not found' }, { status: 404 });
    }

    message.read = true;
    await message.save();

    return NextResponse.json({ success: true, data: message, message: 'Message marked as read' });
  } catch (error: unknown) {
    console.error('Failed to update message:', error);
    return NextResponse.json({ success: false, message: 'Failed to update message' }, { status: 500 });
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

    const message = await Message.findByIdAndDelete(id);
    if (!message) {
      return NextResponse.json({ success: false, message: 'Message not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Message deleted successfully' });
  } catch (error: unknown) {
    console.error('Failed to delete message:', error);
    return NextResponse.json({ success: false, message: 'Failed to delete message' }, { status: 500 });
  }
}
