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

  // Map category names to shop category filters
  // IGNORE database link field - generate links based on category name only
  const getCategoryLink = (categoryName: string): string => {
    // Extract category from name (remove HTML tags if any)
    const nameText = categoryName.replace(/<[^>]*>/g, '').toLowerCase().trim();
    
    // Map category names to shop filters
    if (nameText.includes('hoodie')) {
      return '/shop?category=hoodies';
    }
    if (nameText.includes('oversized')) {
      return '/shop?category=oversized';
    }
    if (nameText.includes('t-shirt') || nameText.includes('tshirt')) {
      return '/shop?category=tshirts';
    }

    // Default to shop page
    return '/shop';
  };

  return (
    <section className="w-full overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0 w-full">
        {displayCategories.map((category) => {
          // Generate link based on category name only (ignore database link field)
          const link = getCategoryLink(category.name);

          return (
            <Link
              key={category.id}
              href={link}
              className="group relative aspect-[5/4] md:h-[500px] lg:h-[600px] xl:h-[700px] 2xl:min-h-[50vh] 2xl:h-[1200px] overflow-hidden cursor-pointer"
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
              <div className="absolute inset-0 flex flex-col items-start justify-end p-8 md:p-12 xl:p-16 2xl:p-20 pointer-events-none">
                <h3 
                  className="font-display font-bold text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl text-white mb-6 xl:mb-8 2xl:mb-10 tracking-tight"
                  dangerouslySetInnerHTML={{ __html: category.name }}
                />
                <div className="px-8 py-3 xl:px-10 xl:py-4 2xl:px-12 2xl:py-5 border-2 border-white text-white text-sm xl:text-base 2xl:text-lg font-semibold uppercase tracking-wider rounded-full group-hover:bg-white group-hover:text-neutral-900 transition-all duration-300 pointer-events-auto">
                  {category.buttonText || 'Explore'}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

