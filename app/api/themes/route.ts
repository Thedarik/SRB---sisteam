import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'

// GET - Barcha faol theme'larni olish
export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from('theam')
      .select('*')
      .order('id', { ascending: false })

    if (error) {
      console.error('❌ Theme\'larni yuklashda xatolik:', error)
      return NextResponse.json(
        { 
          success: false,
          error: 'Theme\'larni yuklashda xatolik yuz berdi',
          details: error.message 
        },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      data: data || []
    })
  } catch (error: any) {
    console.error('❌ Server xatosi:', error)
    return NextResponse.json(
      { 
        success: false,
        error: 'Server xatosi yuz berdi',
        details: error.message 
      },
      { status: 500 }
    )
  }
}

// POST - Yangi theme qo'shish (Admin tomonidan)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    console.log('📥 Yangi theme:', body)
    
    // ✅ 1. VALIDATSIYA
    if (!body.name?.trim()) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Theme nomini kiriting!' 
        },
        { status: 400 }
      )
    }

    if (!body.colors || !body.colors.primary || !body.colors.secondary || !body.colors.accent) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Barcha ranglarni kiriting!' 
        },
        { status: 400 }
      )
    }

    // ✅ 2. THEME QO'SHISH
    const themeData = {
      name: body.name.trim(),
      colors: JSON.stringify(body.colors)  // TEXT formatda saqlash
    }

    const { data: newTheme, error: insertError } = await supabaseAdmin
      .from('theam')
      .insert([themeData])
      .select()
      .single()

    if (insertError) {
      console.error('❌ INSERT xatosi:', insertError)
      
      return NextResponse.json(
        { 
          success: false,
          error: 'Theme qo\'shishda xatolik yuz berdi',
          details: insertError.message
        },
        { status: 500 }
      )
    }

    console.log('✅ Theme muvaffaqiyatli qo\'shildi:', newTheme.id)

    return NextResponse.json({
      success: true,
      message: 'Theme muvaffaqiyatli qo\'shildi!',
      data: newTheme
    }, { status: 201 })

  } catch (error: any) {
    console.error('❌ Kutilmagan server xatosi:', error)
    return NextResponse.json(
      { 
        success: false,
        error: 'Server xatosi yuz berdi',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    )
  }
}

