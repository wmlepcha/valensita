import { ReactNode } from 'react';

interface ProductGridProps {
  children: ReactNode;
  variant?: 'default' | 'wide';
}

export default function ProductGrid({ children, variant = 'default' }: ProductGridProps) {
  return (
    <div className={variant === 'wide' ? 'grid-products-wide' : 'grid-products'}>
      {children}
    </div>
  );
}

