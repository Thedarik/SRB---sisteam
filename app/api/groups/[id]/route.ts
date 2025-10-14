import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'

// GET - Bitta guruhni ID bo'yicha olish
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const { data, error } = await supabaseAdmin
      .from('groups')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      console.error('❌ Guruhni yuklashda xatolik:', error)
      return NextResponse.json(
        { 
          success: false,
          error: 'Guruh topilmadi',
          details: error.message 
        },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: data
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

// PUT - Guruhni yangilash
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    
    console.log('📝 Guruh yangilanmoqda:', id, body)
    
    // ✅ 1. VALIDATSIYA
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

    // ✅ 2. GURUH MAVJUDLIGINI TEKSHIRISH
    const { data: existingGroup, error: checkError } = await supabaseAdmin
      .from('groups')
      .select('id')
      .eq('id', id)
      .single()

    if (checkError || !existingGroup) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Guruh topilmadi!' 
        },
        { status: 404 }
      )
    }

    // ✅ 3. GURUHNI YANGILASH
    const updateData = {
      name: body.name.trim(),
      course_type: body.course_type.trim(),
      schedule: body.schedule?.trim() || null,
      room: body.room?.trim() || null,
      time_slot: body.time_slot?.trim() || null,
      start_date: body.start_date || null,
      end_date: body.end_date || null,
      teacher_name: body.teacher_name?.trim() || null,
      max_students: body.max_students || 30,
      status: body.status || 'active',
      updated_at: new Date().toISOString()
    }

    console.log('📝 Yangilanayotgan ma\'lumotlar:', updateData)

    const { data: updatedGroup, error: updateError } = await supabaseAdmin
      .from('groups')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()

    if (updateError) {
      console.error('❌ UPDATE xatosi:', {
        code: updateError.code,
        message: updateError.message,
        details: updateError.details
      })
      
      return NextResponse.json(
        { 
          success: false,
          error: 'Guruhni yangilashda xatolik yuz berdi',
          details: updateError.message
        },
        { status: 500 }
      )
    }

    console.log('✅ Guruh muvaffaqiyatli yangilandi:', updatedGroup.id)

    return NextResponse.json({
      success: true,
      message: 'Guruh muvaffaqiyatli yangilandi!',
      data: updatedGroup
    })

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

// DELETE - Guruhni o'chirish (soft delete - statusni o'zgartirish)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    console.log('🗑️ Guruh o\'chirilmoqda:', id)
    
    // ✅ Soft delete - faqat statusni o'zgartirish
    const { data, error } = await supabaseAdmin
      .from('groups')
      .update({ status: 'inactive', updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('❌ DELETE xatosi:', error)
      return NextResponse.json(
        { 
          success: false,
          error: 'Guruhni o\'chirishda xatolik yuz berdi',
          details: error.message
        },
        { status: 500 }
      )
    }

    console.log('✅ Guruh muvaffaqiyatli o\'chirildi (soft delete):', data.id)

    return NextResponse.json({
      success: true,
      message: 'Guruh muvaffaqiyatli o\'chirildi!',
      data: data
    })

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

