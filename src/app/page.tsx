import Hero from "./components/Hero";
import ProductGrid from "./components/ProductGrid";

export default function Home() {
  return (
    <div>
      <Hero />
      <section className="container mx-auto py-8 max-w-[1200px]">
        <h2 className="text-2xl font-bold text-center mb-6">Trending Products</h2>
        <ProductGrid category="apparel" />
      </section>
    </div>
  );
}
