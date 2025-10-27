"use client";

import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AuthModal from "@/components/AuthModal";

// Make onAuthClick optional to fix the build error
interface HeaderProps {
  onAuthClick?: (tab?: "signin" | "register") => void;
}

export default function Header({ onAuthClick }: HeaderProps) {
  const { user, logout, isAuthenticated } = useAuth();
  const router = useRouter();

  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authTab, setAuthTab] = useState<"signin" | "register">("signin");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const currencyRef = useRef<HTMLDivElement>(null);
  const languageRef = useRef<HTMLDivElement>(null);

  // Handle auth click - use prop if provided, otherwise use internal state
  const handleAuthClick = (tab?: "signin" | "register") => {
    if (onAuthClick) {
      onAuthClick(tab);
    } else {
      setAuthTab(tab || "signin");
      setIsAuthModalOpen(true);
    }
  };

  // Handle scroll effect for header background
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 10);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle clicks outside dropdowns
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

  // Redirect to profile after login/register
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

  // Fixed animation variants with proper TypeScript types
  const headerVariants = {
    initial: { 
      y: -100, 
      opacity: 0 
    },
    animate: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 30
      }
    },
    scrolled: {
      backgroundColor: "rgba(255, 255, 255, 0.95)",
      backdropFilter: "blur(10px)",
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
      transition: {
        duration: 0.3,
        ease: "easeOut" as const
      }
    }
  };

  const dropdownVariants = {
    closed: {
      opacity: 0,
      y: -10,
      scale: 0.95,
      transition: {
        duration: 0.15,
        ease: "easeIn" as const
      }
    },
    open: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 400,
        damping: 25
      }
    }
  };

  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.2,
        ease: "easeIn" as const
      }
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 400,
        damping: 30
      }
    }
  };

  const mobileItemVariants = {
    closed: { x: -20, opacity: 0 },
    open: (i: number) => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        type: "spring" as const,
        stiffness: 400
      }
    })
  };

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 bg-white shadow-sm border-b w-full z-[9999]"
        variants={headerVariants}
        initial="initial"
        animate={isScrolled ? ["animate", "scrolled"] : "animate"}
      >
        <div className="w-full px-4 lg:px-6">
          <div className="flex justify-between items-center h-14 sm:h-16">
            {/* Logo with hover animation */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/" className="flex items-center">
                <span className="text-xl sm:text-2xl font-bold text-blue-600">Ezzifly</span>
              </Link>
            </motion.div>

            {/* Mobile Menu Button with animation */}
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-gray-700 hover:text-blue-600 transition"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </motion.button>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-4">
              {/* Country Flag with hover effect */}
              <motion.div 
                className="flex items-center"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <div className="w-6 h-6 rounded-full overflow-hidden border border-gray-200 flex">
                  <div className="w-1/3 bg-green-600"></div>
                  <div className="w-1/3 bg-white"></div>
                  <div className="w-1/3 bg-green-600"></div>
                </div>
              </motion.div>

              {/* Language Dropdown */}
              <div className="relative" ref={languageRef}>
                <motion.button
                  onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                  className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition p-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-sm font-medium">EN</span>
                  <motion.svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    animate={{ rotate: showLanguageDropdown ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </motion.svg>
                </motion.button>

                <AnimatePresence>
                  {showLanguageDropdown && (
                    <motion.div
                      variants={dropdownVariants}
                      initial="closed"
                      animate="open"
                      exit="closed"
                      className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg border border-gray-200 z-50"
                    >
                      <div className="py-1">
                        {["English (EN)", "French (FR)", "Spanish (ES)"].map((lang) => (
                          <motion.button
                            key={lang}
                            onClick={() => setShowLanguageDropdown(false)}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            whileHover={{ x: 4 }}
                            transition={{ type: "spring", stiffness: 400 }}
                          >
                            {lang}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Currency Dropdown */}
              <div className="relative" ref={currencyRef}>
                <motion.button
                  onClick={() => setShowCurrencyDropdown(!showCurrencyDropdown)}
                  className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition p-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-sm font-medium">NGN</span>
                  <motion.svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    animate={{ rotate: showCurrencyDropdown ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </motion.svg>
                </motion.button>

                <AnimatePresence>
                  {showCurrencyDropdown && (
                    <motion.div
                      variants={dropdownVariants}
                      initial="closed"
                      animate="open"
                      exit="closed"
                      className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg border border-gray-200 z-50"
                    >
                      <div className="py-1">
                        {["NGN", "USD", "EUR"].map((cur) => (
                          <motion.button
                            key={cur}
                            onClick={() => setShowCurrencyDropdown(false)}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            whileHover={{ x: 4 }}
                            transition={{ type: "spring", stiffness: 400 }}
                          >
                            {cur}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Auth Buttons */}
              {user ? (
                <div className="flex items-center space-x-3">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link href="/profile" className="text-gray-700 hover:text-blue-600 text-sm">
                      Profile
                    </Link>
                  </motion.div>
                  <motion.button
                    onClick={handleLogout}
                    className="text-gray-700 hover:text-blue-600 text-sm"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Logout
                  </motion.button>
                </div>
              ) : (
                <motion.button
                  onClick={() => handleAuthClick("signin")}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition text-sm"
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 4px 12px rgba(37, 99, 235, 0.3)"
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  Sign In or Register
                </motion.button>
              )}
            </nav>
          </div>

          {/*Enhanced Mobile Menu with ALL Navigation Items */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                variants={mobileMenuVariants}
                initial="closed"
                animate="open"
                exit="closed"
                className="lg:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-sm border-t border-gray-200 shadow-lg z-[9999]"
              >
                <div className="px-4 py-4 space-y-4">
                  {/* Country Flag Section */}
                  <motion.div 
                    className="flex items-center space-x-3 py-2"
                    variants={mobileItemVariants}
                    custom={0}
                    initial="closed"
                    animate="open"
                  >
                    <div className="w-6 h-6 rounded-full overflow-hidden border border-gray-200 flex">
                      <div className="w-1/3 bg-green-600"></div>
                      <div className="w-1/3 bg-white"></div>
                      <div className="w-1/3 bg-green-600"></div>
                    </div>
                    <span className="text-sm text-gray-700">Nigeria</span>
                  </motion.div>

                  {/* Language Selection */}
                  <motion.div 
                    className="space-y-2"
                    variants={mobileItemVariants}
                    custom={1}
                    initial="closed"
                    animate="open"
                  >
                    <h3 className="text-sm font-medium text-gray-900">Language</h3>
                    <div className="space-y-1">
                      {["English (EN)", "French (FR)", "Spanish (ES)"].map((lang, index) => (
                        <motion.button
                          key={lang}
                          onClick={() => setIsMenuOpen(false)}
                          className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition"
                          whileHover={{ x: 4 }}
                          transition={{ type: "spring", stiffness: 400 }}
                        >
                          {lang}
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>

                  {/* Currency Selection */}
                  <motion.div 
                    className="space-y-2"
                    variants={mobileItemVariants}
                    custom={2}
                    initial="closed"
                    animate="open"
                  >
                    <h3 className="text-sm font-medium text-gray-900">Currency</h3>
                    <div className="space-y-1">
                      {["NGN - Nigerian Naira", "USD - US Dollar", "EUR - Euro"].map((currency, index) => (
                        <motion.button
                          key={currency}
                          onClick={() => setIsMenuOpen(false)}
                          className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition"
                          whileHover={{ x: 4 }}
                          transition={{ type: "spring", stiffness: 400 }}
                        >
                          {currency}
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>

                  {/* Divider */}
                  <motion.div 
                    className="border-t border-gray-200 pt-4"
                    variants={mobileItemVariants}
                    custom={3}
                    initial="closed"
                    animate="open"
                  />

                  {/* Authentication Section */}
                  <motion.div 
                    className="pt-2"
                    variants={mobileItemVariants}
                    custom={4}
                    initial="closed"
                    animate="open"
                  >
                    {user ? (
                      <div className="space-y-2">
                        <motion.div
                          whileHover={{ x: 8 }}
                          transition={{ type: "spring", stiffness: 400 }}
                        >
                          <Link
                            href="/profile"
                            onClick={() => setIsMenuOpen(false)}
                            className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition"
                          >
                            👤 My Profile
                          </Link>
                        </motion.div>
                        <motion.button
                          onClick={() => {
                            handleLogout();
                            setIsMenuOpen(false);
                          }}
                          className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition"
                          whileHover={{ x: 8 }}
                          transition={{ type: "spring", stiffness: 400 }}
                        >
                          🚪 Logout
                        </motion.button>
                      </div>
                    ) : (
                      <motion.button
                        onClick={() => handleAuthClick("signin")}
                        className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-blue-700 transition text-sm text-center"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        🔐 Sign In or Register
                      </motion.button>
                    )}
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.header>

      {/* Add padding to the top of your main content to account for fixed header */}
      <div className="h-14 sm:h-16"></div>

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