import React, { useState } from 'react';
import { motion } from 'motion/react';

interface AuthInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  error?: string;
}

export const AuthInput: React.FC<AuthInputProps> = ({ 
  label, 
  id, 
  type = "text", 
  error, 
  className = "",
  ...props 
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className={`w-full relative ${className}`}>
      <input
        id={id}
        type={type}
        onFocus={(e) => {
          setIsFocused(true);
          if (props.onFocus) props.onFocus(e);
        }}
        onBlur={(e) => {
          setIsFocused(false);
          if (props.onBlur) props.onBlur(e);
        }}
        className={`peer w-full bg-transparent border-b-2 py-3 outline-none transition-colors duration-300 font-body text-soil-900
          ${error ? 'border-red-500 focus:border-red-500' : 'border-border focus:border-primary'}
          ${isFocused ? 'border-opacity-100' : 'border-opacity-60'}`}
        {...props}
      />
      <label 
        htmlFor={id} 
        className={`absolute left-0 transition-all duration-300 font-body pointer-events-none
          ${isFocused || props.value ? '-top-5 text-xs text-soil-700 font-medium' : 'top-3 text-base text-soil-500'}
          peer-autofill:-top-5 peer-autofill:text-xs peer-autofill:text-soil-700 peer-autofill:font-medium`}
      >
        {label}
      </label>
      {error && (
        <motion.p 
          initial={{ opacity: 0, y: -10 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="text-xs text-red-500 mt-1 font-body absolute -bottom-5"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
};
