import { usePage } from '@inertiajs/react';
import { PageProps } from '@/types';

export default function Marquee() {
  const { footer } = usePage<PageProps>().props;
  
  // Fallback items if no footer data
  const defaultItems = [
    'SHIPPING WITHIN 24 HOURS',
    'FREE DELIVERY',
    'EXCHANGE AND RETURN',
  ];
  
  const items = footer?.serviceItems && footer.serviceItems.length > 0
    ? footer.serviceItems.map(item => item.text)
    : defaultItems;

  // Duplicate items multiple times for seamless infinite scroll
  const duplicatedItems = [...items, ...items, ...items, ...items];

  return (
    <section className="bg-neutral-900 py-4 xl:py-5 2xl:py-6 overflow-hidden">
      <div className="relative w-full">
        <div className="flex animate-marquee whitespace-nowrap">
          {duplicatedItems.map((item, index) => (
            <span 
              key={index} 
              className="text-white bg-neutral-900 px-12 xl:px-16 2xl:px-20 py-3 xl:py-4 2xl:py-5 text-sm md:text-base xl:text-lg 2xl:text-xl font-semibold uppercase tracking-wider mx-6 xl:mx-8 2xl:mx-10 inline-block"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

