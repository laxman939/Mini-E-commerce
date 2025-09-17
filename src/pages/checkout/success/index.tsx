import React, { useCallback, useEffect, useState } from "react";
import {
  CheckCircle,
  Package,
  Truck,
  Mail,
  Download,
  ArrowRight,
  Heart,
  Star,
} from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { ShippingInfo } from "@/types/product";

// Confetti Component
interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string | undefined;
  size: number;
  rotation: number;
  rotationSpeed: number;
}

interface ConfettiProps {
  active: boolean;
  particleCount?: number;
  duration?: number;
  colors?: string[];
  gravity?: number;
  windResistance?: number;
}

const DEFAULT_COLORS = [
  "#ff6b6b",
  "#4ecdc4",
  "#45b7d1",
  "#f9ca24",
  "#f0932b",
  "#eb4d4b",
  "#6c5ce7",
];

const Confetti: React.FC<ConfettiProps> = ({
  active,
  particleCount = 100,
  duration = 5000,
  colors = DEFAULT_COLORS,
  gravity = 0.1,
  windResistance = 0.99,
}) => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [windowDimensions, setWindowDimensions] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 1200,
    height: typeof window !== "undefined" ? window.innerHeight : 800,
  });

  // Handle window resize
useEffect(() => {
  const handleResize = (): void => {
    setWindowDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  if (typeof window !== "undefined") {
    window.addEventListener("resize", handleResize);
  }

  return () => {
    if (typeof window !== "undefined") {
      window.removeEventListener("resize", handleResize);
    }
  };
}, []);


  // Create particles
  const createParticles = useCallback((): Particle[] => {
    const newParticles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * windowDimensions.width,
        y: -10,
        vx: (Math.random() - 0.5) * 4,
        vy: Math.random() * 3 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 8 + 4,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10,
      });
    }

    return newParticles;
  }, [particleCount, windowDimensions.width, colors]);

  // Animate particles
  const animateParticles = useCallback((): void => {
    setParticles((prevParticles) =>
      prevParticles
        .map((particle: Particle) => ({
          ...particle,
          x: particle.x + particle.vx,
          y: particle.y + particle.vy,
          rotation: particle.rotation + particle.rotationSpeed,
          vy: particle.vy + gravity, // Apply gravity
          vx: particle.vx * windResistance, // Apply wind resistance
        }))
        .filter(
          (particle: Particle) =>
            particle.y < windowDimensions.height + 50 &&
            particle.x > -50 &&
            particle.x < windowDimensions.width + 50
        )
    );
  }, [gravity, windResistance, windowDimensions]);

  // Main effect for confetti animation
  useEffect(() => {
    if (!active) {
      setParticles([]);
      return;
    }

    // Create initial particles
    const initialParticles = createParticles();
    setParticles(initialParticles);

    // Start animation
    const animationInterval = setInterval(animateParticles, 16); // ~60fps

    // Stop animation after duration
    const stopTimeout = setTimeout(() => {
      clearInterval(animationInterval);
      setParticles([]);
    }, duration);

    // Cleanup function
    return () => {
      clearInterval(animationInterval);
      clearTimeout(stopTimeout);
    };
  }, [active, createParticles, animateParticles, duration]);

  if (!active || particles.length === 0) {
    return null;
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map((particle: Particle) => (
        <div
          key={particle.id}
          className="absolute opacity-90 rounded-full"
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            backgroundColor: particle.color,
            transform: `rotate(${particle.rotation}deg)`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            transition: "opacity 0.3s ease-out",
          }}
          aria-hidden="true"
        />
      ))}
    </div>
  );
};

// Usage Example Component
export const ConfettiExample: React.FC = () => {
  const [showConfetti, setShowConfetti] = useState<boolean>(false);

  const triggerConfetti = (): void => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 5000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Confetti active={showConfetti} />

      <div className="text-center">
        <h1 className="text-3xl font-bold mb-8">Confetti Demo</h1>

        <div className="space-y-4">
          <button
            onClick={triggerConfetti}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
          >
            🎉 Trigger Confetti
          </button>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto">
            <button
              onClick={() => setShowConfetti(true)}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition-colors"
            >
              Start Confetti
            </button>

            <button
              onClick={() => setShowConfetti(false)}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition-colors"
            >
              Stop Confetti
            </button>
          </div>
        </div>

        {/* Custom Confetti Examples */}
        <div className="mt-8 space-y-2">
          <h2 className="text-xl font-semibold mb-4">Custom Configurations</h2>

          <button
            onClick={() => {
              setShowConfetti(false);
              setTimeout(() => setShowConfetti(true), 100);
            }}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded mr-2 mb-2 transition-colors"
          >
            💜 Purple Theme
          </button>

          <button
            onClick={() => {
              setShowConfetti(false);
              setTimeout(() => setShowConfetti(true), 100);
            }}
            className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded mr-2 mb-2 transition-colors"
          >
            🌸 Light Confetti
          </button>
        </div>
      </div>
    </div>
  );
};

