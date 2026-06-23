import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import GalleryImage from '@/models/GalleryImage';
import { getAdminSession } from '@/lib/auth';

type Params = Promise<{ id: string }>;

export async function DELETE(req: NextRequest, { params }: { params: Params }) {
  try {
    const session = await getAdminSession(req);
    if (!session) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    await dbConnect();

    const image = await GalleryImage.findByIdAndDelete(id);
    if (!image) {
      return NextResponse.json({ success: false, message: 'Image not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Gallery image deleted successfully' });
  } catch (error: unknown) {
    console.error('Failed to delete gallery image:', error);
    return NextResponse.json({ success: false, message: 'Failed to delete image' }, { status: 500 });
  }
}
