'use client';

import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { currentBidsData } from '@/data/dummyData';
import { Bid, TimeslotBids } from '@/data/types';

export default function CurrentBidsCard() {
  // State for bids data (allows removal after confirm)
  const [bidsData, setBidsData] = useState<TimeslotBids[]>(currentBidsData);
  
  // State for selected bid IDs per timeslot: { 'timeslot': Set<bidId> }
  const [selectedBids, setSelectedBids] = useState<Record<string, Set<string>>>({});

  // Calculate accumulated units for a timeslot
  const getAccumulatedUnits = (timeslot: string, bids: Bid[]): number => {
    const selected = selectedBids[timeslot] || new Set();
    return bids
      .filter((bid) => selected.has(bid.id))
      .reduce((sum, bid) => sum + bid.units, 0);
  };

  // Check if a bid can be selected (won't exceed maxUnits)
  const canSelectBid = (timeslot: string, bid: Bid, maxUnits: number, bids: Bid[]): boolean => {
    const currentAccumulated = getAccumulatedUnits(timeslot, bids);
    return currentAccumulated + bid.units <= maxUnits;
  };

  // Toggle bid selection
  const toggleBidSelection = (timeslot: string, bid: Bid, maxUnits: number, bids: Bid[]) => {
    setSelectedBids((prev) => {
      const currentSet = new Set(prev[timeslot] || []);
      
      if (currentSet.has(bid.id)) {
        // Deselect
        currentSet.delete(bid.id);
      } else {
        // Check if we can select
        if (canSelectBid(timeslot, bid, maxUnits, bids)) {
          currentSet.add(bid.id);
        }
      }
      
      return {
        ...prev,
        [timeslot]: currentSet,
      };
    });
  };

  // Clear all selections for a timeslot
  const clearSelection = (timeslot: string) => {
    setSelectedBids((prev) => ({
      ...prev,
      [timeslot]: new Set(),
    }));
  };

  // Confirm selection - remove selected bids
  const confirmSelection = (timeslot: string) => {
    const selected = selectedBids[timeslot] || new Set();
    
    // Remove selected bids from the data
    setBidsData((prev) =>
      prev.map((slot) => {
        if (slot.timeslot === timeslot) {
          return {
            ...slot,
            bids: slot.bids.filter((bid) => !selected.has(bid.id)),
          };
        }
        return slot;
      })
    );
    
    // Clear selection
    clearSelection(timeslot);
  };

  // Check if timeslot has any selections
  const hasSelections = (timeslot: string): boolean => {
    const selected = selectedBids[timeslot];
    return selected ? selected.size > 0 : false;
  };

  return (
    <div className="trade-card bg-white rounded-xl shadow-card h-[calc(100vh-92px)]">
      {/* Header */}
      <div className="sticky top-0 bg-white px-4 pt-4 pb-3 border-b border-gray-200 rounded-t-xl z-10">
        <h2 className="text-base font-semibold text-gray-900">Current bids</h2>
      </div>

      {/* Content */}
      <div className="py-1">
        {bidsData.map((slotData) => {
          const { timeslot, maxUnits, bids } = slotData;
          const hasBids = bids && bids.length > 0;
          const accumulated = getAccumulatedUnits(timeslot, bids);
          const showSelectionBar = hasSelections(timeslot);

          return (
            <div key={timeslot} className="mb-4">
              {/* Timeslot Header */}
              <div className="px-4 py-2 text-sm font-semibold text-gray-900">
                {timeslot}
              </div>

              {hasBids ? (
                <>
                  {/* Selection Header Bar - shows when bids are selected */}
                  {showSelectionBar && (
                    <div className="mx-4 mb-2 px-4 py-2.5 bg-primary-50 rounded-lg flex items-center justify-between">
                      <span className="text-sm font-semibold text-primary-700">
                        {accumulated.toFixed(2)} of {maxUnits} kWh
                      </span>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => clearSelection(timeslot)}
                          className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                        >
                          Clear
                        </button>
                        <button
                          onClick={() => confirmSelection(timeslot)}
                          className="px-4 py-1.5 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-dark transition-colors"
                        >
                          Confirm
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Column Headers */}
                  <div className="flex items-center px-4 py-2 text-xs text-gray-400 font-medium uppercase tracking-wide border-b border-gray-100">
                    <div className="w-[90px]">Buyer ID</div>
                    <div className="w-[80px]">
                      Rate <span className="normal-case">₹/kWh</span>
                    </div>
                    <div className="w-[80px]">Units</div>
                    <div className="flex-1 text-right">Credits</div>
                  </div>

                  {/* Bids */}
                  {bids.map((bid) => {
                    const isSelected = selectedBids[timeslot]?.has(bid.id) || false;
                    const canSelect = canSelectBid(timeslot, bid, maxUnits, bids);

                    return (
                      <BidRowItem
                        key={bid.id}
                        bid={bid}
                        isSelected={isSelected}
                        canSelect={canSelect}
                        onToggle={() => toggleBidSelection(timeslot, bid, maxUnits, bids)}
                      />
                    );
                  })}
                </>
              ) : (
                <>
                  {/* Column Headers for empty state */}
                  <div className="flex items-center px-4 py-2 text-xs text-gray-400 font-medium uppercase tracking-wide border-b border-gray-100">
                    <div className="w-[90px]">Buyer ID</div>
                    <div className="w-[80px]">
                      Rate <span className="normal-case">₹/kWh</span>
                    </div>
                    <div className="w-[80px]">Units</div>
                    <div className="flex-1 text-right">Credits</div>
                  </div>
                  <div className="px-4 py-6 text-center text-sm text-gray-400 italic">
                    No Bids Available
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Inline BidRowItem component for cleaner state management
interface BidRowItemProps {
  bid: Bid;
  isSelected: boolean;
  canSelect: boolean;
  onToggle: () => void;
}

function BidRowItem({ bid, isSelected, canSelect, onToggle }: BidRowItemProps) {
  return (
    <div
      onClick={onToggle}
      className={`
        flex items-center px-4 py-3 text-sm transition-all cursor-pointer
        ${isSelected 
          ? 'bg-primary-50 border border-primary-300 rounded-lg mx-2 my-1' 
          : 'border-b border-gray-100 hover:bg-gray-50'
        }
        ${!canSelect && !isSelected ? 'opacity-50 cursor-not-allowed' : ''}
      `}
    >
      {/* Buyer ID */}
      <div className="w-[90px] text-gray-700 font-mono text-xs">
        {bid.buyerId}
      </div>

      {/* Rate */}
      <div className="w-[80px] font-medium text-gray-900">
        ₹{bid.rate.toFixed(2)}
      </div>

      {/* Units */}
      <div className="w-[80px]">
        <div className="font-medium text-gray-900">{bid.units.toFixed(2)} kWh</div>
        <div className="text-xs text-gray-500">Pledged</div>
      </div>

      {/* Credits */}
      <div className="flex-1 flex justify-end">
        {isSelected ? (
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">
            <Check size={16} />
          </div>
        ) : (
          <span className="inline-flex items-center px-3 py-1 rounded-full border border-gray-200 text-sm font-medium text-gray-700">
            ~ ₹{Math.abs(bid.credits).toFixed(2)}
          </span>
        )}
      </div>
    </div>
  );
}
