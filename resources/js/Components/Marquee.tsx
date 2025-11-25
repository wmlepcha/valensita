export default function Marquee() {
  const items = [
    'SHIPPING WITHIN 24 HOURS',
    'FREE DELIVERY',
    'EXCHANGE AND RETURN',
  ];

  // Duplicate items multiple times for seamless infinite scroll
  const duplicatedItems = [...items, ...items, ...items, ...items];

  return (
    <section className="bg-neutral-900 py-4 overflow-hidden">
      <div className="relative w-full">
        <div className="flex animate-marquee whitespace-nowrap">
          {duplicatedItems.map((item, index) => (
            <span key={index} className="text-white bg-neutral-900 px-12 py-3 text-sm md:text-base font-semibold uppercase tracking-wider mx-6 inline-block">
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

