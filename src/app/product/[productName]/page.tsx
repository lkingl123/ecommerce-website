"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import ProductCard from "@/app/components/ProductCard";
import Spinner from "@/app/components/Spinner";
import { fetchProductByName, fetchRelatedProducts } from "@/lib/firestore";
import { Product } from "@/lib/firestore";
import { useCart } from "@/context/CartContext"; // ✅ Import Cart Context

export default function ProductPage() {
  const { productName } = useParams();
  const router = useRouter();
  const { addToCart } = useCart(); // ✅ Get addToCart

  const productSlug = Array.isArray(productName) ? productName[0] : productName; // Ensure string

  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null); // Track selected image

  useEffect(() => {
    async function loadProductData() {
      if (!productSlug) return;

      try {
        const productData = await fetchProductByName(productSlug);
        setProduct(productData as Product);
        setSelectedImage(productData?.images?.[0] || null); // Default selected image

        if (productData?.category) {
          const related = await fetchRelatedProducts(
            productData.category,
            productData.id
          );
          setRelatedProducts(related);
        }
      } catch (error) {
        console.error("❌ Error fetching product details:", error);
      } finally {
        setLoading(false);
      }
    }

    loadProductData();
  }, [productSlug]);

  if (loading) return <Spinner />;

  if (!product) {
    return (
      <div className="container mx-auto py-28 max-w-[1200px] text-center">
        <h1 className="text-3xl font-bold text-gray-900">Product Not Found</h1>
        <p className="text-gray-500 mt-2">
          We couldn't find the product you're looking for.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-28 max-w-[1200px]">
      {/* ✅ Breadcrumb Navigation */}
      <div className="text-gray-500 text-sm mb-4">
        <Link href="/" className="hover:underline">
          All Products
        </Link>{" "}
        &gt;
        <span className="text-gray-900 font-medium"> {product.name}</span>
      </div>

      {/* ✅ Product Details Section */}
      <div className="flex flex-col md:flex-row">
        {/* Main Product Image */}
        <div className="md:w-1/2">
          <img
            src={selectedImage || product.images[0]}
            alt={product.name}
            className="rounded-lg w-full h-[400px] object-cover border p-4 shadow-md hover:shadow-lg transition"
          />

          {/* Product Gallery */}
          <div className="grid grid-cols-3 gap-2 mt-4">
            {product.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Gallery ${index}`}
                className={`border rounded-lg p-2 transition cursor-pointer ${
                  selectedImage === image ? "shadow-md" : "hover:shadow-lg"
                }`}
                onClick={() => setSelectedImage(image)}
              />
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="md:w-1/2 md:pl-12">
          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
          <p className="text-l text-gray-500 mt-2">{product.description}</p> {/* ✅ Show description */}
          <p className="text-2xl font-semibold text-gray-900 mt-4">
            ${product.price}
          </p>
          <button
            className="mt-6 bg-black text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-gray-800 transition"
            onClick={() => {
              addToCart(product); // ✅ Add product to cart
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* ✅ Related Products Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-center mb-6">You May Also Like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {relatedProducts.map((relatedProduct) => (
            <div
              key={relatedProduct.id}
              className="cursor-pointer hover:shadow-lg transition"
              onClick={() =>
                router.push(
                  `/product/${relatedProduct.name.replace(/\s+/g, "-").toLowerCase()}`
                )
              }
            >
              <ProductCard product={relatedProduct} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
