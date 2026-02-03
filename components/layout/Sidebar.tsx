'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowLeftRight, SlidersHorizontal, User } from 'lucide-react';

export default function Sidebar() {
  const pathname = usePathname();
  const isTradeActive = pathname === '/' || pathname === '';
  const isConfigActive = pathname === '/config';

  return (
    <aside className="fixed left-0 top-0 h-screen w-[60px] bg-white border-r border-gray-100 flex flex-col items-center py-4 z-50">
      {/* Logo */}
      <div className="mb-8">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 2L2 7L12 12L22 7L12 2Z"
              stroke="#14B8A6"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M2 17L12 22L22 17"
              stroke="#14B8A6"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M2 12L12 17L22 12"
              stroke="#14B8A6"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* Navigation Icons */}
      <nav className="flex-1 flex flex-col items-center gap-3 mt-4">
        <Link
          href="/"
          className={`relative w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
            isTradeActive
              ? 'text-primary'
              : 'text-gray-400 hover:bg-gray-100 hover:text-gray-600'
          }`}
        >
          <ArrowLeftRight size={20} />
          {isTradeActive && (
            <span className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-4 bg-primary rounded-l-full" />
          )}
        </Link>

        <Link
          href="/config"
          className={`relative w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
            isConfigActive
              ? 'text-primary'
              : 'text-gray-400 hover:bg-gray-100 hover:text-gray-600'
          }`}
        >
          <SlidersHorizontal size={20} />
          {isConfigActive && (
            <span className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-4 bg-primary rounded-l-full" />
          )}
        </Link>
      </nav>

      {/* User Icon */}
      <div className="mt-auto mb-2">
        <button className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-white hover:bg-primary-dark transition-colors">
          <User size={18} />
        </button>
      </div>
    </aside>
  );
}
