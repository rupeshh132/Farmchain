import React from 'react';
import { motion } from 'motion/react';

export const LeafLoader: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <motion.svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        initial={{ rotate: -15, scale: 0.8 }}
        animate={{ 
          rotate: [15, -15, 15],
          scale: [0.9, 1.1, 0.9] 
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <motion.path
          d="M12 22C12 22 12 16 12 12C12 8 8 2 8 2C8 2 12 5.5 16 7.5C20 9.5 22 14 22 14C22 14 18 13.5 15 14.5C12 15.5 12 22 12 22Z"
          fill="currentColor"
          initial={{ pathLength: 0, opacity: 0.5 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        />
        <motion.path
          d="M12 22C12 22 12 17 9 15C6 13 2 12 2 12C2 12 5 16 7 18C9 20 12 22 12 22Z"
          fill="currentColor"
          className="opacity-70"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.7 }}
          transition={{ duration: 1.5, delay: 0.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        />
      </motion.svg>
    </div>
  );
};
