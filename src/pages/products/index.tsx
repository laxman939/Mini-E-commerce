'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { setProducts, setLoading } from '@/store/slices/productsSlice';
import { setCategory, setSearchQuery, setSortBy } from '@/store/slices/filtersSlice';
import { ProductFilters } from '@/components/product/ProductFilters';
import { useDebounce } from '@/hooks/useDebounce';
import { ProductCard } from '@/components/product/ProductCard';
import { Product } from '@/types/product';

// Mock products data
// const mockProducts: Product[] = [
//   {
//     id: 1,
//     name: 'Wireless Bluetooth Headphones',
//     price: 79.99,
//     originalPrice: 99.99,
//     image: '/images/products/headphones.jpg',
//     category: 'Electronics',
//     rating: 4.5,
//     reviewCount: 128,
//     inStock: true,
//     title: 'Wireless Bluetooth Headphones',
//     thumbnail: '/images/products/headphones_thumb.jpg',
//     selectedVariant: {
//       name: 'Color',
//       value: 'Black'
//     },
//     description: 'High-quality wireless headphones with active noise cancellation and 30-hour battery life.',
//     brand: 'TechBrand',
//     variants: [
//       { name: 'Color', options: ['Black', 'White', 'Blue'] },
//       { name: 'Size', options: ['Standard', 'Large'] }
//     ]
//   },
//   {
//     id:2,
//     name: 'Smart Fitness Watch',
//     price: 199.99,
//     originalPrice: 249.99,
//     image: '/images/products/smartwatch.jpg',
//     category: 'Electronics',
//     rating: 4.8,
//     reviewCount: 256,
//     inStock: true,
//     description: 'Advanced fitness tracking with heart rate monitor, GPS, and 7-day battery life.',
//     brand: 'FitTech',
//     thumbnail: '/images/products/smartwatch_thumb.jpg',
//     selectedVariant: {
//       name: 'Color',
//       value: 'Black'
//     },
//     title: 'Smart Fitness Watch',
//     variants: [
//       { name: 'Color', options: ['Black', 'Silver', 'Rose Gold'] },
//       { name: 'Band', options: ['Sport', 'Leather', 'Metal'] }
//     ]
//   },
//   {
//     id: 3,
//     name: 'Organic Cotton T-Shirt',
//     price: 29.99,
//     originalPrice: 39.99,
//     image: '/images/products/tshirt.jpg',
//     category: 'Fashion',
//     rating: 4.3,
//     reviewCount: 89,
//     inStock: true,
//     description: 'Comfortable organic cotton t-shirt with relaxed fit and sustainable materials.',
//     brand: 'EcoWear',
//     thumbnail: '/images/products/tshirt_thumb.jpg',
//     selectedVariant: {
//       name: 'Color',
//       value: 'White'
//     },
//     title: 'Organic Cotton T-Shirt',
//     variants: [
//       { name: 'Color', options: ['White', 'Black', 'Navy', 'Gray'] },
//       { name: 'Size', options: ['XS', 'S', 'M', 'L', 'XL', 'XXL'] }
//     ]
//   },
//   {
//     id: 4,
//     name: 'Stainless Steel Water Bottle',
//     price: 24.99,
//     originalPrice: 34.99,
//     image: '/images/products/water-bottle.jpg',
//     category: 'Sports',
//     rating: 4.7,
//     reviewCount: 145,
//     inStock: true,
//     description: 'Insulated water bottle keeps drinks cold for 24 hours and hot for 12 hours.',
//     brand: 'HydroLife',
//     thumbnail: '/images/products/water-bottle_thumb.jpg',
//     selectedVariant: {
//       name: 'Size',
//       value: '16oz'
//     },
//     title: 'Stainless Steel Water Bottle',
//     variants: [
//       { name: 'Size', options: ['16oz', '20oz', '32oz'] },
//       { name: 'Color', options: ['Stainless', 'Black', 'Blue', 'Pink'] }
//     ]
//   },
//   {
//     id: 5,
//     name: 'Yoga Mat Premium',
//     price: 49.99,
//     originalPrice: 69.99,
//     image: '/images/products/yoga-mat.jpg',
//     category: 'Sports',
//     rating: 4.6,
//     reviewCount: 203,
//     inStock: true,
//     description: 'Non-slip premium yoga mat with extra cushioning and alignment guides.',
//     brand: 'ZenFit',
//     thumbnail: '/images/products/yoga-mat_thumb.jpg',
//     selectedVariant: {
//       name: 'Thickness',
//       value: '4mm'
//     },    
//     title: 'Yoga Mat Premium',
//     variants: [
//       { name: 'Thickness', options: ['4mm', '6mm', '8mm'] },
//       { name: 'Color', options: ['Purple', 'Blue', 'Green', 'Pink'] }
//     ]
//   },
//   {
//     id: 6,
//     name: 'LED Desk Lamp',
//     price: 34.99,
//     image: '/images/products/desk-lamp.jpg',
//     category: 'Home & Garden',
//     rating: 4.4,
//     reviewCount: 167,
//     inStock: false,
//     description: 'Adjustable LED desk lamp with touch controls and USB charging port.',
//     brand: 'BrightLight',
//     thumbnail: '/images/products/desk-lamp_thumb.jpg',
//     selectedVariant: {
//       name: 'Color',
//       value: 'White'
//     },    
//     title: 'LED Desk Lamp',
//     variants: [
//       { name: 'Color', options: ['White', 'Black', 'Silver'] }
//     ]
//   }
// ];

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  
  const { items: products, loading } = useSelector((state: RootState) => state.products);
  const filters = useSelector((state: RootState) => state.filters);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // Initialize filters from URL params
  useEffect(() => {
    const category = searchParams.get('category');
    const sort = searchParams.get('sort');
    const search = searchParams.get('search');

    if (category) dispatch(setCategory(category));
    if (sort) dispatch(setSortBy(sort as any));
    if (search) {
      setSearchTerm(search);
      dispatch(setSearchQuery(search));
    }
  }, [searchParams, dispatch]);

  // Update search query when debounced term changes
  useEffect(() => {
    dispatch(setSearchQuery(debouncedSearchTerm));
  }, [debouncedSearchTerm, dispatch]);

  // Load products
  useEffect(() => {
    const loadProducts = async () => {
      dispatch(setLoading(true));
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
    try{
  fetch('https://dummyjson.com/products?limit=50').then(res => res.json()).then(data => {
        const products = data.products.map((product : Product) => {
          const { id, title, price, description, category, thumbnail, rating, inStock, brand, originalPrice,images,reviewCount,variants,
            selectedVariant } = product;
          return {
            id,
            name: product.title,
            price,
            originalPrice,
            image: images[0],
            category,
            rating,
            reviewCount,
            inStock,
            description,
            brand,
            thumbnail,
            title,
            variants,
            selectedVariant,
          }
        });
        dispatch(setProducts(products as Product[]));
      })
       
    }catch(err){
console.log(err);
    }
     
    };

    loadProducts();
  }, [dispatch]);

  // Filter and sort products
  const filteredProducts = React.useMemo(() => {
    const filtered = products.filter((product: Product) => {
      const matchesCategory = !filters.category || product.category === filters.category;
      const matchesSearch = !filters.searchQuery || 
        product.name?.toLowerCase().includes(filters.searchQuery.toLowerCase())
        product.description.toLowerCase().includes(filters.searchQuery.toLowerCase());
      const matchesPrice = product?.price >= filters.priceRange.min && product?.price <= filters.priceRange.max;
      const matchesBrand = filters.brands.length === 0 || filters.brands.includes(product.brand);
      const matchesRating = product?.rating >= filters.rating;
      const matchesStock = !filters.inStock || product.inStock;

      return matchesCategory && matchesSearch && matchesPrice && matchesBrand && matchesRating && matchesStock;
    });

    // Sort products
    filtered.sort((a, b) => {
      let comparison = 0;
      
      switch (filters.sortBy) {
        case 'name':
          comparison = Number(a.name?.localeCompare(b.name || '')); 
          break;
        case 'price':
          comparison = a.price - b.price;
          break;
        case 'rating':
          comparison = b.rating - a.rating; // Higher rating first
          break;
        case 'newest':
          // Mock: newer products have higher IDs
          comparison = parseInt(b.id) - parseInt(a.id);
          break;
        default:
          comparison = 0;
      }
      
      return filters.sortOrder === 'desc' ? -comparison : comparison;
    });

    return filtered;
  }, [products, filters]);

  const handleSortChange = (sortBy: string) => {
    dispatch(setSortBy(sortBy as any));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-48 bg-gray-200 animate-pulse"></div>
                <div className="p-4">
                  <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Products</h1>
              <p className="text-gray-600 mt-1">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
                {filters.category && ` in ${filters.category}`}
              </p>
            </div>

            {/* Search Bar */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search products..."
                  className="w-64 px-4 py-2 pl-10 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-6">
              {/* Mobile filter toggle */}
              <div className="lg:hidden mb-4">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="w-full bg-white border border-gray-300 rounded-md px-4 py-2 flex items-center justify-between text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Filters
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707v4.586a1 1 0 01-.293.707L9 19.414a1 1 0 01-.707.293H8a1 1 0 01-1-1v-4a1 1 0 00-.293-.707L.293 7.293A1 1 0 010 6.586V4z" />
                  </svg>
                </button>
              </div>

              <div className={`${showFilters ? 'block' : 'hidden'} lg:block`}>
                <ProductFilters />
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                {/* Sort Dropdown */}
                <select
                  value={filters.sortBy}
                  onChange={(e) => handleSortChange(e.target.value)}
                  className="px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="name">Sort by Name</option>
                  <option value="price">Sort by Price</option>
                  <option value="rating">Sort by Rating</option>
                  <option value="newest">Newest First</option>
                </select>
              </div>

              {/* View Mode Toggle */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Products Display */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <svg className="mx-auto w-24 h-24 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <h3 className="mt-4 text-lg font-medium text-gray-900">No products found</h3>
                <p className="mt-2 text-gray-500">Try adjusting your search or filter criteria.</p>
              </div>
            ) : (
              <div className={
                viewMode === 'grid' 
                  ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' 
                  : 'space-y-4'
              }>
                {filteredProducts.map((product : Product) => (
                  <ProductCard
                    key={product.id} 
                    product={product} 
                    viewMode={viewMode}
                  />
                ))}
              </div>
            )}

            {/* Pagination would go here */}
          </div>
        </div>
      </div>
    </div>
  );
}