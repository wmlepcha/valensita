import { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';

interface Slide {
  id: number;
  title: string;
  price: string;
  image: string;
  lining: string;
  material: string;
  height: string;
  slug?: string;
}

interface HeroProps {
  slides?: Slide[];
}

const defaultSlides: Slide[] = [
  {
    id: 1,
    title: 'Borg Bomber Jacket In Black',
    price: '₹29,999',
    image: '/storage/images/valensita-model-1.png',
    lining: '100% Polyester',
    material: 'Size Medium',
    height: '6.2/191 cm',
  },
  {
    id: 2,
    title: 'Essential Oversized Hoodie',
    price: '₹18,999',
    image: '/storage/images/valensita-model-2.png',
    lining: '100% Cotton',
    material: 'Size Large',
    height: '6.0/183 cm',
  },
  {
    id: 3,
    title: 'Premium Graphic Tee',
    price: '₹8,499',
    image: '/storage/images/valensita-model-3.png',
    lining: '100% Cotton',
    material: 'Size Medium',
    height: '5.11/180 cm',
  },
];

export default function Hero({ slides: propSlides }: HeroProps) {
  // Use provided slides or fall back to defaults
  const slides = propSlides && propSlides.length > 0 ? propSlides : defaultSlides;
  
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (slides.length === 0) return;
    
    const slideTimer = setTimeout(() => {
      if (!isAnimating) {
        setIsAnimating(true);
        setCurrentSlide((prev) => (prev + 1) % slides.length);
        setTimeout(() => setIsAnimating(false), 600);
      }
    }, 2000); // Auto-advance every 2 seconds

    return () => {
      clearTimeout(slideTimer);
    };
  }, [currentSlide, isAnimating, slides.length]);

  const handleNext = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentSlide((prev) => (prev + 1) % slides.length);
      setTimeout(() => setIsAnimating(false), 600);
    }
  };

  const handlePrev = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
      setTimeout(() => setIsAnimating(false), 600);
    }
  };

  if (slides.length === 0) {
    return null;
  }

  const slide = slides[currentSlide];

  return (
    <section className="relative min-h-[65vh] md:min-h-[55vh] xl:min-h-[65vh] 2xl:min-h-[80vh] bg-gradient-to-br from-neutral-100 to-neutral-200 overflow-hidden flex items-center">
      <div className="container-wide pt-24 pb-8 md:pt-20 md:pb-10 xl:pt-28 xl:pb-16 2xl:pt-32 2xl:pb-24">
        <div className="grid md:grid-cols-3 gap-6 md:gap-6 xl:gap-8 2xl:gap-12 items-center">
          {/* Left Content */}
          <div className="flex flex-col justify-between min-h-[380px] md:min-h-[320px] xl:min-h-[400px] 2xl:min-h-[520px]">
            <div 
              key={`title-${currentSlide}`}
              className="space-y-2 md:space-y-3 xl:space-y-3 2xl:space-y-4 animate-slide-in-left"
            >
              <h1 className="font-display font-black text-3xl md:text-2xl xl:text-4xl 2xl:text-6xl tracking-tight leading-tight">
                {slide.title}
              </h1>
              <p className="text-3xl md:text-3xl xl:text-4xl 2xl:text-6xl font-light text-neutral-400">
                {slide.price}
              </p>
            </div>

            {/* Slide Counter */}
            <div className="mt-8 md:mt-8">
              <div className="w-12 h-12 md:w-11 md:h-11 xl:w-12 xl:h-12 2xl:w-14 2xl:h-14 border border-neutral-900 rounded-full flex items-center justify-center text-[10px] md:text-[10px] xl:text-[11px] 2xl:text-xs font-semibold">
                {currentSlide + 1}/{slides.length}
              </div>
            </div>
          </div>

          {/* Center - Model Image */}
          <div className="relative flex items-center justify-center min-h-[400px] md:min-h-[360px] xl:min-h-[440px] 2xl:min-h-[540px]">
            {/* Background Shape */}
            <div 
              className="w-[280px] h-[280px] md:w-[300px] md:h-[300px] xl:w-[380px] xl:h-[380px] 2xl:w-[520px] 2xl:h-[520px] rounded-full bg-gradient-to-b from-white via-white to-white/70 shadow-[0_25px_60px_rgba(0,0,0,0.12)] md:shadow-[0_25px_60px_rgba(0,0,0,0.14)] xl:shadow-[0_35px_90px_rgba(0,0,0,0.16)] 2xl:shadow-[0_45px_110px_rgba(0,0,0,0.18)] animate-scale-in"
            />

            {/* Transparent Model */}
            <img 
              key={`image-${currentSlide}`}
              src={slide.image}
              alt={slide.title}
              className="absolute z-10 w-auto h-[400px] md:h-[400px] xl:h-[480px] 2xl:h-[640px] object-contain"
            />

            {/* Navigation Buttons */}
            <button
              onClick={handlePrev}
              disabled={isAnimating}
              className="absolute left-4 md:left-8 lg:left-16 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-11 md:h-11 lg:w-12 lg:h-12 bg-white border border-neutral-200 rounded-full shadow-lg flex items-center justify-center hover:bg-neutral-100 transition-colors disabled:opacity-50"
            >
              <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={handleNext}
              disabled={isAnimating}
              className="absolute right-4 md:right-8 lg:right-16 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-11 md:h-11 lg:w-12 lg:h-12 bg-neutral-900 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-neutral-800 transition-colors disabled:opacity-50"
            >
              <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Right Content - Details */}
          <div 
            key={`details-${currentSlide}`}
            className="flex flex-col justify-between min-h-[380px] md:min-h-[320px] xl:min-h-[400px] 2xl:min-h-[520px] animate-slide-in-right"
          >
            {/* Product Details */}
            <div className="space-y-3 md:space-y-4 xl:space-y-5 2xl:space-y-6">
              <div>
                <div className="text-[10px] md:text-[10px] xl:text-[11px] 2xl:text-xs text-neutral-500 uppercase tracking-widest mb-1.5 md:mb-1.5 xl:mb-1.5 2xl:mb-2">Lining</div>
                <div className="text-xs md:text-xs xl:text-xs 2xl:text-sm font-medium">{slide.lining}</div>
              </div>
              <div>
                <div className="text-[10px] md:text-[10px] xl:text-[11px] 2xl:text-xs text-neutral-500 uppercase tracking-widest mb-1.5 md:mb-1.5 xl:mb-1.5 2xl:mb-2">Material</div>
                <div className="text-xs md:text-xs xl:text-xs 2xl:text-sm font-medium">{slide.material}</div>
              </div>
              <div>
                <div className="text-[10px] md:text-[10px] xl:text-[11px] 2xl:text-xs text-neutral-500 uppercase tracking-widest mb-1.5 md:mb-1.5 xl:mb-1.5 2xl:mb-2">Height</div>
                <div className="text-xs md:text-xs xl:text-xs 2xl:text-sm font-medium">{slide.height}</div>
              </div>
            </div>

            {/* Slide Indicators */}
            <div className="flex items-center gap-3 md:gap-4">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (!isAnimating) {
                      setIsAnimating(true);
                      setCurrentSlide(index);
                      setTimeout(() => setIsAnimating(false), 800);
                    }
                  }}
                  className={`h-0.5 rounded-full transition-all ${
                    index === currentSlide 
                      ? 'w-8 md:w-10 bg-neutral-900' 
                      : 'w-6 md:w-8 bg-neutral-300 hover:bg-neutral-400'
                  }`}
                />
              ))}
            </div>

            {/* Add to Cart Button */}
            <Link
              href="/shop"
              className="inline-flex items-center justify-center w-12 h-12 md:w-11 md:h-11 xl:w-12 xl:h-12 2xl:w-14 2xl:h-14 bg-neutral-900 text-white rounded-full hover:bg-neutral-800 transition-colors shadow-lg"
            >
              <svg className="w-5 h-5 md:w-5 md:h-5 xl:w-5 xl:h-5 2xl:w-6 2xl:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style>{`
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-slide-in-left {
          animation: slideInLeft 0.6s ease-out;
        }

        .animate-slide-in-right {
          animation: slideInRight 0.6s ease-out;
        }

        .animate-scale-in {
          animation: scaleIn 0.6s ease-out;
        }

        /* Smooth transition for image changes */
        img {
          animation: fadeIn 0.6s ease-out;
        }
      `}</style>
    </section>
  );
}

