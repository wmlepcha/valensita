import { Link } from '@inertiajs/react';

interface Category {
  id: number;
  name: string;
  image: string;
  link: string;
  buttonText?: string;
}

interface FeaturedCategoriesProps {
  categories: Category[];
}

export default function FeaturedCategories({ categories }: FeaturedCategoriesProps) {
  // If no categories provided, return null or empty section
  if (!categories || categories.length === 0) {
    return null;
  }

  // Only display first 2 category sections (as per design requirement)
  const displayCategories = categories.slice(0, 2);

  return (
    <section className="w-full overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0 w-full">
        {displayCategories.map((category) => (
          <Link
            key={category.id}
            href={category.link}
            className="group relative aspect-[5/4] md:h-[500px] lg:h-[600px] xl:h-[700px] 2xl:min-h-[50vh] 2xl:h-[1200px] overflow-hidden"
          >
            {/* Image */}
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />

            {/* Content */}
            <div className="absolute inset-0 flex flex-col items-start justify-end p-8 md:p-12 xl:p-16 2xl:p-20">
              <h3 
                className="font-display font-bold text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl text-white mb-6 xl:mb-8 2xl:mb-10 tracking-tight"
                dangerouslySetInnerHTML={{ __html: category.name }}
              />
              <button className="px-8 py-3 xl:px-10 xl:py-4 2xl:px-12 2xl:py-5 border-2 border-white text-white text-sm xl:text-base 2xl:text-lg font-semibold uppercase tracking-wider rounded-full hover:bg-white hover:text-neutral-900 transition-all duration-300">
                {category.buttonText || 'Explore'}
              </button>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

