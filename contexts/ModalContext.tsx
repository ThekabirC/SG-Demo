'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { VerificationStep } from '@/data/types';

interface ModalContextType {
  isAddProjectModalOpen: boolean;
  openAddProjectModal: () => void;
  closeAddProjectModal: () => void;
  verificationStep: VerificationStep;
  setVerificationStep: (step: VerificationStep) => void;
  resetModal: () => void;
  showCloseConfirmation: boolean;
  setShowCloseConfirmation: (show: boolean) => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [isAddProjectModalOpen, setIsAddProjectModalOpen] = useState(false);
  const [verificationStep, setVerificationStep] = useState<VerificationStep>(1);
  const [showCloseConfirmation, setShowCloseConfirmation] = useState(false);

  const openAddProjectModal = () => {
    setIsAddProjectModalOpen(true);
    setVerificationStep(1);
  };

  const closeAddProjectModal = () => {
    setIsAddProjectModalOpen(false);
    setShowCloseConfirmation(false);
    setVerificationStep(1);
  };

  const resetModal = () => {
    setVerificationStep(1);
    setShowCloseConfirmation(false);
  };

  return (
    <ModalContext.Provider
      value={{
        isAddProjectModalOpen,
        openAddProjectModal,
        closeAddProjectModal,
        verificationStep,
        setVerificationStep,
        resetModal,
        showCloseConfirmation,
        setShowCloseConfirmation,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
}
