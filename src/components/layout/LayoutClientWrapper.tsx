"use client";

import { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import AuthModal from "@/components/AuthModal";
import WhyEzzifly from "@/components/WhyEzzifly";
import AboutFly from "@/components/AboutFly";

export default function LayoutClientWrapper({ children }: { children: React.ReactNode }) {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authTab, setAuthTab] = useState<"signin" | "register">("signin");

  // open modal and choose tab
  const openAuthModal = (tab?: "signin" | "register") => {
    setAuthTab(tab || "signin");
    setIsAuthOpen(true);
  };

  // close modal
  const closeAuthModal = () => {
    setIsAuthOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header receives modal trigger function */}
      <Header onAuthClick={openAuthModal} />

      <main className="flex-grow w-full">
        {children}
        <WhyEzzifly />
        <AboutFly />
      </main>

      <Footer onAuthClick={openAuthModal} />

      {/* Auth Modal rendered globally */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={closeAuthModal}
        defaultTab={authTab}
      />
    </div>
  );
}
