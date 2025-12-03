import { useState, useEffect, useMemo } from 'react';
import MainLayout from '../Layouts/MainLayout';
import { Head, Link, router, usePage } from '@inertiajs/react';

interface Category {
  id: number;
  name: string;
  slug: string;
}

interface Subcategory {
  id: number;
  name: string;
  slug: string;
  category_id: number;
  category_name: string | null;
}

interface Product {
  id: number;
  name: string;
  slug: string;
  price: number;
  image: string;
  category: string;
  subcategory?: string | null;
  subcategory_slug?: string | null;
  available_sizes?: string[];
}

interface ShopProps {
  products: Product[];
  categories: Category[];
  subcategories: Subcategory[];
  sizes: string[];
  filters: {
    category?: string;
    subcategory?: string | string[];
    size?: string;
    min_price?: number;
    max_price?: number;
  };
}

export default function Shop({ 
  products, 
  categories, 
  subcategories, 
  sizes,
  filters: initialFilters 
}: ShopProps) {
  const { url } = usePage();
  const [sortBy, setSortBy] = useState('recommended');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(initialFilters.category || null);
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>(() => {
    const sub = initialFilters.subcategory;
    if (!sub) return [];
    if (Array.isArray(sub)) return sub;
    return sub.split(',').filter(s => s.trim());
  });
  const [selectedSize, setSelectedSize] = useState<string | null>(initialFilters.size || null);
  const [priceRange, setPriceRange] = useState([
    initialFilters.min_price || 0,
    initialFilters.max_price || 10000
  ]);

  // Update filters when URL parameters change
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    setSelectedCategory(urlParams.get('category') || null);
    const subcategoryParam = urlParams.get('subcategory');
    if (subcategoryParam) {
      setSelectedSubcategories(subcategoryParam.split(',').filter(s => s.trim()));
    } else {
      setSelectedSubcategories([]);
    }
    setSelectedSize(urlParams.get('size') || null);
    const minPrice = urlParams.get('min_price');
    const maxPrice = urlParams.get('max_price');
    if (minPrice || maxPrice) {
      setPriceRange([
        minPrice ? parseInt(minPrice) : 0,
        maxPrice ? parseInt(maxPrice) : 10000
      ]);
    }
  }, [url]);

  // Get subcategories for selected category
  const availableSubcategories = useMemo(() => {
    if (!selectedCategory) return [];
    return subcategories.filter(sub => 
      sub.category_name?.toLowerCase().replace(/\s+/g, '-') === selectedCategory ||
      sub.category_id === categories.find(c => c.slug === selectedCategory)?.id
    );
  }, [selectedCategory, subcategories, categories]);

  // Build filter URL
  const buildFilterUrl = (updates: Record<string, string | string[] | null>) => {
    const params = new URLSearchParams();
    
    const newCategory = updates.category !== undefined ? updates.category : selectedCategory;
    const newSubcategories = updates.subcategories !== undefined 
      ? (Array.isArray(updates.subcategories) ? updates.subcategories : [updates.subcategories].filter(Boolean))
      : selectedSubcategories;
    const newSize = updates.size !== undefined ? updates.size : selectedSize;
    const newMinPrice = updates.min_price !== undefined ? updates.min_price : priceRange[0].toString();
    const newMaxPrice = updates.max_price !== undefined ? updates.max_price : priceRange[1].toString();

    if (newCategory) params.set('category', newCategory);
    if (newSubcategories.length > 0) params.set('subcategory', newSubcategories.join(','));
    if (newSize) params.set('size', newSize);
    if (newMinPrice && newMinPrice !== '0') params.set('min_price', newMinPrice);
    if (newMaxPrice && newMaxPrice !== '10000') params.set('max_price', newMaxPrice);

    const queryString = params.toString();
    return queryString ? `/shop?${queryString}` : '/shop';
  };

  // Handle filter changes
  const handleFilterChange = (updates: Record<string, string | string[] | null>) => {
    const newUrl = buildFilterUrl(updates);
    router.visit(newUrl, { 
      preserveState: false, 
      preserveScroll: true,
      only: ['products', 'filters']
    });
  };

  // Toggle subcategory selection
  const toggleSubcategory = (subcategorySlug: string) => {
    const newSubcategories = selectedSubcategories.includes(subcategorySlug)
      ? selectedSubcategories.filter(s => s !== subcategorySlug)
      : [...selectedSubcategories, subcategorySlug];
    
    handleFilterChange({ subcategories: newSubcategories });
  };

  const sortOptions = [
    { label: 'Recommended', value: 'recommended' },
    { label: 'Newest', value: 'newest' },
    { label: 'Price: Low to High', value: 'price_asc' },
    { label: 'Price: High to Low', value: 'price_desc' },
  ];

  // Sort products
  const sortedProducts = useMemo(() => {
    const sorted = [...products];
    switch (sortBy) {
      case 'price_asc':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price_desc':
        return sorted.sort((a, b) => b.price - a.price);
      case 'newest':
        return sorted.sort((a, b) => b.id - a.id);
      default:
        return sorted;
    }
  }, [products, sortBy]);

  // Build categories list with "All" option
  const categoryList = useMemo(() => {
    return [
      { name: 'All', value: null, slug: null },
      ...categories.map(cat => ({
        name: cat.name,
        value: cat.slug,
        slug: cat.slug
      }))
    ];
  }, [categories]);

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
            {selectedCategory && (
              <>
                <span>/</span>
                <span className="text-neutral-900 capitalize">
                  {categories.find(c => c.slug === selectedCategory)?.name || selectedCategory}
                </span>
              </>
            )}
            {selectedSubcategories.length > 0 && (
              <>
                <span>/</span>
                <span className="text-neutral-900 capitalize">
                  {selectedSubcategories.length === 1
                    ? subcategories.find(s => s.slug === selectedSubcategories[0])?.name || selectedSubcategories[0]
                    : `${selectedSubcategories.length} Prints`}
                </span>
              </>
            )}
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
                  {categoryList.map((category) => (
                    <button
                      key={category.name}
                      onClick={() => {
                        handleFilterChange({ 
                          category: category.value,
                          subcategories: [] // Clear subcategories when category changes
                        });
                      }}
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

              {/* Prints (Subcategories) - Only show if category is selected */}
              {selectedCategory && availableSubcategories.length > 0 && (
                <div>
                  <h3 className="font-bold text-sm tracking-wider uppercase mb-2">
                    Prints
                  </h3>
                  <div className="grid grid-cols-2 gap-1.5">
                    {availableSubcategories.map((subcategory) => (
                      <button
                        key={subcategory.id}
                        onClick={() => toggleSubcategory(subcategory.slug)}
                        className={`px-2 py-1.5 text-xs rounded border transition-colors ${
                          selectedSubcategories.includes(subcategory.slug)
                            ? 'border-neutral-900 bg-neutral-900 text-white'
                            : 'border-neutral-300 text-neutral-700 hover:border-neutral-900 hover:bg-neutral-50'
                        }`}
                        title={subcategory.name}
                      >
                        <span className="truncate block">{subcategory.name}</span>
                      </button>
                    ))}
                  </div>
                  {selectedSubcategories.length > 0 && (
                    <button
                      onClick={() => handleFilterChange({ subcategories: [] })}
                      className="mt-2 text-xs text-neutral-500 hover:text-neutral-900 underline"
                    >
                      Clear all ({selectedSubcategories.length})
                    </button>
                  )}
                </div>
              )}

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
                    onChange={(e) => {
                      const newMax = parseInt(e.target.value);
                      setPriceRange([priceRange[0], newMax]);
                      handleFilterChange({ 
                        min_price: priceRange[0].toString(),
                        max_price: newMax.toString()
                      });
                    }}
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
                  <button
                    onClick={() => {
                      handleFilterChange({ size: null });
                    }}
                    className={`py-2 text-sm border rounded transition-colors ${
                      !selectedSize
                        ? 'border-neutral-900 bg-neutral-900 text-white'
                        : 'border-neutral-300 hover:border-neutral-900'
                    }`}
                  >
                    All
                  </button>
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => {
                        handleFilterChange({ size: size });
                      }}
                      className={`py-2 text-sm border rounded transition-colors ${
                        selectedSize === size
                          ? 'border-neutral-900 bg-neutral-900 text-white'
                          : 'border-neutral-300 hover:border-neutral-900'
                      }`}
                    >
                      {size}
                    </button>
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
                    {selectedSubcategories.length > 0
                      ? selectedSubcategories.length === 1
                        ? subcategories.find(s => s.slug === selectedSubcategories[0])?.name || 'Products'
                        : `${selectedSubcategories.length} Selected Prints`
                      : selectedCategory
                      ? categories.find(c => c.slug === selectedCategory)?.name || 'Products'
                      : 'All Products'}
                  </h1>
                  <p className="text-neutral-600">
                    Showing {sortedProducts.length} {sortedProducts.length === 1 ? 'product' : 'products'}
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
                {sortedProducts.map((product) => (
                  <Link
                    key={product.id}
                    href={`/product/${product.slug}`}
                    className="group block"
                  >
                    <div className="relative aspect-[3/4] bg-gradient-to-br from-neutral-100 to-neutral-200 rounded-lg overflow-hidden mb-4">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-semibold text-neutral-500 uppercase tracking-wider">
                        {product.subcategory || product.category}
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
              {sortedProducts.length === 0 && (
                <div className="text-center py-16">
                  <p className="text-neutral-600 text-lg mb-4">
                    No products found matching your filters
                  </p>
                  <button
                    onClick={() => {
                      router.visit('/shop', { preserveState: false });
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
