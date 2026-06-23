import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Message from '@/models/Message';
import { getAdminSession } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const session = await getAdminSession(req);
    if (!session) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const messages = await Message.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: messages });
  } catch (error: unknown) {
    console.error('Failed to get messages:', error);
    return NextResponse.json({ success: false, message: 'Failed to retrieve messages' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ success: false, message: 'Missing fields' }, { status: 400 });
    }

    const newMessage = await Message.create({ name, email, message });
    return NextResponse.json({ success: true, data: newMessage, message: 'Message sent successfully!' });
  } catch (error: unknown) {
    console.error('Failed to save message:', error);
    return NextResponse.json({ success: false, message: 'Failed to send message' }, { status: 500 });
  }
}
