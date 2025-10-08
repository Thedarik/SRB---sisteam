import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// GET - Barcha guruhlarni olish
export async function GET() {
  try {
    const { data, error } = await supabase
      .from('groups')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      data: data
    })
  } catch (error) {
    console.error('Server error:', error)
    return NextResponse.json(
      { error: 'Server xatosi' },
      { status: 500 }
    )
  }
}

