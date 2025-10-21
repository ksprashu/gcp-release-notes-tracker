
import React from 'react';
import type { Product } from '../types';
import { ProductCard } from './ProductCard';
import { SearchIcon } from './Icons';

interface ProductGridProps {
  products: Product[];
  favorites: Set<string>;
  toggleFavorite: (productId: string) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({ products, favorites, toggleFavorite }) => {
  if (products.length === 0) {
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
      {products.map((product, index) => (
        <ProductCard
          key={product.id}
          product={product}
          isFavorited={favorites.has(product.id)}
          toggleFavorite={toggleFavorite}
          style={{ animationDelay: `${index * 50}ms` }}
        />
      ))}
    </div>
  );
};
