import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-5">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Brand */}
        <div>
          <h3 className="text-2xl font-bold mb-2">CareerAI</h3>
          <p className="text-sm text-gray-300">
            Empowering engineering students with AI-driven career solutions.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold mb-1">Quick Links</h4>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li><a href="#" className="hover:text-white">Home</a></li>
            <li><a href="#" className="hover:text-white">About</a></li>
            <li><a href="#" className="hover:text-white">Services</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-lg font-semibold mb-2">Contact Us</h4>
          <p className="text-sm text-gray-300">
            Email: support@careerguideai.com <br />
            Phone: +91 98765 43210
          </p>
        </div>

      </div>

      <div className="mt-2 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} CareerAI. All rights reserved.
      </div>
    </footer>
  );
}
