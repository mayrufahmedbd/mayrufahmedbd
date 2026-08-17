import { SignJWT, jwtVerify } from 'jose';
import { NextRequest } from 'next/server';
import { cookies } from 'next/headers';

const FALLBACK_SECRET = 'f57f2228d59010ac022ebb0d386c68f3a29775a3ea0951a25f968f826361a99f';

function getSecretKey(): Uint8Array {
  const secret = process.env.JWT_SECRET || FALLBACK_SECRET;
  return new TextEncoder().encode(secret);
}

export async function signToken(payload: { username: string }): Promise<string> {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('2h')
    .sign(getSecretKey());
}

export async function verifyToken(token: string): Promise<{ username: string } | null> {
  try {
    const { payload } = await jwtVerify(token, getSecretKey());
    return payload as { username: string };
  } catch (error) {
    console.error('JWT Verification failed:', error);
    return null;
  }
}

export async function getAdminSession(req?: NextRequest): Promise<{ username: string } | null> {
  let token: string | undefined;

  try {
    const cookieStore = await cookies();
    token = cookieStore.get('admin_token')?.value;
  } catch {
    // Ignore if outside request context
  }

  if (!token && req) {
    token = req.cookies.get('admin_token')?.value;
  }

  if (!token) return null;
  return await verifyToken(token);
}
