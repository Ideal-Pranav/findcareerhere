// @ts-nocheck
import { PrismaClient } from '@prisma/client'
import careersData from '../data/careers.json'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Clear existing data
  console.log('Clearing existing careers...')
  await prisma.career.deleteMany({})

  // Import careers
  console.log('Importing careers from JSON...')
  
  for (const career of careersData) {
    await prisma.career.create({
      data: {
        id: career.id,
        category: career.category,
        careerOption: career.career_option,
        stream: career.stream,
        description: career.description,
        skillsRequired: career.skills_required,
        entryLevelRoles: career.entry_level_roles,
        midLevelRoles: career.mid_level_roles,
        seniorLevelRoles: career.senior_level_roles,
        salaryEntry: career.salary_entry,
        salarySenior: typeof career.salary_senior === 'number' 
          ? career.salary_senior.toString() 
          : career.salary_senior,
        minAge: typeof career.min_age === 'number' 
          ? career.min_age.toString() 
          : career.min_age,
        maxAge: typeof career.max_age === 'number' 
          ? career.max_age.toString() 
          : career.max_age,
        passingCriteria12th: career.passing_criteria_12th,
        topColleges: career.top_colleges,
        popularExams: career.popular_exams,
        views: 0,
        trendingSkills: [],
      }
    })
  }

  console.log(`✅ Successfully imported ${careersData.length} careers`)
  
  // Get stats
  const totalUsers = await prisma.user.count()
  const totalCareers = await prisma.career.count()
  const totalBookmarks = await prisma.bookmark.count()

  console.log('\n📊 Database Stats:')
  console.log(`   Users: ${totalUsers}`)
  console.log(`   Careers: ${totalCareers}`)
  console.log(`   Bookmarks: ${totalBookmarks}`)
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
