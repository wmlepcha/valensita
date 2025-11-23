import { Link } from '@inertiajs/react';
import ProductCard from './ProductCard';
import ProductGrid from './ProductGrid';
import Button from './UI/Button';
import { formatPrice } from '@/utils/formatters';

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
  slug?: string;
}

interface FeaturedProductsProps {
  title: string;
  subtitle?: string;
  products: Product[];
  viewAllLink?: string;
  variant?: 'default' | 'wide' | 'editorial' | 'simple';
}

export default function FeaturedProducts({
  title,
  subtitle,
  products,
  viewAllLink,
  variant = 'default',
}: FeaturedProductsProps) {
  const isEditorial = variant === 'editorial';
  const isSimple = variant === 'simple';
  const gridVariant = variant === 'wide' ? 'wide' : 'default';
  const sectionClassName = [
    'section-spacing',
    isEditorial ? 'bg-neutral-100 py-16' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <section className={sectionClassName}>
      <div className="container-wide">
        {/* Header */}
        {isEditorial ? (
          <div className="flex items-start justify-between mb-10 gap-6">
            <div className="space-y-2">
              <p className="text-[11px] font-semibold tracking-[0.4em] uppercase text-neutral-500">
                {title}
              </p>
              {subtitle && (
                <p className="text-xs text-neutral-400 uppercase tracking-[0.2em]">
                  {subtitle}
                </p>
              )}
            </div>
            {viewAllLink && (
              <Link
                href={viewAllLink}
                className="text-[11px] tracking-[0.3em] uppercase border border-neutral-900 rounded-full px-6 py-2 text-neutral-900 hover:bg-neutral-900 hover:text-neutral-50 transition-colors"
              >
                Discover More
              </Link>
            )}
          </div>
        ) : (
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
        )}

        {/* Products Grid */}
        {isSimple ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.slug || product.id}`}
                className="group block"
              >
                <div className="relative aspect-[3/4] bg-neutral-100 rounded-lg overflow-hidden mb-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {product.badge && (
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 bg-brand-500 text-white text-[10px] font-semibold uppercase tracking-wider rounded-full">
                        {product.badge}
                      </span>
                    </div>
                  )}
                </div>
                <div className="space-y-1">
                  {product.category && (
                    <p className="text-[10px] font-semibold text-neutral-500 uppercase tracking-wider">
                      {product.category}
                    </p>
                  )}
                  <h3 className="text-sm font-medium text-neutral-900 group-hover:text-brand-600 transition-colors">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-neutral-900">
                      {formatPrice(product.price)}
                    </span>
                    {product.originalPrice && product.originalPrice > product.price && (
                      <span className="text-xs text-neutral-400 line-through">
                        {formatPrice(product.originalPrice)}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : isEditorial ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
            {products.map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.slug || product.id}`}
                className="group block"
              >
                <div className="relative h-[360px] sm:h-[420px] lg:h-[480px] overflow-hidden bg-neutral-900">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="absolute inset-0 w-full h-full object-cover object-center scale-110 group-hover:scale-100 transition-transform duration-[1200ms]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-transparent opacity-70" />
                  <div className="absolute top-6 left-6 text-[10px] uppercase tracking-[0.35em] text-white/70">
                    {product.badge ?? 'Latest Drop'}
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-6 flex items-center justify-between text-white">
                    <div className="space-y-1">
                      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/70">
                        {product.category ?? 'Valensita'}
                      </p>
                      <p className="text-sm font-medium uppercase tracking-[0.15em]">
                        {product.name}
                      </p>
                    </div>
                    <span className="text-xs tracking-[0.2em] text-white/70">
                      {formatPrice(product.price)}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <ProductGrid variant={gridVariant}>
            {products.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </ProductGrid>
        )}
      </div>
    </section>
  );
}

