'use client';

import { useState, useRef, useEffect } from 'react';

export const BuyButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="
          w-full bg-primary hover:bg-primary-hover border font-medium py-2 px-4 rounded
          flex items-center justify-between transition-colors
        "
      >
        <span>Koupit</span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-50 bottom-full left-0 w-full mb-1 bg-white border border-gray-200 rounded shadow-lg overflow-hidden">
          <div className="py-1">
            {['Koupit zrychleně', 'Porovnat', 'Hlídat', 'Přidat do seznamu'].map((item) => (
              <button
                key={item}
                className="block w-full text-left px-4 py-2 text-sm text-text hover:bg-gray-100 hover:text-primary"
                onClick={() => setIsOpen(false)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
