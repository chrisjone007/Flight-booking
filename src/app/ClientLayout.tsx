"use client";

import { AuthProvider } from "@/contexts/AuthContext";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useState } from "react";
import AuthModal from "@/components/AuthModal";
import WhyEzzifly from "@/components/WhyEzzifly";
import AboutFly from "@/components/AboutFly";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const openAuthModal = () => {
    setIsAuthOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthOpen(false);
  };

  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow w-full">
          {children}
          <WhyEzzifly />
          <AboutFly />
        </main>
        <Footer />
        <AuthModal isOpen={isAuthOpen} onClose={closeAuthModal} />
      </div>
    </AuthProvider>
  );
}