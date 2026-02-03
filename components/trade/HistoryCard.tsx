'use client';

import React from 'react';
import { historyData } from '@/data/dummyData';
import StatusBadge from './StatusBadge';

export default function HistoryCard() {
  // Group history items by date
  const groupedByDate: Record<string, typeof historyData> = {};
  historyData.forEach((item) => {
    if (!groupedByDate[item.date]) {
      groupedByDate[item.date] = [];
    }
    groupedByDate[item.date].push(item);
  });

  const dates = Object.keys(groupedByDate);

  return (
    <div className="trade-card-wide bg-white rounded-xl shadow-card h-[calc(100vh-92px)]">
      {/* Header */}
      <div className="sticky top-0 bg-white px-4 pt-4 pb-3 border-b border-gray-200 rounded-t-xl z-10">
        <h2 className="text-base font-semibold text-gray-900">History</h2>
        
        {/* Column Headers */}
        <div className="flex items-center mt-4 text-xs text-gray-400 font-medium">
          <div className="w-[90px]">Time Slot</div>
          <div className="w-[100px]">Committed</div>
          <div className="w-[90px]">Tariff</div>
          <div className="w-[100px]">Transferred</div>
          <div className="w-[90px]">Received</div>
          <div className="w-[120px]">Status</div>
          <div className="w-[120px] text-right">Buyer ID</div>
        </div>
      </div>

      {/* Content */}
      <div className="px-0 py-1">
        {dates.map((date) => {
          const items = groupedByDate[date];
          
          return (
            <div key={date}>
              {/* Date Header */}
              <div className="px-4 py-3 text-xs font-medium text-gray-900">
                {date}
              </div>

              {/* Rows for this date */}
              {items.map((item, index) => (
                <div
                  key={item.id}
                  className={`
                    flex items-center px-4 py-3 text-sm
                    ${index !== items.length - 1 ? 'border-b border-gray-100' : ''}
                  `}
                >
                  {/* Time Slot */}
                  <div className="w-[90px] text-gray-700">
                    {item.timeslot}
                  </div>

                  {/* Committed */}
                  <div className="w-[100px] font-medium text-gray-900">
                    {item.committed.toString().padStart(2, '0')} kWh
                  </div>

                  {/* Tariff */}
                  <div className="w-[90px] text-gray-700">
                    ₹{item.tariff}/kWh
                  </div>

                  {/* Transferred */}
                  <div className="w-[100px] font-medium text-gray-900">
                    {item.transferred.toString().padStart(2, '0')} kWh
                  </div>

                  {/* Received */}
                  <div className="w-[90px] text-gray-700">
                    ₹{item.received}
                  </div>

                  {/* Status */}
                  <div className="w-[120px]">
                    <StatusBadge status={item.status} />
                  </div>

                  {/* Buyer ID */}
                  <div className="w-[120px] text-right font-mono text-gray-700">
                    {item.buyerId}
                  </div>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
