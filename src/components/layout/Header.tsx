"use client";

import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import AuthModal from "@/components/AuthModal"; // ✅ Import your AuthModal

export default function Header() {
  const { user, logout, isAuthenticated } = useAuth();
  const router = useRouter();

  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false); // ✅ controls modal visibility
  const [authTab, setAuthTab] = useState<"signin" | "register">("signin");

  const currencyRef = useRef<HTMLDivElement>(null);
  const languageRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
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

  // Redirect to profile page after login/register
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
      <header className="bg-white shadow-sm border-b w-full">
        <div className="w-full px-3 sm:px-4 lg:px-6">
          <div className="flex justify-between items-center h-14 sm:h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <span className="text-xl sm:text-2xl font-bold text-blue-600">Ezzifly</span>
            </Link>

            {/* Navigation */}
            <nav className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4">
              {/* Help Icon */}
              <button className="p-1.5 sm:p-2 text-gray-600 hover:text-blue-600 transition duration-300 hidden xs:block">
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3
                    0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994
                    1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </button>

              {/* Nigeria Flag */}
              <div className="flex items-center">
                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full overflow-hidden border border-gray-200 flex">
                  <div className="w-1/3 bg-green-600"></div>
                  <div className="w-1/3 bg-white"></div>
                  <div className="w-1/3 bg-green-600"></div>
                </div>
              </div>

              {/* Language Dropdown */}
              <div className="relative" ref={languageRef}>
                <button
                  onClick={toggleLanguageDropdown}
                  className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition duration-300 p-1.5 sm:p-2"
                >
                  <span className="text-xs sm:text-sm font-medium">EN</span>
                  <svg
                    className="w-3 h-3 sm:w-4 sm:h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {showLanguageDropdown && (
                  <div className="absolute right-0 mt-2 w-28 sm:w-32 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                    <div className="py-1">
                      {["English (EN)", "French (FR)", "Spanish (ES)"].map((lang) => (
                        <button
                          key={lang}
                          onClick={() => setShowLanguageDropdown(false)}
                          className="block w-full text-left px-3 sm:px-4 py-2 text-xs sm:text-sm text-gray-700 hover:bg-gray-100"
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
                  className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition duration-300 p-1.5 sm:p-2"
                >
                  <span className="text-xs sm:text-sm font-medium">NGN</span>
                  <svg
                    className="w-3 h-3 sm:w-4 sm:h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {showCurrencyDropdown && (
                  <div className="absolute right-0 mt-2 w-28 sm:w-32 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                    <div className="py-1">
                      {["NGN", "USD", "EUR"].map((cur) => (
                        <button
                          key={cur}
                          onClick={() => setShowCurrencyDropdown(false)}
                          className="block w-full text-left px-3 sm:px-4 py-2 text-xs sm:text-sm text-gray-700 hover:bg-gray-100"
                        >
                          {cur}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Divider */}
              <div className="h-4 sm:h-6 w-px bg-gray-300 hidden xs:block"></div>

              {/* Authentication */}
              {user ? (
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <Link
                    href="/profile"
                    className="text-gray-700 hover:text-blue-600 text-xs sm:text-sm"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-gray-700 hover:text-blue-600 text-xs sm:text-sm"
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
                  className="bg-blue-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg font-medium hover:bg-blue-700 transition duration-300 text-xs sm:text-sm"
                >
                  Sign In or Register
                </button>
              )}
            </nav>
          </div>
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
