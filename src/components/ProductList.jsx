import { ProductCard } from './';
import { EmptyState } from './ui';

export default function ProductList({ products, searchTerm }) {
  if (!products || products.length === 0) {
    return <EmptyState value={searchTerm} />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 max-w-7xl mx-auto">
      {products.map((product, index) => (
        <ProductCard key={product.id} product={product} priority={index < 4} />
      ))}
    </div>
  );
}
