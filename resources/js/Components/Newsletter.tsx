interface AboutValue {
  iconName: string;
  label: string;
}

interface AboutSection {
  title: string;
  description: string;
  backgroundImage: string;
  values: AboutValue[];
}

interface NewsletterProps {
  aboutSection?: AboutSection | null;
}

// Icon component to render the correct SVG based on icon name
function ValueIcon({ iconName, className }: { iconName: string; className?: string }) {
  const iconClass = className || "w-8 h-8 xl:w-10 xl:h-10 2xl:w-14 2xl:h-14 text-neutral-900";
  
  switch (iconName) {
    case 'lightbulb':
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      );
    case 'heart':
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      );
    case 'star':
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      );
    case 'globe':
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    default:
      return null;
  }
}

export default function Newsletter({ aboutSection }: NewsletterProps) {
  // Fallback to default values if no about section data
  const title = aboutSection?.title || 'ABOUT US';
  const description = aboutSection?.description || 'Valensita isn\'t just a brand - it\'s a culture. Rooted in streetwear and individuality, we craft premium apparel that blends luxury with accessibility. From bold graphic tees to essential hoodies, we\'re building a community where fashion is fearless, inclusive, and unapologetically bold.';
  const backgroundImage = aboutSection?.backgroundImage || '/storage/images/stay-in-the-loop-bg.png';
  const values = aboutSection?.values || [
    { iconName: 'lightbulb', label: 'CREATIVE EXPRESSION' },
    { iconName: 'heart', label: 'INCLUSIVITY' },
    { iconName: 'star', label: 'HIGH QUALITY' },
    { iconName: 'globe', label: 'SUSTAINABILITY' },
  ];

  return (
    <section className="relative overflow-visible min-h-[90vh] xl:min-h-[85vh] 2xl:min-h-[100vh] flex items-center py-12 xl:py-16 2xl:py-24">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      
      <div className="container-wide relative z-10 w-full py-8 xl:py-12 2xl:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-16 2xl:gap-24 items-start lg:items-center">
          {/* Empty column for spacing (left side where model is) */}
          <div className="hidden lg:block"></div>
          
          {/* Content column (right side) */}
          <div className="w-full text-left">
            {/* Main Heading */}
            <div className="mb-8 xl:mb-10 2xl:mb-14">
              <h3 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-8xl tracking-tight text-neutral-900">
                {title}
              </h3>
            </div>

            {/* Description */}
            <p className="text-base md:text-lg xl:text-xl 2xl:text-2xl text-neutral-900 mb-12 xl:mb-16 2xl:mb-28 max-w-3xl xl:max-w-4xl 2xl:max-w-6xl leading-relaxed">
              {description}
            </p>

            {/* Brand Values */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 xl:gap-10 2xl:gap-16 pt-8 xl:pt-10 2xl:pt-20 border-t border-neutral-900">
              {values.map((value, index) => (
                <div key={index} className="flex flex-col items-start">
                  <div className="w-12 h-12 xl:w-14 xl:h-14 2xl:w-20 2xl:h-20 mb-3 xl:mb-4 2xl:mb-6 flex items-center justify-center">
                    <ValueIcon iconName={value.iconName} />
                  </div>
                  <p className="text-xs xl:text-sm 2xl:text-lg font-semibold uppercase tracking-wider text-neutral-900">
                    {value.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

