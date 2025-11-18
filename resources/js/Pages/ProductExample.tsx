import MainLayout from '@/Layouts/MainLayout';
import ProductDetails from '@/Components/ProductDetails';
import FeaturedProducts from '@/Components/FeaturedProducts';

export default function ProductExample() {
  // Sample product data
  const product = {
    name: 'Essential Oversized Hoodie',
    price: 8999,
    originalPrice: 12000,
    description: 'Our signature oversized hoodie crafted from premium heavyweight cotton. Features dropped shoulders, kangaroo pocket, and reinforced ribbed cuffs. Perfect for layering or wearing solo. Designed for ultimate comfort without compromising style.',
    images: [
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&h=1000&fit=crop',
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&h=1000&fit=crop',
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&h=1000&fit=crop&sat=-100',
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&h=1000&fit=crop&sat=-100',
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Black', hex: '#171717' },
      { name: 'Olive', hex: '#6b7280' },
      { name: 'Navy', hex: '#1e3a8a' },
      { name: 'Sage', hex: '#84a98c' },
    ],
    inStock: true,
    badge: 'Sale',
    category: 'Hoodies',
    sku: 'VAL-HOO-001',
  };

  const relatedProducts = [
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
      price: 10999,
      image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=600&h=800&fit=crop',
      category: 'Jackets',
    },
  ];

  return (
    <MainLayout title={`${product.name} - VALENSITA`}>
      <div className="section-spacing">
        <div className="container-wide">
          <ProductDetails {...product} />
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="border-t border-neutral-200">
        <div className="section-spacing-sm">
          <div className="container-narrow">
            <div className="space-y-12">
              {/* Features */}
              <div>
                <h3 className="font-display font-bold text-2xl mb-6">Features</h3>
                <ul className="grid md:grid-cols-2 gap-4 text-neutral-700">
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-accent-electric flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Premium heavyweight cotton blend</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-accent-electric flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Oversized fit with dropped shoulders</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-accent-electric flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Reinforced ribbed cuffs and waistband</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-accent-electric flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Kangaroo front pocket</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-accent-electric flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Adjustable drawstring hood</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-accent-electric flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Pre-shrunk fabric</span>
                  </li>
                </ul>
              </div>

              {/* Sizing */}
              <div>
                <h3 className="font-display font-bold text-2xl mb-6">Sizing Guide</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b-2 border-neutral-900">
                        <th className="text-left py-3 font-display font-bold">Size</th>
                        <th className="text-left py-3 font-display font-bold">Chest (in)</th>
                        <th className="text-left py-3 font-display font-bold">Length (in)</th>
                        <th className="text-left py-3 font-display font-bold">Sleeve (in)</th>
                      </tr>
                    </thead>
                    <tbody className="text-neutral-700">
                      <tr className="border-b border-neutral-200">
                        <td className="py-3 font-medium">XS</td>
                        <td className="py-3">20-22</td>
                        <td className="py-3">26</td>
                        <td className="py-3">25</td>
                      </tr>
                      <tr className="border-b border-neutral-200">
                        <td className="py-3 font-medium">S</td>
                        <td className="py-3">22-24</td>
                        <td className="py-3">27</td>
                        <td className="py-3">26</td>
                      </tr>
                      <tr className="border-b border-neutral-200">
                        <td className="py-3 font-medium">M</td>
                        <td className="py-3">24-26</td>
                        <td className="py-3">28</td>
                        <td className="py-3">27</td>
                      </tr>
                      <tr className="border-b border-neutral-200">
                        <td className="py-3 font-medium">L</td>
                        <td className="py-3">26-28</td>
                        <td className="py-3">29</td>
                        <td className="py-3">28</td>
                      </tr>
                      <tr className="border-b border-neutral-200">
                        <td className="py-3 font-medium">XL</td>
                        <td className="py-3">28-30</td>
                        <td className="py-3">30</td>
                        <td className="py-3">29</td>
                      </tr>
                      <tr>
                        <td className="py-3 font-medium">XXL</td>
                        <td className="py-3">30-32</td>
                        <td className="py-3">31</td>
                        <td className="py-3">30</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Materials & Care */}
              <div>
                <h3 className="font-display font-bold text-2xl mb-6">Materials & Care</h3>
                <div className="space-y-4 text-neutral-700">
                  <div>
                    <h4 className="font-semibold mb-2">Fabric Composition</h4>
                    <p>80% Cotton, 20% Polyester</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Care Instructions</h4>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Machine wash cold with like colors</li>
                      <li>Tumble dry low</li>
                      <li>Do not bleach</li>
                      <li>Iron low heat if needed</li>
                      <li>Do not dry clean</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="bg-neutral-100">
        <FeaturedProducts
          title="You May Also Like"
          products={relatedProducts}
          viewAllLink="/shop"
        />
      </div>
    </MainLayout>
  );
}

