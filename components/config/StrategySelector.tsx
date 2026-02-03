'use client';

import React from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { useStrategy } from '@/contexts/StrategyContext';

interface StrategySelectorProps {
  strategyId: string;
  onChange: (newStrategyId: string) => void;
}

export default function StrategySelector({ strategyId, onChange }: StrategySelectorProps) {
  const { strategies, getStrategyDisplayName } = useStrategy();

  const currentIndex = strategies.findIndex((s) => s.id === strategyId);
  const currentName = getStrategyDisplayName(strategyId);

  const handleUp = () => {
    const newIndex = currentIndex <= 0 ? strategies.length - 1 : currentIndex - 1;
    onChange(strategies[newIndex].id);
  };

  const handleDown = () => {
    const newIndex = currentIndex >= strategies.length - 1 ? 0 : currentIndex + 1;
    onChange(strategies[newIndex].id);
  };

  return (
    <div className="flex items-center gap-1">
      <div className="bg-primary-100 text-primary-700 px-3 py-1.5 rounded-md text-sm font-medium min-w-[80px]">
        {currentName}
      </div>
      <div className="flex flex-col">
        <button
          onClick={handleUp}
          className="p-0.5 hover:bg-gray-100 rounded transition-colors text-gray-400 hover:text-gray-600"
        >
          <ChevronUp size={14} />
        </button>
        <button
          onClick={handleDown}
          className="p-0.5 hover:bg-gray-100 rounded transition-colors text-gray-400 hover:text-gray-600"
        >
          <ChevronDown size={14} />
        </button>
      </div>
    </div>
  );
}
