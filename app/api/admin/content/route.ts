import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// export const runtime = 'edge'; // Removed for VPS/Node.js deployment

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;

// NOTE: Local file system operations (fs) are not supported in Cloudflare Pages (Edge Runtime).
// This route needs to be refactored to use a database (e.g., Supabase) or KV storage for content management.

export async function GET() {
  return NextResponse.json(
    { 
      text: {}, 
      images: {}, 
      note: "Content management disabled in Edge Runtime. Please configure a database." 
    }
  );
}

export async function POST(request: Request) {
  return NextResponse.json(
    { error: 'Writing to local file system is not supported in Edge Runtime.' }, 
    { status: 501 }
  );
}
