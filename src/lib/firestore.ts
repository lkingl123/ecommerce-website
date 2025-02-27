import { db } from "./firebase";
import {
  collection,
  addDoc,
  query,
  where,
  serverTimestamp,
  getDocs,
} from "firebase/firestore";

// ✅ Define and export Product type
export interface Product {
  id: string;
  name: string;
  price: number;
  images: string[]; // Ensure images are always an array
  category: string;
  description: string;
}

// Fetch products by category
export async function fetchProductsByCategory(
  category: string
): Promise<Product[]> {
  try {
    console.log("🔥 Fetching products for category:", category);

    const q = query(
      collection(db, "products"),
      where("category", "==", category)
    );
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.warn(`⚠️ No products found for category: ${category}`);
    }

    return querySnapshot.docs.map((doc) => {
      const data = doc.data();
      console.log("✅ Fetched product:", data);

      return {
        id: doc.id,
        name: data.name || "Unknown Product",
        price: data.price || 0,
        images: data.images || ["/placeholder.png"], // Ensure at least one image
      } as Product;
    });
  } catch (error) {
    console.error("❌ Error fetching products:", error);
    return [];
  }
}

// Fetch products by search query
export async function fetchProductsBySearch(
  searchQuery: string
): Promise<Product[]> {
  try {
    console.log("🔍 Searching for:", searchQuery);

    const productsRef = collection(db, "products");
    const snapshot = await getDocs(productsRef);

    if (snapshot.empty) {
      console.warn("⚠️ No products found in the database.");
      return [];
    }

    // Convert query to lowercase for case-insensitive search
    const q = searchQuery.toLowerCase();

    // Filter locally (Firestore does not support "contains" queries directly)
    const filteredProducts = snapshot.docs
      .map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data.name || "Unknown Product",
          price: data.price || 0,
          images: data.images || ["/placeholder.png"],
          category: data.category || "Uncategorized",
        } as Product;
      })
      .filter(
        (product) =>
          product.name.toLowerCase().includes(q) ||
          product.category.toLowerCase().includes(q)
      );

    if (filteredProducts.length === 0) {
      console.warn(`⚠️ No matching results for "${searchQuery}".`);
    }

    return filteredProducts;
  } catch (error) {
    console.error("❌ Error fetching search results:", error);
    return [];
  }
}

// Add products
export async function addProduct(
  name: string,
  price: number,
  category: string
): Promise<string | null> {
  try {
    const docRef = await addDoc(collection(db, "products"), {
      name,
      price,
      category,
      images: [], // Will update with image URL later
      created_at: serverTimestamp(),
    });
    console.log("Product added with ID:", docRef.id);
    return docRef.id; // ✅ Return the document ID
  } catch (error) {
    console.error("Error adding product:", error);
    return null;
  }
}

// Fetch product by name (for individual product page)
export async function fetchProductByName(
  productName: string
): Promise<Product | null> {
  try {
    console.log("🔎 Fetching product:", productName);

    const productsRef = collection(db, "products");
    const snapshot = await getDocs(productsRef);

    if (snapshot.empty) {
      console.warn("⚠️ No products found in the database.");
      return null;
    }

    // Convert productName to lowercase for case-insensitive search
    const lowerCaseName = productName.toLowerCase();

    // Find the product where the name matches
    const matchedProduct = snapshot.docs
      .map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data.name || "Unknown Product",
          price: data.price || 0,
          images: data.images || ["/placeholder.png"],
          category: data.category || "Uncategorized",
          description: data.description || "No description available",
        } as Product;
      })
      .find((product) => product.name.toLowerCase() === lowerCaseName);

    if (!matchedProduct) {
      console.warn(`⚠️ Product not found: "${productName}"`);
      return null;
    }

    console.log("✅ Product found:", matchedProduct);
    return matchedProduct;
  } catch (error) {
    console.error("❌ Error fetching product details:", error);
    return null;
  }
}

// Fetch related products by category
export async function fetchRelatedProducts(
  category: string,
  excludeProductId?: string
): Promise<Product[]> {
  try {
    console.log("📦 Fetching related products in category:", category);

    const q = query(
      collection(db, "products"),
      where("category", "==", category)
    );
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.warn(`⚠️ No related products found for category: ${category}`);
      return [];
    }

    const relatedProducts = querySnapshot.docs
      .map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data.name || "Unknown Product",
          price: data.price || 0,
          images: data.images || ["/placeholder.png"],
          category: data.category || "Uncategorized",
          description: data.description || "No description available",
        } as Product;
      })
      .filter((product) => product.id !== excludeProductId); // Avoid including the current product

    console.log("✅ Related products found:", relatedProducts);
    return relatedProducts;
  } catch (error) {
    console.error("❌ Error fetching related products:", error);
    return [];
  }
}
