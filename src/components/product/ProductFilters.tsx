'use client';

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import {
  setCategory,
  setPriceRange,
  addBrand,
  removeBrand,
  setRating,
  setInStock,
  resetFilters,
} from '../../store/slices/filtersSlice';
import { brands, categories } from '@/lib/constants'
import Link from 'next/link';

interface ProductFiltersProps {
  setShowFilters: React.Dispatch<React.SetStateAction<boolean>>
}


export const ProductFilters: React.FC<ProductFiltersProps> = ({setShowFilters}) => {
  const dispatch = useDispatch();
  const filters = useSelector((state: RootState) => state.filters);

  const handleCategoryChange = (category: string) => {
    dispatch(setCategory(category === filters.category ? '' : category));
  };

  const handleBrandChange = (brand: string, checked: boolean) => {
    if (checked) {
      dispatch(addBrand(brand));
    } else {
      dispatch(removeBrand(brand));
    }
  };

  const handlePriceChange = (field: 'min' | 'max', value: number) => {
    dispatch(setPriceRange({
      ...filters.priceRange,
      [field]: value
    }));
  };

  const handleResetFilters = () => {
    dispatch(resetFilters());
    setShowFilters(false)
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
        <button
          onClick={handleResetFilters}
          className="text-sm text-blue-600 hover:text-blue-800"
        >
          Reset All
        </button>
      </div>

      <div className="space-y-6">
        {/* Category Filter */}
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-3">Category</h3>
          <div className="space-y-2">
            {categories.map((category) => (
              <Link  key={category}  href={`/products?category=${encodeURIComponent(category)}`}
             
              >
              <label className="flex items-center my-2"
              >
                <input
                  type="radio"
                  name="category"
                  checked={filters.category === category}
                  onChange={() => {handleCategoryChange(category)
                    setShowFilters(false)
                  }}
                  className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700 first-letter:uppercase">{category}</span>
              </label>
              </Link>
            ))}
          </div>
        </div>

        {/* Price Range Filter */}
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-3">Price Range</h3>
          <div className="space-y-3">
            <div>
              <label className="block text-xs text-gray-500 mb-1">Min Price</label>
              <input
                type="number"
                value={filters.priceRange.min}
                onChange={(e) => handlePriceChange('min', parseInt(e.target.value) )}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                min="0"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Max Price</label>
              <input
                type="number"
                value={filters.priceRange.max}
                onChange={(e) => handlePriceChange('max', parseInt(e.target.value))}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                min="0"
              />
            </div>
            <div className="text-xs text-gray-500">
              ₹{filters.priceRange.min} - ₹{filters.priceRange.max}
            </div>
          </div>
        </div>

        {/* Brand Filter */}
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-3">Brand</h3>
          <div className="space-y-2">
            {brands.map((brand) => (
              <label key={brand} className="flex items-center"
              >
                <input
                  type="checkbox"
                  checked={filters.brands.includes(brand)}
                  onChange={(e) => {handleBrandChange(brand, e.target.checked)
                    setShowFilters(false)
                  }}
                  className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">{brand}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Rating Filter */}
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-3">Minimum Rating</h3>
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((rating) => (
              <label key={rating} className="flex items-center"
                
              >
                <input
                  type="radio"
                  name="rating"
                  checked={filters.rating === rating}
                  onChange={() => {
                    dispatch(setRating(rating))
                  setShowFilters(false)
                  }}
                  className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <div className="ml-2 flex items-center">
                  {Array.from({ length: 5 }, (_, index) => (
                    <svg
                      key={index}
                      className={`w-4 h-4 ${
                        index < rating ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="ml-1 text-sm text-gray-500">& up</span>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* In Stock Filter */}
        <div>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={filters.inStock}
              onChange={(e) => {dispatch(setInStock(e.target.checked))
                setShowFilters(false)
              }}
              className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <span className="ml-2 text-sm text-gray-700">Out of Stock Only</span>
          </label>
        </div>
      </div>
    </div>
  );
};