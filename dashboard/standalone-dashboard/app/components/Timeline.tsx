'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

interface TimelineProps {
  dates: Date[];
  selectedDate: Date;
  onDateChange: (date: Date) => void;
  autoPlay?: boolean;
  speed?: number; // milliseconds per date
}

export default function Timeline({ dates, selectedDate, onDateChange, autoPlay = true, speed = 2000 }: TimelineProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const timelineRef = useRef<HTMLDivElement>(null);
  const currentIndexRef = useRef(dates.findIndex(d => d.getTime() === selectedDate.getTime()));

  // Auto-play animation
  useEffect(() => {
    if (!autoPlay || isPaused || isDragging || dates.length === 0) return;

    const interval = setInterval(() => {
      currentIndexRef.current = (currentIndexRef.current + 1) % dates.length;
      onDateChange(dates[currentIndexRef.current]);
    }, speed);

    return () => clearInterval(interval);
  }, [autoPlay, isPaused, isDragging, dates, speed, onDateChange]);

  // Global mouse move handler for dragging
  useEffect(() => {
    if (!isDragging) return;

    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (!timelineRef.current) return;

      const rect = timelineRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percentage = Math.max(0, Math.min(1, x / rect.width));
      const index = Math.round(percentage * (dates.length - 1));
      
      if (index !== currentIndexRef.current && index >= 0 && index < dates.length) {
        currentIndexRef.current = index;
        onDateChange(dates[index]);
      }
    };

    const handleGlobalMouseUp = () => {
      setIsDragging(false);
    };

    window.addEventListener('mousemove', handleGlobalMouseMove);
    window.addEventListener('mouseup', handleGlobalMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove);
      window.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [isDragging, dates, onDateChange]);

  // Update current index when selectedDate changes externally
  useEffect(() => {
    const index = dates.findIndex(d => d.getTime() === selectedDate.getTime());
    if (index !== -1) {
      currentIndexRef.current = index;
    }
  }, [selectedDate, dates]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(true);
    setIsPaused(true);
    
    // Update position on click
    if (!timelineRef.current) return;
    const rect = timelineRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, x / rect.width));
    const index = Math.round(percentage * (dates.length - 1));
    
    if (index >= 0 && index < dates.length) {
      currentIndexRef.current = index;
      onDateChange(dates[index]);
    }
  }, [dates, onDateChange]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsPaused(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (!isDragging) {
      setIsPaused(false);
    }
  }, [isDragging]);

  if (dates.length === 0) return null;

  const selectedIndex = dates.findIndex(d => d.getTime() === selectedDate.getTime());
  const position = selectedIndex >= 0 ? (selectedIndex / (dates.length - 1)) * 100 : 0;

  return (
    <div className="w-full">
      <div
        ref={timelineRef}
        className="relative h-16 bg-robovm-border/30 rounded-lg cursor-pointer border border-robovm-border/50"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
      >
        {/* Timeline dates */}
        <div className="absolute inset-0 flex items-center justify-between px-2">
          {dates.map((date, index) => (
            <div
              key={date.getTime()}
              className="flex flex-col items-center"
              style={{ position: 'absolute', left: `${(index / (dates.length - 1)) * 100}%`, transform: 'translateX(-50%)' }}
            >
              <div
                className={`w-2 h-2 rounded-full transition-all ${
                  index === selectedIndex
                    ? 'bg-robovm-accent w-3 h-3'
                    : 'bg-robovm-text-secondary'
                }`}
              />
              <span className="text-xs text-robovm-text-secondary mt-1 whitespace-nowrap">
                {date.getDate()}
              </span>
            </div>
          ))}
        </div>

        {/* Animated line */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-robovm-accent transition-all duration-300 ease-linear"
          style={{
            left: `${position}%`,
            transform: 'translateX(-50%)',
            boxShadow: '0 0 10px rgba(210, 97, 143, 0.5)',
          }}
        />

        {/* Draggable indicator */}
        <div
          className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-robovm-accent rounded-full cursor-grab active:cursor-grabbing transition-all hover:scale-125"
          style={{
            left: `${position}%`,
            transform: 'translate(-50%, -50%)',
            boxShadow: '0 0 15px rgba(210, 97, 143, 0.7)',
          }}
        />
      </div>

      {/* Selected date display */}
      <div className="mt-2 text-center">
        <span className="text-sm text-robovm-text-secondary">
          {selectedDate.toLocaleDateString('ro-RO', { day: 'numeric', month: 'long', year: 'numeric' })}
        </span>
        {isPaused && (
          <span className="ml-2 text-xs text-robovm-accent">(Paused - drag to change)</span>
        )}
      </div>
    </div>
  );
}

