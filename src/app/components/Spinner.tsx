import { ShoppingCart } from "lucide-react";

export default function Spinner() {
  return (
    <div className="relative flex justify-center items-center h-20">
      <div className="w-14 h-14 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
      <ShoppingCart className="absolute w-7 h-7 text-blue-500" />
    </div>
  );
}
