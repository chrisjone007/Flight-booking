"use client";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface CustomDatePickerProps {
  selected: Date | null;
  onChange: (date: Date | null) => void;
  placeholderText: string;
  minDate?: Date;
}

export default function CustomDatePicker({ 
  selected, 
  onChange, 
  placeholderText, 
  minDate 
}: CustomDatePickerProps) {
  return (
    <DatePicker
      selected={selected}
      onChange={onChange}
      placeholderText={placeholderText}
      dateFormat="dd MMM yyyy"
      minDate={minDate}
      className="w-full p-3 bg-white border border-gray-300 rounded text-gray-900 placeholder-gray-500 focus:ring-1 focus:ring-blue-500 focus:border-transparent text-base pr-10"
      wrapperClassName="w-full"
    />
  );
}