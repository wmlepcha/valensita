import MainLayout from '@/Layouts/MainLayout';
import Hero from '@/Components/Hero';
import FeaturedProducts from '@/Components/FeaturedProducts';
import FeaturedCategories from '@/Components/FeaturedCategories';
import Newsletter from '@/Components/Newsletter';

export default function Main() {
  // Sample data - replace with real data from props
  const featuredProducts = [
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
      name: 'Graphic Tee',
      price: 4499,
      image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&h=800&fit=crop',
      badge: 'New',
      badgeVariant: 'electric' as const,
      category: 'T-Shirts',
    },
    {
      id: 3,
      name: 'Premium Hoodie',
      price: 13999,
      image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&h=800&fit=crop',
      badge: 'Premium',
      badgeVariant: 'brand' as const,
      category: 'Hoodies',
    },
    {
      id: 4,
      name: 'Classic Tee',
      price: 3799,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=800&fit=crop',
      category: 'T-Shirts',
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
        products={featuredProducts}
        viewAllLink="/shop"
      />

      {/* Featured Categories */}
      <FeaturedCategories categories={categories} />

      {/* More Featured Products */}
      <FeaturedProducts
        title="Trending Now"
        subtitle="What everyone's wearing this season"
        products={featuredProducts.slice().reverse()}
        viewAllLink="/trending"
      />

      {/* Newsletter */}
      <Newsletter />
    </MainLayout>
  );
}

