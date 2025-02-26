import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-gray-50 py-8 shadow-lg border-t-2 border-gray-100">
            <div className="container mx-auto px-6 flex flex-col md:flex-row justify-center items-start" style={{ gap: '42rem' }}>
                
                {/* Left Section: Newsletter */}
                <div className="flex flex-col space-y-3">
                    <h3 className="font-semibold text-gray-700">Subscribe to our newsletter</h3>
                    <div className="flex">
                        <input 
                            type="email" 
                            placeholder="Enter your email" 
                            className="border border-gray-300 px-3 py-2 rounded-l-md focus:outline-none w-64"
                        />
                        <button className="bg-black text-white px-4 py-2 rounded-r-md font-semibold">
                            Subscribe
                        </button>
                    </div>
                </div>

                {/* Right Section: Products & Support */}
                <div className="flex flex-row space-x-16">
                    <div>
                        <h3 className="font-semibold text-gray-700">Products</h3>
                        <ul className="space-y-1 text-gray-600">
                            <li><Link href="/category/apparel">Apparel</Link></li>
                            <li><Link href="/category/accessories">Accessories</Link></li>
                            <li><Link href="/category/digital">Digital</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold text-gray-700">Support</h3>
                        <ul className="space-y-1 text-gray-600">
                            <li><Link href="#">Features</Link></li>
                            <li><Link href="#">Pricing</Link></li>
                            <li><Link href="#">Contact Us</Link></li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Footer Bottom Section (Copyright on Left, Socials on Right) */}
            <div className="container mx-auto px-6 mt-8 flex justify-center items-center text-gray-500 text-sm" style={{ gap: '47rem' }}>
                <div>© 2024 Your Next Store | Delightful commerce for everyone</div>
                <div className="flex gap-4">
                    <span>@zaiste</span>
                    <span>@typeofweb</span>
                </div>
            </div>
        </footer>
    );
}
