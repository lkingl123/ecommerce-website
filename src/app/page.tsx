import { Suspense } from "react";
import Hero from "./components/Hero";
import ProductGrid from "./components/ProductGrid";
import Spinner from "./components/Spinner"; // ✅ Import Spinner for loading state

export default function Home() {
  return (
    <div>
      {/* ✅ Wrap Hero in Suspense to fix useSearchParams() error */}
      <Suspense fallback={<div className="flex justify-center py-10"></div>}>
        <Hero />
      </Suspense>
    </div>
  );
}
