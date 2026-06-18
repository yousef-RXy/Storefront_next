'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function FilterTabs({ categories, currentCategory }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const allCategories = ['All', ...categories];

  const handleCategorySelect = category => {
    const params = new URLSearchParams(searchParams.toString());
    if (category === 'All') {
      params.delete('category');
    } else {
      params.set('category', category);
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="w-full">
      <div className="flex flex-wrap sm:flex-nowrap gap-2">
        {allCategories.map(category => {
          const isActive = currentCategory === category;
          return (
            <button
              key={category}
              onClick={() => handleCategorySelect(category)}
              className={`grow basis-[28%] sm:grow-0 sm:basis-auto whitespace-nowrap rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-200 text-center capitalize ${
                isActive
                  ? 'bg-brand-gold text-dark-bg shadow-lg shadow-brand-gold/20'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200'
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>
    </div>
  );
}
