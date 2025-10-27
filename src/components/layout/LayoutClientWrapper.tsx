"use client";

import { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import AuthModal from "@/components/AuthModal";

export default function LayoutClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authTab, setAuthTab] = useState<"signin" | "register">("signin");

  const openAuthModal = (tab?: "signin" | "register") => {
    setAuthTab(tab || "signin");
    setIsAuthModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header onAuthClick={openAuthModal} />
      
      <main className="flex-1">
        {children}
      </main>

      <Footer onAuthClick={openAuthModal} />

      {/* Auth Modal rendered globally */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        defaultTab={authTab}
      />
    </div>
  );
}