import { SignJWT, jwtVerify } from 'jose';
import { NextRequest } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET || 'f57f2228d59010ac022ebb0d386c68f3a29775a3ea0951a25f968f826361a99f';
const secretKey = new TextEncoder().encode(JWT_SECRET);

export async function signToken(payload: { username: string }): Promise<string> {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('2h')
    .sign(secretKey);
}

export async function verifyToken(token: string): Promise<{ username: string } | null> {
  try {
    const { payload } = await jwtVerify(token, secretKey);
    return payload as { username: string };
  } catch (error) {
    console.error('JWT Verification failed:', error);
    return null;
  }
}

export async function getAdminSession(req: NextRequest): Promise<{ username: string } | null> {
  const token = req.cookies.get('admin_token')?.value;
  if (!token) return null;
  return await verifyToken(token);
}
