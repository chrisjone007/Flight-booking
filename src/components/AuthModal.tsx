// components/AuthModal.tsx - FIXED TEXT COLORS FOR MOBILE
"use client";

import { useState, useEffect } from "react";
import { X, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import {
  checkUserExists,
  sendVerificationCode,
  verifyCode,
} from "@/lib/api";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: "signin" | "register";
}

export default function AuthModal({ isOpen, onClose, defaultTab = "signin" }: AuthModalProps) {
  const { login, register } = useAuth();
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loading, setLoading] = useState(false);
  const [isExistingUser, setIsExistingUser] = useState(false);
  const [error, setError] = useState("");

  // Reset form when modal opens/closes or defaultTab changes
  useEffect(() => {
    if (isOpen) {
      if (defaultTab === "register") {
        // Start with email entry for registration
        setStep(1);
        setIsExistingUser(false);
      } else {
        // Start with email entry for signin
        setStep(1);
      }
      setEmail("");
      setCode("");
      setPassword("");
      setFirstName("");
      setLastName("");
      setError("");
    }
  }, [isOpen, defaultTab]);

  const handleClose = () => {
    setStep(1);
    setEmail("");
    setCode("");
    setPassword("");
    setFirstName("");
    setLastName("");
    setLoading(false);
    setIsExistingUser(false);
    setError("");
    onClose();
  };

  if (!isOpen) return null;

  const handleBack = () => {
    if (step === 2 || step === 3 || step === 4) {
      setStep(1);
      setCode("");
      setPassword("");
      setFirstName("");
      setLastName("");
      setError("");
    }
  };

  // Step 1: Enter email
  const handleEmailContinue = async () => {
    if (!email) return alert("Please enter your email.");
    
    setLoading(true);
    setError("");
    try {
      console.log('Starting user check for:', email);
      const existsResponse = await checkUserExists(email);
      console.log('User exists response:', existsResponse);

      if (existsResponse.exists) {
        setIsExistingUser(true);
        setStep(2); // Existing user → Sign In
        console.log('Redirecting to Sign In');
      } else {
        setIsExistingUser(false);
        console.log('Sending verification code...');
        await sendVerificationCode(email);
        alert("OTP sent to your email! (Use any code for demo)");
        setStep(3); // New user → Verify OTP
        console.log('Redirecting to OTP Verification');
      }
    } catch (err: any) {
      console.error('Error in handleEmailContinue:', err);
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Sign In (existing users)
  const handleLogin = async () => {
    if (!password) return alert("Enter your password.");
    
    setLoading(true);
    setError("");
    try {
      await login({ email, password });
      alert("Signed in successfully!");
      handleClose();
    } catch (err: any) {
      setError(err.message || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  // Step 3: Verify OTP (new users)
  const handleVerifyCode = async () => {
    if (!code) return alert("Enter your OTP.");
    
    setLoading(true);
    setError("");
    try {
      await verifyCode(email, code);
      setStep(4); // Move to registration form after OTP verification
    } catch (err: any) {
      setError(err.message || "Invalid or expired OTP.");
    } finally {
      setLoading(false);
    }
  };

  // Step 4: Personal Info (new users)
  const handleRegister = async () => {
    if (!firstName || !lastName || !password) {
      return alert("Please fill in all fields.");
    }
    
    setLoading(true);
    setError("");
    try {
      await register({ email, firstName, lastName, password });
      alert("Registration successful!");
      handleClose();
    } catch (err: any) {
      setError(err.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const renderBackButton = () => (
    <button
      onClick={handleBack}
      className="flex items-center gap-2 text-gray-800 md:text-gray-600 hover:text-gray-900 mb-4 transition duration-200"
    >
      <ArrowLeft size={16} />
      Back
    </button>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-2xl shadow-xl w-[90%] max-w-md p-6 relative"
      >
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 text-gray-600 hover:text-gray-900 transition duration-200"
        >
          <X size={20} />
        </button>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800 text-sm">{error}</p>
          </div>
        )}

        <AnimatePresence mode="wait">
          {/* STEP 1 — Email */}
          {step === 1 && (
            <motion.div
              key="email-step"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <h2 className="text-lg font-semibold mb-2 text-gray-900">
                {defaultTab === "register" ? "Create Your Account" : "Sign in or Register"}
              </h2>
              <p className="text-sm text-gray-800 md:text-gray-600 mb-4">
                {defaultTab === "register" 
                  ? "Start by entering your email address" 
                  : "Manage your flight bookings easily with Ezzifly."
                }
              </p>
              
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleEmailContinue()}
              />
              
              <button
                onClick={handleEmailContinue}
                disabled={loading}
                className="w-full bg-red-600 hover:bg-red-700 text-white rounded-lg py-2 mb-3 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Checking..." : "Continue"}
              </button>

              {defaultTab === "signin" && (
                <>
                  <div className="relative my-4">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white text-gray-700">Or continue with</span>
                    </div>
                  </div>

                  <button className="w-full border border-gray-300 rounded-lg py-2 text-gray-800 hover:bg-gray-50 flex items-center justify-center gap-2 transition duration-200">
                    <img
                      src="/images/Google-icon.png"
                      alt="Google"
                      className="w-5 h-5"
                    />
                    Continue with Google
                  </button>
                </>
              )}
            </motion.div>
          )}

          {/* STEP 2 — Sign In */}
          {step === 2 && (
            <motion.div
              key="signin-step"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              {renderBackButton()}
              
              <h2 className="text-lg font-semibold mb-2 text-gray-900">
                Welcome Back
              </h2>
              <p className="text-sm text-gray-800 md:text-gray-600 mb-4">
                Enter your password to sign in as <strong className="text-gray-900">{email}</strong>
              </p>
              
              <input
                type="password"
                placeholder="Password"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
              />
              
              <button
                onClick={handleLogin}
                disabled={loading}
                className="w-full bg-red-600 hover:bg-red-700 text-white rounded-lg py-2 mb-3 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Signing In..." : "Sign In"}
              </button>

              <div className="text-center">
                <button
                  className="text-sm text-blue-700 hover:underline transition duration-200"
                  onClick={() => alert("Forgot password flow coming soon")}
                >
                  Forgot password?
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 3 — Verify OTP */}
          {step === 3 && (
            <motion.div
              key="verify-step"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              {renderBackButton()}
              
              <h2 className="text-lg font-semibold mb-2 text-gray-900">
                Verify Your Email
              </h2>
              <p className="text-sm text-gray-800 md:text-gray-600 mb-4">
                We sent an OTP to <strong className="text-gray-900">{email}</strong>
              </p>
              
              <input
                type="text"
                placeholder="Enter OTP from email"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleVerifyCode()}
              />
              
              <button
                onClick={handleVerifyCode}
                disabled={loading}
                className="w-full bg-red-600 hover:bg-red-700 text-white rounded-lg py-2 mb-3 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </button>

              <div className="text-center">
                <button
                  className="text-sm text-blue-700 hover:underline transition duration-200"
                  onClick={() => {
                    sendVerificationCode(email);
                    alert("OTP resent!");
                  }}
                >
                  Resend OTP
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 4 — Personal Info */}
          {step === 4 && (
            <motion.div
              key="personal-step"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              {renderBackButton()}
              
              <h2 className="text-lg font-semibold mb-2 text-gray-900">
                Complete Your Registration
              </h2>
              <p className="text-sm text-gray-800 md:text-gray-600 mb-4">
                Please fill in your details to create your account.
              </p>

              <input
                type="text"
                placeholder="First Name"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Last Name"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <input
                type="password"
                placeholder="Create Password"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button
                onClick={handleRegister}
                disabled={loading}
                className="w-full bg-red-600 hover:bg-red-700 text-white rounded-lg py-2 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Registering..." : "Create Account"}
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <p className="text-xs text-gray-700 md:text-gray-500 mt-4 text-center">
          By signing up, you accept the Ezzifly{" "}
          <span className="text-blue-700 cursor-pointer hover:underline">Terms of Service</span> and{" "}
          <span className="text-blue-700 cursor-pointer hover:underline">Privacy Policy</span>.
        </p>
      </motion.div>
    </div>
  );
}