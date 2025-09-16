'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, ShoppingBag, Zap, Gift } from 'lucide-react'
import { Button } from '@/components/ui/Button'

const bannerSlides = [
  {
    id: 1,
    title: 'Summer Collection 2025',
    subtitle: 'Discover the hottest trends',
    description: 'Get up to 50% off on selected items. Free shipping on orders over $50.',
    buttonText: 'Shop Now',
    buttonLink: '/products?category=fashion',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=600&fit=crop&crop=center',
    bgColor: 'from-blue-600 to-purple-600',
    textColor: 'text-white',
  },
  {
    id: 2,
    title: 'Tech Deals',
    subtitle: 'Latest gadgets & electronics',
    description: 'Upgrade your tech game with our exclusive electronics collection.',
    buttonText: 'Explore Tech',
    buttonLink: '/products?category=electronics',
    image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1200&h=600&fit=crop&crop=center',
    bgColor: 'from-gray-900 to-gray-700',
    textColor: 'text-white',
  },
  {
    id: 3,
    title: 'Home & Living',
    subtitle: 'Transform your space',
    description: 'Beautiful home decor and furniture to make your house a home.',
    buttonText: 'Shop Home',
    buttonLink: '/products?category=home-decoration',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&h=600&fit=crop&crop=center',
    bgColor: 'from-green-600 to-teal-600',
    textColor: 'text-white',
  },
]

export function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Auto-advance slides
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerSlides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    setIsAutoPlaying(false)
    // Resume auto-play after 10 seconds
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const nextSlide = () => {
    goToSlide((currentSlide + 1) % bannerSlides.length)
  }

  const prevSlide = () => {
    goToSlide(currentSlide === 0 ? bannerSlides.length - 1 : currentSlide - 1)
  }

  const currentBanner = bannerSlides[currentSlide]

  if (!currentBanner) {
    return null
  }
  return (
    <div className="relative h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden">
      {/* Background */}
      <div className={`absolute inset-0 bg-gradient-to-r ${currentBanner.bgColor} transition-all duration-1000`}>
        <Image
          src={currentBanner.image}
          alt={currentBanner.title}
          fill
          className="object-cover mix-blend-overlay opacity-80"
          priority
        />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <div className="space-y-6 animate-fade-in">
              {/* Subtitle */}
              <div className="flex items-center space-x-2">
                <Gift className="w-5 h-5 text-yellow-300" />
                <span className={`text-lg font-medium ${currentBanner.textColor} opacity-90`}>
                  {currentBanner.subtitle}
                </span>
              </div>

              {/* Main Title */}
              <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold ${currentBanner.textColor} leading-tight`}>
                {currentBanner.title}
              </h1>

              {/* Description */}
              <p className={`text-xl ${currentBanner.textColor} opacity-90 max-w-lg`}>
                {currentBanner.description}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  size="lg"
                  className="bg-white text-gray-900 hover:bg-gray-100 shadow-lg"
                  asChild
                >
                  <Link href={currentBanner.buttonLink}>
                    <ShoppingBag className="w-5 h-5 mr-2" />
                    {currentBanner.buttonText}
                  </Link>
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-gray-900 backdrop-blur-sm"
                  asChild
                >
                  <Link href="/products">
                    <Zap className="w-5 h-5 mr-2" />
                    View All Deals
                  </Link>
                </Button>
              </div>

              {/* Features */}
              <div className="flex flex-wrap gap-6 pt-6">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className={`text-sm ${currentBanner.textColor} opacity-80`}>
                    Free Shipping
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span className={`text-sm ${currentBanner.textColor} opacity-80`}>
                    Easy Returns
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <span className={`text-sm ${currentBanner.textColor} opacity-80`}>
                    24/7 Support
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors duration-200"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors duration-200"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
        {bannerSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${
              index === currentSlide
                ? 'bg-white scale-125'
                : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20">
        <div
          className="h-full bg-white transition-all duration-100 ease-linear"
          style={{
            width: isAutoPlaying ? `${((currentSlide + 1) / bannerSlides.length) * 100}%` : '0%',
          }}
        />
      </div>
    </div>
  )
}