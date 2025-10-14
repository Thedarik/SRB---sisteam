import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'

// GET - Bitta o'quvchini ID bo'yicha olish
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const { data, error } = await supabaseAdmin
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
      .eq('id', id)
      .single()

    if (error) {
      console.error('❌ O\'quvchini yuklashda xatolik:', error)
      return NextResponse.json(
        { 
          success: false,
          error: 'O\'quvchi topilmadi',
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

// PUT - O'quvchini yangilash
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    
    console.log('📝 O\'quvchi yangilanmoqda:', id, body)
    
    // ✅ 1. VALIDATSIYA
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

    // ✅ 2. O'QUVCHI MAVJUDLIGINI TEKSHIRISH VA ESKI GURUH VA STATUS NI OLISH
    const { data: existingStudent, error: checkError } = await supabaseAdmin
      .from('students')
      .select('id, group_id, status')
      .eq('id', id)
      .single()

    if (checkError || !existingStudent) {
      return NextResponse.json(
        { 
          success: false,
          error: 'O\'quvchi topilmadi!' 
        },
        { status: 404 }
      )
    }

    const oldGroupId = existingStudent.group_id
    const oldStatus = existingStudent.status

    // ✅ 3. YANGI GURUH MAVJUDLIGINI TEKSHIRISH
    if (body.group_id) {
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
    }

    // ✅ 4. O'QUVCHINI YANGILASH
    const updateData = {
      full_name: body.full_name.trim(),
      phone_number: body.phone_number.trim(),
      passport_number: body.passport_number?.trim() || null,
      group_id: body.group_id || null,
      status: body.status || 'active',
      updated_at: new Date().toISOString()
    }

    const { data: updatedStudent, error: updateError } = await supabaseAdmin
      .from('students')
      .update(updateData)
      .eq('id', id)
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

    if (updateError) {
      console.error('❌ UPDATE xatosi:', updateError)
      
      if (updateError.code === '23505') {
        return NextResponse.json(
          { 
            success: false,
            error: 'Bu telefon raqam allaqachon ro\'yxatdan o\'tgan!' 
          },
          { status: 409 }
        )
      }
      
      return NextResponse.json(
        { 
          success: false,
          error: 'O\'quvchini yangilashda xatolik yuz berdi',
          details: updateError.message
        },
        { status: 500 }
      )
    }

    // ✅ 5. GURUH O'ZGARGANDA VA STATUS O'ZGARGANDA STUDENT SONLARINI YANGILASH
    const groupChanged = oldGroupId !== body.group_id
    const statusChanged = oldStatus !== body.status
    const newStatus = body.status || 'active'
    
    if (groupChanged || statusChanged) {
      console.log('📊 Guruh yoki status o\'zgardi, sonlarni yangilaymiz...', {
        groupChanged,
        statusChanged,
        oldGroupId,
        newGroupId: body.group_id,
        oldStatus,
        newStatus
      })
      
      // VARIANT 1: Guruh o'zgargan (va eski status faol edi)
      if (groupChanged && oldStatus === 'active' && oldGroupId) {
        try {
          const { data: oldGroup } = await supabaseAdmin
            .from('groups')
            .select('current_students')
            .eq('id', oldGroupId)
            .single()

          if (oldGroup) {
            const newCount = Math.max(0, (oldGroup.current_students || 1) - 1)
            await supabaseAdmin
              .from('groups')
              .update({ current_students: newCount })
              .eq('id', oldGroupId)
            console.log(`✅ Eski guruhdan o'chirildi: ${oldGroupId} → ${newCount}`)
          }
        } catch (error) {
          console.error('⚠️ Eski guruhni yangilashda xatolik:', error)
        }
      }

      // VARIANT 2: Guruh o'zgargan (va yangi status faol)
      if (groupChanged && newStatus === 'active' && body.group_id) {
        try {
          const { data: newGroup } = await supabaseAdmin
            .from('groups')
            .select('current_students')
            .eq('id', body.group_id)
            .single()

          if (newGroup) {
            const newCount = (newGroup.current_students || 0) + 1
            await supabaseAdmin
              .from('groups')
              .update({ current_students: newCount })
              .eq('id', body.group_id)
            console.log(`✅ Yangi guruhga qo'shildi: ${body.group_id} → ${newCount}`)
          }
        } catch (error) {
          console.error('⚠️ Yangi guruhni yangilashda xatolik:', error)
        }
      }
      
      // VARIANT 3: Faqat status o'zgargan (guruh o'zgarmagan)
      if (!groupChanged && statusChanged && body.group_id) {
        // Status: active → inactive
        if (oldStatus === 'active' && newStatus === 'inactive') {
          try {
            const { data: group } = await supabaseAdmin
              .from('groups')
              .select('current_students')
              .eq('id', body.group_id)
              .single()

            if (group) {
              const newCount = Math.max(0, (group.current_students || 1) - 1)
              await supabaseAdmin
                .from('groups')
                .update({ current_students: newCount })
                .eq('id', body.group_id)
              console.log(`✅ Status nofaol bo'ldi: ${body.group_id} → ${newCount}`)
            }
          } catch (error) {
            console.error('⚠️ Guruhni yangilashda xatolik:', error)
          }
        }
        
        // Status: inactive → active
        if (oldStatus === 'inactive' && newStatus === 'active') {
          try {
            const { data: group } = await supabaseAdmin
              .from('groups')
              .select('current_students')
              .eq('id', body.group_id)
              .single()

            if (group) {
              const newCount = (group.current_students || 0) + 1
              await supabaseAdmin
                .from('groups')
                .update({ current_students: newCount })
                .eq('id', body.group_id)
              console.log(`✅ Status faol bo'ldi: ${body.group_id} → ${newCount}`)
            }
          } catch (error) {
            console.error('⚠️ Guruhni yangilashda xatolik:', error)
          }
        }
      }
    }

    console.log('✅ O\'quvchi muvaffaqiyatli yangilandi:', updatedStudent.id)

    return NextResponse.json({
      success: true,
      message: 'O\'quvchi muvaffaqiyatli yangilandi!',
      data: updatedStudent
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

// DELETE - O'quvchini o'chirish
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    console.log('🗑️ O\'quvchi o\'chirilmoqda:', id)
    
    // ✅ 1. O'QUVCHINI OLISH (group_id ni bilish uchun)
    const { data: student, error: fetchError } = await supabaseAdmin
      .from('students')
      .select('id, group_id, full_name')
      .eq('id', id)
      .single()

    if (fetchError || !student) {
      return NextResponse.json(
        { 
          success: false,
          error: 'O\'quvchi topilmadi!' 
        },
        { status: 404 }
      )
    }

    const studentGroupId = student.group_id

    // ✅ 2. O'QUVCHINI O'CHIRISH
    const { error: deleteError } = await supabaseAdmin
      .from('students')
      .delete()
      .eq('id', id)

    if (deleteError) {
      console.error('❌ DELETE xatosi:', deleteError)
      return NextResponse.json(
        { 
          success: false,
          error: 'O\'quvchini o\'chirishda xatolik yuz berdi',
          details: deleteError.message
        },
        { status: 500 }
      )
    }

    // ✅ 3. GURUHNING CURRENT_STUDENTS SONINI KAMAYTIRISH
    if (studentGroupId) {
      try {
        const { data: group } = await supabaseAdmin
          .from('groups')
          .select('current_students')
          .eq('id', studentGroupId)
          .single()

        if (group) {
          const newCount = Math.max(0, (group.current_students || 1) - 1)
          
          await supabaseAdmin
            .from('groups')
            .update({ 
              current_students: newCount,
              updated_at: new Date().toISOString()
            })
            .eq('id', studentGroupId)

          console.log(`✅ Guruh o'quvchilar soni yangilandi: ${studentGroupId} → ${newCount}`)
        }
      } catch (error) {
        console.error('⚠️ Guruh yangilashda xatolik:', error)
        // Continue, student already deleted
      }
    }

    console.log('✅ O\'quvchi muvaffaqiyatli o\'chirildi:', student.full_name)

    return NextResponse.json({
      success: true,
      message: 'O\'quvchi muvaffaqiyatli o\'chirildi!'
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

