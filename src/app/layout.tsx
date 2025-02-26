import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./styles/globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { SearchProvider } from "@/context/SearchContext"; // ✅ Import SearchProvider

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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased vsc-initialized flex flex-col min-h-screen`}
      >
        <SearchProvider>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </SearchProvider>
      </body>
    </html>
  );
}
