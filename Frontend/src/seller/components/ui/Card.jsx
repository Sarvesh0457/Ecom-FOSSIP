import React from 'react';

export const Card = ({ title, subtitle, action, children, className = '' }) => {
  return (
    <div className={`glass-card p-5 transition-shadow duration-200 hover:shadow-md ${className}`}>
      {(title || subtitle || action) && (
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100 dark:border-slate-800/80">
          <div>
            {title && <h3 className="text-base font-bold text-slate-800 dark:text-white">{title}</h3>}
            {subtitle && <p className="text-xs text-slate-450 dark:text-slate-400 mt-0.5">{subtitle}</p>}
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </div>
      )}
      <div>{children}</div>
    </div>
  );
};

export default Card;
