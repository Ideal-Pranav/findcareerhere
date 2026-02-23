import { NextResponse } from 'next/server'
import { queryAll } from '@/lib/db'

// GET /api/colleges - List colleges with filters
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const search = searchParams.get('search')
    const location = searchParams.get('location')

    let query = 'SELECT * FROM colleges WHERE 1=1'
    const params: (string | number)[] = []

    if (category && category !== 'All') {
      query += ' AND career_category = ?'
      params.push(category)
    }

    if (location && location !== 'All') {
      query += ' AND location LIKE ?'
      params.push(`%${location}%`)
    }

    if (search) {
      query += ' AND (name LIKE ? OR location LIKE ?)'
      const searchTerm = `%${search}%`
      params.push(searchTerm, searchTerm)
    }

    query += ' ORDER BY rating DESC'

    const colleges = await queryAll(query, params)

    return NextResponse.json(colleges)
  } catch (error) {
    console.error('Error fetching colleges:', error)
    return NextResponse.json({ error: 'Failed to fetch colleges' }, { status: 500 })
  }
}
