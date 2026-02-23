import { NextResponse } from 'next/server'
import { queryAll } from '@/lib/db'

// GET /api/scholarships - List scholarships with filters
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const search = searchParams.get('search')

    let query = 'SELECT * FROM scholarships WHERE 1=1'
    const params: (string | number)[] = []

    if (category && category !== 'All') {
      query += ' AND category LIKE ?'
      params.push(`%${category}%`)
    }

    if (search) {
      query += ' AND (name LIKE ? OR provider LIKE ?)'
      const searchTerm = `%${search}%`
      params.push(searchTerm, searchTerm)
    }

    query += ' ORDER BY amount DESC'

    const scholarships = await queryAll(query, params)

    return NextResponse.json(scholarships)
  } catch (error) {
    console.error('Error fetching scholarships:', error)
    return NextResponse.json({ error: 'Failed to fetch scholarships' }, { status: 500 })
  }
}
