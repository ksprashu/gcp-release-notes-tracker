import React, { useMemo } from 'react';
import { marked } from 'marked';
import { SparklesIcon } from './Icons';

interface AiResponseCardProps {
  isLoading: boolean;
  response: string | null;
  error: string | null;
  onClear: () => void;
}

const LoadingSkeleton: React.FC = () => (
  <div className="space-y-3">
    <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4 animate-pulse"></div>
    <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/2 animate-pulse"></div>
    <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-5/6 animate-pulse"></div>
  </div>
);

export const AiResponseCard: React.FC<AiResponseCardProps> = ({ isLoading, response, error, onClear }) => {
  const htmlResponse = useMemo(() => {
    if (!response) return '';
    return marked.parse(response) as string;
  }, [response]);

  if (!isLoading && !response && !error) {
    return null;
  }

  return (
    <div className="mb-6 p-5 rounded-lg bg-white dark:bg-slate-800 shadow-lg border border-slate-200 dark:border-slate-700 animate-fade-in relative">
      <div className="flex items-center gap-3 mb-4">
        <SparklesIcon className="w-6 h-6 text-gcp-blue" />
        <h3 className="text-lg font-bold text-slate-800 dark:text-white">Gemini's Answer</h3>
      </div>

      <button
        onClick={onClear}
        className="absolute top-3 right-3 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full transition-colors"
        aria-label="Clear AI response"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {isLoading && <LoadingSkeleton />}
      
      {error && <p className="text-red-500">{error}</p>}
      
      {response && (
        <div 
          className="prose prose-sm dark:prose-invert max-w-none prose-p:my-2 prose-ul:my-2" 
          dangerouslySetInnerHTML={{ __html: htmlResponse }} 
        />
      )}
    </div>
  );
};