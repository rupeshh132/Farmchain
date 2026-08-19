import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  noPadding?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className = '', noPadding = false }) => {
  return (
    <div 
      className={`bg-white border border-[#E5E9E3] rounded-2xl shadow-none transition-transform hover:-translate-y-1 duration-200 ${noPadding ? '' : 'p-6 md:p-8'} ${className}`}
    >
      {children}
    </div>
  );
};
