

'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/hooks/useCart';
import { useWishlist } from '@/hooks/useWishList';
import { Product } from '@/types/product';
import { Header } from '@/components/layout/Header';


export default function ProductDetailPage() {
  const params = useParams();
  console.log("products in product detail",params);
  const productId = params?.id as string;
  
  const [product, setProduct] = useState<Product| null>(null);
  const [loading, setLoading] = useState(true);
  // const [selectedVariants, setSelectedVariants] = useState<{ [key: string]: string }>({});
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  const { addItem } = useCart();
  const { addItem: addToWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    const loadProduct = async () => {
      try{
        setLoading(true);

        fetch(`https://dummyjson.com/products/${productId}`).then(res => res.json()).then(data => {
        console.log(data, "data", "data");
           if (data) {
        setProduct(data)
      }
    })
      }catch(err){
        console.log(err);
      }finally{
        setLoading(false);
      }
      
      // Simulate API call
      // await new Promise(resolve => setTimeout(resolve, 500));
    };

    if (productId) {
      loadProduct();
    }
  }, [productId]);

  // const handleVariantChange = (variantName: string, value: string) => {
  //   setSelectedVariants(prev => ({
  //     ...prev,
  //     [variantName]: value
  //   }));
  // };

  const handleAddToCart = () => {
    if (product) {
      // const selectedVariant = Object.keys(selectedVariants).length > 0 
      //   ? { name: Object.keys(selectedVariants)[0], value: Object.values(selectedVariants)[0] }
      //   : undefined;
      
      addItem(product, quantity);
    }
  };

  const handleAddToWishlist = () => {
    if (product) {
      addToWishlist(product);
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <svg
        key={index}
        className={`w-5 h-5 ${
          index < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'
        }`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="h-96 bg-gray-200 rounded-lg animate-pulse"></div>
            <div className="space-y-4">
              <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3"></div>
              <div className="h-6 bg-gray-200 rounded animate-pulse w-1/3"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <Link href="/products" className="text-blue-600 hover:text-blue-800">
            Browse all products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
    <Header/>
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex mb-8" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li>
              <Link href="/" className="text-gray-500 hover:text-gray-700">
                Home
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <svg className="w-4 h-4 text-gray-400 mx-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
                <Link href="/products" className="text-gray-500 hover:text-gray-700">
                  Products
                </Link>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <svg className="w-4 h-4 text-gray-400 mx-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-500">{product.name}</span>
              </div>
            </li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
              <Image
                src={product.images[activeImage || 0] || ""}
                alt={product.name || "Product Image"}
                width={600}
                height={600}
                className="object-cover w-full h-full"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = `https://via.placeholder.com/600x600/f3f4f6/6b7280?text=${product.name}`;
                }}
              />
            </div>

            {/* Thumbnail Images */}
            <div className="flex space-x-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(index)}
                  className={`w-20 h-20 bg-gray-200 rounded-lg overflow-hidden ${
                    activeImage === index ? 'ring-2 ring-blue-500' : ''
                  }`}
                >
                  <Image
                    src={image || ""}
                    alt={`${product.name} ${index + 1}`}
                    width={80}
                    height={80}
                    className="object-cover w-full h-full"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {product.name}
              </h1>
              <p className="text-lg text-gray-600">{product.brand}</p>
            </div>

            {/* Rating */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                {renderStars(product.rating || 0)}
                <span className="ml-2 text-sm text-gray-600">
                  {product.rating} out of 5
                </span>
              </div>
              <span className="text-sm text-gray-500">
                ({product.reviews.length} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-4">
              <span className="text-3xl font-bold text-gray-900">
                ₹{product.price}<span className='text-sm text-gray-500'>({product.discountPercentage}%)</span>
              </span>
              { (product.price ||  0) && (
                <span className="text-xl text-gray-500 line-through">
                ₹{ (product.price / (1 - product.discountPercentage / 100)).toFixed(2) }
                </span>
              )}
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            {/* Variants */}
            {/* {product.variants && product.variants.map((variant) => (
              <div key={variant.name}>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  {variant.name}
                </label>
                <div className="flex flex-wrap gap-2">
                  {variant.options.map((option) => (
                    <button
                      key={option}
                      onClick={() => handleVariantChange(variant.name, option)}
                      className={`px-4 py-2 text-sm font-medium rounded-md border ${
                        selectedVariants[variant.name] === option
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'bg-white text-gray-900 border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            ))} */}

            {/* Quantity */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Quantity
              </label>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  -
                </button>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-16 px-3 py-2 text-center border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  +
                </button>
              </div>
            </div>

            {/* Stock Status */}
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${product.availabilityStatus === "In Stock" ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <span className={`text-sm font-medium ${product.availabilityStatus === "In Stock" ? 'text-green-600' : 'text-red-600'}`}>
                {product.availabilityStatus}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <button
                onClick={handleAddToCart}
                disabled={!(product.availabilityStatus === "In Stock")}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-md font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Add to Cart :   <span className='ps-2'>₹{(product.price  * quantity).toFixed(2)}</span>
              </button>
              
              <button
                onClick={handleAddToWishlist}
                className={`w-full py-3 px-6 rounded-md font-medium border transition-colors ${
                  isInWishlist((product.id).toString())
                    ? 'bg-red-50 border-red-300 text-red-700 hover:bg-red-100'
                    : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                {isInWishlist((product.id).toString()) ? '♥ Added to Wishlist' : '♡ Add to Wishlist'}
              </button>
            </div>

            {/* Features */}
            <div className="border-t border-gray-200 pt-6">
              <div className="grid grid-cols-1 gap-4">
                <div className="flex items-center space-x-3">
                  <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm text-gray-600">Free shipping on orders over ₹500</span>
                </div>
                <div className="flex items-center space-x-3">
                  <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm text-gray-600">30-day return policy</span>
                </div>
                <div className="flex items-center space-x-3">
                  <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm text-gray-600">1-year warranty included</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}