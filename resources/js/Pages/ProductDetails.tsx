import { useState } from 'react';
import MainLayout from '../Layouts/MainLayout';
import { Head, Link } from '@inertiajs/react';

interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: number;
  images: string[];
  colors: { name: string; hex: string; }[];
  sizes: string[];
  category: string;
  inStock: boolean;
}

interface ProductDetailsProps {
  product: Product;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    // TODO: Implement add to cart functionality
    console.log({
      product: product.id,
      size: selectedSize,
      color: product.colors[selectedColor],
      quantity
    });
  };

  return (
    <MainLayout>
      <Head title={`${product.name} - VALENSITA`} />
      
      <div className="bg-white min-h-screen">
        <div className="container-wide py-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-neutral-600 mb-8">
            <Link href="/" className="hover:text-neutral-900">Home</Link>
            <span>/</span>
            <Link href="/shop" className="hover:text-neutral-900">Shop</Link>
            <span>/</span>
            <span className="text-neutral-900">{product.name}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left Column - Images */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative aspect-square bg-neutral-50 rounded-lg overflow-hidden">
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Thumbnail Images */}
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative aspect-square bg-neutral-50 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === index
                        ? 'border-neutral-900'
                        : 'border-transparent hover:border-neutral-300'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Right Column - Product Info */}
            <div className="space-y-6">
              {/* Category */}
              <div className="text-xs tracking-wider uppercase text-neutral-600">
                {product.category}
              </div>

              {/* Product Name */}
              <h1 className="font-display font-bold text-4xl lg:text-5xl text-neutral-900">
                {product.name}
              </h1>

              {/* Price */}
              <div className="text-3xl font-bold text-neutral-900">
                ${product.price.toFixed(2)}
              </div>

              {/* Description */}
              <p className="text-neutral-700 leading-relaxed">
                {product.description}
              </p>

              {/* Color Selection */}
              <div className="space-y-3">
                <div className="text-sm font-bold tracking-wider uppercase text-neutral-900">
                  Select Color
                </div>
                <div className="flex gap-3">
                  {product.colors.map((color, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedColor(index)}
                      className={`w-10 h-10 rounded-full border-2 transition-all ${
                        selectedColor === index
                          ? 'border-neutral-900 scale-110'
                          : 'border-neutral-300 hover:border-neutral-400'
                      }`}
                      style={{ backgroundColor: color.hex }}
                      aria-label={color.name}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-bold tracking-wider uppercase text-neutral-900">
                    Select Size
                  </div>
                  <Link href="/size-guide" className="text-xs text-neutral-600 hover:text-neutral-900 underline">
                    Size Guide
                  </Link>
                </div>
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-3 text-sm font-medium border rounded transition-colors ${
                        selectedSize === size
                          ? 'bg-neutral-900 text-white border-neutral-900'
                          : 'bg-white text-neutral-900 border-neutral-300 hover:border-neutral-900'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity & Add to Cart */}
              <div className="space-y-4 pt-4">
                <div className="flex gap-4">
                  {/* Quantity Selector */}
                  <div className="flex items-center border border-neutral-300 rounded">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-4 py-3 hover:bg-neutral-50 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                      </svg>
                    </button>
                    <span className="px-6 py-3 font-medium">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-4 py-3 hover:bg-neutral-50 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    onClick={handleAddToCart}
                    disabled={!product.inStock}
                    className="flex-1 bg-neutral-900 text-white py-3 px-8 rounded font-medium tracking-wider uppercase text-sm hover:bg-neutral-800 transition-colors disabled:bg-neutral-300 disabled:cursor-not-allowed"
                  >
                    {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                  </button>
                </div>

                {/* Wishlist Button */}
                <button className="w-full border border-neutral-900 text-neutral-900 py-3 px-8 rounded font-medium tracking-wider uppercase text-sm hover:bg-neutral-900 hover:text-white transition-colors">
                  Add to Wishlist
                </button>
              </div>

              {/* Product Features */}
              <div className="space-y-3 pt-6 border-t border-neutral-200">
                <div className="flex items-center gap-3 text-sm text-neutral-700">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>100% Premium Cotton</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-neutral-700">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Made in India</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-neutral-700">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Free Shipping on orders over $100</span>
                </div>
              </div>
            </div>
          </div>

          {/* Product Details Accordion */}
          <div className="mt-16 max-w-4xl">
            <details className="border-t border-neutral-200 py-6 group">
              <summary className="flex items-center justify-between cursor-pointer font-bold tracking-wider uppercase text-sm text-neutral-900">
                <span>Product Details</span>
                <svg className="w-5 h-5 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="mt-4 text-neutral-700 leading-relaxed space-y-2">
                <p>Premium quality {product.category.toLowerCase()} made with 100% cotton fabric.</p>
                <p>Features include reinforced stitching, pre-shrunk fabric, and vibrant color retention.</p>
                <p>Perfect for everyday wear with a comfortable, relaxed fit.</p>
              </div>
            </details>

            <details className="border-t border-neutral-200 py-6 group">
              <summary className="flex items-center justify-between cursor-pointer font-bold tracking-wider uppercase text-sm text-neutral-900">
                <span>Size & Fit</span>
                <svg className="w-5 h-5 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="mt-4 text-neutral-700 leading-relaxed">
                <p>Model is 6'0" and wearing size M.</p>
                <p className="mt-2">For a relaxed fit, order your regular size. For a fitted look, consider sizing down.</p>
              </div>
            </details>

            <details className="border-t border-b border-neutral-200 py-6 group">
              <summary className="flex items-center justify-between cursor-pointer font-bold tracking-wider uppercase text-sm text-neutral-900">
                <span>Care Instructions</span>
                <svg className="w-5 h-5 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="mt-4 text-neutral-700 leading-relaxed">
                <ul className="space-y-1 list-disc list-inside">
                  <li>Machine wash cold with like colors</li>
                  <li>Do not bleach</li>
                  <li>Tumble dry low</li>
                  <li>Iron on low heat if needed</li>
                </ul>
              </div>
            </details>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

