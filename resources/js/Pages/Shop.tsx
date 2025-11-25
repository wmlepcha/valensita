import { useState } from 'react';
import MainLayout from '../Layouts/MainLayout';
import { Head, Link } from '@inertiajs/react';

interface Product {
  id: number;
  name: string;
  slug: string;
  price: number;
  image: string;
  category: string;
}

interface ShopProps {
  products: Product[];
}

export default function Shop({ products }: ShopProps) {
  const [sortBy, setSortBy] = useState('recommended');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState([0, 10000]);

  const categories = [
    { name: 'All', value: null },
    { name: 'T-Shirts', value: 'tshirts' },
    { name: 'Hoodies', value: 'hoodies' },
    { name: 'Oversized', value: 'oversized' },
  ];

  const sizes = ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'];

  const sortOptions = [
    { label: 'Recommended', value: 'recommended' },
    { label: 'Newest', value: 'newest' },
    { label: 'Price: Low to High', value: 'price_asc' },
    { label: 'Price: High to Low', value: 'price_desc' },
  ];

  // Filter and sort products
  const filteredProducts = products
    .filter((product) => {
      if (selectedCategory && product.category.toLowerCase() !== selectedCategory) {
        return false;
      }
      if (product.price < priceRange[0] || product.price > priceRange[1]) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price_asc':
          return a.price - b.price;
        case 'price_desc':
          return b.price - a.price;
        case 'newest':
          return b.id - a.id;
        default:
          return 0;
      }
    });

  return (
    <MainLayout>
      <Head title="Shop - VALENSITA" />

      <div className="bg-white min-h-screen pt-20">
        {/* Breadcrumb */}
        <div className="container-wide py-6 border-b border-neutral-200">
          <div className="flex items-center gap-2 text-sm text-neutral-600">
            <Link href="/" className="hover:text-neutral-900">
              Home
            </Link>
            <span>/</span>
            <span className="text-neutral-900">Shop</span>
          </div>
        </div>

        <div className="container-wide py-8">
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 lg:items-start">
            {/* Sidebar - Filters */}
            <aside className="lg:sticky lg:top-20 lg:max-h-[80vh] lg:overflow-y-auto space-y-4 pb-4 pr-2 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-neutral-300 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb:hover]:bg-neutral-400">
              {/* Categories */}
              <div>
                <h3 className="font-bold text-sm tracking-wider uppercase mb-3">
                  Categories
                </h3>
                <div className="space-y-1.5">
                  {categories.map((category) => (
                    <button
                      key={category.name}
                      onClick={() => setSelectedCategory(category.value)}
                      className={`block w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                        selectedCategory === category.value
                          ? 'bg-neutral-900 text-white'
                          : 'text-neutral-700 hover:bg-neutral-100'
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h3 className="font-bold text-sm tracking-wider uppercase mb-3">
                  Price Range
                </h3>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="0"
                    max="10000"
                    step="100"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                    className="w-full"
                  />
                  <div className="flex items-center justify-between text-sm text-neutral-700">
                    <span>₹{priceRange[0]}</span>
                    <span>₹{priceRange[1]}</span>
                  </div>
                </div>
              </div>

              {/* Sizes */}
              <div>
                <h3 className="font-bold text-sm tracking-wider uppercase mb-3">
                  Size
                </h3>
                <div className="grid grid-cols-3 gap-1.5">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      className="py-2 text-sm border border-neutral-300 rounded hover:border-neutral-900 transition-colors"
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Colors */}
              <div>
                <h3 className="font-bold text-sm tracking-wider uppercase mb-3">
                  Colors
                </h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    { name: 'Black', hex: '#000000' },
                    { name: 'White', hex: '#FFFFFF' },
                    { name: 'Red', hex: '#DC2626' },
                    { name: 'Blue', hex: '#2563EB' },
                    { name: 'Green', hex: '#059669' },
                    { name: 'Yellow', hex: '#FBBF24' },
                    { name: 'Orange', hex: '#EA580C' },
                    { name: 'Purple', hex: '#9333EA' },
                    { name: 'Pink', hex: '#EC4899' },
                    { name: 'Gray', hex: '#6B7280' },
                  ].map((color) => (
                    <button
                      key={color.name}
                      className="w-8 h-8 rounded-full border-2 border-neutral-300 hover:border-neutral-900 transition-colors flex-shrink-0"
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <div>
              {/* Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <div>
                  <h1 className="font-display font-bold text-3xl mb-2">
                    All Products
                  </h1>
                  <p className="text-neutral-600">
                    Showing {filteredProducts.length} products
                  </p>
                </div>

                {/* Sort By */}
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-neutral-700">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-2 border border-neutral-300 rounded text-sm focus:outline-none focus:border-neutral-900"
                  >
                    {sortOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Products Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <Link
                    key={product.id}
                    href={`/product/${product.slug}`}
                    className="group block"
                  >
                    <div className="relative aspect-[3/4] bg-gradient-to-br from-neutral-100 to-neutral-200 rounded-lg overflow-hidden mb-4">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-semibold text-neutral-500 uppercase tracking-wider">
                        {product.category}
                      </p>
                      <h3 className="text-sm font-medium text-neutral-900 group-hover:text-neutral-600 transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-sm font-medium text-neutral-900">
                        ₹{product.price.toFixed(2)}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Empty State */}
              {filteredProducts.length === 0 && (
                <div className="text-center py-16">
                  <p className="text-neutral-600 text-lg mb-4">
                    No products found matching your filters
                  </p>
                  <button
                    onClick={() => {
                      setSelectedCategory(null);
                      setPriceRange([0, 10000]);
                    }}
                    className="text-sm font-medium text-neutral-900 underline hover:no-underline"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

