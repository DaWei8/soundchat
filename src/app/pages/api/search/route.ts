import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query');

  if (!query) {
    return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('audio_clips')
    .select('*')
    .ilike('name', `%${query}%`)
    .order('created_at', { ascending: false })
    .limit(10);

  if (error) {
    return NextResponse.json({ error: 'Failed to fetch audio clips' }, { status: 500 });
  }

  return NextResponse.json(data);
}