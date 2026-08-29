import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import GalleryImage from '@/models/GalleryImage';
import { getAdminSession } from '@/lib/auth';

type Params = Promise<{ id: string }>;

export async function PATCH(req: NextRequest, { params }: { params: Params }) {
  try {
    const session = await getAdminSession(req);
    if (!session) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    await dbConnect();
    const body = await req.json();

    const updateFields: Record<string, unknown> = {};
    if (body.title !== undefined) updateFields.title = body.title;
    if (body.category !== undefined) updateFields.category = body.category;

    const image = await GalleryImage.findByIdAndUpdate(id, updateFields, { new: true });
    if (!image) {
      return NextResponse.json({ success: false, message: 'Image not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: image, message: 'Gallery image updated successfully' });
  } catch (error: unknown) {
    console.error('Failed to update gallery image:', error);
    return NextResponse.json({ success: false, message: 'Failed to update image' }, { status: 500 });
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
