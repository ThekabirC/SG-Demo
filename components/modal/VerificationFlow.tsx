'use client';

import React, { useState } from 'react';
import { Upload, Check, CheckCircle } from 'lucide-react';
import { useModal } from '@/contexts/ModalContext';
import { verifiedCredentials } from '@/data/dummyData';
import CredentialsCard from './CredentialsCard';

export default function VerificationFlow() {
  const { verificationStep, setVerificationStep } = useModal();
  const [vcNumber, setVcNumber] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [coordinates, setCoordinates] = useState('');

  const handleVerifyCode = () => {
    if (vcNumber && phoneNumber) {
      setVerificationStep(3);
    }
  };

  const handleSubmitCoordinates = () => {
    if (coordinates) {
      setVerificationStep(4);
    }
  };

  return (
    <div className="space-y-6">
      {/* Step Indicator */}
      {verificationStep >= 2 && (
        <p className="text-xs text-gray-500">Step 2</p>
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Verified Credentials</h2>
        {verificationStep >= 3 && (
          <span className="flex items-center gap-1.5 px-3 py-1 bg-primary text-white text-xs font-medium rounded-full">
            <CheckCircle size={14} />
            Verified
          </span>
        )}
      </div>

      {verificationStep < 3 ? (
        <>
          {/* Description */}
          <p className="text-sm text-gray-600">
            Please enter your VC number provided on your local utility&apos;s electricity bill
          </p>

          {/* VC Number Input */}
          <div>
            <label className="block text-xs text-gray-500 mb-1">
              {verificationStep >= 2 ? 'VC Number' : '16-digit VC Number'}
            </label>
            <input
              type="text"
              value={verificationStep >= 2 ? 'did:rcw:668f8a2e-e2a4-41ac-ab2b-d4a9f86984ad' : vcNumber}
              onChange={(e) => setVcNumber(e.target.value)}
              placeholder="16-digit VC Number"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary"
              readOnly={verificationStep >= 2}
            />
          </div>

          {/* PDF Upload */}
          <div className="border-2 border-dashed border-primary/30 rounded-lg p-8 flex flex-col items-center justify-center bg-primary/5">
            <Upload size={32} className="text-primary/50 mb-2" />
            <p className="text-sm text-gray-500">Upload VC PDF</p>
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-xs text-gray-500 mb-1">Registered Phone Number</label>
            <div className="flex">
              <span className="px-3 py-3 bg-gray-50 border border-r-0 border-gray-200 rounded-l-lg text-sm text-gray-500">
                +91
              </span>
              <input
                type="tel"
                value={verificationStep >= 2 ? '97909121202' : phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Registered Phone Number"
                className="flex-1 px-4 py-3 border border-gray-200 rounded-r-lg text-sm focus:outline-none focus:border-primary"
                readOnly={verificationStep >= 2}
              />
            </div>
          </div>

          {/* Verify Button */}
          <button
            onClick={handleVerifyCode}
            className="w-full py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors"
          >
            Verify Code
          </button>
        </>
      ) : (
        <>
          {/* Credentials Card */}
          <CredentialsCard credentials={verifiedCredentials} />

          {/* Location Coordinates */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Add Location Coordinates</h3>
            
            <div>
              <label className="block text-xs text-gray-500 mb-1">VC Number</label>
              <input
                type="text"
                value={coordinates || '26.8467° N, 80.9462° E'}
                onChange={(e) => setCoordinates(e.target.value)}
                placeholder="Enter coordinates"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary"
              />
            </div>

            {verificationStep >= 4 ? (
              <div className="flex items-center gap-2 text-primary">
                <Check size={18} />
                <span className="text-sm font-medium">Coordinates Confirmed</span>
              </div>
            ) : (
              <button
                onClick={handleSubmitCoordinates}
                className="w-full py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors"
              >
                Submit
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}
