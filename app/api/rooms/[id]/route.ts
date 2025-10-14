import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'

// GET - Fetch single room by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = supabaseAdmin
    const { id } = await params

    const { data: room, error } = await supabase
      .from('rooms')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      console.error('Error fetching room:', error)
      return NextResponse.json(
        { error: 'Xonani yuklashda xatolik', details: error.message },
        { status: 500 }
      )
    }

    if (!room) {
      return NextResponse.json({ error: 'Xona topilmadi' }, { status: 404 })
    }

    return NextResponse.json({ data: room })
  } catch (error: any) {
    console.error('Unexpected error in GET /api/rooms/[id]:', error)
    return NextResponse.json(
      { error: 'Server xatosi', details: error.message },
      { status: 500 }
    )
  }
}

// PUT - Update room
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const body = await request.json()
    const { id } = await params
    const { name, description, capacity, is_active } = body

    // Validation
    if (!name || name.trim() === '') {
      return NextResponse.json(
        { error: 'Xona nomi kiritilishi shart!' },
        { status: 400 }
      )
    }

    const supabase = supabaseAdmin

    // Check if another room with this name exists
    const { data: existingRoom } = await supabase
      .from('rooms')
      .select('id')
      .eq('name', name.trim())
      .neq('id', id)
      .single()

    if (existingRoom) {
      return NextResponse.json(
        { error: 'Bu nomdagi xona allaqachon mavjud!' },
        { status: 400 }
      )
    }

    // Update room
    const { data: updatedRoom, error } = await supabase
      .from('rooms')
      .update({
        name: name.trim(),
        description: description?.trim() || null,
        capacity: capacity || 30,
        is_active: is_active !== undefined ? is_active : true,
      })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Error updating room:', error)
      return NextResponse.json(
        { error: 'Xonani yangilashda xatolik', details: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({
      data: updatedRoom,
      message: 'Xona muvaffaqiyatli yangilandi!',
    })
  } catch (error: any) {
    console.error('Unexpected error in PUT /api/rooms/[id]:', error)
    return NextResponse.json(
      { error: 'Server xatosi', details: error.message },
      { status: 500 }
    )
  }
}

// DELETE - Delete room
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = supabaseAdmin
    const { id } = await params

    // Check if room is being used by any groups
    const { data: groupsUsingRoom, error: checkError } = await supabase
      .from('groups')
      .select('id, name, room')
      .eq('room', id)

    if (checkError) {
      console.error('Error checking room usage:', checkError)
    }

    if (groupsUsingRoom && groupsUsingRoom.length > 0) {
      return NextResponse.json(
        {
          error: `Bu xonada ${groupsUsingRoom.length} ta guruh dars o'tmoqda. Avval guruhlarni boshqa xonaga ko'chiring!`,
          groups: groupsUsingRoom,
        },
        { status: 400 }
      )
    }

    // Delete room
    const { data: deletedRoom, error } = await supabase
      .from('rooms')
      .delete()
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Error deleting room:', error)
      return NextResponse.json(
        { error: 'Xonani o\'chirishda xatolik', details: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({
      data: deletedRoom,
      message: 'Xona muvaffaqiyatli o\'chirildi!',
    })
  } catch (error: any) {
    console.error('Unexpected error in DELETE /api/rooms/[id]:', error)
    return NextResponse.json(
      { error: 'Server xatosi', details: error.message },
      { status: 500 }
    )
  }
}

