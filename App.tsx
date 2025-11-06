import React, { useState, useEffect, useMemo, useCallback } from 'react';
import type { Product, ChangeType, SortOption } from './types';
import { initialProducts } from './services/dataService';
import { getAiAssistedAnswer } from './services/geminiService';
import { Header } from './components/Header';
import { AiResponseCard } from './components/AiResponseCard';
import { ProductGrid } from './components/ProductGrid';
import { Footer } from './components/Footer';
import { UserSettingsProvider } from './contexts/UserSettingsContext';

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem('darkMode') === 'true';
    }
    return false;
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

    // Favorites filtering is now handled in ProductGrid

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
  }, [products, activeFilters, sortOption]);

  return (
    <UserSettingsProvider>
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
          />
          <Footer />
        </main>
      </div>
    </UserSettingsProvider>
  );
};

export default App;
