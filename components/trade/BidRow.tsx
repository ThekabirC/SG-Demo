'use client';

import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { Bid } from '@/data/types';

interface BidRowProps {
  bid: Bid;
}

export default function BidRow({ bid }: BidRowProps) {
  const [isHovered, setIsHovered] = useState(false);
  const isSelected = bid.selected;

  return (
    <div
      className={`
        flex items-center px-4 py-3 text-sm transition-all cursor-pointer
        ${isSelected ? 'bg-primary-50 border border-primary-300 rounded-lg mx-2 my-1' : ''}
        ${isHovered && !isSelected ? 'bg-primary-50 border border-primary-300 rounded-lg mx-2 my-1' : ''}
        ${!isHovered && !isSelected ? 'border-b border-gray-100 hover:bg-gray-50' : ''}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Buyer ID */}
      <div className="w-[90px] text-gray-700 font-mono text-xs">
        {bid.buyerId}
      </div>

      {/* Rate */}
      <div className="w-[70px] font-medium text-gray-900">
        ₹{bid.rate.toFixed(2)}
      </div>

      {/* Units */}
      <div className="w-[80px]">
        <div className="font-medium text-gray-900">{bid.units.toFixed(2)} kWh</div>
        <div className="text-xs text-gray-500">Pledged</div>
      </div>

      {/* Credits */}
      <div className="flex-1 text-right">
        {(isHovered || isSelected) ? (
          <button className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white hover:bg-primary-dark transition-colors ml-auto">
            <Check size={16} />
          </button>
        ) : (
          <span className="font-medium text-gray-900">-₹{Math.abs(bid.credits).toFixed(2)}</span>
        )}
      </div>
    </div>
  );
}
