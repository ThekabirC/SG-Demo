'use client';

import React from 'react';
import { Shield } from 'lucide-react';
import { newProjectDetails } from '@/data/dummyData';
import ImageCarousel from './ImageCarousel';

export default function DetailsPreview() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <h2 className="text-lg font-semibold text-gray-900">Details Preview</h2>
        <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
          Only visible to you
        </span>
      </div>

      {/* Project Info */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
          <span className="text-primary font-semibold text-sm">A 26</span>
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">{newProjectDetails.name}</h3>
          <p className="text-sm text-gray-500">
            Installed by <span className="text-gray-700">{newProjectDetails.installedBy}</span>
          </p>
        </div>
      </div>

      {/* Image Carousel */}
      <ImageCarousel />

      {/* Secured Generation Banner */}
      <div className="flex items-center gap-3 p-3 bg-primary/5 rounded-lg">
        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
          <Shield size={16} className="text-primary" />
        </div>
        <div className="flex-1">
          <span className="text-sm text-gray-700">
            <span className="font-medium">Secured Generation</span> is enabled for this project.
          </span>
          <button className="text-sm text-primary font-medium ml-2 hover:underline">
            Learn More
          </button>
        </div>
      </div>

      {/* About the Project */}
      <div>
        <h4 className="font-semibold text-gray-900 mb-2">About the Project</h4>
        <p className="text-sm text-gray-600 leading-relaxed">
          {newProjectDetails.description}
        </p>
      </div>
    </div>
  );
}
