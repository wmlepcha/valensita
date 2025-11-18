import { useState } from 'react';
import MainLayout from '@/Layouts/MainLayout';
import ProductCard from '@/Components/ProductCard';
import ProductGrid from '@/Components/ProductGrid';
import Button from '@/Components/UI/Button';
import Select from '@/Components/UI/Select';

export default function ShopExample() {
  const [sortBy, setSortBy] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);

  const products = [
    {
      id: 1,
      name: 'Essential Hoodie',
      price: 8999,
      originalPrice: 12000,
      image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=800&fit=crop',
      hoverImage: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&h=800&fit=crop',
      badge: 'Sale',
      badgeVariant: 'accent' as const,
      category: 'Hoodies',
    },
    {
      id: 2,
      name: 'Cargo Pants',
      price: 12999,
      image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&h=800&fit=crop',
      badge: 'New',
      badgeVariant: 'electric' as const,
      category: 'Pants',
    },
    {
      id: 3,
      name: 'Graphic Tee',
      price: 4499,
      image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&h=800&fit=crop',
      category: 'T-Shirts',
    },
    {
      id: 4,
      name: 'Leather Jacket',
      price: 24999,
      image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&h=800&fit=crop',
      badge: 'Premium',
      badgeVariant: 'brand' as const,
      category: 'Jackets',
    },
    {
      id: 5,
      name: 'Denim Jacket',
      price: 11999,
      image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=600&h=800&fit=crop',
      category: 'Jackets',
    },
    {
      id: 6,
      name: 'Track Pants',
      price: 6999,
      image: 'https://images.unsplash.com/photo-1555274175-6cbf6f3b137b?w=600&h=800&fit=crop',
      category: 'Pants',
    },
    {
      id: 7,
      name: 'Windbreaker',
      price: 13999,
      image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&h=800&fit=crop',
      badge: 'New',
      badgeVariant: 'electric' as const,
      category: 'Jackets',
    },
    {
      id: 8,
      name: 'Classic Tee',
      price: 3799,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=800&fit=crop',
      category: 'T-Shirts',
    },
  ];

  return (
    <MainLayout title="Shop - VALENSITA">
      {/* Page Header */}
      <div className="bg-neutral-900 text-neutral-50">
        <div className="container-wide section-spacing-sm">
          <div className="max-w-3xl">
            <h1 className="font-display font-black text-5xl md:text-6xl mb-4">
              All Products
            </h1>
            <p className="text-xl text-neutral-300">
              Explore our complete collection of luxury streetwear
            </p>
          </div>
        </div>
      </div>

      <div className="section-spacing">
        <div className="container-wide">
          <div className="lg:grid lg:grid-cols-[280px_1fr] lg:gap-12">
            {/* Filters Sidebar */}
            <aside className={`
              lg:block
              ${showFilters ? 'block' : 'hidden'}
            `}>
              <div className="sticky top-24 space-y-8">
                {/* Category Filter */}
                <div>
                  <h3 className="font-display font-bold text-lg mb-4">Categories</h3>
                  <div className="space-y-3">
                    {['All', 'Hoodies', 'Jackets', 'T-Shirts', 'Pants', 'Accessories'].map((cat) => (
                      <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                        <input
                          type="checkbox"
                          className="w-5 h-5 rounded border-2 border-neutral-300 text-neutral-900 focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2"
                        />
                        <span className="group-hover:text-neutral-900 transition-colors">{cat}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Filter */}
                <div className="border-t border-neutral-200 pt-8">
                  <h3 className="font-display font-bold text-lg mb-4">Price Range</h3>
                  <div className="space-y-3">
                    {[
                      { label: 'Under ₹5,000', value: '0-5000' },
                      { label: '₹5,000 - ₹10,000', value: '5000-10000' },
                      { label: '₹10,000 - ₹20,000', value: '10000-20000' },
                      { label: '₹20,000 - ₹30,000', value: '20000-30000' },
                      { label: 'Over ₹30,000', value: '30000+' },
                    ].map((range) => (
                      <label key={range.value} className="flex items-center gap-3 cursor-pointer group">
                        <input
                          type="checkbox"
                          className="w-5 h-5 rounded border-2 border-neutral-300 text-neutral-900 focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2"
                        />
                        <span className="group-hover:text-neutral-900 transition-colors">{range.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Size Filter */}
                <div className="border-t border-neutral-200 pt-8">
                  <h3 className="font-display font-bold text-lg mb-4">Size</h3>
                  <div className="grid grid-cols-3 gap-2">
                    {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                      <button
                        key={size}
                        className="py-2 border-2 border-neutral-200 rounded-lg font-display font-semibold hover:border-neutral-900 transition-colors"
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Color Filter */}
                <div className="border-t border-neutral-200 pt-8">
                  <h3 className="font-display font-bold text-lg mb-4">Color</h3>
                  <div className="grid grid-cols-6 gap-2">
                    {[
                      { name: 'Black', hex: '#171717' },
                      { name: 'White', hex: '#ffffff' },
                      { name: 'Gray', hex: '#6b7280' },
                      { name: 'Navy', hex: '#1e3a8a' },
                      { name: 'Green', hex: '#84a98c' },
                      { name: 'Brown', hex: '#92400e' },
                    ].map((color) => (
                      <button
                        key={color.name}
                        className="w-10 h-10 rounded-lg border-2 border-neutral-200 hover:border-neutral-900 transition-colors"
                        style={{ backgroundColor: color.hex }}
                        title={color.name}
                      />
                    ))}
                  </div>
                </div>

                {/* Clear Filters */}
                <Button variant="outline" size="sm" fullWidth>
                  Clear All Filters
                </Button>
              </div>
            </aside>

            {/* Products */}
            <div>
              {/* Toolbar */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <div>
                  <p className="text-neutral-600">
                    Showing <span className="font-semibold text-neutral-900">{products.length}</span> products
                  </p>
                </div>

                <div className="flex items-center gap-4 w-full sm:w-auto">
                  {/* Mobile Filter Toggle */}
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="lg:hidden flex items-center gap-2 px-4 py-2 border-2 border-neutral-200 rounded-lg hover:border-neutral-900 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                    </svg>
                    Filters
                  </button>

                  {/* Sort */}
                  <Select
                    options={[
                      { value: 'featured', label: 'Featured' },
                      { value: 'newest', label: 'Newest' },
                      { value: 'price-low', label: 'Price: Low to High' },
                      { value: 'price-high', label: 'Price: High to Low' },
                      { value: 'popular', label: 'Most Popular' },
                    ]}
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="min-w-[200px]"
                  />
                </div>
              </div>

              {/* Products Grid */}
              <ProductGrid>
                {products.map((product) => (
                  <ProductCard key={product.id} {...product} />
                ))}
              </ProductGrid>

              {/* Load More */}
              <div className="mt-12 text-center">
                <Button variant="outline" size="lg">
                  Load More Products
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

