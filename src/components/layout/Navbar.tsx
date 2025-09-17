'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { categories } from '@/lib/constants';


export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleCategoryClick = (category: string) => {
    router.push(`/products?category=${encodeURIComponent(category)}`);
    setIsOpen(false);
  };

  return (
    <nav className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
          {/* Categories Menu */}
          <div className="relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center px-3 py-2 text-sm font-medium hover:bg-gray-700 rounded-md"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              Categories
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {isOpen && (
              <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
                <div className="py-1">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => handleCategoryClick(category)}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 first-letter:uppercase"
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Navigation Links */}
          <div className="flex space-x-6">
            <Link
              href="/products?sort=newest"
              className="text-sm hover:text-gray-300"
            >
              New Arrivals
            </Link>
            <Link
              href="/products?featured=true"
              className="text-sm hover:text-gray-300"
            >
              Featured
            </Link>
            <Link
              href="/products?sale=true"
              className="text-sm hover:text-gray-300"
            >
              Sale
            </Link>
            <Link
              href="/products?deals=true"
              className="text-sm hover:text-gray-300"
            >
              Today&apos;s Deals
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};