// app/layout.tsx
"use client";

import { AuthProvider } from '@/contexts/AuthContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AuthModal from '@/components/AuthModal';
import { useState } from 'react';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<"signin" | "register">("signin");

  const handleAuthClick = (tab?: "signin" | "register") => {
    if (tab) {
      setAuthModalTab(tab);
    }
    setIsAuthModalOpen(true);
  };

  const handleCloseAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <AuthProvider>
          <Header onAuthClick={handleAuthClick} />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
          <AuthModal 
            isOpen={isAuthModalOpen} 
            onClose={handleCloseAuthModal}
            defaultTab={authModalTab}
          />
        </AuthProvider>
      </body>
    </html>
  );
}