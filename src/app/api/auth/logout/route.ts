import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete('admin_token');

    const response = NextResponse.json({ success: true, message: 'Logged out successfully' });
    response.cookies.delete('admin_token');
    return response;
  } catch (error: unknown) {
    console.error('Logout error:', error);
    return NextResponse.json({ success: false, message: 'An error occurred during logout' }, { status: 500 });
  }
}
