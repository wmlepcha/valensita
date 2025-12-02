import { useState, useMemo } from 'react';
import MainLayout from '../Layouts/MainLayout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { PageProps } from '@/types';

interface SizeStock {
  name: string;
  quantity: number;
  inStock: boolean;
}

interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  colors: { name: string; hex: string; }[];
  sizes: string[];
  sizeStock?: SizeStock[];
  totalStock?: number;
  category: string;
  inStock: boolean;
  sku?: string;
  specifications?: Record<string, string>;
}

interface ProductDetailsProps {
  product: Product;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { cart } = usePage<PageProps>().props;

  // Ensure selectedColor is valid
  const hasColors = product.colors && product.colors.length > 0;
  const validSelectedColor = hasColors && selectedColor < product.colors.length ? selectedColor : 0;

  // Calculate cart quantities per size
  const cartQuantitiesBySize = useMemo(() => {
    const quantities: Record<string, number> = {};
    if (cart?.items) {
      cart.items.forEach((item: any) => {
        if (item.product_id === product.id && item.size) {
          const key = item.size;
          quantities[key] = (quantities[key] || 0) + item.quantity;
        }
      });
    }
    return quantities;
  }, [cart, product.id]);

  // Get available stock for a size (total stock minus what's in cart)
  const getAvailableStockForSize = (sizeName: string): number => {
    if (!product.sizeStock) return 0;
    const sizeStock = product.sizeStock.find(s => s.name === sizeName);
    if (!sizeStock) return 0;
    const inCart = cartQuantitiesBySize[sizeName] || 0;
    return Math.max(0, sizeStock.quantity - inCart);
  };

  // Get stock for selected size (with cart adjustment)
  const getSelectedSizeStock = (): SizeStock | null => {
    if (!selectedSize || !product.sizeStock) return null;
    const sizeStock = product.sizeStock.find(s => s.name === selectedSize);
    if (!sizeStock) return null;
    
    const availableStock = getAvailableStockForSize(selectedSize);
    return {
      ...sizeStock,
      quantity: availableStock,
      inStock: availableStock > 0 && sizeStock.inStock,
    };
  };

  const selectedSizeStock = getSelectedSizeStock();
  const maxQuantity = selectedSizeStock ? selectedSizeStock.quantity : (product.totalStock || 0);

