import { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'brand' | 'accent' | 'outline' | 'electric';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function Badge({
  children,
  variant = 'default',
  size = 'md',
  className = '',
}: BadgeProps) {
  const baseStyles = 'inline-flex items-center justify-center font-medium tracking-tight';

  const variants = {
    default: 'bg-neutral-900 text-neutral-50',
    brand: 'bg-gradient-to-br from-neutral-100 to-neutral-200 text-neutral-900',
    accent: 'bg-gradient-to-br from-neutral-100 to-neutral-200 text-neutral-900',
    outline: 'border-2 border-neutral-900 text-neutral-900 bg-transparent',
    electric: 'bg-gradient-to-br from-neutral-100 to-neutral-200 text-neutral-900',
  };

  const sizes = {
    sm: 'px-2 py-1 text-xs rounded',
    md: 'px-3 py-1.5 text-sm rounded-md',
    lg: 'px-4 py-2 text-base rounded-lg',
  };

  return (
    <span
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
    >
      {children}
    </span>
  );
}

