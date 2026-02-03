'use client';

import React from 'react';
import { TradeStatus, HistoryStatus } from '@/data/types';

interface StatusBadgeProps {
  status: TradeStatus | HistoryStatus;
}

const statusConfig: Record<string, { label: string; className: string }> = {
  committed: {
    label: 'Committed',
    className: 'bg-green-100 text-green-700',
  },
  initiated: {
    label: 'Initiated',
    className: 'bg-yellow-100 text-yellow-700',
  },
  delivered: {
    label: 'Delivered',
    className: 'border border-green-700 bg-green-100 text-green-700',
  },
  ongoing: {
    label: '+ Ongoing',
    className: 'bg-primary-100 text-primary-700',
  },
  scheduled: {
    label: 'Scheduled',
    className: 'border border-green-700 text-green-700 bg-transparent',
  },
  ai_check: {
    label: 'AI Check',
    className: 'bg-purple-100 text-purple-700',
  },
  settled: {
    label: 'Settled',
    className: 'bg-green-100 text-green-700',
  },
  disputed: {
    label: 'Disputed',
    className: 'bg-red-100 text-red-700',
  },
  fully_fulfilled: {
    label: 'Fully fulfilled',
    className: 'bg-green-100 text-green-700',
  },
  partially_fulfilled: {
    label: 'Partially fulfilled',
    className: 'bg-amber-100 text-amber-700',
  },
  failed: {
    label: 'Failed',
    className: 'bg-orange-100 text-orange-700',
  },
  in_progress: {
    label: '+ In Progress',
    className: 'bg-primary-100 text-primary-700',
  },
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status] || { label: status, className: 'bg-gray-100 text-gray-700' };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium whitespace-nowrap ${config.className}`}
    >
      {config.label}
    </span>
  );
}
