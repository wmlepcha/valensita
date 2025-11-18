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
    <section className="section-spacing bg-neutral-50">
      <div className="container-wide">
        <div className="text-center mb-12">
          <h2 className="font-display font-bold mb-4">Shop by Category</h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Explore our curated collections of luxury streetwear
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <Link
              key={index}
              href={category.link}
              className="group relative aspect-square overflow-hidden rounded-xl animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Image */}
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 via-neutral-900/40 to-transparent" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <h3 className="font-display font-bold text-3xl text-neutral-50 mb-2 group-hover:translate-y-[-4px] transition-transform">
                  {category.name}
                </h3>
                {category.description && (
                  <p className="text-neutral-200 opacity-0 group-hover:opacity-100 transition-opacity">
                    {category.description}
                  </p>
                )}
              </div>

              {/* Hover Border */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-neutral-50 transition-colors rounded-xl" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

