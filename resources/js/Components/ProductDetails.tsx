import { useState } from 'react';
import Button from './UI/Button';
import { formatPrice } from '@/utils/formatters';
import Badge from './UI/Badge';
import Select from './UI/Select';

interface ProductDetailsProps {
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  images: string[];
  sizes: string[];
  colors?: { name: string; hex: string }[];
  inStock: boolean;
  badge?: string;
  category: string;
  sku?: string;
}

export default function ProductDetails({
  name,
  price,
  originalPrice,
  description,
  images,
  sizes,
  colors,
  inStock,
  badge,
  category,
  sku,
}: ProductDetailsProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState(colors?.[0]?.name || '');
  const [quantity, setQuantity] = useState(1);

  const hasDiscount = originalPrice && originalPrice > price;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 lg:gap-12">
      {/* Image Gallery */}
      <div className="space-y-3 md:space-y-4">
        {/* Main Image */}
        <div className="relative aspect-product bg-neutral-100 rounded-xl overflow-hidden">
          <img
            src={images[selectedImage]}
            alt={name}
            className="w-full h-full object-cover"
          />
          {badge && (
            <div className="absolute top-6 left-6">
              <Badge variant="accent" size="md">
                {badge}
              </Badge>
            </div>
          )}
        </div>

        {/* Thumbnail Gallery */}
        {images.length > 1 && (
          <div className="grid grid-cols-4 gap-2 md:gap-3">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`
                  aspect-square bg-neutral-100 rounded-lg overflow-hidden
                  border-2 transition-all
                  ${selectedImage === index ? 'border-neutral-900' : 'border-transparent hover:border-neutral-300'}
                `}
              >
                <img
                  src={image}
                  alt={`${name} view ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Product Information */}
      <div className="space-y-6 md:space-y-7 lg:space-y-8">
        {/* Header */}
        <div className="space-y-3 md:space-y-4">
          <p className="text-xs md:text-sm font-medium text-neutral-500 uppercase tracking-wider">
            {category}
          </p>
          <h1 className="font-display font-bold text-3xl md:text-3xl lg:text-4xl tracking-tight">
            {name}
          </h1>
          <div className="flex items-center gap-3 md:gap-4">
            <span className="font-display font-bold text-2xl md:text-2xl lg:text-3xl text-neutral-900">
              {formatPrice(price)}
            </span>
            {hasDiscount && (
              <span className="font-display text-lg md:text-xl text-neutral-400 line-through">
                {formatPrice(originalPrice!)}
              </span>
            )}
          </div>
          {sku && (
            <p className="text-sm text-neutral-500">SKU: {sku}</p>
          )}
        </div>

        {/* Description */}
        <div className="border-t border-neutral-200 pt-5 md:pt-6">
          <p className="text-sm md:text-base text-neutral-700 leading-relaxed">{description}</p>
        </div>

        {/* Color Selection */}
        {colors && colors.length > 0 && (
          <div className="space-y-2 md:space-y-3">
            <label className="block text-sm font-medium text-neutral-700">
              Color: <span className="font-bold">{selectedColor}</span>
            </label>
            <div className="flex gap-2 md:gap-3">
              {colors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(color.name)}
                  className={`
                    w-10 h-10 md:w-11 md:h-11 lg:w-12 lg:h-12 rounded-lg border-2 transition-all
                    ${selectedColor === color.name ? 'border-neutral-900 ring-2 ring-neutral-900 ring-offset-2' : 'border-neutral-200 hover:border-neutral-300'}
                  `}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                />
              ))}
            </div>
          </div>
        )}

        {/* Size Selection */}
        <div className="space-y-2 md:space-y-3">
          <label className="block text-sm font-medium text-neutral-700">
            Size
          </label>
          <div className="grid grid-cols-4 gap-2 md:gap-3">
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`
                  py-2.5 md:py-3 text-sm md:text-base rounded-lg border-2 font-display font-semibold transition-all
                  ${selectedSize === size
                    ? 'border-neutral-900 bg-neutral-900 text-neutral-50'
                    : 'border-neutral-200 hover:border-neutral-900'
                  }
                `}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Quantity */}
        <div className="space-y-2 md:space-y-3">
          <label className="block text-sm font-medium text-neutral-700">
            Quantity
          </label>
          <div className="flex items-center gap-3 md:gap-4">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-10 h-10 md:w-11 md:h-11 lg:w-12 lg:h-12 flex items-center justify-center border-2 border-neutral-200 rounded-lg hover:border-neutral-900 transition-colors"
            >
              <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
              </svg>
            </button>
            <span className="font-display font-bold text-lg md:text-xl min-w-[2.5rem] md:min-w-[3rem] text-center">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-10 h-10 md:w-11 md:h-11 lg:w-12 lg:h-12 flex items-center justify-center border-2 border-neutral-200 rounded-lg hover:border-neutral-900 transition-colors"
            >
              <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>
        </div>

        {/* Add to Cart */}
        <div className="space-y-3 pt-3 md:pt-4">
          <Button
            variant="primary"
            size="lg"
            fullWidth
            disabled={!inStock || !selectedSize}
          >
            {inStock ? 'Add to Cart' : 'Out of Stock'}
          </Button>
          <Button variant="outline" size="lg" fullWidth>
            Add to Wishlist
          </Button>
        </div>

        {/* Additional Info */}
        <div className="border-t border-neutral-200 pt-5 md:pt-6 space-y-3 md:space-y-4 text-xs md:text-sm">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
            </svg>
            <div>
              <p className="font-medium text-neutral-900">Free Shipping</p>
              <p className="text-neutral-600">On orders over ₹7,500</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <div>
              <p className="font-medium text-neutral-900">Easy Returns</p>
              <p className="text-neutral-600">30-day return policy</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <div>
              <p className="font-medium text-neutral-900">Secure Payment</p>
              <p className="text-neutral-600">100% secure transactions</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

