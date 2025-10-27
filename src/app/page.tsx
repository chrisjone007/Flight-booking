"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Aos from "aos";
import "aos/dist/aos.css";
import { FlightSearchParams } from "@/types";
import CustomDatePicker from "@/components/ui/CustomDatePicker";

interface FlightLeg {
  id: string;
  from: string;
  to: string;
  departDate: Date | null;
}
interface BenefitCardType {
  id: number;
  title: string;
  description: string;
  // Using string for now, but in a real app, you'd use SVG/ReactNode
  icon: string; 
  iconColor: string;
  bgColor: string;
}
const whyEzziflyData: BenefitCardType[] = [
  {
    id: 1,
    title: "Best Flight Deals",
    description: "Get unbeatable prices on domestic and international flights, no hidden fees, just transparent fares.",
    // Placeholder SVGs are represented as complex strings/ReactNodes in the real app,
    // For simplicity here, I'll use simple emojis/strings and let Tailwind handle the styling.
    icon: "🏷️", 
    iconColor: "text-pink-500",
    bgColor: "bg-pink-100",
  },
  {
    id: 2,
    title: "Real-Time Availability",
    description: "Search, compare, and book flights in real time with live seat and fare updates.",
    icon: "⏰",
    iconColor: "text-red-500",
    bgColor: "bg-red-100",
  },
  {
    id: 3,
    title: "Simple & Fast Booking",
    description: "Book your flight in just a few clicks with our smooth, intuitive interface.",
    icon: "✈️",
    iconColor: "text-blue-500",
    bgColor: "bg-blue-100",
  },
  {
    id: 4,
    title: "Trusted by Thousands",
    description: "Join thousands of satisfied travellers who trust Ezzifly to get them to their destination hassle-free.",
    icon: "👥",
    iconColor: "text-green-500",
    bgColor: "bg-green-100",
  },
];
// Mock data for airports
const airports = [
  { code: "JFK", name: "New York (JFK)", city: "New York" },
  { code: "LAX", name: "Los Angeles (LAX)", city: "Los Angeles" },
  { code: "LHR", name: "London (LHR)", city: "London" },
  { code: "CDG", name: "Paris (CDG)", city: "Paris" },
  { code: "DXB", name: "Dubai (DXB)", city: "Dubai" },
  { code: "SIN", name: "Singapore (SIN)", city: "Singapore" },
  { code: "BKK", name: "Bangkok (BKK)", city: "Bangkok" },
  { code: "SYD", name: "Sydney (SYD)", city: "Sydney" },
  { code: "FRA", name: "Frankfurt (FRA)", city: "Frankfurt" },
  { code: "AMS", name: "Amsterdam (AMS)", city: "Amsterdam" },
  { code: "IST", name: "Istanbul (IST)", city: "Istanbul" },
  { code: "HND", name: "Tokyo (HND)", city: "Tokyo" },
  { code: "PEK", name: "Beijing (PEK)", city: "Beijing" },
  { code: "DEL", name: "Delhi (DEL)", city: "Delhi" },
  { code: "MAD", name: "Madrid (MAD)", city: "Madrid" },
];

// Popular Routes data
const popularRoutes = [
  {
    from: "Lagos",
    to: "London",
    price: "$300",
    type: "Round Trip",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
  },
  {
    from: "Abuja",
    to: "Dubai",
    price: "$250",
    type: "One Way",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
  },
  {
    from: "Accra",
    to: "Paris",
    price: "$300",
    type: "One Way",
    image: "https://th.bing.com/th/id/OIP.vaNXUEIYi_vbikuDPu72MwHaE8?o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3"
  },
  {
    from: "Kogi",
    to: "Canada",
    price: "$500",
    type: "Round Trip",
    image: "https://images.unsplash.com/photo-1519832979-6fa011b87667?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
  },
  {
    from: "Port Harcourt",
    to: "New York",
    price: "$450",
    type: "Round Trip",
    image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
  },
  {
    from: "Kano",
    to: "Istanbul",
    price: "$350",
    type: "One Way",
    image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
  },
  {
    from: "Enugu",
    to: "Johannesburg",
    price: "$280",
    type: "Round Trip",
    image: "https://images.unsplash.com/photo-1484557985045-edf25e08da73?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
  },
  {
    from: "Benin",
    to: "Cairo",
    price: "$320",
    type: "One Way",
    image: "https://images.unsplash.com/photo-1572252009286-268acec5ca0a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
  }
];

