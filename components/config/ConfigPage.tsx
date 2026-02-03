'use client';

import React from 'react';
import ContextPool from './ContextPool';
import GameplanTable from './GameplanTable';
import StrategiesSection from './StrategiesSection';

export default function ConfigPage() {
  return (
    <div className="h-[calc(100vh-60px)] p-4 overflow-hidden">
      <div className="grid grid-cols-[280px_1fr_380px] gap-4 h-full">
        <ContextPool />
        <GameplanTable />
        <StrategiesSection />
      </div>
    </div>
  );
}
