"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchProductsByCategory, Product } from "@/lib/firestore"; // ✅ Fetch from Firestore
import ProductCard from "@/app/components/ProductCard";
import Spinner from "@/app/components/Spinner"; // ✅ Import the spinner
import Link from "next/link"; // ✅ Import Next.js Link

export default function CategoryPage() {
  const params = useParams();
  const category = Array.isArray(params.category) ? params.category[0] : params.category; // Ensure category is a string

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      if (!category) return;

      setLoading(true);
      const minLoadingTime = 2000; // ⏳ Ensure spinner lasts at least 2 seconds
      const startTime = Date.now();

      try {
        const fetchedProducts = await fetchProductsByCategory(category);
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("❌ Error fetching products:", error);
      } finally {
        const elapsedTime = Date.now() - startTime;
        const remainingTime = minLoadingTime - elapsedTime;

        // ⏳ Ensure loading lasts for at least 2 seconds
        setTimeout(() => {
          setLoading(false);
        }, remainingTime > 0 ? remainingTime : 0);
      }
    }

    loadProducts();
  }, [category]);

  return (
    <div className="container mx-auto py-28 max-w-[1200px]">
      {/* Title */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold capitalize">{category}</h1>
        <p className="text-gray-500 text-lg">Category</p>
      </div>

      {/* Loading Indicator */}
      {loading ? (
        <div className="flex justify-center">
          <Spinner /> {/* ✅ Spinner runs for at least 2 seconds */}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.length > 0 ? (
            products.map((product) => (
              <Link key={product.id} href={`/product/${encodeURIComponent(product.name)}`}>
                <ProductCard product={product} />
              </Link>
            ))
          ) : (
            <p className="text-gray-600 text-center col-span-3">Out of Stock</p>
          )}
        </div>
      )}
    </div>
  );
}
