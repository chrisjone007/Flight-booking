// types/index.ts
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

// Flight search parameters (for search forms)
export interface FlightSearchParams {
  from: string;
  to: string;
  departureDate: Date | null;
  returnDate: Date | null;
  travelers: number;
  tripType: 'one-way' | 'round-trip' | 'multi-city';
  cabinClass: string;
}

// Flight data (actual flight information)
export interface Flight {
  id: string;
  airline: string;
  flightNumber: string;
  departure: string;
  arrival: string;
  departureTime: string;
  arrivalTime: string;
  price: number;
  duration: string;
}

export interface Booking {
  id: string;
  flight: Flight;
  passengers: Passenger[];
  totalPrice: number;
  status: string;
}

export interface Passenger {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  passportNumber?: string;
}

// Add interface for multi-city legs if needed
export interface MultiCityLeg {
  from: string;
  to: string;
  departDate: Date | null;
}
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  phone?: string;
  dateOfBirth?: string;
  title?: string;
  middleName?: string;
  gender?: string;
  dob?: string;
  nationality?: string;
  passportCountry?: string;
  passportNumber?: string;
  passportIssueDate?: string;
  passportExpiryDate?: string;
}
export interface Airport {
  code: string;
  name: string;
  city: string;
  country: string;
}

export interface Traveller {
  id: string;
  title?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  countryCode?: string;
  dob: string;
  gender?: string;
  passportCountry?: string;
  passportNumber?: string;
  passportIssue?: string;
  passportExpiry?: string;
  nationality?: string;
}

