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
      image: 'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=600&h=600&fit=crop',
      category: 'SHIRTS FROM ALCHEMY',
      backgroundColor: '#2d5f4a',
    },
    {
      id: 2,
      name: 'Orange Polo Shirt',
      price: 4200,
      image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&h=600&fit=crop',
      category: 'SHIRTS FROM ALCHEMY',
      backgroundColor: '#d8613c',
    },
    {
      id: 3,
      name: 'Beige Polo Shirt',
      price: 4200,
      image: 'https://images.unsplash.com/photo-1598032895397-d9372670b208?w=600&h=600&fit=crop',
      category: 'SHIRTS FROM ALCHEMY',
      backgroundColor: '#a8917a',
    },
    {
      id: 4,
      name: 'Blue Polo Shirt',
      price: 4200,
      image: 'https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?w=600&h=600&fit=crop',
      category: 'SHIRTS FROM ALCHEMY',
      backgroundColor: '#2e4d7b',
    },
  ];

  // Bottom row - Artistic hoodies
  const trendingHoodies = [
    {
      id: 5,
      name: 'Eagle Print Hoodie',
      price: 8999,
      image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=600&fit=crop',
      category: 'HOODIES FROM SERPENTS & ANGELS',
      backgroundColor: '#000000',
    },
    {
      id: 6,
      name: 'Snake Print Hoodie',
      price: 8999,
      image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&h=600&fit=crop',
      category: 'HOODIES FROM SERPENTS & ANGELS',
      backgroundColor: '#1a1a1a',
    },
    {
      id: 7,
      name: 'Sunset Print Hoodie',
      price: 8999,
      image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&h=600&fit=crop',
      category: 'HOODIES FROM SERPENTS & ANGELS',
      backgroundColor: '#d8734a',
    },
    {
      id: 8,
      name: 'Dragon Print Hoodie',
      price: 8999,
      image: 'https://images.unsplash.com/photo-1564584217132-2271feaeb3c5?w=600&h=600&fit=crop',
      category: 'HOODIES FROM SERPENTS & ANGELS',
      backgroundColor: '#d89630',
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
                  style={{ backgroundColor: product.backgroundColor }}
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
                  style={{ backgroundColor: product.backgroundColor }}
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

