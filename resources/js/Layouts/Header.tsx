import { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoodiesMenuOpen, setHoodiesMenuOpen] = useState(false);
  const [tshirtsMenuOpen, setTshirtsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const headerClasses = [
    'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
    scrolled
      ? 'bg-white/80 backdrop-blur-xl border-b border-white/40 shadow-[0_8px_30px_rgba(0,0,0,0.08)]'
      : 'bg-transparent border-transparent'
  ].join(' ');

  return (
    <>
      <header className={headerClasses}>
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Left Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {/* Hoodies with Dropdown */}
              <div 
                onMouseEnter={() => setHoodiesMenuOpen(true)}
                onMouseLeave={() => setHoodiesMenuOpen(false)}
              >
                <Link
                  href="/hoodies"
                  className="text-xs font-medium tracking-widest uppercase text-neutral-900 hover:text-neutral-600 transition-colors"
                >
                  Hoodies
                </Link>
              </div>

              {/* T-Shirts with Dropdown */}
              <div 
                onMouseEnter={() => setTshirtsMenuOpen(true)}
                onMouseLeave={() => setTshirtsMenuOpen(false)}
              >
                <Link
                  href="/tshirts"
                  className="text-xs font-medium tracking-widest uppercase text-neutral-900 hover:text-neutral-600 transition-colors"
                >
                  T-Shirts
                </Link>
              </div>
            </nav>

            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <img 
                src="/storage/images/valensita-black.png" 
                alt="VALENSITA" 
                className="h-6 w-auto hover:opacity-80 transition-opacity"
              />
            </Link>

            {/* Right Actions */}
            <div className="flex items-center gap-6">
              {/* Search Icon */}
              <button className="hidden lg:block hover:opacity-60 transition-opacity">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>

              {/* Collections */}
              <Link
                href="/collections"
                className="hidden lg:block text-xs font-medium tracking-widest uppercase text-neutral-900 hover:text-neutral-600 transition-colors"
              >
                Collections
              </Link>

              {/* Account */}
              <Link
                href="/account"
                className="hidden lg:block text-xs font-medium tracking-widest uppercase text-neutral-900 hover:text-neutral-600 transition-colors"
              >
                Account
              </Link>

              {/* Cart */}
              <Link
                href="/cart"
                className="text-xs font-medium tracking-widest uppercase text-neutral-900 hover:text-neutral-600 transition-colors"
              >
                Cart
              </Link>

              {/* Mobile Menu Toggle */}
              <button
                className="lg:hidden hover:opacity-60 transition-opacity"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <nav className="lg:hidden py-6 border-t border-neutral-200">
              <div className="flex flex-col gap-4">
                {/* Hoodies Section */}
                <div>
                  <Link
                    href="/hoodies"
                    className="text-xs font-bold tracking-widest uppercase text-neutral-900 hover:text-neutral-600 py-2 block"
                  >
                    Hoodies
                  </Link>
                  <div className="ml-4 mt-2 space-y-2">
                    <Link href="/hoodies/pullover" className="text-xs tracking-wide uppercase text-neutral-600 hover:text-neutral-900 block">
                      Pullover
                    </Link>
                    <Link href="/hoodies/zip-up" className="text-xs tracking-wide uppercase text-neutral-600 hover:text-neutral-900 block">
                      Zip-Up
                    </Link>
                    <Link href="/hoodies/oversized" className="text-xs tracking-wide uppercase text-neutral-600 hover:text-neutral-900 block">
                      Oversized
                    </Link>
                  </div>
                </div>

                {/* T-Shirts Section */}
                <div>
                  <Link
                    href="/tshirts"
                    className="text-xs font-bold tracking-widest uppercase text-neutral-900 hover:text-neutral-600 py-2 block"
                  >
                    T-Shirts
                  </Link>
                  <div className="ml-4 mt-2 space-y-2">
                    <Link href="/tshirts/graphic" className="text-xs tracking-wide uppercase text-neutral-600 hover:text-neutral-900 block">
                      Graphic Tees
                    </Link>
                    <Link href="/tshirts/plain" className="text-xs tracking-wide uppercase text-neutral-600 hover:text-neutral-900 block">
                      Plain Tees
                    </Link>
                    <Link href="/tshirts/oversized" className="text-xs tracking-wide uppercase text-neutral-600 hover:text-neutral-900 block">
                      Oversized
                    </Link>
                  </div>
                </div>

                <Link
                  href="/collections"
                  className="text-xs font-medium tracking-widest uppercase text-neutral-900 hover:text-neutral-600 py-2"
                >
                  Collections
                </Link>
                <Link
                  href="/account"
                  className="text-xs font-medium tracking-widest uppercase text-neutral-900 hover:text-neutral-600 py-2"
                >
                  Account
                </Link>
              </div>
            </nav>
          )}
        </div>
      </header>

      {/* Full-Width Mega Menu for Hoodies */}
      {hoodiesMenuOpen && (
        <div
          className="fixed top-16 left-0 right-0 z-40 bg-white border-b border-neutral-200"
          onMouseEnter={() => setHoodiesMenuOpen(true)}
          onMouseLeave={() => setHoodiesMenuOpen(false)}
        >
          <div className="container mx-auto px-6 py-12">
            <div className="grid grid-cols-4 gap-12">
              {/* Left Column - Categories */}
              <div>
                <h3 className="text-xs font-bold tracking-widest uppercase text-neutral-900 mb-4">
                  Hoodies
                </h3>
                <ul className="space-y-3">
                  <li>
                    <Link href="/hoodies/pullover" className="text-xs tracking-wide uppercase text-neutral-600 hover:text-neutral-900">
                      Pullover
                    </Link>
                  </li>
                  <li>
                    <Link href="/hoodies/zip-up" className="text-xs tracking-wide uppercase text-neutral-600 hover:text-neutral-900">
                      Zip-Up
                    </Link>
                  </li>
                  <li>
                    <Link href="/hoodies/oversized" className="text-xs tracking-wide uppercase text-neutral-600 hover:text-neutral-900">
                      Oversized
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Image Columns */}
              <div className="col-span-3 grid grid-cols-3 gap-6">
                <Link href="/hoodies/pullover" className="group">
                  <img 
                    src="https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=800&fit=crop" 
                    alt="Pullover Hoodies"
                    className="w-full h-80 object-cover mb-3 group-hover:opacity-80 transition-opacity"
                  />
                  <p className="text-xs tracking-wide uppercase text-neutral-600">Pullover</p>
                </Link>
                <Link href="/hoodies/zip-up" className="group">
                  <img 
                    src="https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&h=800&fit=crop" 
                    alt="Zip-Up Hoodies"
                    className="w-full h-80 object-cover mb-3 group-hover:opacity-80 transition-opacity"
                  />
                  <p className="text-xs tracking-wide uppercase text-neutral-600">Zip-Up</p>
                </Link>
                <Link href="/hoodies/oversized" className="group">
                  <img 
                    src="https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=800&fit=crop" 
                    alt="Oversized Hoodies"
                    className="w-full h-80 object-cover mb-3 group-hover:opacity-80 transition-opacity"
                  />
                  <p className="text-xs tracking-wide uppercase text-neutral-600">Oversized</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Full-Width Mega Menu for T-Shirts */}
      {tshirtsMenuOpen && (
        <div
          className="fixed top-16 left-0 right-0 z-40 bg-white border-b border-neutral-200"
          onMouseEnter={() => setTshirtsMenuOpen(true)}
          onMouseLeave={() => setTshirtsMenuOpen(false)}
        >
          <div className="container mx-auto px-6 py-12">
            <div className="grid grid-cols-4 gap-12">
              {/* Left Column - Categories */}
              <div>
                <h3 className="text-xs font-bold tracking-widest uppercase text-neutral-900 mb-4">
                  T-Shirts
                </h3>
                <ul className="space-y-3">
                  <li>
                    <Link href="/tshirts/graphic" className="text-xs tracking-wide uppercase text-neutral-600 hover:text-neutral-900">
                      Graphic Tees
                    </Link>
                  </li>
                  <li>
                    <Link href="/tshirts/plain" className="text-xs tracking-wide uppercase text-neutral-600 hover:text-neutral-900">
                      Plain Tees
                    </Link>
                  </li>
                  <li>
                    <Link href="/tshirts/oversized" className="text-xs tracking-wide uppercase text-neutral-600 hover:text-neutral-900">
                      Oversized
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Image Columns */}
              <div className="col-span-3 grid grid-cols-3 gap-6">
                <Link href="/tshirts/graphic" className="group">
                  <img 
                    src="https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&h=800&fit=crop" 
                    alt="Graphic Tees"
                    className="w-full h-80 object-cover mb-3 group-hover:opacity-80 transition-opacity"
                  />
                  <p className="text-xs tracking-wide uppercase text-neutral-600">Graphic Tees</p>
                </Link>
                <Link href="/tshirts/plain" className="group">
                  <img 
                    src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=800&fit=crop" 
                    alt="Plain Tees"
                    className="w-full h-80 object-cover mb-3 group-hover:opacity-80 transition-opacity"
                  />
                  <p className="text-xs tracking-wide uppercase text-neutral-600">Plain Tees</p>
                </Link>
                <Link href="/tshirts/oversized" className="group">
                  <img 
                    src="https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&h=800&fit=crop" 
                    alt="Oversized Tees"
                    className="w-full h-80 object-cover mb-3 group-hover:opacity-80 transition-opacity"
                  />
                  <p className="text-xs tracking-wide uppercase text-neutral-600">Oversized</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

