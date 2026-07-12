import { useEffect, useState } from 'react';
import { getRecentTestResults, getDashboardStats } from '@/lib/db';
import { TestResult } from '@/lib/db/schema';
import { PerformanceChart } from './PerformanceChart';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';

export function Dashboard() {
  const [recentTests, setRecentTests] = useState<TestResult[]>([]);
  const [stats, setStats] = useState({ testsCompleted: 0, topSpeed: 0, avgWpm: 0 });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [tests, dashboardStats] = await Promise.all([
          getRecentTestResults(20),
          getDashboardStats()
        ]);
        setRecentTests(tests);
        setStats(dashboardStats);
      } catch (err) {
        console.error('Failed to load dashboard data:', err);
      } finally {
        setIsLoading(false);
      }
    }
    
    loadData();
  }, []);

  if (isLoading) {
    return <div className="w-full text-center py-20 text-[color:var(--color-muted)]">Loading analytics...</div>;
  }

  return (
    <div className="flex flex-col gap-8 w-full max-w-4xl mx-auto animate-in fade-in zoom-in-95 duration-300">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-[color:var(--color-muted)]">Average Speed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-primary">{stats.avgWpm} <span className="text-sm text-[color:var(--color-muted)] font-normal">WPM</span></div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-[color:var(--color-muted)]">Top Speed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-primary">{stats.topSpeed} <span className="text-sm text-[color:var(--color-muted)] font-normal">WPM</span></div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-[color:var(--color-muted)]">Tests Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-primary">{stats.testsCompleted}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Performance History (Last 20 Tests)</CardTitle>
        </CardHeader>
        <CardContent>
          <PerformanceChart data={recentTests} />
        </CardContent>
      </Card>
    </div>
  );
}
