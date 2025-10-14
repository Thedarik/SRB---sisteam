import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'

// GET - Fetch all rooms
export async function GET(request: NextRequest) {
  try {
    const supabase = supabaseAdmin

    const { data: rooms, error } = await supabase
      .from('rooms')
      .select('*')
      .order('name', { ascending: true })

    if (error) {
      console.error('Error fetching rooms:', error)
      return NextResponse.json(
        { error: 'Ma\'lumotlarni yuklashda xatolik', details: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({ data: rooms || [], count: rooms?.length || 0 })
  } catch (error: any) {
    console.error('Unexpected error in GET /api/rooms:', error)
    return NextResponse.json(
      { error: 'Server xatosi', details: error.message },
      { status: 500 }
    )
  }
}

// POST - Create new room
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, description, capacity, is_active } = body

    // Validation
    if (!name || name.trim() === '') {
      return NextResponse.json(
        { error: 'Xona nomi kiritilishi shart!' },
        { status: 400 }
      )
    }

    const supabase = supabaseAdmin

    // Check if room with this name already exists
    const { data: existingRoom } = await supabase
      .from('rooms')
      .select('id')
      .eq('name', name.trim())
      .single()

    if (existingRoom) {
      return NextResponse.json(
        { error: 'Bu nomdagi xona allaqachon mavjud!' },
        { status: 400 }
      )
    }

    // Insert new room
    const { data: newRoom, error } = await supabase
      .from('rooms')
      .insert([
        {
          name: name.trim(),
          description: description?.trim() || null,
          capacity: capacity || 30,
          is_active: is_active !== undefined ? is_active : true,
        },
      ])
      .select()
      .single()

    if (error) {
      console.error('Error creating room:', error)
      return NextResponse.json(
        { error: 'Xona yaratishda xatolik', details: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { data: newRoom, message: 'Xona muvaffaqiyatli yaratildi!' },
      { status: 201 }
    )
  } catch (error: any) {
    console.error('Unexpected error in POST /api/rooms:', error)
    return NextResponse.json(
      { error: 'Server xatosi', details: error.message },
      { status: 500 }
    )
  }
}

// DELETE - Delete all inactive rooms (optional bulk operation)
export async function DELETE(request: NextRequest) {
  try {
    const supabase = supabaseAdmin

    const { data, error } = await supabase
      .from('rooms')
      .delete()
      .eq('is_active', false)
      .select()

    if (error) {
      console.error('Error deleting inactive rooms:', error)
      return NextResponse.json(
        { error: 'Nofaol xonalarni o\'chirishda xatolik', details: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({
      data,
      message: `${data?.length || 0} ta nofaol xona o'chirildi`,
    })
  } catch (error: any) {
    console.error('Unexpected error in DELETE /api/rooms:', error)
    return NextResponse.json(
      { error: 'Server xatosi', details: error.message },
      { status: 500 }
    )
  }
}

