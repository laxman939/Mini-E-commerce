'use client';

import { useState } from 'react';
// import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types/product';
import {addToCart} from '@/store/slices/cartSlice';
import {Button} from '@/components/ui/Button';
import {  ShoppingCart, Trash2, Eye } from 'lucide-react';
import { useDispatch } from 'react-redux';
import ProductImageCarousel from '../product/ProductImageCarousel';
import { calculateDiscountedPrice } from '@/lib/utils';

interface WishlistItemProps {
  product: Product;
//   isSelected: boolean;
//   onSelect: (productId: string) => void;
  onRemove: (productId: string) => void;
//   onMoveToCart: (product: Product) => void;
}

export default function WishlistItem({
  product,
//   isSelected,
//   onSelect,
  onRemove,
//   onMoveToCart
}: WishlistItemProps) {
  const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

  const handleAddToCart = async () => {
    setIsLoading(true);
    try{ 
      dispatch(addToCart({ product, quantity: 1}));
    //   onMoveToCart(product);
    } catch (error) {
      console.error('Failed to add to cart:', error);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden group">
      {/* Product Image */}
      <div className="relative h-48 bg-gray-100">
        <Link href={`/product/${product.id}`}>
          <ProductImageCarousel product={product} />
        </Link>
        
        {/* Discount Badge */}
        {product.discountPercentage > 0 && (
          <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-medium px-2 py-1 rounded">
            {product.discountPercentage}% OFF
          </div>
        )}

        {/* Quick Actions */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center space-x-2">
          <Link href={`/product/${product.id}`}>
            <Button
              size="sm"
            //   variant="secondary"
              className="flex items-center space-x-1"
            >
              <Eye className="h-4 w-4" />
              <span>View</span>
            </Button>
          </Link>
          
          <Button
            size="sm"
            onClick={handleAddToCart}
            disabled={isLoading}
            className="flex items-center space-x-1"
          >
            <ShoppingCart className="h-4 w-4" />
            <span>Add to Cart</span>
          </Button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <Link 
            href={`/product/${product.id}`}
            className="text-sm font-medium text-gray-900 hover:text-blue-600 transition-colors line-clamp-2"
          >
            {product.title}
          </Link>
          
          {/* <button
            onClick={() => onRemove((product.id).toString())}
            className="text-gray-400 hover:text-red-500 transition-colors p-1"
            title="Remove from wishlist"
          >
            <Heart className="h-5 w-5" fill="currentColor" />
          </button> */}
        </div>

        {/* Brand */}
        {product.brand && (
          <p className="text-xs text-gray-500 mb-2">{product.brand}</p>
        )}

        {/* Price */}
        <div className="flex items-center space-x-2 mb-3">
           <span className="text-lg font-bold text-gray-900">
                ₹{product.price}<span className='text-sm text-gray-500'>({product.discountPercentage}%)</span>
            </span>
         <span className="text-sm text-gray-500 line-through">
            ₹{calculateDiscountedPrice(product.price, product.discountPercentage)}
         </span>
        </div>


        {/* Rating */}
        {product.rating && (
          <div className="flex items-center space-x-1 mb-3">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(product.rating!)
                      ? 'text-yellow-400'
                      : 'text-gray-300'
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-sm text-gray-600">
              ({product.rating?.toFixed(1)})
            </span>
          </div>
        )}

        {/* Stock Status */}
        <div className="mb-4">
          {product.stock && product.stock > 0 ? (
            <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded">
              In Stock ({product.stock} left)
            </span>
          ) : (
            <span className="text-xs text-red-600 bg-red-100 px-2 py-1 rounded">
              Out of Stock
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex space-x-2">
          <Button
            onClick={handleAddToCart}
            disabled={isLoading || !product.stock || product.stock === 0}
            className="flex-1 flex items-center justify-center space-x-2"
            size="sm"
          >
            <ShoppingCart className="h-4 w-4" />
            <span>{isLoading ? 'Adding...' : 'Add to Cart'}</span>
          </Button>
          
          <Button
            variant="outline"
            onClick={() => onRemove((product.id).toString())}
            className="flex items-center justify-center px-3"
            size="sm"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}