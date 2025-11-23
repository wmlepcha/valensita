export default function ValuePropositions() {
  const features = [
    {
      icon: null,
      image: "/storage/images/hours-logo.png",
      title: "SHIPPING WITHIN 48 HOURS",
      description: "Your order will be shipped within 48 hours from the time since order is placed!"
    },
    {
      icon: null,
      image: "/storage/images/delivery-logo.png",
      title: "5% OFF || FREE DELIVERY",
      description: "5% OFF on Pre-paid orders."
    },
    {
      icon: null,
      image: "/storage/images/make-in-india.png",
      title: "MADE IN INDIA",
      description: "Our products are 100% made in India. From raw fabric to the final product!"
    },
    {
      icon: null,
      image: "/storage/images/luxury-brand-logo.png",
      title: "LUXURY FASHION MADE ACCESSIBLE",
      description: "High-quality clothing at affordable prices"
    }
  ];

  return (
    <section className="bg-white border-t border-neutral-200">
      <div className="container-wide py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-start">
              {/* Icon Circle or Image */}
              {feature.image ? (
                <div className="mb-4">
                  <img 
                    src={feature.image} 
                    alt={feature.title}
                    className="h-24 w-auto object-contain"
                  />
                </div>
              ) : (
                <div className="w-16 h-16 rounded-full border-2 border-neutral-900 flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
              )}
              
              {/* Title */}
              <h3 className="font-bold text-sm tracking-wider uppercase text-neutral-900 mb-2">
                {feature.title}
              </h3>
              
              {/* Description */}
              <p className="text-sm text-neutral-700 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

