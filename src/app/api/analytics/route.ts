import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import VisitorStats from '@/models/VisitorStats';
import Message from '@/models/Message';
import Project from '@/models/Project';
import Blog from '@/models/Blog';
import { getAdminSession } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const session = await getAdminSession(req);
    if (!session) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();

    // Get visitor count
    let stats = await VisitorStats.findOne();
    if (!stats) {
      stats = await VisitorStats.create({ views: 0 });
    }

    // Gather statistics
    const totalMessages = await Message.countDocuments();
    const unreadMessages = await Message.countDocuments({ read: false });
    const totalProjects = await Project.countDocuments();
    const totalBlogs = await Blog.countDocuments();
    
    // Sum of all blog views
    const blogViewsResult = await Blog.aggregate([
      { $group: { _id: null, totalViews: { $sum: '$views' } } },
    ]);
    const totalBlogViews = blogViewsResult[0]?.totalViews || 0;

    return NextResponse.json({
      success: true,
      data: {
        views: stats.views,
        totalMessages,
        unreadMessages,
        totalProjects,
        totalBlogs,
        totalBlogViews,
      },
    });
  } catch (error: unknown) {
    console.error('Failed to get analytics data:', error);
    return NextResponse.json({ success: false, message: 'Failed to retrieve analytics' }, { status: 500 });
  }
}

export async function POST() {
  try {
    await dbConnect();
    let stats = await VisitorStats.findOne();
    if (!stats) {
      stats = await VisitorStats.create({ views: 1 });
    } else {
      stats.views += 1;
      await stats.save();
    }
    return NextResponse.json({ success: true, views: stats.views });
  } catch (error: unknown) {
    console.error('Failed to increment views:', error);
    return NextResponse.json({ success: false, message: 'Failed to track view' }, { status: 500 });
  }
}
