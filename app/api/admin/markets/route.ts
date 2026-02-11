import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// export const runtime = 'edge'; // Removed for VPS/Node.js deployment

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Ensure client is only created if keys exist to avoid runtime errors
const supabase = (supabaseUrl && supabaseKey) 
  ? createClient(supabaseUrl, supabaseKey) 
  : null;

export async function GET() {
  if (!supabase) {
    return NextResponse.json({ error: 'Supabase configuration missing' }, { status: 500 });
  }

  try {
    // Fetch from Supabase instead of local file system
    const { data, error } = await supabase
      .from('market_cache')
      .select('*')
      .order('symbol', { ascending: true });

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json([]);
    }

    return NextResponse.json(data || []);
  } catch (error) {
    console.error('Failed to fetch markets:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  // File system operations are not supported in Edge Runtime
  return NextResponse.json(
    { error: 'Writing to local file system is not supported in Edge Runtime. Please use Supabase or KV storage.' }, 
    { status: 501 }
  );
}
