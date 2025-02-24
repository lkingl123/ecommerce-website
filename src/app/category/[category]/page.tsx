"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchProductsByCategory, Product } from "@/lib/firestore"; // ✅ Fetch from Firestore
import ProductCard from "@/app/components/ProductCard";

export default function CategoryPage() {
  const params = useParams();
  const category = Array.isArray(params.category) ? params.category[0] : params.category; // Ensure category is a string

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      if (category) {
        setLoading(true);
        try {
          const fetchedProducts = await fetchProductsByCategory(category);
          setProducts(fetchedProducts);
        } catch (error) {
          console.error("Error fetching products:", error);
        } finally {
          setLoading(false);
        }
      }
    }
    loadProducts();
  }, [category]);

  return (
    <div className="container mx-auto py-28">
      {/* Title */}
      <h1 className="text-4xl font-bold mb-2 capitalize">{category}</h1>
      <p className="text-gray-500 text-lg mb-8">Category</p>

      {/* Loading Indicator */}
      {loading ? (
        <p className="text-gray-600 text-center">Loading products...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.length > 0 ? (
            products.map((product) => <ProductCard key={product.id} product={product} />)
          ) : (
            <p className="text-gray-600 text-center col-span-3">No products found.</p>
          )}
        </div>
      )}
    </div>
  );
}
