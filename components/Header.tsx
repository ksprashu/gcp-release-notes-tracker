import React, { useState } from 'react';
import { ChangeType, type SortOption } from '../types';
import { changeTypeConfig } from '../constants';
import {
  SunIcon,
  MoonIcon,
  SparklesIcon,
  LoadingIcon,
  FilterIcon,
  SortAscendingIcon,
  StarIcon,
  ChevronDownIcon,
  CloudIcon,
} from './Icons';

interface HeaderProps {
  isDarkMode: boolean;
  setIsDarkMode: (value: boolean | ((val: boolean) => boolean)) => void;
  showFavoritesOnly: boolean;
  setShowFavoritesOnly: (value: boolean | ((val: boolean) => boolean)) => void;
  activeFilters: Set<ChangeType>;
  toggleFilter: (filter: ChangeType) => void;
  clearFilters: () => void;
  hasActiveFilters: boolean;
  sortOption: SortOption;
  setSortOption: (option: SortOption) => void;
  hasFavorites: boolean;
  onAiSearch: (query: string) => void;
  isAiLoading: boolean;
}

const AiSearchBar: React.FC<{ onSearch: (query: string) => void; isLoading: boolean }> = ({ onSearch, isLoading }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <div className="mt-6 mb-8">
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask Gemini about recent product changes..."
          className="w-full pl-12 pr-12 py-3 rounded-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 focus:ring-2 focus:ring-gcp-blue focus:border-transparent transition-shadow"
          disabled={isLoading}
        />
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gcp-blue">
          <SparklesIcon className="w-6 h-6" />
        </div>
        <button
          type="submit"
          disabled={isLoading || !query.trim()}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-gcp-blue text-white hover:bg-gcp-blue-dark disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors"
          aria-label="Search with AI"
        >
          {isLoading ? (
            <LoadingIcon className="w-5 h-5 animate-spin" />
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
            </svg>
          )}
        </button>
      </form>
    </div>
  );
};

const FilterPill: React.FC<{
  filter: ChangeType;
  isActive: boolean;
  onClick: (filter: ChangeType) => void;
}> = ({ filter, isActive, onClick }) => {
  const config = changeTypeConfig[filter];
  return (
    <button
      onClick={() => onClick(filter)}
      className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
        isActive
          ? `${config.bg} ${config.text} border-transparent ring-2 ${config.ring}`
          : 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700'
      }`}
    >
      <span>{config.emoji}</span>
      <span>{filter}</span>
    </button>
  );
};

export const Header: React.FC<HeaderProps> = ({
  isDarkMode,
  setIsDarkMode,
  showFavoritesOnly,
  setShowFavoritesOnly,
  activeFilters,
  toggleFilter,
  clearFilters,
  hasActiveFilters,
  sortOption,
  setSortOption,
  hasFavorites,
  onAiSearch,
  isAiLoading,
}) => {
  const [isFilterVisible, setIsFilterVisible] = useState(true);

  return (
    <header className="mb-8">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <CloudIcon className="w-10 h-10 text-gcp-blue" />
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
            GCP Release Notes
          </h1>
        </div>
      </div>

      <AiSearchBar onSearch={onAiSearch} isLoading={isAiLoading} />

      <div className="space-y-4">
        {/* Collapsible Filter Section */}
        <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg">
          <button
            onClick={() => setIsFilterVisible(!isFilterVisible)}
            className="w-full flex justify-between items-center p-3 text-left"
            aria-expanded={isFilterVisible}
          >
            <div className="flex items-center gap-3">
              <FilterIcon className="w-5 h-5 text-slate-500" />
              <span className="font-semibold">Filter by Type</span>
            </div>
            <ChevronDownIcon className={`w-5 h-5 text-slate-500 transition-transform ${isFilterVisible ? 'rotate-180' : ''}`} />
          </button>
          <div
            className={`transition-all duration-300 ease-in-out overflow-hidden ${isFilterVisible ? 'max-h-96' : 'max-h-0'}`}
          >
            <div className="p-4 border-t border-slate-200 dark:border-slate-700">
                <div className="flex flex-wrap items-center gap-3">
                  {Object.values(ChangeType).map((type) => (
                    <FilterPill
                      key={type}
                      filter={type}
                      isActive={activeFilters.has(type)}
                      onClick={toggleFilter}
                    />
                  ))}
                  {hasActiveFilters && (
                    <button
                      onClick={clearFilters}
                      className="text-sm text-gcp-blue hover:underline"
                    >
                      Clear All
                    </button>
                  )}
              </div>
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="flex items-center justify-end gap-2 sm:gap-4">
          <div className="relative">
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value as SortOption)}
              className="appearance-none bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-full pl-10 pr-8 py-2 text-sm font-medium focus:ring-2 focus:ring-gcp-blue focus:outline-none"
            >
              <option value="recent">Sort by Recent</option>
              <option value="alphabetical">Sort Alphabetical</option>
            </select>
            <SortAscendingIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
            <ChevronDownIcon className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
          </div>

          <button
            onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
            disabled={!hasFavorites && !showFavoritesOnly}
            aria-label="Show favorites"
            className={`p-2 rounded-full transition-colors ${
              showFavoritesOnly
                ? 'bg-gcp-yellow/20 text-gcp-yellow ring-2 ring-gcp-yellow'
                : 'hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed'
            }`}
          >
            <StarIcon className={`w-6 h-6 ${showFavoritesOnly ? 'text-gcp-yellow' : 'text-slate-500'}`} fill={showFavoritesOnly ? 'currentColor' : 'none'} />
          </button>

          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? <SunIcon className="w-6 h-6" /> : <MoonIcon className="w-6 h-6" />}
          </button>
        </div>
      </div>
    </header>
  );
};