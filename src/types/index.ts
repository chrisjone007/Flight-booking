// types/index.ts
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

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