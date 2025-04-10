"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image"; // Import Next.js Image component

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
      <header className="py-6 border-b border-gray-100">
        <div className="container-custom flex justify-between items-center">
          {/* Replace text with image from the public folder */}
          <Link href="/" className="flex items-center">
            <Image
                src="/logo.png"         // Ensure your image is located in the public folder
                alt="BizConMnA Logo"      // Provide an appropriate alternative text
                width={175}               // Adjust width as needed
                height={50}               // Adjust height as needed
                className="object-contain" // Additional styling if needed
            />
          </Link>

          {/* Mobile menu button */}
          <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              className="md:hidden"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
                href="/"
                className="text-gray-800 hover:text-blue-600 transition-colors font-medium"
            >
              Home
            </Link>
            <Link
                href="/blog/page/1"
                className="text-gray-800 hover:text-blue-600 transition-colors font-medium"
            >
              Blog
            </Link>
            <Link
                href="/about"
                className="text-gray-800 hover:text-blue-600 transition-colors font-medium"
            >
              About
            </Link>
            <Link
                href="/contact"
                className="text-gray-800 hover:text-blue-600 transition-colors font-medium"
            >
              Contact
            </Link>
          </nav>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
            <div className="md:hidden absolute z-50 left-0 right-0 bg-white border-b border-gray-100 shadow-lg">
              <nav className="container-custom py-4 flex flex-col space-y-4">
                <Link
                    href="/"
                    className="text-gray-800 hover:text-blue-600 transition-colors font-medium py-2"
                    onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                    href="/blog/page/1"
                    className="text-gray-800 hover:text-blue-600 transition-colors font-medium py-2"
                    onClick={() => setIsMenuOpen(false)}
                >
                  Blog
                </Link>
                <Link
                    href="/about"
                    className="text-gray-800 hover:text-blue-600 transition-colors font-medium py-2"
                    onClick={() => setIsMenuOpen(false)}
                >
                  About
                </Link>
                <Link
                    href="/contact"
                    className="text-gray-800 hover:text-blue-600 transition-colors font-medium py-2"
                    onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </Link>
              </nav>
            </div>
        )}
      </header>
  );
};

export default Header;
