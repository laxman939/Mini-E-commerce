import Link from 'next/link';
import {Button} from '@/components/ui/Button';
import { Heart, ShoppingBag, Star, Gift } from 'lucide-react';

export default function EmptyWishlist() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
      <div className="max-w-md mx-auto text-center px-6">
        <div className="relative mb-8">
          <Heart className="h-24 w-24 text-gray-300 mx-auto mb-4" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Heart className="h-12 w-12 text-red-200" fill="currentColor" />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-3">
          Your wishlist is empty
        </h1>
        
        <p className="text-gray-600 mb-8 leading-relaxed">
          Start building your wishlist by adding products you love. 
          Save items for later and keep track of your favorites!
        </p>

        <div className="space-y-4 mb-8">
          <Button asChild className="w-full">
            <Link href="/products" className="flex items-center justify-center space-x-2">
              <ShoppingBag className="h-4 w-4" />
              <span>Browse Products</span>
            </Link>
          </Button>
          
          <Button variant="outline" asChild className="w-full">
            <Link href="/products" className="flex items-center justify-center space-x-2">
            {/* <Link href="/products?featured=true" className="flex items-center justify-center space-x-2"> */}
              <Star className="h-4 w-4" />
              <span>View Featured Items</span>
            </Link>
          </Button>
        </div>

        <div className="bg-blue-50 rounded-lg p-6 text-left">
          <div className="flex items-start space-x-3">
            <Gift className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <h3 className="font-semibold text-blue-900 mb-2">Pro Tip</h3>
              <p className="text-blue-700 text-sm">
                Add items to your wishlist to track price changes and get notified about sales!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}