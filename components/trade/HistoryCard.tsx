'use client';

import React from 'react';
import { historyData } from '@/data/dummyData';
import StatusBadge from './StatusBadge';

export default function HistoryCard() {
  return (
    <div className="trade-card bg-white rounded-xl shadow-card h-[calc(100vh-92px)]">
      {/* Header */}
      <div className="sticky top-0 bg-white px-4 pt-4 pb-3 border-b border-gray-200 rounded-t-xl z-10">
        <h2 className="text-base font-semibold text-gray-900">History</h2>
        
        {/* Column Headers */}
        <div className="flex items-center mt-4 text-xs text-gray-400 font-medium uppercase tracking-wide">
          <div className="w-[100px]">Time Slot</div>
          <div className="w-[80px]">Status</div>
          <div className="w-[90px]">Units</div>
          <div className="flex-1 text-right">Avg Rate ₹/kWh</div>
        </div>
      </div>

      {/* Content */}
      <div className="px-0 py-1">
        {historyData.map((item, index) => (
          <div
            key={item.id}
            className={`
              flex items-center px-4 py-3 text-sm
              ${index !== historyData.length - 1 ? 'border-b border-gray-100' : ''}
            `}
          >
            {/* Day */}
            <div className="w-[100px] font-medium text-gray-900">
              {item.day}
            </div>

            {/* Status */}
            <div className="w-[80px]">
              <StatusBadge status={item.status} />
            </div>

            {/* Units */}
            <div className="w-[90px]">
              <div className="font-medium text-gray-900">{item.units.toFixed(2)} kWh</div>
              <div className="text-xs text-gray-500">Produced</div>
            </div>

            {/* Avg Rate */}
            <div className="flex-1 text-right font-medium text-gray-900">
              ₹{item.avgRate.toFixed(2)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
