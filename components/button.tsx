import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'white' | 'white-outline';
  children: React.ReactNode;
}

export function Button({ variant = 'primary', children, className = '', ...props }: ButtonProps) {
  const baseStyles = 'h-[36px] px-[18px] font-semibold text-base transition-all duration-300 rounded-lg hover:rounded-[14px]';

  const variantStyles = {
    primary: 'bg-[#062F29] text-white',
    secondary: 'bg-white text-[#062F29] border border-[#D5D7DA]',
    white: 'bg-white text-[#062F29]',
    'white-outline': 'bg-transparent text-white border border-white',
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