// Trending destinations data with proper flag SVGs
const destinations = [
  {
    name: "United Kingdom",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    description: "Historic landmarks & modern cities",
    flag: (
      <svg width="16" height="12" viewBox="0 0 16 12">
        <path fill="#012169" d="M0 0h16v12H0z"/>
        <path fill="#FFF" d="M0 0v12h16V0zM6.4 0v12h3.2V0zM0 4.8v2.4h16V4.8z"/>
        <path fill="#C8102E" d="M0 5.6v.8h16v-.8zM7.2 0v12h1.6V0z"/>
        <path fill="#FFF" d="m0 0 8 6m0 0L0 12"/>
        <path fill="#C8102E" d="m1.6 0 6.4 6m0 0-6.4 6"/>
        <path fill="#FFF" d="m16 0-8 6m0 0 8 6"/>
        <path fill="#C8102E" d="m14.4 0-6.4 6m0 0 6.4 6"/>
      </svg>
    )
  },
  {
    name: "Germany",
    image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    description: "Castles & cutting-edge cities",
    flag: (
      <svg width="16" height="12" viewBox="0 0 16 12">
        <path fill="#000" d="M0 0h16v4H0z"/>
        <path fill="#DD0000" d="M0 4h16v4H0z"/>
        <path fill="#FFCE00" d="M0 8h16v4H0z"/>
      </svg>
    )
  },
  {
    name: "Turkey",
    image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    description: "East meets West harmony",
    flag: (
      <svg width="16" height="12" viewBox="0 0 16 12">
        <path fill="#E30A17" d="M0 0h16v12H0z"/>
        <circle cx="8" cy="6" r="3" fill="#fff"/>
        <circle cx="9" cy="6" r="1.5" fill="#E30A17"/>
        <path fill="#E30A17" d="m8 3.5 1 3h-2z"/>
      </svg>
    )
  },
  {
    name: "Ghana",
    image: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    description: "Rich history & vibrant culture",
    flag: (
      <svg width="16" height="12" viewBox="0 0 16 12">
        <path fill="#006B3F" d="M0 0h16v4H0z"/>
        <path fill="#FCD116" d="M0 4h16v4H0z"/>
        <path fill="#CE1126" d="M0 8h16v4H0z"/>
        <path fill="#000" d="m8 3.5 1.2 3.6H4.8L6 3.5z"/>
        <circle cx="8" cy="6" r="1.5" fill="#000"/>
      </svg>
    )
  },
  {
    name: "Dubai",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    description: "Futuristic architecture & luxury",
    flag: (
      <svg width="16" height="12" viewBox="0 0 16 12">
        <path fill="#FF0000" d="M0 0h16v12H0z"/>
        <path fill="#00732F" d="M0 0h4v12H0z"/>
        <path fill="#000" d="M4 0h8v12H4z"/>
      </svg>
    )
  },
  {
    name: "Canada",
    image: "https://images.unsplash.com/photo-1519832979-6fa011b87667?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    description: "Breathtaking nature & cities",
    flag: (
      <svg width="16" height="12" viewBox="0 0 16 12">
        <path fill="#FF0000" d="M0 0h16v12H0z"/>
        <path fill="#fff" d="M4 0h8v12H4z"/>
        <path fill="#FF0000" d="m8 4-1 3h2z"/>
        <circle cx="8" cy="6" r="1.5" fill="#FF0000"/>
      </svg>
    )
  },
  {
    name: "Paris",
    image: "https://th.bing.com/th/id/OIP.vaNXUEIYi_vbikuDPu72MwHaE8?o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3",
    description: "City of love & elegance",
    flag: (
      <svg width="16" height="12" viewBox="0 0 16 12">
        <path fill="#002395" d="M0 0h5.3v12H0z"/>
        <path fill="#fff" d="M5.3 0h5.3v12H5.3z"/>
        <path fill="#ED2939" d="M10.7 0H16v12h-5.3z"/>
      </svg>
    )
  }
];

