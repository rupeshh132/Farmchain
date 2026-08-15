import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  noPadding?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className = '', noPadding = false }) => {
  const paddingStyle = noPadding ? '' : 'p-6';
  return (
    <div className={`bg-white border border-border rounded-[8px] shadow-sm ${paddingStyle} ${className}`} style={{ boxShadow: '0 1px 2px rgba(58,46,34,0.06)' }}>
      {children}
    </div>
  );
};
