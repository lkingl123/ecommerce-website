import ProductGrid from "../components/ProductGrid";

export default function ApparelPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Apparel</h1>
      <ProductGrid category="apparel" />
    </div>
  );
}
