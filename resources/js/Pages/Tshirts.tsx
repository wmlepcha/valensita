import { Head, Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';

interface Product {
  id: number;
  name: string;
  slug: string;
  price: number;
  image: string;
  hoverImage?: string;
  category?: string;
}

interface TshirtsProps {
  products: Product[];
}

export default function Tshirts({ products }: TshirtsProps) {
  return (
    <MainLayout>
      <Head title="T-Shirts - VALENSITA" />
      
      <div className="bg-white min-h-screen pt-20">
        {/* Breadcrumb */}
        <div className="container-wide py-6 border-b border-neutral-200">
          <div className="flex items-center gap-2 text-sm text-neutral-600">
            <Link href="/" className="hover:text-neutral-900">
              Home
            </Link>
            <span>/</span>
            <span className="text-neutral-900">T-Shirts</span>
          </div>
        </div>

        {/* Products Grid - 2 rows, 4 columns */}
        <section className="py-12 xl:py-16 2xl:py-20">
          <div className="container-wide">
            {/* Header */}
            <div className="mb-8 xl:mb-10 2xl:mb-12">
              <h1 className="font-display font-bold text-3xl xl:text-4xl 2xl:text-5xl mb-2">
                T-Shirts
              </h1>
              <p className="text-sm xl:text-base text-neutral-600">
                {products.length} products available
              </p>
            </div>

            {/* Products Grid - 2 rows, 4 columns */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {products.map((product) => (
                <Link
                  key={product.id}
                  href={`/product/${product.slug}`}
                  className="group block"
                >
                  {/* Product Image Container */}
                  <div className="relative aspect-square bg-gradient-to-br from-neutral-100 to-neutral-200 rounded-lg overflow-hidden mb-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
                        product.hoverImage ? 'opacity-100 group-hover:opacity-0' : 'opacity-100'
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
                  
                  {/* Product Info */}
                  <div className="text-center">
                    <h3 className="text-sm xl:text-base font-medium text-neutral-900 group-hover:text-neutral-600 transition-colors mb-1">
                      {product.name}
                    </h3>
                    <p className="text-sm xl:text-base font-medium text-neutral-900">
                      ₹{product.price.toFixed(2)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            {/* Empty State */}
            {products.length === 0 && (
              <div className="text-center py-16">
                <p className="text-neutral-600 text-lg mb-4">
                  No T-shirts available at the moment
                </p>
                <Link
                  href="/shop"
                  className="text-sm font-medium text-neutral-900 underline hover:no-underline"
                >
                  Browse all products
                </Link>
              </div>
            )}
          </div>
        </section>
      </div>
    </MainLayout>
  );
}

