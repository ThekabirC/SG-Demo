'use client';

import React, { useState } from 'react';
import { apiKey as initialApiKey } from '@/data/dummyData';

export default function ApiKeyInput() {
  const [apiKey, setApiKey] = useState(initialApiKey);

  return (
    <div className="mt-6 pt-4 border-t border-gray-200">
      <h3 className="font-semibold text-gray-900 mb-3">API Key</h3>
      <input
        type="text"
        value={apiKey}
        onChange={(e) => setApiKey(e.target.value)}
        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 font-mono focus:outline-none focus:border-primary"
        placeholder="Enter API Key"
      />
    </div>
  );
}
