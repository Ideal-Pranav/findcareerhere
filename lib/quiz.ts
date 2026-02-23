import { quizQuestions, QuizAnswer, CareerMatch } from '@/data/quiz-questions'
import { queryOne, execute } from './db'

interface CareerScore {
  careerId: string
  careerName: string
  totalScore: number
  categoryScores: {
    interests: number
    skills: number
    preferences: number
    lifestyle: number
  }
  questionCount: {
    interests: number
    skills: number
    preferences: number
    lifestyle: number
  }
}

// Category weights in final calculation
const CATEGORY_WEIGHTS = {
  interests: 0.4,
  skills: 0.3,
  preferences: 0.2,
  lifestyle: 0.1,
}

export async function calculateQuizResults(answers: QuizAnswer[]): Promise<CareerMatch[]> {
  const careerScores: Map<string, CareerScore> = new Map()

  //Initialize scores for all careers mentioned in questions
  answers.forEach((answer) => {
    const question = quizQuestions.find((q) => q.id === answer.questionId)
    if (!question) return

    const selectedOption = question.options[answer.selectedOption]
    if (!selectedOption) return

    // Add scores from this answer
    Object.entries(selectedOption.weights).forEach(([careerId, weight]) => {
      if (!careerScores.has(careerId)) {
        careerScores.set(careerId, {
          careerId,
          careerName: '', // Will be filled from database
          totalScore: 0,
          categoryScores: {
            interests: 0,
            skills: 0,
            preferences: 0,
            lifestyle: 0,
          },
          questionCount: {
            interests: 0,
            skills: 0,
            preferences: 0,
            lifestyle: 0,
          },
        })
      }

      const career = careerScores.get(careerId)!
      career.categoryScores[question.category] += weight
      career.questionCount[question.category] += 1
    })
  })

  // Calculate final scores
  const matches: CareerMatch[] = []

  careerScores.forEach((score) => {
    // Normalize category scores (0-1 range)
    const normalizedScores = {
      interests:
        score.questionCount.interests > 0
          ? score.categoryScores.interests / score.questionCount.interests
          : 0,
      skills:
        score.questionCount.skills > 0
          ? score.categoryScores.skills / score.questionCount.skills
          : 0,
      preferences:
        score.questionCount.preferences > 0
          ? score.categoryScores.preferences / score.questionCount.preferences
          : 0,
      lifestyle:
        score.questionCount.lifestyle > 0
          ? score.categoryScores.lifestyle / score.questionCount.lifestyle
          : 0,
    }

    // Calculate weighted total score
    const totalScore =
      normalizedScores.interests * CATEGORY_WEIGHTS.interests +
      normalizedScores.skills * CATEGORY_WEIGHTS.skills +
      normalizedScores.preferences * CATEGORY_WEIGHTS.preferences +
      normalizedScores.lifestyle * CATEGORY_WEIGHTS.lifestyle

    // Get career name from database
    const career = await queryOne<{ career_option: string }>(
      'SELECT career_option FROM careers WHERE id = ?',
      [score.careerId]
    )

    if (career) {
      matches.push({
        careerId: score.careerId,
        careerName: career.career_option,
        matchPercentage: Math.round(totalScore * 100),
        score: {
          interests: Math.round(normalizedScores.interests * 100),
          skills: Math.round(normalizedScores.skills * 100),
          preferences: Math.round(normalizedScores.preferences * 100),
          lifestyle: Math.round(normalizedScores.lifestyle * 100),
        },
      })
    }
  })

  // Sort by match percentage and return top 5
  return matches
    .sort((a, b) => b.matchPercentage - a.matchPercentage)
    .slice(0, 5)
}

import crypto from 'crypto'

export async function saveQuizResult(userId: string, answers: QuizAnswer[], results: CareerMatch[]) {
  const id = crypto.randomBytes(16).toString('hex')
  
  await execute(
    `
    INSERT INTO quiz_results (id, user_id, results, answers, score, created_at)
    VALUES (?, ?, ?, ?, ?, ?)
  `,
    [
      id,
      userId,
      JSON.stringify(results),
      JSON.stringify(answers),
      JSON.stringify(results[0]?.score || {}),
      Math.floor(Date.now() / 1000),
    ]
  )

  return id
}
