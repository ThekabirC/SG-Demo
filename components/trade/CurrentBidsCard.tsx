'use client';

import React from 'react';
import { currentBids } from '@/data/dummyData';
import BidRow from './BidRow';

export default function CurrentBidsCard() {
  const timeslots = Object.keys(currentBids);

  return (
    <div className="trade-card bg-white rounded-xl shadow-card h-[calc(100vh-92px)]">
      {/* Header */}
      <div className="sticky top-0 bg-white px-4 pt-4 pb-3 border-b border-gray-200 rounded-t-xl z-10">
        <h2 className="text-base font-semibold text-gray-900">Current bids</h2>
      </div>

      {/* Content */}
      <div className="py-1">
        {timeslots.map((timeslot) => {
          const bids = currentBids[timeslot];
          const hasBids = bids && bids.length > 0;

          return (
            <div key={timeslot} className="mb-4">
              {/* Timeslot Header */}
              <div className="px-4 py-2 text-sm font-semibold text-gray-900">
                {timeslot}
              </div>

              {hasBids ? (
                <>
                  {/* Column Headers */}
                  <div className="flex items-center px-4 py-2 text-xs text-gray-400 font-medium uppercase tracking-wide border-b border-gray-100">
                    <div className="w-[90px]">Buyer ID</div>
                    <div className="w-[70px]">Rate ₹/kWh</div>
                    <div className="w-[80px]">Units</div>
                    <div className="flex-1 text-right">Credits</div>
                  </div>

                  {/* Bids */}
                  {bids.map((bid) => (
                    <BidRow key={bid.id} bid={bid} />
                  ))}
                </>
              ) : (
                <div className="px-4 py-8 text-center text-sm text-gray-400 italic">
                  No Bids Available
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
