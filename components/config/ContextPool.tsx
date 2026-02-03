'use client';

import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { globalContextFiles, localContextFiles } from '@/data/dummyData';
import { ContextFile } from '@/data/types';
import FileItem from './FileItem';

export default function ContextPool() {
  const [globalFiles, setGlobalFiles] = useState<ContextFile[]>(globalContextFiles);
  const [localFiles, setLocalFiles] = useState<ContextFile[]>(localContextFiles);

  const toggleGlobalFile = (id: string) => {
    setGlobalFiles((prev) =>
      prev.map((f) => (f.id === id ? { ...f, enabled: !f.enabled } : f))
    );
  };

  const toggleLocalFile = (id: string) => {
    setLocalFiles((prev) =>
      prev.map((f) => (f.id === id ? { ...f, enabled: !f.enabled } : f))
    );
  };

  return (
    <div className="config-card bg-white rounded-xl shadow-card p-5 h-[calc(100vh-92px)]">
      <h2 className="text-base font-semibold text-gray-900 mb-5">Context Pool</h2>

      {/* Global Section */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-medium text-gray-900">Global</h3>
          <button className="flex items-center gap-1 text-sm text-primary font-medium hover:text-primary-dark transition-colors">
            <Plus size={14} />
            Add more
          </button>
        </div>
        <div className="border-t border-gray-200 pt-3">
          {globalFiles.map((file) => (
            <FileItem key={file.id} file={file} onToggle={toggleGlobalFile} />
          ))}
        </div>
      </div>

      {/* Local Section */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-medium text-gray-900">Local</h3>
          <button className="flex items-center gap-1 text-sm text-primary font-medium hover:text-primary-dark transition-colors">
            <Plus size={14} />
            Add more
          </button>
        </div>
        <div className="border-t border-gray-200 pt-3">
          {localFiles.map((file) => (
            <FileItem key={file.id} file={file} onToggle={toggleLocalFile} />
          ))}
        </div>
      </div>
    </div>
  );
}
