"use client";

import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion"; // ✅ animation library
import AuthModal from "@/components/AuthModal";

export default function Header() {
  const { user, logout, isAuthenticated } = useAuth();
  const router = useRouter();

  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authTab, setAuthTab] = useState<"signin" | "register">("signin");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const currencyRef = useRef<HTMLDivElement>(null);
  const languageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (currencyRef.current && !currencyRef.current.contains(event.target as Node)) {
        setShowCurrencyDropdown(false);
      }
      if (languageRef.current && !languageRef.current.contains(event.target as Node)) {
        setShowLanguageDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isAuthenticated && user) {
      setIsAuthModalOpen(false);
      router.push("/profile");
    }
  }, [isAuthenticated, user, router]);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const toggleCurrencyDropdown = () => {
    setShowCurrencyDropdown(!showCurrencyDropdown);
    setShowLanguageDropdown(false);
  };

  const toggleLanguageDropdown = () => {
    setShowLanguageDropdown(!showLanguageDropdown);
    setShowCurrencyDropdown(false);
  };

  return (
    <>
      <header className="bg-white shadow-sm border-b w-full z-50 relative">
        <div className="w-full px-4 lg:px-6">
          <div className="flex justify-between items-center h-14 sm:h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <span className="text-xl sm:text-2xl font-bold text-blue-600">Ezzifly</span>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-gray-700 hover:text-blue-600 transition"
            >
              {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-4">
              {/* Flag */}
              <div className="flex items-center">
                <div className="w-6 h-6 rounded-full overflow-hidden border border-gray-200 flex">
                  <div className="w-1/3 bg-green-600"></div>
                  <div className="w-1/3 bg-white"></div>
                  <div className="w-1/3 bg-green-600"></div>
                </div>
              </div>

              {/* Language Dropdown */}
              <div className="relative" ref={languageRef}>
                <button
                  onClick={toggleLanguageDropdown}
                  className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition p-2"
                >
                  <span className="text-sm font-medium">EN</span>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {showLanguageDropdown && (
                  <div className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                    <div className="py-1">
                      {["English (EN)", "French (FR)", "Spanish (ES)"].map((lang) => (
                        <button
                          key={lang}
                          onClick={() => setShowLanguageDropdown(false)}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          {lang}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Currency Dropdown */}
              <div className="relative" ref={currencyRef}>
                <button
                  onClick={toggleCurrencyDropdown}
                  className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition p-2"
                >
                  <span className="text-sm font-medium">NGN</span>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {showCurrencyDropdown && (
                  <div className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                    <div className="py-1">
                      {["NGN", "USD", "EUR"].map((cur) => (
                        <button
                          key={cur}
                          onClick={() => setShowCurrencyDropdown(false)}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          {cur}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Auth Buttons */}
              {user ? (
                <div className="flex items-center space-x-3">
                  <Link href="/profile" className="text-gray-700 hover:text-blue-600 text-sm">
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-gray-700 hover:text-blue-600 text-sm"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setAuthTab("signin");
                    setIsAuthModalOpen(true);
                  }}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition text-sm"
                >
                  Sign In or Register
                </button>
              )}
            </nav>
          </div>

          {/* ✅ Animated Mobile Menu */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
                className="lg:hidden flex flex-col items-start space-y-3 mt-3 border-t border-gray-200 pt-3 bg-white"
              >
                {user ? (
                  <>
                    <Link
                      href="/profile"
                      onClick={() => setIsMenuOpen(false)}
                      className="text-gray-700 hover:text-blue-600 text-sm"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                      className="text-gray-700 hover:text-blue-600 text-sm"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => {
                      setAuthTab("signin");
                      setIsAuthModalOpen(true);
                      setIsMenuOpen(false);
                    }}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition text-sm w-full text-left"
                  >
                    Sign In or Register
                  </button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* Auth Modal */}
      {isAuthModalOpen && (
        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
          defaultTab={authTab}
        />
      )}
    </>
  );
}
