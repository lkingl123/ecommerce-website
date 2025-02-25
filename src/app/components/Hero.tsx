import Link from "next/link";

export default function Hero() {
  return (
    <section className="flex justify-center pt-24 pb-8 bg-white">
      <div className="max-w-screen-xl w-full bg-gray-50 rounded-lg shadow-md flex flex-col md:flex-row items-center px-16 py-32">
       
        {/* Left Side: Text */}
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl font-extrabold mb-4 text-gray-900 leading-tight">
            Discover Our <br /> Curated Collection
          </h1>
          <p className="text-gray-600 text-lg mb-6">
            Explore our carefully selected products for your home <br />and lifestyle.
          </p>
          <Link
            href="/category/accessories"
            className="bg-black text-white px-6 py-3 rounded-full text-lg font-medium shadow-md hover:bg-gray-800 transition"
          >
            Shop Now
          </Link>
        </div>

        {/* Right Side: Image */}
        <div className="md:w-1/2 flex justify-center">
          <img 
            src="/hero.png" 
            alt="Featured Product" 
            className="rounded-lg max-w-sm bg-transparent"
          />
        </div>

      </div>
    </section>
  );
}
