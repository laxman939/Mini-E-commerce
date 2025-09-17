"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { setProducts } from "@/store/slices/productsSlice";
import {
  setCategory,
  setSearchQuery,
  setSortBy,
} from "@/store/slices/filtersSlice";
import { ProductFilters } from "@/components/product/ProductFilters";
import { useDebounce } from "@/hooks/useDebounce";
import { ProductCard } from "@/components/product/ProductCard";
import { Product } from "@/types/product";
import { Header } from "@/components/layout/Header";

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const dispatch = useDispatch();

  const { items: products } = useSelector((state: RootState) => state.products);

  const filters = useSelector((state: RootState) => state.filters);

  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // Initialize filters from URL params
  useEffect(() => {
    const category = searchParams.get("category");
    const sort = searchParams.get("sort");
    const search = searchParams.get("search");
    console.log(category, "search category")

    if (category) dispatch(setCategory(category));
    if (sort) dispatch(setSortBy(sort as any));
    if (search) {
      setSearchTerm(search);
      dispatch(setSearchQuery(search));
    }
  }, [searchParams, dispatch]);

  // Update search query when debounced term changes
  useEffect(() => {
     const category = searchParams.get("category");
    const fetchProducts = async () => {
      // const key = debouncedSearchTerm || "__all__"; // unique cache key
      // ✅ Check cache first
      // if (cacheRef.current[key]) {
      //   dispatch(setProducts(cacheRef.current[key]));
      //   return;
      // }
      // console.log(cacheRef.current[key], "cache")

      setIsLoading(true);
      try {
        const url =
          debouncedSearchTerm && debouncedSearchTerm.length > 0
            ? `https://dummyjson.com/products/search?q=${debouncedSearchTerm}`
            :`https://dummyjson.com/products?limit=${category ? 110 : 30}`;

        const res = await fetch(url);
        const data = await res.json();

        // ✅ Save result in cache
        // cacheRef.current[key] = data.products as Product[];
        dispatch(setProducts(data.products as Product[]));
      } catch (err) {
        console.error("Products fetch error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [debouncedSearchTerm, dispatch]);

  // Filter and sort products
  const filteredProducts = React.useMemo(() => {
    const filtered = products.filter((product: Product) => {
      const matchesCategory =
        !filters.category || product.category === filters.category;
      const matchesSearch =
        !filters.searchQuery ||
        product.name?.toLowerCase().includes(filters.searchQuery.toLowerCase());
      product.description
        .toLowerCase()
        .includes(filters.searchQuery.toLowerCase());
      const matchesPrice =
        product?.price >= filters.priceRange.min &&
        product?.price <= filters.priceRange.max;
      const matchesBrand =
        filters.brands.length === 0 || filters.brands.includes(product.brand);
      const matchesRating = product?.rating >= filters.rating;
      const matchesStock = !filters.inStock || product.availabilityStatus !== "In Stock";

      return (
        matchesCategory &&
        matchesSearch &&
        matchesPrice &&
        matchesBrand &&
        matchesRating &&
        matchesStock
      );
    });

    // Sort products
    filtered.sort((a, b) => {
      let comparison = 0;

      switch (filters.sortBy) {
        case "name":
          comparison = Number(a.name?.localeCompare(b.name || ""));
          break;
        case "price":
          comparison = a.price - b.price;
          break;
        case "rating":
          comparison = b.rating - a.rating; // Higher rating first
          break;
        case "newest":
          // Mock: newer products have higher IDs
          comparison = parseInt(b.id.toString()) - parseInt(a.id.toString());
          break;
        default:
          comparison = 0;
      }

      return filters.sortOrder === "desc" ? -comparison : comparison;
    });

    return filtered;
  }, [products, filters]);

  const handleSortChange = (sortBy: string) => {
    dispatch(setSortBy(sortBy as any));
  };

  // if (isLoading) {
  //   return (
     
  //   );
  // }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Products</h1>
              <p className="text-gray-600 mt-1">
                {filteredProducts.length}{" "}
                {filteredProducts.length === 1 ? "product" : "products"} found
                {filters.category && ` in ${filters.category}`}
              </p>
            </div>

            {/* Search Bar */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search products..."
                  className="w-64 px-4 py-2 pl-10 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-6">
              {/* Mobile filter toggle */}
              <div className="lg:hidden mb-4">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="w-full bg-white border border-gray-300 rounded-md px-4 py-2 flex items-center justify-between text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Filters
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707v4.586a1 1 0 01-.293.707L9 19.414a1 1 0 01-.707.293H8a1 1 0 01-1-1v-4a1 1 0 00-.293-.707L.293 7.293A1 1 0 010 6.586V4z"
                    />
                  </svg>
                </button>
              </div>

              <div className={`${showFilters ? "block" : "hidden"} lg:block`}>
                <ProductFilters />
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                {/* Sort Dropdown */}
                <select
                  value={filters.sortBy}
                  onChange={(e) => handleSortChange(e.target.value)}
                  className="px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-40"
                >
                  <option value="name">Sort by Name</option>
                  <option value="price">Sort by Price</option>
                  <option value="rating">Sort by Rating</option>
                  <option value="newest">Newest First</option>
                </select>
              </div>

              {/* View Mode Toggle */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-md ${viewMode === "grid" ? "bg-blue-100 text-blue-600" : "text-gray-400 hover:text-gray-600"}`}
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-md ${viewMode === "list" ? "bg-blue-100 text-blue-600" : "text-gray-400 hover:text-gray-600"}`}
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 10h16M4 14h16M4 18h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
<>
{
  isLoading ?
   <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div className="h-48 bg-gray-200 animate-pulse"></div>
                <div className="p-4">
                  <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      :
<>
     {/* Products Display */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <svg
                  className="mx-auto w-24 h-24 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <h3 className="mt-4 text-lg font-medium text-gray-900">
                  No products found
                </h3>
                <p className="mt-2 text-gray-500">
                  Try adjusting your search or filter criteria.
                </p>
              </div>
            ) : (
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                    : "space-y-4"
                }
              >
                {filteredProducts.map((product: Product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    viewMode={viewMode}
                  />
                ))}
              </div>
            )}
</>
}
</>
       

            {/* Pagination would go here */}
          </div>
        </div>
      </div>
    </div>
  );
}
