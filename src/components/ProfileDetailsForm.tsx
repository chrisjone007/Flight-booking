"use client";

import { useState } from "react";
import { User } from "@/types";

interface ProfileDetailsFormProps {
  user: User | null;
}

export default function ProfileDetailsForm({ user }: ProfileDetailsFormProps) {
  const [formData, setFormData] = useState({
    title: user?.title || "",
    firstName: user?.firstName || "",
    middleName: user?.middleName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phone: user?.phone || "",
    gender: user?.gender || "",
    dob: user?.dob || "",
    nationality: user?.nationality || "",
    passportCountry: user?.passportCountry || "",
    passportNumber: user?.passportNumber || "",
    passportIssueDate: user?.passportIssueDate || "",
    passportExpiryDate: user?.passportExpiryDate || "",
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
        <label className="block text-sm text-gray-600">Title</label>
        <input name="title" value={formData.title} onChange={handleChange} className="w-full border rounded-lg p-2.5 mt-1" />
      </div>

      <div>
        <label className="block text-sm text-gray-600">Last Name</label>
        <input name="lastName" value={formData.lastName} onChange={handleChange} className="w-full border rounded-lg p-2.5 mt-1" />
      </div>

      <div>
        <label className="block text-sm text-gray-600">First Name</label>
        <input name="firstName" value={formData.firstName} onChange={handleChange} className="w-full border rounded-lg p-2.5 mt-1" />
      </div>

      <div>
        <label className="block text-sm text-gray-600">Middle Name</label>
        <input name="middleName" value={formData.middleName} onChange={handleChange} className="w-full border rounded-lg p-2.5 mt-1" />
      </div>

      <div>
        <label className="block text-sm text-gray-600">Email Address</label>
        <input type="email" name="email" value={formData.email} disabled className="w-full border rounded-lg p-2.5 mt-1 bg-gray-100" />
      </div>

      <div>
        <label className="block text-sm text-gray-600">Phone Number</label>
        <input name="phone" value={formData.phone} onChange={handleChange} className="w-full border rounded-lg p-2.5 mt-1" />
      </div>

      <div>
        <label className="block text-sm text-gray-600">Gender</label>
        <select name="gender" value={formData.gender} onChange={handleChange} className="w-full border rounded-lg p-2.5 mt-1">
          <option value="">Select</option>
          <option>Male</option>
          <option>Female</option>
        </select>
      </div>

      <div>
        <label className="block text-sm text-gray-600">Date of Birth</label>
        <input type="date" name="dob" value={formData.dob} onChange={handleChange} className="w-full border rounded-lg p-2.5 mt-1" />
      </div>

      <div>
        <label className="block text-sm text-gray-600">Nationality</label>
        <input name="nationality" value={formData.nationality} onChange={handleChange} className="w-full border rounded-lg p-2.5 mt-1" />
      </div>

      <div>
        <label className="block text-sm text-gray-600">Passport Issuing Country</label>
        <input name="passportCountry" value={formData.passportCountry} onChange={handleChange} className="w-full border rounded-lg p-2.5 mt-1" />
      </div>

      <div>
        <label className="block text-sm text-gray-600">Passport Number</label>
        <input name="passportNumber" value={formData.passportNumber} onChange={handleChange} className="w-full border rounded-lg p-2.5 mt-1" />
      </div>

      <div>
        <label className="block text-sm text-gray-600">Passport Issue Date</label>
        <input type="date" name="passportIssueDate" value={formData.passportIssueDate} onChange={handleChange} className="w-full border rounded-lg p-2.5 mt-1" />
      </div>

      <div>
        <label className="block text-sm text-gray-600">Passport Expiry Date</label>
        <input type="date" name="passportExpiryDate" value={formData.passportExpiryDate} onChange={handleChange} className="w-full border rounded-lg p-2.5 mt-1" />
      </div>

      <div className="md:col-span-2 flex justify-center mt-6">
        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition">
          Update Changes
        </button>
      </div>
    </form>
  );
}
