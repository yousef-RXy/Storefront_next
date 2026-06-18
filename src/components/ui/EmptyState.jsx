import { ShoppingBag } from 'lucide-react';

export default function EmptyState({ value }) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center text-gray-400">
      <ShoppingBag className="w-12 h-12 mb-4 text-gray-500" />
      <p className="text-xl font-semibold text-neutral-200">No results found</p>
      <p>
        No products matched &quot;
        <span className="text-brand-gold/85 font-medium">{value}</span>&quot;.
        Try a different search term.
      </p>
    </div>
  );
}
