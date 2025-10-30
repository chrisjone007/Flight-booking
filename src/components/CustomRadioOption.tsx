import React from 'react';
interface CustomRadioOptionProps {
  id: string;
  value: string;
  label: string;
  name: string;
  checked: boolean;
  onChange: (value: string) => void;
}

// Use React.FC<Props> to define the functional component with its types
const CustomRadioOption: React.FC<CustomRadioOptionProps> = ({ 
  id, 
  value, 
  label, 
  name, 
  checked, 
  onChange 
}) => {
  const handleChange = () => {
    onChange(value);
  };

  return (
    <div
      className={`
        flex items-center flex-1 p-3 border rounded-lg cursor-pointer transition duration-150 ease-in-out
        ${checked 
          ? 'border-blue-500 bg-blue-50' 
          : 'border-gray-300 hover:border-gray-400'
        }
      `}
      onClick={handleChange}
    >
      <input
        type="radio"
        id={id}
        name={name}
        value={value}
        checked={checked}
        onChange={handleChange}
        className="
          appearance-none h-4 w-4 border border-gray-400 rounded-full bg-white flex-shrink-0
          checked:bg-blue-500 checked:border-blue-500 checked:ring-2 checked:ring-blue-300 focus:outline-none
        "
      />
      <label htmlFor={id} className="ml-3 text-sm font-medium text-gray-700 select-none">
        {label}
      </label>
    </div>
  );
};

export default CustomRadioOption;