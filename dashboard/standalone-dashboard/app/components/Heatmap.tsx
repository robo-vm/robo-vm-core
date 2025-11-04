'use client';

interface HeatmapProps {
  data: { hour: number; day: number; value: number }[];
}

export default function Heatmap({ data }: HeatmapProps) {
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  const getValue = (hour: number, day: number) => {
    const item = data.find(d => d.hour === hour && d.day === day);
    return item?.value || 0;
  };

  const getColor = (value: number) => {
    if (value === 0) return 'bg-robovm-border';
    if (value < 20) return 'bg-purple-900';
    if (value < 40) return 'bg-purple-700';
    if (value < 60) return 'bg-purple-500';
    return 'bg-robovm-accent';
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-25 gap-1">
        <div></div>
        {hours.map(hour => (
          <div key={hour} className="text-xs text-robovm-text-secondary text-center">
            {hour}
          </div>
        ))}
        {days.map((day, dayIdx) => (
          <>
            <div key={day} className="text-xs text-robovm-text-secondary text-right pr-2">
              {day}
            </div>
            {hours.map(hour => {
              const value = getValue(hour, dayIdx);
              return (
                <div
                  key={`${day}-${hour}`}
                  className={`w-full aspect-square rounded ${getColor(value)} hover:opacity-80 transition-opacity`}
                  title={`${day} ${hour}:00 - ${value}`}
                />
              );
            })}
          </>
        ))}
      </div>
    </div>
  );
}

