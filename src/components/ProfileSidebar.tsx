"use client";

import { User, Plane, CreditCard, Bell, Settings, LogOut } from "lucide-react";

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

        <button className="flex items-center w-full px-3 py-2 mt-4 text-gray-600 hover:bg-gray-100 rounded-lg">
          <LogOut className="w-4 h-4 mr-2" />
          Log Out
        </button>
      </nav>
    </div>
  );
}
