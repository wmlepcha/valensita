import MainLayout from '@/Layouts/MainLayout';
import Hero from '@/Components/Hero';
import FeaturedProducts from '@/Components/FeaturedProducts';
import FeaturedCategories from '@/Components/FeaturedCategories';
import Newsletter from '@/Components/Newsletter';
import { Link } from '@inertiajs/react';
import { formatPrice } from '@/utils/formatters';

export default function Main() {
  // Sample data - replace with real data from props
  const newArrivalProducts = [
    {
      id: 1,
      name: 'Bamboozled T-Shirt',
      price: 5200,
      image: '/storage/images/valensita-card-print.png',
      badge: 'Look 01',
      category: 'Drop 07',
    },
    {
      id: 2,
      name: 'Bark T-Shirt',
      price: 5800,
      image: '/storage/images/valensita-devil-print.png',
      badge: 'Look 02',
      category: 'Drop 07',
    },
    {
      id: 3,
      name: 'Black Stomp T-Shirt',
      price: 5800,
      image: '/storage/images/valensita-tiger-print.png',
      badge: 'Look 03',
      category: 'Drop 07',
    },
    {
      id: 4,
      name: 'Grey Night Wing T-Shirt',
      price: 5800,
      image: '/storage/images/valensita-trial-print.png',
      badge: 'Look 04',
      category: 'Drop 07',
    },
  ];

  // Top row - Colorful shirts
  const trendingShirts = [
    {
      id: 1,
      name: 'Green Polo Shirt',
      price: 4200,
      image: '/storage/images/back-view-1-valensita.png',
      category: 'SHIRTS FROM ALCHEMY',
      backgroundGradient: 'linear-gradient(135deg, #2d5f4a 0%, #1a3d2e 50%, #0f281f 100%)',
    },
    {
      id: 2,
      name: 'Orange Polo Shirt',
      price: 4200,
      image: '/storage/images/back-view-2-valensita.png',
      category: 'SHIRTS FROM ALCHEMY',
      backgroundGradient: 'linear-gradient(135deg, #d8613c 0%, #b84a2a 50%, #8b3318 100%)',
    },
    {
      id: 3,
      name: 'Beige Polo Shirt',
      price: 4200,
      image: '/storage/images/back-view-3-valensita.png',
      category: 'SHIRTS FROM ALCHEMY',
      backgroundGradient: 'linear-gradient(135deg, #a8917a 0%, #8b7560 50%, #6b5a47 100%)',
    },
    {
      id: 4,
      name: 'Blue Polo Shirt',
      price: 4200,
      image: '/storage/images/back-view-4-valensita.png',
      category: 'SHIRTS FROM ALCHEMY',
      backgroundGradient: 'linear-gradient(135deg, #2e4d7b 0%, #1e3452 50%, #0f1a29 100%)',
    },
  ];

  // Bottom row - Artistic hoodies
  const trendingHoodies = [
    {
      id: 5,
      name: 'Eagle Print Hoodie',
      price: 8999,
      image: '/storage/images/back-view-5-valensita.png',
      category: 'HOODIES FROM SERPENTS & ANGELS',
      backgroundGradient: 'linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #2d2d2d 100%)',
    },
    {
      id: 6,
      name: 'Snake Print Hoodie',
      price: 8999,
      image: '/storage/images/back-view-6-valensita.png',
      category: 'HOODIES FROM SERPENTS & ANGELS',
      backgroundGradient: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #404040 100%)',
    },
    {
      id: 7,
      name: 'Sunset Print Hoodie',
      price: 8999,
      image: '/storage/images/back-view-7-valensita.png',
      category: 'HOODIES FROM SERPENTS & ANGELS',
      backgroundGradient: 'linear-gradient(135deg, #d8734a 0%, #c55a2e 50%, #a84215 100%)',
    },
    {
      id: 8,
      name: 'Dragon Print Hoodie',
      price: 8999,
      image: '/storage/images/back-view-8-valensita.png',
      category: 'HOODIES FROM SERPENTS & ANGELS',
      backgroundGradient: 'linear-gradient(135deg, #d89630 0%, #c47a1a 50%, #a05e0f 100%)',
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
      <Hero />

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

          {/* Top Row - Shirts */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-1 mb-4">
            {trendingShirts.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="group block"
              >
                <div 
                  className="aspect-square overflow-hidden mb-2"
                  style={{ background: product.backgroundGradient }}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <p className="text-[9px] font-semibold text-neutral-600 uppercase tracking-wider">
                  {product.category}
                </p>
              </Link>
            ))}
          </div>

          {/* Bottom Row - Hoodies */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-1">
            {trendingHoodies.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="group block"
              >
                <div 
                  className="aspect-square overflow-hidden mb-2"
                  style={{ background: product.backgroundGradient }}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <p className="text-[9px] font-semibold text-neutral-600 uppercase tracking-wider">
                  {product.category}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <Newsletter />
    </MainLayout>
  );
}

