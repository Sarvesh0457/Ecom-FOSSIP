import React from 'react';

export const Button = ({ 
  children, 
  onClick, 
  type = 'button', 
  variant = 'primary', 
  size = 'md', 
  disabled = false, 
  loading = false, 
  icon: Icon,
  className = '' 
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-150 focus:outline-none disabled:opacity-55 disabled:pointer-events-none cursor-pointer';

  const variants = {
    primary: 'bg-lime-400 hover:bg-lime-500 text-slate-900 shadow-md shadow-lime-500/10 active:scale-98',
    secondary: 'bg-slate-100 hover:bg-slate-200 text-slate-800 dark:bg-slate-800 dark:hover:bg-slate-705 dark:text-slate-100 active:scale-98',
    outline: 'border border-slate-200 hover:bg-slate-50 text-slate-700 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800 active:scale-98',
    danger: 'bg-rose-600 hover:bg-rose-700 text-white shadow-md shadow-rose-500/10 active:scale-98',
    ghost: 'hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 dark:hover:text-white',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs gap-1.5',
    md: 'px-4 py-2 text-sm gap-2',
    lg: 'px-5 py-2.5 text-base gap-2.5',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {loading ? (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : (
        Icon && <Icon className="w-4.5 h-4.5 shrink-0" />
      )}
      <span>{children}</span>
    </button>
  );
};

export default Button;
