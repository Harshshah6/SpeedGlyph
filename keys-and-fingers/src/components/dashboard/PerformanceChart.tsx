import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { TestResult } from '@/lib/db/schema';
import { useMemo } from 'react';

interface Props {
  data: TestResult[];
}

export function PerformanceChart({ data }: Props) {
  const chartData = useMemo(() => {
    return data.map((d, i) => ({
      index: i + 1,
      wpm: d.wpm,
      accuracy: d.accuracy,
      date: new Date(d.createdAt).toLocaleDateString()
    }));
  }, [data]);

  if (chartData.length === 0) {
    return (
      <div className="w-full h-[300px] flex items-center justify-center text-[color:var(--color-muted)] border border-[color:var(--color-border)] rounded-xl border-dashed">
        No test data available yet. Complete a test to see your performance!
      </div>
    );
  }

  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
          <XAxis 
            dataKey="index" 
            stroke="var(--color-muted)" 
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis 
            yAxisId="left" 
            stroke="var(--color-muted)" 
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'var(--color-card)', 
              borderColor: 'var(--color-border)',
              borderRadius: '8px',
              color: 'var(--color-foreground)'
            }}
            labelStyle={{ color: 'var(--color-muted)', marginBottom: '4px' }}
          />
          <Line 
            yAxisId="left"
            type="monotone" 
            dataKey="wpm" 
            stroke="var(--color-primary)" 
            strokeWidth={3}
            dot={{ r: 4, fill: 'var(--color-primary)', strokeWidth: 0 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
