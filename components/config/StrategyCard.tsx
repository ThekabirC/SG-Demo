'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Settings, ChevronDown, Star, Trash2, Orbit, SunMedium } from 'lucide-react';
import { Strategy } from '@/data/types';
import { useStrategy } from '@/contexts/StrategyContext';

interface StrategyCardProps {
  strategy: Strategy;
}

// Helper to create a snapshot of strategy values for comparison
const getStrategySnapshot = (strategy: Strategy) => ({
  name: strategy.name,
  subtitle: strategy.subtitle,
  startingPrice: strategy.startingPrice,
  adjustmentTime: strategy.adjustmentTime,
  maxUnits: strategy.maxUnits,
  maxReduction: strategy.maxReduction,
  fallbackTime: strategy.fallbackTime,
});

export default function StrategyCard({ strategy }: StrategyCardProps) {
  const { updateStrategy, deleteStrategy, toggleStrategyExpanded } = useStrategy();
  
  // Store the "saved" snapshot to compare against
  const [savedSnapshot, setSavedSnapshot] = useState(() => getStrategySnapshot(strategy));
  
  // Track if there are unsaved changes
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Check for changes whenever strategy updates
  const checkForChanges = useCallback(() => {
    const current = getStrategySnapshot(strategy);
    const hasChanges = 
      current.name !== savedSnapshot.name ||
      current.subtitle !== savedSnapshot.subtitle ||
      current.startingPrice !== savedSnapshot.startingPrice ||
      current.adjustmentTime !== savedSnapshot.adjustmentTime ||
      current.maxUnits !== savedSnapshot.maxUnits ||
      current.maxReduction !== savedSnapshot.maxReduction ||
      current.fallbackTime !== savedSnapshot.fallbackTime;
    
    setHasUnsavedChanges(hasChanges);
  }, [strategy, savedSnapshot]);

  useEffect(() => {
    checkForChanges();
  }, [checkForChanges]);

  // Reset snapshot when card is expanded (to track changes from this point)
  useEffect(() => {
    if (strategy.isExpanded) {
      setSavedSnapshot(getStrategySnapshot(strategy));
      setHasUnsavedChanges(false);
    }
  }, [strategy.isExpanded]);

  const handleFieldChange = (field: keyof Strategy, value: string | number) => {
    updateStrategy(strategy.id, { [field]: value });
  };

  const handleSave = () => {
    // Update the saved snapshot to current values
    setSavedSnapshot(getStrategySnapshot(strategy));
    setHasUnsavedChanges(false);
  };

  const handleDelete = () => {
    deleteStrategy(strategy.id);
  };

  return (
    <div className="border-2 border-purple-200 rounded-[24] overflow-hidden">
      {/* Header */}
      <button
        onClick={() => toggleStrategyExpanded(strategy.id)}
        className="w-full flex items-center gap-2 p-3 hover:bg-gray-50 transition-colors"
      >
        <Orbit size={18} className="text-[#0B2742]" />
        <span className="flex-1 text-left font-medium text-gray-900">
          {strategy.name} - {strategy.subtitle}
        </span>
        <ChevronDown
          size={18}
          className={`text-[#0B2742] transition-transform ${
            strategy.isExpanded ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Expanded Content */}
      {strategy.isExpanded && (
        <div className="p-4 border-t border-gray-200 space-y-4">
          {/* Logic Name (editable) */}
          <div>
            <label className="block text-xs text-gray-500 mb-1">Logic Name</label>
            <input
              type="text"
              value={strategy.name}
              onChange={(e) => handleFieldChange('name', e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm font-medium focus:outline-none focus:border-primary"
              placeholder="Enter logic name"
            />
          </div>

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
          <div className="flex items-center gap-2 p-3 bg-yellow-50 rounded-lg text-sm text-gray-700">
            <SunMedium size={24} className="text-amber-500" />
            <span className="text-sm font-medium text-[#2C2E38]">Sell to SG @ ₹ 5.5 / kwh on fallback</span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-2 border-t border-gray-100">
            <button
              onClick={handleDelete}
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
            >
              <Trash2 size={16} />
              Delete
            </button>
            <button
              onClick={handleSave}
              disabled={!hasUnsavedChanges}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                hasUnsavedChanges
                  ? 'bg-primary text-white hover:bg-primary-dark'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
