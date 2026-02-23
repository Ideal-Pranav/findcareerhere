import path from 'path'
import { config } from 'dotenv'
import { createClient } from '@libsql/client'

// Explicitly load .env from project root for local scripts
config({ path: path.resolve(process.cwd(), '.env') })

const url = process.env.TURSO_DATABASE_URL
const authToken = process.env.TURSO_AUTH_TOKEN

if (!url) {
  throw new Error('TURSO_DATABASE_URL is not set')
}

export const db = createClient({
  url,
  authToken,
})

export async function queryAll<T = unknown>(sql: string, args: unknown[] = []): Promise<T[]> {
  const result = await db.execute(sql, args as any)
  return result.rows as T[]
}

export async function queryOne<T = unknown>(sql: string, args: unknown[] = []): Promise<T | undefined> {
  const result = await db.execute(sql, args as any)
  return (result.rows[0] as T) ?? undefined
}

export async function execute(sql: string, args: unknown[] = []): Promise<void> {
  await db.execute(sql, args as any)
}

export async function initDatabase() {
  // Users table
  await execute(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      name TEXT,
      email TEXT UNIQUE NOT NULL,
      email_verified INTEGER,
      image TEXT,
      created_at INTEGER DEFAULT (strftime('%s', 'now')),
      updated_at INTEGER DEFAULT (strftime('%s', 'now'))
    )
  `)

  await execute(`
    INSERT OR IGNORE INTO users (id, name, email)
    VALUES ('demo-user', 'Demo User', 'demo-user@example.com')
  `)

  await execute(`
    CREATE TABLE IF NOT EXISTS careers (
      id TEXT PRIMARY KEY,
      category TEXT NOT NULL,
      career_option TEXT NOT NULL,
      stream TEXT NOT NULL,
      description TEXT,
      skills_required TEXT,
      entry_level_roles TEXT,
      mid_level_roles TEXT,
      senior_level_roles TEXT,
      salary_entry INTEGER,
      salary_senior TEXT,
      min_age TEXT,
      max_age TEXT,
      passing_criteria_12th TEXT,
      top_colleges TEXT,
      popular_exams TEXT,
      views INTEGER DEFAULT 0,
      growth_rate TEXT,
      demand_level TEXT,
      trending_skills TEXT,
      roadmap TEXT,
      created_at INTEGER DEFAULT (strftime('%s', 'now')),
      updated_at INTEGER DEFAULT (strftime('%s', 'now'))
    )
  `)

  await execute(`
    CREATE TABLE IF NOT EXISTS colleges (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      location TEXT NOT NULL,
      rating REAL,
      fees_range TEXT,
      placement_avg TEXT,
      website TEXT,
      image TEXT,
      career_category TEXT,
      admission_process TEXT,
      created_at INTEGER DEFAULT (strftime('%s', 'now'))
    )
  `)

  await execute(`
    CREATE TABLE IF NOT EXISTS scholarships (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      provider TEXT NOT NULL,
      amount TEXT NOT NULL,
      eligibility TEXT,
      deadline TEXT,
      category TEXT,
      max_amount INTEGER,
      created_at INTEGER DEFAULT (strftime('%s', 'now'))
    )
  `)

  await execute(`
    CREATE TABLE IF NOT EXISTS bookmarks (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      career_id TEXT NOT NULL,
      created_at INTEGER DEFAULT (strftime('%s', 'now')),
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (career_id) REFERENCES careers(id) ON DELETE CASCADE,
      UNIQUE(user_id, career_id)
    )
  `)

  await execute(`
    CREATE TABLE IF NOT EXISTS quiz_results (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      results TEXT,
      answers TEXT,
      score TEXT,
      created_at INTEGER DEFAULT (strftime('%s', 'now')),
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )
  `)

  await execute(`
    CREATE TABLE IF NOT EXISTS sessions (
      id TEXT PRIMARY KEY,
      session_token TEXT UNIQUE NOT NULL,
      user_id TEXT NOT NULL,
      expires INTEGER NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )
  `)

  await execute(`
    CREATE TABLE IF NOT EXISTS accounts (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      type TEXT NOT NULL,
      provider TEXT NOT NULL,
      provider_account_id TEXT NOT NULL,
      refresh_token TEXT,
      access_token TEXT,
      expires_at INTEGER,
      token_type TEXT,
      scope TEXT,
      id_token TEXT,
      session_state TEXT,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      UNIQUE(provider, provider_account_id)
    )
  `)

  await execute(`
    CREATE TABLE IF NOT EXISTS verification_tokens (
      identifier TEXT NOT NULL,
      token TEXT UNIQUE NOT NULL,
      expires INTEGER NOT NULL,
      UNIQUE(identifier, token)
    )
  `)
}

// Initialize on import
void initDatabase()

export default db
