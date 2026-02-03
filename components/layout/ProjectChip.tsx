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
            ? 'bg-primary text-[#44EBA7] shadow-sm'
            : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-300 hover:bg-gray-50'
        }
      `}
    >
      <span className="text-sm font-medium">{project.name}</span>
      {project.badge !== undefined && (
        <span>
        </span>
      )}
    </button>
  );
}
