import { Facebook, Instagram, Twitter, Mail, Phone } from "lucide-react";

interface FooterProps {
  onAuthClick?: (tab?: "signin" | "register") => void;
}

export default function Footer({ onAuthClick }: FooterProps) {
  return (
    <footer className="bg-[#0b2239] text-gray-300 py-10 px-6 md:px-20 mt-20">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8">
        {/* Company */}
        <div>
          <h3 className="text-white font-semibold mb-3">Company</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-white transition">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition">
                FAQ
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition">
                Contact Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition">
                Company Details
              </a>
            </li>
          </ul>
        </div>

        {/* Policy */}
        <div>
          <h3 className="text-white font-semibold mb-3">Our Policy</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-white transition">
                Terms and Conditions
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition">
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>

        {/* Socials */}
        <div>
          <h3 className="text-white font-semibold mb-3">Socials</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <Facebook size={16} /> Ezzifly
            </li>
            <li className="flex items-center gap-2">
              <Instagram size={16} /> Ezzifly
            </li>
            <li className="flex items-center gap-2">
              <Twitter size={16} /> Ezzifly
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} /> ezziflywhutug@gmail.com
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} /> 09030382130
            </li>
          </ul>
        </div>

        {/* Account */}
        <div>
          <h3 className="text-white font-semibold mb-3">Account</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <button
                onClick={() => onAuthClick?.("register")}
                className="hover:text-white transition cursor-pointer"
              >
                Register
              </button>
            </li>
            <li>
              <button
                onClick={() => onAuthClick?.("signin")}
                className="hover:text-white transition cursor-pointer"
              >
                Sign In
              </button>
            </li>
          </ul>
        </div>

        {/* Logo */}
        <div className="flex flex-col items-center lg:items-end">
          <img src="/logo.png" alt="Ezzifly Logo" className="w-28 mb-3" />
        </div>
      </div>

      <hr className="border-gray-600 my-6" />

      <p className="text-center text-xs text-gray-400">
        Copyright © 2025 <span className="text-white font-semibold">Ezzifly</span>. All Rights Reserved
      </p>
    </footer>
  );
}