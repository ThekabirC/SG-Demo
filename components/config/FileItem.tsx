'use client';

import React from 'react';
import { FileText } from 'lucide-react';
import { ContextFile } from '@/data/types';

interface FileItemProps {
  file: ContextFile;
  onToggle: (id: string) => void;
}

export default function FileItem({ file, onToggle }: FileItemProps) {
  return (
    <div className="flex items-center gap-3 py-2">
      <FileText size={20} className="text-red-500 flex-shrink-0" />
      <span className="flex-1 text-sm text-gray-700">{file.name}</span>
      <input
        type="checkbox"
        checked={file.enabled}
        onChange={() => onToggle(file.id)}
        className="w-4 h-4 rounded border-gray-300 text-[#0F7066] focus:ring-[#0F7066] accent-[#0F7066] cursor-pointer"
      />
    </div>
  );
}
