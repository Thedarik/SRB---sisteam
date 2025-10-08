import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// GET - Barcha o'quvchilarni olish
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const groupId = searchParams.get('groupId')

    let query = supabase
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
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      data: data,
      count: data?.length || 0
    })
  } catch (error) {
    console.error('Server error:', error)
    return NextResponse.json(
      { error: 'Server xatosi' },
      { status: 500 }
    )
  }
}

// POST - Yangi o'quvchi qo'shish
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    console.log('📥 Kelgan ma\'lumot:', body)
    
    // Validation
    if (!body.full_name || !body.phone_number || !body.group_id) {
      console.error('❌ Validation xatosi:', {
        full_name: !!body.full_name,
        phone_number: !!body.phone_number,
        group_id: !!body.group_id
      })
      return NextResponse.json(
        { error: 'Ism, telefon va guruh majburiy!' },
        { status: 400 }
      )
    }

    console.log('✅ Validation o\'tdi')

    // Telefon raqam tekshirish (unique) - error'ni ignore qilamiz
    const { data: existingStudent, error: checkError } = await supabase
      .from('students')
      .select('id')
      .eq('phone_number', body.phone_number)
      .maybeSingle()

    if (checkError) {
      console.log('⚠️ Telefon tekshirishda xato (ignore):', checkError.message)
    }

    if (existingStudent) {
      console.error('❌ Telefon raqam allaqachon mavjud')
      return NextResponse.json(
        { error: 'Bu telefon raqam allaqachon ro\'yxatdan o\'tgan!' },
        { status: 409 }
      )
    }

    console.log('✅ Telefon raqam unique')

    // O'quvchi qo'shish - sodda format
    console.log('📝 Database ga yozish...')
    const { data, error } = await supabase
      .from('students')
      .insert([
        {
          full_name: body.full_name,
          phone_number: body.phone_number,
          passport_number: body.passport_number || null,
          group_id: body.group_id,
          enrollment_date: new Date().toISOString(),
          status: 'active'
        }
      ])
      .select()
      .single()

    if (error) {
      console.error('❌ Supabase INSERT xatosi:', {
        code: error.code,
        message: error.message,
        details: error.details,
        hint: error.hint
      })
      return NextResponse.json(
        { 
          error: error.message,
          code: error.code,
          details: error.details 
        },
        { status: 500 }
      )
    }

    console.log('✅ O\'quvchi muvaffaqiyatli qo\'shildi:', data)

    return NextResponse.json({
      success: true,
      message: 'O\'quvchi muvaffaqiyatli qo\'shildi!',
      data: data
    }, { status: 201 })
  } catch (error: any) {
    console.error('❌ Server error:', error)
    return NextResponse.json(
      { 
        error: 'Server xatosi',
        message: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    )
  }
}

