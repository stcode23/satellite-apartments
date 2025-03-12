import { useState, useEffect } from "react";

interface DropdownProps {
  options: string[];
  onSelect: (value: string) => void;
  placeholder?: string;
  buttonClassName?: string;
  dropdownClassName?: string;
  initialValue?: string; // Allow setting an initial value
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  onSelect,
  placeholder = "Select an option",
  buttonClassName = "",
  dropdownClassName = "",
  initialValue = "",
}) => {
  const [selected, setSelected] = useState<string>(initialValue || ""); // Ensure a string

  useEffect(() => {
    setSelected(initialValue || ""); // Update if initialValue changes
  }, [initialValue]);

  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option: string) => {
    setSelected(option);
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full text-left bg-white rounded-lg pl-4 py-2 flex justify-between items-center hover:bg-gray-100 transition ${buttonClassName}`}
      >
        <p className="whitespace-nowrap truncate">{selected || placeholder}</p>
        <span
          className="ml-2 transform transition-transform"
          style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m19.5 8.25-7.5 7.5-7.5-7.5"
            />
          </svg>
        </span>
      </button>
      {isOpen && (
        <ul
          className={`absolute right-0 z-10 mt-1 w-[250px] bg-white border border-gray-300 overflow-hidden rounded-lg shadow-lg ${dropdownClassName}`}
        >
          {options.map((option) => (
            <li
              key={option}
              onClick={() => handleSelect(option)}
              className="px-4 py-2 hover:bg-gray-200 border-b rounded-lg cursor-pointer"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
