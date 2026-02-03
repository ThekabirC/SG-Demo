'use client';

import Image from "next/image";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowLeftRight, Sparkles, User } from 'lucide-react';

export default function Sidebar() {
  const pathname = usePathname();
  const isTradeActive = pathname === '/' || pathname === '';
  const isConfigActive = pathname === '/config';

  return (
    <aside className="fixed left-0 top-0 h-screen w-[60px] bg-white border-r border-gray-100 flex flex-col items-center py-4 z-50">
      {/* Logo */}

     <div className="mb-8 flex items-center justify-center">
      <Image
        src="/assets/logo.png"
        alt="Logo"
        width={32}
        height={32}
        priority
      />
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
          <Sparkles size={20} />
          {isConfigActive && (
            <span className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-4 bg-primary rounded-l-full" />
          )}
        </Link>
      </nav>

      {/* User Icon */}
      {/*
      <div className="mt-auto mb-2">
        <button className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-white hover:bg-primary-dark transition-colors">
          <User size={18} />
        </button>
      </div>
      */}
    </aside>
    
  );
}
