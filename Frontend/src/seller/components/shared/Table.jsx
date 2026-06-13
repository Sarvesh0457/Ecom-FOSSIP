import React from 'react';

export const Table = ({ headers, items, renderRow, loading, emptyMessage = "No items found" }) => {
  return (
    <div className="w-full overflow-x-auto rounded-xl border border-slate-200/60 dark:border-slate-800/80 bg-white dark:bg-slate-900 transition-colors">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-slate-50/75 dark:bg-slate-900/50 border-b border-slate-200/60 dark:border-slate-800/80">
            {headers.map((h, i) => (
              <th 
                key={i} 
                className="px-5 py-3.5 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider whitespace-nowrap"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-150 dark:divide-slate-800/60">
          {loading ? (
            <tr>
              <td colSpan={headers.length} className="px-5 py-12 text-center">
                <div className="flex flex-col items-center justify-center gap-3">
                  <div className="w-8 h-8 border-3 border-lime-500 border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-sm text-slate-500 dark:text-slate-400 font-medium">Fetching records...</span>
                </div>
              </td>
            </tr>
          ) : items.length === 0 ? (
            <tr>
              <td colSpan={headers.length} className="px-5 py-16 text-center">
                <p className="text-sm text-slate-450 dark:text-slate-400 font-medium">{emptyMessage}</p>
              </td>
            </tr>
          ) : (
            items.map((item, idx) => (
              <tr 
                key={item._id || idx} 
                className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors duration-150"
              >
                {renderRow(item, idx)}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
