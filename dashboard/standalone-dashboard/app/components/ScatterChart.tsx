'use client';

import { ScatterChart as RechartsScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ScatterChartProps {
  data: { x: number; y: number; name?: string }[];
  xKey: string;
  yKey: string;
  color?: string;
}

export default function ScatterChart({ data, xKey, yKey, color = '#d2618f' }: ScatterChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <RechartsScatterChart>
        <CartesianGrid strokeDasharray="3 3" stroke="#1a2f4f" />
        <XAxis dataKey={xKey} stroke="#b0c4de" />
        <YAxis dataKey={yKey} stroke="#b0c4de" />
        <Tooltip
          contentStyle={{
            backgroundColor: '#0b1e3e',
            border: '1px solid #1a2f4f',
            color: '#ffffff',
          }}
        />
        <Scatter data={data} fill={color} />
      </RechartsScatterChart>
    </ResponsiveContainer>
  );
}

