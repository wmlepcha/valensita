import { Link } from '@inertiajs/react';
import Badge from './UI/Badge';
import { formatPrice } from '@/utils/formatters';

interface ProductCardProps {
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

export default function ProductCard({
  id,
  name,
  price,
  originalPrice,
  image,
  hoverImage,
  badge,
  badgeVariant = 'default',
  category,
}: ProductCardProps) {
  const hasDiscount = originalPrice && originalPrice > price;

  return (
    <Link
      href={`/products/${id}`}
      className="group block animate-fade-in"
    >
      {/* Image Container */}
      <div className="relative aspect-product bg-neutral-100 rounded-lg overflow-hidden mb-4">
        {/* Main Image */}
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0"
        />
        {/* Hover Image */}
        {hoverImage && (
          <img
            src={hoverImage}
            alt={name}
            className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          />
        )}

        {/* Badge */}
        {badge && (
          <div className="absolute top-4 left-4">
            <Badge variant={badgeVariant} size="sm">
              {badge}
            </Badge>
          </div>
        )}

        {/* Quick Add Button - Shows on Hover */}
        <div className="absolute bottom-4 left-4 right-4 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          <button
            onClick={(e) => {
              e.preventDefault();
              // Handle add to cart
            }}
            className="w-full bg-neutral-900 text-neutral-50 py-3 rounded-lg font-display font-semibold hover:bg-neutral-800 transition-colors"
          >
            Quick Add
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="space-y-2">
        {category && (
          <p className="text-xs font-medium text-neutral-500 uppercase tracking-wider">
            {category}
          </p>
        )}
        <h3 className="font-display font-semibold text-lg group-hover:text-brand-600 transition-colors">
          {name}
        </h3>
        <div className="flex items-center gap-3">
          <span className="font-display font-bold text-xl text-neutral-900">
            {formatPrice(price)}
          </span>
          {hasDiscount && (
            <span className="font-display text-sm text-neutral-400 line-through">
              {formatPrice(originalPrice!)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

