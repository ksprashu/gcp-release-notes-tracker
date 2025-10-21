
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import type { Product, ChangeType, SortOption } from './types';
import { initialProducts } from './services/dataService';
import { getAiAssistedAnswer } from './services/geminiService';
import { Header } from './components/Header';
import { AiResponseCard } from './components/AiResponseCard';
import { ProductGrid } from './components/ProductGrid';
import { Footer } from './components/Footer';

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem('darkMode') === 'true';
    }
    return false;
  });
  const [favorites, setFavorites] = useState<Set<string>>(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const savedFavorites = localStorage.getItem('favorites');
      return new Set(savedFavorites ? JSON.parse(savedFavorites) : []);
    }
    return new Set();
  });
  const [showFavoritesOnly, setShowFavoritesOnly] = useState<boolean>(false);
  const [activeFilters, setActiveFilters] = useState<Set<ChangeType>>(new Set());
  const [sortOption, setSortOption] = useState<SortOption>('recent');
  
  // AI Assistant State
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState<boolean>(false);
  const [aiError, setAiError] = useState<string | null>(null);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  }, [isDarkMode]);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(Array.from(favorites)));
  }, [favorites]);

  const handleAiSearch = useCallback(async (query: string) => {
    if (!query) return;
    setIsAiLoading(true);
    setAiResponse(null);
    setAiError(null);
    try {
      const response = await getAiAssistedAnswer(query, products);
      setAiResponse(response);
    } catch (error) {
      console.error("AI search failed:", error);
      setAiError("Sorry, I couldn't get an answer. Please try again.");
    } finally {
      setIsAiLoading(false);
    }
  }, [products]);

  const clearAiResponse = useCallback(() => {
    setAiResponse(null);
    setAiError(null);
  }, []);

  const toggleFavorite = useCallback((productId: string) => {
    setFavorites(prevFavorites => {
      const newFavorites = new Set(prevFavorites);
      if (newFavorites.has(productId)) {
        newFavorites.delete(productId);
      } else {
        newFavorites.add(productId);
      }
      return newFavorites;
    });
  }, []);
  
  const toggleFilter = useCallback((filter: ChangeType) => {
    setActiveFilters(prevFilters => {
      const newFilters = new Set(prevFilters);
      if (newFilters.has(filter)) {
        newFilters.delete(filter);
      } else {
        newFilters.add(filter);
      }
      return newFilters;
    });
  }, []);

  const clearFilters = useCallback(() => {
    setActiveFilters(new Set());
  }, []);

  const displayedProducts = useMemo(() => {
    let filteredProducts = [...products];

    if (showFavoritesOnly) {
      filteredProducts = filteredProducts.filter(p => favorites.has(p.id));
    }

    if (activeFilters.size > 0) {
      filteredProducts = filteredProducts
        .map(product => ({
          ...product,
          changes: product.changes.filter(change => activeFilters.has(change.type)),
        }))
        .filter(product => product.changes.length > 0);
    }
    
    if (sortOption === 'alphabetical') {
      filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === 'recent') {
      filteredProducts.sort((a, b) => {
        const dateA = a.changes.length > 0 ? new Date(a.changes[0].date).getTime() : 0;
        const dateB = b.changes.length > 0 ? new Date(b.changes[0].date).getTime() : 0;
        return dateB - dateA;
      });
    }

    return filteredProducts;
  }, [products, showFavoritesOnly, favorites, activeFilters, sortOption]);

  return (
    <div className="min-h-screen font-sans text-slate-800 dark:text-slate-200">
      <main className="container mx-auto px-4 py-8">
        <Header 
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
          showFavoritesOnly={showFavoritesOnly}
          setShowFavoritesOnly={setShowFavoritesOnly}
          activeFilters={activeFilters}
          toggleFilter={toggleFilter}
          clearFilters={clearFilters}
          hasActiveFilters={activeFilters.size > 0}
          sortOption={sortOption}
          setSortOption={setSortOption}
          hasFavorites={favorites.size > 0}
          onAiSearch={handleAiSearch}
          isAiLoading={isAiLoading}
        />
        <AiResponseCard 
          isLoading={isAiLoading}
          response={aiResponse}
          error={aiError}
          onClear={clearAiResponse}
        />
        <ProductGrid 
          products={displayedProducts}
          favorites={favorites}
          toggleFavorite={toggleFavorite}
        />
        <Footer />
      </main>
    </div>
  );
};

export default App;