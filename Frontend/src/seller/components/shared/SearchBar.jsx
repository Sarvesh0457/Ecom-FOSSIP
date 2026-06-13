import React from 'react';
import { FiSearch, FiX } from 'react-icons/fi';

export const SearchBar = ({ value, onChange, placeholder = "Search...", children }) => {
  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 w-full p-4 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-xl transition-colors">
      {/* Search Input field */}
      <div className="relative flex-1 min-w-[200px]">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
          <FiSearch className="w-4.5 h-4.5" />
        </span>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-9.5 pr-8 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs md:text-sm focus:outline-none focus:ring-1 focus:ring-lime-500/50 focus:border-lime-500 text-slate-900 dark:text-slate-100 transition-all"
        />
        {value && (
          <button 
            onClick={() => onChange('')}
            className="absolute inset-y-0 right-0 flex items-center pr-2.5 text-slate-400 hover:text-slate-650"
          >
            <FiX className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Slots for filters / action buttons */}
      {children && (
        <div className="flex flex-wrap items-center gap-2">
          {children}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
