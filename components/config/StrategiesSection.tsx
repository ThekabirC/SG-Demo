'use client';

import React from 'react';
import { Plus } from 'lucide-react';
import { useStrategy } from '@/contexts/StrategyContext';
import StrategyCard from './StrategyCard';
import ApiKeyInput from './ApiKeyInput';

export default function StrategiesSection() {
  const { strategies, addStrategy } = useStrategy();

  const handleAddStrategy = () => {
    const newId = (strategies.length + 1).toString();
    addStrategy({
      id: newId,
      name: `Logic ${newId}`,
      subtitle: 'New Strategy',
      startingPrice: 6.5,
      adjustmentTime: 120,
      maxUnits: 10,
      maxReduction: 30,
      fallbackTime: '07:00 PM',
      isExpanded: true,
    });
  };

  return (
    <div className="config-card bg-white rounded-xl shadow-card p-5 h-[calc(100vh-92px)] flex flex-col">
      {/* Top Section Wrapper */}
      <div className="flex-1">
        <h2 className="text-base font-semibold text-gray-900 mb-4">Strategies</h2>
  
        {/* Strategy Cards */}
        <div className="space-y-3">
          {strategies.map((strategy) => (
            <StrategyCard key={strategy.id} strategy={strategy} />
          ))}
        </div>
  
        {/* Add Strategy Button */}
        <button
          onClick={handleAddStrategy}
          className="flex items-center gap-2 text-primary font-medium text-sm mt-4 hover:text-primary-dark transition-colors"
        >
          <Plus size={14} />
          Add strategy
        </button>
      </div>
  
      {/* API Key Input - Pushed to bottom */}
      <div className="mt-auto pt-4">
        <ApiKeyInput />
      </div>
    </div>
  );
}
