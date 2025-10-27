"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhyEzzifly from "@/components/WhyEzzifly";
import AboutFly from "@/components/AboutFly";
import { AuthProvider } from "@/contexts/AuthContext";
import AuthModal from "@/components/AuthModal";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const openAuthModal = () => setIsAuthOpen(true);
  const closeAuthModal = () => setIsAuthOpen(false);

  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col">
        <Header onAuthClick={openAuthModal} />
        <main className="flex-grow w-full">
          {children}
          <WhyEzzifly />
          <AboutFly />
        </main>
        <Footer onAuthClick={openAuthModal} />
        <AuthModal isOpen={isAuthOpen} onClose={closeAuthModal} />
      </div>
    </AuthProvider>
  );
}
