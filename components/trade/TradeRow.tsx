'use client';

import React from 'react';
import { Trade } from '@/data/types';
import { getUnitsSubtext } from '@/data/dummyData';
import StatusBadge from './StatusBadge';

interface TradeRowProps {
  trade: Trade;
  showTimeslot?: boolean;
  isLastInGroup?: boolean;
}

export default function TradeRow({ trade, showTimeslot = true, isLastInGroup = false }: TradeRowProps) {
  const isHighlighted = trade.status === 'ongoing' || trade.status === 'searching';
  const unitsSubtext = getUnitsSubtext(trade.status);

  return (
    <div
      className={`
        flex items-center px-4 py-3 text-sm
        ${isHighlighted ? 'bg-primary-50 border border-primary-300 rounded-lg mx-2 my-1' : ''}
        ${!isHighlighted && !isLastInGroup ? 'border-b border-gray-100' : ''}
        ${!isHighlighted && isLastInGroup ? 'border-b border-gray-300' : ''}
      `}
    >
      {/* Time Slot */}
      <div className="w-[70px] font-medium text-gray-900">
        {showTimeslot ? trade.timeslot : ''}
      </div>

      {/* Status */}
      <div className="w-[90px]">
        <StatusBadge status={trade.status} />
      </div>

      {/* Units */}
      <div className="w-[80px]">
        <div className="font-medium text-gray-900">{trade.units.toFixed(2)} kWh</div>
        <div className="text-xs text-gray-500">{unitsSubtext}</div>
      </div>

      {/* Buyer ID */}
      <div className="w-[90px] text-gray-700 font-mono text-xs">
        {trade.buyerId}
      </div>

      {/* Rate */}
      <div className="flex-1 text-right font-medium text-gray-900">
        ₹{trade.rate.toFixed(2)}
      </div>
    </div>
  );
}
