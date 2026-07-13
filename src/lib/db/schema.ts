export interface TestResult {
  id?: number;
  wpm: number;
  accuracy: number;
  duration: number; // in seconds
  wordCount: number;
  createdAt: number; // unix timestamp
}
