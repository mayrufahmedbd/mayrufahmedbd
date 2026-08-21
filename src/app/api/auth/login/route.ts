import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { signToken } from '@/lib/auth';
import dbConnect from '@/lib/dbConnect';
import AdminModel from '@/models/Admin';

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    // Connect to database and look up the admin by username + plain-text password
    await dbConnect();
    const admin = await AdminModel.findOne({ username, password });

    if (admin) {
      const token = await signToken({ username: admin.username });

      const cookieStore = await cookies();
      cookieStore.set('admin_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 2,
      });

      const response = NextResponse.json({ success: true, message: 'Logged in successfully' });
      response.cookies.set('admin_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 2,
      });

      return response;
    }

    return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 });
  } catch (error: unknown) {
    console.error('Login error:', error);
    return NextResponse.json({ success: false, message: 'An error occurred during login' }, { status: 500 });
  }
}
