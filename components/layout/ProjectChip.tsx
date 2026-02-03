'use client';

import React from 'react';
import { Project } from '@/data/types';

interface ProjectChipProps {
  project: Project;
  isSelected: boolean;
  onClick: () => void;
}

export default function ProjectChip({ project, isSelected, onClick }: ProjectChipProps) {
  return (
    <button
      onClick={onClick}
      className={`
        flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all
        ${
          isSelected
            ? 'bg-primary text-white shadow-sm'
            : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-300 hover:bg-gray-50'
        }
      `}
    >
      <span className="text-sm font-medium">{project.name}</span>
      {project.badge !== undefined && (
        <span
          className={`
            w-5 h-5 rounded-full flex items-center justify-center text-xs font-medium
            ${isSelected ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-600'}
          `}
        >
          {project.badge}
        </span>
      )}
    </button>
  );
}
