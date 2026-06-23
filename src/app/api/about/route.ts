import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import About from '@/models/About';
import { seedDatabase } from '@/lib/seed';
import { getAdminSession } from '@/lib/auth';

export async function GET() {
  try {
    await dbConnect();
    let about = await About.findOne();
    if (!about) {
      // Automatically seed database on first run if data doesn't exist
      await seedDatabase();
      about = await About.findOne();
    }
    return NextResponse.json({ success: true, data: about });
  } catch (error: unknown) {
    console.error('Failed to get about data:', error);
    return NextResponse.json({ success: false, message: 'Failed to retrieve data' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await getAdminSession(req);
    if (!session) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const body = await req.json();

    let about = await About.findOne();
    if (!about) {
      about = new About(body);
    } else {
      about.name = body.name || about.name;
      about.title = body.title || about.title;
      about.typingAnimations = body.typingAnimations || about.typingAnimations;
      about.whoIAm = body.whoIAm || about.whoIAm;
      about.whatIDo = body.whatIDo || about.whatIDo;
      about.whatIWantToDo = body.whatIWantToDo || about.whatIWantToDo;
      about.resumeUrl = body.resumeUrl !== undefined ? body.resumeUrl : about.resumeUrl;
      about.profileImage = body.profileImage !== undefined ? body.profileImage : about.profileImage;
      about.email = body.email !== undefined ? body.email : about.email;
      about.phone = body.phone !== undefined ? body.phone : about.phone;
      about.address = body.address !== undefined ? body.address : about.address;
      about.githubUrl = body.githubUrl !== undefined ? body.githubUrl : about.githubUrl;
      about.linkedinUrl = body.linkedinUrl !== undefined ? body.linkedinUrl : about.linkedinUrl;
      about.facebookUrl = body.facebookUrl !== undefined ? body.facebookUrl : about.facebookUrl;
      about.twitterUrl = body.twitterUrl !== undefined ? body.twitterUrl : about.twitterUrl;
    }

    await about.save();
    return NextResponse.json({ success: true, data: about, message: 'About page updated successfully' });
  } catch (error: unknown) {
    console.error('Failed to update about data:', error);
    return NextResponse.json({ success: false, message: 'Failed to update data' }, { status: 500 });
  }
}
