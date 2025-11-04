'use client';

import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface BarChartProps {
  data: any[];
  xKey: string;
  yKey: string;
  color?: string;
  horizontal?: boolean;
}

export default function BarChart({ data, xKey, yKey, color = '#d2618f', horizontal = false }: BarChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <RechartsBarChart
        data={data}
        layout={horizontal ? 'vertical' : 'horizontal'}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#1a2f4f" />
        {horizontal ? (
          <>
            <XAxis type="number" stroke="#b0c4de" />
            <YAxis dataKey={xKey} type="category" stroke="#b0c4de" width={100} />
          </>
        ) : (
          <>
            <XAxis dataKey={xKey} stroke="#b0c4de" angle={-45} textAnchor="end" height={80} />
            <YAxis stroke="#b0c4de" />
          </>
        )}
        <Tooltip
          contentStyle={{
            backgroundColor: '#0b1e3e',
            border: '1px solid #1a2f4f',
            color: '#ffffff',
          }}
        />
        <Bar dataKey={yKey} fill={color} radius={[4, 4, 0, 0]} />
      </RechartsBarChart>
    </ResponsiveContainer>
  );
}

