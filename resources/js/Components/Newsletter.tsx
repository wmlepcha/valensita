export default function Newsletter() {
  return (
    <section className="relative overflow-hidden min-h-[90vh] flex items-center">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/storage/images/stay-in-the-loop-bg.png)' }}
      />
      
      <div className="container-wide relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Empty column for spacing (left side where model is) */}
          <div className="hidden lg:block"></div>
          
          {/* Content column (right side) */}
          <div className="w-full text-left">
            {/* Main Heading */}
            <div className="mb-8">
            <h3 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl tracking-tight text-neutral-900">
              ABOUT US
            </h3>
          </div>

          {/* Description */}
          <p className="text-base md:text-lg text-neutral-900 mb-12 max-w-3xl leading-relaxed">
            Valensita isn't just a brand - it's a culture. Rooted in streetwear and individuality, we craft premium apparel that blends luxury with accessibility. From bold graphic tees to essential hoodies, we're building a community where fashion is fearless, inclusive, and unapologetically bold.
          </p>

          {/* Brand Values */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 pt-8 border-t border-neutral-900">
            <div className="flex flex-col items-start">
              <div className="w-12 h-12 mb-3 flex items-center justify-center">
                <svg className="w-8 h-8 text-neutral-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <p className="text-xs font-semibold uppercase tracking-wider text-neutral-900">CREATIVE EXPRESSION</p>
            </div>

            <div className="flex flex-col items-start">
              <div className="w-12 h-12 mb-3 flex items-center justify-center">
                <svg className="w-8 h-8 text-neutral-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <p className="text-xs font-semibold uppercase tracking-wider text-neutral-900">INCLUSIVITY</p>
            </div>

            <div className="flex flex-col items-start">
              <div className="w-12 h-12 mb-3 flex items-center justify-center">
                <svg className="w-8 h-8 text-neutral-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <p className="text-xs font-semibold uppercase tracking-wider text-neutral-900">HIGH QUALITY</p>
            </div>

            <div className="flex flex-col items-start">
              <div className="w-12 h-12 mb-3 flex items-center justify-center">
                <svg className="w-8 h-8 text-neutral-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-xs font-semibold uppercase tracking-wider text-neutral-900">SUSTAINABILITY</p>
            </div>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}

