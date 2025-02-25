"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchProductsByCategory, Product } from "@/lib/firestore"; // ✅ Fetch from Firestore
import ProductCard from "@/app/components/ProductCard";
import Spinner from "@/app/components/Spinner"; // ✅ Import the spinner

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
    <div className="container mx-auto py-28 max-w-[1200px]"> {/* ✅ Center the content */}
      {/* Title */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold capitalize">{category}</h1>
        <p className="text-gray-500 text-lg">Category</p>
      </div>

      {/* Loading Indicator */}
      {loading ? (
        <div className="flex justify-center">
          <Spinner /> {/* ✅ Render Spinner Component */}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.length > 0 ? (
            products.map((product) => <ProductCard key={product.id} product={product} />)
          ) : (
            <p className="text-gray-600 text-center col-span-3">Out of Stock</p>
          )}
        </div>
      )}
    </div>
  );
}
