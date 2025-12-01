import { Link, router } from '@inertiajs/react';
import { useState } from 'react';
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
  slug?: string;
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
  slug,
}: ProductCardProps) {
  const [isAdding, setIsAdding] = useState(false);
  const hasDiscount = originalPrice && originalPrice > price;

  const handleQuickAdd = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsAdding(true);
    
    try {
      // If we have a slug, fetch product details to get available sizes and colors
      if (slug) {
        const productResponse = await window.axios.get(`/product/${slug}`);
        const product = productResponse.data.props?.product || productResponse.data.product;
        
        // Use first available size and color, or null
        const size = product?.sizes?.[0] || null;
        const color = product?.colors?.[0]?.name || null;
        
        // If sizes exist but none selected, redirect to product page for user to select
        if (product?.sizes?.length > 0 && !size) {
          router.visit(`/product/${slug}`);
          return;
        }
        
        await window.axios.post(route('cart.add'), {
          product_id: id,
          quantity: 1,
          size: size,
          color: color,
        });
        
        // Reload page to update cart count
        router.reload({ only: ['cart'] });
        
        // Open cart drawer instead of showing alert
        window.dispatchEvent(new CustomEvent('openCartDrawer'));
      } else {
        // No slug available, can't do Quick Add - redirect to shop
        router.visit('/shop');
      }
    } catch (error: any) {
      // If product fetch fails or add fails, redirect appropriately
      if (error.response?.status === 404 || error.response?.status === 400) {
        if (slug) {
          router.visit(`/product/${slug}`);
        } else {
          // No slug, redirect to shop
          router.visit('/shop');
        }
      } else {
        const message = error.response?.data?.message || 'Failed to add item to cart';
        alert(message);
      }
    } finally {
      setIsAdding(false);
    }
  };

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
            onClick={handleQuickAdd}
            disabled={isAdding}
            className="w-full bg-neutral-900 text-neutral-50 py-3 rounded-lg font-display font-semibold hover:bg-neutral-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isAdding ? 'Adding...' : 'Quick Add'}
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
        <h3 className="font-display font-semibold text-lg group-hover:text-neutral-600 transition-colors">
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

