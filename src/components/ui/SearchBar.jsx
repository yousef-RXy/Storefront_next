'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useTransition, useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';

export default function SearchBar({ initialValue }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [value, setValue] = useState(initialValue);
  const [, startTransition] = useTransition();

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const handleSearch = term => {
    setValue(term);
    startTransition(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (term) {
        params.set('search', term);
      } else {
        params.delete('search');
      }
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  return (
    <div className="relative w-full h-full">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-4 w-4 text-gray-400" />
      </div>

      <input
        type="text"
        placeholder="Search products..."
        aria-label="Search products"
        value={value}
        onChange={e => handleSearch(e.target.value)}
        className="w-full h-10.5 pl-10 pr-10 py-2.5 bg-input-bg border border-border-base rounded-lg text-white focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold placeholder-gray-500 text-sm transition-all"
      />

      {value && (
        <button
          type="button"
          onClick={() => handleSearch('')}
          className="absolute right-3 inset-y-0 flex items-center text-gray-500 hover:text-brand-gold transition-colors focus:outline-none cursor-pointer"
          aria-label="Clear search"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