export default function Home() {
  const [searchParams, setSearchParams] = useState<FlightSearchParams>({
    from: '',
    to: '',
    departureDate: null,
    returnDate: null,
    travelers: 1,
    tripType: 'round-trip',
    cabinClass: 'economy',
  });

  const [multiCityLegs, setMultiCityLegs] = useState<FlightLeg[]>([
    { id: '1', from: '', to: '', departDate: null }
  ]);

  // Popular Routes state
  const [currentIndex, setCurrentIndex] = useState(0);

  // Trending Destinations state
  const [currentDestinationsIndex, setCurrentDestinationsIndex] = useState(0);

  const router = useRouter();

  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  // Flight search functions
  const addFlightLeg = () => {
    setMultiCityLegs(prev => [
      ...prev,
      { id: Date.now().toString(), from: '', to: '', departDate: null }
    ]);
  };

  const removeFlightLeg = (id: string) => {
    if (multiCityLegs.length > 1) {
      setMultiCityLegs(prev => prev.filter(leg => leg.id !== id));
    }
  };

  const updateMultiCityLeg = (id: string, field: keyof FlightLeg, value: any) => {
    setMultiCityLegs(prev => 
      prev.map(leg => 
        leg.id === id ? { ...leg, [field]: value } : leg
      )
    );
  };

  const handleSearch = () => {
    if (searchParams.tripType === 'multi-city') {
      const isValid = multiCityLegs.every(leg => 
        leg.from && leg.to && leg.departDate
      );
      if (!isValid) {
        alert("Please fill all fields for all flight legs.");
        return;
      }
    } else {
      const { from, to, departureDate, travelers } = searchParams;
      if (!from || !to || !departureDate || !travelers) {
        alert("Please fill all required fields.");
        return;
      }
    }

    router.push('/flights');
  };

  const updateSearchParams = (key: keyof FlightSearchParams, value: any) => {
    setSearchParams(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const swapLocations = () => {
    setSearchParams(prev => ({
      ...prev,
      from: prev.to,
      to: prev.from
    }));
  };

  // Popular Routes functions
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex + 4 >= popularRoutes.length ? 0 : prevIndex + 4
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex - 4 < 0 ? Math.max(0, popularRoutes.length - 4) : prevIndex - 4
    );
  };

  const visibleRoutes = popularRoutes.slice(currentIndex, currentIndex + 4);

  // Trending Destinations functions
  const nextDestinationsSlide = () => {
    setCurrentDestinationsIndex((prevIndex) => 
      prevIndex + 4 >= destinations.length ? 0 : prevIndex + 4
    );
  };

  const prevDestinationsSlide = () => {
    setCurrentDestinationsIndex((prevIndex) => 
      prevIndex - 4 < 0 ? Math.max(0, destinations.length - 4) : prevIndex - 4
    );
  };
const visibleDestinations = destinations.slice(currentDestinationsIndex, currentDestinationsIndex + 4);
  return (
    <>
      {/* Hero Section - Updated for full width */}
      <section className="relative h-screen flex items-center justify-center w-full pt-20">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80')"
          }}
        ></div>
        
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/30"></div>
        
        {/* Updated container for full width */}
        <div className="relative z-10 text-center text-white w-full px-3 sm:px-4 lg:px-6">
          <h1 
            data-aos="fade-up" 
            className="text-2xl xs:text-3xl sm:text-4xl lg:text-4xl font-bold mt-4 px-2"
          >
            Travel safe With Us and Enjoy Seamless <br /> Movement
          </h1>
          
          {/* Compact Search Form */}
          <div 
            data-aos="fade-up"
            data-aos-delay="400"
            className="bg-transparent mt-2 sm:mt-4 w-full flex flex-col items-center"
          >
            {/* Trip Type and Class Selection - Stack on mobile */}
            <div className="flex flex-col sm:flex-row gap-2 mb-3 sm:mb-4 w-full max-w-4xl">
              {/* Trip Type Dropdown */}
              <div className="w-full sm:w-32">
                <select
                  value={searchParams.tripType}
                  onChange={(e) => updateSearchParams('tripType', e.target.value)}
                  className="w-full p-2 sm:p-3 bg-white/10 backdrop-blur-sm border border-white/50 rounded text-black text-sm outline-none"
                >
                  <option value="round-trip">Round Trip</option>
                  <option value="one-way">One Way</option>
                  <option value="multi-city">Multi City</option>
                </select>
              </div>

              {/* Class Dropdown */}
              <div className="w-full sm:w-32">
                <select
                  value={searchParams.cabinClass}
                  onChange={(e) => updateSearchParams('cabinClass', e.target.value)}
                    className="w-full p-2 sm:p-3 bg-white/10 backdrop-blur-sm border border-white/50 rounded text-black text-sm"
                  >
                  <option value="economy">Economy</option>
                  <option value="premium-economy">Premium Economy</option>
                  <option value="business">Business</option>
                  <option value="first">First Class</option>
                </select>
              </div>
            </div>

            {/* Search Forms */}
            {searchParams.tripType === 'multi-city' ? (
              /* Multi-City Form - Stack on mobile */
              <div className="space-y-3 w-full max-w-4xl flex flex-col items-center">
                {multiCityLegs.map((leg, index) => (
                  <div key={leg.id} className="space-y-3 lg:space-y-0 lg:grid lg:grid-cols-12 lg:gap-2 items-end">
                    {/* From - Select Dropdown */}
                    <div className="lg:col-span-3 relative">
                      <select
                        value={leg.from}
                        onChange={(e) => updateMultiCityLeg(leg.id, 'from', e.target.value)}
                        className="w-full p-2 sm:p-3 bg-white border border-gray-300 rounded text-gray-900 text-sm sm:text-base outline-none"
                      >
                        <option value="">From</option>
                        {airports.map(airport => (
                          <option key={airport.code} value={airport.code}>
                            {airport.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* To - Select Dropdown */}
                    <div className="lg:col-span-3 relative">
                      <select
                        value={leg.to}
                        onChange={(e) => updateMultiCityLeg(leg.id, 'to', e.target.value)}
                        className="w-full p-2 sm:p-3 bg-white border border-gray-300 rounded text-gray-900 text-sm sm:text-base"
                      >
                        <option value="">To</option>
                        {airports.map(airport => (
                          <option key={airport.code} value={airport.code}>
                            {airport.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Depart - Date Picker */}
                    <div className="lg:col-span-3 relative">
                      <div className="relative">
                        <CustomDatePicker
                          selected={leg.departDate}
                          onChange={(date) => updateMultiCityLeg(leg.id, 'departDate', date)}
                          placeholderText="Depart"
                          minDate={new Date()}
                        />
                        <svg className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    </div>

                    {/* Travelers - Select Dropdown */}
                    <div className="lg:col-span-2 relative">
                      <select
                        value={searchParams.travelers}
                        onChange={(e) => updateSearchParams('travelers', parseInt(e.target.value))}
                        className="w-full p-2 sm:p-3 bg-white border border-gray-300 rounded text-gray-900 text-sm sm:text-base"
                      >
                        <option value="">Travelers</option>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                          <option key={num} value={num}>
                            {num} {num === 1 ? 'Traveler' : 'Travelers'}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Delete Button */}
                    <div className="lg:col-span-1 flex items-center justify-center h-10 sm:h-12 lg:h-auto">
                      {multiCityLegs.length > 1 && (
                        <button
                          onClick={() => removeFlightLeg(leg.id)}
                          className="w-full lg:w-auto bg-white hover:bg-gray-100 border border-gray-300 text-gray-700 p-2 sm:p-3 rounded transition duration-300 flex items-center justify-center"
                          title="Remove flight"
                        >
                          <svg className="w-3 h-3 sm:w-4 sm:h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>
                ))}

                {/* Add Flight Button - Full width on mobile */}
                <div className="flex justify-end items-center pt-2">
                  <button
                    onClick={addFlightLeg}
                    className="w-full sm:w-auto bg-white hover:bg-gray-100 border border-gray-300 text-gray-700 py-2 sm:py-3 px-3 sm:px-4 rounded transition duration-300 text-xs sm:text-sm flex items-center justify-center gap-1 sm:gap-2"
                  >
                    <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add Flight
                  </button>
                </div>
              </div>
            ) : (
              /* Round Trip & One Way Form - Stack on mobile, grid on desktop */
              <div className="space-y-3 lg:space-y-0 lg:grid lg:grid-cols-11 lg:gap-2 items-end w-full max-w-4xl justify-center">
                {/* From - Select Dropdown */}
                <div className="lg:col-span-2 relative">
                  <select
                    value={searchParams.from}
                    onChange={(e) => updateSearchParams('from', e.target.value)}
                    className="w-full p-2 sm:p-3 bg-white border border-gray-300 rounded text-gray-900 text-sm sm:text-base"
                  >
                    <option value="">From</option>
                    {airports.map(airport => (
                      <option key={airport.code} value={airport.code}>
                        {airport.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Swap Button - Hidden on mobile, show on desktop */}
                <div className="hidden lg:flex items-end justify-center h-10 sm:h-12">
                  <button
                    onClick={swapLocations}
                    className="bg-white hover:bg-gray-100 border border-gray-300 p-2 rounded transition duration-300 flex items-center justify-center"
                    title="Swap locations"
                  >
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                    </svg>
                  </button>
                </div>

                {/* To - Select Dropdown */}
                <div className="lg:col-span-2 relative">
                  <select
                    value={searchParams.to}
                    onChange={(e) => updateSearchParams('to', e.target.value)}
                    className="w-full p-2 sm:p-3 bg-white border border-gray-300 rounded text-gray-900 text-sm sm:text-base"
                  >
                    <option value="">To</option>
                    {airports.map(airport => (
                      <option key={airport.code} value={airport.code}>
                        {airport.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Depart - Date Picker */}
                <div className="lg:col-span-2 relative">
                  <div className="relative">
                    <CustomDatePicker
                      selected={searchParams.departureDate}
                      onChange={(date) => updateSearchParams('departureDate', date)}
                      placeholderText="Depart"
                      minDate={new Date()}
                    />
                    <svg className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>

                {/* Return - Date Picker - Only for Round Trip */}
                {searchParams.tripType === 'round-trip' && (
                  <div className="lg:col-span-2 relative">
                    <div className="relative">
                      <CustomDatePicker
                        selected={searchParams.returnDate}
                        onChange={(date) => updateSearchParams('returnDate', date)}
                        placeholderText="Return" 
                        minDate={searchParams.departureDate || new Date()}
                      />
                      <svg className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>
                )}

                {/* Travelers - Select Dropdown */}
                <div className={searchParams.tripType === 'round-trip' ? 'lg:col-span-2 relative' : 'lg:col-span-3 relative'}>
                  <select
                    value={searchParams.travelers}
                    onChange={(e) => updateSearchParams('travelers', parseInt(e.target.value))}
                    className="w-full p-2 sm:p-3 bg-white border border-gray-300 rounded text-gray-900 text-sm sm:text-base"
                  >
                    <option value="">Travelers</option>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'Traveler' : 'Travelers'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {/* Search Button - Full width on mobile */}
            <div className="mt-3 sm:mt-4 flex justify-center w-full max-w-4xl">
              <button
                onClick={handleSearch}
                className="w-full sm:w-auto bg-sky-600 hover:bg-sky-700 text-white font-semibold py-2 sm:py-3 px-4 sm:px-8 rounded transition-all duration-300 transform hover:-translate-y-0.5 shadow text-sm sm:text-base max-w-xs sm:max-w-none"
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </section>

<section className="py-12 sm:py-16 lg:py-20 bg-white w-full">
  <div className="w-full px-3 sm:px-4 lg:px-6">
    <div className="mb-8 sm:mb-12">
      <h2 className="text-2xl sm:text-2xl lg:text-2xl font-bold text-gray-900 mb-3">
        Popular Flight from Lagos
      </h2>
    </div>

    {/* First Row */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-8 sm:mb-12">
      {/* Lagos to London */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
        <div className="h-48 bg-cover bg-center" style={{backgroundImage: "url('https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80')"}}></div>
        <div className="p-6">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
              <span className="text-lg font-semibold text-gray-900">Lagos</span>
              <svg className="w-5 h-5 text-gray-500 transform rotate-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              <span className="text-lg font-semibold text-gray-900">London</span>
            </div>
            <div className="text-xl font-bold text-red-600">$300</div>
          </div>
          <span className="text-sm text-gray-500">Round Trip</span>
        </div>
      </div>

      {/* Lagos to Dubai */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
        <div className="h-48 bg-cover bg-center" style={{backgroundImage: "url('https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80')"}}></div>
        <div className="p-6">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
              <span className="text-lg font-semibold text-gray-900">Lagos</span>
              <svg className="w-5 h-5 text-gray-500 transform rotate-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              <span className="text-lg font-semibold text-gray-900">Dubai</span>
            </div>
            <div className="text-xl font-bold text-red-600">$250</div>
          </div>
          <span className="text-sm text-gray-500">One Way</span>
        </div>
      </div>

      {/* Lagos to Paris */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
        <div className="h-48 bg-cover bg-center" style={{backgroundImage: "url('https://th.bing.com/th/id/OIP.vaNXUEIYi_vbikuDPu72MwHaE8?o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3')"}}></div>
        <div className="p-6">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
              <span className="text-lg font-semibold text-gray-900">Lagos</span>
              <svg className="w-5 h-5 text-gray-500 transform rotate-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              <span className="text-lg font-semibold text-gray-900">Paris</span>
            </div>
            <div className="text-xl font-bold text-red-600">$300</div>
          </div>
          <span className="text-sm text-gray-500">One Way</span>
        </div>
      </div>

      {/* Lagos to Canada */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
        <div className="h-48 bg-cover bg-center" style={{backgroundImage: "url('https://images.unsplash.com/photo-1519832979-6fa011b87667?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80')"}}></div>
        <div className="p-6">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
              <span className="text-lg font-semibold text-gray-900">Lagos</span>
              <svg className="w-5 h-5 text-gray-500 transform rotate-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              <span className="text-lg font-semibold text-gray-900">Canada</span>
            </div>
            <div className="text-xl font-bold text-red-600">$500</div>
          </div>
          <span className="text-sm text-gray-500">Round Trip</span>
        </div>
      </div>
    </div>

    {/* Second Row */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-8 sm:mb-12">
      {/* Lagos to Spain */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
        <div className="h-48 bg-cover bg-center" style={{backgroundImage: "url('https://images.unsplash.com/photo-1543785734-4b6e564642f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80')"}}></div>
        <div className="p-6">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
              <span className="text-lg font-semibold text-gray-900">Lagos</span>
              <svg className="w-5 h-5 text-gray-500 transform rotate-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              <span className="text-lg font-semibold text-gray-900">Spain</span>
            </div>
            <div className="text-xl font-bold text-red-600">$300</div>
          </div>
          <span className="text-sm text-gray-500">Round Trip</span>
        </div>
      </div>

      {/* Lagos to Turkey */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
        <div className="h-48 bg-cover bg-center" style={{backgroundImage: "url('https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80')"}}></div>
        <div className="p-6">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
              <span className="text-lg font-semibold text-gray-900">Lagos</span>
              <svg className="w-5 h-5 text-gray-500 transform rotate-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              <span className="text-lg font-semibold text-gray-900">Turkey</span>
            </div>
            <div className="text-xl font-bold text-red-600">$250</div>
          </div>
          <span className="text-sm text-gray-500">One Way</span>
        </div>
      </div>

      {/* Lagos to Ghana */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
        <div className="h-48 bg-cover bg-center" style={{backgroundImage: "url('https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80')"}}></div>
        <div className="p-6">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
              <span className="text-lg font-semibold text-gray-900">Lagos</span>
              <svg className="w-5 h-5 text-gray-500 transform rotate-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              <span className="text-lg font-semibold text-gray-900">Ghana</span>
            </div>
            <div className="text-xl font-bold text-red-600">$300</div>
          </div>
          <span className="text-sm text-gray-500">One Way</span>
        </div>
      </div>

      {/* Lagos to Germany */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
        <div className="h-48 bg-cover bg-center" style={{backgroundImage: "url('https://images.unsplash.com/photo-1467269204594-9661b134dd2b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80')"}}></div>
        <div className="p-6">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
              <span className="text-lg font-semibold text-gray-900">Lagos</span>
              <svg className="w-5 h-5 text-gray-500 transform rotate-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              <span className="text-lg font-semibold text-gray-900">Germany</span>
            </div>
            <div className="text-xl font-bold text-red-600">$500</div>
          </div>
          <span className="text-sm text-gray-500">Round Trip</span>
        </div>
      </div>
    </div>
  </div>
</section>

{/* Popular Routes Section - Updated Design */}
<section className="py-12 sm:py-16 lg:py-20 bg-gray-50 w-full">
  <div className="w-full px-3 sm:px-4 lg:px-6">
    {/* Section Header with Navigation */}
    <div className="flex justify-between items-center mb-8 sm:mb-12">
      <div>
        <h2 className="text-2xl sm:text-2xl lg:text-2xl font-bold text-gray-900">
          Popular Routes
        </h2>
      </div>
      
      {/* Navigation Controls */}
      <div className="flex gap-2">
        <button 
          onClick={prevSlide}
          className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 transition duration-300"
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button 
          onClick={nextSlide}
          className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 transition duration-300"
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>

    {/* Routes Grid - Always 4 per row */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
      {visibleRoutes.map((route, index) => (
        <div key={index} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
          {/* Route Image */}
          <div 
            className="h-40 bg-cover bg-center"
            style={{ backgroundImage: `url('${route.image}')` }}
          ></div>
          
          {/* Route Info - Below Image */}
          <div className="p-4 sm:p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-base sm:text-lg font-semibold text-gray-900">{route.from}</span>
                {/* Airplane Icon Facing Right */}
                <svg className="w-5 h-5 text-gray-500 transform rotate-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
                <span className="text-base sm:text-lg font-semibold text-gray-900">{route.to}</span>
              </div>
              <div className="text-lg sm:text-xl font-bold text-red-600">{route.price}</div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">{route.type}</span>
            </div>
          </div>
        </div>
      ))}
    </div>

    {/* Dots Indicator */}
    <div className="flex justify-center mt-8 gap-2">
      {Array.from({ length: Math.ceil(popularRoutes.length / 4) }).map((_, index) => (
        <button
          key={index}
          onClick={() => setCurrentIndex(index * 4)}
          className={`w-2 h-2 rounded-full transition duration-300 ${
            currentIndex === index * 4 ? 'bg-blue-600' : 'bg-gray-300'
          }`}
        />
      ))}
    </div>
  </div>
</section>

{/* Trending Destinations Section */}
<section className="py-12 sm:py-16 lg:py-20 bg-white w-full">
  <div className="w-full px-3 sm:px-4 lg:px-6">
    {/* Section Header with Navigation */}
    <div className="flex justify-between items-center mb-8 sm:mb-12">
      <div>
        <h2 className="text-2xl sm:text-2xl lg:text-2xl font-bold text-gray-900">
          Trending Destinations
        </h2>
      </div>
      
      {/* Navigation Controls */}
      <div className="flex gap-2">
        <button 
          onClick={() => prevDestinationsSlide()}
          className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 transition duration-300"
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button 
          onClick={() => nextDestinationsSlide()}
          className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 transition duration-300"
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>

    {/* Destinations Grid - Always 4 per row */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {visibleDestinations.map((destination, index) => (
        <div key={index} className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          {/* Destination Image */}
          <div 
            className="h-48 bg-cover bg-center relative"
            style={{ backgroundImage: `url('${destination.image}')` }}
          >
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition duration-300"></div>
            
            {/* Flag and Country Name */}
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white">
              <div className="flex items-center gap-3">
                {/* Flag Container */}
                <div className="w-8 h-6 rounded-sm flex items-center justify-center shadow-lg">
                  {destination.flag}
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold">{destination.name}</h3>
                  {/* <p className="text-blue-100 text-sm mt-1">{destination.description}</p> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>

    {/* Dots Indicator */}
    <div className="flex justify-center mt-6 gap-2">
      {Array.from({ length: Math.ceil(destinations.length / 4) }).map((_, index) => (
        <button
          key={index}
          onClick={() => setCurrentDestinationsIndex(index * 4)}
          className={`w-2 h-2 rounded-full transition duration-300 ${
            currentDestinationsIndex === index * 4 ? 'bg-blue-600' : 'bg-gray-300'
          }`}
        />
      ))}
    </div>
  </div>
</section>
      
    </>
  );
}