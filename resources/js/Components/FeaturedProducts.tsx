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
          <div className="flex items-start justify-between mb-10 xl:mb-12 2xl:mb-16 gap-6 xl:gap-8 2xl:gap-10">
            <div className="space-y-2 xl:space-y-3 2xl:space-y-4">
              <p className="text-[11px] xl:text-xs 2xl:text-sm font-semibold tracking-[0.4em] uppercase text-neutral-500">
                {title}
              </p>
              {subtitle && (
                <p className="text-xs xl:text-sm 2xl:text-base text-neutral-400 uppercase tracking-[0.2em]">
                  {subtitle}
                </p>
              )}
            </div>
            {viewAllLink && (
              <Link
                href={viewAllLink}
                className="text-[11px] xl:text-xs 2xl:text-sm tracking-[0.3em] uppercase border border-neutral-900 rounded-full px-6 py-2 xl:px-8 xl:py-2.5 2xl:px-10 2xl:py-3 text-neutral-900 hover:bg-neutral-900 hover:text-neutral-50 transition-colors"
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
      </div>

        {/* Products Grid */}
        {isSimple ? (
          <div className="container-wide">
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
                      <span className="px-3 py-1 bg-gradient-to-br from-neutral-100 to-neutral-200 text-neutral-900 text-[10px] font-semibold uppercase tracking-wider rounded-full">
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
                  <h3 className="text-sm font-medium text-neutral-900 group-hover:text-neutral-600 transition-colors">
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
          </div>
        ) : isEditorial ? (
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0">
            {products.map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.slug || product.id}`}
                className="group block"
              >
                <div className="relative aspect-square overflow-hidden mb-4" style={{ background: 'linear-gradient(135deg, #f5f5f5 0%, #e5e5e5 100%)' }}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className={`absolute inset-0 w-full h-full object-cover opacity-100 transition-opacity duration-700 ease-in-out ${
                      product.hoverImage ? 'group-hover:opacity-0' : ''
                    }`}
                  />
                  {product.hoverImage && (
                    <img
                      src={product.hoverImage}
                      alt={product.name}
                      className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-700 ease-in-out group-hover:opacity-100"
                    />
                  )}
                  {product.badge && (
                    <div className="absolute top-3 left-3 z-10">
                      <span className="px-3 py-1 bg-gradient-to-br from-neutral-100 to-neutral-200 text-neutral-900 text-[10px] font-semibold uppercase tracking-wider rounded-full">
                        {product.badge}
                      </span>
                    </div>
                  )}
                </div>
                <div className="px-4 space-y-1">
                  {product.category && (
                    <p className="text-[10px] font-semibold text-neutral-500 uppercase tracking-wider">
                      {product.category}
                    </p>
                  )}
                  <p className="text-sm font-medium text-neutral-900">
                    {product.name}
                  </p>
                  <span className="text-sm font-bold text-neutral-900">
                    {formatPrice(product.price)}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="container-wide">
          <ProductGrid variant={gridVariant}>
            {products.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </ProductGrid>
          </div>
        )}
    </section>
  );
}

