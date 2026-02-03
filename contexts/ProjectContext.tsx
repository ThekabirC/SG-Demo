'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Project } from '@/data/types';
import { projects as initialProjects } from '@/data/dummyData';

interface ProjectContextType {
  projects: Project[];
  selectedProjectId: string;
  setSelectedProjectId: (id: string) => void;
  addProject: (project: Project) => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export function ProjectProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [selectedProjectId, setSelectedProjectId] = useState<string>(initialProjects[1]?.id || '1');

  const addProject = (project: Project) => {
    setProjects((prev) => [...prev, project]);
    setSelectedProjectId(project.id);
  };

  return (
    <ProjectContext.Provider
      value={{
        projects,
        selectedProjectId,
        setSelectedProjectId,
        addProject,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
}

export function useProject() {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error('useProject must be used within a ProjectProvider');
  }
  return context;
}
