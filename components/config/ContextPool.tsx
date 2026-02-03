'use client';

import React, { useState, useRef } from 'react';
import { Plus } from 'lucide-react';
import { globalContextFiles, localContextFiles } from '@/data/dummyData';
import { ContextFile } from '@/data/types';
import FileItem from './FileItem';

type UploadTarget = 'global' | 'local' | null;

export default function ContextPool() {
  const [globalFiles, setGlobalFiles] = useState<ContextFile[]>(globalContextFiles);
  const [localFiles, setLocalFiles] = useState<ContextFile[]>(localContextFiles);
  const [uploadTarget, setUploadTarget] = useState<UploadTarget>(null);
  
  // Reference to the hidden file input
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  // Trigger file picker for a specific section
  const handleAddMore = (target: 'global' | 'local') => {
    setUploadTarget(target);
    // Trigger the file input click
    fileInputRef.current?.click();
  };

  // Handle file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    
    if (file && uploadTarget) {
      // Validate it's a PDF
      if (!file.name.toLowerCase().endsWith('.pdf')) {
        alert('Please select a PDF file');
        return;
      }

      // Create new context file entry
      const newFile: ContextFile = {
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        name: file.name.replace(/\.pdf$/i, ''), // Remove .pdf extension for cleaner display
        enabled: true, // Checked by default
      };

      // Add to the appropriate list
      if (uploadTarget === 'global') {
        setGlobalFiles((prev) => [...prev, newFile]);
      } else {
        setLocalFiles((prev) => [...prev, newFile]);
      }
    }

    // Reset the file input and upload target
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setUploadTarget(null);
  };

  return (
    <div className="config-card bg-white rounded-xl shadow-card p-5 h-[calc(100vh-92px)]">
      <h2 className="text-base font-semibold text-gray-900 mb-5">Context Pool</h2>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,application/pdf"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Global Section */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-medium text-gray-900">Global</h3>
          <button 
            onClick={() => handleAddMore('global')}
            className="flex items-center gap-1 text-sm text-primary font-medium hover:text-primary-dark transition-colors"
          >
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
          <button 
            onClick={() => handleAddMore('local')}
            className="flex items-center gap-1 text-sm text-primary font-medium hover:text-primary-dark transition-colors"
          >
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
