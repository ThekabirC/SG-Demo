'use client';

import React from 'react';
import { VerifiedCredentials } from '@/data/types';

interface CredentialsCardProps {
  credentials: VerifiedCredentials;
}

export default function CredentialsCard({ credentials }: CredentialsCardProps) {
  return (
    <div className="bg-gray-50 rounded-lg p-4 space-y-3">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-xs text-gray-500">Account Name</p>
          <p className="text-sm font-medium text-gray-900">{credentials.accountName}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">System Capacity</p>
          <p className="text-sm font-medium text-gray-900">{credentials.systemCapacity}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-xs text-gray-500">Consumer Number</p>
          <p className="text-sm font-medium text-gray-900">{credentials.consumerNumber}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Meter Number</p>
          <p className="text-sm font-medium text-gray-900">{credentials.meterNumber}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-xs text-gray-500">Commissioning Date</p>
          <p className="text-sm font-medium text-gray-900">{credentials.commissioningDate}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Generation Type</p>
          <p className="text-sm font-medium text-gray-900">{credentials.generationType}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-xs text-gray-500">Issuer Name</p>
          <p className="text-sm font-medium text-gray-900">{credentials.issuerName}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Phone</p>
          <p className="text-sm font-medium text-gray-900">{credentials.phone}</p>
        </div>
      </div>
    </div>
  );
}
