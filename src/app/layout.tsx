import type { Metadata } from "next";
import { Suspense } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./styles/globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Spinner from "./components/Spinner"; // ✅ Import the Spinner

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Your Next Store",
  description: "The best curated shopping experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased vsc-initialized flex flex-col min-h-screen`}>
        <Navbar />
        {/* ✅ Wrap ALL children in Suspense */}
        <Suspense fallback={<div className="flex justify-center py-10"><Spinner /></div>}>
          <main className="flex-grow">{children}</main>
        </Suspense>
        <Footer />
      </body>
    </html>
  );
}
