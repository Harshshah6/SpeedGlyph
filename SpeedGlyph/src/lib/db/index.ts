import Database from '@tauri-apps/plugin-sql';
import { TestResult } from './schema';

let dbInstance: Database | null = null;

export async function getDb(): Promise<Database> {
  if (dbInstance) return dbInstance;
  
  try {
    const db = await Database.load('sqlite:speedglyph.db');
    
    // Run migrations
    await db.execute(`
      CREATE TABLE IF NOT EXISTS test_results (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        wpm INTEGER NOT NULL,
        accuracy INTEGER NOT NULL,
        duration INTEGER NOT NULL,
        wordCount INTEGER NOT NULL,
        createdAt INTEGER NOT NULL
      )
    `);
    
    dbInstance = db;
    return db;
  } catch (error) {
    console.error('Failed to initialize database:', error);
    throw error;
  }
}

export async function insertTestResult(result: TestResult): Promise<void> {
  const db = await getDb();
  await db.execute(
    'INSERT INTO test_results (wpm, accuracy, duration, wordCount, createdAt) VALUES ($1, $2, $3, $4, $5)',
    [result.wpm, result.accuracy, result.duration, result.wordCount, result.createdAt]
  );
}

export async function getRecentTestResults(limit: number = 20): Promise<TestResult[]> {
  const db = await getDb();
  // Fetch results and order by newest first, but we will return them oldest first for the chart
  const results = await db.select<TestResult[]>(
    'SELECT * FROM test_results ORDER BY createdAt DESC LIMIT $1',
    [limit]
  );
  
  return results.reverse();
}

export async function getDashboardStats() {
  const db = await getDb();
  
  const [totals] = await db.select<any[]>(
    'SELECT COUNT(*) as testsCompleted, MAX(wpm) as topSpeed, AVG(wpm) as avgWpm FROM test_results'
  );
  
  return {
    testsCompleted: totals.testsCompleted || 0,
    topSpeed: totals.topSpeed || 0,
    avgWpm: Math.round(totals.avgWpm || 0)
  };
}
