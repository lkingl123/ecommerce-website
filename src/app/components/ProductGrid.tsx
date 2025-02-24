"use client";

import { useEffect, useState } from "react";
import { fetchProductsByCategory, Product } from "../../lib/firestore";
import ProductCard from "./ProductCard";

interface ProductGridProps {
    category: string;
}

export default function ProductGrid({ category }: ProductGridProps) {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        async function loadProducts() {
            try {
                const fetchedProducts = await fetchProductsByCategory(category);
                setProducts(fetchedProducts);
            } catch (error) {
                console.error("Firestore error:", error);
            }
        }
        loadProducts();
    }, [category]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {products.length > 0 ? (
                products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))
            ) : (
                <p className="col-span-3 text-center text-gray-500">No products found.</p>
            )}
        </div>
    );
}
