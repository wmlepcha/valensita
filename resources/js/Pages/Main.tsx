import MainLayout from '@/Layouts/MainLayout';
import Hero from '@/Components/Hero';
import FeaturedProducts from '@/Components/FeaturedProducts';
import FeaturedCategories from '@/Components/FeaturedCategories';
import Newsletter from '@/Components/Newsletter';
import { Link } from '@inertiajs/react';
import { formatPrice } from '@/utils/formatters';

interface MainProps {
  heroProducts?: Array<{
    id: number;
    title: string;
    price: string;
    image: string;
    lining: string;
    material: string;
    height: string;
    slug: string;
  }>;
  newArrivals?: Array<{
    id: number;
    name: string;
    price: number;
    image: string;
    hoverImage?: string;
    badge?: string;
    category?: string;
    slug: string;
  }>;
  trendingShirts?: Array<{
    id: number;
    name: string;
    price: number;
    image: string;
    hoverImage?: string;
    category: string;
    backgroundGradient: string;
    slug: string;
  }>;
  trendingHoodies?: Array<{
    id: number;
    name: string;
    price: number;
    image: string;
    hoverImage?: string;
    category: string;
    backgroundGradient: string;
    slug: string;
  }>;
}

export default function Main({ 
  heroProducts = [],
  newArrivals = [],
  trendingShirts = [],
  trendingHoodies = []
}: MainProps) {
  // Fallback data if no products from database
  const newArrivalProducts = newArrivals.length > 0 ? newArrivals : [
    {
      id: 1,
      name: 'Bamboozled T-Shirt',
      price: 5200,
      image: '/storage/images/card-print-back.png',
      hoverImage: '/storage/images/card-print-front.png',
      badge: 'Look 01',
      category: 'Drop 07',
      slug: 'valensita-card-print',
    },
    {
      id: 2,
      name: 'Bark T-Shirt',
      price: 5800,
      image: '/storage/images/devil-print-back.png',
      hoverImage: '/storage/images/devil-print-front.png',
      badge: 'Look 02',
      category: 'Drop 07',
      slug: 'valensita-devil-print',
    },
    {
      id: 3,
      name: 'Black Stomp T-Shirt',
      price: 5800,
      image: '/storage/images/tiger-print-back.png',
      hoverImage: '/storage/images/tiger-print-front.png',
      badge: 'Look 03',
      category: 'Drop 07',
      slug: 'valensita-tiger-print',
    },
    {
      id: 4,
      name: 'Grey Night Wing T-Shirt',
      price: 5800,
      image: '/storage/images/flower-print-back.png',
      hoverImage: '/storage/images/flower-print-front.png',
      badge: 'Look 04',
      category: 'Drop 07',
      slug: 'valensita-trial-print',
    },
  ];

  // Top row - Colorful shirts (use props or fallback)
  const trendingShirtsData = trendingShirts.length > 0 ? trendingShirts : [
    {
      id: 1,
      name: 'Green Polo Shirt',
      price: 4200,
      image: '/storage/images/card-print-back.png',
      hoverImage: '/storage/images/card-print-front.png',
      category: 'SHIRTS FROM ALCHEMY',
      backgroundGradient: 'linear-gradient(135deg, #f5f5f5 0%, #e5e5e5 100%)',
      slug: 'valensita-devil-print',
    },
    {
      id: 2,
      name: 'Orange Polo Shirt',
      price: 4200,
      image: '/storage/images/devil-print-back.png',
      hoverImage: '/storage/images/devil-print-front.png',
      category: 'SHIRTS FROM ALCHEMY',
      backgroundGradient: 'linear-gradient(135deg, #f5f5f5 0%, #e5e5e5 100%)',
      slug: 'valensita-tiger-print',
    },
    {
      id: 3,
      name: 'Beige Polo Shirt',
      price: 4200,
      image: '/storage/images/tiger-print-back.png',
      hoverImage: '/storage/images/tiger-print-front.png',
      category: 'SHIRTS FROM ALCHEMY',
      backgroundGradient: 'linear-gradient(135deg, #f5f5f5 0%, #e5e5e5 100%)',
      slug: 'valensita-card-print',
    },
    {
      id: 4,
      name: 'Blue Polo Shirt',
      price: 4200,
      image: '/storage/images/flower-print-back.png',
      hoverImage: '/storage/images/flower-print-front.png',
      category: 'SHIRTS FROM ALCHEMY',
      backgroundGradient: 'linear-gradient(135deg, #f5f5f5 0%, #e5e5e5 100%)',
      slug: 'valensita-devil-print',
    },
  ];

  // Bottom row - Artistic hoodies (use props or fallback)
  const trendingHoodiesData = trendingHoodies.length > 0 ? trendingHoodies : [
    {
      id: 5,
      name: 'Eagle Print Hoodie',
      price: 8999,
      image: '/storage/images/neon-print-back.png',
      hoverImage: '/storage/images/neon-print-front.png',
      category: 'HOODIES FROM SERPENTS & ANGELS',
      backgroundGradient: 'linear-gradient(135deg, #f5f5f5 0%, #e5e5e5 100%)',
      slug: 'valensita-tiger-print',
    },
    {
      id: 6,
      name: 'Snake Print Hoodie',
      price: 8999,
      image: '/storage/images/snake-print-back.png',
      hoverImage: '/storage/images/snake-print-front.png',
      category: 'HOODIES FROM SERPENTS & ANGELS',
      backgroundGradient: 'linear-gradient(135deg, #f5f5f5 0%, #e5e5e5 100%)',
      slug: 'valensita-card-print',
    },
    {
      id: 7,
      name: 'Sunset Print Hoodie',
      price: 8999,
      image: '/storage/images/roses-print-back.png',
      hoverImage: '/storage/images/roses-print-front.png',
      category: 'HOODIES FROM SERPENTS & ANGELS',
      backgroundGradient: 'linear-gradient(135deg, #f5f5f5 0%, #e5e5e5 100%)',
      slug: 'valensita-devil-print',
    },
    {
      id: 8,
      name: 'Dragon Print Hoodie',
      price: 8999,
      image: '/storage/images/italy-print-back.png',
      hoverImage: '/storage/images/italy-print-front.png',
      category: 'HOODIES FROM SERPENTS & ANGELS',
      backgroundGradient: 'linear-gradient(135deg, #f5f5f5 0%, #e5e5e5 100%)',
      slug: 'valensita-tiger-print',
    },
  ];

  const categories = [
    {
      name: 'Hoodies',
      image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=600&fit=crop',
      link: '/category/hoodies',
      description: 'Cozy essentials',
    },
    {
      name: 'T-Shirts',
      image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&h=600&fit=crop',
      link: '/category/tshirts',
      description: 'Everyday style',
    },
  ];

  return (
    <MainLayout title="Home - VALENSITA">
      {/* Hero Section */}
      <Hero slides={heroProducts} />

      {/* Featured Products */}
      <FeaturedProducts
        title="New Arrivals"
        subtitle="Fresh drops from the latest collections"
        products={newArrivalProducts}
        viewAllLink="/shop"
        variant="editorial"
      />

      {/* Featured Categories */}
      <FeaturedCategories categories={categories} />

      {/* Trending Now - Custom 2-row layout */}
      <section className="py-12">
        <div className="container-wide">
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="font-display font-bold text-2xl mb-1">Trending Now</h2>
              <p className="text-xs text-neutral-500">What everyone's wearing this season</p>
            </div>
            <Link href="/trending" className="text-[11px] font-semibold uppercase tracking-wider border border-neutral-900 rounded-full px-5 py-2 hover:bg-neutral-900 hover:text-white transition-colors">
              View All
            </Link>
          </div>
        </div>

        {/* Top Row - Shirts */}
        <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-0 mb-4">
          {trendingShirtsData.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.slug}`}
              className="group block"
            >
              <div 
                className="aspect-square overflow-hidden mb-4 relative"
                style={{ background: product.backgroundGradient }}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className={`absolute inset-0 w-full h-full object-cover opacity-100 transition-opacity duration-700 ease-in-out ${
                    product.hoverImage ? 'group-hover:opacity-0' : ''
                  }`}
                />
                {product.hoverImage && (
                  <img
                    src={product.hoverImage}
                    alt={product.name}
                    className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-700 ease-in-out group-hover:opacity-100"
                  />
                )}
              </div>
              <p className="text-[9px] font-semibold text-neutral-600 uppercase tracking-wider px-4">
                {product.category}
              </p>
            </Link>
          ))}
        </div>

        {/* Bottom Row - Hoodies */}
        <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-0">
          {trendingHoodiesData.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.slug}`}
              className="group block"
            >
              <div 
                className="aspect-square overflow-hidden mb-4 relative"
                style={{ background: product.backgroundGradient }}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className={`absolute inset-0 w-full h-full object-cover opacity-100 transition-opacity duration-700 ease-in-out ${
                    product.hoverImage ? 'group-hover:opacity-0' : ''
                  }`}
                />
                {product.hoverImage && (
                  <img
                    src={product.hoverImage}
                    alt={product.name}
                    className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-700 ease-in-out group-hover:opacity-100"
                  />
                )}
              </div>
              <p className="text-[9px] font-semibold text-neutral-600 uppercase tracking-wider px-4">
                {product.category}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <Newsletter />
    </MainLayout>
  );
}

