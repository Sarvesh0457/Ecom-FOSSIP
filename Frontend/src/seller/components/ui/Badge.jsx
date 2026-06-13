import React from 'react';

const colorMapping = {
  // Order statuses
  'Placed': 'bg-lime-50 text-lime-700 dark:bg-lime-950/35 dark:text-lime-500 border border-indigo-200/50 dark:border-indigo-850',
  'Packed': 'bg-amber-50 text-amber-700 dark:bg-amber-950/35 dark:text-amber-400 border border-amber-200/50 dark:border-amber-850',
  'Shipped': 'bg-violet-50 text-violet-700 dark:bg-violet-950/35 dark:text-violet-400 border border-violet-200/50 dark:border-violet-850',
  'Out For Delivery': 'bg-sky-50 text-sky-700 dark:bg-sky-950/35 dark:text-sky-450 border border-sky-200/50 dark:border-sky-850',
  'Delivered': 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/35 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-850',
  'Cancelled': 'bg-rose-50 text-rose-700 dark:bg-rose-950/35 dark:text-rose-450 border border-rose-200/50 dark:border-rose-850',

  // Coupon / Product status
  'Active': 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/35 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-850',
  'Inactive': 'bg-rose-50 text-rose-700 dark:bg-rose-950/35 dark:text-rose-450 border border-rose-200/50 dark:border-rose-850',
  'Expired': 'bg-slate-100 text-slate-700 dark:bg-slate-800/60 dark:text-slate-400 border border-slate-200/50 dark:border-slate-800',

  // Review status
  'Approved': 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/35 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-850',
  'Pending': 'bg-amber-50 text-amber-700 dark:bg-amber-950/35 dark:text-amber-400 border border-amber-200/50 dark:border-amber-850',
  'Rejected': 'bg-rose-50 text-rose-700 dark:bg-rose-950/35 dark:text-rose-450 border border-rose-200/50 dark:border-rose-850',
};

export const Badge = ({ content, className = '' }) => {
  const normalized = content ? content.trim() : '';
  const styles = colorMapping[normalized] || 'bg-slate-100 text-slate-850 dark:bg-slate-800 dark:text-slate-200 border border-slate-250';

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold tracking-wide ${styles} ${className}`}>
      {content}
    </span>
  );
};

export default Badge;