  const handleAddToCart = async () => {
    // Only require size if sizes are available
    const hasSizes = product.sizes && product.sizes.length > 0;
    if (hasSizes && !selectedSize) {
      alert('Please select a size');
      return;
    }

    // Check stock for selected size
    if (hasSizes && selectedSize) {
      const sizeStock = getSelectedSizeStock();
      if (!sizeStock || !sizeStock.inStock) {
        alert(`Size ${selectedSize} is out of stock`);
        return;
      }
      if (quantity > sizeStock.quantity) {
        alert(`Only ${sizeStock.quantity} items available in size ${selectedSize}`);
        return;
      }
    }

    try {
      const response = await window.axios.post(route('cart.add'), {
        product_id: product.id,
        quantity: quantity,
        size: selectedSize || null,
        color: hasColors ? product.colors[validSelectedColor]?.name : null,
      });

      // Reload shared props to update cart count in header
      // The cart prop update will trigger useMemo to recalculate available stock
      router.reload({ 
        only: ['cart'],
        preserveState: true,
        preserveScroll: true,
      });
      
      // Dispatch event to update cart count immediately (fallback)
      window.dispatchEvent(new CustomEvent('cartUpdated'));
      
      // Open cart drawer instead of showing alert
      window.dispatchEvent(new CustomEvent('openCartDrawer'));
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to add item to cart';
      alert(message);
    }
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
                {product.images && product.images.length > 0 ? (
                  <img
                    src={product.images[selectedImage] || product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-neutral-400">
                    No image available
                  </div>
                )}
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
                <div className="flex items-center gap-3">
                  <span className="text-xl font-medium text-neutral-900">
                    ${product.price.toFixed(2)}
                  </span>
                  {product.originalPrice && product.originalPrice > product.price && (
                    <span className="text-lg text-neutral-400 line-through">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>
                {product.sku && (
                  <p className="text-xs text-neutral-500">SKU: {product.sku}</p>
                )}
                <p className="text-sm text-neutral-600 leading-relaxed">
                  {product.description}
                </p>
              </div>

              <div className="h-px bg-neutral-100 w-full" />

              {/* Color Selection & Specifications */}
              <div className="flex flex-col lg:flex-row gap-8 justify-between items-start">
                {product.colors && product.colors.length > 0 && (
                  <div className="space-y-4">
                    <div className="text-xs font-bold tracking-widest uppercase text-neutral-900">
                      Color: <span className="text-neutral-500 font-normal normal-case ml-2">{product.colors[validSelectedColor]?.name}</span>
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
                )}

                {/* Specifications List */}
                {product.specifications && Object.keys(product.specifications).length > 0 && (
                  <div className="space-y-2 text-[10px] text-neutral-500 min-w-[140px]">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-neutral-400" />
                        <span className="font-bold uppercase tracking-wider">{key}:</span> {value}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Size Selection - Only show if sizes are available */}
              {product.sizes && product.sizes.length > 0 && (
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
                    {product.sizes.map((size) => {
                      const sizeStock = product.sizeStock?.find(s => s.name === size);
                      const availableStock = getAvailableStockForSize(size);
                      const isOutOfStock = !sizeStock || !sizeStock.inStock || availableStock <= 0;
                      
                      return (
                        <button
                          key={size}
                          onClick={() => {
                            if (!isOutOfStock) {
                              setSelectedSize(size);
                              // Reset quantity to 1 when changing size
                              setQuantity(1);
                            }
                          }}
                          disabled={isOutOfStock}
                          className={`h-10 text-xs font-medium border rounded transition-all duration-200 relative ${
                            selectedSize === size
                              ? 'bg-neutral-900 text-white border-neutral-900'
                              : isOutOfStock
                              ? 'bg-neutral-100 text-neutral-400 border-neutral-200 cursor-not-allowed opacity-50'
                              : 'bg-white text-neutral-900 border-neutral-200 hover:border-neutral-900'
                          }`}
                          title={isOutOfStock ? 'Out of Stock' : `${availableStock} available`}
                        >
                          {size}
                          {!isOutOfStock && availableStock > 0 && (
                            <span className="absolute -top-1 -right-1 text-[8px] bg-neutral-900 text-white rounded-full w-4 h-4 flex items-center justify-center">
                              {availableStock}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                  {selectedSize && selectedSizeStock && (
                    <p className="text-xs text-neutral-500">
                      {selectedSizeStock.quantity} available in size {selectedSize}
                    </p>
                  )}
                </div>
              )}

              {/* Quantity & Add to Cart */}
              <div className="pt-6 space-y-4">
                {product.inStock ? (
                  <>
                    <div className="flex gap-4 h-12">
                      {/* Quantity Selector */}
                      <div className="flex items-center border border-neutral-200 rounded w-32">
                        <button
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          disabled={quantity <= 1}
                          className="w-10 h-full flex items-center justify-center hover:bg-neutral-50 transition-colors text-neutral-500 hover:text-neutral-900 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          -
                        </button>
                        <span className="flex-1 text-center text-sm font-medium">{quantity}</span>
                        <button
                          onClick={() => {
                            const maxQty = selectedSize && selectedSizeStock 
                              ? selectedSizeStock.quantity 
                              : (product.totalStock || 999);
                            setQuantity(Math.min(maxQty, quantity + 1));
                          }}
                          disabled={quantity >= maxQuantity}
                          className="w-10 h-full flex items-center justify-center hover:bg-neutral-50 transition-colors text-neutral-500 hover:text-neutral-900 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          +
                        </button>
                      </div>

                      {/* Add to Cart Button */}
                      <button
                        onClick={handleAddToCart}
                        disabled={
                          (product.sizes && product.sizes.length > 0 && !selectedSize) ||
                          (selectedSize && selectedSizeStock && !selectedSizeStock.inStock) ||
                          quantity > maxQuantity
                        }
                        className="flex-1 bg-neutral-900 text-white rounded font-bold tracking-widest uppercase text-xs hover:bg-neutral-800 transition-all disabled:bg-neutral-300 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
                      >
                        Add to Cart
                      </button>
                    </div>

                    {/* Wishlist Button */}
                    <button className="w-full h-12 border border-neutral-200 text-neutral-900 rounded font-bold tracking-widest uppercase text-xs hover:border-neutral-900 transition-colors">
                      Add to Wishlist
                    </button>
                  </>
                ) : (
                  <>
                    {/* Out of Stock Button */}
                    <button
                      disabled
                      className="w-full h-12 bg-neutral-300 text-neutral-500 rounded font-bold tracking-widest uppercase text-xs cursor-not-allowed shadow-sm"
                    >
                      Out of Stock
                    </button>

                    {/* Wishlist Button - Still available when out of stock */}
                    <button className="w-full h-12 border border-neutral-200 text-neutral-900 rounded font-bold tracking-widest uppercase text-xs hover:border-neutral-900 transition-colors">
                      Add to Wishlist
                    </button>
                  </>
                )}
              </div>

            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
