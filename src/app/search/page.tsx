"use client";

import { useSearch } from "@/context/SearchContext"; // ✅ Use the global search state
import { fetchProductsBySearch, Product } from "@/lib/firestore";
import { useEffect, useState } from "react";
import ProductCard from "@/app/components/ProductCard";
import Spinner from "@/app/components/Spinner";

export default function SearchPage() {
  const { searchQuery } = useSearch();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadProducts() {
      if (!searchQuery) return;
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

  return (
    <div className="container mx-auto py-28 max-w-[1200px]">
      <div className="mb-8">
        <h1 className="text-4xl font-bold">Searching for "{searchQuery}"</h1>
      </div>

      {loading ? (
        <div className="flex justify-center">
          <Spinner />
        </div>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        /* ✅ No Results Found Display */
        <div className="flex flex-col items-center justify-center text-center py-16">
          <h2 className="text-3xl font-bold text-gray-900">
            No Results Found for <span className="text-black">"{searchQuery}"</span>
          </h2>
          <p className="text-gray-500 text-lg mt-4 max-w-lg">
            Sorry, we couldn't find any results that match your search query. <br />
            Please try refining your search.
          </p>
        </div>
      )}
    </div>
  );
}
