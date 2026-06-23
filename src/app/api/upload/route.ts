import { NextRequest, NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/auth';
import { cloudinary } from '@/lib/cloudinary';

export async function POST(req: NextRequest) {
  try {
    // 1. Authorize session
    const session = await getAdminSession(req);
    if (!session) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    // 2. Parse form data
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const folder = (formData.get('folder') as string) || 'mayrufahmedbd';

    if (!file) {
      return NextResponse.json({ success: false, message: 'No file uploaded' }, { status: 400 });
    }

    // 3. Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 4. Upload to Cloudinary using upload_stream
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result: any = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: folder,
          resource_type: 'auto',
        },
        (error, uploadResult) => {
          if (error) reject(error);
          else resolve(uploadResult);
        }
      );
      stream.end(buffer);
    });

    return NextResponse.json({
      success: true,
      url: result.secure_url,
      publicId: result.public_id,
      message: 'Uploaded successfully',
    });
  } catch (error: unknown) {
    console.error('Failed to upload file:', error);
    return NextResponse.json({ success: false, message: 'Upload failed' }, { status: 500 });
  }
}
