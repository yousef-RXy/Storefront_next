import { promises as fs } from 'fs';
import path from 'path';
import { Suspense } from 'react';
import { ShoppingBag } from 'lucide-react';

import { ProductList } from '@/components';
import { SearchBar, SortDropdown, FilterTabs } from '@/components/ui';

async function getProducts() {
  try {
    const jsonPath = path.join(process.cwd(), 'src/app/products.json');
    const fileContents = await fs.readFile(jsonPath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    throw new Error('Failed to read local product cache file');
  }
}

export default async function Page({ searchParams }) {
  const params = await searchParams;
  const query = params.search || '';
  const category = params.category || 'All';
  const sort = params.sort || 'default';

  const allProducts = await getProducts();

  const uniqueCategories = Array.from(
    new Set(allProducts.map(product => product.category)),
  );

  let filteredAndSorted = allProducts.filter(product => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(query.toLowerCase());
    const matchesCategory = category === 'All' || product.category === category;
    return matchesSearch && matchesCategory;
  });

  if (sort === 'price-asc') {
    filteredAndSorted.sort((a, b) => a.price - b.price);
  } else if (sort === 'price-desc') {
    filteredAndSorted.sort((a, b) => b.price - a.price);
  } else if (sort === 'rating-desc') {
    filteredAndSorted.sort((a, b) => b.rating.rate - a.rating.rate);
  }

  return (
    <div className="min-h-screen p-4 sm:p-6 sm:px-12">
      <nav className="max-w-7xl mx-auto flex items-center justify-between mb-12 border-b border-border-base pb-4">
        <div className="flex items-center gap-3">
          <div className="bg-brand-gold p-1.5 rounded-lg text-dark-bg">
            <ShoppingBag className="w-5 h-5 stroke-[2.5]" />
          </div>
          <span className="text-xl font-bold tracking-wide">Storefront</span>
        </div>
      </nav>

      <header className="max-w-7xl mx-auto mb-8">
        <div className="flex flex-col">
          <span className="text-brand-gold text-[11px] font-bold tracking-widest uppercase mb-4 block">
            Catalog 2025
          </span>
          <h1 className="text-5xl font-serif tracking-tight mb-4">
            <span className="text-gray-100">Curated </span>
            <span className="text-brand-gold">Products</span>
          </h1>
          <p className="text-gray-400 text-sm max-w-90 leading-relaxed">
            Browse our full collection. Search, filter by category, and sort to
            find exactly what you need.
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto">
        <div className="flex flex-col gap-4 mb-8">
          <div className="flex flex-col sm:flex-row gap-3 relative z-20">
            <div className="grow">
              <SearchBar initialValue={query} />
            </div>
            <SortDropdown currentSort={sort} />
          </div>
          <FilterTabs
            categories={uniqueCategories}
            currentCategory={category}
          />
        </div>

        <Suspense
          fallback={
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-brand-gold"></div>
            </div>
          }
        >
          <ProductList products={filteredAndSorted} searchTerm={query} />
        </Suspense>
      </main>
    </div>
  );
}
