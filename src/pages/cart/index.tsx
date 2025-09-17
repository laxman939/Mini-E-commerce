"use client";

import React from "react";
import Link from "next/link";
import { useCart } from "@/hooks/useCart";
import { CartSummary } from "@/components/cart/CartSummary";
import { PromoCodeForm } from "@/components/cart/PromoCodeForm";
import { CartItemType } from "@/types/product";
import { CartItem } from "@/components/cart/CartItem";

export default function CartPage() {
  const { cart, clearCartItems, getCartItemsCount } = useCart();
  if (cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mx-auto w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-6">
              <svg
                className="w-12 h-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.293 2.293M7 13h10"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Your cart is empty
            </h2>
            <p className="text-gray-600 mb-8">
              Looks like you haven&apos;t added any items to your cart yet.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              Start Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
          <p className="text-gray-600 mt-2">
            {getCartItemsCount()} {getCartItemsCount() === 1 ? "item" : "items"}{" "}
            in your cart
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Items</h2>
                <button
                  onClick={clearCartItems}
                  className="text-red-600 hover:text-red-800 font-medium text-sm transition-colors"
                >
                  Clear Cart
                </button>
              </div>

              <div className="divide-y divide-gray-200">
                {cart.items.map((item: CartItemType) => (
                  <CartItem
                    key={`${item.id}-${item.selectedVariant?.name || ""}`}
                    item={item}
                  />
                ))}
              </div>
            </div>

            {/* Promo Code Section */}
            <div className="mt-6">
              <PromoCodeForm />
            </div>
          </div>

          {/* Cart Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-6">
              <CartSummary />
            </div>
          </div>
        </div>

        {/* Continue Shopping */}
        <div className="mt-8 text-center">
          <Link
            href="/products"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            ← Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
