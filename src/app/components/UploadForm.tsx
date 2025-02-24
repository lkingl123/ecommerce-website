import { useState } from "react";
import { addProduct } from "../../lib/firestore";
import { uploadProductImage } from "../../lib/storage";

export default function UploadForm() {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [file, setFile] = useState<File | null>(null);

    async function handleUpload() {
        if (!name || !price || !category || !file) {
            alert("Please fill in all fields and select an image.");
            return;
        }

        // Add product first (without images)
        const productId = await addProduct(name, Number(price), category);

        // Upload image & update product
        if (productId) {
            await uploadProductImage(file, productId);
        }
    }

    return (
        <div className="p-6 border rounded-lg">
            <h2 className="text-lg font-semibold mb-4">Upload New Product</h2>
            <input type="text" placeholder="Product Name" onChange={(e) => setName(e.target.value)} className="border p-2 mb-2 w-full" />
            <input type="number" placeholder="Price" onChange={(e) => setPrice(e.target.value)} className="border p-2 mb-2 w-full" />
            <input type="text" placeholder="Category" onChange={(e) => setCategory(e.target.value)} className="border p-2 mb-2 w-full" />
            <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} className="border p-2 mb-2 w-full" />
            <button onClick={handleUpload} className="bg-blue-500 text-white px-4 py-2 rounded-md">
                Upload Product
            </button>
        </div>
    );
}
