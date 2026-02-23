import { NextResponse } from 'next/server'
import { execute, queryAll, queryOne } from '@/lib/db'
import { randomBytes } from 'crypto'

function generateId() {
  return randomBytes(16).toString('hex')
}

// GET /api/bookmarks - List all user's bookmarks
export async function GET(request: Request) {
  try {
    // For now, we'll use a simple user ID from query params
    // Later we'll add proper authentication
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId') || 'demo-user'

    const bookmarks = await queryAll(
      `
      SELECT 
        b.id,
        b.career_id,
        b.created_at,
        c.*
      FROM bookmarks b
      JOIN careers c ON b.career_id = c.id
      WHERE b.user_id = ?
      ORDER BY b.created_at DESC
    `,
      [userId]
    )

    return NextResponse.json(bookmarks)
  } catch (error) {
    console.error('Error fetching bookmarks:', error)
    return NextResponse.json({ error: 'Failed to fetch bookmarks' }, { status: 500 })
  }
}

// POST /api/bookmarks - Add bookmark
export async function POST(request: Request) {
  try {
    const { careerId, userId = 'demo-user' } = await request.json()

    if (!careerId) {
      return NextResponse.json({ error: 'Career ID required' }, { status: 400 })
    }

    // Check if already bookmarked
    const existing = await queryOne(
      'SELECT * FROM bookmarks WHERE user_id = ? AND career_id = ?',
      [userId, careerId]
    )

    if (existing) {
      return NextResponse.json({ error: 'Already bookmarked' }, { status: 409 })
    }

    // Insert bookmark
    const id = generateId()
    await execute(
      'INSERT INTO bookmarks (id, user_id, career_id) VALUES (?, ?, ?)',
      [id, userId, careerId]
    )

    // Get the created bookmark with career data
    const bookmark = await queryOne(
      `
      SELECT 
        b.id,
        b.career_id,
        b.created_at,
        c.*
      FROM bookmarks b
      JOIN careers c ON b.career_id = c.id
      WHERE b.id = ?
    `,
      [id]
    )

    return NextResponse.json(bookmark, { status: 201 })
  } catch (error) {
    console.error('Error creating bookmark:', error)
    return NextResponse.json({ error: 'Failed to create bookmark' }, { status: 500 })
  }
}

// DELETE /api/bookmarks - Remove bookmark
export async function DELETE(request: Request) {
  try {
    const { careerId, userId = 'demo-user' } = await request.json()

    if (!careerId) {
      return NextResponse.json({ error: 'Career ID required' }, { status: 400 })
    }

   await execute(
      'DELETE FROM bookmarks WHERE user_id = ? AND career_id = ?',
      [userId, careerId]
    )

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting bookmark:', error)
    return NextResponse.json({ error: 'Failed to delete bookmark' }, { status: 500 })
  }
}
