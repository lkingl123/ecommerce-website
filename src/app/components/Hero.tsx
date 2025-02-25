"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { fetchProductsBySearch, Product } from "@/lib/firestore"; // ✅ Fetch from Firestore
import ProductCard from "@/app/components/ProductCard";
import Spinner from "@/app/components/Spinner"; // ✅ Import the spinner
import Link from "next/link";
import ProductGrid from "./ProductGrid";

export default function Hero() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("q"); // Can be null if not present

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadProducts() {
      if (!searchQuery) return; // Don't fetch if no search query

      setLoading(true);
      try {
        const fetchedProducts = await fetchProductsBySearch(searchQuery);
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("❌ Error fetching search results:", error);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, [searchQuery]);

  // ✅ If searching, remove the Hero section and show category-style search results
  if (searchQuery) {
    return (
      <div className="container mx-auto py-28 max-w-[1200px]">
        {" "}
        {/* ✅ Matches CategoryPage.tsx */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold">Searching for "{searchQuery}"</h1>
        </div>
        {/* Loading Indicator */}
        {loading ? (
          <div className="flex justify-center">
            <Spinner /> {/* ✅ Show Loading Spinner */}
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          /* ✅ No Results Found Display */
          <div className="flex flex-col items-center justify-center py-16">
            <h2 className="text-3xl font-bold text-gray-900">
              No Results Found for "{searchQuery}"
            </h2>
            <p className="text-gray-500 text-lg mt-4">
              Sorry, we couldn't find any results that match your search query.{" "}
              <br />
              Please try refining your search.
            </p>
          </div>
        )}
      </div>
    );
  }

  // ✅ Default Hero Content (Keeps Gray Background & Border)
  return (
    <section className="w-full bg-white">
      <div className="container mx-auto flex flex-col justify-center pt-24 pb-8">
        <div className="max-w-screen-xl w-full bg-gray-50 rounded-lg shadow-md flex flex-col md:flex-row items-center px-16 py-20 mx-auto">
          {/* Left Side: Text */}
          <div className="md:w-1/2 text-center md:text-left">
            <h1 className="text-4xl font-extrabold mb-4 text-gray-900 leading-tight">
              Discover Our <br /> Curated Collection
            </h1>
            <p className="text-gray-600 text-lg mb-6">
              Explore our carefully selected products for your home <br /> and
              lifestyle.
            </p>
            <Link
              href="/category/accessories"
              className="bg-black text-white px-6 py-3 rounded-full text-lg font-medium shadow-md hover:bg-gray-800 transition"
            >
              Shop Now
            </Link>
          </div>

          {/* Right Side: Image */}
          <div className="md:w-1/2 flex justify-center">
            <img
              src="/hero.png"
              alt="Featured Product"
              className="rounded-lg max-w-sm bg-transparent"
            />
          </div>
        </div>

        {/* ✅ Trending Products Section */}
        <div className="container mx-auto mt-12 max-w-[1200px]">
          <h2 className="text-2xl font-bold text-center mb-6">
            Trending Products
          </h2>
          <ProductGrid category="apparel" />
        </div>
      </div>
    </section>
  );
}
