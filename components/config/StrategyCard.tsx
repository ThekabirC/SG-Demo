'use client';

import React from 'react';
import { Settings, ChevronDown, Star } from 'lucide-react';
import { Strategy } from '@/data/types';
import { useStrategy } from '@/contexts/StrategyContext';

interface StrategyCardProps {
  strategy: Strategy;
}

export default function StrategyCard({ strategy }: StrategyCardProps) {
  const { updateStrategy, toggleStrategyExpanded } = useStrategy();

  const handleFieldChange = (field: keyof Strategy, value: string | number) => {
    updateStrategy(strategy.id, { [field]: value });
  };

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden mb-3">
      {/* Header */}
      <button
        onClick={() => toggleStrategyExpanded(strategy.id)}
        className="w-full flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors"
      >
        <Settings size={18} className="text-gray-400" />
        <span className="flex-1 text-left font-medium text-gray-900">
          {strategy.name} - {strategy.subtitle}
        </span>
        <ChevronDown
          size={18}
          className={`text-gray-400 transition-transform ${
            strategy.isExpanded ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Expanded Content */}
      {strategy.isExpanded && (
        <div className="p-4 border-t border-gray-200 space-y-4">
          {/* Starting Price */}
          <div>
            <label className="block text-xs text-gray-500 mb-1">Starting Price(₹)</label>
            <input
              type="number"
              step="0.1"
              value={strategy.startingPrice}
              onChange={(e) => handleFieldChange('startingPrice', parseFloat(e.target.value) || 0)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary"
            />
          </div>

          {/* Time Till Adjustment */}
          <div>
            <label className="block text-xs text-gray-500 mb-1">Time Till Adjustment (Minutes)</label>
            <input
              type="number"
              value={strategy.adjustmentTime}
              onChange={(e) => handleFieldChange('adjustmentTime', parseInt(e.target.value) || 0)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary"
            />
          </div>

          {/* Maximum Units */}
          <div>
            <label className="block text-xs text-gray-500 mb-1">Maximum Units</label>
            <input
              type="number"
              value={strategy.maxUnits}
              onChange={(e) => handleFieldChange('maxUnits', parseInt(e.target.value) || 0)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary"
            />
          </div>

          {/* Maximum Reduction */}
          <div>
            <label className="block text-xs text-gray-500 mb-1">Maximum Reduction/Adjustment Cycle (%)</label>
            <input
              type="text"
              value={`${strategy.maxReduction}%`}
              onChange={(e) => handleFieldChange('maxReduction', parseInt(e.target.value) || 0)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary"
            />
          </div>

          {/* Fallback cut-off Time */}
          <div>
            <label className="block text-xs text-gray-500 mb-1">Fallback cut-off Time</label>
            <input
              type="text"
              value={strategy.fallbackTime}
              onChange={(e) => handleFieldChange('fallbackTime', e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary"
            />
          </div>

          {/* Fallback Banner */}
          <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg text-sm text-gray-700">
            <Star size={16} className="text-yellow-500" />
            <span>Sell to SG @ ₹ 5.5 / kwh on fallback</span>
          </div>
        </div>
      )}
    </div>
  );
}
