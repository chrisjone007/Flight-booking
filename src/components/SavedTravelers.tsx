import React, { ChangeEvent, useEffect, useState } from 'react';
import { Traveller } from '../types/index';
import CustomRadioOption from './CustomRadioOption'; // Ensure this path is correct

// Utility classes for styling consistency
const inputClasses = 
  "w-full p-3 border border-gray-300 rounded-lg text-gray-800 " +
  "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500";
const labelClasses = "block text-sm font-medium text-gray-700 mb-1";
const dateInputClasses = 
  "w-full p-3 border border-gray-300 rounded-lg text-gray-800 " +
  "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none";

const emptyFormData: Traveller = {
    id: '', 
    title: '', 
    firstName: '', 
    lastName: '', 
    middleName: '', 
    email: '', 
    phone: '', 
    countryCode: '',
    dob: '', 
    gender: '', 
    passportCountry: '', 
    passportNumber: '', 
    passportIssue: '',
    passportExpiry: '', 
    nationality: ''
};

export default function SavedTravelers() {
  const [travellers, setTravellers] = useState<Traveller[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Traveller>(emptyFormData);

  useEffect(() => {
    const raw = localStorage.getItem('saved_travellers');
    if (raw) {
      try {
        const parsed = JSON.parse(raw) as Traveller[];
        setTravellers(parsed);
      } catch {
        setTravellers([]);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('saved_travellers', JSON.stringify(travellers));
  }, [travellers]);

  function handleFormChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value } as Traveller));
  }
  
  function handleGenderChange(value: string) {
    setFormData(prev => ({ ...prev, gender: value } as Traveller));
  }


  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName) {
      setShowForm(true);
      return;
    }

    if (editingId) {
      setTravellers(prev => prev.map(t => (t.id === editingId ? { ...formData, id: editingId } : t)));
    } else {
      const id = Date.now().toString();
      setTravellers(prev => [...prev, { ...formData, id }]);
    }

    // Reset after successful save
    setShowForm(false);
    setEditingId(null);
    setFormData(emptyFormData);
  }

  function handleCancel() {
     // Reset state and hide form
    setShowForm(false);
    setEditingId(null);
    setFormData(emptyFormData);
  }

  function handleEdit(id: string) {
    const t = travellers.find(x => x.id === id);
    if (!t) return;
    setFormData(t);
    setEditingId(id);
    setShowForm(true);
  }

  function handleDelete(id: string) {
    setTravellers(prev => prev.filter(t => t.id !== id));
  }

  function formatDate(d?: string) {
    if (!d) return '';
    const parsed = new Date(d);
    if (isNaN(parsed.getTime())) return d;
    return parsed.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' });
  }
  
  // Logic to prepare for adding a new traveler (Fixes the button issue)
  const prepareToAddTraveller = () => {
      setEditingId(null); // Clear any existing editing state
      setFormData(emptyFormData); // Reset form data to blank fields
      setShowForm(true); // Finally, show the form
  };

  return (
    <div className="flex-1 bg-white p-8 rounded-xl shadow-lg">
      
      {/* ---------------------------------------------------- */}
      {/* 1. Saved Travellers List and Empty State View */}
      {/* ---------------------------------------------------- */}
      {!showForm && (
        <>
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-1">Saved Travellers</h2>
              <div className="text-sm text-gray-500">
                Add frequent travellers to make booking for others easy.
              </div>
            </div>
            
            {/* ADD TRAVELLER BUTTON (List View) */}
            {travellers.length > 0 && (
              <button
                type="button"
                className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition duration-150 ease-in-out"
                onClick={prepareToAddTraveller} // <-- USING THE FIXED HANDLER
              >
                + Add Traveller
              </button>
            )}
          </div>

          {/* Empty State (Leftmost Image) */}
          {travellers.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 border border-gray-100 rounded-lg">
              <p className="text-gray-500 mb-6">
                You don't have any saved travellers yet. Your saved travellers will appear here.
              </p>
               <button
                type="button"
                className="px-6 py-3 text-blue-600 border-solid border-2 border-blue-700 font-medium rounded-lg hover:bg-blue-700 hover:text-white transition duration-150 ease-in-out"
                onClick={prepareToAddTraveller}
              >
                + Add Travellers
              </button>
            </div>
          ) : (
            
            /* List View (Rightmost Image) */
            <div className="space-y-4">
              {/* Header Row */}
              <div className="hidden md:grid grid-cols-6 gap-4 py-2 px-3 text-xs font-semibold uppercase text-gray-500 border-b border-gray-200">
                <span className="col-span-2">Full Name</span>
                <span>Date Of Birth</span>
                <span>Nationality</span>
                <span>Passport ID</span>
                <span className="text-right"></span>
              </div>

              {/* List of Travellers */}
              {travellers.map(t => (
                <div
                  key={t.id}
                  className="grid grid-cols-6 items-center gap-4 py-4 px-3 border rounded-lg hover:shadow-sm transition duration-150"
                >
                  <div className="font-semibold text-gray-900 col-span-2">
                    {(t.title ? t.title + ' ' : '')}{t.firstName} {t.lastName}
                  </div>
                  <div className="text-sm text-gray-600">{formatDate(t.dob)}</div>
                  <div className="text-sm text-gray-600 uppercase">
                    {(t.nationality || t.passportCountry || '').toUpperCase()}
                  </div>
                  <div className="text-sm text-gray-600">{t.passportNumber}</div>
                  
                  <div className="flex justify-end space-x-4 text-sm font-medium">
                    <button
                      type="button"
                      className="text-blue-600 hover:text-blue-800 transition duration-100"
                      onClick={() => handleEdit(t.id)}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="text-red-600 hover:text-red-800 transition duration-100"
                      onClick={() => handleDelete(t.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {showForm && (
        <form onSubmit={handleSave} className="space-y-6 mt-4">
          <h3 className="text-lg font-semibold mb-6">{editingId ? 'Edit Traveller' : 'Add New Traveller'}</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">

            {/* Row 1: Title and Last Name */}
            <div>
              <label className={labelClasses}>Title</label>
              <select 
                name="title" 
                value={formData.title} 
                onChange={handleFormChange} 
                className={inputClasses}
              >
                <option value="">Select</option>
                <option value="Mr">Mr</option>
                <option value="Mrs">Mrs</option>
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
                onChange={handleFormChange} 
                placeholder="Last Name"
                className={inputClasses} 
              />
            </div>

            {/* Row 2: First Name and Middle Name (Middle Name is blank in your form data) */}
            <div>
              <label className={labelClasses}>First Name</label>
              <input 
                type="text"
                name="firstName" 
                value={formData.firstName} 
                onChange={handleFormChange} 
                placeholder="First Name"
                className={inputClasses} 
              />
            </div>
            <div>
              <label className={labelClasses}>Middle Name</label>
              <input 
                type="text"
                name="middleName" 
                value={formData.middleName || ''}
                onChange={handleFormChange} 
                placeholder="Middle Name"
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
                onChange={handleFormChange} 
                placeholder="Email Address"
                className={inputClasses} 
              />
            </div>
            <div>
              <label className={labelClasses}>Phone Number</label>
              <div className="flex">
                <input 
                  name="countryCode" 
                  value={formData.countryCode} 
                  onChange={handleFormChange} 
                  placeholder="+234"
                  className={`${inputClasses} w-1/4 rounded-r-none border-r-0`}
                />
                <input 
                  type="tel"
                  name="phone" 
                  value={formData.phone} 
                  onChange={handleFormChange} 
                  placeholder="Enter number"
                  className={`${inputClasses} flex-1 rounded-l-none`} 
                />
              </div>
            </div>

            {/* Row 4: Gender (Custom Boxed Radio Group) */}
            <div className="md:col-span-2"> 
              <label className={labelClasses}>Gender</label>
              <div className="flex space-x-4">
                <CustomRadioOption
                  id="travellerGenderMale"
                  value="Male"
                  label="Male"
                  name="travellerGender"
                  checked={formData.gender === 'Male'}
                  onChange={handleGenderChange}
                />
                <CustomRadioOption
                  id="travellerGenderFemale"
                  value="Female"
                  label="Female"
                  name="travellerGender"
                  checked={formData.gender === 'Female'}
                  onChange={handleGenderChange}
                />
              </div>
            </div>
            
            {/* Row 5: Date of Birth and Nationality */}
            <div>
              <label className={labelClasses}>Date of Birth</label>
              <input 
                type="date" 
                name="dob" 
                value={formData.dob} 
                onChange={handleFormChange} 
                className={dateInputClasses} 
              />
            </div>
            <div>
              <label className={labelClasses}>Nationality</label>
              <input 
                type="text" 
                name="nationality" 
                value={formData.nationality} 
                onChange={handleFormChange} 
                placeholder="Nationality"
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
                onChange={handleFormChange} 
                placeholder="Issuing Country"
                className={inputClasses} 
              />
            </div>
            <div>
              <label className={labelClasses}>Passport Number</label>
              <input 
                type="text" 
                name="passportNumber" 
                value={formData.passportNumber} 
                onChange={handleFormChange} 
                placeholder="Passport Number"
                className={inputClasses} 
              />
            </div>
            
            {/* Row 7: Passport Issue Date and Passport Expiration Date */}
            <div>
              <label className={labelClasses}>Passport Issue Date</label>
              <input 
                type="date" 
                name="passportIssue" 
                value={formData.passportIssue} 
                onChange={handleFormChange} 
                className={dateInputClasses} 
              />
            </div>
            <div>
              <label className={labelClasses}>Passport Expiration Date</label>
              <input 
                type="date" 
                name="passportExpiry" 
                value={formData.passportExpiry} 
                onChange={handleFormChange} 
                className={dateInputClasses} 
              />
            </div>
          </div>
          
          {/* Action Buttons: Centered "Save" and "Cancel" */}
          <div className="flex justify-center pt-8 space-x-4">
            <button
              type="submit"
              className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition duration-150 ease-in-out"
            >
              Save
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="px-8 py-3 text-red-600 font-medium rounded-lg border-2 border-red-600 hover:bg-red-50 transition duration-150 ease-in-out"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}