import { Link } from '@inertiajs/react';
import ProductCard from './ProductCard';
import ProductGrid from './ProductGrid';
import Button from './UI/Button';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  hoverImage?: string;
  badge?: string;
  badgeVariant?: 'default' | 'brand' | 'accent' | 'outline' | 'electric';
  category?: string;
}

interface FeaturedProductsProps {
  title: string;
  subtitle?: string;
  products: Product[];
  viewAllLink?: string;
  variant?: 'default' | 'wide';
}

export default function FeaturedProducts({
  title,
  subtitle,
  products,
  viewAllLink,
  variant = 'default',
}: FeaturedProductsProps) {
  return (
    <section className="section-spacing">
      <div className="container-wide">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <h2 className="font-display font-bold mb-3">{title}</h2>
            {subtitle && (
              <p className="text-lg text-neutral-600 max-w-2xl">
                {subtitle}
              </p>
            )}
          </div>
          {viewAllLink && (
            <Link href={viewAllLink}>
              <Button variant="outline" size="lg">
                View All
              </Button>
            </Link>
          )}
        </div>

        {/* Products Grid */}
        <ProductGrid variant={variant}>
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </ProductGrid>
      </div>
    </section>
  );
}

