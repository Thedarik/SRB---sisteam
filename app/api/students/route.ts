import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'

// GET - Barcha o'quvchilarni olish
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const groupId = searchParams.get('groupId')

    let query = supabaseAdmin
      .from('students')
      .select(`
        *,
        groups:group_id (
          id,
          name,
          course_type,
          schedule
        )
      `)
      .order('created_at', { ascending: false })

    // Filter by status
    if (status) {
      query = query.eq('status', status)
    }

    // Filter by group
    if (groupId) {
      query = query.eq('group_id', groupId)
    }

    const { data, error } = await query

    if (error) {
      console.error('❌ Supabase GET xatosi:', error)
      return NextResponse.json(
        { 
          success: false,
          error: 'O\'quvchilarni yuklashda xatolik yuz berdi',
          details: error.message 
        },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      data: data || [],
      count: data?.length || 0
    })
  } catch (error: any) {
    console.error('❌ Server GET xatosi:', error)
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

// POST - Yangi o'quvchi qo'shish
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    console.log('📥 Yangi o\'quvchi ma\'lumotlari:', {
      full_name: body.full_name,
      phone_number: body.phone_number,
      group_id: body.group_id,
      has_passport: !!body.passport_number
    })
    
    // ✅ 1. VALIDATSIYA - Majburiy maydonlar
    if (!body.full_name?.trim()) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Ism sharifni kiriting!' 
        },
        { status: 400 }
      )
    }

    if (!body.phone_number?.trim()) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Telefon raqamni kiriting!' 
        },
        { status: 400 }
      )
    }

    if (!body.group_id?.trim()) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Guruhni tanlang!' 
        },
        { status: 400 }
      )
    }

    // ✅ 2. TELEFON RAQAM TEKSHIRISH
    const { data: existingStudent, error: checkError } = await supabaseAdmin
      .from('students')
      .select('id, full_name')
      .eq('phone_number', body.phone_number.trim())
      .maybeSingle()

    if (checkError && checkError.code !== 'PGRST116') {
      console.error('⚠️ Tekshirishda xatolik:', checkError)
    }

    if (existingStudent) {
      return NextResponse.json(
        { 
          success: false,
          error: `Bu telefon raqam allaqachon ro'yxatdan o'tgan! (${existingStudent.full_name})` 
        },
        { status: 409 }
      )
    }

    // ✅ 3. GURUH MAVJUDLIGINI TEKSHIRISH
    const { data: groupExists, error: groupError } = await supabaseAdmin
      .from('groups')
      .select('id, name')
      .eq('id', body.group_id)
      .maybeSingle()

    if (groupError || !groupExists) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Tanlangan guruh topilmadi!' 
        },
        { status: 400 }
      )
    }

    // ✅ 4. O'QUVCHI QO'SHISH
    const studentData = {
      full_name: body.full_name.trim(),
      phone_number: body.phone_number.trim(),
      passport_number: body.passport_number?.trim() || null,
      group_id: body.group_id.trim(),
      enrollment_date: new Date().toISOString(),
      status: 'active'
    }

    console.log('📝 Database ga yozilmoqda:', studentData)

    const { data: newStudent, error: insertError } = await supabaseAdmin
      .from('students')
      .insert([studentData])
      .select(`
        *,
        groups:group_id (
          id,
          name,
          course_type,
          schedule
        )
      `)
      .single()

    if (insertError) {
      console.error('❌ INSERT xatosi:', {
        code: insertError.code,
        message: insertError.message,
        details: insertError.details,
        hint: insertError.hint
      })
      
      // Xatolik turini aniqlash
      if (insertError.code === '23505') {
        return NextResponse.json(
          { 
            success: false,
            error: 'Bu telefon raqam allaqachon ro\'yxatdan o\'tgan!' 
          },
          { status: 409 }
        )
      }
      
      if (insertError.code === '23503') {
        return NextResponse.json(
          { 
            success: false,
            error: 'Tanlangan guruh topilmadi!' 
          },
          { status: 400 }
        )
      }

      return NextResponse.json(
        { 
          success: false,
          error: 'O\'quvchi qo\'shishda xatolik yuz berdi',
          details: insertError.message
        },
        { status: 500 }
      )
    }

    console.log('✅ O\'quvchi muvaffaqiyatli qo\'shildi:', newStudent.id)

    // ✅ 5. GURUHNING CURRENT_STUDENTS SONINI OSHIRISH
    try {
      const { data: currentGroup, error: groupFetchError } = await supabaseAdmin
        .from('groups')
        .select('current_students')
        .eq('id', body.group_id)
        .single()

      if (!groupFetchError && currentGroup) {
        const newCount = (currentGroup.current_students || 0) + 1
        
        const { error: updateError } = await supabaseAdmin
          .from('groups')
          .update({ 
            current_students: newCount,
            updated_at: new Date().toISOString()
          })
          .eq('id', body.group_id)

        if (updateError) {
          console.error('⚠️ Guruh sonini yangilashda xatolik:', updateError.message)
          // Bu xatolik critical emas, o'quvchi qo'shildi
        } else {
          console.log(`✅ Guruh o'quvchilar soni yangilandi: ${newCount}`)
        }
      }
    } catch (error) {
      console.error('⚠️ Guruh yangilashda xatolik:', error)
      // Continue, student already added
    }

    return NextResponse.json({
      success: true,
      message: 'O\'quvchi muvaffaqiyatli qo\'shildi!',
      data: newStudent
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

