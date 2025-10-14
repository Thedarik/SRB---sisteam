import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'

// GET - Barcha guruhlarni olish
export async function GET() {
  try {
    // Guruhlarni olish
    const { data: groups, error: groupsError } = await supabaseAdmin
      .from('groups')
      .select('*')
      .eq('status', 'active')
      .order('created_at', { ascending: false })

    if (groupsError) {
      console.error('❌ Guruhlarni yuklashda xatolik:', groupsError)
      return NextResponse.json(
        { 
          success: false,
          error: 'Guruhlarni yuklashda xatolik yuz berdi',
          details: groupsError.message 
        },
        { status: 500 }
      )
    }

    // Har bir guruh uchun faol o'quvchilar sonini hisoblash
    const groupsWithStudentCount = await Promise.all(
      (groups || []).map(async (group) => {
        const { count: activeStudentsCount, error: countError } = await supabaseAdmin
          .from('students')
          .select('*', { count: 'exact', head: true })
          .eq('group_id', group.id)
          .eq('status', 'active')

        if (countError) {
          console.error(`❌ Guruh ${group.id} uchun o'quvchilar sonini hisoblashda xatolik:`, countError)
          return {
            ...group,
            current_students: 0
          }
        }

        return {
          ...group,
          current_students: activeStudentsCount || 0
        }
      })
    )

    console.log('✅ Guruhlar faol o\'quvchilar soni bilan yuklandi:', groupsWithStudentCount.length)

    return NextResponse.json({
      success: true,
      data: groupsWithStudentCount
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



