'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/hooks/useCart';
import { CartSummary } from '@/components/cart/CartSummary';
import { Input } from '@/components/ui/Input';

interface ShippingInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

interface PaymentInfo {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  nameOnCard: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, clearCartItems, getCartItemsCount } = useCart();
  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);

  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US'
  });

  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: ''
  });

  const [errors, setErrors] = useState<{[key: string]: string}>({});

  // Redirect if cart is empty
  if (cart.items.length === 0) {
    router.push('/cart');
    return null;
  }

  const validateShipping = (): boolean => {
    const newErrors: {[key: string]: string} = {};
    
    if (!shippingInfo.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!shippingInfo.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!shippingInfo.email.trim()) newErrors.email = 'Email is required';
    if (!shippingInfo.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!shippingInfo.address.trim()) newErrors.address = 'Address is required';
    if (!shippingInfo.city.trim()) newErrors.city = 'City is required';
    if (!shippingInfo.state.trim()) newErrors.state = 'State is required';
    if (!shippingInfo.zipCode.trim()) newErrors.zipCode = 'ZIP code is required';

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (shippingInfo.email && !emailRegex.test(shippingInfo.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePayment = (): boolean => {
    const newErrors: {[key: string]: string} = {};
    
    if (!paymentInfo.cardNumber.trim()) newErrors.cardNumber = 'Card number is required';
    if (!paymentInfo.expiryDate.trim()) newErrors.expiryDate = 'Expiry date is required';
    if (!paymentInfo.cvv.trim()) newErrors.cvv = 'CVV is required';
    if (!paymentInfo.nameOnCard.trim()) newErrors.nameOnCard = 'Name on card is required';

    // Basic card number validation (simplified)
    if (paymentInfo.cardNumber && paymentInfo.cardNumber.replace(/\s/g, '').length < 16) {
      newErrors.cardNumber = 'Please enter a valid card number';
    }

    // CVV validation
    if (paymentInfo.cvv && (paymentInfo.cvv.length < 3 || paymentInfo.cvv.length > 4)) {
      newErrors.cvv = 'Please enter a valid CVV';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateShipping()) {
      setCurrentStep(2);
    }
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validatePayment()) {
      setIsProcessing(true);
      
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Clear cart and redirect to success page
      clearCartItems();
      router.push('/checkout/success');
    }
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
          
          {/* Progress indicator */}
          <div className="mt-4">
            <div className="flex items-center">
              <div className={`flex items-center ${currentStep >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-300'}`}>
                  1
                </div>
                <span className="ml-2 font-medium">Shipping</span>
              </div>
              <div className="mx-4 h-0.5 flex-1 bg-gray-300">
                <div className={`h-full transition-all duration-300 ${currentStep >= 2 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
              </div>
              <div className={`flex items-center ${currentStep >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-300'}`}>
                  2
                </div>
                <span className="ml-2 font-medium">Payment</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {currentStep === 1 ? (
              // Shipping Information Form
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-6">Shipping Information</h2>
                
                <form onSubmit={handleShippingSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="First Name"
                      value={shippingInfo.firstName}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setShippingInfo(prev => ({ ...prev, firstName: e.target.value }))}
                      error={errors.firstName}
                      required
                    />
                    <Input
                      label="Last Name"
                      value={shippingInfo.lastName}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setShippingInfo(prev => ({ ...prev, lastName: e.target.value }))}
                      error={errors.lastName}
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Email"
                      type="email"
                      value={shippingInfo.email}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setShippingInfo(prev => ({ ...prev, email: e.target.value }))}
                      error={errors.email}
                      required
                    />
                    <Input
                      label="Phone Number"
                      type="tel"
                      value={shippingInfo.phone}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setShippingInfo(prev => ({ ...prev, phone: e.target.value }))}
                      error={errors.phone}
                      required
                    />
                  </div>
                  
                  <Input
                    label="Address"
                    value={shippingInfo.address}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setShippingInfo(prev => ({ ...prev, address: e.target.value }))}
                    error={errors.address}
                    required
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Input
                      label="City"
                      value={shippingInfo.city}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setShippingInfo(prev => ({ ...prev, city: e.target.value }))}
                      error={errors.city}
                      required
                    />
                    <Input
                      label="State"
                      value={shippingInfo.state}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setShippingInfo(prev => ({ ...prev, state: e.target.value }))}
                      error={errors.state}
                      required
                    />
                    <Input
                      label="ZIP Code"
                      value={shippingInfo.zipCode}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setShippingInfo(prev => ({ ...prev, zipCode: e.target.value }))}
                      error={errors.zipCode}
                      required
                    />
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-md font-medium hover:bg-blue-700 transition-colors"
                  >
                    Continue to Payment
                  </button>
                </form>
              </div>
            ) : (
              // Payment Information Form
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-gray-900">Payment Information</h2>
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                  >
                    ← Back to Shipping
                  </button>
                </div>
                
                <form onSubmit={handlePaymentSubmit} className="space-y-4">
                  <Input
                    label="Name on Card"
                    value={paymentInfo.nameOnCard}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPaymentInfo(prev => ({ ...prev, nameOnCard: e.target.value }))}
                    error={errors.nameOnCard}
                    required
                  />
                  
                  <Input
                    label="Card Number"
                    value={paymentInfo.cardNumber}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPaymentInfo(prev => ({ ...prev, cardNumber: formatCardNumber(e.target.value) }))}
                    error={errors.cardNumber}
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                    required
                  />
                  
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="Expiry Date"
                      value={paymentInfo.expiryDate}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPaymentInfo(prev => ({ ...prev, expiryDate: e.target.value }))}
                      error={errors.expiryDate}
                      placeholder="MM/YY"
                      maxLength={5}
                      required
                    />
                    <Input
                      label="CVV"
                      value={paymentInfo.cvv}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPaymentInfo(prev => ({ ...prev, cvv: e.target.value }))}
                      error={errors.cvv}
                      placeholder="123"
                      maxLength={4}
                      required
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-md font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                  >
                    {isProcessing ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing Payment...
                      </>
                    ) : (
                      `Place Order`
                    )}
                  </button>
                </form>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-6">
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Items</h3>
                <div className="space-y-3">
                  {cart.items.slice(0, 3).map((item) => (
                    <div key={item.id} className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gray-200 rounded flex-shrink-0"></div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {item.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <div className="text-sm font-medium text-gray-900">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                  {cart.items.length > 3 && (
                    <p className="text-sm text-gray-500 text-center">
                      and {cart.items.length - 3} more items...
                    </p>
                  )}
                </div>
              </div>
              
              <CartSummary showCheckoutButton={false} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}