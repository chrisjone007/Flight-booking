"use client";

import { User, Plane, CreditCard, Bell, Settings, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

interface Props {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const navItems = [
  { id: "personal-details", label: "Personal Details", icon: User },
  { id: "saved-travelers", label: "Saved Travelers", icon: Plane },
  { id: "booking-history", label: "Booking History", icon: Plane },
  { id: "payment-methods", label: "Payment Methods", icon: CreditCard },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "preferences", label: "Preferences", icon: Settings },
];

export default function ProfileSidebar({ activeTab, setActiveTab }: Props) {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/"); // Redirect to main page after logout
    } catch (error) {
      console.error("Logout failed:", error);
      // You can also show a toast notification here
      alert("Logout failed. Please try again.");
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 w-full lg:w-64">
      <h2 className="text-sm text-gray-500 font-semibold uppercase mb-4">
        Account Details
      </h2>

      <nav className="space-y-2">
        {navItems.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex items-center w-full px-3 py-2 rounded-lg text-sm font-medium transition
              ${
                activeTab === id
                  ? "bg-red-100 text-red-600"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
          >
            <Icon className="w-4 h-4 mr-2" />
            {label}
          </button>
        ))}

        {/* Logout Button */}
        <button 
          onClick={handleLogout}
          className="flex items-center w-full px-3 py-2 mt-4 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Log Out
        </button>
      </nav>
    </div>
  );
}