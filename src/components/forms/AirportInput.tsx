"use client";

import { useState } from 'react';
import { Airport } from '@/types';

interface AirportInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  label: string;
}

// Mock airport data - in real app, this would come from API
const airports: Airport[] = [
  { code: 'JFK', name: 'John F. Kennedy International', city: 'New York', country: 'USA' },
  { code: 'LAX', name: 'Los Angeles International', city: 'Los Angeles', country: 'USA' },
  { code: 'LHR', name: 'Heathrow Airport', city: 'London', country: 'UK' },
  { code: 'DXB', name: 'Dubai International', city: 'Dubai', country: 'UAE' },
  { code: 'SIN', name: 'Changi Airport', city: 'Singapore', country: 'Singapore' },
  { code: 'CDG', name: 'Charles de Gaulle', city: 'Paris', country: 'France' },
];

export default function AirportInput({ value, onChange, placeholder, label }: AirportInputProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState(value);

  const filteredAirports = airports.filter(airport =>
    airport.city.toLowerCase().includes(inputValue.toLowerCase()) ||
    airport.code.toLowerCase().includes(inputValue.toLowerCase()) ||
    airport.name.toLowerCase().includes(inputValue.toLowerCase())
  );

  const handleSelect = (airport: Airport) => {
    onChange(airport.code);
    setInputValue(`${airport.city} (${airport.code})`);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setTimeout(() => setIsOpen(false), 200)}
        placeholder={placeholder}
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      
      {isOpen && inputValue && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
          {filteredAirports.length > 0 ? (
            filteredAirports.map((airport) => (
              <div
                key={airport.code}
                className="p-3 hover:bg-gray-50 cursor-pointer border-b last:border-b-0"
                onClick={() => handleSelect(airport)}
              >
                <div className="font-medium text-gray-900">
                  {airport.city} ({airport.code})
                </div>
                <div className="text-sm text-gray-500">{airport.name}</div>
              </div>
            ))
          ) : (
            <div className="p-3 text-gray-500">No airports found</div>
          )}
        </div>
      )}
    </div>
  );
}