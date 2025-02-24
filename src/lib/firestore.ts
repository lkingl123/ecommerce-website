import { db } from "./firebase";
import { collection, addDoc, query, where, serverTimestamp, getDocs } from "firebase/firestore";

// ✅ Define and export Product type
export interface Product {
    id: string;
    name: string;
    price: number;
    images: string[]; // Ensure images are always an array
}

// Fetch products by category
export async function fetchProductsByCategory(category: string): Promise<Product[]> {
    try {
        console.log("🔥 Fetching products for category:", category);

        const q = query(collection(db, "products"), where("category", "==", category));
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


// Add products
export async function addProduct(name: string, price: number, category: string): Promise<string | null> {
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
