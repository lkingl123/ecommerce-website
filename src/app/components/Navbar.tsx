"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";

export default function Navbar() {
  const pathname = usePathname(); // Get current active route
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/30 shadow-lg backdrop-blur-md" : "bg-white shadow-md"
      }`}
    >
      <div className="max-w-screen-xl mx-auto flex justify-between items-center px-6 py-4">
        
        {/* Left Side: Logo & Navigation */}
        <div className="flex items-center space-x-8">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold whitespace-nowrap">
            Your Next Store
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-6 text-gray-700 text-m">
            {[
              { name: "Home", href: "/" },
              { name: "Apparel", href: "/category/apparel" },
              { name: "Accessories", href: "/category/accessories" },
              { name: "Digital", href: "/category/digital" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-md transition ${
                  pathname === link.href
                    ? "bg-gray-900 text-white" // Active link style
                    : "hover:bg-gray-200"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Right Side: Search, Cart & Login */}
        <div className="flex items-center space-x-5">
          {/* Search Input */}
          <div className="relative flex items-center">
            <IoSearch className="absolute left-3 text-gray-500 text-lg" />
            <input 
              type="text" 
              placeholder="Search for products..." 
              className="border border-gray-300 pl-10 pr-3 py-2 rounded-md text-sm focus:outline-none w-60"
            />
          </div>

          {/* Cart Icon */}
          <button className="relative text-2xl">
            <FaShoppingCart className="text-gray-700" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2">1</span>
          </button>

          {/* Login Icon */}
          <button className="text-2xl">
            <FaUser className="text-gray-700" />
          </button>
        </div>

      </div>
    </nav>
  );
}
