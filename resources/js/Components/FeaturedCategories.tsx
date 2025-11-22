import { Link } from '@inertiajs/react';

interface Category {
  name: string;
  image: string;
  link: string;
  description?: string;
}

interface FeaturedCategoriesProps {
  categories: Category[];
}

export default function FeaturedCategories({ categories }: FeaturedCategoriesProps) {
  return (
    <section className="w-full">
      <div className="container-wide">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {/* Hoodies Banner */}
          <Link
            href="/category/hoodies"
            className="group relative aspect-[5/4] md:h-[500px] lg:h-[600px] xl:h-[700px] overflow-hidden"
          >
            {/* Image */}
            <img
              src="/storage/images/hoodie-banner.png"
              alt="Shop Hoodies"
              className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />

            {/* Content */}
            <div className="absolute inset-0 flex flex-col items-start justify-end p-8 md:p-12">
              <h3 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-6 tracking-tight">
                SHOP HOODIES
              </h3>
              <button className="px-8 py-3 border-2 border-white text-white text-sm font-semibold uppercase tracking-wider rounded-full hover:bg-white hover:text-neutral-900 transition-all duration-300">
                Explore
              </button>
            </div>
          </Link>

          {/* T-Shirts Banner */}
          <Link
            href="/category/tshirts"
            className="group relative aspect-[5/4] md:h-[500px] lg:h-[600px] xl:h-[700px] overflow-hidden"
          >
            {/* Image */}
            <img
              src="/storage/images/tshirt-banner.png"
              alt="Shop Oversized T-Shirts"
              className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />

            {/* Content */}
            <div className="absolute inset-0 flex flex-col items-start justify-end p-8 md:p-12">
              <h3 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-6 tracking-tight">
                SHOP OVERSIZED<br />T-SHIRTS
              </h3>
              <button className="px-8 py-3 border-2 border-white text-white text-sm font-semibold uppercase tracking-wider rounded-full hover:bg-white hover:text-neutral-900 transition-all duration-300">
                Explore
              </button>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}

