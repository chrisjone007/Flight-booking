"use client";

import { useState } from "react";
import { User } from "@/types";

interface ProfileDetailsFormProps {
  user: User | null;
}

export default function ProfileDetailsForm({ user }: ProfileDetailsFormProps) {
  const [formData, setFormData] = useState({
    // Use optional chaining with fallback empty strings
    title: (user as any)?.title || "",
    firstName: user?.firstName || "",
    middleName: (user as any)?.middleName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phone: user?.phone || "",
    gender: (user as any)?.gender || "",
    dob: (user as any)?.dob || user?.dateOfBirth || "", // Map dateOfBirth to dob
    nationality: (user as any)?.nationality || "",
    passportCountry: (user as any)?.passportCountry || "",
    passportNumber: (user as any)?.passportNumber || "",
    passportIssueDate: (user as any)?.passportIssueDate || "",
    passportExpiryDate: (user as any)?.passportExpiryDate || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Updated user profile:", formData);
    // TODO: integrate with API
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div>
        <label className="block text-sm text-gray-800 md:text-gray-600">Title</label>
        <select 
          name="title" 
          value={formData.title} 
          onChange={handleChange} 
          className="w-full border rounded-lg p-2.5 mt-1 text-gray-900"
        >
          <option value="">Select Title</option>
          <option value="Mr">Mr</option>
          <option value="Mrs">Mrs</option>
          <option value="Miss">Miss</option>
          <option value="Ms">Ms</option>
          <option value="Dr">Dr</option>
        </select>
      </div>

      <div>
        <label className="block text-sm text-gray-800 md:text-gray-600">Last Name</label>
        <input 
          name="lastName" 
          value={formData.lastName} 
          onChange={handleChange} 
          className="w-full border rounded-lg p-2.5 mt-1 text-gray-900" 
        />
      </div>

      <div>
        <label className="block text-sm text-gray-800 md:text-gray-600">First Name</label>
        <input 
          name="firstName" 
          value={formData.firstName} 
          onChange={handleChange} 
          className="w-full border rounded-lg p-2.5 mt-1 text-gray-900" 
        />
      </div>

      <div>
        <label className="block text-sm text-gray-800 md:text-gray-600">Middle Name</label>
        <input 
          name="middleName" 
          value={formData.middleName} 
          onChange={handleChange} 
          className="w-full border rounded-lg p-2.5 mt-1 text-gray-900" 
        />
      </div>

      <div>
        <label className="block text-sm text-gray-800 md:text-gray-600">Email Address</label>
        <input 
          type="email" 
          name="email" 
          value={formData.email} 
          disabled 
          className="w-full border rounded-lg p-2.5 mt-1 bg-gray-100 text-gray-900" 
        />
      </div>

      <div>
        <label className="block text-sm text-gray-800 md:text-gray-600">Phone Number</label>
        <input 
          name="phone" 
          value={formData.phone} 
          onChange={handleChange} 
          className="w-full border rounded-lg p-2.5 mt-1 text-gray-900" 
        />
      </div>

      <div>
        <label className="block text-sm text-gray-800 md:text-gray-600">Gender</label>
        <select 
          name="gender" 
          value={formData.gender} 
          onChange={handleChange} 
          className="w-full border rounded-lg p-2.5 mt-1 text-gray-900"
        >
          <option value="">Select</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
          <option value="Prefer not to say">Prefer not to say</option>
        </select>
      </div>

      <div>
        <label className="block text-sm text-gray-800 md:text-gray-600">Date of Birth</label>
        <input 
          type="date" 
          name="dob" 
          value={formData.dob} 
          onChange={handleChange} 
          className="w-full border rounded-lg p-2.5 mt-1 text-gray-900" 
        />
      </div>

      <div>
        <label className="block text-sm text-gray-800 md:text-gray-600">Nationality</label>
        <input 
          name="nationality" 
          value={formData.nationality} 
          onChange={handleChange} 
          className="w-full border rounded-lg p-2.5 mt-1 text-gray-900" 
        />
      </div>

      <div>
        <label className="block text-sm text-gray-800 md:text-gray-600">Passport Issuing Country</label>
        <input 
          name="passportCountry" 
          value={formData.passportCountry} 
          onChange={handleChange} 
          className="w-full border rounded-lg p-2.5 mt-1 text-gray-900" 
        />
      </div>

      <div>
        <label className="block text-sm text-gray-800 md:text-gray-600">Passport Number</label>
        <input 
          name="passportNumber" 
          value={formData.passportNumber} 
          onChange={handleChange} 
          className="w-full border rounded-lg p-2.5 mt-1 text-gray-900" 
        />
      </div>

      <div>
        <label className="block text-sm text-gray-800 md:text-gray-600">Passport Issue Date</label>
        <input 
          type="date" 
          name="passportIssueDate" 
          value={formData.passportIssueDate} 
          onChange={handleChange} 
          className="w-full border rounded-lg p-2.5 mt-1 text-gray-900" 
        />
      </div>

      <div>
        <label className="block text-sm text-gray-800 md:text-gray-600">Passport Expiry Date</label>
        <input 
          type="date" 
          name="passportExpiryDate" 
          value={formData.passportExpiryDate} 
          onChange={handleChange} 
          className="w-full border rounded-lg p-2.5 mt-1 text-gray-900" 
        />
      </div>

      <div className="md:col-span-2 flex justify-center mt-6">
        <button 
          type="submit" 
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition"
        >
          Update Changes
        </button>
      </div>
    </form>
  );
}