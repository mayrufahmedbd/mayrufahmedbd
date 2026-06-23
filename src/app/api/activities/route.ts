import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import CurrentActivity from '@/models/CurrentActivity';
import { getAdminSession } from '@/lib/auth';

export async function GET() {
  try {
    await dbConnect();
    let activity = await CurrentActivity.findOne();
    if (!activity) {
      activity = await CurrentActivity.create({
        learning: ['Next.js', 'MongoDB', 'Backend Development', 'Cybersecurity Fundamentals'],
        goals: ['Become a Full Stack Developer and Cybersecurity Specialist.'],
      });
    }
    return NextResponse.json({ success: true, data: activity });
  } catch (error: unknown) {
    console.error('Failed to get activity:', error);
    return NextResponse.json({ success: false, message: 'Failed to retrieve activity' }, { status: 500 });
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
    const { learning, goals } = body;

    let activity = await CurrentActivity.findOne();
    if (!activity) {
      activity = new CurrentActivity({ learning, goals });
    } else {
      activity.learning = learning || activity.learning;
      activity.goals = goals || activity.goals;
    }

    await activity.save();
    return NextResponse.json({ success: true, data: activity, message: 'Activities updated successfully' });
  } catch (error: unknown) {
    console.error('Failed to update activity:', error);
    return NextResponse.json({ success: false, message: 'Failed to update activities' }, { status: 500 });
  }
}
