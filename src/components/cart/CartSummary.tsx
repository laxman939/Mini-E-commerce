'use client';

import React from 'react';
import Link from 'next/link';
import { useCart } from '../../hooks/useCart';

interface CartSummaryProps {
  showCheckoutButton?: boolean;
}

export const CartSummary: React.FC<CartSummaryProps> = ({ showCheckoutButton = true }) => {
  const { cart, getCartTotal, getCartItemsCount } = useCart();

  const subtotal = getCartTotal();
  const shipping = subtotal > 500 ? 0 : 9.99; // Free shipping over $50
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;
  const discount = cart.discount || 0;
  const finalTotal = total - discount;

  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
      
      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">
            Items ({getCartItemsCount()})
          </span>
          <span className="font-medium">₹{subtotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Shipping</span>
          <span className="font-medium">
            {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
          </span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Tax</span>
          <span className="font-medium">₹{tax.toFixed(2)}</span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-green-600">Discount</span>
            <span className="font-medium text-green-600">
              -₹{discount.toFixed(2)}
            </span>
          </div>
        )}

        {subtotal < 500 && (
          <div className="text-sm text-blue-600 bg-blue-50 p-3 rounded-md">
            Add ₹{(500 - subtotal).toFixed(2)} more for free shipping!
          </div>
        )}

        <div className="border-t border-gray-200 pt-3">
          <div className="flex justify-between">
            <span className="text-base font-semibold text-gray-900">Total</span>
            <span className="text-xl font-bold text-gray-900">
              ₹{finalTotal.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {showCheckoutButton && (
        <div className="mt-6">
          <Link
            href="/checkout"
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-md font-medium hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center"
          >
            Proceed to Checkout
          </Link>
        </div>
      )}

      <div className="mt-4 text-center">
        <Link
          href="/products"
          className="text-blue-600 hover:text-blue-800 font-medium text-sm"
        >
          Continue Shopping
        </Link>
      </div>

      {/* Security badges */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-1 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            Secure Checkout
          </div>
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-1 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            SSL Protected
          </div>
        </div>
      </div>
    </div>
  );
};
