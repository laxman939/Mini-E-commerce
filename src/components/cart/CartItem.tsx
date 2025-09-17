"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "../../hooks/useCart";
import { CartItemType } from "@/types/product";

interface CartItemProps {
  item: CartItemType;
}

export const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateItemQuantity, removeItem } = useCart();
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(item.id.toString());
    } else {
      updateItemQuantity(item.id.toString(), newQuantity);
    }
  };

  const handleRemove = () => {
    removeItem(item.id.toString());
  };

  return (
    <div className="flex items-center py-6 border-b border-gray-200">
      {/* Product Image */}
      <div className="flex-shrink-0 w-20 h-20 bg-gray-200 rounded-md overflow-hidden">
        <Image
          src={item.images[0] || item.thumbnail}
          alt={item.name}
          // fill
          width={80}
          height={80}
          className="object-contain w-full h-full"
          // onError={(e) => {
          //   const target = e.target as HTMLImageElement;
          //   target.src = `https://via.placeholder.com/80x80/f3f4f6/6b7280?text=${item.name}`;
          // }}
        />
      </div>

      {/* Product Details */}
      <div className="flex-1 ml-6">
        <div className="flex justify-between">
          <div className="pr-6">
            <Link
              href={`/product/${item.id}`}
              className="text-lg font-medium text-gray-900 hover:text-blue-600"
            >
              {item.name}
            </Link>
            <p className="text-sm text-gray-500 mt-1">{item.category}</p>
            {item.selectedVariant && (
              <p className="text-sm text-gray-500">
                {item.selectedVariant.name}: {item.selectedVariant.value}
              </p>
            )}
          </div>

          {/* Price */}
          <div className="text-right">
            <p className="text-lg font-medium text-gray-900">
              ₹{(item.price * item.quantity).toFixed(2)}
            </p>
            <p className="text-sm text-gray-500">
              ₹{item.price.toFixed(2)} each
            </p>
          </div>
        </div>

        {/* Quantity and Remove */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center">
            <label htmlFor={`quantity-${item.id}`} className="sr-only">
              Quantity
            </label>
            <div className="flex items-center border border-gray-300 rounded-md">
              <button
                onClick={() => handleQuantityChange(item.quantity - 1)}
                className="px-3 py-1 text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                disabled={item.quantity <= 1}
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 12H4"
                  />
                </svg>
              </button>
              <input
                id={`quantity-${item.id}`}
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) =>
                  handleQuantityChange(parseInt(e.target.value) || 1)
                }
                className="w-16 px-2 py-1 text-center border-0 focus:ring-0 focus:outline-none"
              />
              <button
                onClick={() => handleQuantityChange(item.quantity + 1)}
                className="px-3 py-1 text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </button>
            </div>
          </div>

          <button
            onClick={handleRemove}
            className="text-red-600 hover:text-red-800 font-medium text-sm transition-colors"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};
