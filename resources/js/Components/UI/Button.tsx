import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'accent';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
  children: ReactNode;
}

export default function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  children,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-display font-semibold tracking-tight focus-ring disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200';

  const variants = {
    primary: 'bg-neutral-900 text-neutral-50 hover:bg-neutral-800 active:bg-neutral-950',
    secondary: 'bg-brand-500 text-white hover:bg-brand-600 active:bg-brand-700',
    outline: 'border-2 border-neutral-900 text-neutral-900 hover:bg-neutral-900 hover:text-neutral-50 active:bg-neutral-950',
    ghost: 'text-neutral-900 hover:bg-neutral-100 active:bg-neutral-200',
    accent: 'gradient-accent text-white hover:opacity-90 active:opacity-80',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm rounded-md gap-2',
    md: 'px-6 py-3 text-base rounded-lg gap-2',
    lg: 'px-8 py-4 text-lg rounded-lg gap-3',
    xl: 'px-10 py-5 text-xl rounded-xl gap-3',
  };

  return (
    <button
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}

