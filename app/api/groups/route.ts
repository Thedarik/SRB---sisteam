import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'

// GET - Barcha guruhlarni olish
export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from('groups')
      .select('*')
      .eq('status', 'active')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('❌ Guruhlarni yuklashda xatolik:', error)
      return NextResponse.json(
        { 
          success: false,
          error: 'Guruhlarni yuklashda xatolik yuz berdi',
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

// POST - Yangi guruh qo'shish
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    console.log('📥 Yangi guruh ma\'lumotlari:', {
      name: body.name,
      course_type: body.course_type,
      schedule: body.schedule
    })
    
    // ✅ 1. VALIDATSIYA - Majburiy maydonlar
    if (!body.name?.trim()) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Guruh nomini kiriting!' 
        },
        { status: 400 }
      )
    }

    if (!body.course_type?.trim()) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Kurs turini kiriting!' 
        },
        { status: 400 }
      )
    }

    // ✅ 2. GURUH QO'SHISH
    const groupData = {
      name: body.name.trim(),
      course_type: body.course_type.trim(),
      schedule: body.schedule?.trim() || null,
      room: body.room?.trim() || null,
      time_slot: body.time_slot?.trim() || null,
      start_date: body.start_date || null,
      end_date: body.end_date || null,
      teacher_name: body.teacher_name?.trim() || null,
      max_students: body.max_students || 30,
      current_students: 0,
      status: 'active'
    }

    console.log('📝 Database ga yozilmoqda:', groupData)

    const { data: newGroup, error: insertError } = await supabaseAdmin
      .from('groups')
      .insert([groupData])
      .select()
      .single()

    if (insertError) {
      console.error('❌ INSERT xatosi:', {
        code: insertError.code,
        message: insertError.message,
        details: insertError.details
      })
      
      return NextResponse.json(
        { 
          success: false,
          error: 'Guruh qo\'shishda xatolik yuz berdi',
          details: insertError.message
        },
        { status: 500 }
      )
    }

    console.log('✅ Guruh muvaffaqiyatli qo\'shildi:', newGroup.id)

    return NextResponse.json({
      success: true,
      message: 'Guruh muvaffaqiyatli qo\'shildi!',
      data: newGroup
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



