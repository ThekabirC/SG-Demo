'use client';

import React from 'react';
import { X } from 'lucide-react';
import { useModal } from '@/contexts/ModalContext';
import DetailsPreview from './DetailsPreview';
import VerificationFlow from './VerificationFlow';

export default function AddProjectModal() {
  const { 
    isAddProjectModalOpen, 
    closeAddProjectModal, 
    setShowCloseConfirmation,
    showCloseConfirmation,
    verificationStep
  } = useModal();

  if (!isAddProjectModalOpen) return null;

  const handleClose = () => {
    if (verificationStep > 1) {
      setShowCloseConfirmation(true);
    } else {
      closeAddProjectModal();
    }
  };

  const handleConfirmClose = () => {
    closeAddProjectModal();
  };

  const handleCancelClose = () => {
    setShowCloseConfirmation(false);
  };

  return (
    <div className="modal-backdrop flex items-center justify-center">
      <div className="bg-white w-full h-full max-w-none flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-4 border-b border-border">
          <h1 className="text-xl font-semibold text-gray-900">Add Project</h1>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={24} className="text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-8">
          <div className="max-w-6xl mx-auto bg-white rounded-xl border border-border">
            <div className="grid grid-cols-2 gap-8 p-8">
              <DetailsPreview />
              <VerificationFlow />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-4 px-8 py-4 border-t border-border">
          <button
            onClick={handleClose}
            className="px-6 py-2 border border-gray-300 rounded-full text-gray-700 font-medium hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            disabled={verificationStep < 4}
            className={`px-6 py-2 rounded-full font-medium transition-colors ${
              verificationStep >= 4
                ? 'bg-primary text-white hover:bg-primary-dark'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
          >
            Launch Project
          </button>
        </div>
      </div>

      {/* Close Confirmation Dialog */}
      {showCloseConfirmation && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60]">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4 shadow-xl">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Discard changes?
            </h3>
            <p className="text-gray-600 mb-6">
              You have unsaved changes. Are you sure you want to close this form?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={handleCancelClose}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
              >
                Keep editing
              </button>
              <button
                onClick={handleConfirmClose}
                className="px-4 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors"
              >
                Discard
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
