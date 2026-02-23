import { execute, queryAll } from './db'

type RoadmapStage = {
  stage: string
  title: string
  description: string
  duration: string
  milestones: string[]
}

type RoadmapMap = Record<string, RoadmapStage[]>

// Specific, high-detail roadmaps for key flagship careers
const roadmaps: RoadmapMap = {
  // Engineering & Tech
  'software-engineering': [
    {
      stage: 'Class 11-12',
      title: 'Strong Science Foundation',
      description: 'Focus on Physics, Chemistry, and Mathematics with early programming exposure.',
      duration: '2 Years',
      milestones: [
        'Choose Science (PCM) in Class 11',
        'Strengthen Algebra, Calculus, and Logical Reasoning',
        'Start basic coding in C++/Python/Java',
        'Build 1–2 small projects (calculator, simple game, etc.)',
      ],
    },
    {
      stage: 'Entrance Exams',
      title: 'Engineering Entrance Preparation',
      description: 'Prepare for national and state-level engineering entrance exams.',
      duration: '6–18 Months',
      milestones: [
        'Cover JEE Main/Advanced syllabus (or relevant state exams)',
        'Give multiple mock tests and analyze mistakes',
        'Shortlist target colleges (IIT, NIT, private institutes)',
      ],
    },
    {
      stage: 'Undergraduate Degree',
      title: 'B.Tech / B.E. in CSE or related branch',
      description: 'Build strong CS fundamentals and a project portfolio.',
      duration: '4 Years',
      milestones: [
        'Master Data Structures & Algorithms',
        'Learn web/backend/mobile development',
        'Participate in hackathons and coding contests',
        'Do at least 1–2 internships by 3rd year',
        'Build a GitHub portfolio and LinkedIn presence',
      ],
    },
    {
      stage: 'Early Career',
      title: 'Junior / Associate Software Engineer',
      description: 'Enter the industry and grow as a problem solver.',
      duration: '1–3 Years',
      milestones: [
        'Work on production codebases and code reviews',
        'Learn system design basics and cloud fundamentals',
        'Contribute to open source or internal tools',
        'Prepare for senior roles or product-based companies',
      ],
    },
  ],
  'mechanical-engineering': [
    {
      stage: 'Class 11-12',
      title: 'Physics & Mechanics Foundation',
      description: 'Build strong fundamentals in Physics and Mathematics.',
      duration: '2 Years',
      milestones: [
        'Choose Science (PCM) in Class 11',
        'Focus on Mechanics and Thermodynamics concepts',
        'Explore basic engineering drawing/graphics',
      ],
    },
    {
      stage: 'Entrance & Admission',
      title: 'Engineering Entrance Path',
      description: 'Target reputed mechanical engineering colleges.',
      duration: '1 Year',
      milestones: [
        'Prepare for JEE / state CET / private college exams',
        'Shortlist colleges with strong mechanical departments',
        'Understand course structure and industry links',
      ],
    },
    {
      stage: 'Undergraduate Degree',
      title: 'B.Tech / B.E. in Mechanical',
      description: 'Gain exposure to core mechanical subjects and labs.',
      duration: '4 Years',
      milestones: [
        'Study Thermodynamics, Fluid Mechanics, SOM, Machine Design',
        'Get hands-on with CAD/CAM tools (AutoCAD, SolidWorks, etc.)',
        'Complete industrial training or internships',
        'Work on final-year project aligned with industry needs',
      ],
    },
    {
      stage: 'Specialization & Career',
      title: 'First Job / Higher Studies',
      description: 'Decide between job roles and higher education.',
      duration: '2–4 Years',
      milestones: [
        'Join as Graduate Engineer Trainee or Design Engineer',
        'Consider M.Tech/MS or management (MBA) based on interests',
        'Develop specialization in automotive, manufacturing, robotics, etc.',
        'Pursue certifications like Six Sigma if relevant',
      ],
    },
  ],
  'mbbs-doctor': [
    {
      stage: 'Class 11-12',
      title: 'Pre-Medical Foundation',
      description: 'Deep focus on Biology along with Physics and Chemistry.',
      duration: '2 Years',
      milestones: [
        'Choose Science (PCB) in Class 11',
        'Build strong NCERT foundation in Biology, Physics, Chemistry',
        'Develop disciplined study routine and long sitting capacity',
      ],
    },
    {
      stage: 'Entrance Preparation',
      title: 'NEET UG Journey',
      description: 'Crack NEET UG to enter a good medical college.',
      duration: '1–2 Years',
      milestones: [
        'Cover NEET syllabus with repeated revisions',
        'Give regular mock tests and analyze accuracy/speed',
        'Aim for high rank to access top government colleges',
      ],
    },
    {
      stage: 'MBBS Degree',
      title: 'Medical School Training',
      description: 'Intense academic and clinical exposure.',
      duration: '5.5 Years',
      milestones: [
        'Study Anatomy, Physiology, Biochemistry in early years',
        'Do clinical postings across major departments',
        'Complete compulsory internship (1 year)',
        'Decide broad area of interest for specialization',
      ],
    },
    {
      stage: 'Postgraduate & Practice',
      title: 'Specialization & Senior Roles',
      description: 'Grow into a specialist and senior clinician.',
      duration: '3–7 Years',
      milestones: [
        'Prepare for NEET PG / INI-CET or equivalent exams',
        'Complete MD/MS or Diplomate programs',
        'Work as Senior Resident, then Consultant',
        'Optionally move into medical administration or academics',
      ],
    },
  ],
}

