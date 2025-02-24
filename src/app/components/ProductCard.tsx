import { Product } from "../../lib/firestore";

export default function ProductCard({ product }: { product: Product }) {
    return (
        <div className="border rounded-lg p-4 shadow-md hover:shadow-lg transition">
            <img
                src={product.images[0] || "/placeholder.jpg"} // ✅ Use first image in array
                alt={product.name}
                className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-gray-500">${product.price}</p>
        </div>
    );
}
