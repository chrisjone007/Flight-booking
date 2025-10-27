"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "@/lib/api"; // ✅ Using real API

const RegisterPage = () => {
  const router = useRouter();

  // Form state - updated to match the API expected format
  const [formData, setFormData] = useState({
    firstName: "", // Changed from first_name
    lastName: "",  // Changed from last_name
    email: "",
    password: "",
    confirmPassword: "", // Changed from password_confirmation
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      // ✅ Call the real API function (registerUser)
      const result = await registerUser({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
      });

      if (result.success) {
        setSuccess(result.message || "Registration successful!");
        setTimeout(() => router.push("/auth/login"), 2000);
      }
    } catch (err: any) {
      setError(err.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <div className="w-full max-w-md bg-white shadow-md rounded-xl p-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Create Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              First Name
            </label>
            <input
              type="text"
              name="firstName" // Changed from first_name
              value={formData.firstName}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Last Name
            </label>
            <input
              type="text"
              name="lastName" // Changed from last_name
              value={formData.lastName}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword" // Changed from password_confirmation
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center mt-2">{error}</p>
          )}
          {success && (
            <p className="text-green-500 text-sm text-center mt-2">{success}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:bg-blue-400"
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>

          <p className="text-sm text-gray-600 text-center mt-4">
            Already have an account?{" "}
            <a href="/auth/login" className="text-blue-600 hover:underline">
              Sign in
            </a>
          </p>
        </form>
      </div>
    </section>
  );
};

export default RegisterPage;