import ProductGrid from "../components/ProductGrid";

export default function DigitalPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Digital</h1>
      <ProductGrid category="digital" />
    </div>
  );
}
