// @ts-nocheck

import { queryAll } from './lib/db'

try {
  queryAll('SELECT COUNT(*) as count FROM scholarships').then(([row]) => {
    console.log('Scholarship count:', row?.count)
  })

  queryAll('SELECT * FROM scholarships').then((all) => {
    console.log('Scholarships:', JSON.stringify(all, null, 2))
  })
} catch (error) {
  console.error('Database error:', error)
}
