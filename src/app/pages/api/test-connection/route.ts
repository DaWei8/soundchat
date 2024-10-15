import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('audio_clips')
      .select('count', { count: 'exact' })

    if (error) throw error

    return NextResponse.json({ success: true, count: data[0].count });
  } catch (error : any) {
    console.error('Supabase connection error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}