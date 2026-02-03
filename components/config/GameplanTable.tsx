'use client';

import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { gameplanData } from '@/data/dummyData';
import { GameplanRow } from '@/data/types';
import StrategySelector from './StrategySelector';

export default function GameplanTable() {
  const [gameplan, setGameplan] = useState<GameplanRow[]>(gameplanData);

  const updateRow = (id: string, field: keyof GameplanRow, value: string | number) => {
    setGameplan((prev) =>
      prev.map((row) => (row.id === id ? { ...row, [field]: value } : row))
    );
  };

  return (
    <div className="config-card bg-white rounded-xl shadow-card p-5 h-[calc(100vh-92px)]">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-base font-semibold text-gray-900">Tomorrows Gameplan</h2>
        <button className="flex items-center gap-2 text-primary font-medium text-sm hover:text-primary-dark transition-colors">
          <Sparkles size={16} />
          Regenerate
        </button>
      </div>

      {/* Table */}
      <div>
        {/* Column Headers */}
        <div className="flex items-center py-2 text-xs text-gray-400 font-medium uppercase tracking-wide border-b border-gray-200">
          <div className="w-[70px]"></div>
          <div className="w-[80px]">Release Time</div>
          <div className="w-[130px] ml-2">Strategy</div>
          <div className="w-[70px] text-center">Units</div>
          <div className="w-[80px] text-center">Rate ₹/kwh</div>
        </div>

        {/* Rows */}
        {gameplan.map((row) => (
          <div
            key={row.id}
            className="flex items-center py-3 border-b border-gray-100"
          >
            {/* Timeslot */}
            <div className="w-[70px] text-sm text-gray-600">{row.timeslot}</div>

            {/* Release Time */}
            <div className="w-[80px]">
              <input
                type="text"
                value={row.releaseTime}
                onChange={(e) => updateRow(row.id, 'releaseTime', e.target.value)}
                className="w-full px-2 py-1.5 border border-primary-200 rounded-md text-sm text-primary-700 bg-primary-50 text-center focus:outline-none focus:border-primary font-medium"
              />
            </div>

            {/* Strategy */}
            <div className="w-[130px] ml-2">
              <StrategySelector
                strategyId={row.strategyId}
                onChange={(newId) => updateRow(row.id, 'strategyId', newId)}
              />
            </div>

            {/* Units */}
            <div className="w-[70px]">
              <input
                type="number"
                value={row.units}
                onChange={(e) => updateRow(row.id, 'units', parseFloat(e.target.value) || 0)}
                className="w-full px-2 py-1.5 border border-gray-200 rounded-md text-sm text-gray-700 text-center focus:outline-none focus:border-primary"
              />
            </div>

            {/* Rate */}
            <div className="w-[80px]">
              <input
                type="number"
                step="0.1"
                value={row.rate}
                onChange={(e) => updateRow(row.id, 'rate', parseFloat(e.target.value) || 0)}
                className="w-full px-2 py-1.5 border border-gray-200 rounded-md text-sm text-gray-700 text-center focus:outline-none focus:border-primary"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
