import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import GalleryImage from '@/models/GalleryImage';
import { getAdminSession } from '@/lib/auth';

export async function GET() {
  try {
    await dbConnect();
    const images = await GalleryImage.find().sort({ order: 1, createdAt: -1 });
    return NextResponse.json({ success: true, data: images });
  } catch (error: unknown) {
    console.error('Failed to get gallery images:', error);
    return NextResponse.json({ success: false, message: 'Failed to retrieve gallery' }, { status: 500 });
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
    const { title, category, imageUrl, order } = body;

    if (!title || !category || !imageUrl) {
      return NextResponse.json({ success: false, message: 'Missing fields' }, { status: 400 });
    }

    const image = await GalleryImage.create({
      title,
      category,
      imageUrl,
      order: order !== undefined ? Number(order) : 0,
    });

    return NextResponse.json({ success: true, data: image, message: 'Gallery image added successfully' });
  } catch (error: unknown) {
    console.error('Failed to create gallery image:', error);
    return NextResponse.json({ success: false, message: 'Failed to add gallery image' }, { status: 500 });
  }
}
