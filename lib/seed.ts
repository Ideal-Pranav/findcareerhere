import db from './db'
import careersData from '../data/careers.json'

export async function seedDatabase() {
  console.log('🌱 Seeding database...')

  // Clear existing careers
  db.prepare('DELETE FROM careers').run()

  // Insert careers
  const insertCareer = db.prepare(`
    INSERT INTO careers (
      id, category, career_option, stream, description,
      skills_required, entry_level_roles, mid_level_roles, senior_level_roles,
      salary_entry, salary_senior, min_age, max_age,
      passing_criteria_12th, top_colleges, popular_exams
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `)

  const insertMany = db.transaction((careers: Array<{ [key: string]: unknown }>) => {
    for (const career of careers) {
      insertCareer.run(
        career.id,
        career.category,
        career.career_option,
        career.stream,
        career.description,
        JSON.stringify(career.skills_required),
        career.entry_level_roles,
        career.mid_level_roles,
        career.senior_level_roles,
        career.salary_entry,
        typeof career.salary_senior === 'number' 
          ? career.salary_senior.toString() 
          : career.salary_senior,
        typeof career.min_age === 'number' 
          ? career.min_age.toString() 
          : career.min_age,
        typeof career.max_age === 'number' 
          ? career.max_age.toString() 
          : career.max_age,
        career.passing_criteria_12th,
        JSON.stringify(career.top_colleges),
        JSON.stringify(career.popular_exams)
      )
    }
  })

  insertMany(careersData)

  console.log(`✅ Seeded ${careersData.length} careers`)

  // Get counts
  const counts = db.prepare('SELECT COUNT(*) as count FROM careers').get() as { count: number }
  console.log(`📊 Total careers in database: ${counts.count}`)
}

// Run seed if this file is executed directly
if (require.main === module) {
  seedDatabase()
    .then(() => {
      console.log('✅ Seed complete')
      process.exit(0)
    })
    .catch((error) => {
      console.error('❌ Seed error:', error)
      process.exit(1)
    })
}
