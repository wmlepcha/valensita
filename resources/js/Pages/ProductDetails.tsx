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
      
      <div className="bg-white min-h-screen flex items-center pt-20">
        <div className="container-wide py-12 lg:py-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left Column - Images */}
            <div className="flex flex-col-reverse lg:flex-row gap-6 items-start">
              {/* Thumbnail Images (Vertical on Desktop) */}
              {product.images.length > 1 && (
                <div className="flex lg:flex-col gap-4 w-full lg:w-20 flex-shrink-0 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 justify-center lg:justify-start">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`relative w-20 aspect-square bg-gradient-to-br from-neutral-100 to-neutral-200 rounded-lg overflow-hidden border transition-all duration-200 flex-shrink-0 ${
                        selectedImage === index
                          ? 'border-neutral-900 ring-1 ring-neutral-900'
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
              )}

              {/* Main Image */}
              <div className="relative aspect-[4/5] w-full bg-gradient-to-br from-neutral-100 to-neutral-200 rounded-lg overflow-hidden shadow-sm flex-1">
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Right Column - Product Info */}
            <div className="max-w-lg mx-auto w-full space-y-8">
              {/* Header */}
              <div className="space-y-4">
                <div className="text-[10px] font-bold tracking-[0.2em] uppercase text-neutral-500">
                  {product.category}
                </div>
                <h1 className="text-3xl md:text-4xl font-medium text-neutral-900 tracking-tight">
                  {product.name}
                </h1>
                <div className="text-xl font-medium text-neutral-900">
                  ${product.price.toFixed(2)}
                </div>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  {product.description}
                </p>
              </div>

              <div className="h-px bg-neutral-100 w-full" />

              {/* Color Selection & Features */}
              <div className="flex flex-col lg:flex-row gap-8 justify-between items-start">
                <div className="space-y-4">
                  <div className="text-xs font-bold tracking-widest uppercase text-neutral-900">
                    Color: <span className="text-neutral-500 font-normal normal-case ml-2">{product.colors[selectedColor].name}</span>
                  </div>
                  <div className="flex gap-3">
                    {product.colors.map((color, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedColor(index)}
                        className={`w-8 h-8 rounded-full border transition-all duration-200 ${
                          selectedColor === index
                            ? 'ring-2 ring-neutral-900 ring-offset-2'
                            : 'border-neutral-200 hover:border-neutral-400'
                        }`}
                        style={{ backgroundColor: color.hex }}
                        aria-label={color.name}
                        title={color.name}
                      />
                    ))}
                  </div>
                </div>

                {/* Features List */}
                <div className="space-y-2 text-[10px] text-neutral-500 min-w-[140px]">
                  <div className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-neutral-400" />
                    100% Premium Cotton
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-neutral-400" />
                    Made in India
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-neutral-400" />
                    Free Shipping {'>'} $100
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-neutral-400" />
                    Easy Returns
                  </div>
                </div>
              </div>

              {/* Size Selection */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-bold tracking-widest uppercase text-neutral-900">
                    Size
                  </div>
                  <Link href="/size-guide" className="text-xs text-neutral-500 hover:text-neutral-900 underline decoration-neutral-300 underline-offset-4">
                    Size Guide
                  </Link>
                </div>
                <div className="grid grid-cols-6 gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`h-10 text-xs font-medium border rounded transition-all duration-200 ${
                        selectedSize === size
                          ? 'bg-neutral-900 text-white border-neutral-900'
                          : 'bg-white text-neutral-900 border-neutral-200 hover:border-neutral-900'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity & Add to Cart */}
              <div className="pt-6 space-y-4">
                <div className="flex gap-4 h-12">
                  {/* Quantity Selector */}
                  <div className="flex items-center border border-neutral-200 rounded w-32">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-full flex items-center justify-center hover:bg-neutral-50 transition-colors text-neutral-500 hover:text-neutral-900"
                    >
                      -
                    </button>
                    <span className="flex-1 text-center text-sm font-medium">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-full flex items-center justify-center hover:bg-neutral-50 transition-colors text-neutral-500 hover:text-neutral-900"
                    >
                      +
                    </button>
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    onClick={handleAddToCart}
                    disabled={!product.inStock}
                    className="flex-1 bg-neutral-900 text-white rounded font-bold tracking-widest uppercase text-xs hover:bg-neutral-800 transition-all disabled:bg-neutral-300 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
                  >
                    {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                  </button>
                </div>

                {/* Wishlist Button */}
                <button className="w-full h-12 border border-neutral-200 text-neutral-900 rounded font-bold tracking-widest uppercase text-xs hover:border-neutral-900 transition-colors">
                  Add to Wishlist
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
