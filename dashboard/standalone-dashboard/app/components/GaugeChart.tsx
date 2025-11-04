'use client';

import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface GaugeChartProps {
  value: number;
  max: number;
}

export default function GaugeChart({ value, max }: GaugeChartProps) {
  const percentage = (value / max) * 100;
  const data = [
    { name: 'Used', value: percentage },
    { name: 'Remaining', value: 100 - percentage },
  ];

  const getColor = () => {
    if (percentage >= 80) return '#50c878';
    if (percentage >= 60) return '#f5a623';
    return '#e74c3c';
  };

  return (
    <div className="flex flex-col items-center">
      <ResponsiveContainer width="100%" height={200}>
        <RechartsPieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            startAngle={90}
            endAngle={-270}
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
          >
            <Cell fill={getColor()} />
            <Cell fill="#1a2f4f" />
          </Pie>
        </RechartsPieChart>
      </ResponsiveContainer>
      <div className="mt-4 text-center">
        <p className="text-4xl font-bold text-robovm-accent">{value.toFixed(1)}%</p>
        <p className="text-sm text-robovm-text-secondary mt-1">System Health</p>
      </div>
    </div>
  );
}

