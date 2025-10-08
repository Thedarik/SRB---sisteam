import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// GET - Bitta o'quvchini olish
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { data, error } = await supabase
      .from('students')
      .select(`
        *,
        groups:group_id (
          id,
          name,
          course_type,
          schedule,
          teacher_name
        )
      `)
      .eq('id', params.id)
      .single()

    if (error) {
      return NextResponse.json(
        { error: 'O\'quvchi topilmadi' },
        { status: 404 }
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

// PUT - O'quvchini tahrirlash
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()

    const { data, error } = await supabase
      .from('students')
      .update({
        full_name: body.full_name,
        phone_number: body.phone_number,
        passport_number: body.passport_number,
        group_id: body.group_id,
        status: body.status
      })
      .eq('id', params.id)
      .select(`
        *,
        groups:group_id (
          id,
          name,
          course_type
        )
      `)
      .single()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'O\'quvchi muvaffaqiyatli tahrirlandi!',
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

// DELETE - O'quvchini o'chirish
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { error } = await supabase
      .from('students')
      .delete()
      .eq('id', params.id)

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'O\'quvchi muvaffaqiyatli o\'chirildi!'
    })
  } catch (error) {
    console.error('Server error:', error)
    return NextResponse.json(
      { error: 'Server xatosi' },
      { status: 500 }
    )
  }
}