const CheckoutSuccessPage = () => {
  const { cart, clearCartItems, getCartTotal, clearOrderInfo } = useCart();
  const [showConfetti, setShowConfetti] = useState(true);
  const [orderData] = useState<ShippingInfo | null>(cart?.orderInfo || null);

  useEffect(() => {
    // Stop confetti after 3 seconds
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 6000);

    return () => clearTimeout(timer);
  }, []);

  const handleDownloadReceipt = () => {
    // In a real app, this would download the receipt PDF
    console.log("Downloading receipt...");
  };

  const handleTrackOrder = () => {
    // In a real app, this would redirect to tracking page
    console.log("Redirecting to order tracking...");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      <Confetti active={showConfetti} />

      <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="relative inline-flex items-center justify-center w-24 h-24 mb-6">
            <div className="absolute inset-0 bg-green-100 rounded-full animate-ping"></div>
            <div className="relative bg-green-500 rounded-full p-6">
              <CheckCircle className="h-12 w-12 text-white" />
            </div>
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Order Confirmed! 🎉
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Thank you for your purchase!
          </p>
          <p className="text-lg text-gray-500">
            Order {orderData?.orderId} • Total: ₹{getCartTotal()}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Order Summary */}
          <div className="lg:col-span-2 space-y-8">
            {/* Order Details Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-green-500 to-blue-500 px-6 py-4">
                <h2 className="text-xl font-semibold text-white">
                  Order Details
                </h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">
                      Order ID
                    </p>
                    <p className="text-lg font-semibold text-gray-900">
                      {orderData?.orderId}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">
                      Email
                    </p>
                    <p className="text-lg text-gray-900">{orderData?.email}</p>
                  </div>
                </div>

                {/* Order Items */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900 border-b border-gray-100 pb-2">
                    Items Ordered ({cart.items.length})
                  </h3>
                  {cart.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg"
                    >
                      {/* <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="w-16 h-16 object-contain rounded-lg"
                      /> */}
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">
                          {item.name}
                        </h4>
                        <p className="text-sm text-gray-500">
                          Quantity: {item.quantity}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">
                          ₹{item.price}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Total */}
                <div className="border-t border-gray-100 pt-4 mt-6">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-900">
                      Total
                    </span>
                    <span className="text-2xl font-bold text-green-600">
                      ₹{getCartTotal()}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Shipping Information */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Truck className="h-5 w-5 text-blue-500 mr-2" />
                Shipping Information
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">
                    Delivery Address
                  </h4>
                  <div className="text-gray-600 space-y-1">
                    <p>
                      {orderData?.firstName} {orderData?.lastName}
                    </p>
                    <p>{orderData?.address}</p>
                    <p>
                      {orderData?.city}, {orderData?.state} {orderData?.zipCode}
                    </p>
                    <p>{orderData?.country}</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">
                    Delivery Details
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <span className="text-gray-500 w-24">Estimated:</span>
                      <span className="text-gray-900 font-medium">
                        {orderData?.deliveryDate}
                      </span>
                    </div>
                    <div className="flex items-center text-sm">
                      <span className="text-gray-500 w-24">Tracking:</span>
                      <span className="text-gray-900 font-medium">
                        {orderData?.trackingNumber}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Actions Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button
                  onClick={handleDownloadReceipt}
                  className="w-full flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg transition-colors"
                >
                  <Download className="h-4 w-4" />
                  <span>Download Receipt</span>
                </button>

                <button
                  onClick={handleTrackOrder}
                  className="w-full flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg transition-colors"
                >
                  <Package className="h-4 w-4" />
                  <span>Track Your Order</span>
                </button>

                <button
                  onClick={() => {
                    clearCartItems();
                    clearOrderInfo();
                    window.location.href = "/products";
                  }}
                  className="w-full flex items-center justify-center space-x-2 border border-gray-300 hover:border-gray-400 text-gray-700 px-4 py-3 rounded-lg transition-colors"
                >
                  <ArrowRight className="h-4 w-4" />
                  <span>Continue Shopping</span>
                </button>
              </div>
            </div>

            {/* Order Status Timeline */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Order Status
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Order Confirmed</p>
                    <p className="text-sm text-gray-500">Just now</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
                    <Package className="h-4 w-4 text-gray-500" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-500">Processing</p>
                    <p className="text-sm text-gray-400">1-2 business days</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
                    <Truck className="h-4 w-4 text-gray-500" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-500">Shipped</p>
                    <p className="text-sm text-gray-400">2-3 business days</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-gray-500" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-500">Delivered</p>
                    <p className="text-sm text-gray-400">
                      {orderData?.deliveryDate}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Email Notification */}
            <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-6 border border-purple-200">
              <div className="flex items-start space-x-3">
                <Mail className="h-6 w-6 text-purple-600 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-purple-900 mb-2">
                    Email Updates
                  </h3>
                  <p className="text-sm text-purple-700 mb-3">
                    We&apos;ve sent a confirmation email to{" "}
                    <span className="font-medium">{orderData?.email}</span>
                    with your order details and tracking information.
                  </p>
                  <p className="text-xs text-purple-600">
                    Check your spam folder if you don&apos;t see it in your
                    inbox.
                  </p>
                </div>
              </div>
            </div>

            {/* Feedback Request */}
            <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-xl p-6 border border-yellow-200">
              <div className="flex items-start space-x-3">
                <Heart className="h-6 w-6 text-orange-600 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-orange-900 mb-2">
                    Love Your Purchase?
                  </h3>
                  <p className="text-sm text-orange-700 mb-3">
                    Help others discover great products by leaving a review
                    after you receive your order.
                  </p>
                  <button className="flex items-center space-x-1 text-xs text-orange-600 hover:text-orange-700 font-medium">
                    <Star className="h-3 w-3" />
                    <span>Remind me later</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-12 text-center">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Need Help?
            </h3>
            <p className="text-gray-600 mb-6">
              Our customer support team is here to help with any questions about
              your order.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-2 rounded-lg transition-colors">
                <Mail className="h-4 w-4" />
                <span>Contact Support</span>
              </button>
              <button className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-2 rounded-lg transition-colors">
                <Package className="h-4 w-4" />
                <span>Return Policy</span>
              </button>
              <button className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-2 rounded-lg transition-colors">
                <span>FAQ</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSuccessPage;
