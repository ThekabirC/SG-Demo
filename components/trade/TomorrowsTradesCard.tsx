'use client';

import React from 'react';
import { tomorrowsTrades } from '@/data/dummyData';
import TradeRow from './TradeRow';

export default function TomorrowsTradesCard() {
  // Group trades by timeslot
  const groupedTrades: { [key: string]: typeof tomorrowsTrades } = {};
  tomorrowsTrades.forEach((trade) => {
    if (!groupedTrades[trade.timeslot]) {
      groupedTrades[trade.timeslot] = [];
    }
    groupedTrades[trade.timeslot].push(trade);
  });

  const timeslots = Object.keys(groupedTrades);

  return (
    <div className="trade-card bg-white rounded-xl shadow-card h-[calc(100vh-92px)]">
      {/* Header */}
      <div className="sticky top-0 bg-white px-4 pt-4 pb-3 border-b border-gray-200 rounded-t-xl z-10">
        <h2 className="text-base font-semibold text-gray-900">Tomorrows Trades</h2>
        
        {/* Column Headers */}
        <div className="flex items-center mt-4 text-xs text-gray-400 font-medium">
          <div className="w-[80px]">Time Slot</div>
          <div className="w-[100px]">Status</div>
          <div className="w-[90px]">Units</div>
          <div className="w-[100px]">Buyer ID</div>
          <div className="flex-1 text-right">Rate ₹/kWh</div>
        </div>
      </div>

      {/* Content */}
      <div className="px-0 py-1">
        {timeslots.map((timeslot, timeslotIndex) => {
          const trades = groupedTrades[timeslot];
          const isLastTimeslot = timeslotIndex === timeslots.length - 1;

          return (
            <div key={timeslot}>
              {trades.map((trade, tradeIndex) => {
                const isFirstInGroup = tradeIndex === 0;
                const isLastInGroup = tradeIndex === trades.length - 1 && !isLastTimeslot;

                return (
                  <TradeRow
                    key={trade.id}
                    trade={trade}
                    showTimeslot={isFirstInGroup}
                    isLastInGroup={isLastInGroup}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
