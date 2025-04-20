import { useState } from "react";
import { Menu, X } from "lucide-react"; 

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <h1 className="flex-shrink-0 flex items-center text-3xl font-bold text-black">
            CareerGuide.AI
          </h1>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-gray-700 hover:text-indigo-600">
              Home
            </a>
            <a href="#" className="text-gray-700 hover:text-indigo-600">
              About
            </a>
            <a href="#" className="text-gray-700 hover:text-indigo-600">
              Services
            </a>
            <a href="#" className="text-gray-700 hover:text-indigo-600">
              Contact
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-indigo-600 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white px-4 pb-4">
          <a href="#" className="block py-2 text-gray-700 hover:text-indigo-600">
            Home
          </a>
          <a href="#" className="block py-2 text-gray-700 hover:text-indigo-600">
            About
          </a>
          <a href="#" className="block py-2 text-gray-700 hover:text-indigo-600">
            Services
          </a>
          <a href="#" className="block py-2 text-gray-700 hover:text-indigo-600">
            Contact
          </a>
        </div>
      )}
    </nav>
  );
}
