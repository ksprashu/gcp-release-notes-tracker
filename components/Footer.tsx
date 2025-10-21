import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="text-center py-8 mt-12 border-t border-slate-200 dark:border-slate-700">
      <p className="text-sm text-slate-500 dark:text-slate-400">
        Built with React and Tailwind CSS.
      </p>
      <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
        Release note data is for demonstration purposes.
      </p>
    </footer>
  );
};