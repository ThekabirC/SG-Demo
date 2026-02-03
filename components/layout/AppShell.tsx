'use client';

import React, { ReactNode } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { ProjectProvider } from '@/contexts/ProjectContext';
import { StrategyProvider } from '@/contexts/StrategyContext';
import { ModalProvider } from '@/contexts/ModalContext';
import AddProjectModal from '@/components/modal/AddProjectModal';

interface AppShellProps {
  children: ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  return (
    <ProjectProvider>
      <StrategyProvider>
        <ModalProvider>
          <div className="min-h-screen bg-background">
            <Sidebar />
            <Header />
            <main className="ml-[60px] mt-[60px]">
              {children}
            </main>
            <AddProjectModal />
          </div>
        </ModalProvider>
      </StrategyProvider>
    </ProjectProvider>
  );
}
