import React, { useContext, useMemo } from 'react';
import type { Product } from '../types';
import { ProductCard } from './ProductCard';
import { SearchIcon } from './Icons';
import { UserSettingsContext } from '../contexts/UserSettingsContext';

interface ProductGridProps {
  products: Product[];
}

export const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  const userSettingsContext = useContext(UserSettingsContext);

  if (!userSettingsContext) {
    throw new Error('ProductGrid must be used within a UserSettingsProvider');
  }

  const { settings } = userSettingsContext;

  const derivedProducts = useMemo(() => {
    let filteredProducts = [...products];

    // Filtering logic
    if (settings.filter.category) {
      filteredProducts = filteredProducts.filter(p => p.name.toLowerCase().includes(settings.filter.category.toLowerCase()));
    }

    // Sorting logic
    if (settings.sortBy === 'name') {
      filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
    } else if (settings.sortBy === 'category') {
      filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
    }


    return filteredProducts;
  }, [products, settings]);

  if (derivedProducts.length === 0) {
    return (
      <div className="text-center py-20 animate-fade-in">
        <SearchIcon className="w-16 h-16 mx-auto text-slate-400 dark:text-slate-500 mb-4" />
        <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-300">No Matching Products Found</h3>
        <p className="text-slate-500 dark:text-slate-400 mt-2">Try adjusting your filters or clearing them to see all release notes.</p>
      </div>
    )
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {derivedProducts.map((product, index) => (
        <ProductCard
          key={product.id}
          product={product}
          style={{ animationDelay: `${index * 50}ms` }}
        />
      ))}
    </div>
  );
};
