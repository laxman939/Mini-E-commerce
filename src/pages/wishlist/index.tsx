'use client';

import { useState } from 'react';
import WishlistItem from '@/components/wishlist/WishlistItem';
import WishlistSummary from '@/components/wishlist/WishlistSummary';
import {Button} from '@/components/ui/Button';
import { Heart, ShoppingCart, Trash2, Share2 } from 'lucide-react';
import { addToCart } from '@/store/slices/cartSlice';
import { useDispatch } from 'react-redux';
import EmptyWishlist from '@/components/wishlist/EmptyWishList';
import { Product } from '@/types/product';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { useWishlist } from '@/hooks/useWishList';
import { Header } from '@/components/layout/Header';

export default function WishlistPage() {
  const { 
wishlist,
    // addItem,
    removeItem,
    clearWishlistItems,
    // isInWishlist,
  } = useWishlist();
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
const dispatch = useDispatch();

//   const handleSelectItem = (productId: string) => {
//     setSelectedItems(prev => 
//       prev.includes(productId) 
//         ? prev.filter(id => id !== productId)
//         : [...prev, productId]
//     );
//   };

  const handleSelectAll = () => {
    if (selectedItems.length === wishlist.items.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(wishlist.items.map((item: Product) => (item.id).toString()));
    }
  };

  const handleMoveSelectedToCart = async () => {
    const selectedProducts = wishlist.items.filter((item: Product) => 
      selectedItems.includes((item.id).toString())
    );
    
    for (const product of selectedProducts) {
      await       dispatch(addToCart({ product, quantity: 1}));
      removeItem((product.id).toString());
    }
    setSelectedItems([]);
  };

  const handleRemoveSelected = () => {
    selectedItems.forEach(productId => {
      removeItem(productId);
    });
    setSelectedItems([]);
  };

//   if (isLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <LoadingSpinner />
//       </div>
//     );
//   }

  if (wishlist.items.length === 0) {
    return <EmptyWishlist />;
  }

  return (
    <>
    <Header/>
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Heart className="h-8 w-8 text-red-500" fill="currentColor" />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
                <p className="text-gray-600 mt-1">
                  {wishlist.items.length} item{wishlist.items.length !== 1 ? 's' : ''} saved
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                onClick={() => {/* Share functionality */}}
                className="flex items-center space-x-2"
              >
                <Share2 className="h-4 w-4" />
                <span>Share</span>
              </Button>
              
              <Button
                variant="outline"
                onClick={clearWishlistItems}
                className="flex items-center space-x-2 text-red-600 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
                <span>Clear All</span>
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Wishlist Items */}
          <div className="lg:col-span-3">
            {/* Bulk Actions */}
            {wishlist.items.length > 0 ? (
              <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedItems.length === wishlist.items.length}
                        onChange={handleSelectAll}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">
                        Select All ({wishlist.items.length})
                      </span>
                    </label>
                    
                    {selectedItems.length > 0 && (
                      <span className="text-sm text-blue-600">
                        {selectedItems.length} selected
                      </span>
                    )}
                  </div>

                  {selectedItems.length > 0 && (
                    <div className="flex items-center space-x-2">
                      <Button
                        onClick={handleMoveSelectedToCart}
                        className="flex items-center space-x-2"
                        size="sm"
                      >
                        <ShoppingCart className="h-4 w-4" />
                        <span>Add to Cart</span>
                      </Button>
                      
                      <Button
                        variant="outline"
                        onClick={handleRemoveSelected}
                        className="flex items-center space-x-2 text-red-600"
                        size="sm"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span>Remove</span>
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            )
        :
         <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
        }

            {/* Wishlist Items Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {wishlist.items.map((item : Product) => (
                <WishlistItem
                  key={item.id}
                  product={item}
                //   isSelected={selectedItems.includes((item.id).toString())}
                // onSelect={handleSelectItem}
                  onRemove={removeItem}
                //   onMoveToCart={dispatch(addToCart({ product: item, quantity: 1 }))}
                />
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <WishlistSummary 
              items={wishlist.items}
              selectedItems={selectedItems}
              onMoveAllToCart={handleMoveSelectedToCart}
            />
          </div>
        </div>
      </div>
    </div>
    </>
  );
}