import { NextResponse } from 'next/server';

// export const runtime = 'edge'; // Removed for VPS/Node.js deployment

// NOTE: Local file system operations (fs) are not supported in Cloudflare Pages (Edge Runtime).
// This route needs to be refactored to use Supabase Storage or R2.

export async function POST(request: Request) {
  return NextResponse.json(
    { error: 'File upload to local file system is not supported in Edge Runtime. Please implement Supabase Storage or Cloudflare R2.' }, 
    { status: 501 }
  );
}
