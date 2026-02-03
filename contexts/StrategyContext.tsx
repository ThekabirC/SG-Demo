'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Strategy } from '@/data/types';
import { strategies as initialStrategies } from '@/data/dummyData';

interface StrategyContextType {
  strategies: Strategy[];
  addStrategy: (strategy: Strategy) => void;
  updateStrategy: (id: string, updates: Partial<Strategy>) => void;
  toggleStrategyExpanded: (id: string) => void;
  getStrategyById: (id: string) => Strategy | undefined;
  getStrategyDisplayName: (id: string) => string;
}

const StrategyContext = createContext<StrategyContextType | undefined>(undefined);

export function StrategyProvider({ children }: { children: ReactNode }) {
  const [strategies, setStrategies] = useState<Strategy[]>(initialStrategies);

  const addStrategy = (strategy: Strategy) => {
    setStrategies((prev) => [...prev, strategy]);
  };

  const updateStrategy = (id: string, updates: Partial<Strategy>) => {
    setStrategies((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...updates } : s))
    );
  };

  const toggleStrategyExpanded = (id: string) => {
    setStrategies((prev) =>
      prev.map((s) => (s.id === id ? { ...s, isExpanded: !s.isExpanded } : s))
    );
  };

  const getStrategyById = (id: string) => {
    return strategies.find((s) => s.id === id);
  };

  const getStrategyDisplayName = (id: string) => {
    const strategy = strategies.find((s) => s.id === id);
    return strategy ? strategy.name : 'Unknown';
  };

  return (
    <StrategyContext.Provider
      value={{
        strategies,
        addStrategy,
        updateStrategy,
        toggleStrategyExpanded,
        getStrategyById,
        getStrategyDisplayName,
      }}
    >
      {children}
    </StrategyContext.Provider>
  );
}

export function useStrategy() {
  const context = useContext(StrategyContext);
  if (context === undefined) {
    throw new Error('useStrategy must be used within a StrategyProvider');
  }
  return context;
}