// Category-based default roadmaps for clearer guidance
const categoryRoadmaps: Record<string, RoadmapStage[]> = {
  'Engineering & Tech': [
    {
      stage: 'Class 11-12',
      title: 'STEM Foundation',
      description: 'Focus on Physics, Chemistry, and Mathematics with logical reasoning.',
      duration: '2 Years',
      milestones: [
        'Choose Science (PCM) in Class 11',
        'Regular practice of numericals and problem solving',
        'Explore basic programming and technology news',
      ],
    },
    {
      stage: 'Entrance & Admission',
      title: 'Engineering Entrance Route',
      description: 'Prepare for central/state engineering entrance exams and admissions.',
      duration: '1–2 Years',
      milestones: [
        'Cover entrance exam syllabus (JEE / CET / institute tests)',
        'Attempt mock tests and analyze performance',
        'Shortlist colleges based on branch and placement record',
      ],
    },
    {
      stage: 'Undergraduate Studies',
      title: 'Core Engineering Learning',
      description: 'Understand core subjects, labs, and hands-on projects.',
      duration: '4 Years',
      milestones: [
        'Attend labs and project-based courses seriously',
        'Participate in technical clubs and competitions',
        'Complete at least one industry internship',
      ],
    },
    {
      stage: 'Early Career',
      title: 'Entry-Level Engineer',
      description: 'Start as a trainee or junior engineer and learn industry practices.',
      duration: '1–3 Years',
      milestones: [
        'Understand industry tools, processes, and standards',
        'Take ownership of small modules or projects',
        'Seek mentors and continuous upskilling',
      ],
    },
  ],
  'Medical & Healthcare': [
    {
      stage: 'Class 11-12',
      title: 'PCB Foundation',
      description: 'Build strong Biology fundamentals with Physics and Chemistry support.',
      duration: '2 Years',
      milestones: [
        'Choose Science (PCB) in Class 11',
        'Strengthen NCERT concepts in Biology',
        'Develop disciplined daily study schedule',
      ],
    },
    {
      stage: 'Entrance / Admissions',
      title: 'Medical/Paramedical Entry Path',
      description: 'Prepare for NEET or relevant entrance exams for healthcare programs.',
      duration: '1–2 Years',
      milestones: [
        'Cover exam syllabus through coaching or self-study',
        'Attempt previous year papers and mock tests',
        'Shortlist courses (MBBS, BDS, Nursing, BPT, etc.) and colleges',
      ],
    },
    {
      stage: 'Professional Degree',
      title: 'Medical / Healthcare Training',
      description: 'Gain both theoretical knowledge and clinical/practical exposure.',
      duration: '3–6 Years',
      milestones: [
        'Complete academic semesters with good understanding',
        'Participate actively in labs, clinics, or hospital postings',
        'Build communication and empathy with patients',
      ],
    },
    {
      stage: 'Early Practice',
      title: 'Entry-Level Healthcare Professional',
      description: 'Start working in hospitals, clinics, or labs to apply skills.',
      duration: '1–3 Years',
      milestones: [
        'Work under supervision of seniors initially',
        'Develop patient-handling and case-management skills',
        'Consider super-specialization or certifications',
      ],
    },
  ],
}

export async function seedRoadmaps() {
  console.log('🌱 Seeding Roadmaps...')

  // Ensure column exists
  try {
    await execute('ALTER TABLE careers ADD COLUMN roadmap TEXT')
    console.log('✅ Added roadmap column to careers table')
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : String(error)
    if (!errMsg.includes('duplicate column')) {
      // ignore other errors for now
    }
  }

  const updateSql = 'UPDATE careers SET roadmap = ? WHERE id = ?'

  // Using a generic roadmap for others (fallback if no ID or category match)
  const genericRoadmap: RoadmapStage[] = [
    {
      stage: "Education",
      title: "Bachelor's Degree",
      description: "Pursue a relevant undergraduate degree.",
      duration: "3-4 Years",
      milestones: ["Core Subjects", "Internships", "Final Year Project"]
    },
    {
      stage: "Career Start",
      title: "Entry Level Job",
      description: "Gain practical experience.",
      duration: "1-2 Years",
      milestones: ["Junior Role", "On-job Training"]
    }
  ]

  // Update specific ones (by exact career ID)
  for (const [id, roadmap] of Object.entries(roadmaps)) {
    await execute(updateSql, [JSON.stringify(roadmap), id])
  }

  // Update all others with category-specific or generic roadmap
  const allCareers = await queryAll<{ id: string; category: string }>('SELECT id, category FROM careers')
  for (const career of allCareers) {
    if (!roadmaps[career.id]) {
      const categoryRoadmap = categoryRoadmaps[career.category]
      const roadmapToUse = categoryRoadmap ?? genericRoadmap
      await execute(updateSql, [JSON.stringify(roadmapToUse), career.id])
    }
  }

  console.log('✅ Roadmaps updated for all careers')
}

if (require.main === module) {
  seedRoadmaps()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error(err)
      process.exit(1)
    })
}
