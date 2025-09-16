'use client';

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { applyDiscount } from '../../store/slices/cartSlice';

const PROMO_CODES = {
  'SAVE10': { discount: 0.1, type: 'percentage', description: '10% off' },
  'WELCOME': { discount: 15, type: 'fixed', description: '$15 off' },
  'FREESHIP': { discount: 9.99, type: 'shipping', description: 'Free shipping' },
};

export const PromoCodeForm: React.FC = () => {
  const [promoCode, setPromoCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!promoCode.trim()) {
      setMessage({ text: 'Please enter a promo code', type: 'error' });
      return;
    }

    setIsLoading(true);
    setMessage(null);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const upperPromoCode = promoCode.toUpperCase();
    const promoData = PROMO_CODES[upperPromoCode as keyof typeof PROMO_CODES];

    if (promoData) {
      let discountAmount = 0;
      
      if (promoData.type === 'percentage') {
        // This would need access to cart total - simplified for now
        discountAmount = 50 * promoData.discount; // Assuming $50 cart
      } else {
        discountAmount = promoData.discount;
      }

      dispatch(applyDiscount({ 
        code: upperPromoCode, 
        amount: discountAmount,
        type: promoData.type 
      }));
      
      setMessage({ 
        text: `Promo code applied! ${promoData.description}`, 
        type: 'success' 
      });
      setPromoCode('');
    } else {
      setMessage({ 
        text: 'Invalid promo code. Please try again.', 
        type: 'error' 
      });
    }

    setIsLoading(false);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      <h3 className="text-sm font-semibold text-gray-900 mb-3">
        Have a promo code?
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="flex">
          <input
            type="text"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            placeholder="Enter promo code"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !promoCode.trim()}
            className="px-4 py-2 bg-gray-900 text-white rounded-r-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? (
              <div className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Applying
              </div>
            ) : (
              'Apply'
            )}
          </button>
        </div>

        {message && (
          <div className={`text-sm p-2 rounded ${
            message.type === 'success' 
              ? 'bg-green-50 text-green-800 border border-green-200' 
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}>
            {message.text}
          </div>
        )}
      </form>

      <div className="mt-3 text-xs text-gray-500">
        <p>Available codes: SAVE10, WELCOME, FREESHIP</p>
      </div>
    </div>
  );
};