'use client';

import React from 'react';
import { Plus } from 'lucide-react';
import { useProject } from '@/contexts/ProjectContext';
import { useModal } from '@/contexts/ModalContext';
import ProjectChip from './ProjectChip';

export default function Header() {
  const { projects, selectedProjectId, setSelectedProjectId } = useProject();
  const { openAddProjectModal } = useModal();

  return (
    <header className="fixed top-0 left-[60px] right-0 h-[60px] bg-background flex items-center px-6 z-40">
      {/* Project Chips - Scrollable */}
      <div className="flex-1 flex items-center gap-3 overflow-x-auto no-scrollbar py-2">
        {projects.map((project) => (
          <ProjectChip
            key={project.id}
            project={project}
            isSelected={project.id === selectedProjectId}
            onClick={() => setSelectedProjectId(project.id)}
          />
        ))}
      </div>

      {/* Add Project Button */}
      <button
        onClick={openAddProjectModal}
        className="flex items-center gap-2 px-4 py-2 text-[#2C2E38] hover:text-gray-900 transition-colors ml-4 whitespace-nowrap"
      >
        <span className="text-sm font-semibold">Add Project</span>
        <Plus size={18} />
      </button>
    </header>
  );
}
