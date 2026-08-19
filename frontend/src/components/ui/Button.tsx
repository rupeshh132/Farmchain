import React, { type ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md',
  fullWidth = false, 
  className = '', 
  ...props 
}) => {
  const baseStyles = "font-sans font-semibold rounded-full transition-all duration-200 flex items-center justify-center gap-2 border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C6F135] focus-visible:ring-offset-2 active:scale-95";
  
  const sizes = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  };

  const widthStyles = fullWidth ? "w-full" : "";
  
  const variants = {
    primary: "bg-[#C6F135] hover:bg-[#b5e022] text-[#14251B] border-transparent",
    secondary: "bg-[#0B2E1E] hover:bg-[#0a2719] text-white border-transparent",
    outline: "bg-transparent border-[#0B2E1E] text-[#14251B] hover:bg-[#0B2E1E] hover:text-white",
  };

  return (
    <button 
      className={`${baseStyles} ${sizes[size]} ${variants[variant]} ${widthStyles} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
