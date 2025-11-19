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
}

const slides: Slide[] = [
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

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
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
  }, [currentSlide, isAnimating]);

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

  const slide = slides[currentSlide];

  return (
    <section className="relative min-h-[80vh] bg-gradient-to-br from-neutral-100 to-neutral-200 overflow-hidden flex items-center">
      <div className="container mx-auto px-6 pt-28 pb-16 lg:pt-32 lg:pb-24 w-full">
        <div className="grid lg:grid-cols-3 gap-12 items-center min-h-[calc(100vh-8rem)]">
          {/* Left Content */}
          <div className="flex flex-col justify-between min-h-[520px]">
            <div 
              key={`title-${currentSlide}`}
              className="space-y-4 animate-slide-in-left"
            >
              <h1 className="font-display font-black text-4xl lg:text-5xl xl:text-6xl tracking-tight leading-tight">
                {slide.title}
              </h1>
              <p className="text-5xl lg:text-6xl font-light text-neutral-400">
                {slide.price}
              </p>
            </div>

            {/* Slide Counter */}
            <div className="mt-10">
              <div className="w-14 h-14 border border-neutral-900 rounded-full flex items-center justify-center text-xs font-semibold">
                {currentSlide + 1}/{slides.length}
              </div>
            </div>
          </div>

          {/* Center - Model Image */}
          <div className="relative flex items-center justify-center min-h-[540px]">
            {/* Background Shape */}
            <div 
              className="w-[360px] h-[360px] md:w-[460px] md:h-[460px] lg:w-[520px] lg:h-[520px] rounded-full bg-gradient-to-b from-white via-white to-white/70 shadow-[0_45px_110px_rgba(0,0,0,0.18)] animate-scale-in"
            />

            {/* Transparent Model */}
            <img 
              key={`image-${currentSlide}`}
              src={slide.image}
              alt={slide.title}
              className="absolute z-10 w-auto h-[540px] md:h-[600px] lg:h-[640px] object-contain"
            />

            {/* Navigation Buttons */}
            <button
              onClick={handlePrev}
              disabled={isAnimating}
              className="absolute left-8 md:left-16 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white border border-neutral-200 rounded-full shadow-lg flex items-center justify-center hover:bg-neutral-100 transition-colors disabled:opacity-50"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={handleNext}
              disabled={isAnimating}
              className="absolute right-8 md:right-16 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-neutral-900 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-neutral-800 transition-colors disabled:opacity-50"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Right Content - Details */}
          <div 
            key={`details-${currentSlide}`}
            className="flex flex-col justify-between min-h-[520px] animate-slide-in-right"
          >
            {/* Product Details */}
            <div className="space-y-6">
              <div>
                <div className="text-xs text-neutral-500 uppercase tracking-widest mb-2">Lining</div>
                <div className="text-sm font-medium">{slide.lining}</div>
              </div>
              <div>
                <div className="text-xs text-neutral-500 uppercase tracking-widest mb-2">Material</div>
                <div className="text-sm font-medium">{slide.material}</div>
              </div>
              <div>
                <div className="text-xs text-neutral-500 uppercase tracking-widest mb-2">Height</div>
                <div className="text-sm font-medium">{slide.height}</div>
              </div>
            </div>

            {/* Slide Indicators */}
            <div className="flex items-center gap-4">
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
                      ? 'w-10 bg-neutral-900' 
                      : 'w-8 bg-neutral-300 hover:bg-neutral-400'
                  }`}
                />
              ))}
            </div>

            {/* Add to Cart Button */}
            <Link
              href="/shop"
              className="inline-flex items-center justify-center w-14 h-14 bg-neutral-900 text-white rounded-full hover:bg-neutral-800 transition-colors shadow-lg"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

