import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types/product";

interface TrendingProductsProps {
  products: Product[];
}

export const FeaturedCategories: React.FC<TrendingProductsProps> = ({
  products,
}) => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Shop by Category
          </h2>
          <p className="text-lg text-gray-600">
            Discover our wide range of products across different categories
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {products?.map((category) => (
            <Link
              key={category.id}
              href={`/products?category=${encodeURIComponent(category.category)}`}
              className="group"
            >
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="relative h-32 bg-gray-200">
                  <Image
                    src={category.thumbnail}
                    alt={category.category}
                    fill
                    className="object-contain group-hover:scale-105 transition-transform duration-300"
                    // onError={(e) => {
                    //   const target = e.target as HTMLImageElement;
                    //   target.src = `https://via.placeholder.com/200x128/f3f4f6/6b7280?text=${category.category}`;
                    // }}
                  />
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-semibold text-gray-900 mb-1 first-letter:uppercase">
                    {category.category}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {category?.stock || 0} Products
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
