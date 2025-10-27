"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import Image from "next/image";
import ProfileSidebar from "@/components/ProfileSidebar";
import ProfileDetailsForm from "@/components/ProfileDetailsForm";
import SavedTravelers from "@/components/SavedTravelers";
import BookingHistory from "@/components/BookingHistory";
import PaymentMethods from "@/components/PaymentMethods";
import Notifications from "@/components/Notifications";
import Preferences from "@/components/Preferences";

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("personal-details");

  useEffect(() => {
    if (!loading && !user) router.push("/");
  }, [user, loading, router]);

  if (loading) return <div className="text-center py-20">Loading...</div>;

  const renderContent = () => {
    switch (activeTab) {
      case "personal-details":
        return <ProfileDetailsForm user={user} />;
      case "saved-travelers":
        return <SavedTravelers />;
      case "booking-history":
        return <BookingHistory />;
      case "payment-methods":
        return <PaymentMethods />;
      case "notifications":
        return <Notifications />;
      case "preferences":
        return <Preferences />;
      default:
        return <ProfileDetailsForm user={user} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ===== Top Bar ===== */}
      <div className="bg-white shadow-sm px-6 py-3 flex justify-between items-center border-b">
        <div className="flex items-center gap-2">
          {/* <Image
            src="/logo.png"
            alt="Ezalify Logo"
            width={120}
            height={40}
            className="object-contain"
          /> */}
          {/* <h2>Ezzifly</h2> */}
        </div>

        {/* Avatar + Name */}
        <div className="flex items-center gap-3">
          <span className="hidden sm:block text-gray-700 font-medium">
            {user?.firstName} {user?.lastName}
          </span>
          <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-gray-300">
            <Image
                src={(user as any)?.avatar || "/images/avatar.png"}
                alt="User Avatar"
                fill
                className="object-cover"
                />
          </div>
        </div>
      </div>

      {/* ===== Main Section ===== */}
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6 py-10 px-4">
        <ProfileSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        <div className="flex-1 bg-white shadow-md rounded-2xl p-8">
          <h1 className="text-lg font-semibold text-gray-700 border-b pb-3 mb-6 capitalize">
            {activeTab.replace("-", " ")}
          </h1>
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
