import { Suspense } from "react";
import Hero from "./components/Hero";

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
