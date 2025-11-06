import React, { useContext } from 'react';
import type { Product, Change } from '../types';
import { changeTypeConfig } from '../constants';
import { StarIcon } from './Icons';
import { UserSettingsContext } from '../contexts/UserSettingsContext';

interface ProductCardProps {
  product: Product;
  style?: React.CSSProperties;
}

const ChangeItem: React.FC<{ change: Change }> = ({ change }) => {
  const config = changeTypeConfig[change.type];
  const date = new Date(change.date);
  const formattedDate = date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

  return (
    <li className="border-b border-slate-200 dark:border-slate-700 last:border-b-0">
      <a
        href={change.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block py-3 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors duration-200"
      >
        <div className="flex gap-4">
          <div className={`mt-1 w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-lg ${config.bg} ${config.text}`}>
            {config.emoji}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${config.bg} ${config.text}`}>
                {change.type}
              </span>
              <time className="text-xs text-slate-500 dark:text-slate-400">{formattedDate}</time>
            </div>
            <p className="text-sm mt-1 text-slate-700 dark:text-slate-300">{change.description}</p>
          </div>
        </div>
      </a>
    </li>
  );
};


export const ProductCard: React.FC<ProductCardProps> = ({ product, style }) => {
  const userSettingsContext = useContext(UserSettingsContext);

  if (!userSettingsContext) {
    throw new Error('ProductCard must be used within a UserSettingsProvider');
  }

  const { settings, addFavorite, removeFavorite } = userSettingsContext;
  const isFavorited = settings.favorites.includes(product.id);

  const handleToggleFavorite = () => {
    if (isFavorited) {
      removeFavorite(product.id);
    } else {
      addFavorite(product.id);
    }
  };

  return (
    <div 
      className="bg-white dark:bg-slate-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden animate-slide-in"
      style={style}
    >
      <div className="p-5 border-b border-slate-200 dark:border-slate-700 flex justify-between items-start">
        <a 
          href={product.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 group"
        >
          <div className="w-12 h-12 flex items-center justify-center text-3xl">{product.icon}</div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-white group-hover:underline group-hover:text-gcp-blue transition-colors">{product.name}</h2>
        </a>
        <button
          onClick={handleToggleFavorite}
          className={`p-2 rounded-full transition-colors ${
            isFavorited ? 'text-gcp-yellow' : 'text-slate-400 hover:text-gcp-yellow'
          }`}
          aria-label="Favorite product"
        >
          <StarIcon className="w-6 h-6" fill={isFavorited ? 'currentColor' : 'none'} />
        </button>
      </div>
      
      <div className="p-5">
        <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wider">Recent Changes</h3>
        <ul>
          {product.changes.map(change => (
            <ChangeItem key={change.id} change={change} />
          ))}
        </ul>
      </div>
    </div>
  );
};
