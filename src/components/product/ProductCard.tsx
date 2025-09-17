'use client';
import React from 'react';
import Link from 'next/link';
import { Product } from '../../types/product';
import { useCart } from '../../hooks/useCart';
import { useWishlist } from '@/hooks/useWishList';
import { calculateDiscountedPrice } from '@/lib/utils';
import ProductImageCarousel from './ProductImageCarousel';
import RenderStars from '../ui/RenderStar';

interface ProductCardProps {
  product: Product;
  viewMode?: 'grid' | 'list';
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, viewMode = 'grid' }) => {
  const { addItemCart } = useCart();
  const { addItem: addToWishlist, isInWishlist } = useWishlist();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItemCart(product, 1);
  };

  const handleAddToWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    addToWishlist(product);
  };


  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <div className="flex">
          <div className="relative w-48 h-48 flex-shrink-0">
            <Link href={`/product/${product.id}`}>
              {/* <Image
                src={product.images[0] || product.thumbnail}
                alt={product.title}
                fill
                className="object-cover"
                // onError={(e) => {
                //   const target = e.target as HTMLImageElement;
                //   target.src = `https://via.placeholder.com/192x192/f3f4f6/6b7280?text=${product.title}`;
                // }}
              /> */}
              <ProductImageCarousel product={product} />
            </Link>
            
            {/* Sale badge */}
            { product.price && (
              <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs font-semibold rounded">
                SALE
              </div>
            )}

            {/* Stock status */}
            {product.availabilityStatus !== "In Stock" && (
              <div className="absolute inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
                <span className="text-white font-semibold">{product.availabilityStatus}</span>
              </div>
            )}
          </div>

          <div className="flex-1 p-6">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <Link href={`/product/${product.id}`}>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
                    {product.title}
                  </h3>
                </Link>

                <p className="text-sm text-gray-600 mb-2">{product.brand}</p>
                
                <div className="flex items-center mb-2">
                  <div className="flex">
                   <RenderStars rating={product.rating} />
                  </div>
                  <span className="ml-1 text-sm text-gray-600">
                   ({product.reviews.length} Reviews)
                  </span>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {product.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                  <span className="text-lg font-bold text-gray-900">
                                    ₹{product.price}<span className='text-sm text-green-800'>({product.discountPercentage}%)</span>
                                  </span>
                                  { product.price && (
                                    <span className="text-sm text-gray-500 line-through">
                                     ₹{calculateDiscountedPrice(product.price, product.discountPercentage)}
                                    </span>
                                  )}
                  </div>
                </div>
              </div>

              <div className="flex flex-col space-y-2 ml-4">
                <button
                  onClick={handleAddToWishlist}
                  className={`p-2 rounded-full mx-auto ${
                    isInWishlist((product.id).toString())
                      ? 'bg-red-500 text-white'
                      : 'bg-gray-100 text-gray-400 hover:text-red-500'
                  } hover:shadow-md transition-all duration-200`}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                  </svg>
                </button>

                <button
                  onClick={handleAddToCart}
                  disabled={!(product.availabilityStatus === "In Stock")}
                  className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 font-medium"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Grid view
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <Link href={`/product/${product.id}`}>
          <div className="relative h-48 bg-gray-200">
            {/* <Image
              src={imgSrc}
              // src={product.image}
              alt={product.title}
              fill
              className="object-cover hover:scale-105 transition-transform duration-300"
              // onError={(e) => {
              //   const target = e.target as HTMLImageElement;
              //   target.src = `https://via.placeholder.com/300x192/f3f4f6/6b7280?text=${product.title}`;
              // }}
            /> */}
            <ProductImageCarousel product={product} />
          </div>
        </Link>
        
        {/* Wishlist button */}
        <button
          onClick={handleAddToWishlist}
          className={`absolute top-2 right-2 p-2 rounded-full ${
            isInWishlist((product.id).toString())
              ? 'bg-red-500 text-white'
              : 'bg-white text-gray-400 hover:text-red-500'
          } shadow-md hover:shadow-lg transition-all duration-200`}
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
          </svg>
        </button>

        {/* Sale badge */}
        { product.price && (
          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs font-semibold rounded">
            SALE
          </div>
        )}

        {/* Stock status */}
       {product.availabilityStatus !== "In Stock" && (
              <div className="absolute inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
                <span className="text-white font-semibold">{product.availabilityStatus}</span>
              </div>
            )}
      </div>

      <div className="p-4">
        <Link href={`/product/${product.id}`}>
          <h3 className="font-semibold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
            {product.title}
          </h3>
        </Link>

        <p className="text-sm text-gray-600 mb-2">{product.brand}</p>

        {/* Rating */}
        <div className="flex items-center mb-2">
          <div className="flex">
    <RenderStars rating={product.rating} />
          </div>
          <span className="ml-1 text-sm text-gray-600">
            ({product.reviews.length} Reviews)
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-gray-900">
             ₹{product.price}<span className='text-sm text-green-800'>({product.discountPercentage}%)</span>
            </span>
            { product.price && (
              <span className="text-sm text-gray-500 line-through">
                ₹{calculateDiscountedPrice(product.price, product.discountPercentage)}
              </span>
            )}
          </div>
        </div>

        {/* Add to cart button */}
        <button
          onClick={handleAddToCart}
         disabled={!(product.availabilityStatus === "In Stock")}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 font-medium"
        >
          {product.availabilityStatus === "In Stock" ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    </div>
  );
};