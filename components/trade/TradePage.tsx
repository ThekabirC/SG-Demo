'use client';

import React from 'react';
import TodaysTradesCard from './TodaysTradesCard';
import TomorrowsTradesCard from './TomorrowsTradesCard';
import CurrentBidsCard from './CurrentBidsCard';
import HistoryCard from './HistoryCard';

export default function TradePage() {
  return (
    <div className="trade-page">
      <TodaysTradesCard />
      <TomorrowsTradesCard />
      <CurrentBidsCard />
      <HistoryCard />
    </div>
  );
}
