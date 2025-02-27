"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { FaShoppingCart, FaTrash } from "react-icons/fa";

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart } = useCart(); // ✅ Add quantity control functions

  // Calculate total price
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="container mx-auto py-28 max-w-[1000px]">
      {cart.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-12">
          <FaShoppingCart className="text-6xl text-black mb-4" />
          <h1 className="text-2xl font-bold text-gray-900">Your cart is empty</h1>
          <p className="text-gray-500 mt-2">Looks like you haven't added anything to your cart yet.</p>
          <Link
            href="/"
            className="mt-6 bg-black text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-gray-800 transition"
          >
            Continue shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* ✅ Left Section - Cart Items */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Your cart</h1>
            <div className="space-y-6">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between items-center border p-4 rounded-md">
                  <img src={item.images[0]} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
                  <div className="flex-1 text-left px-4">
                    <h2 className="text-lg font-medium">{item.name}</h2>
                    <p className="text-gray-600">${item.price.toFixed(2)}</p>
                  </div>

                  {/* ✅ Quantity Control */}
                  <div className="flex items-center">
                    <button
                      className="px-2 bg-gray-300 rounded-md text-lg"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <p className="mx-2 text-gray-900 font-bold">{item.quantity}</p>
                    <button
                      className="px-2 bg-gray-300 rounded-md text-lg"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>

                  {/* ✅ Remove Item Button */}
                  <button onClick={() => removeFromCart(item.id)} className="text-red-600 hover:text-red-800 ml-3">
                    <FaTrash />
                  </button>
                </div>
              ))}
            </div>

            {/* ✅ Total Price */}
            <div className="mt-6 border-t pt-4">
              <h2 className="text-xl font-semibold">TOTAL: ${totalPrice.toFixed(2)}</h2>
            </div>
          </div>

          {/* ✅ Right Section - Checkout */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Checkout</h2>
            <p className="text-gray-500">Provide billing and shipping details below.</p>

            {/* Email & Address */}
            <input type="email" placeholder="Email" className="w-full border p-2 mt-4 rounded-md" />
            <input type="text" placeholder="Full name" className="w-full border p-2 mt-2 rounded-md" />
            <input type="text" placeholder="Address" className="w-full border p-2 mt-2 rounded-md" />

            {/* Shipping Methods */}
            <h3 className="mt-4 font-semibold">Shipping method</h3>
            <div className="grid grid-cols-2 gap-2 mt-2">
              <button className="border p-2 rounded-md text-left">Standard Shipping - $9.99</button>
              <button className="border p-2 rounded-md text-left">Express Shipping - $19.99</button>
              <button className="border p-2 rounded-md text-left">Space Shipping - $21.37</button>
              <button className="border p-2 rounded-md text-left">Ground Shipping - $20.00</button>
            </div>

            {/* Payment Options */}
            <h3 className="mt-4 font-semibold">Payment</h3>
            <div className="grid grid-cols-3 gap-2 mt-2">
              <button className="border p-2 rounded-md">Card</button>
              <button className="border p-2 rounded-md">PayPal</button>
              <button className="border p-2 rounded-md">Google Pay</button>
            </div>

            {/* Payment Fields */}
            <input type="text" placeholder="Card Number" className="w-full border p-2 mt-2 rounded-md" />
            <div className="grid grid-cols-2 gap-2 mt-2">
              <input type="text" placeholder="MM / YY" className="border p-2 rounded-md" />
              <input type="text" placeholder="CVC" className="border p-2 rounded-md" />
            </div>

            {/* Checkout Button */}
            <button className="mt-6 bg-black text-white px-6 py-3 w-full rounded-md text-lg font-semibold hover:bg-gray-800 transition">
              Pay now
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
