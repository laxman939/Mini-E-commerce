'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
// import Image from 'next/image';
import { useCart } from '../../hooks/useCart';
import { useWishlist } from '@/hooks/useWishList';
import { Product } from '@/types/product';
import ProductImageCarousel from '../product/ProductImageCarousel';
import { calculateDiscountedPrice } from '@/lib/utils';
import RenderStars from '../ui/RenderStar';

interface TrendingProductsProps {
  products: Product[];
}


export const TrendingProducts: React.FC<TrendingProductsProps> = ({ products }) => {
  // const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { addItemCart } = useCart();
  const { addItem: addToWishlist, isInWishlist,removeItem } = useWishlist();

  useEffect(() => {
    console.log(
      products, "products in trending"
    )
    // Simulate API call
    const fetchTrendingProducts = async () => {
      setLoading(true);
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      // setProducts(mockTrendingProducts);

      setLoading(false);
    };

    fetchTrendingProducts();
  }, []);

  const handleAddToCart = (product: Product) => {
    addItemCart(product, 1);
  };

 

  if (loading) {
    return (
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Trending Products
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, index) => (
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
      </section>
    );
  }

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Trending Products
          </h2>
          <p className="text-lg text-gray-600">
            Discover what&apos;s popular right now
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product : Product) => (
            console.log(product, "product",product.images.length),
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative">
                <Link href={`/product/${product.id}`}>
                  {/* <div className="relative h-48 bg-gray-200">
                    <Image
                      src={product.images[0] || product.thumbnail }
                      alt={product.title}
                      fill
                      className="object-contain hover:scale-105 transition-transform duration-300"
                      // onError={(e) => {
                      //   const target = e.target as HTMLImageElement;
                      //   target.src = `https://via.placeholder.com/300x192/f3f4f6/6b7280?text=${product.name}`;
                      // }}
                    />
                  </div> */}
                  <ProductImageCarousel product={product} />
                </Link>
                
                {/* Wishlist button */}
                <button
                  onClick={() => isInWishlist((product.id).toString()) ? removeItem((product.id).toString()) : addToWishlist(product)}
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
                {/* {product.availabilityStatus === 'In Stock' ? ( */}
                  <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs font-semibold rounded">
                    {/* SALE */}
                    {product.availabilityStatus === 'In Stock'  ? "SALE" : product.availabilityStatus}
                  </div>
              {/* //   )
              //   :
              //   <div className="absolute top-2 left-2 bg-gray-500 text-white px-2 py-1 text-xs font-semibold rounded">
              //     {product.availabilityStatus}
              //   </div>
              // } */}
              </div>

              <div className="p-4">
                <Link href={`/product/${product.id}`}>
                  <h3 className="font-semibold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
                    {product.title}
                  </h3>
                </Link>

                {/* Rating */}
                <div className="flex items-center mb-2">
                  <div className="flex">
                    <RenderStars rating={product.rating} />
                  </div>
                  <span className="ml-1 text-sm text-gray-600">
                    ({product.reviews.length})
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
                  onClick={() => handleAddToCart(product)}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            href="/products"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-blue-100 hover:bg-blue-200 transition-colors duration-200"
          >
            View All Products
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};