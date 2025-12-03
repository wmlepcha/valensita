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
  categorySections?: Array<{
    id: number;
    name: string;
    image: string;
    link: string;
    buttonText?: string;
  }>;
  aboutSection?: {
    title: string;
    description: string;
    backgroundImage: string;
    values: Array<{
      iconName: string;
      label: string;
    }>;
  };
}

export default function Main({ 
  heroProducts = [],
  newArrivals = [],
  trendingShirts = [],
  trendingHoodies = [],
  categorySections = [],
  aboutSection
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

  // Use dynamic trending items from database
  // Only show first 4 items per row (as per requirement)
  const trendingShirtsData = trendingShirts.slice(0, 4);
  const trendingHoodiesData = trendingHoodies.slice(0, 4);

  // Use category sections from database, or fallback to empty array
  const categories = categorySections.length > 0 ? categorySections : [];

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
      <section className="py-12 xl:py-16 2xl:py-20">
        <div className="container-wide">
          {/* Header */}
          <div className="flex justify-between items-start mb-6 xl:mb-8 2xl:mb-10">
            <div>
              <h2 className="font-display font-bold text-2xl xl:text-3xl 2xl:text-4xl mb-1 xl:mb-2">Trending Now</h2>
              <p className="text-xs xl:text-sm 2xl:text-base text-neutral-500">What everyone's wearing this season</p>
            </div>
            <Link href="/trending" className="text-[11px] xl:text-xs 2xl:text-sm font-semibold uppercase tracking-wider border border-neutral-900 rounded-full px-5 py-2 xl:px-6 xl:py-2.5 2xl:px-8 2xl:py-3 hover:bg-neutral-900 hover:text-white transition-colors">
              View All
            </Link>
          </div>
        </div>

        {/* Top Row - Shirts */}
        {trendingShirtsData.length > 0 && (
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
              <p className="text-[9px] xl:text-[10px] 2xl:text-xs font-semibold text-neutral-600 uppercase tracking-wider px-4 xl:px-6 2xl:px-8">
                {product.name}
              </p>
            </Link>
          ))}
        </div>
        )}

        {/* Bottom Row - Hoodies */}
        {trendingHoodiesData.length > 0 && (
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
              <p className="text-[9px] xl:text-[10px] 2xl:text-xs font-semibold text-neutral-600 uppercase tracking-wider px-4 xl:px-6 2xl:px-8">
                {product.name}
              </p>
            </Link>
          ))}
        </div>
        )}
      </section>

      {/* About Us / Newsletter */}
      <Newsletter aboutSection={aboutSection} />
    </MainLayout>
  );
}

