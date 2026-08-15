import React, { type ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  className = '', 
  ...props 
}) => {
  const baseStyles = "px-6 py-3 font-body font-medium rounded-[6px] transition-colors duration-200 flex items-center justify-center gap-2";
  const widthStyles = fullWidth ? "w-full" : "";
  
  const variants = {
    primary: "bg-leaf-700 hover:bg-leaf-500 text-white",
    secondary: "bg-wheat-400 hover:bg-[#cba04b] text-soil-900",
    outline: "bg-transparent border border-soil-900 text-soil-900 hover:bg-soil-900/5",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${widthStyles} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
