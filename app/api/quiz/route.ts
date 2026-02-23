import { NextResponse } from 'next/server'
import { calculateQuizResults, saveQuizResult } from '@/lib/quiz'
import { QuizAnswer } from '@/data/quiz-questions'
import { queryAll } from '@/lib/db'

// POST /api/quiz - Calculate quiz results
export async function POST(request: Request) {
  try {
    const { answers, userId = 'demo-user' } = await request.json() as { answers: QuizAnswer[], userId?: string }

    if (!answers || !Array.isArray(answers)) {
      return NextResponse.json({ error: 'Invalid answers format' }, { status: 400 })
    }

    // Calculate matches
    const results = await calculateQuizResults(answers)

    // Save to database
    const resultId = await saveQuizResult(userId, answers, results)

    return NextResponse.json({
      resultId,
      matches: results,
    })
  } catch (error) {
    console.error('Error processing quiz:', error)
    return NextResponse.json({ error: 'Failed to process quiz' }, { status: 500 })
  }
}

// GET /api/quiz - Get user's quiz history
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId') || 'demo-user'

    const results = await queryAll(
      `
      SELECT * FROM quiz_results
      WHERE user_id = ?
      ORDER BY created_at DESC
      LIMIT 10
    `,
      [userId]
    )

    return NextResponse.json(results)
  } catch (error) {
    console.error('Error fetching quiz results:', error)
    return NextResponse.json({ error: 'Failed to fetch results' }, { status: 500 })
  }
}
