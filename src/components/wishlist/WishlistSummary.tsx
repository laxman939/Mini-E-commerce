'use client';

import { Product } from '@/types/product';
import {Button} from '@/components/ui/Button';
import { ShoppingCart, Heart, TrendingUp } from 'lucide-react';

interface WishlistSummaryProps {
  items: Product[];
  selectedItems: string[];
  onMoveAllToCart: () => void;
}

export default function WishlistSummary({
  items,
  selectedItems,
  onMoveAllToCart
}: WishlistSummaryProps) {
  const selectedProducts = items.filter(item => selectedItems.includes((item.id).toString()));
  const totalValue = items.reduce((sum, item) => sum + item.price, 0);
  const selectedValue = selectedProducts.reduce((sum, item) => sum + item.price, 0);
  const potentialSavings = items.reduce((sum, item) => {
    return sum + ((item.originalPrice || item.price) - item.price);
  }, 0);

  return (
    <div className="space-y-6">
      {/* Summary Card */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Heart className="h-5 w-5 text-red-500 mr-2" />
          Wishlist Summary
        </h3>

        <div className="space-y-4">
          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-gray-600">Total Items</span>
            <span className="font-semibold">{items.length}</span>
          </div>

          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-gray-600">Total Value</span>
            <span className="font-semibold text-green-600">${totalValue.toFixed(2)}</span>
          </div>

          {potentialSavings > 0 && (
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-gray-600">Potential Savings</span>
              <span className="font-semibold text-red-500">
                ${potentialSavings.toFixed(2)}
              </span>
            </div>
          )}

          {selectedItems.length > 0 && (
            <>
              <div className="flex justify-between items-center py-2 border-b bg-blue-50 px-3 rounded">
                <span className="text-blue-700 font-medium">Selected Items</span>
                <span className="font-semibold text-blue-700">{selectedItems.length}</span>
              </div>
              
              <div className="flex justify-between items-center py-2 border-b bg-blue-50 px-3 rounded">
                <span className="text-blue-700 font-medium">Selected Value</span>
                <span className="font-semibold text-blue-700">
                  ${selectedValue.toFixed(2)}
                </span>
              </div>
            </>
          )}
        </div>

        <div className="mt-6 space-y-3">
          <Button
            onClick={onMoveAllToCart}
            disabled={selectedItems.length === 0}
            className="w-full flex items-center justify-center space-x-2"
          >
            <ShoppingCart className="h-4 w-4" />
            <span>
              {selectedItems.length > 0 
                ? `Add Selected to Cart (${selectedItems.length})`
                : 'Select items to add to cart'
              }
            </span>
          </Button>
        </div>
      </div>

      {/* Trending Items */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <TrendingUp className="h-5 w-5 text-green-500 mr-2" />
          Price Alerts
        </h3>
        
        <div className="text-sm text-gray-600 mb-4">
          Get notified when prices drop on your wishlist items
        </div>
        
        <Button variant="outline" className="w-full">
          Enable Price Alerts
        </Button>
      </div>

      {/* Categories */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
        
        <div className="space-y-2">
          {Object.entries(
            items.reduce((acc, item) => {
              const category = item.category || 'Uncategorized';
              acc[category] = (acc[category] || 0) + 1;
              return acc;
            }, {} as Record<string, number>)
          ).map(([category, count]) => (
            <div key={category} className="flex justify-between items-center text-sm">
              <span className="text-gray-600 capitalize">{category}</span>
              <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                {count}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
