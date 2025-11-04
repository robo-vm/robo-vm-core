'use client';

import { AreaChart as RechartsAreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface AreaChartProps {
  data: any[];
  xKey: string;
  yKey: string;
  color?: string;
}

export default function AreaChart({ data, xKey, yKey, color = '#d2618f' }: AreaChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <RechartsAreaChart data={data}>
        <defs>
          <linearGradient id={`gradient-${color}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={color} stopOpacity={0.8} />
            <stop offset="95%" stopColor={color} stopOpacity={0.1} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#1a2f4f" />
        <XAxis dataKey={xKey} stroke="#b0c4de" />
        <YAxis stroke="#b0c4de" />
        <Tooltip
          contentStyle={{
            backgroundColor: '#0b1e3e',
            border: '1px solid #1a2f4f',
            color: '#ffffff',
          }}
        />
        <Area
          type="monotone"
          dataKey={yKey}
          stroke={color}
          fill={`url(#gradient-${color})`}
          strokeWidth={2}
        />
      </RechartsAreaChart>
    </ResponsiveContainer>
  );
}

