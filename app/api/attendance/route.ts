import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'

// GET - Davomat ma'lumotlarini olish
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const groupId = searchParams.get('groupId')
    const date = searchParams.get('date')
    const studentId = searchParams.get('studentId')

    let query = supabaseAdmin
      .from('attendance')
      .select(`
        *,
        students:student_id (
          id,
          full_name,
          phone_number,
          passport_number
        ),
        groups:group_id (
          id,
          name,
          course_type
        )
      `)
      .order('date', { ascending: false })

    // Guruh bo'yicha filtr
    if (groupId) {
      query = query.eq('group_id', groupId)
    }

    // Sana bo'yicha filtr
    if (date) {
      query = query.eq('date', date)
    }

    // O'quvchi bo'yicha filtr
    if (studentId) {
      query = query.eq('student_id', studentId)
    }

    const { data, error } = await query

    if (error) {
      console.error('❌ Davomat ma\'lumotlarini yuklashda xatolik:', error)
      return NextResponse.json(
        { 
          success: false,
          error: 'Davomat ma\'lumotlarini yuklashda xatolik yuz berdi',
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

// POST - Yangi davomat belgilash
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    console.log('📥 Davomat ma\'lumotlari:', {
      student_id: body.student_id,
      group_id: body.group_id,
      date: body.date,
      status: body.status
    })
    
    // ✅ 1. VALIDATSIYA
    if (!body.student_id?.trim()) {
      return NextResponse.json(
        { 
          success: false,
          error: 'O\'quvchi ID sini kiriting!' 
        },
        { status: 400 }
      )
    }

    if (!body.group_id?.trim()) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Guruh ID sini kiriting!' 
        },
        { status: 400 }
      )
    }

    if (!body.date) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Sanani kiriting!' 
        },
        { status: 400 }
      )
    }

    if (!body.status || !['present', 'absent', 'late'].includes(body.status)) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Noto\'g\'ri holat! (present, absent yoki late bo\'lishi kerak)' 
        },
        { status: 400 }
      )
    }

    // ✅ 2. MAVJUD DAVOMATNI TEKSHIRISH
    const { data: existingAttendance, error: checkError } = await supabaseAdmin
      .from('attendance')
      .select('id, status')
      .eq('student_id', body.student_id)
      .eq('group_id', body.group_id)
      .eq('date', body.date)
      .maybeSingle()

    if (checkError && checkError.code !== 'PGRST116') {
      console.error('⚠️ Tekshirishda xatolik:', checkError)
    }

    // Agar davomat mavjud bo'lsa, uni yangilash
    if (existingAttendance) {
      const { data: updatedAttendance, error: updateError } = await supabaseAdmin
        .from('attendance')
        .update({ 
          status: body.status,
          updated_at: new Date().toISOString()
        })
        .eq('id', existingAttendance.id)
        .select(`
          *,
          students:student_id (
            id,
            full_name,
            phone_number
          ),
          groups:group_id (
            id,
            name,
            course_type
          )
        `)
        .single()

      if (updateError) {
        console.error('❌ UPDATE xatosi:', updateError)
        return NextResponse.json(
          { 
            success: false,
            error: 'Davomatni yangilashda xatolik yuz berdi',
            details: updateError.message
          },
          { status: 500 }
        )
      }

      console.log('✅ Davomat yangilandi:', updatedAttendance.id)

      return NextResponse.json({
        success: true,
        message: 'Davomat muvaffaqiyatli yangilandi!',
        data: updatedAttendance
      })
    }

    // ✅ 3. YANGI DAVOMAT QO'SHISH
    const attendanceData = {
      student_id: body.student_id.trim(),
      group_id: body.group_id.trim(),
      date: body.date,
      status: body.status
    }

    console.log('📝 Database ga yozilmoqda:', attendanceData)

    const { data: newAttendance, error: insertError } = await supabaseAdmin
      .from('attendance')
      .insert([attendanceData])
      .select(`
        *,
        students:student_id (
          id,
          full_name,
          phone_number
        ),
        groups:group_id (
          id,
          name,
          course_type
        )
      `)
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
          error: 'Davomat qo\'shishda xatolik yuz berdi',
          details: insertError.message
        },
        { status: 500 }
      )
    }

    console.log('✅ Davomat muvaffaqiyatli belgilandi:', newAttendance.id)

    return NextResponse.json({
      success: true,
      message: 'Davomat muvaffaqiyatli belgilandi!',
      data: newAttendance
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

// PUT - Bir nechta o'quvchilarni bir vaqtda davomat qilish
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    
    console.log('📥 Ko\'plab davomat ma\'lumotlari:', {
      attendances_count: body.attendances?.length,
      date: body.date,
      group_id: body.group_id
    })
    
    if (!body.attendances || !Array.isArray(body.attendances) || body.attendances.length === 0) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Davomat ma\'lumotlari massivi bo\'sh!' 
        },
        { status: 400 }
      )
    }

    const results = []
    const errors = []

    for (const attendance of body.attendances) {
      try {
        // Har bir davomat uchun POST metodini chaqirish
        const attendanceData = {
          student_id: attendance.student_id,
          group_id: attendance.group_id,
          date: attendance.date,
          status: attendance.status
        }

        // Mavjud davomatni tekshirish
        const { data: existing } = await supabaseAdmin
          .from('attendance')
          .select('id')
          .eq('student_id', attendance.student_id)
          .eq('group_id', attendance.group_id)
          .eq('date', attendance.date)
          .maybeSingle()

        if (existing) {
          // Yangilash
          const { data, error } = await supabaseAdmin
            .from('attendance')
            .update({ status: attendance.status, updated_at: new Date().toISOString() })
            .eq('id', existing.id)
            .select()
            .single()

          if (error) {
            errors.push({ student_id: attendance.student_id, error: error.message })
          } else {
            results.push(data)
          }
        } else {
          // Qo'shish
          const { data, error } = await supabaseAdmin
            .from('attendance')
            .insert([attendanceData])
            .select()
            .single()

          if (error) {
            errors.push({ student_id: attendance.student_id, error: error.message })
          } else {
            results.push(data)
          }
        }
      } catch (error: any) {
        errors.push({ student_id: attendance.student_id, error: error.message })
      }
    }

    if (errors.length > 0) {
      console.warn('⚠️ Ba\'zi davomatlar saqlanmadi:', errors)
    }

    console.log(`✅ ${results.length} ta davomat saqlandi, ${errors.length} ta xatolik`)

    return NextResponse.json({
      success: errors.length === 0,
      message: `${results.length} ta davomat muvaffaqiyatli saqlandi${errors.length > 0 ? `, ${errors.length} ta xatolik` : ''}`,
      data: results,
      errors: errors.length > 0 ? errors : undefined
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

