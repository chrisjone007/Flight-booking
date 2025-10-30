"use client";

import { useState } from "react";
import { User } from "@/types"
import CustomRadioOption from "./CustomRadioOption"; 

interface ProfileDetailsFormProps {
  user: User | null;
}

const inputClasses = 
  "w-full p-3 border border-gray-300 rounded-lg text-gray-800 " +
  "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500";
  
// Tailored styling for the disabled/read-only input (Email)
const disabledInputClasses = 
  "w-full p-3 border border-gray-300 rounded-lg text-gray-600 bg-gray-50 cursor-not-allowed";

// Tailored styling for labels
const labelClasses = "block text-sm font-medium text-gray-700 mb-1";


export default function ProfileDetailsForm({ user }: ProfileDetailsFormProps) {
  const [formData, setFormData] = useState({
    // Initial state mapping from user (adjust keys as necessary for your backend)
    title: (user as any)?.title || "",
    firstName: user?.firstName || "",
    middleName: (user as any)?.middleName || "",
    lastName: (user as any)?.lastName || user?.lastName || "", 
    email: user?.email || "",
    phone: user?.phone || "",
    gender: (user as any)?.gender || "",
    dob: (user as any)?.dob || user?.dateOfBirth || "",
    nationality: (user as any)?.nationality || "",
    passportCountry: (user as any)?.passportCountry || "",
    passportNumber: (user as any)?.passportNumber || "",
    passportIssueDate: (user as any)?.passportIssueDate || "",
    passportExpirationDate: (user as any)?.passportExpirationDate || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleGenderChange = (value: string) => {
    setFormData((prev) => ({ ...prev, gender: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Updated user profile:", formData);
    // TODO: integrate with API
  };

  return (
    
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
        
        {/* Row 1: Title and Local Name (Local Name replaces Last Name position) */}
        <div>
          <label className={labelClasses}>Title</label>
          <select 
            name="title" 
            value={formData.title} 
            onChange={handleChange} 
            className={inputClasses}
          >
            <option value="">Select</option>
            <option value="Mr">Mr</option>
            <option value="Mrs">Mrs</option>
            <option value="Miss">Miss</option>
            <option value="Ms">Ms</option>
            <option value="Dr">Dr</option>
          </select>
        </div>

        <div>
          <label className={labelClasses}>Last Name</label>
          <input 
            type="text"
            name="lastName" 
            value={formData.lastName} 
            onChange={handleChange} 
            placeholder="Enter Local Name"
            className={inputClasses} 
          />
        </div>

        {/* Row 2: First Name and Middle Name */}
        <div>
          <label className={labelClasses}>First Name</label>
          <input 
            type="text"
            name="firstName" 
            value={formData.firstName} 
            onChange={handleChange} 
            placeholder="Enter First Name"
            className={inputClasses} 
          />
        </div>

        <div>
          <label className={labelClasses}>Middle Name</label>
          <input 
            type="text"
            name="middleName" 
            value={formData.middleName} 
            onChange={handleChange} 
            placeholder="Enter Middle Name"
            className={inputClasses} 
          />
        </div>

        {/* Row 3: Email Address and Phone Number */}
        <div>
          <label className={labelClasses}>Email Address</label>
          <input 
            type="email" 
            name="email" 
            value={formData.email} 
            disabled 
            placeholder="Email Address"
            className={disabledInputClasses} 
          />
        </div>

        <div>
          <label className={labelClasses}>Phone Number</label>
          {/* Note: The image shows a country code dropdown integrated here. 
             For simplicity, this uses a single input. You would use a <div> and 
             two aligned inputs to match the visual exactly. */}
          <input 
            type="tel"
            name="phone" 
            value={formData.phone} 
            onChange={handleChange} 
            placeholder="Enter number"
            className={inputClasses} 
          />
        </div>

        {/* Row 4: Gender (Custom Radio Group, spanning both columns) */}
        <div className="md:col-span-2"> 
          <label className={labelClasses}>Gender</label>
          <div className="flex space-x-4">
            <CustomRadioOption
              id="genderMale"
              value="Male"
              label="Male"
              name="gender"
              checked={formData.gender === 'Male'}
              onChange={handleGenderChange}
            />
            <CustomRadioOption
              id="genderFemale"
              value="Female"
              label="Female"
              name="gender"
              checked={formData.gender === 'Female'}
              onChange={handleGenderChange}
            />
            {/* If you need 'Other' or 'Prefer not to say', add CustomRadioOption here */}
          </div>
        </div>
        
        {/* Row 5: Date of Birth and Nationality */}
        <div>
          <label className={labelClasses}>Date of Birth</label>
          <input 
            type="date" 
            name="dob" 
            value={formData.dob} 
            onChange={handleChange} 
            placeholder="YYYY-MM-DD"
            className={inputClasses} 
          />
        </div>

        <div>
          <label className={labelClasses}>Nationality</label>
          <input 
            type="text"
            name="nationality" 
            value={formData.nationality} 
            onChange={handleChange} 
            placeholder="Enter Nationality"
            className={inputClasses} 
          />
        </div>
        
        {/* Row 6: Passport Issuing Country and Passport Number */}
        <div>
          <label className={labelClasses}>Passport Issuing Country</label>
          <input 
            type="text"
            name="passportCountry" 
            value={formData.passportCountry} 
            onChange={handleChange} 
            placeholder="Enter Country"
            className={inputClasses} 
          />
        </div>

        <div>
          <label className={labelClasses}>Passport Number</label>
          <input 
            type="text" 
            name="passportNumber" 
            value={formData.passportNumber} 
            onChange={handleChange} 
            placeholder="Enter Passport Number"
            className={inputClasses} 
          />
        </div>

        {/* Row 7: Passport Issue Date and Passport Expiry Date */}
        <div>
          <label className={labelClasses}>Passport Issue Date</label>
          <input 
            type="date" 
            name="passportIssueDate" 
            value={formData.passportIssueDate} 
            onChange={handleChange} 
            placeholder="YYYY-MM-DD"
            className={inputClasses} 
          />
        </div>

        <div>
          <label className={labelClasses}>Passport Expiration Date</label>
          <input 
            type="date" 
            name="passportExpirationDate" 
            value={formData.passportExpirationDate} 
            onChange={handleChange} 
            placeholder="YYYY-MM-DD"
            className={inputClasses} 
          />
        </div>

      </div>

      {/* Button positioned to the center */}
      <div className="flex justify-center pt-4">
        <button 
          type="submit" 
          className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition duration-150 ease-in-out"
        >
          Update Changes
        </button>
      </div>
    </form>
  );
}