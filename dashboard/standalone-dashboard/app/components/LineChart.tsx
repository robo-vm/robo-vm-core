'use client';

import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface LineChartProps {
  data: any[];
  xKey: string;
  yKey: string;
  color?: string;
  multiLine?: any[];
}

export default function LineChart({ data, xKey, yKey, color = '#d2618f', multiLine }: LineChartProps) {
  if (multiLine && multiLine.length > 0) {
    return (
      <ResponsiveContainer width="100%" height={300}>
        <RechartsLineChart data={data}>
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
          <Legend />
          {multiLine.map((line, idx) => (
            <Line
              key={line.robotId}
              type="monotone"
              dataKey={yKey}
              data={line.data}
              name={line.robotName}
              stroke={idx === 0 ? color : idx === 1 ? '#4a90e2' : '#50c878'}
              strokeWidth={2}
            />
          ))}
        </RechartsLineChart>
      </ResponsiveContainer>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <RechartsLineChart data={data}>
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
        <Line
          type="monotone"
          dataKey={yKey}
          stroke={color}
          strokeWidth={2}
          dot={{ fill: color, r: 4 }}
        />
      </RechartsLineChart>
    </ResponsiveContainer>
  );
}

