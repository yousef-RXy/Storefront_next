'use client';

import { useState, useRef, useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function SortDropdown({ currentSort }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const options = [
    { value: 'default', label: 'Featured' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'rating-desc', label: 'Top Rated' },
  ];

  const selectedLabel =
    options.find(opt => opt.value === currentSort)?.label || 'Featured';

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSortSelect = value => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === 'default') {
      params.delete('sort');
    } else {
      params.set('sort', value);
    }
    router.push(`${pathname}?${params.toString()}`);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full sm:w-48 shrink-0 z-10" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between bg-input-bg border border-border-base text-gray-200 text-sm rounded-lg focus:ring-1 focus:ring-brand-gold focus:border-brand-gold focus:outline-none px-4 py-2.5 h-10.5"
      >
        <span>{selectedLabel}</span>
        <span className="pointer-events-none text-gray-500 text-xs">▼</span>
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-2 bg-input-bg border border-border-base rounded-lg shadow-xl overflow-hidden py-1">
          {options.map(option => (
            <div
              key={option.value}
              onClick={() => handleSortSelect(option.value)}
              className={`px-4 py-2 text-sm cursor-pointer transition-colors ${
                currentSort === option.value
                  ? 'bg-brand-gold text-dark-bg font-medium'
                  : 'text-gray-200 hover:bg-brand-gold/80 hover:text-dark-bg'
              }`}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
